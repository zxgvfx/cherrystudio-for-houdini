import { b as __commonJSMin, c as __esmMin, d as __export, f as __toCommonJS, g as __toESM } from "./chunk-st2fFX3F.js";
import { a$ as RotateLeftOutlined_default, aT as ZoomOutOutlined_default, aU as init_ZoomOutOutlined, aV as ZoomInOutlined_default, aW as init_ZoomInOutlined, aX as SwapOutlined_default, aY as init_SwapOutlined, aZ as RotateRightOutlined_default, a_ as init_RotateRightOutlined, am as DownloadOutlined_default, aq as CopyOutlined_default, b0 as init_RotateLeftOutlined, b1 as es_default, b3 as init_es$11, b6 as EyeOutlined_default, b7 as init_EyeOutlined, bB as init_es$8, bE as Popup, bP as init_es$7, bR as FormProvider, bg as EllipsisOutlined_default, bh as init_EllipsisOutlined, bi as es_default$2, bk as init_es$9, bl as MenuItemGroup_default, bm as Divider, bn as SubMenu_default$1, bo as MenuItem_default$1, bp as useFullPath, bq as es_default$1, bs as init_es$10, bt as LeftOutlined_default, bu as init_LeftOutlined, bz as es_default$3, c as init_es$12, c6 as es_default$4, c8 as init_es$6, c9 as RightOutlined_default, cI as es_default$5, cK as init_es$4, cM as MotionProvider, cO as init_es$3, cP as genStyleUtils_default, cQ as merge, cT as init_useMergedState, cU as useMergedState, cX as init_useEvent, cY as useEvent, c_ as init_es$1, ca as init_RightOutlined, cd as init_es$5, ce as ColorBlock_default, cf as Color, cg as init_isVisible, ch as isVisible_default, ci as init_omit, cj as omit, ck as _asyncToGenerator, cl as init_asyncToGenerator, cm as _regeneratorRuntime, cn as init_regeneratorRuntime, co as LoadingOutlined_default, cp as init_LoadingOutlined, cy as CloseOutlined_default, cz as init_CloseOutlined, d$ as init_createClass, d1 as presetPalettes, d2 as presetPrimaryColors, d3 as generate, d5 as init_es, d6 as FastColor, d7 as init_set, d8 as merge$1, dA as updateCSS, dB as canUseDom, dC as init_canUseDom, dF as init_raf, dG as raf_default, dH as _toConsumableArray, dI as init_toConsumableArray, d_ as _createClass, de as Context_default, df as init_Context, dh as init_es$2, di as Keyframes_default, dj as useStyleRegister, dl as useCacheToken, dm as init_useLayoutEffect, dn as useLayoutEffect_default, dp as unit, dq as createTheme, dr as StyleContext_default, dt as init_isEqual, du as isEqual_default, dz as init_dynamicCSS, e0 as _classCallCheck, e1 as init_classCallCheck, e4 as composeRef, e6 as getNodeRef, e7 as init_ref, e8 as supportNodeRef, e9 as supportRef, eA as useTranslation, ea as useComposeRef, eb as init_useMemo, ec as useMemo$6, ei as require_react_dom, ej as _objectSpread2, ek as init_objectSpread2, en as init_warning, eq as init_toArray, er as toArray, es as _typeof, et as init_typeof, ew as require_classnames, ex as require_jsx_runtime, ez as i18n_default, f5 as loggerService, k as UndoOutlined_default } from "./es-DSPzjfxW.js";
import { b as require_react } from "./react-nO8b1aHv.js";
import { b as ChevronRight } from "./chevron-right-CpVs9O6K.js";
import { b as Copy } from "./copy-CpEajKZD.js";
import { b as Download } from "./download-C6s0tBBV.js";
import { b as Pencil } from "./pencil-BUne13Nu.js";
import { b as RefreshCw } from "./refresh-cw-dH9sR63x.js";
import { b as RotateCcw } from "./rotate-ccw-BrXZyBhM.js";
import { b as Trash } from "./trash-B-HK6C4N.js";
function _mergeNamespaces(e$1, t$1) {
	return t$1.forEach((function(t$2) {
		t$2 && "string" != typeof t$2 && !Array.isArray(t$2) && Object.keys(t$2).forEach((function(r$2) {
			if ("default" !== r$2 && !(r$2 in e$1)) {
				var i$2 = Object.getOwnPropertyDescriptor(t$2, r$2);
				Object.defineProperty(e$1, r$2, i$2.get ? i$2 : {
					enumerable: !0,
					get: function() {
						return t$2[r$2];
					}
				});
			}
		}));
	})), Object.freeze(e$1);
}
function copyExifWithoutOrientation(e$1, t$1) {
	return new Promise((function(r$2, i$2) {
		let o$2;
		return getApp1Segment(e$1).then((function(e$2) {
			try {
				return o$2 = e$2, r$2(new Blob([
					t$1.slice(0, 2),
					o$2,
					t$1.slice(2)
				], { type: "image/jpeg" }));
			} catch (e$3) {
				return i$2(e$3);
			}
		}), i$2);
	}));
}
const getApp1Segment = (e$1) => new Promise(((t$1, r$2) => {
	const i$2 = new FileReader();
	i$2.addEventListener("load", (({ target: { result: e$2 } }) => {
		const i$3 = new DataView(e$2);
		let o$2 = 0;
		if (65496 !== i$3.getUint16(o$2)) return r$2("not a valid JPEG");
		for (o$2 += 2;;) {
			const a$2 = i$3.getUint16(o$2);
			if (65498 === a$2) break;
			const s$2 = i$3.getUint16(o$2 + 2);
			if (65505 === a$2 && 1165519206 === i$3.getUint32(o$2 + 4)) {
				const a$3 = o$2 + 10;
				let f$2;
				switch (i$3.getUint16(a$3)) {
					case 18761:
						f$2 = !0;
						break;
					case 19789:
						f$2 = !1;
						break;
					default: return r$2("TIFF header contains invalid endian");
				}
				if (42 !== i$3.getUint16(a$3 + 2, f$2)) return r$2("TIFF header contains invalid version");
				const l$2 = i$3.getUint32(a$3 + 4, f$2), c$2 = a$3 + l$2 + 2 + 12 * i$3.getUint16(a$3 + l$2, f$2);
				for (let e$3 = a$3 + l$2 + 2; e$3 < c$2; e$3 += 12) if (274 == i$3.getUint16(e$3, f$2)) {
					if (3 !== i$3.getUint16(e$3 + 2, f$2)) return r$2("Orientation data type is invalid");
					if (1 !== i$3.getUint32(e$3 + 4, f$2)) return r$2("Orientation data count is invalid");
					i$3.setUint16(e$3 + 8, 1, f$2);
					break;
				}
				return t$1(e$2.slice(o$2, o$2 + 2 + s$2));
			}
			o$2 += 2 + s$2;
		}
		return t$1(new Blob());
	})), i$2.readAsArrayBuffer(e$1);
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
	var r$2, i$2, UZIP$1 = {};
	t.exports = UZIP$1, UZIP$1.parse = function(e$2, t$1) {
		for (var r$3 = UZIP$1.bin.readUshort, i$3 = UZIP$1.bin.readUint, o$2 = 0, a$2 = {}, s$2 = new Uint8Array(e$2), f$2 = s$2.length - 4; 101010256 != i$3(s$2, f$2);) f$2--;
		o$2 = f$2;
		o$2 += 4;
		var l$2 = r$3(s$2, o$2 += 4);
		r$3(s$2, o$2 += 2);
		var c$2 = i$3(s$2, o$2 += 2), u$1 = i$3(s$2, o$2 += 4);
		o$2 += 4, o$2 = u$1;
		for (var h = 0; h < l$2; h++) {
			i$3(s$2, o$2), o$2 += 4, o$2 += 4, o$2 += 4, i$3(s$2, o$2 += 4);
			c$2 = i$3(s$2, o$2 += 4);
			var d = i$3(s$2, o$2 += 4), A$1 = r$3(s$2, o$2 += 4), g$1 = r$3(s$2, o$2 + 2), p$1 = r$3(s$2, o$2 + 4);
			o$2 += 6;
			var m$1 = i$3(s$2, o$2 += 8);
			o$2 += 4, o$2 += A$1 + g$1 + p$1, UZIP$1._readLocal(s$2, m$1, a$2, c$2, d, t$1);
		}
		return a$2;
	}, UZIP$1._readLocal = function(e$2, t$1, r$3, i$3, o$2, a$2) {
		var s$2 = UZIP$1.bin.readUshort, f$2 = UZIP$1.bin.readUint;
		f$2(e$2, t$1), s$2(e$2, t$1 += 4), s$2(e$2, t$1 += 2);
		var l$2 = s$2(e$2, t$1 += 2);
		f$2(e$2, t$1 += 2), f$2(e$2, t$1 += 4), t$1 += 4;
		var c$2 = s$2(e$2, t$1 += 8), u$1 = s$2(e$2, t$1 += 2);
		t$1 += 2;
		var h = UZIP$1.bin.readUTF8(e$2, t$1, c$2);
		if (t$1 += c$2, t$1 += u$1, a$2) r$3[h] = {
			size: o$2,
			csize: i$3
		};
		else {
			var d = new Uint8Array(e$2.buffer, t$1);
			if (0 == l$2) r$3[h] = new Uint8Array(d.buffer.slice(t$1, t$1 + i$3));
			else {
				if (8 != l$2) throw "unknown compression method: " + l$2;
				var A$1 = new Uint8Array(o$2);
				UZIP$1.inflateRaw(d, A$1), r$3[h] = A$1;
			}
		}
	}, UZIP$1.inflateRaw = function(e$2, t$1) {
		return UZIP$1.F.inflate(e$2, t$1);
	}, UZIP$1.inflate = function(e$2, t$1) {
		return e$2[0], e$2[1], UZIP$1.inflateRaw(new Uint8Array(e$2.buffer, e$2.byteOffset + 2, e$2.length - 6), t$1);
	}, UZIP$1.deflate = function(e$2, t$1) {
		t$1 ??= { level: 6 };
		var r$3 = 0, i$3 = new Uint8Array(50 + Math.floor(1.1 * e$2.length));
		i$3[r$3] = 120, i$3[r$3 + 1] = 156, r$3 += 2, r$3 = UZIP$1.F.deflateRaw(e$2, i$3, r$3, t$1.level);
		var o$2 = UZIP$1.adler(e$2, 0, e$2.length);
		return i$3[r$3 + 0] = o$2 >>> 24 & 255, i$3[r$3 + 1] = o$2 >>> 16 & 255, i$3[r$3 + 2] = o$2 >>> 8 & 255, i$3[r$3 + 3] = o$2 >>> 0 & 255, new Uint8Array(i$3.buffer, 0, r$3 + 4);
	}, UZIP$1.deflateRaw = function(e$2, t$1) {
		t$1 ??= { level: 6 };
		var r$3 = new Uint8Array(50 + Math.floor(1.1 * e$2.length)), i$3 = UZIP$1.F.deflateRaw(e$2, r$3, i$3, t$1.level);
		return new Uint8Array(r$3.buffer, 0, i$3);
	}, UZIP$1.encode = function(e$2, t$1) {
		t$1 ??= !1;
		var r$3 = 0, i$3 = UZIP$1.bin.writeUint, o$2 = UZIP$1.bin.writeUshort, a$2 = {};
		for (var s$2 in e$2) {
			var f$2 = !UZIP$1._noNeed(s$2) && !t$1, l$2 = e$2[s$2], c$2 = UZIP$1.crc.crc(l$2, 0, l$2.length);
			a$2[s$2] = {
				cpr: f$2,
				usize: l$2.length,
				crc: c$2,
				file: f$2 ? UZIP$1.deflateRaw(l$2) : l$2
			};
		}
		for (var s$2 in a$2) r$3 += a$2[s$2].file.length + 30 + 46 + 2 * UZIP$1.bin.sizeUTF8(s$2);
		r$3 += 22;
		var u$1 = new Uint8Array(r$3), h = 0, d = [];
		for (var s$2 in a$2) {
			var A$1 = a$2[s$2];
			d.push(h), h = UZIP$1._writeHeader(u$1, h, s$2, A$1, 0);
		}
		var g$1 = 0, p$1 = h;
		for (var s$2 in a$2) {
			A$1 = a$2[s$2];
			d.push(h), h = UZIP$1._writeHeader(u$1, h, s$2, A$1, 1, d[g$1++]);
		}
		var m$1 = h - p$1;
		return i$3(u$1, h, 101010256), h += 4, o$2(u$1, h += 4, g$1), o$2(u$1, h += 2, g$1), i$3(u$1, h += 2, m$1), i$3(u$1, h += 4, p$1), h += 4, h += 2, u$1.buffer;
	}, UZIP$1._noNeed = function(e$2) {
		var t$1 = e$2.split(".").pop().toLowerCase();
		return -1 != "png,jpg,jpeg,zip".indexOf(t$1);
	}, UZIP$1._writeHeader = function(e$2, t$1, r$3, i$3, o$2, a$2) {
		var s$2 = UZIP$1.bin.writeUint, f$2 = UZIP$1.bin.writeUshort, l$2 = i$3.file;
		return s$2(e$2, t$1, 0 == o$2 ? 67324752 : 33639248), t$1 += 4, 1 == o$2 && (t$1 += 2), f$2(e$2, t$1, 20), f$2(e$2, t$1 += 2, 0), f$2(e$2, t$1 += 2, i$3.cpr ? 8 : 0), s$2(e$2, t$1 += 2, 0), s$2(e$2, t$1 += 4, i$3.crc), s$2(e$2, t$1 += 4, l$2.length), s$2(e$2, t$1 += 4, i$3.usize), f$2(e$2, t$1 += 4, UZIP$1.bin.sizeUTF8(r$3)), f$2(e$2, t$1 += 2, 0), t$1 += 2, 1 == o$2 && (t$1 += 2, t$1 += 2, s$2(e$2, t$1 += 6, a$2), t$1 += 4), t$1 += UZIP$1.bin.writeUTF8(e$2, t$1, r$3), 0 == o$2 && (e$2.set(l$2, t$1), t$1 += l$2.length), t$1;
	}, UZIP$1.crc = {
		table: function() {
			for (var e$2 = new Uint32Array(256), t$1 = 0; t$1 < 256; t$1++) {
				for (var r$3 = t$1, i$3 = 0; i$3 < 8; i$3++) 1 & r$3 ? r$3 = 3988292384 ^ r$3 >>> 1 : r$3 >>>= 1;
				e$2[t$1] = r$3;
			}
			return e$2;
		}(),
		update: function(e$2, t$1, r$3, i$3) {
			for (var o$2 = 0; o$2 < i$3; o$2++) e$2 = UZIP$1.crc.table[255 & (e$2 ^ t$1[r$3 + o$2])] ^ e$2 >>> 8;
			return e$2;
		},
		crc: function(e$2, t$1, r$3) {
			return 4294967295 ^ UZIP$1.crc.update(4294967295, e$2, t$1, r$3);
		}
	}, UZIP$1.adler = function(e$2, t$1, r$3) {
		for (var i$3 = 1, o$2 = 0, a$2 = t$1, s$2 = t$1 + r$3; a$2 < s$2;) {
			for (var f$2 = Math.min(a$2 + 5552, s$2); a$2 < f$2;) o$2 += i$3 += e$2[a$2++];
			i$3 %= 65521, o$2 %= 65521;
		}
		return o$2 << 16 | i$3;
	}, UZIP$1.bin = {
		readUshort: function(e$2, t$1) {
			return e$2[t$1] | e$2[t$1 + 1] << 8;
		},
		writeUshort: function(e$2, t$1, r$3) {
			e$2[t$1] = 255 & r$3, e$2[t$1 + 1] = r$3 >> 8 & 255;
		},
		readUint: function(e$2, t$1) {
			return 16777216 * e$2[t$1 + 3] + (e$2[t$1 + 2] << 16 | e$2[t$1 + 1] << 8 | e$2[t$1]);
		},
		writeUint: function(e$2, t$1, r$3) {
			e$2[t$1] = 255 & r$3, e$2[t$1 + 1] = r$3 >> 8 & 255, e$2[t$1 + 2] = r$3 >> 16 & 255, e$2[t$1 + 3] = r$3 >> 24 & 255;
		},
		readASCII: function(e$2, t$1, r$3) {
			for (var i$3 = "", o$2 = 0; o$2 < r$3; o$2++) i$3 += String.fromCharCode(e$2[t$1 + o$2]);
			return i$3;
		},
		writeASCII: function(e$2, t$1, r$3) {
			for (var i$3 = 0; i$3 < r$3.length; i$3++) e$2[t$1 + i$3] = r$3.charCodeAt(i$3);
		},
		pad: function(e$2) {
			return e$2.length < 2 ? "0" + e$2 : e$2;
		},
		readUTF8: function(e$2, t$1, r$3) {
			for (var i$3, o$2 = "", a$2 = 0; a$2 < r$3; a$2++) o$2 += "%" + UZIP$1.bin.pad(e$2[t$1 + a$2].toString(16));
			try {
				i$3 = decodeURIComponent(o$2);
			} catch (i$4) {
				return UZIP$1.bin.readASCII(e$2, t$1, r$3);
			}
			return i$3;
		},
		writeUTF8: function(e$2, t$1, r$3) {
			for (var i$3 = r$3.length, o$2 = 0, a$2 = 0; a$2 < i$3; a$2++) {
				var s$2 = r$3.charCodeAt(a$2);
				if (0 == (4294967168 & s$2)) e$2[t$1 + o$2] = s$2, o$2++;
				else if (0 == (4294965248 & s$2)) e$2[t$1 + o$2] = 192 | s$2 >> 6, e$2[t$1 + o$2 + 1] = 128 | s$2 >> 0 & 63, o$2 += 2;
				else if (0 == (4294901760 & s$2)) e$2[t$1 + o$2] = 224 | s$2 >> 12, e$2[t$1 + o$2 + 1] = 128 | s$2 >> 6 & 63, e$2[t$1 + o$2 + 2] = 128 | s$2 >> 0 & 63, o$2 += 3;
				else {
					if (0 != (4292870144 & s$2)) throw "e";
					e$2[t$1 + o$2] = 240 | s$2 >> 18, e$2[t$1 + o$2 + 1] = 128 | s$2 >> 12 & 63, e$2[t$1 + o$2 + 2] = 128 | s$2 >> 6 & 63, e$2[t$1 + o$2 + 3] = 128 | s$2 >> 0 & 63, o$2 += 4;
				}
			}
			return o$2;
		},
		sizeUTF8: function(e$2) {
			for (var t$1 = e$2.length, r$3 = 0, i$3 = 0; i$3 < t$1; i$3++) {
				var o$2 = e$2.charCodeAt(i$3);
				if (0 == (4294967168 & o$2)) r$3++;
				else if (0 == (4294965248 & o$2)) r$3 += 2;
				else if (0 == (4294901760 & o$2)) r$3 += 3;
				else {
					if (0 != (4292870144 & o$2)) throw "e";
					r$3 += 4;
				}
			}
			return r$3;
		}
	}, UZIP$1.F = {}, UZIP$1.F.deflateRaw = function(e$2, t$1, r$3, i$3) {
		var o$2 = [
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
		][i$3], a$2 = UZIP$1.F.U, s$2 = UZIP$1.F._goodIndex;
		UZIP$1.F._hash;
		var f$2 = UZIP$1.F._putsE, l$2 = 0, c$2 = r$3 << 3, u$1 = 0, h = e$2.length;
		if (0 == i$3) {
			for (; l$2 < h;) f$2(t$1, c$2, l$2 + (_$1 = Math.min(65535, h - l$2)) == h ? 1 : 0), c$2 = UZIP$1.F._copyExact(e$2, l$2, _$1, t$1, c$2 + 8), l$2 += _$1;
			return c$2 >>> 3;
		}
		var d = a$2.lits, A$1 = a$2.strt, g$1 = a$2.prev, p$1 = 0, m$1 = 0, w$1 = 0, v$1 = 0, b$1 = 0, y$1 = 0;
		for (h > 2 && (A$1[y$1 = UZIP$1.F._hash(e$2, 0)] = 0), l$2 = 0; l$2 < h; l$2++) {
			if (b$1 = y$1, l$2 + 1 < h - 2) {
				y$1 = UZIP$1.F._hash(e$2, l$2 + 1);
				var E = l$2 + 1 & 32767;
				g$1[E] = A$1[y$1], A$1[y$1] = E;
			}
			if (u$1 <= l$2) {
				(p$1 > 14e3 || m$1 > 26697) && h - l$2 > 100 && (u$1 < l$2 && (d[p$1] = l$2 - u$1, p$1 += 2, u$1 = l$2), c$2 = UZIP$1.F._writeBlock(l$2 == h - 1 || u$1 == h ? 1 : 0, d, p$1, v$1, e$2, w$1, l$2 - w$1, t$1, c$2), p$1 = m$1 = v$1 = 0, w$1 = l$2);
				var F$1 = 0;
				l$2 < h - 2 && (F$1 = UZIP$1.F._bestMatch(e$2, l$2, g$1, b$1, Math.min(o$2[2], h - l$2), o$2[3]));
				var _$1 = F$1 >>> 16, B$1 = 65535 & F$1;
				if (0 != F$1) {
					B$1 = 65535 & F$1;
					var U$1 = s$2(_$1 = F$1 >>> 16, a$2.of0);
					a$2.lhst[257 + U$1]++;
					var C$1 = s$2(B$1, a$2.df0);
					a$2.dhst[C$1]++, v$1 += a$2.exb[U$1] + a$2.dxb[C$1], d[p$1] = _$1 << 23 | l$2 - u$1, d[p$1 + 1] = B$1 << 16 | U$1 << 8 | C$1, p$1 += 2, u$1 = l$2 + _$1;
				} else a$2.lhst[e$2[l$2]]++;
				m$1++;
			}
		}
		for (w$1 == l$2 && 0 != e$2.length || (u$1 < l$2 && (d[p$1] = l$2 - u$1, p$1 += 2, u$1 = l$2), c$2 = UZIP$1.F._writeBlock(1, d, p$1, v$1, e$2, w$1, l$2 - w$1, t$1, c$2), p$1 = 0, m$1 = 0, p$1 = m$1 = v$1 = 0, w$1 = l$2); 0 != (7 & c$2);) c$2++;
		return c$2 >>> 3;
	}, UZIP$1.F._bestMatch = function(e$2, t$1, r$3, i$3, o$2, a$2) {
		var s$2 = 32767 & t$1, f$2 = r$3[s$2], l$2 = s$2 - f$2 + 32768 & 32767;
		if (f$2 == s$2 || i$3 != UZIP$1.F._hash(e$2, t$1 - l$2)) return 0;
		for (var c$2 = 0, u$1 = 0, h = Math.min(32767, t$1); l$2 <= h && 0 != --a$2 && f$2 != s$2;) {
			if (0 == c$2 || e$2[t$1 + c$2] == e$2[t$1 + c$2 - l$2]) {
				var d = UZIP$1.F._howLong(e$2, t$1, l$2);
				if (d > c$2) {
					if (u$1 = l$2, (c$2 = d) >= o$2) break;
					l$2 + 2 < d && (d = l$2 + 2);
					for (var A$1 = 0, g$1 = 0; g$1 < d - 2; g$1++) {
						var p$1 = t$1 - l$2 + g$1 + 32768 & 32767, m$1 = p$1 - r$3[p$1] + 32768 & 32767;
						m$1 > A$1 && (A$1 = m$1, f$2 = p$1);
					}
				}
			}
			l$2 += (s$2 = f$2) - (f$2 = r$3[s$2]) + 32768 & 32767;
		}
		return c$2 << 16 | u$1;
	}, UZIP$1.F._howLong = function(e$2, t$1, r$3) {
		if (e$2[t$1] != e$2[t$1 - r$3] || e$2[t$1 + 1] != e$2[t$1 + 1 - r$3] || e$2[t$1 + 2] != e$2[t$1 + 2 - r$3]) return 0;
		var i$3 = t$1, o$2 = Math.min(e$2.length, t$1 + 258);
		for (t$1 += 3; t$1 < o$2 && e$2[t$1] == e$2[t$1 - r$3];) t$1++;
		return t$1 - i$3;
	}, UZIP$1.F._hash = function(e$2, t$1) {
		return (e$2[t$1] << 8 | e$2[t$1 + 1]) + (e$2[t$1 + 2] << 4) & 65535;
	}, UZIP$1.saved = 0, UZIP$1.F._writeBlock = function(e$2, t$1, r$3, i$3, o$2, a$2, s$2, f$2, l$2) {
		var c$2, u$1, h, d, A$1, g$1, p$1, m$1, w$1, v$1 = UZIP$1.F.U, b$1 = UZIP$1.F._putsF, y$1 = UZIP$1.F._putsE;
		v$1.lhst[256]++, u$1 = (c$2 = UZIP$1.F.getTrees())[0], h = c$2[1], d = c$2[2], A$1 = c$2[3], g$1 = c$2[4], p$1 = c$2[5], m$1 = c$2[6], w$1 = c$2[7];
		var E = 32 + (0 == (l$2 + 3 & 7) ? 0 : 8 - (l$2 + 3 & 7)) + (s$2 << 3), F$1 = i$3 + UZIP$1.F.contSize(v$1.fltree, v$1.lhst) + UZIP$1.F.contSize(v$1.fdtree, v$1.dhst), _$1 = i$3 + UZIP$1.F.contSize(v$1.ltree, v$1.lhst) + UZIP$1.F.contSize(v$1.dtree, v$1.dhst);
		_$1 += 14 + 3 * p$1 + UZIP$1.F.contSize(v$1.itree, v$1.ihst) + (2 * v$1.ihst[16] + 3 * v$1.ihst[17] + 7 * v$1.ihst[18]);
		for (var B$1 = 0; B$1 < 286; B$1++) v$1.lhst[B$1] = 0;
		for (B$1 = 0; B$1 < 30; B$1++) v$1.dhst[B$1] = 0;
		for (B$1 = 0; B$1 < 19; B$1++) v$1.ihst[B$1] = 0;
		var U$1 = E < F$1 && E < _$1 ? 0 : F$1 < _$1 ? 1 : 2;
		if (b$1(f$2, l$2, e$2), b$1(f$2, l$2 + 1, U$1), l$2 += 3, 0 == U$1) {
			for (; 0 != (7 & l$2);) l$2++;
			l$2 = UZIP$1.F._copyExact(o$2, a$2, s$2, f$2, l$2);
		} else {
			var C$1, I$1;
			if (1 == U$1 && (C$1 = v$1.fltree, I$1 = v$1.fdtree), 2 == U$1) {
				UZIP$1.F.makeCodes(v$1.ltree, u$1), UZIP$1.F.revCodes(v$1.ltree, u$1), UZIP$1.F.makeCodes(v$1.dtree, h), UZIP$1.F.revCodes(v$1.dtree, h), UZIP$1.F.makeCodes(v$1.itree, d), UZIP$1.F.revCodes(v$1.itree, d), C$1 = v$1.ltree, I$1 = v$1.dtree, y$1(f$2, l$2, A$1 - 257), y$1(f$2, l$2 += 5, g$1 - 1), y$1(f$2, l$2 += 5, p$1 - 4), l$2 += 4;
				for (var Q$1 = 0; Q$1 < p$1; Q$1++) y$1(f$2, l$2 + 3 * Q$1, v$1.itree[1 + (v$1.ordr[Q$1] << 1)]);
				l$2 += 3 * p$1, l$2 = UZIP$1.F._codeTiny(m$1, v$1.itree, f$2, l$2), l$2 = UZIP$1.F._codeTiny(w$1, v$1.itree, f$2, l$2);
			}
			for (var M$1 = a$2, x$1 = 0; x$1 < r$3; x$1 += 2) {
				for (var S$1 = t$1[x$1], R$1 = S$1 >>> 23, T$1 = M$1 + (8388607 & S$1); M$1 < T$1;) l$2 = UZIP$1.F._writeLit(o$2[M$1++], C$1, f$2, l$2);
				if (0 != R$1) {
					var O$1 = t$1[x$1 + 1], P = O$1 >> 16, H$1 = O$1 >> 8 & 255, L$1 = 255 & O$1;
					y$1(f$2, l$2 = UZIP$1.F._writeLit(257 + H$1, C$1, f$2, l$2), R$1 - v$1.of0[H$1]), l$2 += v$1.exb[H$1], b$1(f$2, l$2 = UZIP$1.F._writeLit(L$1, I$1, f$2, l$2), P - v$1.df0[L$1]), l$2 += v$1.dxb[L$1], M$1 += R$1;
				}
			}
			l$2 = UZIP$1.F._writeLit(256, C$1, f$2, l$2);
		}
		return l$2;
	}, UZIP$1.F._copyExact = function(e$2, t$1, r$3, i$3, o$2) {
		var a$2 = o$2 >>> 3;
		return i$3[a$2] = r$3, i$3[a$2 + 1] = r$3 >>> 8, i$3[a$2 + 2] = 255 - i$3[a$2], i$3[a$2 + 3] = 255 - i$3[a$2 + 1], a$2 += 4, i$3.set(new Uint8Array(e$2.buffer, t$1, r$3), a$2), o$2 + (r$3 + 4 << 3);
	}, UZIP$1.F.getTrees = function() {
		for (var e$2 = UZIP$1.F.U, t$1 = UZIP$1.F._hufTree(e$2.lhst, e$2.ltree, 15), r$3 = UZIP$1.F._hufTree(e$2.dhst, e$2.dtree, 15), i$3 = [], o$2 = UZIP$1.F._lenCodes(e$2.ltree, i$3), a$2 = [], s$2 = UZIP$1.F._lenCodes(e$2.dtree, a$2), f$2 = 0; f$2 < i$3.length; f$2 += 2) e$2.ihst[i$3[f$2]]++;
		for (f$2 = 0; f$2 < a$2.length; f$2 += 2) e$2.ihst[a$2[f$2]]++;
		for (var l$2 = UZIP$1.F._hufTree(e$2.ihst, e$2.itree, 7), c$2 = 19; c$2 > 4 && 0 == e$2.itree[1 + (e$2.ordr[c$2 - 1] << 1)];) c$2--;
		return [
			t$1,
			r$3,
			l$2,
			o$2,
			s$2,
			c$2,
			i$3,
			a$2
		];
	}, UZIP$1.F.getSecond = function(e$2) {
		for (var t$1 = [], r$3 = 0; r$3 < e$2.length; r$3 += 2) t$1.push(e$2[r$3 + 1]);
		return t$1;
	}, UZIP$1.F.nonZero = function(e$2) {
		for (var t$1 = "", r$3 = 0; r$3 < e$2.length; r$3 += 2) 0 != e$2[r$3 + 1] && (t$1 += (r$3 >> 1) + ",");
		return t$1;
	}, UZIP$1.F.contSize = function(e$2, t$1) {
		for (var r$3 = 0, i$3 = 0; i$3 < t$1.length; i$3++) r$3 += t$1[i$3] * e$2[1 + (i$3 << 1)];
		return r$3;
	}, UZIP$1.F._codeTiny = function(e$2, t$1, r$3, i$3) {
		for (var o$2 = 0; o$2 < e$2.length; o$2 += 2) {
			var a$2 = e$2[o$2], s$2 = e$2[o$2 + 1];
			i$3 = UZIP$1.F._writeLit(a$2, t$1, r$3, i$3);
			var f$2 = 16 == a$2 ? 2 : 17 == a$2 ? 3 : 7;
			a$2 > 15 && (UZIP$1.F._putsE(r$3, i$3, s$2, f$2), i$3 += f$2);
		}
		return i$3;
	}, UZIP$1.F._lenCodes = function(e$2, t$1) {
		for (var r$3 = e$2.length; 2 != r$3 && 0 == e$2[r$3 - 1];) r$3 -= 2;
		for (var i$3 = 0; i$3 < r$3; i$3 += 2) {
			var o$2 = e$2[i$3 + 1], a$2 = i$3 + 3 < r$3 ? e$2[i$3 + 3] : -1, s$2 = i$3 + 5 < r$3 ? e$2[i$3 + 5] : -1, f$2 = 0 == i$3 ? -1 : e$2[i$3 - 1];
			if (0 == o$2 && a$2 == o$2 && s$2 == o$2) {
				for (var l$2 = i$3 + 5; l$2 + 2 < r$3 && e$2[l$2 + 2] == o$2;) l$2 += 2;
				(c$2 = Math.min(l$2 + 1 - i$3 >>> 1, 138)) < 11 ? t$1.push(17, c$2 - 3) : t$1.push(18, c$2 - 11), i$3 += 2 * c$2 - 2;
			} else if (o$2 == f$2 && a$2 == o$2 && s$2 == o$2) {
				for (l$2 = i$3 + 5; l$2 + 2 < r$3 && e$2[l$2 + 2] == o$2;) l$2 += 2;
				var c$2 = Math.min(l$2 + 1 - i$3 >>> 1, 6);
				t$1.push(16, c$2 - 3), i$3 += 2 * c$2 - 2;
			} else t$1.push(o$2, 0);
		}
		return r$3 >>> 1;
	}, UZIP$1.F._hufTree = function(e$2, t$1, r$3) {
		var i$3 = [], o$2 = e$2.length, a$2 = t$1.length, s$2 = 0;
		for (s$2 = 0; s$2 < a$2; s$2 += 2) t$1[s$2] = 0, t$1[s$2 + 1] = 0;
		for (s$2 = 0; s$2 < o$2; s$2++) 0 != e$2[s$2] && i$3.push({
			lit: s$2,
			f: e$2[s$2]
		});
		var f$2 = i$3.length, l$2 = i$3.slice(0);
		if (0 == f$2) return 0;
		if (1 == f$2) {
			var c$2 = i$3[0].lit;
			l$2 = 0 == c$2 ? 1 : 0;
			return t$1[1 + (c$2 << 1)] = 1, t$1[1 + (l$2 << 1)] = 1, 1;
		}
		i$3.sort((function(e$3, t$2) {
			return e$3.f - t$2.f;
		}));
		var u$1 = i$3[0], h = i$3[1], d = 0, A$1 = 1, g$1 = 2;
		for (i$3[0] = {
			lit: -1,
			f: u$1.f + h.f,
			l: u$1,
			r: h,
			d: 0
		}; A$1 != f$2 - 1;) u$1 = d != A$1 && (g$1 == f$2 || i$3[d].f < i$3[g$1].f) ? i$3[d++] : i$3[g$1++], h = d != A$1 && (g$1 == f$2 || i$3[d].f < i$3[g$1].f) ? i$3[d++] : i$3[g$1++], i$3[A$1++] = {
			lit: -1,
			f: u$1.f + h.f,
			l: u$1,
			r: h
		};
		var p$1 = UZIP$1.F.setDepth(i$3[A$1 - 1], 0);
		for (p$1 > r$3 && (UZIP$1.F.restrictDepth(l$2, r$3, p$1), p$1 = r$3), s$2 = 0; s$2 < f$2; s$2++) t$1[1 + (l$2[s$2].lit << 1)] = l$2[s$2].d;
		return p$1;
	}, UZIP$1.F.setDepth = function(e$2, t$1) {
		return -1 != e$2.lit ? (e$2.d = t$1, t$1) : Math.max(UZIP$1.F.setDepth(e$2.l, t$1 + 1), UZIP$1.F.setDepth(e$2.r, t$1 + 1));
	}, UZIP$1.F.restrictDepth = function(e$2, t$1, r$3) {
		var i$3 = 0, o$2 = 1 << r$3 - t$1, a$2 = 0;
		for (e$2.sort((function(e$3, t$2) {
			return t$2.d == e$3.d ? e$3.f - t$2.f : t$2.d - e$3.d;
		})), i$3 = 0; i$3 < e$2.length && e$2[i$3].d > t$1; i$3++) {
			var s$2 = e$2[i$3].d;
			e$2[i$3].d = t$1, a$2 += o$2 - (1 << r$3 - s$2);
		}
		for (a$2 >>>= r$3 - t$1; a$2 > 0;) (s$2 = e$2[i$3].d) < t$1 ? (e$2[i$3].d++, a$2 -= 1 << t$1 - s$2 - 1) : i$3++;
		for (; i$3 >= 0; i$3--) e$2[i$3].d == t$1 && a$2 < 0 && (e$2[i$3].d--, a$2++);
		0 != a$2 && console.log("debt left");
	}, UZIP$1.F._goodIndex = function(e$2, t$1) {
		var r$3 = 0;
		return t$1[16 | r$3] <= e$2 && (r$3 |= 16), t$1[8 | r$3] <= e$2 && (r$3 |= 8), t$1[4 | r$3] <= e$2 && (r$3 |= 4), t$1[2 | r$3] <= e$2 && (r$3 |= 2), t$1[1 | r$3] <= e$2 && (r$3 |= 1), r$3;
	}, UZIP$1.F._writeLit = function(e$2, t$1, r$3, i$3) {
		return UZIP$1.F._putsF(r$3, i$3, t$1[e$2 << 1]), i$3 + t$1[1 + (e$2 << 1)];
	}, UZIP$1.F.inflate = function(e$2, t$1) {
		var r$3 = Uint8Array;
		if (3 == e$2[0] && 0 == e$2[1]) return t$1 || new r$3(0);
		var i$3 = UZIP$1.F, o$2 = i$3._bitsF, a$2 = i$3._bitsE, s$2 = i$3._decodeTiny, f$2 = i$3.makeCodes, l$2 = i$3.codes2map, c$2 = i$3._get17, u$1 = i$3.U, h = null == t$1;
		h && (t$1 = new r$3(e$2.length >>> 2 << 3));
		for (var d, A$1, g$1 = 0, p$1 = 0, m$1 = 0, w$1 = 0, v$1 = 0, b$1 = 0, y$1 = 0, E = 0, F$1 = 0; 0 == g$1;) if (g$1 = o$2(e$2, F$1, 1), p$1 = o$2(e$2, F$1 + 1, 2), F$1 += 3, 0 != p$1) {
			if (h && (t$1 = UZIP$1.F._check(t$1, E + (1 << 17))), 1 == p$1 && (d = u$1.flmap, A$1 = u$1.fdmap, b$1 = 511, y$1 = 31), 2 == p$1) {
				m$1 = a$2(e$2, F$1, 5) + 257, w$1 = a$2(e$2, F$1 + 5, 5) + 1, v$1 = a$2(e$2, F$1 + 10, 4) + 4, F$1 += 14;
				for (var _$1 = 0; _$1 < 38; _$1 += 2) u$1.itree[_$1] = 0, u$1.itree[_$1 + 1] = 0;
				var B$1 = 1;
				for (_$1 = 0; _$1 < v$1; _$1++) {
					var U$1 = a$2(e$2, F$1 + 3 * _$1, 3);
					u$1.itree[1 + (u$1.ordr[_$1] << 1)] = U$1, U$1 > B$1 && (B$1 = U$1);
				}
				F$1 += 3 * v$1, f$2(u$1.itree, B$1), l$2(u$1.itree, B$1, u$1.imap), d = u$1.lmap, A$1 = u$1.dmap, F$1 = s$2(u$1.imap, (1 << B$1) - 1, m$1 + w$1, e$2, F$1, u$1.ttree);
				var C$1 = i$3._copyOut(u$1.ttree, 0, m$1, u$1.ltree);
				b$1 = (1 << C$1) - 1;
				var I$1 = i$3._copyOut(u$1.ttree, m$1, w$1, u$1.dtree);
				y$1 = (1 << I$1) - 1, f$2(u$1.ltree, C$1), l$2(u$1.ltree, C$1, d), f$2(u$1.dtree, I$1), l$2(u$1.dtree, I$1, A$1);
			}
			for (;;) {
				var Q$1 = d[c$2(e$2, F$1) & b$1];
				F$1 += 15 & Q$1;
				var M$1 = Q$1 >>> 4;
				if (M$1 >>> 8 == 0) t$1[E++] = M$1;
				else {
					if (256 == M$1) break;
					var x$1 = E + M$1 - 254;
					if (M$1 > 264) {
						var S$1 = u$1.ldef[M$1 - 257];
						x$1 = E + (S$1 >>> 3) + a$2(e$2, F$1, 7 & S$1), F$1 += 7 & S$1;
					}
					var R$1 = A$1[c$2(e$2, F$1) & y$1];
					F$1 += 15 & R$1;
					var T$1 = R$1 >>> 4, O$1 = u$1.ddef[T$1], P = (O$1 >>> 4) + o$2(e$2, F$1, 15 & O$1);
					for (F$1 += 15 & O$1, h && (t$1 = UZIP$1.F._check(t$1, E + (1 << 17))); E < x$1;) t$1[E] = t$1[E++ - P], t$1[E] = t$1[E++ - P], t$1[E] = t$1[E++ - P], t$1[E] = t$1[E++ - P];
					E = x$1;
				}
			}
		} else {
			0 != (7 & F$1) && (F$1 += 8 - (7 & F$1));
			var H$1 = 4 + (F$1 >>> 3), L$1 = e$2[H$1 - 4] | e$2[H$1 - 3] << 8;
			h && (t$1 = UZIP$1.F._check(t$1, E + L$1)), t$1.set(new r$3(e$2.buffer, e$2.byteOffset + H$1, L$1), E), F$1 = H$1 + L$1 << 3, E += L$1;
		}
		return t$1.length == E ? t$1 : t$1.slice(0, E);
	}, UZIP$1.F._check = function(e$2, t$1) {
		var r$3 = e$2.length;
		if (t$1 <= r$3) return e$2;
		var i$3 = new Uint8Array(Math.max(r$3 << 1, t$1));
		return i$3.set(e$2, 0), i$3;
	}, UZIP$1.F._decodeTiny = function(e$2, t$1, r$3, i$3, o$2, a$2) {
		for (var s$2 = UZIP$1.F._bitsE, f$2 = UZIP$1.F._get17, l$2 = 0; l$2 < r$3;) {
			var c$2 = e$2[f$2(i$3, o$2) & t$1];
			o$2 += 15 & c$2;
			var u$1 = c$2 >>> 4;
			if (u$1 <= 15) a$2[l$2] = u$1, l$2++;
			else {
				var h = 0, d = 0;
				16 == u$1 ? (d = 3 + s$2(i$3, o$2, 2), o$2 += 2, h = a$2[l$2 - 1]) : 17 == u$1 ? (d = 3 + s$2(i$3, o$2, 3), o$2 += 3) : 18 == u$1 && (d = 11 + s$2(i$3, o$2, 7), o$2 += 7);
				for (var A$1 = l$2 + d; l$2 < A$1;) a$2[l$2] = h, l$2++;
			}
		}
		return o$2;
	}, UZIP$1.F._copyOut = function(e$2, t$1, r$3, i$3) {
		for (var o$2 = 0, a$2 = 0, s$2 = i$3.length >>> 1; a$2 < r$3;) {
			var f$2 = e$2[a$2 + t$1];
			i$3[a$2 << 1] = 0, i$3[1 + (a$2 << 1)] = f$2, f$2 > o$2 && (o$2 = f$2), a$2++;
		}
		for (; a$2 < s$2;) i$3[a$2 << 1] = 0, i$3[1 + (a$2 << 1)] = 0, a$2++;
		return o$2;
	}, UZIP$1.F.makeCodes = function(e$2, t$1) {
		for (var r$3, i$3, o$2, a$2, s$2 = UZIP$1.F.U, f$2 = e$2.length, l$2 = s$2.bl_count, c$2 = 0; c$2 <= t$1; c$2++) l$2[c$2] = 0;
		for (c$2 = 1; c$2 < f$2; c$2 += 2) l$2[e$2[c$2]]++;
		var u$1 = s$2.next_code;
		for (r$3 = 0, l$2[0] = 0, i$3 = 1; i$3 <= t$1; i$3++) r$3 = r$3 + l$2[i$3 - 1] << 1, u$1[i$3] = r$3;
		for (o$2 = 0; o$2 < f$2; o$2 += 2) 0 != (a$2 = e$2[o$2 + 1]) && (e$2[o$2] = u$1[a$2], u$1[a$2]++);
	}, UZIP$1.F.codes2map = function(e$2, t$1, r$3) {
		for (var i$3 = e$2.length, o$2 = UZIP$1.F.U.rev15, a$2 = 0; a$2 < i$3; a$2 += 2) if (0 != e$2[a$2 + 1]) for (var s$2 = a$2 >> 1, f$2 = e$2[a$2 + 1], l$2 = s$2 << 4 | f$2, c$2 = t$1 - f$2, u$1 = e$2[a$2] << c$2, h = u$1 + (1 << c$2); u$1 != h;) r$3[o$2[u$1] >>> 15 - t$1] = l$2, u$1++;
	}, UZIP$1.F.revCodes = function(e$2, t$1) {
		for (var r$3 = UZIP$1.F.U.rev15, i$3 = 15 - t$1, o$2 = 0; o$2 < e$2.length; o$2 += 2) {
			var a$2 = e$2[o$2] << t$1 - e$2[o$2 + 1];
			e$2[o$2] = r$3[a$2] >>> i$3;
		}
	}, UZIP$1.F._putsE = function(e$2, t$1, r$3) {
		r$3 <<= 7 & t$1;
		var i$3 = t$1 >>> 3;
		e$2[i$3] |= r$3, e$2[i$3 + 1] |= r$3 >>> 8;
	}, UZIP$1.F._putsF = function(e$2, t$1, r$3) {
		r$3 <<= 7 & t$1;
		var i$3 = t$1 >>> 3;
		e$2[i$3] |= r$3, e$2[i$3 + 1] |= r$3 >>> 8, e$2[i$3 + 2] |= r$3 >>> 16;
	}, UZIP$1.F._bitsE = function(e$2, t$1, r$3) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8) >>> (7 & t$1) & (1 << r$3) - 1;
	}, UZIP$1.F._bitsF = function(e$2, t$1, r$3) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8 | e$2[2 + (t$1 >>> 3)] << 16) >>> (7 & t$1) & (1 << r$3) - 1;
	}, UZIP$1.F._get17 = function(e$2, t$1) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8 | e$2[2 + (t$1 >>> 3)] << 16) >>> (7 & t$1);
	}, UZIP$1.F._get25 = function(e$2, t$1) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8 | e$2[2 + (t$1 >>> 3)] << 16 | e$2[3 + (t$1 >>> 3)] << 24) >>> (7 & t$1);
	}, UZIP$1.F.U = (r$2 = Uint16Array, i$2 = Uint32Array, {
		next_code: new r$2(16),
		bl_count: new r$2(16),
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
		ldef: new r$2(32),
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
		ddef: new i$2(32),
		flmap: new r$2(512),
		fltree: [],
		fdmap: new r$2(32),
		fdtree: [],
		lmap: new r$2(32768),
		ltree: [],
		ttree: [],
		dmap: new r$2(32768),
		dtree: [],
		imap: new r$2(512),
		itree: [],
		rev15: new r$2(32768),
		lhst: new i$2(286),
		dhst: new i$2(30),
		ihst: new i$2(19),
		lits: new i$2(15e3),
		strt: new r$2(65536),
		prev: new r$2(32768)
	}), function() {
		for (var e$2 = UZIP$1.F.U, t$1 = 0; t$1 < 32768; t$1++) {
			var r$3 = t$1;
			r$3 = (4278255360 & (r$3 = (4042322160 & (r$3 = (3435973836 & (r$3 = (2863311530 & r$3) >>> 1 | (1431655765 & r$3) << 1)) >>> 2 | (858993459 & r$3) << 2)) >>> 4 | (252645135 & r$3) << 4)) >>> 8 | (16711935 & r$3) << 8, e$2.rev15[t$1] = (r$3 >>> 16 | r$3 << 16) >>> 17;
		}
		function pushV(e$3, t$2, r$4) {
			for (; 0 != t$2--;) e$3.push(0, r$4);
		}
		for (t$1 = 0; t$1 < 32; t$1++) e$2.ldef[t$1] = e$2.of0[t$1] << 3 | e$2.exb[t$1], e$2.ddef[t$1] = e$2.df0[t$1] << 4 | e$2.dxb[t$1];
		pushV(e$2.fltree, 144, 8), pushV(e$2.fltree, 112, 9), pushV(e$2.fltree, 24, 7), pushV(e$2.fltree, 8, 8), UZIP$1.F.makeCodes(e$2.fltree, 9), UZIP$1.F.codes2map(e$2.fltree, 9, e$2.flmap), UZIP$1.F.revCodes(e$2.fltree, 9), pushV(e$2.fdtree, 32, 5), UZIP$1.F.makeCodes(e$2.fdtree, 5), UZIP$1.F.codes2map(e$2.fdtree, 5, e$2.fdmap), UZIP$1.F.revCodes(e$2.fdtree, 5), pushV(e$2.itree, 19, 0), pushV(e$2.ltree, 286, 0), pushV(e$2.dtree, 30, 0), pushV(e$2.ttree, 320, 0);
	}();
})();
var UZIP = _mergeNamespaces({
	__proto__: null,
	default: e
}, [e]);
const UPNG = function() {
	var e$1 = {
		nextZero(e$2, t$2) {
			for (; 0 != e$2[t$2];) t$2++;
			return t$2;
		},
		readUshort: (e$2, t$2) => e$2[t$2] << 8 | e$2[t$2 + 1],
		writeUshort(e$2, t$2, r$2) {
			e$2[t$2] = r$2 >> 8 & 255, e$2[t$2 + 1] = 255 & r$2;
		},
		readUint: (e$2, t$2) => 16777216 * e$2[t$2] + (e$2[t$2 + 1] << 16 | e$2[t$2 + 2] << 8 | e$2[t$2 + 3]),
		writeUint(e$2, t$2, r$2) {
			e$2[t$2] = r$2 >> 24 & 255, e$2[t$2 + 1] = r$2 >> 16 & 255, e$2[t$2 + 2] = r$2 >> 8 & 255, e$2[t$2 + 3] = 255 & r$2;
		},
		readASCII(e$2, t$2, r$2) {
			let i$2 = "";
			for (let o$2 = 0; o$2 < r$2; o$2++) i$2 += String.fromCharCode(e$2[t$2 + o$2]);
			return i$2;
		},
		writeASCII(e$2, t$2, r$2) {
			for (let i$2 = 0; i$2 < r$2.length; i$2++) e$2[t$2 + i$2] = r$2.charCodeAt(i$2);
		},
		readBytes(e$2, t$2, r$2) {
			const i$2 = [];
			for (let o$2 = 0; o$2 < r$2; o$2++) i$2.push(e$2[t$2 + o$2]);
			return i$2;
		},
		pad: (e$2) => e$2.length < 2 ? `0${e$2}` : e$2,
		readUTF8(t$2, r$2, i$2) {
			let o$2, a$2 = "";
			for (let o$3 = 0; o$3 < i$2; o$3++) a$2 += `%${e$1.pad(t$2[r$2 + o$3].toString(16))}`;
			try {
				o$2 = decodeURIComponent(a$2);
			} catch (o$3) {
				return e$1.readASCII(t$2, r$2, i$2);
			}
			return o$2;
		}
	};
	function decodeImage(t$2, r$2, i$2, o$2) {
		const a$2 = r$2 * i$2, s$2 = _getBPP(o$2), f$2 = Math.ceil(r$2 * s$2 / 8), l$2 = new Uint8Array(4 * a$2), c$2 = new Uint32Array(l$2.buffer), { ctype: u$1 } = o$2, { depth: h } = o$2, d = e$1.readUshort;
		if (6 == u$1) {
			const e$2 = a$2 << 2;
			if (8 == h) for (var A$1 = 0; A$1 < e$2; A$1 += 4) l$2[A$1] = t$2[A$1], l$2[A$1 + 1] = t$2[A$1 + 1], l$2[A$1 + 2] = t$2[A$1 + 2], l$2[A$1 + 3] = t$2[A$1 + 3];
			if (16 == h) for (A$1 = 0; A$1 < e$2; A$1++) l$2[A$1] = t$2[A$1 << 1];
		} else if (2 == u$1) {
			const e$2 = o$2.tabs.tRNS;
			if (null == e$2) {
				if (8 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
					var g$1 = 3 * A$1;
					c$2[A$1] = 255 << 24 | t$2[g$1 + 2] << 16 | t$2[g$1 + 1] << 8 | t$2[g$1];
				}
				if (16 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
					g$1 = 6 * A$1;
					c$2[A$1] = 255 << 24 | t$2[g$1 + 4] << 16 | t$2[g$1 + 2] << 8 | t$2[g$1];
				}
			} else {
				var p$1 = e$2[0];
				const r$3 = e$2[1], i$3 = e$2[2];
				if (8 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
					var m$1 = A$1 << 2;
					g$1 = 3 * A$1;
					c$2[A$1] = 255 << 24 | t$2[g$1 + 2] << 16 | t$2[g$1 + 1] << 8 | t$2[g$1], t$2[g$1] == p$1 && t$2[g$1 + 1] == r$3 && t$2[g$1 + 2] == i$3 && (l$2[m$1 + 3] = 0);
				}
				if (16 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
					m$1 = A$1 << 2, g$1 = 6 * A$1;
					c$2[A$1] = 255 << 24 | t$2[g$1 + 4] << 16 | t$2[g$1 + 2] << 8 | t$2[g$1], d(t$2, g$1) == p$1 && d(t$2, g$1 + 2) == r$3 && d(t$2, g$1 + 4) == i$3 && (l$2[m$1 + 3] = 0);
				}
			}
		} else if (3 == u$1) {
			const e$2 = o$2.tabs.PLTE, s$3 = o$2.tabs.tRNS, c$3 = s$3 ? s$3.length : 0;
			if (1 == h) for (var w$1 = 0; w$1 < i$2; w$1++) {
				var v$1 = w$1 * f$2, b$1 = w$1 * r$2;
				for (A$1 = 0; A$1 < r$2; A$1++) {
					m$1 = b$1 + A$1 << 2;
					var y$1 = 3 * (E = t$2[v$1 + (A$1 >> 3)] >> 7 - ((7 & A$1) << 0) & 1);
					l$2[m$1] = e$2[y$1], l$2[m$1 + 1] = e$2[y$1 + 1], l$2[m$1 + 2] = e$2[y$1 + 2], l$2[m$1 + 3] = E < c$3 ? s$3[E] : 255;
				}
			}
			if (2 == h) for (w$1 = 0; w$1 < i$2; w$1++) for (v$1 = w$1 * f$2, b$1 = w$1 * r$2, A$1 = 0; A$1 < r$2; A$1++) {
				m$1 = b$1 + A$1 << 2, y$1 = 3 * (E = t$2[v$1 + (A$1 >> 2)] >> 6 - ((3 & A$1) << 1) & 3);
				l$2[m$1] = e$2[y$1], l$2[m$1 + 1] = e$2[y$1 + 1], l$2[m$1 + 2] = e$2[y$1 + 2], l$2[m$1 + 3] = E < c$3 ? s$3[E] : 255;
			}
			if (4 == h) for (w$1 = 0; w$1 < i$2; w$1++) for (v$1 = w$1 * f$2, b$1 = w$1 * r$2, A$1 = 0; A$1 < r$2; A$1++) {
				m$1 = b$1 + A$1 << 2, y$1 = 3 * (E = t$2[v$1 + (A$1 >> 1)] >> 4 - ((1 & A$1) << 2) & 15);
				l$2[m$1] = e$2[y$1], l$2[m$1 + 1] = e$2[y$1 + 1], l$2[m$1 + 2] = e$2[y$1 + 2], l$2[m$1 + 3] = E < c$3 ? s$3[E] : 255;
			}
			if (8 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
				var E;
				m$1 = A$1 << 2, y$1 = 3 * (E = t$2[A$1]);
				l$2[m$1] = e$2[y$1], l$2[m$1 + 1] = e$2[y$1 + 1], l$2[m$1 + 2] = e$2[y$1 + 2], l$2[m$1 + 3] = E < c$3 ? s$3[E] : 255;
			}
		} else if (4 == u$1) {
			if (8 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
				m$1 = A$1 << 2;
				var F$1 = t$2[_$1 = A$1 << 1];
				l$2[m$1] = F$1, l$2[m$1 + 1] = F$1, l$2[m$1 + 2] = F$1, l$2[m$1 + 3] = t$2[_$1 + 1];
			}
			if (16 == h) for (A$1 = 0; A$1 < a$2; A$1++) {
				var _$1;
				m$1 = A$1 << 2, F$1 = t$2[_$1 = A$1 << 2];
				l$2[m$1] = F$1, l$2[m$1 + 1] = F$1, l$2[m$1 + 2] = F$1, l$2[m$1 + 3] = t$2[_$1 + 2];
			}
		} else if (0 == u$1) for (p$1 = o$2.tabs.tRNS ? o$2.tabs.tRNS : -1, w$1 = 0; w$1 < i$2; w$1++) {
			const e$2 = w$1 * f$2, i$3 = w$1 * r$2;
			if (1 == h) for (var B$1 = 0; B$1 < r$2; B$1++) {
				var U$1 = (F$1 = 255 * (t$2[e$2 + (B$1 >>> 3)] >>> 7 - (7 & B$1) & 1)) == 255 * p$1 ? 0 : 255;
				c$2[i$3 + B$1] = U$1 << 24 | F$1 << 16 | F$1 << 8 | F$1;
			}
			else if (2 == h) for (B$1 = 0; B$1 < r$2; B$1++) {
				U$1 = (F$1 = 85 * (t$2[e$2 + (B$1 >>> 2)] >>> 6 - ((3 & B$1) << 1) & 3)) == 85 * p$1 ? 0 : 255;
				c$2[i$3 + B$1] = U$1 << 24 | F$1 << 16 | F$1 << 8 | F$1;
			}
			else if (4 == h) for (B$1 = 0; B$1 < r$2; B$1++) {
				U$1 = (F$1 = 17 * (t$2[e$2 + (B$1 >>> 1)] >>> 4 - ((1 & B$1) << 2) & 15)) == 17 * p$1 ? 0 : 255;
				c$2[i$3 + B$1] = U$1 << 24 | F$1 << 16 | F$1 << 8 | F$1;
			}
			else if (8 == h) for (B$1 = 0; B$1 < r$2; B$1++) {
				U$1 = (F$1 = t$2[e$2 + B$1]) == p$1 ? 0 : 255;
				c$2[i$3 + B$1] = U$1 << 24 | F$1 << 16 | F$1 << 8 | F$1;
			}
			else if (16 == h) for (B$1 = 0; B$1 < r$2; B$1++) {
				F$1 = t$2[e$2 + (B$1 << 1)], U$1 = d(t$2, e$2 + (B$1 << 1)) == p$1 ? 0 : 255;
				c$2[i$3 + B$1] = U$1 << 24 | F$1 << 16 | F$1 << 8 | F$1;
			}
		}
		return l$2;
	}
	function _decompress(e$2, r$2, i$2, o$2) {
		const a$2 = _getBPP(e$2), s$2 = Math.ceil(i$2 * a$2 / 8), f$2 = new Uint8Array((s$2 + 1 + e$2.interlace) * o$2);
		return r$2 = e$2.tabs.CgBI ? t$1(r$2, f$2) : _inflate(r$2, f$2), 0 == e$2.interlace ? r$2 = _filterZero(r$2, e$2, 0, i$2, o$2) : 1 == e$2.interlace && (r$2 = function _readInterlace(e$3, t$2) {
			const r$3 = t$2.width, i$3 = t$2.height, o$3 = _getBPP(t$2), a$3 = o$3 >> 3, s$3 = Math.ceil(r$3 * o$3 / 8), f$3 = new Uint8Array(i$3 * s$3);
			let l$2 = 0;
			const c$2 = [
				0,
				0,
				4,
				0,
				2,
				0,
				1
			], u$1 = [
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
			let A$1 = 0;
			for (; A$1 < 7;) {
				const p$1 = h[A$1], m$1 = d[A$1];
				let w$1 = 0, v$1 = 0, b$1 = c$2[A$1];
				for (; b$1 < i$3;) b$1 += p$1, v$1++;
				let y$1 = u$1[A$1];
				for (; y$1 < r$3;) y$1 += m$1, w$1++;
				const E = Math.ceil(w$1 * o$3 / 8);
				_filterZero(e$3, t$2, l$2, w$1, v$1);
				let F$1 = 0, _$1 = c$2[A$1];
				for (; _$1 < i$3;) {
					let t$3 = u$1[A$1], i$4 = l$2 + F$1 * E << 3;
					for (; t$3 < r$3;) {
						var g$1;
						if (1 == o$3) g$1 = (g$1 = e$3[i$4 >> 3]) >> 7 - (7 & i$4) & 1, f$3[_$1 * s$3 + (t$3 >> 3)] |= g$1 << 7 - ((7 & t$3) << 0);
						if (2 == o$3) g$1 = (g$1 = e$3[i$4 >> 3]) >> 6 - (7 & i$4) & 3, f$3[_$1 * s$3 + (t$3 >> 2)] |= g$1 << 6 - ((3 & t$3) << 1);
						if (4 == o$3) g$1 = (g$1 = e$3[i$4 >> 3]) >> 4 - (7 & i$4) & 15, f$3[_$1 * s$3 + (t$3 >> 1)] |= g$1 << 4 - ((1 & t$3) << 2);
						if (o$3 >= 8) {
							const r$4 = _$1 * s$3 + t$3 * a$3;
							for (let t$4 = 0; t$4 < a$3; t$4++) f$3[r$4 + t$4] = e$3[(i$4 >> 3) + t$4];
						}
						i$4 += o$3, t$3 += m$1;
					}
					F$1++, _$1 += p$1;
				}
				w$1 * v$1 != 0 && (l$2 += v$1 * (1 + E)), A$1 += 1;
			}
			return f$3;
		}(r$2, e$2)), r$2;
	}
	function _inflate(e$2, r$2) {
		return t$1(new Uint8Array(e$2.buffer, 2, e$2.length - 6), r$2);
	}
	var t$1 = function() {
		const e$2 = { H: {} };
		return e$2.H.N = function(t$2, r$2) {
			const i$2 = Uint8Array;
			let o$2, a$2, s$2 = 0, f$2 = 0, l$2 = 0, c$2 = 0, u$1 = 0, h = 0, d = 0, A$1 = 0, g$1 = 0;
			if (3 == t$2[0] && 0 == t$2[1]) return r$2 || new i$2(0);
			const p$1 = e$2.H, m$1 = p$1.b, w$1 = p$1.e, v$1 = p$1.R, b$1 = p$1.n, y$1 = p$1.A, E = p$1.Z, F$1 = p$1.m, _$1 = null == r$2;
			for (_$1 && (r$2 = new i$2(t$2.length >>> 2 << 5)); 0 == s$2;) if (s$2 = m$1(t$2, g$1, 1), f$2 = m$1(t$2, g$1 + 1, 2), g$1 += 3, 0 != f$2) {
				if (_$1 && (r$2 = e$2.H.W(r$2, A$1 + (1 << 17))), 1 == f$2 && (o$2 = F$1.J, a$2 = F$1.h, h = 511, d = 31), 2 == f$2) {
					l$2 = w$1(t$2, g$1, 5) + 257, c$2 = w$1(t$2, g$1 + 5, 5) + 1, u$1 = w$1(t$2, g$1 + 10, 4) + 4, g$1 += 14;
					let e$3 = 1;
					for (var B$1 = 0; B$1 < 38; B$1 += 2) F$1.Q[B$1] = 0, F$1.Q[B$1 + 1] = 0;
					for (B$1 = 0; B$1 < u$1; B$1++) {
						const r$4 = w$1(t$2, g$1 + 3 * B$1, 3);
						F$1.Q[1 + (F$1.X[B$1] << 1)] = r$4, r$4 > e$3 && (e$3 = r$4);
					}
					g$1 += 3 * u$1, b$1(F$1.Q, e$3), y$1(F$1.Q, e$3, F$1.u), o$2 = F$1.w, a$2 = F$1.d, g$1 = v$1(F$1.u, (1 << e$3) - 1, l$2 + c$2, t$2, g$1, F$1.v);
					const r$3 = p$1.V(F$1.v, 0, l$2, F$1.C);
					h = (1 << r$3) - 1;
					const i$3 = p$1.V(F$1.v, l$2, c$2, F$1.D);
					d = (1 << i$3) - 1, b$1(F$1.C, r$3), y$1(F$1.C, r$3, o$2), b$1(F$1.D, i$3), y$1(F$1.D, i$3, a$2);
				}
				for (;;) {
					const e$3 = o$2[E(t$2, g$1) & h];
					g$1 += 15 & e$3;
					const i$3 = e$3 >>> 4;
					if (i$3 >>> 8 == 0) r$2[A$1++] = i$3;
					else {
						if (256 == i$3) break;
						{
							let e$4 = A$1 + i$3 - 254;
							if (i$3 > 264) {
								const r$3 = F$1.q[i$3 - 257];
								e$4 = A$1 + (r$3 >>> 3) + w$1(t$2, g$1, 7 & r$3), g$1 += 7 & r$3;
							}
							const o$3 = a$2[E(t$2, g$1) & d];
							g$1 += 15 & o$3;
							const s$3 = o$3 >>> 4, f$3 = F$1.c[s$3], l$3 = (f$3 >>> 4) + m$1(t$2, g$1, 15 & f$3);
							for (g$1 += 15 & f$3; A$1 < e$4;) r$2[A$1] = r$2[A$1++ - l$3], r$2[A$1] = r$2[A$1++ - l$3], r$2[A$1] = r$2[A$1++ - l$3], r$2[A$1] = r$2[A$1++ - l$3];
							A$1 = e$4;
						}
					}
				}
			} else {
				0 != (7 & g$1) && (g$1 += 8 - (7 & g$1));
				const o$3 = 4 + (g$1 >>> 3), a$3 = t$2[o$3 - 4] | t$2[o$3 - 3] << 8;
				_$1 && (r$2 = e$2.H.W(r$2, A$1 + a$3)), r$2.set(new i$2(t$2.buffer, t$2.byteOffset + o$3, a$3), A$1), g$1 = o$3 + a$3 << 3, A$1 += a$3;
			}
			return r$2.length == A$1 ? r$2 : r$2.slice(0, A$1);
		}, e$2.H.W = function(e$3, t$2) {
			const r$2 = e$3.length;
			if (t$2 <= r$2) return e$3;
			const i$2 = new Uint8Array(r$2 << 1);
			return i$2.set(e$3, 0), i$2;
		}, e$2.H.R = function(t$2, r$2, i$2, o$2, a$2, s$2) {
			const f$2 = e$2.H.e, l$2 = e$2.H.Z;
			let c$2 = 0;
			for (; c$2 < i$2;) {
				const e$3 = t$2[l$2(o$2, a$2) & r$2];
				a$2 += 15 & e$3;
				const i$3 = e$3 >>> 4;
				if (i$3 <= 15) s$2[c$2] = i$3, c$2++;
				else {
					let e$4 = 0, t$3 = 0;
					16 == i$3 ? (t$3 = 3 + f$2(o$2, a$2, 2), a$2 += 2, e$4 = s$2[c$2 - 1]) : 17 == i$3 ? (t$3 = 3 + f$2(o$2, a$2, 3), a$2 += 3) : 18 == i$3 && (t$3 = 11 + f$2(o$2, a$2, 7), a$2 += 7);
					const r$3 = c$2 + t$3;
					for (; c$2 < r$3;) s$2[c$2] = e$4, c$2++;
				}
			}
			return a$2;
		}, e$2.H.V = function(e$3, t$2, r$2, i$2) {
			let o$2 = 0, a$2 = 0;
			const s$2 = i$2.length >>> 1;
			for (; a$2 < r$2;) {
				const r$3 = e$3[a$2 + t$2];
				i$2[a$2 << 1] = 0, i$2[1 + (a$2 << 1)] = r$3, r$3 > o$2 && (o$2 = r$3), a$2++;
			}
			for (; a$2 < s$2;) i$2[a$2 << 1] = 0, i$2[1 + (a$2 << 1)] = 0, a$2++;
			return o$2;
		}, e$2.H.n = function(t$2, r$2) {
			const i$2 = e$2.H.m, o$2 = t$2.length;
			let a$2, s$2, f$2;
			let l$2;
			const c$2 = i$2.j;
			for (var u$1 = 0; u$1 <= r$2; u$1++) c$2[u$1] = 0;
			for (u$1 = 1; u$1 < o$2; u$1 += 2) c$2[t$2[u$1]]++;
			const h = i$2.K;
			for (a$2 = 0, c$2[0] = 0, s$2 = 1; s$2 <= r$2; s$2++) a$2 = a$2 + c$2[s$2 - 1] << 1, h[s$2] = a$2;
			for (f$2 = 0; f$2 < o$2; f$2 += 2) l$2 = t$2[f$2 + 1], 0 != l$2 && (t$2[f$2] = h[l$2], h[l$2]++);
		}, e$2.H.A = function(t$2, r$2, i$2) {
			const o$2 = t$2.length, a$2 = e$2.H.m.r;
			for (let e$3 = 0; e$3 < o$2; e$3 += 2) if (0 != t$2[e$3 + 1]) {
				const o$3 = e$3 >> 1, s$2 = t$2[e$3 + 1], f$2 = o$3 << 4 | s$2, l$2 = r$2 - s$2;
				let c$2 = t$2[e$3] << l$2;
				const u$1 = c$2 + (1 << l$2);
				for (; c$2 != u$1;) i$2[a$2[c$2] >>> 15 - r$2] = f$2, c$2++;
			}
		}, e$2.H.l = function(t$2, r$2) {
			const i$2 = e$2.H.m.r, o$2 = 15 - r$2;
			for (let e$3 = 0; e$3 < t$2.length; e$3 += 2) {
				const a$2 = t$2[e$3] << r$2 - t$2[e$3 + 1];
				t$2[e$3] = i$2[a$2] >>> o$2;
			}
		}, e$2.H.M = function(e$3, t$2, r$2) {
			r$2 <<= 7 & t$2;
			const i$2 = t$2 >>> 3;
			e$3[i$2] |= r$2, e$3[i$2 + 1] |= r$2 >>> 8;
		}, e$2.H.I = function(e$3, t$2, r$2) {
			r$2 <<= 7 & t$2;
			const i$2 = t$2 >>> 3;
			e$3[i$2] |= r$2, e$3[i$2 + 1] |= r$2 >>> 8, e$3[i$2 + 2] |= r$2 >>> 16;
		}, e$2.H.e = function(e$3, t$2, r$2) {
			return (e$3[t$2 >>> 3] | e$3[1 + (t$2 >>> 3)] << 8) >>> (7 & t$2) & (1 << r$2) - 1;
		}, e$2.H.b = function(e$3, t$2, r$2) {
			return (e$3[t$2 >>> 3] | e$3[1 + (t$2 >>> 3)] << 8 | e$3[2 + (t$2 >>> 3)] << 16) >>> (7 & t$2) & (1 << r$2) - 1;
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
			for (var r$2 = 0; r$2 < 32768; r$2++) {
				let e$3 = r$2;
				e$3 = (2863311530 & e$3) >>> 1 | (1431655765 & e$3) << 1, e$3 = (3435973836 & e$3) >>> 2 | (858993459 & e$3) << 2, e$3 = (4042322160 & e$3) >>> 4 | (252645135 & e$3) << 4, e$3 = (4278255360 & e$3) >>> 8 | (16711935 & e$3) << 8, t$2.r[r$2] = (e$3 >>> 16 | e$3 << 16) >>> 17;
			}
			function n(e$3, t$3, r$3) {
				for (; 0 != t$3--;) e$3.push(0, r$3);
			}
			for (r$2 = 0; r$2 < 32; r$2++) t$2.q[r$2] = t$2.S[r$2] << 3 | t$2.T[r$2], t$2.c[r$2] = t$2.p[r$2] << 4 | t$2.z[r$2];
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
	function _filterZero(e$2, t$2, r$2, i$2, o$2) {
		let a$2 = _getBPP(t$2);
		const s$2 = Math.ceil(i$2 * a$2 / 8);
		let f$2, l$2;
		a$2 = Math.ceil(a$2 / 8);
		let c$2 = e$2[r$2], u$1 = 0;
		if (c$2 > 1 && (e$2[r$2] = [
			0,
			0,
			1
		][c$2 - 2]), 3 == c$2) for (u$1 = a$2; u$1 < s$2; u$1++) e$2[u$1 + 1] = e$2[u$1 + 1] + (e$2[u$1 + 1 - a$2] >>> 1) & 255;
		for (let t$3 = 0; t$3 < o$2; t$3++) if (f$2 = r$2 + t$3 * s$2, l$2 = f$2 + t$3 + 1, c$2 = e$2[l$2 - 1], u$1 = 0, 0 == c$2) for (; u$1 < s$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1];
		else if (1 == c$2) {
			for (; u$1 < a$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1];
			for (; u$1 < s$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1] + e$2[f$2 + u$1 - a$2];
		} else if (2 == c$2) for (; u$1 < s$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1] + e$2[f$2 + u$1 - s$2];
		else if (3 == c$2) {
			for (; u$1 < a$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1] + (e$2[f$2 + u$1 - s$2] >>> 1);
			for (; u$1 < s$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1] + (e$2[f$2 + u$1 - s$2] + e$2[f$2 + u$1 - a$2] >>> 1);
		} else {
			for (; u$1 < a$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1] + _paeth(0, e$2[f$2 + u$1 - s$2], 0);
			for (; u$1 < s$2; u$1++) e$2[f$2 + u$1] = e$2[l$2 + u$1] + _paeth(e$2[f$2 + u$1 - a$2], e$2[f$2 + u$1 - s$2], e$2[f$2 + u$1 - a$2 - s$2]);
		}
		return e$2;
	}
	function _paeth(e$2, t$2, r$2) {
		const i$2 = e$2 + t$2 - r$2, o$2 = i$2 - e$2, a$2 = i$2 - t$2, s$2 = i$2 - r$2;
		return o$2 * o$2 <= a$2 * a$2 && o$2 * o$2 <= s$2 * s$2 ? e$2 : a$2 * a$2 <= s$2 * s$2 ? t$2 : r$2;
	}
	function _IHDR(t$2, r$2, i$2) {
		i$2.width = e$1.readUint(t$2, r$2), r$2 += 4, i$2.height = e$1.readUint(t$2, r$2), r$2 += 4, i$2.depth = t$2[r$2], r$2++, i$2.ctype = t$2[r$2], r$2++, i$2.compress = t$2[r$2], r$2++, i$2.filter = t$2[r$2], r$2++, i$2.interlace = t$2[r$2], r$2++;
	}
	function _copyTile(e$2, t$2, r$2, i$2, o$2, a$2, s$2, f$2, l$2) {
		const c$2 = Math.min(t$2, o$2), u$1 = Math.min(r$2, a$2);
		let h = 0, d = 0;
		for (let r$3 = 0; r$3 < u$1; r$3++) for (let a$3 = 0; a$3 < c$2; a$3++) if (s$2 >= 0 && f$2 >= 0 ? (h = r$3 * t$2 + a$3 << 2, d = (f$2 + r$3) * o$2 + s$2 + a$3 << 2) : (h = (-f$2 + r$3) * t$2 - s$2 + a$3 << 2, d = r$3 * o$2 + a$3 << 2), 0 == l$2) i$2[d] = e$2[h], i$2[d + 1] = e$2[h + 1], i$2[d + 2] = e$2[h + 2], i$2[d + 3] = e$2[h + 3];
		else if (1 == l$2) {
			var A$1 = e$2[h + 3] * (1 / 255), g$1 = e$2[h] * A$1, p$1 = e$2[h + 1] * A$1, m$1 = e$2[h + 2] * A$1, w$1 = i$2[d + 3] * (1 / 255), v$1 = i$2[d] * w$1, b$1 = i$2[d + 1] * w$1, y$1 = i$2[d + 2] * w$1;
			const t$3 = 1 - A$1, r$4 = A$1 + w$1 * t$3, o$3 = 0 == r$4 ? 0 : 1 / r$4;
			i$2[d + 3] = 255 * r$4, i$2[d + 0] = (g$1 + v$1 * t$3) * o$3, i$2[d + 1] = (p$1 + b$1 * t$3) * o$3, i$2[d + 2] = (m$1 + y$1 * t$3) * o$3;
		} else if (2 == l$2) {
			A$1 = e$2[h + 3], g$1 = e$2[h], p$1 = e$2[h + 1], m$1 = e$2[h + 2], w$1 = i$2[d + 3], v$1 = i$2[d], b$1 = i$2[d + 1], y$1 = i$2[d + 2];
			A$1 == w$1 && g$1 == v$1 && p$1 == b$1 && m$1 == y$1 ? (i$2[d] = 0, i$2[d + 1] = 0, i$2[d + 2] = 0, i$2[d + 3] = 0) : (i$2[d] = g$1, i$2[d + 1] = p$1, i$2[d + 2] = m$1, i$2[d + 3] = A$1);
		} else if (3 == l$2) {
			A$1 = e$2[h + 3], g$1 = e$2[h], p$1 = e$2[h + 1], m$1 = e$2[h + 2], w$1 = i$2[d + 3], v$1 = i$2[d], b$1 = i$2[d + 1], y$1 = i$2[d + 2];
			if (A$1 == w$1 && g$1 == v$1 && p$1 == b$1 && m$1 == y$1) continue;
			if (A$1 < 220 && w$1 > 20) return !1;
		}
		return !0;
	}
	return {
		decode: function decode$1(r$2) {
			const i$2 = new Uint8Array(r$2);
			let o$2 = 8;
			const a$2 = e$1, s$2 = a$2.readUshort, f$2 = a$2.readUint, l$2 = {
				tabs: {},
				frames: []
			}, c$2 = new Uint8Array(i$2.length);
			let u$1, h = 0, d = 0;
			const A$1 = [
				137,
				80,
				78,
				71,
				13,
				10,
				26,
				10
			];
			for (var g$1 = 0; g$1 < 8; g$1++) if (i$2[g$1] != A$1[g$1]) throw "The input is not a PNG file!";
			for (; o$2 < i$2.length;) {
				const e$2 = a$2.readUint(i$2, o$2);
				o$2 += 4;
				const r$3 = a$2.readASCII(i$2, o$2, 4);
				if (o$2 += 4, "IHDR" == r$3) _IHDR(i$2, o$2, l$2);
				else if ("iCCP" == r$3) {
					for (var p$1 = o$2; 0 != i$2[p$1];) p$1++;
					a$2.readASCII(i$2, o$2, p$1 - o$2), i$2[p$1 + 1];
					const s$3 = i$2.slice(p$1 + 2, o$2 + e$2);
					let f$3 = null;
					try {
						f$3 = _inflate(s$3);
					} catch (e$3) {
						f$3 = t$1(s$3);
					}
					l$2.tabs[r$3] = f$3;
				} else if ("CgBI" == r$3) l$2.tabs[r$3] = i$2.slice(o$2, o$2 + 4);
				else if ("IDAT" == r$3) {
					for (g$1 = 0; g$1 < e$2; g$1++) c$2[h + g$1] = i$2[o$2 + g$1];
					h += e$2;
				} else if ("acTL" == r$3) l$2.tabs[r$3] = {
					num_frames: f$2(i$2, o$2),
					num_plays: f$2(i$2, o$2 + 4)
				}, u$1 = new Uint8Array(i$2.length);
				else if ("fcTL" == r$3) {
					if (0 != d) (E = l$2.frames[l$2.frames.length - 1]).data = _decompress(l$2, u$1.slice(0, d), E.rect.width, E.rect.height), d = 0;
					const e$3 = {
						x: f$2(i$2, o$2 + 12),
						y: f$2(i$2, o$2 + 16),
						width: f$2(i$2, o$2 + 4),
						height: f$2(i$2, o$2 + 8)
					};
					let t$2 = s$2(i$2, o$2 + 22);
					t$2 = s$2(i$2, o$2 + 20) / (0 == t$2 ? 100 : t$2);
					const r$4 = {
						rect: e$3,
						delay: Math.round(1e3 * t$2),
						dispose: i$2[o$2 + 24],
						blend: i$2[o$2 + 25]
					};
					l$2.frames.push(r$4);
				} else if ("fdAT" == r$3) {
					for (g$1 = 0; g$1 < e$2 - 4; g$1++) u$1[d + g$1] = i$2[o$2 + g$1 + 4];
					d += e$2 - 4;
				} else if ("pHYs" == r$3) l$2.tabs[r$3] = [
					a$2.readUint(i$2, o$2),
					a$2.readUint(i$2, o$2 + 4),
					i$2[o$2 + 8]
				];
				else if ("cHRM" == r$3) {
					l$2.tabs[r$3] = [];
					for (g$1 = 0; g$1 < 8; g$1++) l$2.tabs[r$3].push(a$2.readUint(i$2, o$2 + 4 * g$1));
				} else if ("tEXt" == r$3 || "zTXt" == r$3) {
					l$2.tabs[r$3] ?? (l$2.tabs[r$3] = {});
					var m$1 = a$2.nextZero(i$2, o$2), w$1 = a$2.readASCII(i$2, o$2, m$1 - o$2), v$1 = o$2 + e$2 - m$1 - 1;
					if ("tEXt" == r$3) y$1 = a$2.readASCII(i$2, m$1 + 1, v$1);
					else {
						var b$1 = _inflate(i$2.slice(m$1 + 2, m$1 + 2 + v$1));
						y$1 = a$2.readUTF8(b$1, 0, b$1.length);
					}
					l$2.tabs[r$3][w$1] = y$1;
				} else if ("iTXt" == r$3) {
					l$2.tabs[r$3] ?? (l$2.tabs[r$3] = {});
					m$1 = 0, p$1 = o$2;
					m$1 = a$2.nextZero(i$2, p$1);
					w$1 = a$2.readASCII(i$2, p$1, m$1 - p$1);
					const t$2 = i$2[p$1 = m$1 + 1];
					var y$1;
					i$2[p$1 + 1], p$1 += 2, m$1 = a$2.nextZero(i$2, p$1), a$2.readASCII(i$2, p$1, m$1 - p$1), p$1 = m$1 + 1, m$1 = a$2.nextZero(i$2, p$1), a$2.readUTF8(i$2, p$1, m$1 - p$1);
					v$1 = e$2 - ((p$1 = m$1 + 1) - o$2);
					if (0 == t$2) y$1 = a$2.readUTF8(i$2, p$1, v$1);
					else {
						b$1 = _inflate(i$2.slice(p$1, p$1 + v$1));
						y$1 = a$2.readUTF8(b$1, 0, b$1.length);
					}
					l$2.tabs[r$3][w$1] = y$1;
				} else if ("PLTE" == r$3) l$2.tabs[r$3] = a$2.readBytes(i$2, o$2, e$2);
				else if ("hIST" == r$3) {
					const e$3 = l$2.tabs.PLTE.length / 3;
					l$2.tabs[r$3] = [];
					for (g$1 = 0; g$1 < e$3; g$1++) l$2.tabs[r$3].push(s$2(i$2, o$2 + 2 * g$1));
				} else if ("tRNS" == r$3) 3 == l$2.ctype ? l$2.tabs[r$3] = a$2.readBytes(i$2, o$2, e$2) : 0 == l$2.ctype ? l$2.tabs[r$3] = s$2(i$2, o$2) : 2 == l$2.ctype && (l$2.tabs[r$3] = [
					s$2(i$2, o$2),
					s$2(i$2, o$2 + 2),
					s$2(i$2, o$2 + 4)
				]);
				else if ("gAMA" == r$3) l$2.tabs[r$3] = a$2.readUint(i$2, o$2) / 1e5;
				else if ("sRGB" == r$3) l$2.tabs[r$3] = i$2[o$2];
				else if ("bKGD" == r$3) 0 == l$2.ctype || 4 == l$2.ctype ? l$2.tabs[r$3] = [s$2(i$2, o$2)] : 2 == l$2.ctype || 6 == l$2.ctype ? l$2.tabs[r$3] = [
					s$2(i$2, o$2),
					s$2(i$2, o$2 + 2),
					s$2(i$2, o$2 + 4)
				] : 3 == l$2.ctype && (l$2.tabs[r$3] = i$2[o$2]);
				else if ("IEND" == r$3) break;
				o$2 += e$2, a$2.readUint(i$2, o$2), o$2 += 4;
			}
			var E;
			return 0 != d && ((E = l$2.frames[l$2.frames.length - 1]).data = _decompress(l$2, u$1.slice(0, d), E.rect.width, E.rect.height)), l$2.data = _decompress(l$2, c$2, l$2.width, l$2.height), delete l$2.compress, delete l$2.interlace, delete l$2.filter, l$2;
		},
		toRGBA8: function toRGBA8(e$2) {
			const t$2 = e$2.width, r$2 = e$2.height;
			if (null == e$2.tabs.acTL) return [decodeImage(e$2.data, t$2, r$2, e$2).buffer];
			const i$2 = [];
			e$2.frames[0].data ?? (e$2.frames[0].data = e$2.data);
			const o$2 = t$2 * r$2 * 4, a$2 = new Uint8Array(o$2), s$2 = new Uint8Array(o$2), f$2 = new Uint8Array(o$2);
			for (let c$2 = 0; c$2 < e$2.frames.length; c$2++) {
				const u$1 = e$2.frames[c$2], h = u$1.rect.x, d = u$1.rect.y, A$1 = u$1.rect.width, g$1 = u$1.rect.height, p$1 = decodeImage(u$1.data, A$1, g$1, e$2);
				if (0 != c$2) for (var l$2 = 0; l$2 < o$2; l$2++) f$2[l$2] = a$2[l$2];
				if (0 == u$1.blend ? _copyTile(p$1, A$1, g$1, a$2, t$2, r$2, h, d, 0) : 1 == u$1.blend && _copyTile(p$1, A$1, g$1, a$2, t$2, r$2, h, d, 1), i$2.push(a$2.buffer.slice(0)), 0 == u$1.dispose);
				else if (1 == u$1.dispose) _copyTile(s$2, A$1, g$1, a$2, t$2, r$2, h, d, 0);
				else if (2 == u$1.dispose) for (l$2 = 0; l$2 < o$2; l$2++) a$2[l$2] = f$2[l$2];
			}
			return i$2;
		},
		_paeth,
		_copyTile,
		_bin: e$1
	};
}();
(function() {
	const { _copyTile: e$1 } = UPNG, { _bin: t$1 } = UPNG, r$2 = UPNG._paeth;
	var i$2 = {
		table: function() {
			const e$2 = new Uint32Array(256);
			for (let t$2 = 0; t$2 < 256; t$2++) {
				let r$3 = t$2;
				for (let e$3 = 0; e$3 < 8; e$3++) 1 & r$3 ? r$3 = 3988292384 ^ r$3 >>> 1 : r$3 >>>= 1;
				e$2[t$2] = r$3;
			}
			return e$2;
		}(),
		update(e$2, t$2, r$3, o$3) {
			for (let a$2 = 0; a$2 < o$3; a$2++) e$2 = i$2.table[255 & (e$2 ^ t$2[r$3 + a$2])] ^ e$2 >>> 8;
			return e$2;
		},
		crc: (e$2, t$2, r$3) => 4294967295 ^ i$2.update(4294967295, e$2, t$2, r$3)
	};
	function addErr(e$2, t$2, r$3, i$3) {
		t$2[r$3] += e$2[0] * i$3 >> 4, t$2[r$3 + 1] += e$2[1] * i$3 >> 4, t$2[r$3 + 2] += e$2[2] * i$3 >> 4, t$2[r$3 + 3] += e$2[3] * i$3 >> 4;
	}
	function N(e$2) {
		return Math.max(0, Math.min(255, e$2));
	}
	function D$1(e$2, t$2) {
		const r$3 = e$2[0] - t$2[0], i$3 = e$2[1] - t$2[1], o$3 = e$2[2] - t$2[2], a$2 = e$2[3] - t$2[3];
		return r$3 * r$3 + i$3 * i$3 + o$3 * o$3 + a$2 * a$2;
	}
	function dither(e$2, t$2, r$3, i$3, o$3, a$2, s$2) {
		s$2 ??= 1;
		const f$2 = i$3.length, l$2 = [];
		for (var c$2 = 0; c$2 < f$2; c$2++) {
			const e$3 = i$3[c$2];
			l$2.push([
				e$3 >>> 0 & 255,
				e$3 >>> 8 & 255,
				e$3 >>> 16 & 255,
				e$3 >>> 24 & 255
			]);
		}
		for (c$2 = 0; c$2 < f$2; c$2++) {
			let e$3 = 4294967295;
			for (var u$1 = 0, h = 0; h < f$2; h++) {
				var d = D$1(l$2[c$2], l$2[h]);
				h != c$2 && d < e$3 && (e$3 = d, u$1 = h);
			}
		}
		const A$1 = new Uint32Array(o$3.buffer), g$1 = new Int16Array(t$2 * r$3 * 4), p$1 = [
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
		for (c$2 = 0; c$2 < p$1.length; c$2++) p$1[c$2] = 255 * ((p$1[c$2] + .5) / 16 - .5);
		for (let o$4 = 0; o$4 < r$3; o$4++) for (let w$1 = 0; w$1 < t$2; w$1++) {
			var m$1;
			c$2 = 4 * (o$4 * t$2 + w$1);
			if (2 != s$2) m$1 = [
				N(e$2[c$2] + g$1[c$2]),
				N(e$2[c$2 + 1] + g$1[c$2 + 1]),
				N(e$2[c$2 + 2] + g$1[c$2 + 2]),
				N(e$2[c$2 + 3] + g$1[c$2 + 3])
			];
			else {
				d = p$1[4 * (3 & o$4) + (3 & w$1)];
				m$1 = [
					N(e$2[c$2] + d),
					N(e$2[c$2 + 1] + d),
					N(e$2[c$2 + 2] + d),
					N(e$2[c$2 + 3] + d)
				];
			}
			u$1 = 0;
			let v$1 = 16777215;
			for (h = 0; h < f$2; h++) {
				const e$3 = D$1(m$1, l$2[h]);
				e$3 < v$1 && (v$1 = e$3, u$1 = h);
			}
			const b$1 = l$2[u$1], y$1 = [
				m$1[0] - b$1[0],
				m$1[1] - b$1[1],
				m$1[2] - b$1[2],
				m$1[3] - b$1[3]
			];
			1 == s$2 && (w$1 != t$2 - 1 && addErr(y$1, g$1, c$2 + 4, 7), o$4 != r$3 - 1 && (0 != w$1 && addErr(y$1, g$1, c$2 + 4 * t$2 - 4, 3), addErr(y$1, g$1, c$2 + 4 * t$2, 5), w$1 != t$2 - 1 && addErr(y$1, g$1, c$2 + 4 * t$2 + 4, 1))), a$2[c$2 >> 2] = u$1, A$1[c$2 >> 2] = i$3[u$1];
		}
	}
	function _main(e$2, r$3, o$3, a$2, s$2) {
		s$2 ??= {};
		const { crc: f$2 } = i$2, l$2 = t$1.writeUint, c$2 = t$1.writeUshort, u$1 = t$1.writeASCII;
		let h = 8;
		const d = e$2.frames.length > 1;
		let A$1, g$1 = !1, p$1 = 33 + (d ? 20 : 0);
		if (null != s$2.sRGB && (p$1 += 13), null != s$2.pHYs && (p$1 += 21), null != s$2.iCCP && (A$1 = pako.deflate(s$2.iCCP), p$1 += 21 + A$1.length + 4), 3 == e$2.ctype) {
			for (var m$1 = e$2.plte.length, w$1 = 0; w$1 < m$1; w$1++) e$2.plte[w$1] >>> 24 != 255 && (g$1 = !0);
			p$1 += 8 + 3 * m$1 + 4 + (g$1 ? 8 + 1 * m$1 + 4 : 0);
		}
		for (var v$1 = 0; v$1 < e$2.frames.length; v$1++) d && (p$1 += 38), p$1 += (F$1 = e$2.frames[v$1]).cimg.length + 12, 0 != v$1 && (p$1 += 4);
		p$1 += 12;
		const b$1 = new Uint8Array(p$1), y$1 = [
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		];
		for (w$1 = 0; w$1 < 8; w$1++) b$1[w$1] = y$1[w$1];
		if (l$2(b$1, h, 13), h += 4, u$1(b$1, h, "IHDR"), h += 4, l$2(b$1, h, r$3), h += 4, l$2(b$1, h, o$3), h += 4, b$1[h] = e$2.depth, h++, b$1[h] = e$2.ctype, h++, b$1[h] = 0, h++, b$1[h] = 0, h++, b$1[h] = 0, h++, l$2(b$1, h, f$2(b$1, h - 17, 17)), h += 4, null != s$2.sRGB && (l$2(b$1, h, 1), h += 4, u$1(b$1, h, "sRGB"), h += 4, b$1[h] = s$2.sRGB, h++, l$2(b$1, h, f$2(b$1, h - 5, 5)), h += 4), null != s$2.iCCP) {
			const e$3 = 13 + A$1.length;
			l$2(b$1, h, e$3), h += 4, u$1(b$1, h, "iCCP"), h += 4, u$1(b$1, h, "ICC profile"), h += 11, h += 2, b$1.set(A$1, h), h += A$1.length, l$2(b$1, h, f$2(b$1, h - (e$3 + 4), e$3 + 4)), h += 4;
		}
		if (null != s$2.pHYs && (l$2(b$1, h, 9), h += 4, u$1(b$1, h, "pHYs"), h += 4, l$2(b$1, h, s$2.pHYs[0]), h += 4, l$2(b$1, h, s$2.pHYs[1]), h += 4, b$1[h] = s$2.pHYs[2], h++, l$2(b$1, h, f$2(b$1, h - 13, 13)), h += 4), d && (l$2(b$1, h, 8), h += 4, u$1(b$1, h, "acTL"), h += 4, l$2(b$1, h, e$2.frames.length), h += 4, l$2(b$1, h, null != s$2.loop ? s$2.loop : 0), h += 4, l$2(b$1, h, f$2(b$1, h - 12, 12)), h += 4), 3 == e$2.ctype) {
			l$2(b$1, h, 3 * (m$1 = e$2.plte.length)), h += 4, u$1(b$1, h, "PLTE"), h += 4;
			for (w$1 = 0; w$1 < m$1; w$1++) {
				const t$2 = 3 * w$1, r$4 = e$2.plte[w$1], i$3 = 255 & r$4, o$4 = r$4 >>> 8 & 255, a$3 = r$4 >>> 16 & 255;
				b$1[h + t$2 + 0] = i$3, b$1[h + t$2 + 1] = o$4, b$1[h + t$2 + 2] = a$3;
			}
			if (h += 3 * m$1, l$2(b$1, h, f$2(b$1, h - 3 * m$1 - 4, 3 * m$1 + 4)), h += 4, g$1) {
				l$2(b$1, h, m$1), h += 4, u$1(b$1, h, "tRNS"), h += 4;
				for (w$1 = 0; w$1 < m$1; w$1++) b$1[h + w$1] = e$2.plte[w$1] >>> 24 & 255;
				h += m$1, l$2(b$1, h, f$2(b$1, h - m$1 - 4, m$1 + 4)), h += 4;
			}
		}
		let E = 0;
		for (v$1 = 0; v$1 < e$2.frames.length; v$1++) {
			var F$1 = e$2.frames[v$1];
			d && (l$2(b$1, h, 26), h += 4, u$1(b$1, h, "fcTL"), h += 4, l$2(b$1, h, E++), h += 4, l$2(b$1, h, F$1.rect.width), h += 4, l$2(b$1, h, F$1.rect.height), h += 4, l$2(b$1, h, F$1.rect.x), h += 4, l$2(b$1, h, F$1.rect.y), h += 4, c$2(b$1, h, a$2[v$1]), h += 2, c$2(b$1, h, 1e3), h += 2, b$1[h] = F$1.dispose, h++, b$1[h] = F$1.blend, h++, l$2(b$1, h, f$2(b$1, h - 30, 30)), h += 4);
			const t$2 = F$1.cimg;
			l$2(b$1, h, (m$1 = t$2.length) + (0 == v$1 ? 0 : 4)), h += 4;
			const r$4 = h;
			u$1(b$1, h, 0 == v$1 ? "IDAT" : "fdAT"), h += 4, 0 != v$1 && (l$2(b$1, h, E++), h += 4), b$1.set(t$2, h), h += m$1, l$2(b$1, h, f$2(b$1, r$4, h - r$4)), h += 4;
		}
		return l$2(b$1, h, 0), h += 4, u$1(b$1, h, "IEND"), h += 4, l$2(b$1, h, f$2(b$1, h - 4, 4)), h += 4, b$1.buffer;
	}
	function compressPNG(e$2, t$2, r$3) {
		for (let i$3 = 0; i$3 < e$2.frames.length; i$3++) {
			const o$3 = e$2.frames[i$3];
			o$3.rect.width;
			const a$2 = o$3.rect.height, s$2 = new Uint8Array(a$2 * o$3.bpl + a$2);
			o$3.cimg = _filterZero(o$3.img, a$2, o$3.bpp, o$3.bpl, s$2, t$2, r$3);
		}
	}
	function compress$2(t$2, r$3, i$3, o$3, a$2) {
		const s$2 = a$2[0], f$2 = a$2[1], l$2 = a$2[2], c$2 = a$2[3], u$1 = a$2[4], h = a$2[5];
		let d = 6, A$1 = 8, g$1 = 255;
		for (var p$1 = 0; p$1 < t$2.length; p$1++) {
			const e$2 = new Uint8Array(t$2[p$1]);
			for (var m$1 = e$2.length, w$1 = 0; w$1 < m$1; w$1 += 4) g$1 &= e$2[w$1 + 3];
		}
		const v$1 = 255 != g$1, b$1 = function framize(t$3, r$4, i$4, o$4, a$3, s$3) {
			const f$3 = [];
			for (var l$3 = 0; l$3 < t$3.length; l$3++) {
				const h$2 = new Uint8Array(t$3[l$3]), A$3 = new Uint32Array(h$2.buffer);
				var c$3;
				let g$2 = 0, p$2 = 0, m$2 = r$4, w$2 = i$4, v$2 = o$4 ? 1 : 0;
				if (0 != l$3) {
					const b$2 = s$3 || o$4 || 1 == l$3 || 0 != f$3[l$3 - 2].dispose ? 1 : 2;
					let y$2 = 0, E$1 = 1e9;
					for (let e$2 = 0; e$2 < b$2; e$2++) {
						var u$2 = new Uint8Array(t$3[l$3 - 1 - e$2]);
						const o$5 = new Uint32Array(t$3[l$3 - 1 - e$2]);
						let s$4 = r$4, f$4 = i$4, c$4 = -1, h$3 = -1;
						for (let e$3 = 0; e$3 < i$4; e$3++) for (let t$4 = 0; t$4 < r$4; t$4++) A$3[d$1 = e$3 * r$4 + t$4] != o$5[d$1] && (t$4 < s$4 && (s$4 = t$4), t$4 > c$4 && (c$4 = t$4), e$3 < f$4 && (f$4 = e$3), e$3 > h$3 && (h$3 = e$3));
						-1 == c$4 && (s$4 = f$4 = c$4 = h$3 = 0), a$3 && (1 == (1 & s$4) && s$4--, 1 == (1 & f$4) && f$4--);
						const v$3 = (c$4 - s$4 + 1) * (h$3 - f$4 + 1);
						v$3 < E$1 && (E$1 = v$3, y$2 = e$2, g$2 = s$4, p$2 = f$4, m$2 = c$4 - s$4 + 1, w$2 = h$3 - f$4 + 1);
					}
					u$2 = new Uint8Array(t$3[l$3 - 1 - y$2]);
					1 == y$2 && (f$3[l$3 - 1].dispose = 2), c$3 = new Uint8Array(m$2 * w$2 * 4), e$1(u$2, r$4, i$4, c$3, m$2, w$2, -g$2, -p$2, 0), v$2 = e$1(h$2, r$4, i$4, c$3, m$2, w$2, -g$2, -p$2, 3) ? 1 : 0, 1 == v$2 ? _prepareDiff(h$2, r$4, i$4, c$3, {
						x: g$2,
						y: p$2,
						width: m$2,
						height: w$2
					}) : e$1(h$2, r$4, i$4, c$3, m$2, w$2, -g$2, -p$2, 0);
				} else c$3 = h$2.slice(0);
				f$3.push({
					rect: {
						x: g$2,
						y: p$2,
						width: m$2,
						height: w$2
					},
					img: c$3,
					blend: v$2,
					dispose: 0
				});
			}
			if (o$4) for (l$3 = 0; l$3 < f$3.length; l$3++) {
				if (1 == (A$2 = f$3[l$3]).blend) continue;
				const e$2 = A$2.rect, o$5 = f$3[l$3 - 1].rect, s$4 = Math.min(e$2.x, o$5.x), c$4 = Math.min(e$2.y, o$5.y), u$3 = {
					x: s$4,
					y: c$4,
					width: Math.max(e$2.x + e$2.width, o$5.x + o$5.width) - s$4,
					height: Math.max(e$2.y + e$2.height, o$5.y + o$5.height) - c$4
				};
				f$3[l$3 - 1].dispose = 1, l$3 - 1 != 0 && _updateFrame(t$3, r$4, i$4, f$3, l$3 - 1, u$3, a$3), _updateFrame(t$3, r$4, i$4, f$3, l$3, u$3, a$3);
			}
			let h$1 = 0;
			if (1 != t$3.length) for (var d$1 = 0; d$1 < f$3.length; d$1++) {
				var A$2;
				h$1 += (A$2 = f$3[d$1]).rect.width * A$2.rect.height;
			}
			return f$3;
		}(t$2, r$3, i$3, s$2, f$2, l$2), y$1 = {}, E = [], F$1 = [];
		if (0 != o$3) {
			const e$2 = [];
			for (w$1 = 0; w$1 < b$1.length; w$1++) e$2.push(b$1[w$1].img.buffer);
			const t$3 = function concatRGBA(e$3) {
				let t$4 = 0;
				for (var r$5 = 0; r$5 < e$3.length; r$5++) t$4 += e$3[r$5].byteLength;
				const i$5 = new Uint8Array(t$4);
				let o$4 = 0;
				for (r$5 = 0; r$5 < e$3.length; r$5++) {
					const t$5 = new Uint8Array(e$3[r$5]), a$3 = t$5.length;
					for (let e$4 = 0; e$4 < a$3; e$4 += 4) {
						let r$6 = t$5[e$4], a$4 = t$5[e$4 + 1], s$3 = t$5[e$4 + 2];
						const f$3 = t$5[e$4 + 3];
						0 == f$3 && (r$6 = a$4 = s$3 = 0), i$5[o$4 + e$4] = r$6, i$5[o$4 + e$4 + 1] = a$4, i$5[o$4 + e$4 + 2] = s$3, i$5[o$4 + e$4 + 3] = f$3;
					}
					o$4 += a$3;
				}
				return i$5.buffer;
			}(e$2), r$4 = quantize(t$3, o$3);
			for (w$1 = 0; w$1 < r$4.plte.length; w$1++) E.push(r$4.plte[w$1].est.rgba);
			let i$4 = 0;
			for (w$1 = 0; w$1 < b$1.length; w$1++) {
				const e$3 = (B$1 = b$1[w$1]).img.length;
				var _$1 = new Uint8Array(r$4.inds.buffer, i$4 >> 2, e$3 >> 2);
				F$1.push(_$1);
				const t$4 = new Uint8Array(r$4.abuf, i$4, e$3);
				h && dither(B$1.img, B$1.rect.width, B$1.rect.height, E, t$4, _$1), B$1.img.set(t$4), i$4 += e$3;
			}
		} else for (p$1 = 0; p$1 < b$1.length; p$1++) {
			var B$1 = b$1[p$1];
			const e$2 = new Uint32Array(B$1.img.buffer);
			var U$1 = B$1.rect.width;
			m$1 = e$2.length, _$1 = new Uint8Array(m$1);
			F$1.push(_$1);
			for (w$1 = 0; w$1 < m$1; w$1++) {
				const t$3 = e$2[w$1];
				if (0 != w$1 && t$3 == e$2[w$1 - 1]) _$1[w$1] = _$1[w$1 - 1];
				else if (w$1 > U$1 && t$3 == e$2[w$1 - U$1]) _$1[w$1] = _$1[w$1 - U$1];
				else {
					let e$3 = y$1[t$3];
					if (null == e$3 && (y$1[t$3] = e$3 = E.length, E.push(t$3), E.length >= 300)) break;
					_$1[w$1] = e$3;
				}
			}
		}
		const C$1 = E.length;
		C$1 <= 256 && 0 == u$1 && (A$1 = C$1 <= 2 ? 1 : C$1 <= 4 ? 2 : C$1 <= 16 ? 4 : 8, A$1 = Math.max(A$1, c$2));
		for (p$1 = 0; p$1 < b$1.length; p$1++) {
			(B$1 = b$1[p$1]).rect.x, B$1.rect.y;
			U$1 = B$1.rect.width;
			const e$2 = B$1.rect.height;
			let t$3 = B$1.img;
			new Uint32Array(t$3.buffer);
			let r$4 = 4 * U$1, i$4 = 4;
			if (C$1 <= 256 && 0 == u$1) {
				r$4 = Math.ceil(A$1 * U$1 / 8);
				var I$1 = new Uint8Array(r$4 * e$2);
				const o$4 = F$1[p$1];
				for (let t$4 = 0; t$4 < e$2; t$4++) {
					w$1 = t$4 * r$4;
					const e$3 = t$4 * U$1;
					if (8 == A$1) for (var Q$1 = 0; Q$1 < U$1; Q$1++) I$1[w$1 + Q$1] = o$4[e$3 + Q$1];
					else if (4 == A$1) for (Q$1 = 0; Q$1 < U$1; Q$1++) I$1[w$1 + (Q$1 >> 1)] |= o$4[e$3 + Q$1] << 4 - 4 * (1 & Q$1);
					else if (2 == A$1) for (Q$1 = 0; Q$1 < U$1; Q$1++) I$1[w$1 + (Q$1 >> 2)] |= o$4[e$3 + Q$1] << 6 - 2 * (3 & Q$1);
					else if (1 == A$1) for (Q$1 = 0; Q$1 < U$1; Q$1++) I$1[w$1 + (Q$1 >> 3)] |= o$4[e$3 + Q$1] << 7 - 1 * (7 & Q$1);
				}
				t$3 = I$1, d = 3, i$4 = 1;
			} else if (0 == v$1 && 1 == b$1.length) {
				I$1 = new Uint8Array(U$1 * e$2 * 3);
				const o$4 = U$1 * e$2;
				for (w$1 = 0; w$1 < o$4; w$1++) {
					const e$3 = 3 * w$1, r$5 = 4 * w$1;
					I$1[e$3] = t$3[r$5], I$1[e$3 + 1] = t$3[r$5 + 1], I$1[e$3 + 2] = t$3[r$5 + 2];
				}
				t$3 = I$1, d = 2, i$4 = 3, r$4 = 3 * U$1;
			}
			B$1.img = t$3, B$1.bpl = r$4, B$1.bpp = i$4;
		}
		return {
			ctype: d,
			depth: A$1,
			plte: E,
			frames: b$1
		};
	}
	function _updateFrame(t$2, r$3, i$3, o$3, a$2, s$2, f$2) {
		const l$2 = Uint8Array, c$2 = Uint32Array, u$1 = new l$2(t$2[a$2 - 1]), h = new c$2(t$2[a$2 - 1]), d = a$2 + 1 < t$2.length ? new l$2(t$2[a$2 + 1]) : null, A$1 = new l$2(t$2[a$2]), g$1 = new c$2(A$1.buffer);
		let p$1 = r$3, m$1 = i$3, w$1 = -1, v$1 = -1;
		for (let e$2 = 0; e$2 < s$2.height; e$2++) for (let t$3 = 0; t$3 < s$2.width; t$3++) {
			const i$4 = s$2.x + t$3, f$3 = s$2.y + e$2, l$3 = f$3 * r$3 + i$4, c$3 = g$1[l$3];
			0 == c$3 || 0 == o$3[a$2 - 1].dispose && h[l$3] == c$3 && (null == d || 0 != d[4 * l$3 + 3]) || (i$4 < p$1 && (p$1 = i$4), i$4 > w$1 && (w$1 = i$4), f$3 < m$1 && (m$1 = f$3), f$3 > v$1 && (v$1 = f$3));
		}
		-1 == w$1 && (p$1 = m$1 = w$1 = v$1 = 0), f$2 && (1 == (1 & p$1) && p$1--, 1 == (1 & m$1) && m$1--), s$2 = {
			x: p$1,
			y: m$1,
			width: w$1 - p$1 + 1,
			height: v$1 - m$1 + 1
		};
		const b$1 = o$3[a$2];
		b$1.rect = s$2, b$1.blend = 1, b$1.img = new Uint8Array(s$2.width * s$2.height * 4), 0 == o$3[a$2 - 1].dispose ? (e$1(u$1, r$3, i$3, b$1.img, s$2.width, s$2.height, -s$2.x, -s$2.y, 0), _prepareDiff(A$1, r$3, i$3, b$1.img, s$2)) : e$1(A$1, r$3, i$3, b$1.img, s$2.width, s$2.height, -s$2.x, -s$2.y, 0);
	}
	function _prepareDiff(t$2, r$3, i$3, o$3, a$2) {
		e$1(t$2, r$3, i$3, o$3, a$2.width, a$2.height, -a$2.x, -a$2.y, 2);
	}
	function _filterZero(e$2, t$2, r$3, i$3, o$3, a$2, s$2) {
		const f$2 = [];
		let l$2, c$2 = [
			0,
			1,
			2,
			3,
			4
		];
		-1 != a$2 ? c$2 = [a$2] : (t$2 * i$3 > 5e5 || 1 == r$3) && (c$2 = [0]), s$2 && (l$2 = { level: 0 });
		const u$1 = UZIP;
		for (var h = 0; h < c$2.length; h++) {
			for (let a$3 = 0; a$3 < t$2; a$3++) _filterLine(o$3, e$2, a$3, i$3, r$3, c$2[h]);
			f$2.push(u$1.deflate(o$3, l$2));
		}
		let d, A$1 = 1e9;
		for (h = 0; h < f$2.length; h++) f$2[h].length < A$1 && (d = h, A$1 = f$2[h].length);
		return f$2[d];
	}
	function _filterLine(e$2, t$2, i$3, o$3, a$2, s$2) {
		const f$2 = i$3 * o$3;
		let l$2 = f$2 + i$3;
		if (e$2[l$2] = s$2, l$2++, 0 == s$2) if (o$3 < 500) for (var c$2 = 0; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2];
		else e$2.set(new Uint8Array(t$2.buffer, f$2, o$3), l$2);
		else if (1 == s$2) {
			for (c$2 = 0; c$2 < a$2; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2];
			for (c$2 = a$2; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] - t$2[f$2 + c$2 - a$2] + 256 & 255;
		} else if (0 == i$3) {
			for (c$2 = 0; c$2 < a$2; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2];
			if (2 == s$2) for (c$2 = a$2; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2];
			if (3 == s$2) for (c$2 = a$2; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] - (t$2[f$2 + c$2 - a$2] >> 1) + 256 & 255;
			if (4 == s$2) for (c$2 = a$2; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] - r$2(t$2[f$2 + c$2 - a$2], 0, 0) + 256 & 255;
		} else {
			if (2 == s$2) for (c$2 = 0; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] + 256 - t$2[f$2 + c$2 - o$3] & 255;
			if (3 == s$2) {
				for (c$2 = 0; c$2 < a$2; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] + 256 - (t$2[f$2 + c$2 - o$3] >> 1) & 255;
				for (c$2 = a$2; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] + 256 - (t$2[f$2 + c$2 - o$3] + t$2[f$2 + c$2 - a$2] >> 1) & 255;
			}
			if (4 == s$2) {
				for (c$2 = 0; c$2 < a$2; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] + 256 - r$2(0, t$2[f$2 + c$2 - o$3], 0) & 255;
				for (c$2 = a$2; c$2 < o$3; c$2++) e$2[l$2 + c$2] = t$2[f$2 + c$2] + 256 - r$2(t$2[f$2 + c$2 - a$2], t$2[f$2 + c$2 - o$3], t$2[f$2 + c$2 - a$2 - o$3]) & 255;
			}
		}
	}
	function quantize(e$2, t$2) {
		const r$3 = new Uint8Array(e$2), i$3 = r$3.slice(0), o$3 = new Uint32Array(i$3.buffer), a$2 = getKDtree(i$3, t$2), s$2 = a$2[0], f$2 = a$2[1], l$2 = r$3.length, c$2 = new Uint8Array(l$2 >> 2);
		let u$1;
		if (r$3.length < 2e7) for (var h = 0; h < l$2; h += 4) u$1 = getNearest(s$2, d = r$3[h] * (1 / 255), A$1 = r$3[h + 1] * (1 / 255), g$1 = r$3[h + 2] * (1 / 255), p$1 = r$3[h + 3] * (1 / 255)), c$2[h >> 2] = u$1.ind, o$3[h >> 2] = u$1.est.rgba;
		else for (h = 0; h < l$2; h += 4) {
			var d = r$3[h] * (1 / 255), A$1 = r$3[h + 1] * (1 / 255), g$1 = r$3[h + 2] * (1 / 255), p$1 = r$3[h + 3] * (1 / 255);
			for (u$1 = s$2; u$1.left;) u$1 = planeDst(u$1.est, d, A$1, g$1, p$1) <= 0 ? u$1.left : u$1.right;
			c$2[h >> 2] = u$1.ind, o$3[h >> 2] = u$1.est.rgba;
		}
		return {
			abuf: i$3.buffer,
			inds: c$2,
			plte: f$2
		};
	}
	function getKDtree(e$2, t$2, r$3) {
		r$3 ??= 1e-4;
		const i$3 = new Uint32Array(e$2.buffer), o$3 = {
			i0: 0,
			i1: e$2.length,
			bst: null,
			est: null,
			tdst: 0,
			left: null,
			right: null
		};
		o$3.bst = stats(e$2, o$3.i0, o$3.i1), o$3.est = estats(o$3.bst);
		const a$2 = [o$3];
		for (; a$2.length < t$2;) {
			let t$3 = 0, o$4 = 0;
			for (var s$2 = 0; s$2 < a$2.length; s$2++) a$2[s$2].est.L > t$3 && (t$3 = a$2[s$2].est.L, o$4 = s$2);
			if (t$3 < r$3) break;
			const f$2 = a$2[o$4], l$2 = splitPixels(e$2, i$3, f$2.i0, f$2.i1, f$2.est.e, f$2.est.eMq255);
			if (f$2.i0 >= l$2 || f$2.i1 <= l$2) {
				f$2.est.L = 0;
				continue;
			}
			const c$2 = {
				i0: f$2.i0,
				i1: l$2,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
			c$2.bst = stats(e$2, c$2.i0, c$2.i1), c$2.est = estats(c$2.bst);
			const u$1 = {
				i0: l$2,
				i1: f$2.i1,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
			u$1.bst = {
				R: [],
				m: [],
				N: f$2.bst.N - c$2.bst.N
			};
			for (s$2 = 0; s$2 < 16; s$2++) u$1.bst.R[s$2] = f$2.bst.R[s$2] - c$2.bst.R[s$2];
			for (s$2 = 0; s$2 < 4; s$2++) u$1.bst.m[s$2] = f$2.bst.m[s$2] - c$2.bst.m[s$2];
			u$1.est = estats(u$1.bst), f$2.left = c$2, f$2.right = u$1, a$2[o$4] = c$2, a$2.push(u$1);
		}
		a$2.sort(((e$3, t$3) => t$3.bst.N - e$3.bst.N));
		for (s$2 = 0; s$2 < a$2.length; s$2++) a$2[s$2].ind = s$2;
		return [o$3, a$2];
	}
	function getNearest(e$2, t$2, r$3, i$3, o$3) {
		if (null == e$2.left) return e$2.tdst = function dist(e$3, t$3, r$4, i$4, o$4) {
			const a$3 = t$3 - e$3[0], s$3 = r$4 - e$3[1], f$3 = i$4 - e$3[2], l$3 = o$4 - e$3[3];
			return a$3 * a$3 + s$3 * s$3 + f$3 * f$3 + l$3 * l$3;
		}(e$2.est.q, t$2, r$3, i$3, o$3), e$2;
		const a$2 = planeDst(e$2.est, t$2, r$3, i$3, o$3);
		let s$2 = e$2.left, f$2 = e$2.right;
		a$2 > 0 && (s$2 = e$2.right, f$2 = e$2.left);
		const l$2 = getNearest(s$2, t$2, r$3, i$3, o$3);
		if (l$2.tdst <= a$2 * a$2) return l$2;
		const c$2 = getNearest(f$2, t$2, r$3, i$3, o$3);
		return c$2.tdst < l$2.tdst ? c$2 : l$2;
	}
	function planeDst(e$2, t$2, r$3, i$3, o$3) {
		const { e: a$2 } = e$2;
		return a$2[0] * t$2 + a$2[1] * r$3 + a$2[2] * i$3 + a$2[3] * o$3 - e$2.eMq;
	}
	function splitPixels(e$2, t$2, r$3, i$3, o$3, a$2) {
		for (i$3 -= 4; r$3 < i$3;) {
			for (; vecDot(e$2, r$3, o$3) <= a$2;) r$3 += 4;
			for (; vecDot(e$2, i$3, o$3) > a$2;) i$3 -= 4;
			if (r$3 >= i$3) break;
			const s$2 = t$2[r$3 >> 2];
			t$2[r$3 >> 2] = t$2[i$3 >> 2], t$2[i$3 >> 2] = s$2, r$3 += 4, i$3 -= 4;
		}
		for (; vecDot(e$2, r$3, o$3) > a$2;) r$3 -= 4;
		return r$3 + 4;
	}
	function vecDot(e$2, t$2, r$3) {
		return e$2[t$2] * r$3[0] + e$2[t$2 + 1] * r$3[1] + e$2[t$2 + 2] * r$3[2] + e$2[t$2 + 3] * r$3[3];
	}
	function stats(e$2, t$2, r$3) {
		const i$3 = [
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
		], o$3 = [
			0,
			0,
			0,
			0
		], a$2 = r$3 - t$2 >> 2;
		for (let a$3 = t$2; a$3 < r$3; a$3 += 4) {
			const t$3 = e$2[a$3] * (1 / 255), r$4 = e$2[a$3 + 1] * (1 / 255), s$2 = e$2[a$3 + 2] * (1 / 255), f$2 = e$2[a$3 + 3] * (1 / 255);
			o$3[0] += t$3, o$3[1] += r$4, o$3[2] += s$2, o$3[3] += f$2, i$3[0] += t$3 * t$3, i$3[1] += t$3 * r$4, i$3[2] += t$3 * s$2, i$3[3] += t$3 * f$2, i$3[5] += r$4 * r$4, i$3[6] += r$4 * s$2, i$3[7] += r$4 * f$2, i$3[10] += s$2 * s$2, i$3[11] += s$2 * f$2, i$3[15] += f$2 * f$2;
		}
		return i$3[4] = i$3[1], i$3[8] = i$3[2], i$3[9] = i$3[6], i$3[12] = i$3[3], i$3[13] = i$3[7], i$3[14] = i$3[11], {
			R: i$3,
			m: o$3,
			N: a$2
		};
	}
	function estats(e$2) {
		const { R: t$2 } = e$2, { m: r$3 } = e$2, { N: i$3 } = e$2, a$2 = r$3[0], s$2 = r$3[1], f$2 = r$3[2], l$2 = r$3[3], c$2 = 0 == i$3 ? 0 : 1 / i$3, u$1 = [
			t$2[0] - a$2 * a$2 * c$2,
			t$2[1] - a$2 * s$2 * c$2,
			t$2[2] - a$2 * f$2 * c$2,
			t$2[3] - a$2 * l$2 * c$2,
			t$2[4] - s$2 * a$2 * c$2,
			t$2[5] - s$2 * s$2 * c$2,
			t$2[6] - s$2 * f$2 * c$2,
			t$2[7] - s$2 * l$2 * c$2,
			t$2[8] - f$2 * a$2 * c$2,
			t$2[9] - f$2 * s$2 * c$2,
			t$2[10] - f$2 * f$2 * c$2,
			t$2[11] - f$2 * l$2 * c$2,
			t$2[12] - l$2 * a$2 * c$2,
			t$2[13] - l$2 * s$2 * c$2,
			t$2[14] - l$2 * f$2 * c$2,
			t$2[15] - l$2 * l$2 * c$2
		], h = u$1, d = o$2;
		let A$1 = [
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random()
		], g$1 = 0, p$1 = 0;
		if (0 != i$3) for (let e$3 = 0; e$3 < 16 && (A$1 = d.multVec(h, A$1), p$1 = Math.sqrt(d.dot(A$1, A$1)), A$1 = d.sml(1 / p$1, A$1), !(0 != e$3 && Math.abs(p$1 - g$1) < 1e-9)); e$3++) g$1 = p$1;
		const m$1 = [
			a$2 * c$2,
			s$2 * c$2,
			f$2 * c$2,
			l$2 * c$2
		];
		return {
			Cov: u$1,
			q: m$1,
			e: A$1,
			L: g$1,
			eMq255: d.dot(d.sml(255, m$1), A$1),
			eMq: d.dot(A$1, m$1),
			rgba: (Math.round(255 * m$1[3]) << 24 | Math.round(255 * m$1[2]) << 16 | Math.round(255 * m$1[1]) << 8 | Math.round(255 * m$1[0]) << 0) >>> 0
		};
	}
	var o$2 = {
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
	UPNG.encode = function encode$1(e$2, t$2, r$3, i$3, o$3, a$2, s$2) {
		i$3 ??= 0, s$2 ??= !1;
		const f$2 = compress$2(e$2, t$2, r$3, i$3, [
			!1,
			!1,
			!1,
			0,
			s$2,
			!1
		]);
		return compressPNG(f$2, -1), _main(f$2, t$2, r$3, o$3, a$2);
	}, UPNG.encodeLL = function encodeLL(e$2, t$2, r$3, i$3, o$3, a$2, s$2, f$2) {
		const l$2 = {
			ctype: 0 + (1 == i$3 ? 0 : 2) + (0 == o$3 ? 0 : 4),
			depth: a$2,
			frames: []
		}, c$2 = (i$3 + o$3) * a$2, u$1 = c$2 * t$2;
		for (let i$4 = 0; i$4 < e$2.length; i$4++) l$2.frames.push({
			rect: {
				x: 0,
				y: 0,
				width: t$2,
				height: r$3
			},
			img: new Uint8Array(e$2[i$4]),
			blend: 0,
			dispose: 1,
			bpp: Math.ceil(c$2 / 8),
			bpl: Math.ceil(u$1 / 8)
		});
		return compressPNG(l$2, 0, !0), _main(l$2, t$2, r$3, s$2, f$2);
	}, UPNG.encode.compress = compress$2, UPNG.encode.dither = dither, UPNG.quantize = quantize, UPNG.quantize.getKDtree = getKDtree, UPNG.quantize.getNearest = getNearest;
})();
const r$1 = {
	toArrayBuffer(e$1, t$1) {
		const i$2 = e$1.width, o$2 = e$1.height, a$2 = i$2 << 2, s$2 = e$1.getContext("2d").getImageData(0, 0, i$2, o$2), f$2 = new Uint32Array(s$2.data.buffer), l$2 = (32 * i$2 + 31) / 32 << 2, c$2 = l$2 * o$2, u$1 = 122 + c$2, h = new ArrayBuffer(u$1), d = new DataView(h), A$1 = 1 << 20;
		let g$1, p$1, m$1, w$1, v$1 = A$1, b$1 = 0, y$1 = 0, E = 0;
		function set16(e$2) {
			d.setUint16(y$1, e$2, !0), y$1 += 2;
		}
		function set32(e$2) {
			d.setUint32(y$1, e$2, !0), y$1 += 4;
		}
		function seek(e$2) {
			y$1 += e$2;
		}
		set16(19778), set32(u$1), seek(4), set32(122), set32(108), set32(i$2), set32(-o$2 >>> 0), set16(1), set16(32), set32(3), set32(c$2), set32(2835), set32(2835), seek(8), set32(16711680), set32(65280), set32(255), set32(4278190080), set32(1466527264), function convert() {
			for (; b$1 < o$2 && v$1 > 0;) {
				for (w$1 = 122 + b$1 * l$2, g$1 = 0; g$1 < a$2;) v$1--, p$1 = f$2[E++], m$1 = p$1 >>> 24, d.setUint32(w$1 + g$1, p$1 << 8 | m$1), g$1 += 4;
				b$1++;
			}
			E < f$2.length ? (v$1 = A$1, setTimeout(convert, r$1._dly)) : t$1(h);
		}();
	},
	toBlob(e$1, t$1) {
		this.toArrayBuffer(e$1, ((e$2) => {
			t$1(new Blob([e$2], { type: "image/bmp" }));
		}));
	},
	_dly: 9
};
var i$1 = {
	CHROME: "CHROME",
	FIREFOX: "FIREFOX",
	DESKTOP_SAFARI: "DESKTOP_SAFARI",
	IE: "IE",
	IOS: "IOS",
	ETC: "ETC"
}, o$1 = {
	[i$1.CHROME]: 16384,
	[i$1.FIREFOX]: 11180,
	[i$1.DESKTOP_SAFARI]: 16384,
	[i$1.IE]: 8192,
	[i$1.IOS]: 4096,
	[i$1.ETC]: 8192
};
const a$1 = "undefined" != typeof window, s$1 = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, f$1 = a$1 && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper"), CustomFile = (a$1 || s$1) && (f$1 && f$1.getOriginalSymbol(window, "File") || "undefined" != typeof File && File), CustomFileReader = (a$1 || s$1) && (f$1 && f$1.getOriginalSymbol(window, "FileReader") || "undefined" != typeof FileReader && FileReader);
function getFilefromDataUrl(e$1, t$1, r$2 = Date.now()) {
	return new Promise(((i$2) => {
		const o$2 = e$1.split(","), a$2 = o$2[0].match(/:(.*?);/)[1], s$2 = globalThis.atob(o$2[1]);
		let f$2 = s$2.length;
		const l$2 = new Uint8Array(f$2);
		for (; f$2--;) l$2[f$2] = s$2.charCodeAt(f$2);
		const c$2 = new Blob([l$2], { type: a$2 });
		c$2.name = t$1, c$2.lastModified = r$2, i$2(c$2);
	}));
}
function getDataUrlFromFile(e$1) {
	return new Promise(((t$1, r$2) => {
		const i$2 = new CustomFileReader();
		i$2.onload = () => t$1(i$2.result), i$2.onerror = (e$2) => r$2(e$2), i$2.readAsDataURL(e$1);
	}));
}
function loadImage(e$1) {
	return new Promise(((t$1, r$2) => {
		const i$2 = new Image();
		i$2.onload = () => t$1(i$2), i$2.onerror = (e$2) => r$2(e$2), i$2.src = e$1;
	}));
}
function getBrowserName() {
	if (void 0 !== getBrowserName.cachedResult) return getBrowserName.cachedResult;
	let e$1 = i$1.ETC;
	const { userAgent: t$1 } = navigator;
	return /Chrom(e|ium)/i.test(t$1) ? e$1 = i$1.CHROME : /iP(ad|od|hone)/i.test(t$1) && /WebKit/i.test(t$1) ? e$1 = i$1.IOS : /Safari/i.test(t$1) ? e$1 = i$1.DESKTOP_SAFARI : /Firefox/i.test(t$1) ? e$1 = i$1.FIREFOX : (/MSIE/i.test(t$1) || !0 == !!document.documentMode) && (e$1 = i$1.IE), getBrowserName.cachedResult = e$1, getBrowserName.cachedResult;
}
function approximateBelowMaximumCanvasSizeOfBrowser(e$1, t$1) {
	const r$2 = getBrowserName(), i$2 = o$1[r$2];
	let a$2 = e$1, s$2 = t$1, f$2 = a$2 * s$2;
	const l$2 = a$2 > s$2 ? s$2 / a$2 : a$2 / s$2;
	for (; f$2 > i$2 * i$2;) {
		const e$2 = (i$2 + a$2) / 2, t$2 = (i$2 + s$2) / 2;
		e$2 < t$2 ? (s$2 = t$2, a$2 = t$2 * l$2) : (s$2 = e$2 * l$2, a$2 = e$2), f$2 = a$2 * s$2;
	}
	return {
		width: a$2,
		height: s$2
	};
}
function getNewCanvasAndCtx(e$1, t$1) {
	let r$2, i$2;
	try {
		if (r$2 = new OffscreenCanvas(e$1, t$1), i$2 = r$2.getContext("2d"), null === i$2) throw new Error("getContext of OffscreenCanvas returns null");
	} catch (e$2) {
		r$2 = document.createElement("canvas"), i$2 = r$2.getContext("2d");
	}
	return r$2.width = e$1, r$2.height = t$1, [r$2, i$2];
}
function drawImageInCanvas(e$1, t$1) {
	const { width: r$2, height: i$2 } = approximateBelowMaximumCanvasSizeOfBrowser(e$1.width, e$1.height), [o$2, a$2] = getNewCanvasAndCtx(r$2, i$2);
	return t$1 && /jpe?g/.test(t$1) && (a$2.fillStyle = "white", a$2.fillRect(0, 0, o$2.width, o$2.height)), a$2.drawImage(e$1, 0, 0, o$2.width, o$2.height), o$2;
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
	return new Promise((function(r$2, o$2) {
		let a$2, s$2;
		var $Try_2_Post = function() {
			try {
				return s$2 = drawImageInCanvas(a$2, t$1.fileType || e$1.type), r$2([a$2, s$2]);
			} catch (e$2) {
				return o$2(e$2);
			}
		}, $Try_2_Catch = function(t$2) {
			try {
				var $Try_3_Catch = function(e$2) {
					try {
						throw e$2;
					} catch (e$3) {
						return o$2(e$3);
					}
				};
				try {
					let t$3;
					return getDataUrlFromFile(e$1).then((function(e$2) {
						try {
							return t$3 = e$2, loadImage(t$3).then((function(e$3) {
								try {
									return a$2 = e$3, function() {
										try {
											return $Try_2_Post();
										} catch (e$4) {
											return o$2(e$4);
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
				return o$2(e$2);
			}
		};
		try {
			if (isIOS() || [i$1.DESKTOP_SAFARI, i$1.MOBILE_SAFARI].includes(getBrowserName())) throw new Error("Skip createImageBitmap on IOS and Safari");
			return createImageBitmap(e$1).then((function(e$2) {
				try {
					return a$2 = e$2, $Try_2_Post();
				} catch (e$3) {
					return $Try_2_Catch();
				}
			}), $Try_2_Catch);
		} catch (e$2) {
			$Try_2_Catch();
		}
	}));
}
function canvasToFile(e$1, t$1, i$2, o$2, a$2 = 1) {
	return new Promise((function(s$2, f$2) {
		let l$2;
		if ("image/png" === t$1) {
			let c$2, u$1, h;
			return c$2 = e$1.getContext("2d"), {data: u$1} = c$2.getImageData(0, 0, e$1.width, e$1.height), h = UPNG.encode([u$1.buffer], e$1.width, e$1.height, 4096 * a$2), l$2 = new Blob([h], { type: t$1 }), l$2.name = i$2, l$2.lastModified = o$2, $If_4.call(this);
		}
		{
			if ("image/bmp" === t$1) return new Promise(((t$2) => r$1.toBlob(e$1, t$2))).then(function(e$2) {
				try {
					return l$2 = e$2, l$2.name = i$2, l$2.lastModified = o$2, $If_5.call(this);
				} catch (e$3) {
					return f$2(e$3);
				}
			}.bind(this), f$2);
			{
				if ("function" == typeof OffscreenCanvas && e$1 instanceof OffscreenCanvas) return e$1.convertToBlob({
					type: t$1,
					quality: a$2
				}).then(function(e$2) {
					try {
						return l$2 = e$2, l$2.name = i$2, l$2.lastModified = o$2, $If_6.call(this);
					} catch (e$3) {
						return f$2(e$3);
					}
				}.bind(this), f$2);
				{
					let d;
					return d = e$1.toDataURL(t$1, a$2), getFilefromDataUrl(d, i$2, o$2).then(function(e$2) {
						try {
							return l$2 = e$2, $If_6.call(this);
						} catch (e$3) {
							return f$2(e$3);
						}
					}.bind(this), f$2);
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
			return s$2(l$2);
		}
	}));
}
function cleanupCanvasMemory(e$1) {
	e$1.width = 0, e$1.height = 0;
}
function isAutoOrientationInBrowser() {
	return new Promise((function(e$1, t$1) {
		let i$2, o$2, a$2, s$2;
		return void 0 !== isAutoOrientationInBrowser.cachedResult ? e$1(isAutoOrientationInBrowser.cachedResult) : getFilefromDataUrl("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", "test.jpg", Date.now()).then((function(r$2) {
			try {
				return i$2 = r$2, drawFileInCanvas(i$2).then((function(r$3) {
					try {
						return o$2 = r$3[1], canvasToFile(o$2, i$2.type, i$2.name, i$2.lastModified).then((function(r$4) {
							try {
								return a$2 = r$4, cleanupCanvasMemory(o$2), drawFileInCanvas(a$2).then((function(r$5) {
									try {
										return s$2 = r$5[0], isAutoOrientationInBrowser.cachedResult = 1 === s$2.width && 2 === s$2.height, e$1(isAutoOrientationInBrowser.cachedResult);
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
	return new Promise(((t$1, r$2) => {
		const i$2 = new CustomFileReader();
		i$2.onload = (e$2) => {
			const r$3 = new DataView(e$2.target.result);
			if (65496 != r$3.getUint16(0, !1)) return t$1(-2);
			const i$3 = r$3.byteLength;
			let o$2 = 2;
			for (; o$2 < i$3;) {
				if (r$3.getUint16(o$2 + 2, !1) <= 8) return t$1(-1);
				const e$3 = r$3.getUint16(o$2, !1);
				if (o$2 += 2, 65505 == e$3) {
					if (1165519206 != r$3.getUint32(o$2 += 2, !1)) return t$1(-1);
					const e$4 = 18761 == r$3.getUint16(o$2 += 6, !1);
					o$2 += r$3.getUint32(o$2 + 4, e$4);
					const i$4 = r$3.getUint16(o$2, e$4);
					o$2 += 2;
					for (let a$2 = 0; a$2 < i$4; a$2++) if (274 == r$3.getUint16(o$2 + 12 * a$2, e$4)) return t$1(r$3.getUint16(o$2 + 12 * a$2 + 8, e$4));
				} else {
					if (65280 != (65280 & e$3)) break;
					o$2 += r$3.getUint16(o$2, !1);
				}
			}
			return t$1(-1);
		}, i$2.onerror = (e$2) => r$2(e$2), i$2.readAsArrayBuffer(e$1);
	}));
}
function handleMaxWidthOrHeight(e$1, t$1) {
	const { width: r$2 } = e$1, { height: i$2 } = e$1, { maxWidthOrHeight: o$2 } = t$1;
	let a$2, s$2 = e$1;
	return isFinite(o$2) && (r$2 > o$2 || i$2 > o$2) && ([s$2, a$2] = getNewCanvasAndCtx(r$2, i$2), r$2 > i$2 ? (s$2.width = o$2, s$2.height = i$2 / r$2 * o$2) : (s$2.width = r$2 / i$2 * o$2, s$2.height = o$2), a$2.drawImage(e$1, 0, 0, s$2.width, s$2.height), cleanupCanvasMemory(e$1)), s$2;
}
function followExifOrientation(e$1, t$1) {
	const { width: r$2 } = e$1, { height: i$2 } = e$1, [o$2, a$2] = getNewCanvasAndCtx(r$2, i$2);
	switch (t$1 > 4 && t$1 < 9 ? (o$2.width = i$2, o$2.height = r$2) : (o$2.width = r$2, o$2.height = i$2), t$1) {
		case 2:
			a$2.transform(-1, 0, 0, 1, r$2, 0);
			break;
		case 3:
			a$2.transform(-1, 0, 0, -1, r$2, i$2);
			break;
		case 4:
			a$2.transform(1, 0, 0, -1, 0, i$2);
			break;
		case 5:
			a$2.transform(0, 1, 1, 0, 0, 0);
			break;
		case 6:
			a$2.transform(0, 1, -1, 0, i$2, 0);
			break;
		case 7:
			a$2.transform(0, -1, -1, 0, i$2, r$2);
			break;
		case 8: a$2.transform(0, -1, 1, 0, 0, r$2);
	}
	return a$2.drawImage(e$1, 0, 0, r$2, i$2), cleanupCanvasMemory(e$1), o$2;
}
function compress$1(e$1, t$1, r$2 = 0) {
	return new Promise((function(i$2, o$2) {
		let a$2, s$2, f$2, l$2, c$2, u$1, h, d, A$1, g$1, p$1, m$1, w$1, v$1, b$1, y$1, E, F$1, _$1, B$1;
		function incProgress(e$2 = 5) {
			if (t$1.signal && t$1.signal.aborted) throw t$1.signal.reason;
			a$2 += e$2, t$1.onProgress(Math.min(a$2, 100));
		}
		function setProgress(e$2) {
			if (t$1.signal && t$1.signal.aborted) throw t$1.signal.reason;
			a$2 = Math.min(Math.max(e$2, a$2), 100), t$1.onProgress(a$2);
		}
		return a$2 = r$2, s$2 = t$1.maxIteration || 10, f$2 = 1024 * t$1.maxSizeMB * 1024, incProgress(), drawFileInCanvas(e$1, t$1).then(function(r$3) {
			try {
				return [, l$2] = r$3, incProgress(), c$2 = handleMaxWidthOrHeight(l$2, t$1), incProgress(), new Promise((function(r$4, i$3) {
					var o$3;
					if (!(o$3 = t$1.exifOrientation)) return getExifOrientation(e$1).then(function(e$2) {
						try {
							return o$3 = e$2, $If_2.call(this);
						} catch (e$3) {
							return i$3(e$3);
						}
					}.bind(this), i$3);
					function $If_2() {
						return r$4(o$3);
					}
					return $If_2.call(this);
				})).then(function(r$4) {
					try {
						return u$1 = r$4, incProgress(), isAutoOrientationInBrowser().then(function(r$5) {
							try {
								return h = r$5 ? c$2 : followExifOrientation(c$2, u$1), incProgress(), d = t$1.initialQuality || 1, A$1 = t$1.fileType || e$1.type, canvasToFile(h, A$1, e$1.name, e$1.lastModified, d).then(function(r$6) {
									try {
										{
											if (g$1 = r$6, incProgress(), p$1 = g$1.size > f$2, m$1 = g$1.size > e$1.size, !p$1 && !m$1) return setProgress(100), i$2(g$1);
											var a$3;
											function $Loop_3() {
												if (s$2-- && (b$1 > f$2 || b$1 > w$1)) {
													let t$2, r$7;
													return t$2 = B$1 ? .95 * _$1.width : _$1.width, r$7 = B$1 ? .95 * _$1.height : _$1.height, [E, F$1] = getNewCanvasAndCtx(t$2, r$7), F$1.drawImage(_$1, 0, 0, t$2, r$7), d *= "image/png" === A$1 ? .85 : .95, canvasToFile(E, A$1, e$1.name, e$1.lastModified, d).then((function(e$2) {
														try {
															return y$1 = e$2, cleanupCanvasMemory(_$1), _$1 = E, b$1 = y$1.size, setProgress(Math.min(99, Math.floor((v$1 - b$1) / (v$1 - f$2) * 100))), $Loop_3;
														} catch (e$3) {
															return o$2(e$3);
														}
													}), o$2);
												}
												return [1];
											}
											return w$1 = e$1.size, v$1 = g$1.size, b$1 = v$1, _$1 = h, B$1 = !t$1.alwaysKeepResolution && p$1, (a$3 = function(e$2) {
												for (; e$2;) {
													if (e$2.then) return void e$2.then(a$3, o$2);
													try {
														if (e$2.pop) {
															if (e$2.length) return e$2.pop() ? $Loop_3_exit.call(this) : e$2;
															e$2 = $Loop_3;
														} else e$2 = e$2.call(this);
													} catch (e$3) {
														return o$2(e$3);
													}
												}
											}.bind(this))($Loop_3);
											function $Loop_3_exit() {
												return cleanupCanvasMemory(_$1), cleanupCanvasMemory(E), cleanupCanvasMemory(c$2), cleanupCanvasMemory(h), cleanupCanvasMemory(l$2), setProgress(100), i$2(y$1);
											}
										}
									} catch (u$2) {
										return o$2(u$2);
									}
								}.bind(this), o$2);
							} catch (e$2) {
								return o$2(e$2);
							}
						}.bind(this), o$2);
					} catch (e$2) {
						return o$2(e$2);
					}
				}.bind(this), o$2);
			} catch (e$2) {
				return o$2(e$2);
			}
		}.bind(this), o$2);
	}));
}
const l$1 = "\nlet scriptImported = false\nself.addEventListener('message', async (e) => {\n  const { file, id, imageCompressionLibUrl, options } = e.data\n  options.onProgress = (progress) => self.postMessage({ progress, id })\n  try {\n    if (!scriptImported) {\n      // console.log('[worker] importScripts', imageCompressionLibUrl)\n      self.importScripts(imageCompressionLibUrl)\n      scriptImported = true\n    }\n    // console.log('[worker] self', self)\n    const compressedFile = await imageCompression(file, options)\n    self.postMessage({ file: compressedFile, id })\n  } catch (e) {\n    // console.error('[worker] error', e)\n    self.postMessage({ error: e.message + '\\n' + e.stack, id })\n  }\n})\n";
let c$1;
function compressOnWebWorker(e$1, t$1) {
	return new Promise(((r$2, i$2) => {
		c$1 || (c$1 = function createWorkerScriptURL(e$2) {
			const t$2 = [];
			return "function" == typeof e$2 ? t$2.push(`(${e$2})()`) : t$2.push(e$2), URL.createObjectURL(new Blob(t$2));
		}(l$1));
		const o$2 = new Worker(c$1);
		o$2.addEventListener("message", (function handler(e$2) {
			if (t$1.signal && t$1.signal.aborted) o$2.terminate();
			else if (void 0 === e$2.data.progress) {
				if (e$2.data.error) return i$2(new Error(e$2.data.error)), void o$2.terminate();
				r$2(e$2.data.file), o$2.terminate();
			} else t$1.onProgress(e$2.data.progress);
		})), o$2.addEventListener("error", i$2), t$1.signal && t$1.signal.addEventListener("abort", (() => {
			i$2(t$1.signal.reason), o$2.terminate();
		})), o$2.postMessage({
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
	return new Promise((function(r$2, i$2) {
		let o$2, a$2, s$2, f$2, l$2, c$2;
		if (o$2 = { ...t$1 }, s$2 = 0, {onProgress: f$2} = o$2, o$2.maxSizeMB = o$2.maxSizeMB || Number.POSITIVE_INFINITY, l$2 = "boolean" != typeof o$2.useWebWorker || o$2.useWebWorker, delete o$2.useWebWorker, o$2.onProgress = (e$2) => {
			s$2 = e$2, "function" == typeof f$2 && f$2(s$2);
		}, !(e$1 instanceof Blob || e$1 instanceof CustomFile)) return i$2(/* @__PURE__ */ new Error("The file given is not an instance of Blob or File"));
		if (!/^image/.test(e$1.type)) return i$2(/* @__PURE__ */ new Error("The file given is not an image"));
		if (c$2 = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, !l$2 || "function" != typeof Worker || c$2) return compress$1(e$1, o$2).then(function(e$2) {
			try {
				return a$2 = e$2, $If_4.call(this);
			} catch (e$3) {
				return i$2(e$3);
			}
		}.bind(this), i$2);
		var u$1 = function() {
			try {
				return $If_4.call(this);
			} catch (e$2) {
				return i$2(e$2);
			}
		}.bind(this), $Try_1_Catch = function(t$2) {
			try {
				return compress$1(e$1, o$2).then((function(e$2) {
					try {
						return a$2 = e$2, u$1();
					} catch (e$3) {
						return i$2(e$3);
					}
				}), i$2);
			} catch (e$2) {
				return i$2(e$2);
			}
		};
		try {
			return o$2.libURL = o$2.libURL || "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js", compressOnWebWorker(e$1, o$2).then((function(e$2) {
				try {
					return a$2 = e$2, u$1();
				} catch (e$3) {
					return $Try_1_Catch();
				}
			}), $Try_1_Catch);
		} catch (e$2) {
			$Try_1_Catch();
		}
		function $If_4() {
			try {
				a$2.name = e$1.name, a$2.lastModified = e$1.lastModified;
			} catch (e$2) {}
			try {
				o$2.preserveExif && "image/jpeg" === e$1.type && (!o$2.fileType || o$2.fileType && o$2.fileType === e$1.type) && (a$2 = copyExifWithoutOrientation(e$1, a$2));
			} catch (e$2) {}
			return r$2(a$2);
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
	const a$2 = doc.createElement("a");
	doc.head.appendChild(base);
	doc.body.appendChild(a$2);
	if (baseUrl) base.href = baseUrl;
	a$2.href = url;
	return a$2.href;
}
const uuid = (() => {
	let counter = 0;
	const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => {
		counter += 1;
		return `u${random()}${counter}`;
	};
})();
function toArray$1(arrayLike) {
	const arr = [];
	for (let i$2 = 0, l$2 = arrayLike.length; i$2 < l$2; i$2++) arr.push(arrayLike[i$2]);
	return arr;
}
let styleProps = null;
function getStyleProperties(options = {}) {
	if (styleProps) return styleProps;
	if (options.includeStyleProperties) {
		styleProps = options.includeStyleProperties;
		return styleProps;
	}
	styleProps = toArray$1(window.getComputedStyle(document.documentElement));
	return styleProps;
}
function px$1(node$1, styleProperty) {
	const win = node$1.ownerDocument.defaultView || window;
	const val = win.getComputedStyle(node$1).getPropertyValue(styleProperty);
	return val ? parseFloat(val.replace("px", "")) : 0;
}
function getNodeWidth(node$1) {
	const leftBorder = px$1(node$1, "border-left-width");
	const rightBorder = px$1(node$1, "border-right-width");
	return node$1.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node$1) {
	const topBorder = px$1(node$1, "border-top-width");
	const bottomBorder = px$1(node$1, "border-bottom-width");
	return node$1.clientHeight + topBorder + bottomBorder;
}
function getImageSize(targetNode, options = {}) {
	const width = options.width || getNodeWidth(targetNode);
	const height = options.height || getNodeHeight(targetNode);
	return {
		width,
		height
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
const canvasDimensionLimit = 16384;
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
async function nodeToDataURL(node$1, width, height) {
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
	foreignObject.appendChild(node$1);
	return svgToDataURL(svg);
}
const isInstanceOfElement = (node$1, instance) => {
	if (node$1 instanceof instance) return true;
	const nodePrototype = Object.getPrototypeOf(node$1);
	if (nodePrototype === null) return false;
	return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance);
};
function formatCSSText(style) {
	const content = style.getPropertyValue("content");
	return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
}
function formatCSSProperties(style, options) {
	return getStyleProperties(options).map((name) => {
		const value = style.getPropertyValue(name);
		const priority = style.getPropertyPriority(name);
		return `${name}: ${value}${priority ? " !important" : ""};`;
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
const WOFF = "application/font-woff";
const JPEG = "image/jpeg";
const mimes = {
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
	const match$1 = /\.([^./]*?)$/g.exec(url);
	return match$1 ? match$1[1] : "";
}
function getMimeType(url) {
	const extension = getExtension(url).toLowerCase();
	return mimes[extension] || "";
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
const cache = {};
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
		const content = await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
			if (!contentType) contentType = res.headers.get("Content-Type") || "";
			return getContentFromDataUrl(result);
		});
		dataURL = makeDataUrl(content, contentType);
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
		const dataURL$1 = canvas.toDataURL();
		return createImage(dataURL$1);
	}
	const poster = video.poster;
	const contentType = getMimeType(poster);
	const dataURL = await resourceToDataURL(poster, contentType, options);
	return createImage(dataURL);
}
async function cloneIFrameElement(iframe, options) {
	var _a;
	try {
		if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) return await cloneNode(iframe.contentDocument.body, options, true);
	} catch (_b) {}
	return iframe.cloneNode(false);
}
async function cloneSingleNode(node$1, options) {
	if (isInstanceOfElement(node$1, HTMLCanvasElement)) return cloneCanvasElement(node$1);
	if (isInstanceOfElement(node$1, HTMLVideoElement)) return cloneVideoElement(node$1, options);
	if (isInstanceOfElement(node$1, HTMLIFrameElement)) return cloneIFrameElement(node$1, options);
	return node$1.cloneNode(isSVGElement$1(node$1));
}
const isSlotElement = (node$1) => node$1.tagName != null && node$1.tagName.toUpperCase() === "SLOT";
const isSVGElement$1 = (node$1) => node$1.tagName != null && node$1.tagName.toUpperCase() === "SVG";
async function cloneChildren(nativeNode, clonedNode, options) {
	var _a, _b;
	if (isSVGElement$1(clonedNode)) return clonedNode;
	let children = [];
	if (isSlotElement(nativeNode) && nativeNode.assignedNodes) children = toArray$1(nativeNode.assignedNodes());
	else if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) children = toArray$1(nativeNode.contentDocument.body.childNodes);
	else children = toArray$1(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
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
		if (name === "font-size" && value.endsWith("px")) {
			const reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - .1;
			value = `${reducedFont}px`;
		}
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
	for (let i$2 = 0; i$2 < uses.length; i$2++) {
		const use = uses[i$2];
		const id$2 = use.getAttribute("xlink:href");
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
		for (let i$2 = 0; i$2 < nodes.length; i$2++) defs.appendChild(nodes[i$2]);
		clone.appendChild(svg);
	}
	return clone;
}
async function cloneNode(node$1, options, isRoot) {
	if (!isRoot && options.filter && !options.filter(node$1)) return null;
	return Promise.resolve(node$1).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node$1, clonedNode, options)).then((clonedNode) => decorate(node$1, clonedNode, options)).then((clonedNode) => ensureSVGSymbols(clonedNode, options));
}
const URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
const URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
const FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
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
		if (getContentFromUrl) {
			const content = await getContentFromUrl(resolvedURL);
			dataURL = makeDataUrl(content, contentType);
		} else dataURL = await resourceToDataURL(resolvedURL, contentType, options);
		return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
	} catch (error) {}
	return cssText;
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
	return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match$1) => {
		while (true) {
			const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match$1) || [];
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
	const urls = parseURLs(filteredCSSText);
	return urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
}
async function embedProp(propName, node$1, options) {
	var _a;
	const propValue = (_a = node$1.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
	if (propValue) {
		const cssString = await embedResources(propValue, null, options);
		node$1.style.setProperty(propName, cssString, node$1.style.getPropertyPriority(propName));
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
	const children = toArray$1(clonedNode.childNodes);
	const deferreds = children.map((child) => embedImages(child, options));
	await Promise.all(deferreds).then(() => clonedNode);
}
async function embedImages(clonedNode, options) {
	if (isInstanceOfElement(clonedNode, Element)) {
		await embedBackground(clonedNode, options);
		await embedImageNode(clonedNode, options);
		await embedChildren(clonedNode, options);
	}
}
function applyStyle(node$1, options) {
	const { style } = node$1;
	if (options.backgroundColor) style.backgroundColor = options.backgroundColor;
	if (options.width) style.width = `${options.width}px`;
	if (options.height) style.height = `${options.height}px`;
	const manual = options.style;
	if (manual != null) Object.keys(manual).forEach((key) => {
		style[key] = manual[key];
	});
	return node$1;
}
const cssFetchCache = {};
async function fetchCSS(url) {
	let cache$1 = cssFetchCache[url];
	if (cache$1 != null) return cache$1;
	const res = await fetch(url);
	const cssText = await res.text();
	cache$1 = {
		url,
		cssText
	};
	cssFetchCache[url] = cache$1;
	return cache$1;
}
async function embedFonts(data, options) {
	let cssText = data.cssText;
	const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
	const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
	const loadFonts = fontLocs.map(async (loc) => {
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
	const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
	let cssText = source.replace(commentsRegex, "");
	const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
	while (true) {
		const matches = keyframesRegex.exec(cssText);
		if (matches === null) break;
		result.push(matches[0]);
	}
	cssText = cssText.replace(keyframesRegex, "");
	const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
	const combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})";
	const unifiedRegex = new RegExp(combinedCSSRegex, "gi");
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
			toArray$1(sheet.cssRules || []).forEach((item, index) => {
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
			const inline = styleSheets.find((a$2) => a$2.href == null) || document.styleSheets[0];
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
				toArray$1(sheet.cssRules || []).forEach((item) => {
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
async function parseWebFontRules(node$1, options) {
	if (node$1.ownerDocument == null) throw new Error("Provided element is not within a Document");
	const styleSheets = toArray$1(node$1.ownerDocument.styleSheets);
	const cssRules = await getCSSRules(styleSheets, options);
	return getWebFontRules(cssRules);
}
function normalizeFontFamily(font) {
	return font.trim().replace(/["']/g, "");
}
function getUsedFonts(node$1) {
	const fonts = /* @__PURE__ */ new Set();
	function traverse(node$2) {
		const fontFamily = node$2.style.fontFamily || getComputedStyle(node$2).fontFamily;
		fontFamily.split(",").forEach((font) => {
			fonts.add(normalizeFontFamily(font));
		});
		Array.from(node$2.children).forEach((child) => {
			if (child instanceof HTMLElement) traverse(child);
		});
	}
	traverse(node$1);
	return fonts;
}
async function getWebFontCSS(node$1, options) {
	const rules = await parseWebFontRules(node$1, options);
	const usedFonts = getUsedFonts(node$1);
	const cssTexts = await Promise.all(rules.filter((rule) => usedFonts.has(normalizeFontFamily(rule.style.fontFamily))).map((rule) => {
		const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
		return embedResources(rule.cssText, baseUrl, options);
	}));
	return cssTexts.join("\n");
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
async function toSvg(node$1, options = {}) {
	const { width, height } = getImageSize(node$1, options);
	const clonedNode = await cloneNode(node$1, options, true);
	await embedWebFonts(clonedNode, options);
	await embedImages(clonedNode, options);
	applyStyle(clonedNode, options);
	const datauri = await nodeToDataURL(clonedNode, width, height);
	return datauri;
}
async function toCanvas(node$1, options = {}) {
	const { width, height } = getImageSize(node$1, options);
	const svg = await toSvg(node$1, options);
	const img = await createImage(svg);
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
const logger$4 = loggerService.withContext("Utils:image");
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
		const canvas = await new Promise((resolve, reject) => {
			toCanvas(el, {
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
		logger$4.error("Error capturing scrollable element:", error);
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
			let match$1;
			while ((match$1 = fontFaceRegex.exec(cssText)) !== null) {
				let block = match$1[0];
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
				const dataUrls = await Promise.all(fontUrls.map(async ([original, url]) => {
					const dataUrl = await fetchAsDataUrl(url);
					return [original, `url(${dataUrl})`];
				}));
				dataUrls.forEach(([original, replacement]) => {
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
					const cssText = await res.text();
					const blocks = await processCss(cssText, link.href);
					allFontBlocks.push(...blocks);
				}
			} catch {}
		}));
		const inlineStyles = doc.querySelectorAll("style");
		await Promise.all(Array.from(inlineStyles).map(async (style) => {
			const cssText = style.textContent || "";
			const blocks = await processCss(cssText, doc.baseURI);
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
		await new Promise((r$2) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => r$2(null))));
		doc.querySelectorAll("img[loading=\"lazy\"]").forEach((img) => img.setAttribute("loading", "eager"));
		const fontEmbedCSS = await inlineFonts();
		if (fontEmbedCSS && fontEmbedCSS.trim().length > 0) {
			injectedFontStyle = ensureFontStyle(fontEmbedCSS);
			if (injectedFontStyle.parentNode == null) doc.head.appendChild(injectedFontStyle);
		}
		await Promise.race([doc.fonts?.ready ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, 1e3))]);
		const { documentElement: de, body: b$1 } = doc;
		const totalWidth = Math.max(b$1.scrollWidth, de.scrollWidth, b$1.clientWidth, de.clientWidth);
		const totalHeight = Math.max(b$1.scrollHeight, de.scrollHeight, b$1.clientHeight, de.clientHeight);
		logger$4.verbose("Capturing iframe:", {
			totalWidth,
			totalHeight
		});
		const MAX_SIZE = 32767;
		const scale$1 = Math.min(1, MAX_SIZE / Math.max(totalWidth, totalHeight));
		const pixelRatio = (win.devicePixelRatio || 1) * scale$1;
		const styles = win.getComputedStyle(b$1);
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
		logger$4.error("Error capturing iframe:", error);
		return void 0;
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
		const encoder = new TextEncoder();
		const encodedData = encoder.encode(svgData);
		const binaryString = Array.from(encodedData, (byte) => String.fromCodePoint(byte)).join("");
		svgBase64 = `data:image/svg+xml;base64,${btoa(binaryString)}`;
	} catch (error) {
		logger$4.warn("TextEncoder method failed, falling back to legacy method", error);
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
function parseDataUrlMediaType(url) {
	if (!url.startsWith("data:")) return { isBase64: false };
	const comma = url.indexOf(",");
	if (comma === -1) return { isBase64: false };
	const header = url.slice(5, comma);
	const semi = header.indexOf(";");
	const mediaType = (semi === -1 ? header : header.slice(0, semi)).trim() || void 0;
	const isBase64 = header.indexOf(";base64") !== -1;
	return {
		mediaType,
		isBase64
	};
}
var __assign = function() {
	__assign = Object.assign || function __assign$1(t$1) {
		for (var s$2, i$2 = 1, n = arguments.length; i$2 < n; i$2++) {
			s$2 = arguments[i$2];
			for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1)) t$1[p$1] = s$2[p$1];
		}
		return t$1;
	};
	return __assign.apply(this, arguments);
};
function __spreadArray(to, from$1, pack) {
	if (pack || arguments.length === 2) {
		for (var i$2 = 0, l$2 = from$1.length, ar; i$2 < l$2; i$2++) if (ar || !(i$2 in from$1)) {
			if (!ar) ar = Array.prototype.slice.call(from$1, 0, i$2);
			ar[i$2] = from$1[i$2];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from$1));
}
var require_shallowequal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function shallowEqual(objA, objB, compare, compareContext) {
		var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
		if (ret !== void 0) return !!ret;
		if (objA === objB) return true;
		if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) return false;
		var keysA = Object.keys(objA);
		var keysB = Object.keys(objB);
		if (keysA.length !== keysB.length) return false;
		var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
		for (var idx = 0; idx < keysA.length; idx++) {
			var key = keysA[idx];
			if (!bHasOwnProperty(key)) return false;
			var valueA = objA[key];
			var valueB = objB[key];
			ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
			if (ret === false || ret === void 0 && valueA !== valueB) return false;
		}
		return true;
	};
}));
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length$1) {
	return charat(value, 0) ^ 45 ? (((length$1 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
	return value.trim();
}
function match(value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
function indexof(value, search, position$1) {
	return value.indexOf(search, position$1);
}
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
	return value.slice(begin, end);
}
function strlen(value) {
	return value.length;
}
function sizeof(value) {
	return value.length;
}
function append(value, array) {
	return array.push(value), value;
}
function combine(array, callback) {
	return array.map(callback).join("");
}
function filter$1(array, pattern) {
	return array.filter(function(value) {
		return !match(value, pattern);
	});
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length$1, siblings) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length: length$1,
		return: "",
		siblings
	};
}
function copy(root, props) {
	return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function lift(root) {
	while (root.root) root = copy(root.root, { children: [root] });
	append(root, root.siblings);
}
function char() {
	return character;
}
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
function peek() {
	return charat(characters, position);
}
function caret() {
	return position;
}
function slice(begin, end) {
	return substr(characters, begin, end);
}
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
	return characters = "", value;
}
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length$1 = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character$1 = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters$1 = type;
	while (scanning) switch (previous = character$1, character$1 = next()) {
		case 40: if (previous != 108 && charat(characters$1, length$1 - 1) == 58) {
			if (indexof(characters$1 += replace(delimit(character$1), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters$1 += delimit(character$1);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters$1 += whitespace(previous);
			break;
		case 92:
			characters$1 += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
					break;
				default: characters$1 += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters$1) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character$1) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters$1 = replace(characters$1, /\f/g, "");
					if (property > 0 && strlen(characters$1) - length$1) append(property > 32 ? declaration(characters$1 + ";", rule, parent, length$1 - 1, declarations) : declaration(replace(characters$1, " ", "") + ";", rule, parent, length$1 - 2, declarations), declarations);
					break;
				case 59: characters$1 += ";";
				default:
					append(reference = ruleset(characters$1, root, parent, index, offset, rules, points, type, props = [], children = [], length$1, rulesets), rulesets);
					if (character$1 === 123) if (offset === 0) parse(characters$1, root, reference, reference, props, rulesets, length$1, points, children);
					else switch (atrule === 99 && charat(characters$1, 3) === 110 ? 100 : atrule) {
						case 100:
						case 108:
						case 109:
						case 115:
							parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length$1, children), children), rules, children, length$1, points, rule ? props : children);
							break;
						default: parse(characters$1, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters$1 = "", length$1 = pseudo;
			break;
		case 58: length$1 = 1 + strlen(characters$1), property = previous;
		default:
			if (variable < 1) {
				if (character$1 == 123) --variable;
				else if (character$1 == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters$1 += from(character$1), character$1 * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters$1 += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters$1) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters$1 += delimit(next());
					atrule = peek(), offset = length$1 = strlen(type = characters$1 += identifier(caret())), character$1++;
					break;
				case 45: if (previous === 45 && strlen(characters$1) == 2) variable = 0;
			}
	}
	return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length$1, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i$2 = 0, j$1 = 0, k$1 = 0; i$2 < index; ++i$2) for (var x$1 = 0, y$1 = substr(value, post + 1, post = abs(j$1 = points[i$2])), z$1 = value; x$1 < size; ++x$1) if (z$1 = trim(j$1 > 0 ? rule[x$1] + " " + y$1 : replace(y$1, /&\f/g, rule[x$1]))) props[k$1++] = z$1;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length$1, siblings);
}
function comment(value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length$1, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length$1), substr(value, length$1 + 1, -1), length$1, siblings);
}
function prefix(value, length$1, children) {
	switch (hash(value, length$1)) {
		case 5103: return WEBKIT + "print-" + value + value;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return WEBKIT + value + value;
		case 4789: return MOZ + value + value;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + value + MOZ + value + MS + value + value;
		case 5936: switch (charat(value, length$1 + 11)) {
			case 114: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
			case 108: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
			case 45: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
		}
		case 6828:
		case 4268:
		case 2903: return WEBKIT + value + MS + value + value;
		case 6165: return WEBKIT + value + MS + "flex-" + value + value;
		case 5187: return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
		case 5443: return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
		case 4675: return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
		case 5548: return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
		case 5292: return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
		case 6060: return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
		case 4554: return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
		case 6187: return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
		case 5495:
		case 3959: return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length$1) + value;
			break;
		case 2592:
		case 3360: return MS + replace(value, "template-", "") + value;
		case 4384:
		case 3616:
			if (children && children.some(function(element, index) {
				return length$1 = index, match(element.props, /grid-\w+-end/);
			})) return ~indexof(value + (children = children[length$1].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
			return MS + replace(value, "-start", "") + value;
		case 4896:
		case 4128: return children && children.some(function(element) {
			return match(element.props, /grid-\w+-start/);
		}) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (strlen(value) - 1 - length$1 > 6) switch (charat(value, length$1 + 1)) {
				case 109: if (charat(value, length$1 + 4) !== 45) break;
				case 102: return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length$1 + 3) == 108 ? "$3" : "$2-$3")) + value;
				case 115: return ~indexof(value, "stretch", 0) ? prefix(replace(value, "stretch", "fill-available"), length$1, children) + value : value;
			}
			break;
		case 5152:
		case 5920: return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_$1, a$2, b$1, c$2, d, e$1, f$2) {
			return MS + a$2 + ":" + b$1 + f$2 + (c$2 ? MS + a$2 + "-span:" + (d ? e$1 : +e$1 - +b$1) + f$2 : "") + value;
		});
		case 4949:
			if (charat(value, length$1 + 6) === 121) return replace(value, ":", ":" + WEBKIT) + value;
			break;
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				case 120: return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
				case 100: return replace(value, ":", ":" + MS) + value;
			}
			break;
		case 5719:
		case 2647:
		case 2135:
		case 3927:
		case 2391: return replace(value, "scroll-", "scroll-snap-") + value;
	}
	return value;
}
function serialize(children, callback) {
	var output = "";
	for (var i$2 = 0; i$2 < children.length; i$2++) output += callback(children[i$2], i$2, children, callback) || "";
	return output;
}
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: if (!strlen(element.value = element.props.join(","))) return "";
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
	var length$1 = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i$2 = 0; i$2 < length$1; i$2++) output += collection[i$2](element, index, children, callback) || "";
		return output;
	};
}
function rulesheet(callback) {
	return function(element) {
		if (!element.root) {
			if (element = element.return) callback(element);
		}
	};
}
function prefixer(element, index, children, callback) {
	if (element.length > -1) {
		if (!element.return) switch (element.type) {
			case DECLARATION:
				element.return = prefix(element.value, element.length, children);
				return;
			case KEYFRAMES: return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
			case RULESET: if (element.length) return combine(children = element.props, function(value) {
				switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
					case ":read-only":
					case ":read-write":
						lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
						lift(copy(element, { props: [value] }));
						assign(element, { props: filter$1(children, callback) });
						break;
					case "::placeholder":
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
						lift(copy(element, { props: [value] }));
						assign(element, { props: filter$1(children, callback) });
						break;
				}
				return "";
			});
		}
	}
}
var unitlessKeys = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_shallowequal = /* @__PURE__ */ __toESM(require_shallowequal()), f = "undefined" != typeof process && ({}.REACT_APP_SC_ATTR || {}.SC_ATTR) || "data-styled", m = "active", y = "data-styled-version", v = "6.1.17", g = "/*!sc*/\n", S = "undefined" != typeof window && "HTMLElement" in window, w = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== {}.REACT_APP_SC_DISABLE_SPEEDY && "" !== {}.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== {}.REACT_APP_SC_DISABLE_SPEEDY && {}.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== {}.SC_DISABLE_SPEEDY && "" !== {}.SC_DISABLE_SPEEDY ? "false" !== {}.SC_DISABLE_SPEEDY && {}.SC_DISABLE_SPEEDY : false), _ = Object.freeze([]), C = Object.freeze({});
function I(e$1, t$1, n) {
	return void 0 === n && (n = C), e$1.theme !== n.theme && e$1.theme || t$1 || n.theme;
}
var A = new Set([
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"big",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"keygen",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"u",
	"ul",
	"use",
	"var",
	"video",
	"wbr",
	"circle",
	"clipPath",
	"defs",
	"ellipse",
	"foreignObject",
	"g",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"stop",
	"svg",
	"text",
	"tspan"
]), O = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, D = /(^-|-$)/g;
function R(e$1) {
	return e$1.replace(O, "-").replace(D, "");
}
var T = /(a)(d)/gi, k = 52, j = function(e$1) {
	return String.fromCharCode(e$1 + (e$1 > 25 ? 39 : 97));
};
function x(e$1) {
	var t$1, n = "";
	for (t$1 = Math.abs(e$1); t$1 > k; t$1 = t$1 / k | 0) n = j(t$1 % k) + n;
	return (j(t$1 % k) + n).replace(T, "$1-$2");
}
var V, F = 5381, M = function(e$1, t$1) {
	for (var n = t$1.length; n;) e$1 = 33 * e$1 ^ t$1.charCodeAt(--n);
	return e$1;
}, z = function(e$1) {
	return M(F, e$1);
};
function $(e$1) {
	return x(z(e$1) >>> 0);
}
function B(e$1) {
	return e$1.displayName || e$1.name || "Component";
}
function L(e$1) {
	return "string" == typeof e$1 && true;
}
var G = "function" == typeof Symbol && Symbol.for, Y = G ? Symbol.for("react.memo") : 60115, W = G ? Symbol.for("react.forward_ref") : 60112, q = {
	childContextTypes: !0,
	contextType: !0,
	contextTypes: !0,
	defaultProps: !0,
	displayName: !0,
	getDefaultProps: !0,
	getDerivedStateFromError: !0,
	getDerivedStateFromProps: !0,
	mixins: !0,
	propTypes: !0,
	type: !0
}, H = {
	name: !0,
	length: !0,
	prototype: !0,
	caller: !0,
	callee: !0,
	arguments: !0,
	arity: !0
}, U = {
	$$typeof: !0,
	compare: !0,
	defaultProps: !0,
	displayName: !0,
	propTypes: !0,
	type: !0
}, J = ((V = {})[W] = {
	$$typeof: !0,
	render: !0,
	defaultProps: !0,
	displayName: !0,
	propTypes: !0
}, V[Y] = U, V);
function X(e$1) {
	return ("type" in (t$1 = e$1) && t$1.type.$$typeof) === Y ? U : "$$typeof" in e$1 ? J[e$1.$$typeof] : q;
	var t$1;
}
var Z = Object.defineProperty, K = Object.getOwnPropertyNames, Q = Object.getOwnPropertySymbols, ee = Object.getOwnPropertyDescriptor, te = Object.getPrototypeOf, ne = Object.prototype;
function oe(e$1, t$1, n) {
	if ("string" != typeof t$1) {
		if (ne) {
			var o$2 = te(t$1);
			o$2 && o$2 !== ne && oe(e$1, o$2, n);
		}
		var r$2 = K(t$1);
		Q && (r$2 = r$2.concat(Q(t$1)));
		for (var s$2 = X(e$1), i$2 = X(t$1), a$2 = 0; a$2 < r$2.length; ++a$2) {
			var c$2 = r$2[a$2];
			if (!(c$2 in H || n && n[c$2] || i$2 && c$2 in i$2 || s$2 && c$2 in s$2)) {
				var l$2 = ee(t$1, c$2);
				try {
					Z(e$1, c$2, l$2);
				} catch (e$2) {}
			}
		}
	}
	return e$1;
}
function re(e$1) {
	return "function" == typeof e$1;
}
function se(e$1) {
	return "object" == typeof e$1 && "styledComponentId" in e$1;
}
function ie(e$1, t$1) {
	return e$1 && t$1 ? "".concat(e$1, " ").concat(t$1) : e$1 || t$1 || "";
}
function ae(e$1, t$1) {
	if (0 === e$1.length) return "";
	for (var n = e$1[0], o$2 = 1; o$2 < e$1.length; o$2++) n += t$1 ? t$1 + e$1[o$2] : e$1[o$2];
	return n;
}
function ce(e$1) {
	return null !== e$1 && "object" == typeof e$1 && e$1.constructor.name === Object.name && !("props" in e$1 && e$1.$$typeof);
}
function le(e$1, t$1, n) {
	if (void 0 === n && (n = !1), !n && !ce(e$1) && !Array.isArray(e$1)) return t$1;
	if (Array.isArray(t$1)) for (var o$2 = 0; o$2 < t$1.length; o$2++) e$1[o$2] = le(e$1[o$2], t$1[o$2]);
	else if (ce(t$1)) for (var o$2 in t$1) e$1[o$2] = le(e$1[o$2], t$1[o$2]);
	return e$1;
}
function ue(e$1, t$1) {
	Object.defineProperty(e$1, "toString", { value: t$1 });
}
function he(t$1) {
	for (var n = [], o$2 = 1; o$2 < arguments.length; o$2++) n[o$2 - 1] = arguments[o$2];
	return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t$1, " for more information.").concat(n.length > 0 ? " Args: ".concat(n.join(", ")) : ""));
}
var fe = function() {
	function e$1(e$2) {
		this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e$2;
	}
	return e$1.prototype.indexOfGroup = function(e$2) {
		for (var t$1 = 0, n = 0; n < e$2; n++) t$1 += this.groupSizes[n];
		return t$1;
	}, e$1.prototype.insertRules = function(e$2, t$1) {
		if (e$2 >= this.groupSizes.length) {
			for (var n = this.groupSizes, o$2 = n.length, r$2 = o$2; e$2 >= r$2;) if ((r$2 <<= 1) < 0) throw he(16, "".concat(e$2));
			this.groupSizes = new Uint32Array(r$2), this.groupSizes.set(n), this.length = r$2;
			for (var s$2 = o$2; s$2 < r$2; s$2++) this.groupSizes[s$2] = 0;
		}
		for (var i$2 = this.indexOfGroup(e$2 + 1), a$2 = (s$2 = 0, t$1.length); s$2 < a$2; s$2++) this.tag.insertRule(i$2, t$1[s$2]) && (this.groupSizes[e$2]++, i$2++);
	}, e$1.prototype.clearGroup = function(e$2) {
		if (e$2 < this.length) {
			var t$1 = this.groupSizes[e$2], n = this.indexOfGroup(e$2), o$2 = n + t$1;
			this.groupSizes[e$2] = 0;
			for (var r$2 = n; r$2 < o$2; r$2++) this.tag.deleteRule(n);
		}
	}, e$1.prototype.getGroup = function(e$2) {
		var t$1 = "";
		if (e$2 >= this.length || 0 === this.groupSizes[e$2]) return t$1;
		for (var n = this.groupSizes[e$2], o$2 = this.indexOfGroup(e$2), r$2 = o$2 + n, s$2 = o$2; s$2 < r$2; s$2++) t$1 += "".concat(this.tag.getRule(s$2)).concat(g);
		return t$1;
	}, e$1;
}(), ye = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Map(), ge = 1, Se = function(e$1) {
	if (ye.has(e$1)) return ye.get(e$1);
	for (; ve.has(ge);) ge++;
	var t$1 = ge++;
	return ye.set(e$1, t$1), ve.set(t$1, e$1), t$1;
}, we = function(e$1, t$1) {
	ge = t$1 + 1, ye.set(e$1, t$1), ve.set(t$1, e$1);
}, be = "style[".concat(f, "][").concat(y, "=\"").concat(v, "\"]"), Ee = new RegExp("^".concat(f, "\\.g(\\d+)\\[id=\"([\\w\\d-]+)\"\\].*?\"([^\"]*)")), Ne = function(e$1, t$1, n) {
	for (var o$2, r$2 = n.split(","), s$2 = 0, i$2 = r$2.length; s$2 < i$2; s$2++) (o$2 = r$2[s$2]) && e$1.registerName(t$1, o$2);
}, Pe = function(e$1, t$1) {
	for (var n, o$2 = (null !== (n = t$1.textContent) && void 0 !== n ? n : "").split(g), r$2 = [], s$2 = 0, i$2 = o$2.length; s$2 < i$2; s$2++) {
		var a$2 = o$2[s$2].trim();
		if (a$2) {
			var c$2 = a$2.match(Ee);
			if (c$2) {
				var l$2 = 0 | parseInt(c$2[1], 10), u$1 = c$2[2];
				0 !== l$2 && (we(u$1, l$2), Ne(e$1, u$1, c$2[3]), e$1.getTag().insertRules(l$2, r$2)), r$2.length = 0;
			} else r$2.push(a$2);
		}
	}
}, _e = function(e$1) {
	for (var t$1 = document.querySelectorAll(be), n = 0, o$2 = t$1.length; n < o$2; n++) {
		var r$2 = t$1[n];
		r$2 && r$2.getAttribute(f) !== m && (Pe(e$1, r$2), r$2.parentNode && r$2.parentNode.removeChild(r$2));
	}
};
function Ce() {
	return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
}
var Ie = function(e$1) {
	var t$1 = document.head, n = e$1 || t$1, o$2 = document.createElement("style"), r$2 = function(e$2) {
		var t$2 = Array.from(e$2.querySelectorAll("style[".concat(f, "]")));
		return t$2[t$2.length - 1];
	}(n), s$2 = void 0 !== r$2 ? r$2.nextSibling : null;
	o$2.setAttribute(f, m), o$2.setAttribute(y, v);
	var i$2 = Ce();
	return i$2 && o$2.setAttribute("nonce", i$2), n.insertBefore(o$2, s$2), o$2;
}, Ae = function() {
	function e$1(e$2) {
		this.element = Ie(e$2), this.element.appendChild(document.createTextNode("")), this.sheet = function(e$3) {
			if (e$3.sheet) return e$3.sheet;
			for (var t$1 = document.styleSheets, n = 0, o$2 = t$1.length; n < o$2; n++) {
				var r$2 = t$1[n];
				if (r$2.ownerNode === e$3) return r$2;
			}
			throw he(17);
		}(this.element), this.length = 0;
	}
	return e$1.prototype.insertRule = function(e$2, t$1) {
		try {
			return this.sheet.insertRule(t$1, e$2), this.length++, !0;
		} catch (e$3) {
			return !1;
		}
	}, e$1.prototype.deleteRule = function(e$2) {
		this.sheet.deleteRule(e$2), this.length--;
	}, e$1.prototype.getRule = function(e$2) {
		var t$1 = this.sheet.cssRules[e$2];
		return t$1 && t$1.cssText ? t$1.cssText : "";
	}, e$1;
}(), Oe = function() {
	function e$1(e$2) {
		this.element = Ie(e$2), this.nodes = this.element.childNodes, this.length = 0;
	}
	return e$1.prototype.insertRule = function(e$2, t$1) {
		if (e$2 <= this.length && e$2 >= 0) {
			var n = document.createTextNode(t$1);
			return this.element.insertBefore(n, this.nodes[e$2] || null), this.length++, !0;
		}
		return !1;
	}, e$1.prototype.deleteRule = function(e$2) {
		this.element.removeChild(this.nodes[e$2]), this.length--;
	}, e$1.prototype.getRule = function(e$2) {
		return e$2 < this.length ? this.nodes[e$2].textContent : "";
	}, e$1;
}(), De = function() {
	function e$1(e$2) {
		this.rules = [], this.length = 0;
	}
	return e$1.prototype.insertRule = function(e$2, t$1) {
		return e$2 <= this.length && (this.rules.splice(e$2, 0, t$1), this.length++, !0);
	}, e$1.prototype.deleteRule = function(e$2) {
		this.rules.splice(e$2, 1), this.length--;
	}, e$1.prototype.getRule = function(e$2) {
		return e$2 < this.length ? this.rules[e$2] : "";
	}, e$1;
}(), Re = S, Te = {
	isServer: !S,
	useCSSOMInjection: !w
}, ke = function() {
	function e$1(e$2, n, o$2) {
		void 0 === e$2 && (e$2 = C), void 0 === n && (n = {});
		var r$2 = this;
		this.options = __assign(__assign({}, Te), e$2), this.gs = n, this.names = new Map(o$2), this.server = !!e$2.isServer, !this.server && S && Re && (Re = !1, _e(this)), ue(this, function() {
			return function(e$3) {
				for (var t$1 = e$3.getTag(), n$1 = t$1.length, o$3 = "", r$3 = function(n$2) {
					var r$4 = function(e$4) {
						return ve.get(e$4);
					}(n$2);
					if (void 0 === r$4) return "continue";
					var s$3 = e$3.names.get(r$4), i$2 = t$1.getGroup(n$2);
					if (void 0 === s$3 || !s$3.size || 0 === i$2.length) return "continue";
					var a$2 = "".concat(f, ".g").concat(n$2, "[id=\"").concat(r$4, "\"]"), c$2 = "";
					void 0 !== s$3 && s$3.forEach(function(e$4) {
						e$4.length > 0 && (c$2 += "".concat(e$4, ","));
					}), o$3 += "".concat(i$2).concat(a$2, "{content:\"").concat(c$2, "\"}").concat(g);
				}, s$2 = 0; s$2 < n$1; s$2++) r$3(s$2);
				return o$3;
			}(r$2);
		});
	}
	return e$1.registerId = function(e$2) {
		return Se(e$2);
	}, e$1.prototype.rehydrate = function() {
		!this.server && S && _e(this);
	}, e$1.prototype.reconstructWithOptions = function(n, o$2) {
		return void 0 === o$2 && (o$2 = !0), new e$1(__assign(__assign({}, this.options), n), this.gs, o$2 && this.names || void 0);
	}, e$1.prototype.allocateGSInstance = function(e$2) {
		return this.gs[e$2] = (this.gs[e$2] || 0) + 1;
	}, e$1.prototype.getTag = function() {
		return this.tag || (this.tag = (e$2 = function(e$3) {
			var t$1 = e$3.useCSSOMInjection, n = e$3.target;
			return e$3.isServer ? new De(n) : t$1 ? new Ae(n) : new Oe(n);
		}(this.options), new fe(e$2)));
		var e$2;
	}, e$1.prototype.hasNameForId = function(e$2, t$1) {
		return this.names.has(e$2) && this.names.get(e$2).has(t$1);
	}, e$1.prototype.registerName = function(e$2, t$1) {
		if (Se(e$2), this.names.has(e$2)) this.names.get(e$2).add(t$1);
		else {
			var n = /* @__PURE__ */ new Set();
			n.add(t$1), this.names.set(e$2, n);
		}
	}, e$1.prototype.insertRules = function(e$2, t$1, n) {
		this.registerName(e$2, t$1), this.getTag().insertRules(Se(e$2), n);
	}, e$1.prototype.clearNames = function(e$2) {
		this.names.has(e$2) && this.names.get(e$2).clear();
	}, e$1.prototype.clearRules = function(e$2) {
		this.getTag().clearGroup(Se(e$2)), this.clearNames(e$2);
	}, e$1.prototype.clearTag = function() {
		this.tag = void 0;
	}, e$1;
}(), je = /&/g, xe = /^\s*\/\/.*$/gm;
function Ve(e$1, t$1) {
	return e$1.map(function(e$2) {
		return "rule" === e$2.type && (e$2.value = "".concat(t$1, " ").concat(e$2.value), e$2.value = e$2.value.replaceAll(",", ",".concat(t$1, " ")), e$2.props = e$2.props.map(function(e$3) {
			return "".concat(t$1, " ").concat(e$3);
		})), Array.isArray(e$2.children) && "@keyframes" !== e$2.type && (e$2.children = Ve(e$2.children, t$1)), e$2;
	});
}
function Fe(e$1) {
	var t$1, n, o$2, r$2 = void 0 === e$1 ? C : e$1, s$2 = r$2.options, i$2 = void 0 === s$2 ? C : s$2, a$2 = r$2.plugins, c$2 = void 0 === a$2 ? _ : a$2, l$2 = function(e$2, o$3, r$3) {
		return r$3.startsWith(n) && r$3.endsWith(n) && r$3.replaceAll(n, "").length > 0 ? ".".concat(t$1) : e$2;
	}, u$1 = c$2.slice();
	u$1.push(function(e$2) {
		e$2.type === RULESET && e$2.value.includes("&") && (e$2.props[0] = e$2.props[0].replace(je, n).replace(o$2, l$2));
	}), i$2.prefix && u$1.push(prefixer), u$1.push(stringify);
	var p$1 = function(e$2, r$3, s$3, a$3) {
		void 0 === r$3 && (r$3 = ""), void 0 === s$3 && (s$3 = ""), void 0 === a$3 && (a$3 = "&"), t$1 = a$3, n = r$3, o$2 = new RegExp("\\".concat(n, "\\b"), "g");
		var c$3 = e$2.replace(xe, ""), l$3 = compile(s$3 || r$3 ? "".concat(s$3, " ").concat(r$3, " { ").concat(c$3, " }") : c$3);
		i$2.namespace && (l$3 = Ve(l$3, i$2.namespace));
		var p$2 = [];
		return serialize(l$3, middleware(u$1.concat(rulesheet(function(e$3) {
			return p$2.push(e$3);
		})))), p$2;
	};
	return p$1.hash = c$2.length ? c$2.reduce(function(e$2, t$2) {
		return t$2.name || he(15), M(e$2, t$2.name);
	}, F).toString() : "", p$1;
}
var Me = new ke(), ze = Fe(), $e = import_react.createContext({
	shouldForwardProp: void 0,
	styleSheet: Me,
	stylis: ze
});
$e.Consumer;
var Le = import_react.createContext(void 0);
function Ge() {
	return (0, import_react.useContext)($e);
}
function Ye(e$1) {
	var t$1 = (0, import_react.useState)(e$1.stylisPlugins), n = t$1[0], r$2 = t$1[1], c$2 = Ge().styleSheet, l$2 = (0, import_react.useMemo)(function() {
		var t$2 = c$2;
		return e$1.sheet ? t$2 = e$1.sheet : e$1.target && (t$2 = t$2.reconstructWithOptions({ target: e$1.target }, !1)), e$1.disableCSSOMInjection && (t$2 = t$2.reconstructWithOptions({ useCSSOMInjection: !1 })), t$2;
	}, [
		e$1.disableCSSOMInjection,
		e$1.sheet,
		e$1.target,
		c$2
	]), u$1 = (0, import_react.useMemo)(function() {
		return Fe({
			options: {
				namespace: e$1.namespace,
				prefix: e$1.enableVendorPrefixes
			},
			plugins: n
		});
	}, [
		e$1.enableVendorPrefixes,
		e$1.namespace,
		n
	]);
	(0, import_react.useEffect)(function() {
		(0, import_shallowequal.default)(n, e$1.stylisPlugins) || r$2(e$1.stylisPlugins);
	}, [e$1.stylisPlugins]);
	var d = (0, import_react.useMemo)(function() {
		return {
			shouldForwardProp: e$1.shouldForwardProp,
			styleSheet: l$2,
			stylis: u$1
		};
	}, [
		e$1.shouldForwardProp,
		l$2,
		u$1
	]);
	return import_react.createElement($e.Provider, { value: d }, import_react.createElement(Le.Provider, { value: u$1 }, e$1.children));
}
var We = function() {
	function e$1(e$2, t$1) {
		var n = this;
		this.inject = function(e$3, t$2) {
			void 0 === t$2 && (t$2 = ze);
			var o$2 = n.name + t$2.hash;
			e$3.hasNameForId(n.id, o$2) || e$3.insertRules(n.id, o$2, t$2(n.rules, o$2, "@keyframes"));
		}, this.name = e$2, this.id = "sc-keyframes-".concat(e$2), this.rules = t$1, ue(this, function() {
			throw he(12, String(n.name));
		});
	}
	return e$1.prototype.getName = function(e$2) {
		return void 0 === e$2 && (e$2 = ze), this.name + e$2.hash;
	}, e$1;
}(), qe = function(e$1) {
	return e$1 >= "A" && e$1 <= "Z";
};
function He(e$1) {
	for (var t$1 = "", n = 0; n < e$1.length; n++) {
		var o$2 = e$1[n];
		if (1 === n && "-" === o$2 && "-" === e$1[0]) return e$1;
		qe(o$2) ? t$1 += "-" + o$2.toLowerCase() : t$1 += o$2;
	}
	return t$1.startsWith("ms-") ? "-" + t$1 : t$1;
}
var Ue = function(e$1) {
	return null == e$1 || !1 === e$1 || "" === e$1;
}, Je = function(t$1) {
	var n, o$2, r$2 = [];
	for (var s$2 in t$1) {
		var i$2 = t$1[s$2];
		t$1.hasOwnProperty(s$2) && !Ue(i$2) && (Array.isArray(i$2) && i$2.isCss || re(i$2) ? r$2.push("".concat(He(s$2), ":"), i$2, ";") : ce(i$2) ? r$2.push.apply(r$2, __spreadArray(__spreadArray(["".concat(s$2, " {")], Je(i$2), !1), ["}"], !1)) : r$2.push("".concat(He(s$2), ": ").concat((n = s$2, null == (o$2 = i$2) || "boolean" == typeof o$2 || "" === o$2 ? "" : "number" != typeof o$2 || 0 === o$2 || n in unitlessKeys || n.startsWith("--") ? String(o$2).trim() : "".concat(o$2, "px")), ";")));
	}
	return r$2;
};
function Xe(e$1, t$1, n, o$2) {
	if (Ue(e$1)) return [];
	if (se(e$1)) return [".".concat(e$1.styledComponentId)];
	if (re(e$1)) {
		if (!re(s$2 = e$1) || s$2.prototype && s$2.prototype.isReactComponent || !t$1) return [e$1];
		var r$2 = e$1(t$1);
		return Xe(r$2, t$1, n, o$2);
	}
	var s$2;
	return e$1 instanceof We ? n ? (e$1.inject(n, o$2), [e$1.getName(o$2)]) : [e$1] : ce(e$1) ? Je(e$1) : Array.isArray(e$1) ? Array.prototype.concat.apply(_, e$1.map(function(e$2) {
		return Xe(e$2, t$1, n, o$2);
	})) : [e$1.toString()];
}
function Ze(e$1) {
	for (var t$1 = 0; t$1 < e$1.length; t$1 += 1) {
		var n = e$1[t$1];
		if (re(n) && !se(n)) return !1;
	}
	return !0;
}
var Ke = z(v), Qe = function() {
	function e$1(e$2, t$1, n) {
		this.rules = e$2, this.staticRulesId = "", this.isStatic = (void 0 === n || n.isStatic) && Ze(e$2), this.componentId = t$1, this.baseHash = M(Ke, t$1), this.baseStyle = n, ke.registerId(t$1);
	}
	return e$1.prototype.generateAndInjectStyles = function(e$2, t$1, n) {
		var o$2 = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e$2, t$1, n) : "";
		if (this.isStatic && !n.hash) if (this.staticRulesId && t$1.hasNameForId(this.componentId, this.staticRulesId)) o$2 = ie(o$2, this.staticRulesId);
		else {
			var r$2 = ae(Xe(this.rules, e$2, t$1, n)), s$2 = x(M(this.baseHash, r$2) >>> 0);
			if (!t$1.hasNameForId(this.componentId, s$2)) {
				var i$2 = n(r$2, ".".concat(s$2), void 0, this.componentId);
				t$1.insertRules(this.componentId, s$2, i$2);
			}
			o$2 = ie(o$2, s$2), this.staticRulesId = s$2;
		}
		else {
			for (var a$2 = M(this.baseHash, n.hash), c$2 = "", l$2 = 0; l$2 < this.rules.length; l$2++) {
				var u$1 = this.rules[l$2];
				if ("string" == typeof u$1) c$2 += u$1;
				else if (u$1) {
					var p$1 = ae(Xe(u$1, e$2, t$1, n));
					a$2 = M(a$2, p$1 + l$2), c$2 += p$1;
				}
			}
			if (c$2) {
				var d = x(a$2 >>> 0);
				t$1.hasNameForId(this.componentId, d) || t$1.insertRules(this.componentId, d, n(c$2, ".".concat(d), void 0, this.componentId)), o$2 = ie(o$2, d);
			}
		}
		return o$2;
	}, e$1;
}(), et = import_react.createContext(void 0);
et.Consumer;
var rt = {};
function it(e$1, r$2, s$2) {
	var i$2 = se(e$1), a$2 = e$1, c$2 = !L(e$1), p$1 = r$2.attrs, d = void 0 === p$1 ? _ : p$1, h = r$2.componentId, f$2 = void 0 === h ? function(e$2, t$1) {
		var n = "string" != typeof e$2 ? "sc" : R(e$2);
		rt[n] = (rt[n] || 0) + 1;
		var o$2 = "".concat(n, "-").concat($(v + n + rt[n]));
		return t$1 ? "".concat(t$1, "-").concat(o$2) : o$2;
	}(r$2.displayName, r$2.parentComponentId) : h, m$1 = r$2.displayName, y$1 = void 0 === m$1 ? function(e$2) {
		return L(e$2) ? "styled.".concat(e$2) : "Styled(".concat(B(e$2), ")");
	}(e$1) : m$1, g$1 = r$2.displayName && r$2.componentId ? "".concat(R(r$2.displayName), "-").concat(r$2.componentId) : r$2.componentId || f$2, S$1 = i$2 && a$2.attrs ? a$2.attrs.concat(d).filter(Boolean) : d, w$1 = r$2.shouldForwardProp;
	if (i$2 && a$2.shouldForwardProp) {
		var b$1 = a$2.shouldForwardProp;
		if (r$2.shouldForwardProp) {
			var E = r$2.shouldForwardProp;
			w$1 = function(e$2, t$1) {
				return b$1(e$2, t$1) && E(e$2, t$1);
			};
		} else w$1 = b$1;
	}
	var N = new Qe(s$2, g$1, i$2 ? a$2.componentStyle : void 0);
	function O$1(e$2, r$3) {
		return function(e$3, r$4, s$3) {
			var i$3 = e$3.attrs, a$3 = e$3.componentStyle, c$3 = e$3.defaultProps, p$2 = e$3.foldedComponentIds, d$1 = e$3.styledComponentId, h$1 = e$3.target, f$3 = import_react.useContext(et), m$2 = Ge(), y$2 = e$3.shouldForwardProp || m$2.shouldForwardProp;
			var v$1 = I(r$4, f$3, c$3) || C, g$2 = function(e$4, n, o$2) {
				for (var r$5, s$4 = __assign(__assign({}, n), {
					className: void 0,
					theme: o$2
				}), i$4 = 0; i$4 < e$4.length; i$4 += 1) {
					var a$4 = re(r$5 = e$4[i$4]) ? r$5(s$4) : r$5;
					for (var c$4 in a$4) s$4[c$4] = "className" === c$4 ? ie(s$4[c$4], a$4[c$4]) : "style" === c$4 ? __assign(__assign({}, s$4[c$4]), a$4[c$4]) : a$4[c$4];
				}
				return n.className && (s$4.className = ie(s$4.className, n.className)), s$4;
			}(i$3, r$4, v$1), S$2 = g$2.as || h$1, w$2 = {};
			for (var b$2 in g$2) void 0 === g$2[b$2] || "$" === b$2[0] || "as" === b$2 || "theme" === b$2 && g$2.theme === v$1 || ("forwardedAs" === b$2 ? w$2.as = g$2.forwardedAs : y$2 && !y$2(b$2, S$2) || (w$2[b$2] = g$2[b$2]));
			var E$1 = function(e$4, t$1) {
				var n = Ge(), o$2 = e$4.generateAndInjectStyles(t$1, n.styleSheet, n.stylis);
				return o$2;
			}(a$3, g$2);
			var N$1 = ie(p$2, d$1);
			return E$1 && (N$1 += " " + E$1), g$2.className && (N$1 += " " + g$2.className), w$2[L(S$2) && !A.has(S$2) ? "class" : "className"] = N$1, s$3 && (w$2.ref = s$3), (0, import_react.createElement)(S$2, w$2);
		}(D$1, e$2, r$3);
	}
	O$1.displayName = y$1;
	var D$1 = import_react.forwardRef(O$1);
	return D$1.attrs = S$1, D$1.componentStyle = N, D$1.displayName = y$1, D$1.shouldForwardProp = w$1, D$1.foldedComponentIds = i$2 ? ie(a$2.foldedComponentIds, a$2.styledComponentId) : "", D$1.styledComponentId = g$1, D$1.target = i$2 ? a$2.target : e$1, Object.defineProperty(D$1, "defaultProps", {
		get: function() {
			return this._foldedDefaultProps;
		},
		set: function(e$2) {
			this._foldedDefaultProps = i$2 ? function(e$3) {
				for (var t$1 = [], n = 1; n < arguments.length; n++) t$1[n - 1] = arguments[n];
				for (var o$2 = 0, r$3 = t$1; o$2 < r$3.length; o$2++) le(e$3, r$3[o$2], !0);
				return e$3;
			}({}, a$2.defaultProps, e$2) : e$2;
		}
	}), ue(D$1, function() {
		return ".".concat(D$1.styledComponentId);
	}), c$2 && oe(D$1, e$1, {
		attrs: !0,
		componentStyle: !0,
		displayName: !0,
		foldedComponentIds: !0,
		shouldForwardProp: !0,
		styledComponentId: !0,
		target: !0
	}), D$1;
}
function at(e$1, t$1) {
	for (var n = [e$1[0]], o$2 = 0, r$2 = t$1.length; o$2 < r$2; o$2 += 1) n.push(t$1[o$2], e$1[o$2 + 1]);
	return n;
}
var ct = function(e$1) {
	return Object.assign(e$1, { isCss: !0 });
};
function lt(t$1) {
	for (var n = [], o$2 = 1; o$2 < arguments.length; o$2++) n[o$2 - 1] = arguments[o$2];
	if (re(t$1) || ce(t$1)) return ct(Xe(at(_, __spreadArray([t$1], n, !0))));
	var r$2 = t$1;
	return 0 === n.length && 1 === r$2.length && "string" == typeof r$2[0] ? Xe(r$2) : ct(Xe(at(r$2, n)));
}
function ut(n, o$2, r$2) {
	if (void 0 === r$2 && (r$2 = C), !o$2) throw he(1, o$2);
	var s$2 = function(t$1) {
		for (var s$3 = [], i$2 = 1; i$2 < arguments.length; i$2++) s$3[i$2 - 1] = arguments[i$2];
		return n(o$2, r$2, lt.apply(void 0, __spreadArray([t$1], s$3, !1)));
	};
	return s$2.attrs = function(e$1) {
		return ut(n, o$2, __assign(__assign({}, r$2), { attrs: Array.prototype.concat(r$2.attrs, e$1).filter(Boolean) }));
	}, s$2.withConfig = function(e$1) {
		return ut(n, o$2, __assign(__assign({}, r$2), e$1));
	}, s$2;
}
var pt = function(e$1) {
	return ut(it, e$1);
}, dt = pt;
A.forEach(function(e$1) {
	dt[e$1] = pt(e$1);
});
(function() {
	function e$1(e$2, t$1) {
		this.rules = e$2, this.componentId = t$1, this.isStatic = Ze(e$2), ke.registerId(this.componentId + 1);
	}
	return e$1.prototype.createStyles = function(e$2, t$1, n, o$2) {
		var r$2 = o$2(ae(Xe(this.rules, t$1, n, o$2)), ""), s$2 = this.componentId + e$2;
		n.insertRules(s$2, s$2, r$2);
	}, e$1.prototype.removeStyles = function(e$2, t$1) {
		t$1.clearRules(this.componentId + e$2);
	}, e$1.prototype.renderStyles = function(e$2, t$1, n, o$2) {
		e$2 > 2 && ke.registerId(this.componentId + e$2), this.removeStyles(e$2, n), this.createStyles(e$2, t$1, n, o$2);
	}, e$1;
})();
function mt(t$1) {
	for (var n = [], o$2 = 1; o$2 < arguments.length; o$2++) n[o$2 - 1] = arguments[o$2];
	var r$2 = ae(lt.apply(void 0, __spreadArray([t$1], n, !1))), s$2 = $(r$2);
	return new We(s$2, r$2);
}
(function() {
	function e$1() {
		var e$2 = this;
		this._emitSheetCSS = function() {
			var t$1 = e$2.instance.toString();
			if (!t$1) return "";
			var n = Ce(), o$2 = ae([
				n && "nonce=\"".concat(n, "\""),
				"".concat(f, "=\"true\""),
				"".concat(y, "=\"").concat(v, "\"")
			].filter(Boolean), " ");
			return "<style ".concat(o$2, ">").concat(t$1, "</style>");
		}, this.getStyleTags = function() {
			if (e$2.sealed) throw he(2);
			return e$2._emitSheetCSS();
		}, this.getStyleElement = function() {
			var n;
			if (e$2.sealed) throw he(2);
			var r$2 = e$2.instance.toString();
			if (!r$2) return [];
			var s$2 = ((n = {})[f] = "", n[y] = v, n.dangerouslySetInnerHTML = { __html: r$2 }, n), i$2 = Ce();
			return i$2 && (s$2.nonce = i$2), [import_react.createElement("style", __assign({}, s$2, { key: "sc-0-0" }))];
		}, this.seal = function() {
			e$2.sealed = !0;
		}, this.instance = new ke({ isServer: !0 }), this.sealed = !1;
	}
	return e$1.prototype.collectStyles = function(e$2) {
		if (this.sealed) throw he(2);
		return import_react.createElement(Ye, { sheet: this.instance }, e$2);
	}, e$1.prototype.interleaveWithNodeStream = function(e$2) {
		throw he(3);
	}, e$1;
})();
"__sc-".concat(f, "__");
init_warning();
function noop$1() {}
const WarningContext = /* @__PURE__ */ import_react.createContext({});
const devUseWarning = () => {
	const noopWarning = () => {};
	noopWarning.deprecated = noop$1;
	return noopWarning;
};
var validateMessagesContext_default = /* @__PURE__ */ (0, import_react.createContext)(void 0);
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
var en_US_default$1 = locale$3;
var commonLocale = {
	yearFormat: "YYYY",
	dayFormat: "D",
	cellMeridiemFormat: "A",
	monthBeforeYear: true
};
init_objectSpread2();
var locale$2 = _objectSpread2(_objectSpread2({}, commonLocale), {}, {
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
var en_US_default$5 = locale$2;
const locale$1 = {
	placeholder: "Select time",
	rangePlaceholder: ["Start time", "End time"]
};
var en_US_default$4 = locale$1;
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
	}, en_US_default$5),
	timePickerLocale: Object.assign({}, en_US_default$4)
};
var en_US_default$3 = locale;
var en_US_default$2 = en_US_default$3;
const typeTemplate = "${label} is not a valid ${type}";
const localeValues = {
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
var en_US_default = localeValues;
let runtimeLocale = Object.assign({}, en_US_default.Modal);
let localeList = [];
const generateLocale = () => localeList.reduce((merged, locale$4) => Object.assign(Object.assign({}, merged), locale$4), en_US_default.Modal);
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
const LocaleContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var context_default = LocaleContext;
const useLocale = (componentName, defaultLocale) => {
	const fullLocale = import_react.useContext(context_default);
	const getLocale = import_react.useMemo(() => {
		var _a;
		const locale$4 = defaultLocale || en_US_default[componentName];
		const localeFromContext = (_a = fullLocale === null || fullLocale === void 0 ? void 0 : fullLocale[componentName]) !== null && _a !== void 0 ? _a : {};
		return Object.assign(Object.assign({}, typeof locale$4 === "function" ? locale$4() : locale$4), localeFromContext || {});
	}, [
		componentName,
		defaultLocale,
		fullLocale
	]);
	const getLocaleCode = import_react.useMemo(() => {
		const localeCode = fullLocale === null || fullLocale === void 0 ? void 0 : fullLocale.locale;
		if ((fullLocale === null || fullLocale === void 0 ? void 0 : fullLocale.exist) && !localeCode) return en_US_default.locale;
		return localeCode;
	}, [fullLocale]);
	return [getLocale, getLocaleCode];
};
var useLocale_default = useLocale;
const ANT_MARK = "internalMark";
const LocaleProvider = (props) => {
	const { locale: locale$4 = {}, children, _ANT_MARK__ } = props;
	import_react.useEffect(() => {
		const clearLocale = changeConfirmLocale(locale$4 === null || locale$4 === void 0 ? void 0 : locale$4.Modal);
		return clearLocale;
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
const seedToken = Object.assign(Object.assign({}, defaultPresetColors), {
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
var seed_default = seedToken;
init_es();
function genColorMapToken(seed, { generateColorPalettes: generateColorPalettes$1, generateNeutralColorPalettes: generateNeutralColorPalettes$1 }) {
	const { colorSuccess: colorSuccessBase, colorWarning: colorWarningBase, colorError: colorErrorBase, colorInfo: colorInfoBase, colorPrimary: colorPrimaryBase, colorBgBase, colorTextBase } = seed;
	const primaryColors = generateColorPalettes$1(colorPrimaryBase);
	const successColors = generateColorPalettes$1(colorSuccessBase);
	const warningColors = generateColorPalettes$1(colorWarningBase);
	const errorColors = generateColorPalettes$1(colorErrorBase);
	const infoColors = generateColorPalettes$1(colorInfoBase);
	const neutralColors = generateNeutralColorPalettes$1(colorBgBase, colorTextBase);
	const colorLink = seed.colorLink || seed.colorInfo;
	const linkColors = generateColorPalettes$1(colorLink);
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
const genRadius = (radiusBase) => {
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
function genCommonMapToken(token$1) {
	const { motionUnit, motionBase, borderRadius, lineWidth } = token$1;
	return Object.assign({
		motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
		motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
		motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
		lineWidthBold: lineWidth + 1
	}, genRadius_default(borderRadius));
}
const genControlHeight = (token$1) => {
	const { controlHeight } = token$1;
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
	const fontSizes = Array.from({ length: 10 }).map((_$1, index) => {
		const i$2 = index - 1;
		const baseSize = base * Math.pow(Math.E, i$2 / 5);
		const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
		return Math.floor(intSize / 2) * 2;
	});
	fontSizes[1] = base;
	return fontSizes.map((size) => ({
		size,
		lineHeight: getLineHeight(size)
	}));
}
const genFontMapToken = (fontSize) => {
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
function genSizeMapToken(token$1) {
	const { sizeUnit, sizeStep } = token$1;
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
	const instance = new FastColor(baseColor);
	return instance.darken(brightness).toHexString();
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
function derivative(token$1) {
	presetPrimaryColors.pink = presetPrimaryColors.magenta;
	presetPalettes.pink = presetPalettes.magenta;
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = token$1[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token$1[colorKey]);
		return Array.from({ length: 10 }, () => 1).reduce((prev$1, _$1, i$2) => {
			prev$1[`${colorKey}-${i$2 + 1}`] = colors[i$2];
			prev$1[`${colorKey}${i$2 + 1}`] = colors[i$2];
			return prev$1;
		}, {});
	}).reduce((prev$1, cur) => {
		prev$1 = Object.assign(Object.assign({}, prev$1), cur);
		return prev$1;
	}, {});
	return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, token$1), colorPalettes), genColorMapToken(token$1, {
		generateColorPalettes,
		generateNeutralColorPalettes
	})), genFontMapToken_default(token$1.fontSize)), genSizeMapToken(token$1)), genControlHeight_default(token$1)), genCommonMapToken(token$1));
}
init_es$2();
const defaultTheme = createTheme(derivative);
var theme_default$1 = defaultTheme;
const defaultConfig = {
	token: seed_default,
	override: { override: seed_default },
	hashed: true
};
const DesignTokenContext = /* @__PURE__ */ import_react.createContext(defaultConfig);
const defaultPrefixCls = "ant";
const defaultIconPrefixCls = "anticon";
const Variants = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
];
const defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
	if (customizePrefixCls) return customizePrefixCls;
	return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};
const ConfigContext = /* @__PURE__ */ import_react.createContext({
	getPrefixCls: defaultGetPrefixCls,
	iconPrefixCls: defaultIconPrefixCls
});
const { Consumer: ConfigConsumer } = ConfigContext;
const EMPTY_OBJECT = {};
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
const dynamicStyleMark = `-ant-${Date.now()}-${Math.random()}`;
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
		variables["primary-color-deprecated-l-35"] = formatColor(primaryColor, (c$2) => c$2.lighten(35));
		variables["primary-color-deprecated-l-20"] = formatColor(primaryColor, (c$2) => c$2.lighten(20));
		variables["primary-color-deprecated-t-20"] = formatColor(primaryColor, (c$2) => c$2.tint(20));
		variables["primary-color-deprecated-t-50"] = formatColor(primaryColor, (c$2) => c$2.tint(50));
		variables["primary-color-deprecated-f-12"] = formatColor(primaryColor, (c$2) => c$2.setA(c$2.a * .12));
		const primaryActiveColor = new FastColor(primaryColors[0]);
		variables["primary-color-active-deprecated-f-30"] = formatColor(primaryActiveColor, (c$2) => c$2.setA(c$2.a * .3));
		variables["primary-color-active-deprecated-d-02"] = formatColor(primaryActiveColor, (c$2) => c$2.darken(2));
	}
	if (theme.successColor) fillColor(theme.successColor, "success");
	if (theme.warningColor) fillColor(theme.warningColor, "warning");
	if (theme.errorColor) fillColor(theme.errorColor, "error");
	if (theme.infoColor) fillColor(theme.infoColor, "info");
	const cssList = Object.keys(variables).map((key) => `--${globalPrefixCls$1}-${key}: ${variables[key]};`);
	return `
  :root {
    ${cssList.join("\n")}
  }
  `.trim();
}
function registerTheme(globalPrefixCls$1, theme) {
	const style = getStyle(globalPrefixCls$1, theme);
	if (canUseDom()) updateCSS(style, `${dynamicStyleMark}-dynamic-theme`);
}
const DisabledContext = /* @__PURE__ */ import_react.createContext(false);
const DisabledContextProvider = ({ children, disabled }) => {
	const originDisabled = import_react.useContext(DisabledContext);
	return /* @__PURE__ */ import_react.createElement(DisabledContext.Provider, { value: disabled !== null && disabled !== void 0 ? disabled : originDisabled }, children);
};
var DisabledContext_default = DisabledContext;
const SizeContext = /* @__PURE__ */ import_react.createContext(void 0);
const SizeContextProvider = ({ children, size }) => {
	const originSize = import_react.useContext(SizeContext);
	return /* @__PURE__ */ import_react.createElement(SizeContext.Provider, { value: size || originSize }, children);
};
var SizeContext_default = SizeContext;
function useConfig() {
	const componentDisabled = (0, import_react.useContext)(DisabledContext_default);
	const componentSize = (0, import_react.useContext)(SizeContext_default);
	return {
		componentDisabled,
		componentSize
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
var version_default$1 = "5.27.0";
var version_default = version_default$1;
init_es();
function isStableColor(color$1) {
	return color$1 >= 0 && color$1 <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
	const { r: fR, g: fG, b: fB, a: originAlpha } = new FastColor(frontColor).toRgb();
	if (originAlpha < 1) return frontColor;
	const { r: bR, g: bG, b: bB } = new FastColor(backgroundColor).toRgb();
	for (let fA = .01; fA <= 1; fA += .01) {
		const r$2 = Math.round((fR - bR * (1 - fA)) / fA);
		const g$1 = Math.round((fG - bG * (1 - fA)) / fA);
		const b$1 = Math.round((fB - bB * (1 - fA)) / fA);
		if (isStableColor(r$2) && isStableColor(g$1) && isStableColor(b$1)) return new FastColor({
			r: r$2,
			g: g$1,
			b: b$1,
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
var __rest$14 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
function formatToken(derivativeToken) {
	const { override } = derivativeToken, restToken = __rest$14(derivativeToken, ["override"]);
	const overrideTokens = Object.assign({}, override);
	Object.keys(seed_default).forEach((token$1) => {
		delete overrideTokens[token$1];
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
	const aliasToken = Object.assign(Object.assign(Object.assign({}, mergedToken), {
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
	return aliasToken;
}
init_es$2();
var __rest$13 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
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
const preserve = {
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
	const [token$1, hashId, realToken] = useCacheToken(mergedTheme, [seed_default, rootDesignToken], {
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
		token$1,
		cssVar
	];
}
init_es$2();
const textEllipsis = {
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
};
const resetComponent = (token$1, needInheritFontFamily = false) => ({
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	color: token$1.colorText,
	fontSize: token$1.fontSize,
	lineHeight: token$1.lineHeight,
	listStyle: "none",
	fontFamily: needInheritFontFamily ? "inherit" : token$1.fontFamily
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
const genLinkStyle$1 = (token$1) => ({ a: {
	color: token$1.colorLink,
	textDecoration: token$1.linkDecoration,
	backgroundColor: "transparent",
	outline: "none",
	cursor: "pointer",
	transition: `color ${token$1.motionDurationSlow}`,
	"-webkit-text-decoration-skip": "objects",
	"&:hover": { color: token$1.colorLinkHover },
	"&:active": { color: token$1.colorLinkActive },
	"&:active, &:hover": {
		textDecoration: token$1.linkHoverDecoration,
		outline: 0
	},
	"&:focus": {
		textDecoration: token$1.linkFocusDecoration,
		outline: 0
	},
	"&[disabled]": {
		color: token$1.colorTextDisabled,
		cursor: "not-allowed"
	}
} });
const genCommonStyle = (token$1, componentPrefixCls, rootCls, resetFont) => {
	const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
	const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
	const resetStyle = {
		boxSizing: "border-box",
		"&::before, &::after": { boxSizing: "border-box" }
	};
	let resetFontStyle = {};
	if (resetFont !== false) resetFontStyle = {
		fontFamily: token$1.fontFamily,
		fontSize: token$1.fontSize
	};
	return { [rootPrefixSelector]: Object.assign(Object.assign(Object.assign({}, resetFontStyle), resetStyle), { [prefixSelector]: resetStyle }) };
};
const genFocusOutline = (token$1, offset) => ({
	outline: `${unit(token$1.lineWidthFocus)} solid ${token$1.colorPrimaryBorder}`,
	outlineOffset: offset !== null && offset !== void 0 ? offset : 1,
	transition: "outline-offset 0s, outline 0s"
});
const genFocusStyle = (token$1, offset) => ({ "&:focus-visible": genFocusOutline(token$1, offset) });
const genIconStyle = (iconPrefixCls) => ({ [`.${iconPrefixCls}`]: Object.assign(Object.assign({}, resetIcon()), { [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: { display: "block" } }) });
const operationUnit = (token$1) => Object.assign(Object.assign({
	color: token$1.colorLink,
	textDecoration: token$1.linkDecoration,
	outline: "none",
	cursor: "pointer",
	transition: `all ${token$1.motionDurationSlow}`,
	border: 0,
	padding: 0,
	background: "none",
	userSelect: "none"
}, genFocusStyle(token$1)), {
	"&:focus, &:hover": { color: token$1.colorLinkHover },
	"&:active": { color: token$1.colorLinkActive }
});
init_es$3();
const { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils_default({
	usePrefix: () => {
		const { getPrefixCls, iconPrefixCls } = (0, import_react.useContext)(ConfigContext);
		const rootPrefixCls = getPrefixCls();
		return {
			rootPrefixCls,
			iconPrefixCls
		};
	},
	useToken: () => {
		const [theme, realToken, hashId, token$1, cssVar] = useToken();
		return {
			theme,
			realToken,
			hashId,
			token: token$1,
			cssVar
		};
	},
	useCSP: () => {
		const { csp } = (0, import_react.useContext)(ConfigContext);
		return csp !== null && csp !== void 0 ? csp : {};
	},
	getResetStyles: (token$1, config) => {
		var _a;
		const linkStyle = genLinkStyle$1(token$1);
		return [
			linkStyle,
			{ "&": linkStyle },
			genIconStyle((_a = config === null || config === void 0 ? void 0 : config.prefix.iconPrefixCls) !== null && _a !== void 0 ? _a : defaultIconPrefixCls)
		];
	},
	getCommonStyle: genCommonStyle,
	getCompUnitless: () => unitless
});
function genPresetColor(token$1, genCss) {
	return PresetColors.reduce((prev$1, colorKey) => {
		const lightColor = token$1[`${colorKey}1`];
		const lightBorderColor = token$1[`${colorKey}3`];
		const darkColor = token$1[`${colorKey}6`];
		const textColor = token$1[`${colorKey}7`];
		return Object.assign(Object.assign({}, prev$1), genCss(colorKey, {
			lightColor,
			lightBorderColor,
			darkColor,
			textColor
		}));
	}, {});
}
init_es$2();
const useResetIconStyle = (iconPrefixCls, csp) => {
	const [theme, token$1] = useToken();
	return useStyleRegister({
		theme,
		token: token$1,
		hashId: "",
		path: ["ant-design-icons", iconPrefixCls],
		nonce: () => csp === null || csp === void 0 ? void 0 : csp.nonce,
		layer: { name: "antd" }
	}, () => genIconStyle(iconPrefixCls));
};
var useResetIconStyle_default = useResetIconStyle;
const fullClone$1 = Object.assign({}, import_react);
const { useId: useId$1 } = fullClone$1;
const useEmptyId = () => "";
const useThemeKey = typeof useId$1 === "undefined" ? useEmptyId : useId$1;
var useThemeKey_default = useThemeKey;
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
	}, [themeConfig, parentThemeConfig], (prev$1, next$1) => prev$1.some((prevTheme, index) => {
		const nextTheme = next$1[index];
		return !isEqual_default(prevTheme, nextTheme, true);
	}));
}
init_es$4();
const MotionCacheContext = /* @__PURE__ */ import_react.createContext(true);
function MotionWrapper(props) {
	const parentMotion = import_react.useContext(MotionCacheContext);
	const { children } = props;
	const [, token$1] = useToken();
	const { motion: motion$1 } = token$1;
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
var __rest$12 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const PASSED_PROPS = [
	"getTargetContainer",
	"getPopupContainer",
	"renderEmpty",
	"input",
	"pagination",
	"form",
	"select",
	"button"
];
let globalPrefixCls;
let globalIconPrefixCls;
let globalTheme;
let globalHolderRender;
function getGlobalPrefixCls() {
	return globalPrefixCls || defaultPrefixCls;
}
function getGlobalIconPrefixCls() {
	return globalIconPrefixCls || defaultIconPrefixCls;
}
function isLegacyTheme(theme) {
	return Object.keys(theme).some((key) => key.endsWith("Color"));
}
const setGlobalConfig = (props) => {
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
const ProviderChildren = (props) => {
	const { children, csp: customCsp, autoInsertSpaceInButton, alert, anchor, form, locale: locale$4, componentSize, direction, space, splitter, virtual, dropdownMatchSelectWidth, popupMatchSelectWidth, popupOverflow, legacyLocale, parentContext, iconPrefixCls: customIconPrefixCls, theme, componentDisabled, segmented, statistic, spin, calendar, carousel, cascader, collapse, typography, checkbox, descriptions, divider, drawer, skeleton, steps, image, layout: layout$1, list, mentions, modal, progress: progress$1, result, slider, breadcrumb, menu, pagination, input, textArea, empty, badge, radio, rate, switch: SWITCH, transfer, avatar, message, tag, table, card, tabs, timeline, timePicker, upload, notification, tree, colorPicker, datePicker, rangePicker, flex, wave, dropdown, warning: warningConfig, tour, tooltip, popover, popconfirm, floatButton, floatButtonGroup, variant, inputNumber, treeSelect } = props;
	const getPrefixCls = import_react.useCallback((suffixCls, customizePrefixCls) => {
		const { prefixCls } = props;
		if (customizePrefixCls) return customizePrefixCls;
		const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
		return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
	}, [parentContext.getPrefixCls, props.prefixCls]);
	const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || defaultIconPrefixCls;
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
		const _a = mergedTheme || {}, { algorithm, token: token$1, components, cssVar } = _a, rest = __rest$12(_a, [
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
		const mergedToken = Object.assign(Object.assign({}, seed_default), token$1);
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
const ConfigProvider = (props) => {
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
const useCSSVarCls = (prefixCls) => {
	const [, , , , cssVar] = useToken();
	return cssVar ? `${prefixCls}-css-var` : "";
};
var useCSSVarCls_default = useCSSVarCls;
const zIndexContext = /* @__PURE__ */ import_react.createContext(void 0);
var zindexContext_default = zIndexContext;
const CONTAINER_OFFSET = 100;
const CONTAINER_OFFSET_MAX_COUNT = 10;
const CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * CONTAINER_OFFSET_MAX_COUNT;
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
	const [, token$1] = useToken();
	const parentZIndex = import_react.useContext(zindexContext_default);
	const isContainer = isContainerType(componentType);
	let result;
	if (customZIndex !== void 0) result = [customZIndex, customZIndex];
	else {
		let zIndex = parentZIndex !== null && parentZIndex !== void 0 ? parentZIndex : 0;
		if (isContainer) zIndex += (parentZIndex ? 0 : token$1.zIndexPopupBase) + containerBaseZIndexOffset[componentType];
		else zIndex += consumerBaseZIndexOffset[componentType];
		result = [parentZIndex === void 0 ? customZIndex : zIndex, zIndex];
	}
	return result;
};
init_regeneratorRuntime();
init_asyncToGenerator();
init_typeof();
init_objectSpread2();
var import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
var fullClone = _objectSpread2({}, import_react_dom$1);
var version$1 = fullClone.version, reactRender = fullClone.render, unmountComponentAtNode = fullClone.unmountComponentAtNode;
var createRoot;
try {
	var mainVersion = Number((version$1 || "").split(".")[0]);
	if (mainVersion >= 18) createRoot = fullClone.createRoot;
} catch (e$1) {}
function toggleWarning(skip) {
	var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fullClone.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	if (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && _typeof(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === "object") __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
}
var MARK = "__rc_react_root__";
function modernRender(node$1, container) {
	toggleWarning(true);
	var root = container[MARK] || createRoot(container);
	toggleWarning(false);
	root.render(node$1);
	container[MARK] = root;
}
function legacyRender(node$1, container) {
	reactRender === null || reactRender === void 0 || reactRender(node$1, container);
}
function render(node$1, container) {
	if (createRoot) {
		modernRender(node$1, container);
		return;
	}
	legacyRender(node$1, container);
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
const defaultReactRender = (node$1, container) => {
	render(node$1, container);
	return () => {
		return unmount(container);
	};
};
let unstableRender = defaultReactRender;
function unstableSetRender(render$1) {
	if (render$1) unstableRender = render$1;
	return unstableRender;
}
const getCollapsedHeight = () => ({
	height: 0,
	opacity: 0
});
const getRealHeight = (node$1) => {
	const { scrollHeight } = node$1;
	return {
		height: scrollHeight,
		opacity: 1
	};
};
const getCurrentHeight = (node$1) => ({ height: node$1 ? node$1.offsetHeight : 0 });
const skipOpacityTransition = (_$1, event) => (event === null || event === void 0 ? void 0 : event.deadline) === true || event.propertyName === "height";
const initCollapseMotion = (rootCls = defaultPrefixCls) => ({
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
const getTransitionName = (rootPrefixCls, motion$1, transitionName) => {
	if (transitionName !== void 0) return transitionName;
	return `${rootPrefixCls}-${motion$1}`;
};
var motion_default = initCollapseMotion;
const genWaveStyle = (token$1) => {
	const { componentCls, colorPrimary } = token$1;
	return { [componentCls]: {
		position: "absolute",
		background: "transparent",
		pointerEvents: "none",
		boxSizing: "border-box",
		color: `var(--wave-color, ${colorPrimary})`,
		boxShadow: `0 0 0 0 currentcolor`,
		opacity: .2,
		"&.wave-motion-appear": {
			transition: [`box-shadow 0.4s ${token$1.motionEaseOutCirc}`, `opacity 2s ${token$1.motionEaseOutCirc}`].join(","),
			"&-active": {
				boxShadow: `0 0 0 6px currentcolor`,
				opacity: 0
			},
			"&.wave-quick": { transition: [`box-shadow ${token$1.motionDurationSlow} ${token$1.motionEaseInOut}`, `opacity ${token$1.motionDurationSlow} ${token$1.motionEaseInOut}`].join(",") }
		}
	} };
};
var style_default$8 = genComponentStyleHook("Wave", genWaveStyle);
const TARGET_CLS = `${defaultPrefixCls}-wave-target`;
function isValidWaveColor(color$1) {
	return color$1 && color$1 !== "#fff" && color$1 !== "#ffffff" && color$1 !== "rgb(255, 255, 255)" && color$1 !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(color$1) && color$1 !== "transparent" && color$1 !== "canvastext";
}
function getTargetWaveColor(node$1) {
	const { borderTopColor, borderColor, backgroundColor } = getComputedStyle(node$1);
	if (isValidWaveColor(borderTopColor)) return borderTopColor;
	if (isValidWaveColor(borderColor)) return borderColor;
	if (isValidWaveColor(backgroundColor)) return backgroundColor;
	return null;
}
var import_classnames$22 = /* @__PURE__ */ __toESM(require_classnames());
init_es$4();
init_raf();
init_ref();
function validateNum(value) {
	return Number.isNaN(value) ? 0 : value;
}
const WaveEffect = (props) => {
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
		onAppearEnd: (_$1, event) => {
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
		className: (0, import_classnames$22.default)(className, motionClassName, { "wave-quick": isSmallComponent }),
		style: waveStyle
	}));
};
const showWaveEffect = (target, info) => {
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
const useWave = (nodeRef, className, component) => {
	const { wave } = import_react.useContext(ConfigContext);
	const [, token$1, hashId] = useToken();
	const showWave = useEvent((event) => {
		const node$1 = nodeRef.current;
		if ((wave === null || wave === void 0 ? void 0 : wave.disabled) || !node$1) return;
		const targetNode = node$1.querySelector(`.${TARGET_CLS}`) || node$1;
		const { showEffect } = wave || {};
		(showEffect || WaveEffect_default)(targetNode, {
			className,
			token: token$1,
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
var import_classnames$21 = /* @__PURE__ */ __toESM(require_classnames());
init_isVisible();
init_ref();
const Wave = (props) => {
	const { children, disabled, component } = props;
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const containerRef = (0, import_react.useRef)(null);
	const prefixCls = getPrefixCls("wave");
	const [, hashId] = style_default$8(prefixCls);
	const showWave = useWave_default(containerRef, (0, import_classnames$21.default)(prefixCls, hashId), component);
	import_react.useEffect(() => {
		const node$1 = containerRef.current;
		if (!node$1 || node$1.nodeType !== 1 || disabled) return;
		const onClick = (e$1) => {
			if (!isVisible_default(e$1.target) || !node$1.getAttribute || node$1.getAttribute("disabled") || node$1.disabled || node$1.className.includes("disabled") || node$1.className.includes("-leave")) return;
			showWave(e$1);
		};
		node$1.addEventListener("click", onClick, true);
		return () => {
			node$1.removeEventListener("click", onClick, true);
		};
	}, [disabled]);
	if (!/* @__PURE__ */ import_react.isValidElement(children)) return children !== null && children !== void 0 ? children : null;
	const ref = supportRef(children) ? composeRef(getNodeRef(children), containerRef) : containerRef;
	return cloneElement(children, { ref });
};
var wave_default = Wave;
const useSize = (customSize) => {
	const size = import_react.useContext(SizeContext_default);
	const mergedSize = import_react.useMemo(() => {
		if (!customSize) return size;
		if (typeof customSize === "string") return customSize !== null && customSize !== void 0 ? customSize : size;
		if (typeof customSize === "function") return customSize(size);
		return size;
	}, [customSize, size]);
	return mergedSize;
};
var useSize_default = useSize;
const genSpaceCompactStyle = (token$1) => {
	const { componentCls } = token$1;
	return { [componentCls]: {
		"&-block": {
			display: "flex",
			width: "100%"
		},
		"&-vertical": { flexDirection: "column" }
	} };
};
var compact_default$1 = genSpaceCompactStyle;
const genSpaceStyle = (token$1) => {
	const { componentCls, antCls } = token$1;
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
const genSpaceGapStyle = (token$1) => {
	const { componentCls } = token$1;
	return { [componentCls]: {
		"&-gap-row-small": { rowGap: token$1.spaceGapSmallSize },
		"&-gap-row-middle": { rowGap: token$1.spaceGapMiddleSize },
		"&-gap-row-large": { rowGap: token$1.spaceGapLargeSize },
		"&-gap-col-small": { columnGap: token$1.spaceGapSmallSize },
		"&-gap-col-middle": { columnGap: token$1.spaceGapMiddleSize },
		"&-gap-col-large": { columnGap: token$1.spaceGapLargeSize }
	} };
};
var style_default$1 = genStyleHooks("Space", (token$1) => {
	const spaceToken = merge(token$1, {
		spaceGapSmallSize: token$1.paddingXS,
		spaceGapMiddleSize: token$1.padding,
		spaceGapLargeSize: token$1.paddingLG
	});
	return [
		genSpaceStyle(spaceToken),
		genSpaceGapStyle(spaceToken),
		compact_default$1(spaceToken)
	];
}, () => ({}), { resetStyle: false });
var import_classnames$20 = /* @__PURE__ */ __toESM(require_classnames());
init_toArray();
var __rest$11 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
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
		return (0, import_classnames$20.default)(`${prefixCls}-compact${separator}item`, {
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
const CompactItem = (props) => {
	const { children } = props, others = __rest$11(props, ["children"]);
	return /* @__PURE__ */ import_react.createElement(SpaceCompactItemContext.Provider, { value: import_react.useMemo(() => others, [others]) }, children);
};
const Compact = (props) => {
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
	const clx = (0, import_classnames$20.default)(prefixCls, hashId, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-vertical`]: direction === "vertical"
	}, className, rootClassName);
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const childNodes = toArray(children);
	const nodes = import_react.useMemo(() => childNodes.map((child, i$2) => {
		const key = (child === null || child === void 0 ? void 0 : child.key) || `${prefixCls}-item-${i$2}`;
		return /* @__PURE__ */ import_react.createElement(CompactItem, {
			key,
			compactSize: mergedSize,
			compactDirection: direction,
			isFirstItem: i$2 === 0 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
			isLastItem: i$2 === childNodes.length - 1 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
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
var import_classnames$19 = /* @__PURE__ */ __toESM(require_classnames());
var __rest$10 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const GroupSizeContext = /* @__PURE__ */ import_react.createContext(void 0);
const ButtonGroup = (props) => {
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
	const classes = (0, import_classnames$19.default)(prefixCls, {
		[`${prefixCls}-${sizeCls}`]: sizeCls,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, hashId);
	return /* @__PURE__ */ import_react.createElement(GroupSizeContext.Provider, { value: size }, /* @__PURE__ */ import_react.createElement("div", Object.assign({}, others, { className: classes })));
};
var button_group_default = ButtonGroup;
init_toConsumableArray();
const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
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
			const lastChild = childList[lastIndex];
			childList[lastIndex] = `${lastChild}${child}`;
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
var import_classnames$18 = /* @__PURE__ */ __toESM(require_classnames());
const IconWrapper = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { className, style, children, prefixCls } = props;
	const iconWrapperCls = (0, import_classnames$18.default)(`${prefixCls}-icon`, className);
	return /* @__PURE__ */ import_react.createElement("span", {
		ref,
		className: iconWrapperCls,
		style
	}, children);
});
var IconWrapper_default = IconWrapper;
init_LoadingOutlined();
var import_classnames$17 = /* @__PURE__ */ __toESM(require_classnames());
init_es$4();
const InnerLoadingIcon = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls, className, style, iconClassName } = props;
	const mergedIconCls = (0, import_classnames$17.default)(`${prefixCls}-loading-icon`, className);
	return /* @__PURE__ */ import_react.createElement(IconWrapper_default, {
		prefixCls,
		className: mergedIconCls,
		style,
		ref
	}, /* @__PURE__ */ import_react.createElement(LoadingOutlined_default, { className: iconClassName }));
});
const getCollapsedWidth = () => ({
	width: 0,
	opacity: 0,
	transform: "scale(0)"
});
const getRealWidth = (node$1) => ({
	width: node$1.scrollWidth,
	opacity: 1,
	transform: "scale(1)"
});
const DefaultLoadingIcon = (props) => {
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
			className: (0, import_classnames$17.default)(className, motionCls),
			style: mergedStyle,
			ref
		});
	});
};
var DefaultLoadingIcon_default = DefaultLoadingIcon;
const genButtonBorderStyle = (buttonTypeCls, borderColor) => ({ [`> span, > ${buttonTypeCls}`]: {
	"&:not(:last-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineEndColor: borderColor } } },
	"&:not(:first-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineStartColor: borderColor } } }
} });
const genGroupStyle = (token$1) => {
	const { componentCls, fontSize, lineWidth, groupBorderColor, colorErrorHover } = token$1;
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
					marginInlineStart: token$1.calc(lineWidth).mul(-1).equal(),
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
			this.colors = color$1.map(({ color: c$2, percent: percent$1 }) => ({
				color: new AggregationColor$1(c$2),
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
				if (colors) {
					const colorsStr = colors.map((c$2) => `${c$2.color.toRgbString()} ${c$2.percent}%`).join(", ");
					return `linear-gradient(90deg, ${colorsStr})`;
				}
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "equals",
			value: function equals(color$1) {
				if (!color$1 || this.isGradient() !== color$1.isGradient()) return false;
				if (!this.isGradient()) return this.toHexString() === color$1.toHexString();
				return this.colors.length === color$1.colors.length && this.colors.every((c$2, i$2) => {
					const target = color$1.colors[i$2];
					return c$2.percent === target.percent && c$2.color.equals(target.color);
				});
			}
		}
	]);
}();
var import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames());
init_es$6();
const CollapsePanel = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, className, showArrow = true } = props;
	const prefixCls = getPrefixCls("collapse", customizePrefixCls);
	const collapsePanelClassName = (0, import_classnames$16.default)({ [`${prefixCls}-no-arrow`]: !showArrow }, className);
	return /* @__PURE__ */ import_react.createElement(es_default$4.Panel, Object.assign({ ref }, props, {
		prefixCls,
		className: collapsePanelClassName
	}));
});
var CollapsePanel_default = CollapsePanel;
const genCollapseMotion = (token$1) => ({ [token$1.componentCls]: {
	[`${token$1.antCls}-motion-collapse-legacy`]: {
		overflow: "hidden",
		"&-active": { transition: `height ${token$1.motionDurationMid} ${token$1.motionEaseInOut},
        opacity ${token$1.motionDurationMid} ${token$1.motionEaseInOut} !important` }
	},
	[`${token$1.antCls}-motion-collapse`]: {
		overflow: "hidden",
		transition: `height ${token$1.motionDurationMid} ${token$1.motionEaseInOut},
        opacity ${token$1.motionDurationMid} ${token$1.motionEaseInOut} !important`
	}
} });
var collapse_default = genCollapseMotion;
const initMotionCommon = (duration) => ({
	animationDuration: duration,
	animationFillMode: "both"
});
const initMotionCommonLeave = (duration) => ({
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
const initFadeMotion = (token$1, sameLevel = false) => {
	const { antCls } = token$1;
	const motionCls = `${antCls}-fade`;
	const sameLevelPrefix = sameLevel ? "&" : "";
	return [initMotion(motionCls, fadeIn, fadeOut, token$1.motionDurationMid, sameLevel), {
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
const moveMotion = {
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
const initMoveMotion = (token$1, motionName) => {
	const { antCls } = token$1;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = moveMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token$1.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: token$1.motionEaseOutCirc
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token$1.motionEaseInOutCirc }
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
const slideMotion = {
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
const initSlideMotion = (token$1, motionName) => {
	const { antCls } = token$1;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = slideMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token$1.motionDurationMid), {
		[`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
			transform: "scale(0)",
			transformOrigin: "0% 0%",
			opacity: 0,
			animationTimingFunction: token$1.motionEaseOutQuint,
			"&-prepare": { transform: "scale(1)" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token$1.motionEaseInQuint }
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
const zoomMotion = {
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
const initZoomMotion = (token$1, motionName) => {
	const { antCls } = token$1;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = zoomMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token$1.motionDurationFast : token$1.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			transform: "scale(0)",
			opacity: 0,
			animationTimingFunction: token$1.motionEaseOutCirc,
			"&-prepare": { transform: "none" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token$1.motionEaseInOutCirc }
	}];
};
init_es$2();
const genBaseStyle$1 = (token$1) => {
	const { componentCls, contentBg, padding, headerBg, headerPadding, collapseHeaderPaddingSM, collapseHeaderPaddingLG, collapsePanelBorderRadius, lineWidth, lineType, colorBorder, colorText, colorTextHeading, colorTextDisabled, fontSizeLG, lineHeight, lineHeightLG, marginSM, paddingSM, paddingLG, paddingXS, motionDurationSlow, fontSizeIcon, contentPadding, fontHeight, fontHeightLG } = token$1;
	const borderBase = `${unit(lineWidth)} ${lineType} ${colorBorder}`;
	return { [componentCls]: Object.assign(Object.assign({}, resetComponent(token$1)), {
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
			}, genFocusStyle(token$1)), {
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
				[`> ${componentCls}-expand-icon`]: { marginInlineStart: token$1.calc(paddingSM).sub(paddingXS).equal() }
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
					marginInlineStart: token$1.calc(paddingLG).sub(padding).equal()
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
const genArrowStyle = (token$1) => {
	const { componentCls } = token$1;
	const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow`;
	return { [`${componentCls}-rtl`]: { [fixedSelector]: { transform: `rotate(180deg)` } } };
};
const genBorderlessStyle = (token$1) => {
	const { componentCls, headerBg, borderlessContentPadding, borderlessContentBg, colorBorder } = token$1;
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
const genGhostStyle = (token$1) => {
	const { componentCls, paddingSM } = token$1;
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
const prepareComponentToken$6 = (token$1) => ({
	headerPadding: `${token$1.paddingSM}px ${token$1.padding}px`,
	headerBg: token$1.colorFillAlter,
	contentPadding: `${token$1.padding}px 16px`,
	contentBg: token$1.colorBgContainer,
	borderlessContentPadding: `${token$1.paddingXXS}px 16px ${token$1.padding}px`,
	borderlessContentBg: "transparent"
});
var style_default$7 = genStyleHooks("Collapse", (token$1) => {
	const collapseToken = merge(token$1, {
		collapseHeaderPaddingSM: `${unit(token$1.paddingXS)} ${unit(token$1.paddingSM)}`,
		collapseHeaderPaddingLG: `${unit(token$1.padding)} ${unit(token$1.paddingLG)}`,
		collapsePanelBorderRadius: token$1.borderRadiusLG
	});
	return [
		genBaseStyle$1(collapseToken),
		genBorderlessStyle(collapseToken),
		genGhostStyle(collapseToken),
		genArrowStyle(collapseToken),
		collapse_default(collapseToken)
	];
}, prepareComponentToken$6);
init_RightOutlined();
var import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames());
init_es$6();
init_toArray();
init_omit();
const Collapse = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction, expandIcon: contextExpandIcon, className: contextClassName, style: contextStyle } = useComponentConfig("collapse");
	const { prefixCls: customizePrefixCls, className, rootClassName, style, bordered = true, ghost, size: customizeSize, expandIconPosition = "start", children, destroyInactivePanel, destroyOnHidden, expandIcon } = props;
	const mergedSize = useSize_default((ctx) => {
		var _a;
		return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : ctx) !== null && _a !== void 0 ? _a : "middle";
	});
	const prefixCls = getPrefixCls("collapse", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const [wrapCSSVar, hashId, cssVarCls] = style_default$7(prefixCls);
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
			return { className: (0, import_classnames$15.default)((_a = icon.props) === null || _a === void 0 ? void 0 : _a.className, `${prefixCls}-arrow`) };
		});
	}, [
		mergedExpandIcon,
		prefixCls,
		direction
	]);
	const collapseClassName = (0, import_classnames$15.default)(`${prefixCls}-icon-position-${mergedExpandIconPosition}`, {
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
		return toArray(children).map((child, index) => {
			var _a, _b;
			const childProps = child.props;
			if (childProps === null || childProps === void 0 ? void 0 : childProps.disabled) {
				const key = (_a = child.key) !== null && _a !== void 0 ? _a : String(index);
				const mergedChildProps = Object.assign(Object.assign({}, omit(child.props, ["disabled"])), {
					key,
					collapsible: (_b = childProps.collapsible) !== null && _b !== void 0 ? _b : "disabled"
				});
				return cloneElement(child, mergedChildProps);
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
var Collapse_default = Object.assign(Collapse, { Panel: CollapsePanel_default });
var collapse_default$1 = Collapse_default;
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
	for (let i$2 = 0; i$2 < filledColors.length - 1; i$2 += 1) {
		const startPtg = filledColors[i$2].percent;
		const endPtg = filledColors[i$2 + 1].percent;
		const startColor = filledColors[i$2].color;
		const endColor = filledColors[i$2 + 1].color;
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
var import_classnames$14 = /* @__PURE__ */ __toESM(require_classnames());
init_useMergedState();
const genPresetColor$1 = (list) => list.map((value) => {
	value.colors = value.colors.map(generateColor);
	return value;
});
const isBright = (value, bgColorToken) => {
	const { r: r$2, g: g$1, b: b$1, a: a$2 } = value.toRgb();
	const hsv = new Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
	if (a$2 <= .5) return hsv.v > .5;
	return r$2 * .299 + g$1 * .587 + b$1 * .114 > 192;
};
const genCollapsePanelKey = (preset, index) => {
	var _a;
	const mergedKey = (_a = preset.key) !== null && _a !== void 0 ? _a : index;
	return `panel-${mergedKey}`;
};
const ColorPresets = ({ prefixCls, presets, value: color$1, onChange }) => {
	const [locale$4] = useLocale_default("ColorPicker");
	const [, token$1] = useToken();
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
				className: (0, import_classnames$14.default)(`${colorPresetsPrefixCls}-color`, {
					[`${colorPresetsPrefixCls}-color-checked`]: presetColor.toHexString() === (color$1 === null || color$1 === void 0 ? void 0 : color$1.toHexString()),
					[`${colorPresetsPrefixCls}-color-bright`]: isBright(presetColor, token$1.colorBgElevated)
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
const prepareToken$1 = (token$1) => {
	const { paddingInline, onlyIconSize } = token$1;
	const buttonToken = merge(token$1, {
		buttonPaddingHorizontal: paddingInline,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: onlyIconSize
	});
	return buttonToken;
};
const prepareComponentToken$5 = (token$1) => {
	var _a, _b, _c, _d, _e$1, _f;
	const contentFontSize = (_a = token$1.contentFontSize) !== null && _a !== void 0 ? _a : token$1.fontSize;
	const contentFontSizeSM = (_b = token$1.contentFontSizeSM) !== null && _b !== void 0 ? _b : token$1.fontSize;
	const contentFontSizeLG = (_c = token$1.contentFontSizeLG) !== null && _c !== void 0 ? _c : token$1.fontSizeLG;
	const contentLineHeight = (_d = token$1.contentLineHeight) !== null && _d !== void 0 ? _d : getLineHeight(contentFontSize);
	const contentLineHeightSM = (_e$1 = token$1.contentLineHeightSM) !== null && _e$1 !== void 0 ? _e$1 : getLineHeight(contentFontSizeSM);
	const contentLineHeightLG = (_f = token$1.contentLineHeightLG) !== null && _f !== void 0 ? _f : getLineHeight(contentFontSizeLG);
	const solidTextColor = isBright(new AggregationColor(token$1.colorBgSolid), "#fff") ? "#000" : "#fff";
	const shadowColorTokens = PresetColors.reduce((prev$1, colorKey) => Object.assign(Object.assign({}, prev$1), { [`${colorKey}ShadowColor`]: `0 ${unit(token$1.controlOutlineWidth)} 0 ${getAlphaColor_default(token$1[`${colorKey}1`], token$1.colorBgContainer)}` }), {});
	return Object.assign(Object.assign({}, shadowColorTokens), {
		fontWeight: 400,
		iconGap: token$1.marginXS,
		defaultShadow: `0 ${token$1.controlOutlineWidth}px 0 ${token$1.controlTmpOutline}`,
		primaryShadow: `0 ${token$1.controlOutlineWidth}px 0 ${token$1.controlOutline}`,
		dangerShadow: `0 ${token$1.controlOutlineWidth}px 0 ${token$1.colorErrorOutline}`,
		primaryColor: token$1.colorTextLightSolid,
		dangerColor: token$1.colorTextLightSolid,
		borderColorDisabled: token$1.colorBorder,
		defaultGhostColor: token$1.colorBgContainer,
		ghostBg: "transparent",
		defaultGhostBorderColor: token$1.colorBgContainer,
		paddingInline: token$1.paddingContentHorizontal - token$1.lineWidth,
		paddingInlineLG: token$1.paddingContentHorizontal - token$1.lineWidth,
		paddingInlineSM: 8 - token$1.lineWidth,
		onlyIconSize: "inherit",
		onlyIconSizeSM: "inherit",
		onlyIconSizeLG: "inherit",
		groupBorderColor: token$1.colorPrimaryHover,
		linkHoverBg: "transparent",
		textTextColor: token$1.colorText,
		textTextHoverColor: token$1.colorText,
		textTextActiveColor: token$1.colorText,
		textHoverBg: token$1.colorFillTertiary,
		defaultColor: token$1.colorText,
		defaultBg: token$1.colorBgContainer,
		defaultBorderColor: token$1.colorBorder,
		defaultBorderColorDisabled: token$1.colorBorder,
		defaultHoverBg: token$1.colorBgContainer,
		defaultHoverColor: token$1.colorPrimaryHover,
		defaultHoverBorderColor: token$1.colorPrimaryHover,
		defaultActiveBg: token$1.colorBgContainer,
		defaultActiveColor: token$1.colorPrimaryActive,
		defaultActiveBorderColor: token$1.colorPrimaryActive,
		solidTextColor,
		contentFontSize,
		contentFontSizeSM,
		contentFontSizeLG,
		contentLineHeight,
		contentLineHeightSM,
		contentLineHeightLG,
		paddingBlock: Math.max((token$1.controlHeight - contentFontSize * contentLineHeight) / 2 - token$1.lineWidth, 0),
		paddingBlockSM: Math.max((token$1.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token$1.lineWidth, 0),
		paddingBlockLG: Math.max((token$1.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token$1.lineWidth, 0)
	});
};
init_es$2();
const genSharedButtonStyle = (token$1) => {
	const { componentCls, iconCls, fontWeight, opacityLoading, motionDurationSlow, motionEaseInOut, iconGap, calc } = token$1;
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
		border: `${unit(token$1.lineWidth)} ${token$1.lineType} transparent`,
		cursor: "pointer",
		transition: `all ${token$1.motionDurationMid} ${token$1.motionEaseInOut}`,
		userSelect: "none",
		touchAction: "manipulation",
		color: token$1.colorText,
		"&:disabled > *": { pointerEvents: "none" },
		[`${componentCls}-icon > svg`]: resetIcon(),
		"> a": { color: "currentColor" },
		"&:not(:disabled)": genFocusStyle(token$1),
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
const genHoverActiveButtonStyle = (btnCls, hoverStyle, activeStyle) => ({ [`&:not(:disabled):not(${btnCls}-disabled)`]: {
	"&:hover": hoverStyle,
	"&:active": activeStyle
} });
const genCircleButtonStyle = (token$1) => ({
	minWidth: token$1.controlHeight,
	paddingInlineStart: 0,
	paddingInlineEnd: 0,
	borderRadius: "50%"
});
const genRoundButtonStyle = (token$1) => ({
	borderRadius: token$1.controlHeight,
	paddingInlineStart: token$1.calc(token$1.controlHeight).div(2).equal(),
	paddingInlineEnd: token$1.calc(token$1.controlHeight).div(2).equal()
});
const genDisabledStyle = (token$1) => ({
	cursor: "not-allowed",
	borderColor: token$1.borderColorDisabled,
	color: token$1.colorTextDisabled,
	background: token$1.colorBgContainerDisabled,
	boxShadow: "none"
});
const genGhostButtonStyle = (btnCls, background, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) => ({ [`&${btnCls}-background-ghost`]: Object.assign(Object.assign({
	color: textColor || void 0,
	background,
	borderColor: borderColor || void 0,
	boxShadow: "none"
}, genHoverActiveButtonStyle(btnCls, Object.assign({ background }, hoverStyle), Object.assign({ background }, activeStyle))), { "&:disabled": {
	cursor: "not-allowed",
	color: textColorDisabled || void 0,
	borderColor: borderColorDisabled || void 0
} }) });
const genSolidDisabledButtonStyle = (token$1) => ({ [`&:disabled, &${token$1.componentCls}-disabled`]: Object.assign({}, genDisabledStyle(token$1)) });
const genPureDisabledButtonStyle = (token$1) => ({ [`&:disabled, &${token$1.componentCls}-disabled`]: {
	cursor: "not-allowed",
	color: token$1.colorTextDisabled
} });
const genVariantButtonStyle = (token$1, hoverStyle, activeStyle, variant) => {
	const isPureDisabled = variant && ["link", "text"].includes(variant);
	const genDisabledButtonStyle = isPureDisabled ? genPureDisabledButtonStyle : genSolidDisabledButtonStyle;
	return Object.assign(Object.assign({}, genDisabledButtonStyle(token$1)), genHoverActiveButtonStyle(token$1.componentCls, hoverStyle, activeStyle));
};
const genSolidButtonStyle = (token$1, textColor, background, hoverStyle, activeStyle) => ({ [`&${token$1.componentCls}-variant-solid`]: Object.assign({
	color: textColor,
	background
}, genVariantButtonStyle(token$1, hoverStyle, activeStyle)) });
const genOutlinedDashedButtonStyle = (token$1, borderColor, background, hoverStyle, activeStyle) => ({ [`&${token$1.componentCls}-variant-outlined, &${token$1.componentCls}-variant-dashed`]: Object.assign({
	borderColor,
	background
}, genVariantButtonStyle(token$1, hoverStyle, activeStyle)) });
const genDashedButtonStyle = (token$1) => ({ [`&${token$1.componentCls}-variant-dashed`]: { borderStyle: "dashed" } });
const genFilledButtonStyle = (token$1, background, hoverStyle, activeStyle) => ({ [`&${token$1.componentCls}-variant-filled`]: Object.assign({
	boxShadow: "none",
	background
}, genVariantButtonStyle(token$1, hoverStyle, activeStyle)) });
const genTextLinkButtonStyle = (token$1, textColor, variant, hoverStyle, activeStyle) => ({ [`&${token$1.componentCls}-variant-${variant}`]: Object.assign({
	color: textColor,
	boxShadow: "none"
}, genVariantButtonStyle(token$1, hoverStyle, activeStyle, variant)) });
const genPresetColorStyle = (token$1) => {
	const { componentCls } = token$1;
	return PresetColors.reduce((prev$1, colorKey) => {
		const darkColor = token$1[`${colorKey}6`];
		const lightColor = token$1[`${colorKey}1`];
		const hoverColor = token$1[`${colorKey}5`];
		const lightHoverColor = token$1[`${colorKey}2`];
		const lightBorderColor = token$1[`${colorKey}3`];
		const activeColor = token$1[`${colorKey}7`];
		return Object.assign(Object.assign({}, prev$1), { [`&${componentCls}-color-${colorKey}`]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
			color: darkColor,
			boxShadow: token$1[`${colorKey}ShadowColor`]
		}, genSolidButtonStyle(token$1, token$1.colorTextLightSolid, darkColor, { background: hoverColor }, { background: activeColor })), genOutlinedDashedButtonStyle(token$1, darkColor, token$1.colorBgContainer, {
			color: hoverColor,
			borderColor: hoverColor,
			background: token$1.colorBgContainer
		}, {
			color: activeColor,
			borderColor: activeColor,
			background: token$1.colorBgContainer
		})), genDashedButtonStyle(token$1)), genFilledButtonStyle(token$1, lightColor, {
			color: darkColor,
			background: lightHoverColor
		}, {
			color: darkColor,
			background: lightBorderColor
		})), genTextLinkButtonStyle(token$1, darkColor, "link", { color: hoverColor }, { color: activeColor })), genTextLinkButtonStyle(token$1, darkColor, "text", {
			color: hoverColor,
			background: lightColor
		}, {
			color: activeColor,
			background: lightBorderColor
		})) });
	}, {});
};
const genDefaultButtonStyle = (token$1) => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
	color: token$1.defaultColor,
	boxShadow: token$1.defaultShadow
}, genSolidButtonStyle(token$1, token$1.solidTextColor, token$1.colorBgSolid, {
	color: token$1.solidTextColor,
	background: token$1.colorBgSolidHover
}, {
	color: token$1.solidTextColor,
	background: token$1.colorBgSolidActive
})), genDashedButtonStyle(token$1)), genFilledButtonStyle(token$1, token$1.colorFillTertiary, {
	color: token$1.defaultColor,
	background: token$1.colorFillSecondary
}, {
	color: token$1.defaultColor,
	background: token$1.colorFill
})), genGhostButtonStyle(token$1.componentCls, token$1.ghostBg, token$1.defaultGhostColor, token$1.defaultGhostBorderColor, token$1.colorTextDisabled, token$1.colorBorder)), genTextLinkButtonStyle(token$1, token$1.textTextColor, "link", {
	color: token$1.colorLinkHover,
	background: token$1.linkHoverBg
}, { color: token$1.colorLinkActive }));
const genPrimaryButtonStyle = (token$1) => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
	color: token$1.colorPrimary,
	boxShadow: token$1.primaryShadow
}, genOutlinedDashedButtonStyle(token$1, token$1.colorPrimary, token$1.colorBgContainer, {
	color: token$1.colorPrimaryTextHover,
	borderColor: token$1.colorPrimaryHover,
	background: token$1.colorBgContainer
}, {
	color: token$1.colorPrimaryTextActive,
	borderColor: token$1.colorPrimaryActive,
	background: token$1.colorBgContainer
})), genDashedButtonStyle(token$1)), genFilledButtonStyle(token$1, token$1.colorPrimaryBg, {
	color: token$1.colorPrimary,
	background: token$1.colorPrimaryBgHover
}, {
	color: token$1.colorPrimary,
	background: token$1.colorPrimaryBorder
})), genTextLinkButtonStyle(token$1, token$1.colorPrimaryText, "text", {
	color: token$1.colorPrimaryTextHover,
	background: token$1.colorPrimaryBg
}, {
	color: token$1.colorPrimaryTextActive,
	background: token$1.colorPrimaryBorder
})), genTextLinkButtonStyle(token$1, token$1.colorPrimaryText, "link", {
	color: token$1.colorPrimaryTextHover,
	background: token$1.linkHoverBg
}, { color: token$1.colorPrimaryTextActive })), genGhostButtonStyle(token$1.componentCls, token$1.ghostBg, token$1.colorPrimary, token$1.colorPrimary, token$1.colorTextDisabled, token$1.colorBorder, {
	color: token$1.colorPrimaryHover,
	borderColor: token$1.colorPrimaryHover
}, {
	color: token$1.colorPrimaryActive,
	borderColor: token$1.colorPrimaryActive
}));
const genDangerousStyle = (token$1) => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
	color: token$1.colorError,
	boxShadow: token$1.dangerShadow
}, genSolidButtonStyle(token$1, token$1.dangerColor, token$1.colorError, { background: token$1.colorErrorHover }, { background: token$1.colorErrorActive })), genOutlinedDashedButtonStyle(token$1, token$1.colorError, token$1.colorBgContainer, {
	color: token$1.colorErrorHover,
	borderColor: token$1.colorErrorBorderHover
}, {
	color: token$1.colorErrorActive,
	borderColor: token$1.colorErrorActive
})), genDashedButtonStyle(token$1)), genFilledButtonStyle(token$1, token$1.colorErrorBg, {
	color: token$1.colorError,
	background: token$1.colorErrorBgFilledHover
}, {
	color: token$1.colorError,
	background: token$1.colorErrorBgActive
})), genTextLinkButtonStyle(token$1, token$1.colorError, "text", {
	color: token$1.colorErrorHover,
	background: token$1.colorErrorBg
}, {
	color: token$1.colorErrorHover,
	background: token$1.colorErrorBgActive
})), genTextLinkButtonStyle(token$1, token$1.colorError, "link", { color: token$1.colorErrorHover }, { color: token$1.colorErrorActive })), genGhostButtonStyle(token$1.componentCls, token$1.ghostBg, token$1.colorError, token$1.colorError, token$1.colorTextDisabled, token$1.colorBorder, {
	color: token$1.colorErrorHover,
	borderColor: token$1.colorErrorHover
}, {
	color: token$1.colorErrorActive,
	borderColor: token$1.colorErrorActive
}));
const genLinkStyle = (token$1) => Object.assign(Object.assign({}, genTextLinkButtonStyle(token$1, token$1.colorLink, "link", { color: token$1.colorLinkHover }, { color: token$1.colorLinkActive })), genGhostButtonStyle(token$1.componentCls, token$1.ghostBg, token$1.colorInfo, token$1.colorInfo, token$1.colorTextDisabled, token$1.colorBorder, {
	color: token$1.colorInfoHover,
	borderColor: token$1.colorInfoHover
}, {
	color: token$1.colorInfoActive,
	borderColor: token$1.colorInfoActive
}));
const genColorButtonStyle = (token$1) => {
	const { componentCls } = token$1;
	return Object.assign({
		[`${componentCls}-color-default`]: genDefaultButtonStyle(token$1),
		[`${componentCls}-color-primary`]: genPrimaryButtonStyle(token$1),
		[`${componentCls}-color-dangerous`]: genDangerousStyle(token$1),
		[`${componentCls}-color-link`]: genLinkStyle(token$1)
	}, genPresetColorStyle(token$1));
};
const genCompatibleButtonStyle = (token$1) => Object.assign(Object.assign(Object.assign(Object.assign({}, genOutlinedDashedButtonStyle(token$1, token$1.defaultBorderColor, token$1.defaultBg, {
	color: token$1.defaultHoverColor,
	borderColor: token$1.defaultHoverBorderColor,
	background: token$1.defaultHoverBg
}, {
	color: token$1.defaultActiveColor,
	borderColor: token$1.defaultActiveBorderColor,
	background: token$1.defaultActiveBg
})), genTextLinkButtonStyle(token$1, token$1.textTextColor, "text", {
	color: token$1.textTextHoverColor,
	background: token$1.textHoverBg
}, {
	color: token$1.textTextActiveColor,
	background: token$1.colorBgTextActive
})), genSolidButtonStyle(token$1, token$1.primaryColor, token$1.colorPrimary, {
	background: token$1.colorPrimaryHover,
	color: token$1.primaryColor
}, {
	background: token$1.colorPrimaryActive,
	color: token$1.primaryColor
})), genTextLinkButtonStyle(token$1, token$1.colorLink, "link", {
	color: token$1.colorLinkHover,
	background: token$1.linkHoverBg
}, { color: token$1.colorLinkActive }));
const genButtonStyle = (token$1, prefixCls = "") => {
	const { componentCls, controlHeight, fontSize, borderRadius, buttonPaddingHorizontal, iconCls, buttonPaddingVertical, buttonIconOnlyFontSize } = token$1;
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
		{ [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token$1) },
		{ [`${componentCls}${componentCls}-round${prefixCls}`]: genRoundButtonStyle(token$1) }
	];
};
const genSizeBaseButtonStyle = (token$1) => {
	const baseToken = merge(token$1, { fontSize: token$1.contentFontSize });
	return genButtonStyle(baseToken, token$1.componentCls);
};
const genSizeSmallButtonStyle = (token$1) => {
	const smallToken = merge(token$1, {
		controlHeight: token$1.controlHeightSM,
		fontSize: token$1.contentFontSizeSM,
		padding: token$1.paddingXS,
		buttonPaddingHorizontal: token$1.paddingInlineSM,
		buttonPaddingVertical: 0,
		borderRadius: token$1.borderRadiusSM,
		buttonIconOnlyFontSize: token$1.onlyIconSizeSM
	});
	return genButtonStyle(smallToken, `${token$1.componentCls}-sm`);
};
const genSizeLargeButtonStyle = (token$1) => {
	const largeToken = merge(token$1, {
		controlHeight: token$1.controlHeightLG,
		fontSize: token$1.contentFontSizeLG,
		buttonPaddingHorizontal: token$1.paddingInlineLG,
		buttonPaddingVertical: 0,
		borderRadius: token$1.borderRadiusLG,
		buttonIconOnlyFontSize: token$1.onlyIconSizeLG
	});
	return genButtonStyle(largeToken, `${token$1.componentCls}-lg`);
};
const genBlockButtonStyle = (token$1) => {
	const { componentCls } = token$1;
	return { [componentCls]: { [`&${componentCls}-block`]: { width: "100%" } } };
};
var style_default$6 = genStyleHooks("Button", (token$1) => {
	const buttonToken = prepareToken$1(token$1);
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
}, prepareComponentToken$5, { unitless: {
	fontWeight: true,
	contentLineHeight: true,
	contentLineHeightSM: true,
	contentLineHeightLG: true
} });
function compactItemBorder(token$1, parentCls, options, prefixCls) {
	const { focusElCls, focus, borderElCls } = options;
	const childCombinator = borderElCls ? "> *" : "";
	const hoverEffects = [
		"hover",
		focus ? "focus" : null,
		"active"
	].filter(Boolean).map((n) => `&:${n} ${childCombinator}`).join(",");
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginInlineEnd: token$1.calc(token$1.lineWidth).mul(-1).equal() },
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
function genCompactItemStyle(token$1, options = { focus: true }) {
	const { componentCls } = token$1;
	const compactCls = `${componentCls}-compact`;
	return { [compactCls]: Object.assign(Object.assign({}, compactItemBorder(token$1, compactCls, options, componentCls)), compactItemBorderRadius(componentCls, compactCls, options)) };
}
function compactItemVerticalBorder(token$1, parentCls, prefixCls) {
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginBottom: token$1.calc(token$1.lineWidth).mul(-1).equal() },
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
function genCompactItemVerticalStyle(token$1) {
	const compactCls = `${token$1.componentCls}-compact-vertical`;
	return { [compactCls]: Object.assign(Object.assign({}, compactItemVerticalBorder(token$1, compactCls, token$1.componentCls)), compactItemBorderVerticalRadius(token$1.componentCls, compactCls)) };
}
const genButtonCompactStyle = (token$1) => {
	const { componentCls, colorPrimaryHover, lineWidth, calc } = token$1;
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
var compact_default = genSubStyleComponent(["Button", "compact"], (token$1) => {
	const buttonToken = prepareToken$1(token$1);
	return [
		genCompactItemStyle(buttonToken),
		genCompactItemVerticalStyle(buttonToken),
		genButtonCompactStyle(buttonToken)
	];
}, prepareComponentToken$5);
var import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames());
init_omit();
init_ref();
init_useLayoutEffect();
var __rest$9 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
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
const ButtonTypeMap = {
	default: ["default", "outlined"],
	primary: ["primary", "solid"],
	dashed: ["default", "dashed"],
	link: ["link", "link"],
	text: ["default", "text"]
};
const InternalCompoundedButton = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
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
	const isDanger = mergedColor === "danger";
	const mergedColorText = isDanger ? "dangerous" : mergedColor;
	const { getPrefixCls, direction, autoInsertSpace: contextAutoInsertSpace, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("button");
	const mergedInsertSpace = (_a = autoInsertSpace !== null && autoInsertSpace !== void 0 ? autoInsertSpace : contextAutoInsertSpace) !== null && _a !== void 0 ? _a : true;
	const prefixCls = getPrefixCls("btn", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
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
	const classes = (0, import_classnames$13.default)(prefixCls, hashId, cssVarCls, {
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
	const iconClasses = (0, import_classnames$13.default)(customClassNames === null || customClassNames === void 0 ? void 0 : customClassNames.icon, contextClassNames.icon);
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
		className: (0, import_classnames$13.default)(classes, { [`${prefixCls}-disabled`]: mergedDisabled }),
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
const Button = InternalCompoundedButton;
Button.Group = button_group_default;
Button.__ANT_BUTTON = true;
var button_default$1 = Button;
var button_default = button_default$1;
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
const ContextIsolator = (props) => {
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
init_es$2();
const genGridRowStyle = (token$1) => {
	const { componentCls } = token$1;
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
const genGridColStyle = (token$1) => {
	const { componentCls } = token$1;
	return { [componentCls]: {
		position: "relative",
		maxWidth: "100%",
		minHeight: 1
	} };
};
const genLoopGridColumnsStyle = (token$1, sizeCls) => {
	const { prefixCls, componentCls, gridColumns } = token$1;
	const gridColumnsStyle = {};
	for (let i$2 = gridColumns; i$2 >= 0; i$2--) if (i$2 === 0) {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i$2}`] = { display: "none" };
		gridColumnsStyle[`${componentCls}-push-${i$2}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}-pull-${i$2}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i$2}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i$2}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i$2}`] = { marginInlineStart: 0 };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i$2}`] = { order: 0 };
	} else {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i$2}`] = [{
			["--ant-display"]: "block",
			display: "block"
		}, {
			display: "var(--ant-display)",
			flex: `0 0 ${i$2 / gridColumns * 100}%`,
			maxWidth: `${i$2 / gridColumns * 100}%`
		}];
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i$2}`] = { insetInlineStart: `${i$2 / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i$2}`] = { insetInlineEnd: `${i$2 / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i$2}`] = { marginInlineStart: `${i$2 / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i$2}`] = { order: i$2 };
	}
	gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = { flex: `var(--${prefixCls}${sizeCls}-flex)` };
	return gridColumnsStyle;
};
const genGridStyle = (token$1, sizeCls) => genLoopGridColumnsStyle(token$1, sizeCls);
const genGridMediaStyle = (token$1, screenSize, sizeCls) => ({ [`@media (min-width: ${unit(screenSize)})`]: Object.assign({}, genGridStyle(token$1, sizeCls)) });
const prepareRowComponentToken = () => ({});
const prepareColComponentToken = () => ({});
const useRowStyle = genStyleHooks("Grid", genGridRowStyle, prepareRowComponentToken);
const getMediaSize = (token$1) => {
	const mediaSizesMap = {
		xs: token$1.screenXSMin,
		sm: token$1.screenSMMin,
		md: token$1.screenMDMin,
		lg: token$1.screenLGMin,
		xl: token$1.screenXLMin,
		xxl: token$1.screenXXLMin
	};
	return mediaSizesMap;
};
const useColStyle = genStyleHooks("Grid", (token$1) => {
	const gridToken = merge(token$1, { gridColumns: 24 });
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
function box(position$1) {
	return {
		position: position$1,
		inset: 0
	};
}
const genModalMaskStyle = (token$1) => {
	const { componentCls, antCls } = token$1;
	return [{ [`${componentCls}-root`]: {
		[`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
			transform: "none",
			opacity: 0,
			animationDuration: token$1.motionDurationSlow,
			userSelect: "none"
		},
		[`${componentCls}${antCls}-zoom-leave ${componentCls}-content`]: { pointerEvents: "none" },
		[`${componentCls}-mask`]: Object.assign(Object.assign({}, box("fixed")), {
			zIndex: token$1.zIndexPopupBase,
			height: "100%",
			backgroundColor: token$1.colorBgMask,
			pointerEvents: "none",
			[`${componentCls}-hidden`]: { display: "none" }
		}),
		[`${componentCls}-wrap`]: Object.assign(Object.assign({}, box("fixed")), {
			zIndex: token$1.zIndexPopupBase,
			overflow: "auto",
			outline: 0,
			WebkitOverflowScrolling: "touch"
		})
	} }, { [`${componentCls}-root`]: initFadeMotion(token$1) }];
};
const genModalStyle = (token$1) => {
	const { componentCls } = token$1;
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
			[`@media (max-width: ${token$1.screenSMMax}px)`]: {
				[componentCls]: {
					maxWidth: "calc(100vw - 16px)",
					margin: `${unit(token$1.marginXS)} auto`
				},
				[`${componentCls}-centered`]: { [componentCls]: { flex: 1 } }
			}
		} },
		{ [componentCls]: Object.assign(Object.assign({}, resetComponent(token$1)), {
			pointerEvents: "none",
			position: "relative",
			top: 100,
			width: "auto",
			maxWidth: `calc(100vw - ${unit(token$1.calc(token$1.margin).mul(2).equal())})`,
			margin: "0 auto",
			paddingBottom: token$1.paddingLG,
			[`${componentCls}-title`]: {
				margin: 0,
				color: token$1.titleColor,
				fontWeight: token$1.fontWeightStrong,
				fontSize: token$1.titleFontSize,
				lineHeight: token$1.titleLineHeight,
				wordWrap: "break-word"
			},
			[`${componentCls}-content`]: {
				position: "relative",
				backgroundColor: token$1.contentBg,
				backgroundClip: "padding-box",
				border: 0,
				borderRadius: token$1.borderRadiusLG,
				boxShadow: token$1.boxShadow,
				pointerEvents: "auto",
				padding: token$1.contentPadding
			},
			[`${componentCls}-close`]: Object.assign({
				position: "absolute",
				top: token$1.calc(token$1.modalHeaderHeight).sub(token$1.modalCloseBtnSize).div(2).equal(),
				insetInlineEnd: token$1.calc(token$1.modalHeaderHeight).sub(token$1.modalCloseBtnSize).div(2).equal(),
				zIndex: token$1.calc(token$1.zIndexPopupBase).add(10).equal(),
				padding: 0,
				color: token$1.modalCloseIconColor,
				fontWeight: token$1.fontWeightStrong,
				lineHeight: 1,
				textDecoration: "none",
				background: "transparent",
				borderRadius: token$1.borderRadiusSM,
				width: token$1.modalCloseBtnSize,
				height: token$1.modalCloseBtnSize,
				border: 0,
				outline: 0,
				cursor: "pointer",
				transition: `color ${token$1.motionDurationMid}, background-color ${token$1.motionDurationMid}`,
				"&-x": {
					display: "flex",
					fontSize: token$1.fontSizeLG,
					fontStyle: "normal",
					lineHeight: unit(token$1.modalCloseBtnSize),
					justifyContent: "center",
					textTransform: "none",
					textRendering: "auto"
				},
				"&:disabled": { pointerEvents: "none" },
				"&:hover": {
					color: token$1.modalCloseIconHoverColor,
					backgroundColor: token$1.colorBgTextHover,
					textDecoration: "none"
				},
				"&:active": { backgroundColor: token$1.colorBgTextActive }
			}, genFocusStyle(token$1)),
			[`${componentCls}-header`]: {
				color: token$1.colorText,
				background: token$1.headerBg,
				borderRadius: `${unit(token$1.borderRadiusLG)} ${unit(token$1.borderRadiusLG)} 0 0`,
				marginBottom: token$1.headerMarginBottom,
				padding: token$1.headerPadding,
				borderBottom: token$1.headerBorderBottom
			},
			[`${componentCls}-body`]: {
				fontSize: token$1.fontSize,
				lineHeight: token$1.lineHeight,
				wordWrap: "break-word",
				padding: token$1.bodyPadding,
				[`${componentCls}-body-skeleton`]: {
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: `${unit(token$1.margin)} auto`
				}
			},
			[`${componentCls}-footer`]: {
				textAlign: "end",
				background: token$1.footerBg,
				marginTop: token$1.footerMarginTop,
				padding: token$1.footerPadding,
				borderTop: token$1.footerBorderTop,
				borderRadius: token$1.footerBorderRadius,
				[`> ${token$1.antCls}-btn + ${token$1.antCls}-btn`]: { marginInlineStart: token$1.marginXS }
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
const genRTLStyle = (token$1) => {
	const { componentCls } = token$1;
	return { [`${componentCls}-root`]: { [`${componentCls}-wrap-rtl`]: {
		direction: "rtl",
		[`${componentCls}-confirm-body`]: { direction: "rtl" }
	} } };
};
const genResponsiveWidthStyle = (token$1) => {
	const { componentCls } = token$1;
	const oriGridMediaSizesMap = getMediaSize(token$1);
	const gridMediaSizesMap = Object.assign({}, oriGridMediaSizesMap);
	delete gridMediaSizesMap.xs;
	const cssVarPrefix = `--${componentCls.replace(".", "")}-`;
	const responsiveStyles = Object.keys(gridMediaSizesMap).map((key) => ({ [`@media (min-width: ${unit(gridMediaSizesMap[key])})`]: { width: `var(${cssVarPrefix}${key}-width)` } }));
	return { [`${componentCls}-root`]: { [componentCls]: [].concat(_toConsumableArray(Object.keys(oriGridMediaSizesMap).map((currentKey, index) => {
		const previousKey = Object.keys(oriGridMediaSizesMap)[index - 1];
		return previousKey ? { [`${cssVarPrefix}${currentKey}-width`]: `var(${cssVarPrefix}${previousKey}-width)` } : null;
	})), [{ width: `var(${cssVarPrefix}xs-width)` }], _toConsumableArray(responsiveStyles)) } };
};
const prepareToken = (token$1) => {
	const headerPaddingVertical = token$1.padding;
	const headerFontSize = token$1.fontSizeHeading5;
	const headerLineHeight = token$1.lineHeightHeading5;
	const modalToken = merge(token$1, {
		modalHeaderHeight: token$1.calc(token$1.calc(headerLineHeight).mul(headerFontSize).equal()).add(token$1.calc(headerPaddingVertical).mul(2).equal()).equal(),
		modalFooterBorderColorSplit: token$1.colorSplit,
		modalFooterBorderStyle: token$1.lineType,
		modalFooterBorderWidth: token$1.lineWidth,
		modalCloseIconColor: token$1.colorIcon,
		modalCloseIconHoverColor: token$1.colorIconHover,
		modalCloseBtnSize: token$1.controlHeight,
		modalConfirmIconSize: token$1.fontHeight,
		modalTitleHeight: token$1.calc(token$1.titleFontSize).mul(token$1.titleLineHeight).equal()
	});
	return modalToken;
};
const prepareComponentToken$4 = (token$1) => ({
	footerBg: "transparent",
	headerBg: token$1.colorBgElevated,
	titleLineHeight: token$1.lineHeightHeading5,
	titleFontSize: token$1.fontSizeHeading5,
	contentBg: token$1.colorBgElevated,
	titleColor: token$1.colorTextHeading,
	contentPadding: token$1.wireframe ? 0 : `${unit(token$1.paddingMD)} ${unit(token$1.paddingContentHorizontalLG)}`,
	headerPadding: token$1.wireframe ? `${unit(token$1.padding)} ${unit(token$1.paddingLG)}` : 0,
	headerBorderBottom: token$1.wireframe ? `${unit(token$1.lineWidth)} ${token$1.lineType} ${token$1.colorSplit}` : "none",
	headerMarginBottom: token$1.wireframe ? 0 : token$1.marginXS,
	bodyPadding: token$1.wireframe ? token$1.paddingLG : 0,
	footerPadding: token$1.wireframe ? `${unit(token$1.paddingXS)} ${unit(token$1.padding)}` : 0,
	footerBorderTop: token$1.wireframe ? `${unit(token$1.lineWidth)} ${token$1.lineType} ${token$1.colorSplit}` : "none",
	footerBorderRadius: token$1.wireframe ? `0 0 ${unit(token$1.borderRadiusLG)} ${unit(token$1.borderRadiusLG)}` : 0,
	footerMarginTop: token$1.wireframe ? 0 : token$1.marginSM,
	confirmBodyPadding: token$1.wireframe ? `${unit(token$1.padding * 2)} ${unit(token$1.padding * 2)} ${unit(token$1.paddingLG)}` : 0,
	confirmIconMarginInlineEnd: token$1.wireframe ? token$1.margin : token$1.marginSM,
	confirmBtnsMarginTop: token$1.wireframe ? token$1.marginLG : token$1.marginSM
});
var style_default$5 = genStyleHooks("Modal", (token$1) => {
	const modalToken = prepareToken(token$1);
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
const genPurePanel = (Component$1, alignPropName, postProps, defaultPrefixCls$1, getDropdownCls) => {
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
function getArrowToken(token$1) {
	const { sizePopupArrow, borderRadiusXS, borderRadiusOuter } = token$1;
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
	const arrowPath = `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`;
	return {
		arrowShadowWidth: shadowWidth,
		arrowPath,
		arrowPolygon
	};
}
const genRoundedArrow = (token$1, bgColor, boxShadow) => {
	const { sizePopupArrow, arrowPolygon, arrowPath, arrowShadowWidth, borderRadiusXS, calc } = token$1;
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
const MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffsetToken(options) {
	const { contentRadius, limitVerticalRadius } = options;
	const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
	const arrowOffsetVertical = limitVerticalRadius ? MAX_VERTICAL_CONTENT_RADIUS : arrowOffset;
	return {
		arrowOffsetHorizontal: arrowOffset,
		arrowOffsetVertical
	};
}
function isInject(valid, code) {
	if (!valid) return {};
	return code;
}
function getArrowStyle(token$1, colorBg, options) {
	const { componentCls, boxShadowPopoverArrow, arrowOffsetVertical, arrowOffsetHorizontal } = token$1;
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
	}, genRoundedArrow(token$1, colorBg, boxShadowPopoverArrow)), { "&:before": { background: colorBg } })] }, isInject(!!arrowPlacement.top, {
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
const PlacementAlignMap = {
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
const ArrowCenterPlacementAlignMap = {
	topLeft: { points: ["bl", "tc"] },
	leftTop: { points: ["tr", "cl"] },
	topRight: { points: ["br", "tc"] },
	rightTop: { points: ["tl", "cr"] },
	bottomRight: { points: ["tr", "bc"] },
	rightBottom: { points: ["bl", "cr"] },
	bottomLeft: { points: ["tl", "bc"] },
	leftBottom: { points: ["br", "cl"] }
};
const DisableAutoArrowList = new Set([
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
const genTooltipStyle = (token$1) => {
	const { calc, componentCls, tooltipMaxWidth, tooltipColor, tooltipBg, tooltipBorderRadius, zIndexPopup, controlHeight, boxShadowSecondary, paddingSM, paddingXS, arrowOffsetHorizontal, sizePopupArrow } = token$1;
	const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
	const centerAlignMinWidth = calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal();
	return [
		{ [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token$1)), {
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
				padding: `${unit(token$1.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
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
			].join(",")]: { [`${componentCls}-inner`]: { borderRadius: token$1.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS) } },
			[`${componentCls}-content`]: { position: "relative" }
		}), genPresetColor(token$1, (colorKey, { darkColor }) => ({ [`&${componentCls}-${colorKey}`]: {
			[`${componentCls}-inner`]: { backgroundColor: darkColor },
			[`${componentCls}-arrow`]: { "--antd-arrow-background-color": darkColor }
		} }))), { "&-rtl": { direction: "rtl" } }) },
		getArrowStyle(token$1, "var(--antd-arrow-background-color)"),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token$1.sizePopupArrow
		} }
	];
};
const prepareComponentToken$3 = (token$1) => Object.assign(Object.assign({ zIndexPopup: token$1.zIndexPopupBase + 70 }, getArrowOffsetToken({
	contentRadius: token$1.borderRadius,
	limitVerticalRadius: true
})), getArrowToken(merge(token$1, { borderRadiusOuter: Math.min(token$1.borderRadiusOuter, 4) })));
var style_default$4 = (prefixCls, injectStyle = true) => {
	const useStyle$1 = genStyleHooks("Tooltip", (token$1) => {
		const { borderRadius, colorTextLightSolid, colorBgSpotlight } = token$1;
		const TooltipToken = merge(token$1, {
			tooltipMaxWidth: 250,
			tooltipColor: colorTextLightSolid,
			tooltipBorderRadius: borderRadius,
			tooltipBg: colorBgSpotlight
		});
		return [genTooltipStyle(TooltipToken), initZoomMotion(token$1, "zoom-big-fast")];
	}, prepareComponentToken$3, {
		resetStyle: false,
		injectStyle
	});
	return useStyle$1(prefixCls);
};
init_toConsumableArray();
const inverseColors = PresetColors.map((color$1) => `${color$1}-inverse`);
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
	const luminance = (.299 * rgb.r + .587 * rgb.g + .114 * rgb.b) / 255;
	const textColor = luminance < .5 ? "#FFF" : "#000";
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
const PurePanel$1 = (props) => {
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
var __rest$8 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const InternalTooltip = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
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
	const [, token$1] = useToken();
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
			arrowWidth: mergedShowArrow ? token$1.sizePopupArrow : 0,
			borderRadius: token$1.borderRadius,
			offset: token$1.marginXXS,
			visibleFirst: true
		});
	}, [
		arrowPointAtCenter,
		arrow,
		builtinPlacements,
		token$1
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
const Tooltip = InternalTooltip;
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default$1;
var tooltip_default = Tooltip;
const isPrimitive = (value) => typeof value !== "object" && typeof value !== "function" || value === null;
var isPrimitive_default = isPrimitive;
require_classnames();
const SiderContext = /* @__PURE__ */ import_react.createContext({});
(() => {
	let i$2 = 0;
	return (prefix$1 = "") => {
		i$2 += 1;
		return `${prefix$1}${i$2}`;
	};
})();
const MenuContext = /* @__PURE__ */ (0, import_react.createContext)({
	prefixCls: "",
	firstLevel: true,
	inlineCollapsed: false
});
var MenuContext_default = MenuContext;
var import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
var __rest$6 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const MenuDivider = (props) => {
	const { prefixCls: customizePrefixCls, className, dashed } = props, restProps = __rest$6(props, [
		"prefixCls",
		"className",
		"dashed"
	]);
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("menu", customizePrefixCls);
	const classString = (0, import_classnames$8.default)({ [`${prefixCls}-item-divider-dashed`]: !!dashed }, className);
	return /* @__PURE__ */ import_react.createElement(Divider, Object.assign({ className: classString }, restProps));
};
var MenuDivider_default = MenuDivider;
var import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
init_toArray();
init_omit();
const MenuItem = (props) => {
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
	const childrenLength = toArray(children).length;
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
var __rest$5 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const OverrideContext = /* @__PURE__ */ import_react.createContext(null);
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
const getHorizontalStyle = (token$1) => {
	const { componentCls, motionDurationSlow, horizontalLineHeight, colorSplit, lineWidth, lineType, itemPaddingInline } = token$1;
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
const getRTLStyle = ({ componentCls, menuArrowOffset, calc }) => ({
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
const accessibilityFocus = (token$1) => genFocusOutline(token$1);
const getThemeStyle = (token$1, themeSuffix) => {
	const { componentCls, itemColor, itemSelectedColor, subMenuItemSelectedColor, groupTitleColor, itemBg, subMenuItemBg, itemSelectedBg, activeBarHeight, activeBarWidth, activeBarBorderWidth, motionDurationSlow, motionEaseInOut, motionEaseOut, itemPaddingInline, motionDurationMid, itemHoverColor, lineType, colorSplit, itemDisabledColor, dangerItemColor, dangerItemHoverColor, dangerItemSelectedColor, dangerItemActiveBg, dangerItemSelectedBg, popupBg, itemHoverBg, itemActiveBg, menuSubMenuBg, horizontalItemSelectedColor, horizontalItemSelectedBg, horizontalItemBorderRadius, horizontalItemHoverBg } = token$1;
	return { [`${componentCls}-${themeSuffix}, ${componentCls}-${themeSuffix} > ${componentCls}`]: {
		color: itemColor,
		background: itemBg,
		[`&${componentCls}-root:focus-visible`]: Object.assign({}, accessibilityFocus(token$1)),
		[`${componentCls}-item`]: { "&-group-title, &-extra": { color: groupTitleColor } },
		[`${componentCls}-submenu-selected > ${componentCls}-submenu-title`]: { color: subMenuItemSelectedColor },
		[`${componentCls}-item, ${componentCls}-submenu-title`]: {
			color: itemColor,
			[`&:not(${componentCls}-item-disabled):focus-visible`]: Object.assign({}, accessibilityFocus(token$1))
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
			marginTop: token$1.calc(activeBarBorderWidth).mul(-1).equal(),
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
const getVerticalInlineStyle = (token$1) => {
	const { componentCls, itemHeight, itemMarginInline, padding, menuArrowSize, marginXS, itemMarginBlock, itemWidth, itemPaddingInline } = token$1;
	const paddingWithArrow = token$1.calc(menuArrowSize).add(padding).add(marginXS).equal();
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
const getVerticalStyle = (token$1) => {
	const { componentCls, iconCls, itemHeight, colorTextLightSolid, dropdownWidth, controlHeightLG, motionEaseOut, paddingXL, itemMarginInline, fontSizeLG, motionDurationFast, motionDurationSlow, paddingXS, boxShadowSecondary, collapsedWidth, collapsedIconSize } = token$1;
	const inlineItemStyle = {
		height: itemHeight,
		lineHeight: unit(itemHeight),
		listStylePosition: "inside",
		listStyleType: "disc"
	};
	return [
		{
			[componentCls]: { "&-inline, &-vertical": Object.assign({ [`&${componentCls}-root`]: { boxShadow: "none" } }, getVerticalInlineStyle(token$1)) },
			[`${componentCls}-submenu-popup`]: { [`${componentCls}-vertical`]: Object.assign(Object.assign({}, getVerticalInlineStyle(token$1)), { boxShadow: boxShadowSecondary }) }
		},
		{ [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
			minWidth: dropdownWidth,
			maxHeight: `calc(100vh - ${unit(token$1.calc(controlHeightLG).mul(2.5).equal())})`,
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
				paddingInline: `calc(50% - ${unit(token$1.calc(collapsedIconSize).div(2).equal())} - ${unit(itemMarginInline)})`,
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
const genMenuItemStyle = (token$1) => {
	const { componentCls, motionDurationSlow, motionDurationMid, motionEaseInOut, motionEaseOut, iconCls, iconSize, iconMarginInlineEnd } = token$1;
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
const genSubMenuArrowStyle = (token$1) => {
	const { componentCls, motionDurationSlow, motionEaseInOut, borderRadius, menuArrowSize, menuArrowOffset } = token$1;
	return { [`${componentCls}-submenu`]: {
		"&-expand-icon, &-arrow": {
			position: "absolute",
			top: "50%",
			insetInlineEnd: token$1.margin,
			width: menuArrowSize,
			color: "currentcolor",
			transform: "translateY(-50%)",
			transition: `transform ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow}`
		},
		"&-arrow": {
			"&::before, &::after": {
				position: "absolute",
				width: token$1.calc(menuArrowSize).mul(.6).equal(),
				height: token$1.calc(menuArrowSize).mul(.15).equal(),
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
			"&::before": { transform: `rotate(45deg) translateY(${unit(token$1.calc(menuArrowOffset).mul(-1).equal())})` },
			"&::after": { transform: `rotate(-45deg) translateY(${unit(menuArrowOffset)})` }
		}
	} };
};
const getBaseStyle = (token$1) => {
	const { antCls, componentCls, fontSize, motionDurationSlow, motionDurationMid, motionEaseInOut, paddingXS, padding, colorSplit, lineWidth, zIndexPopup, borderRadiusLG, subMenuItemBorderRadius, menuArrowSize, menuArrowOffset, lineType, groupTitleLineHeight, groupTitleFontSize } = token$1;
	return [
		{
			"": { [componentCls]: Object.assign(Object.assign({}, clearFix()), { "&-hidden": { display: "none" } }) },
			[`${componentCls}-submenu-hidden`]: { display: "none" }
		},
		{ [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token$1)), clearFix()), {
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
			[`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: { borderRadius: token$1.itemBorderRadius },
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
					paddingInlineStart: token$1.padding
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
		}), genMenuItemStyle(token$1)), {
			[`${componentCls}-item-group`]: { [`${componentCls}-item-group-list`]: {
				margin: 0,
				padding: 0,
				[`${componentCls}-item, ${componentCls}-submenu-title`]: { paddingInline: `${unit(token$1.calc(fontSize).mul(2).equal())} ${unit(padding)}` }
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
					[`> ${componentCls}`]: Object.assign(Object.assign(Object.assign({ borderRadius: borderRadiusLG }, genMenuItemStyle(token$1)), genSubMenuArrowStyle(token$1)), {
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
          `]: { paddingInlineEnd: token$1.paddingXS },
				[`
          &-placement-rightTop,
          &-placement-rightBottom
          `]: { paddingInlineStart: token$1.paddingXS },
				[`
          &-placement-topRight,
          &-placement-topLeft
          `]: { paddingBottom: token$1.paddingXS },
				[`
          &-placement-bottomRight,
          &-placement-bottomLeft
          `]: { paddingTop: token$1.paddingXS }
			}
		}), genSubMenuArrowStyle(token$1)), {
			[`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
				"&::before": { transform: `rotate(-45deg) translateX(${unit(menuArrowOffset)})` },
				"&::after": { transform: `rotate(45deg) translateX(${unit(token$1.calc(menuArrowOffset).mul(-1).equal())})` }
			},
			[`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
				transform: `translateY(${unit(token$1.calc(menuArrowSize).mul(.2).mul(-1).equal())})`,
				"&::after": { transform: `rotate(-45deg) translateX(${unit(token$1.calc(menuArrowOffset).mul(-1).equal())})` },
				"&::before": { transform: `rotate(45deg) translateX(${unit(menuArrowOffset)})` }
			}
		}) },
		{ [`${antCls}-layout-header`]: { [componentCls]: { lineHeight: "inherit" } } }
	];
};
const prepareComponentToken$2 = (token$1) => {
	var _a, _b, _c;
	const { colorPrimary, colorError, colorTextDisabled, colorErrorBg, colorText, colorTextDescription, colorBgContainer, colorFillAlter, colorFillContent, lineWidth, lineWidthBold, controlItemBgActive, colorBgTextHover, controlHeightLG, lineHeight, colorBgElevated, marginXXS, padding, fontSize, controlHeightSM, fontSizeLG, colorTextLightSolid, colorErrorHover } = token$1;
	const activeBarWidth = (_a = token$1.activeBarWidth) !== null && _a !== void 0 ? _a : 0;
	const activeBarBorderWidth = (_b = token$1.activeBarBorderWidth) !== null && _b !== void 0 ? _b : lineWidth;
	const itemMarginInline = (_c = token$1.itemMarginInline) !== null && _c !== void 0 ? _c : token$1.marginXXS;
	const colorTextDark = new FastColor(colorTextLightSolid).setA(.65).toRgbString();
	return {
		dropdownWidth: 160,
		zIndexPopup: token$1.zIndexPopupBase + 50,
		radiusItem: token$1.borderRadiusLG,
		itemBorderRadius: token$1.borderRadiusLG,
		radiusSubMenuItem: token$1.borderRadiusSM,
		subMenuItemBorderRadius: token$1.borderRadiusSM,
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
	const useStyle$1 = genStyleHooks("Menu", (token$1) => {
		const { colorBgElevated, controlHeightLG, fontSize, darkItemColor, darkDangerItemColor, darkItemBg, darkSubMenuItemBg, darkItemSelectedColor, darkItemSelectedBg, darkDangerItemSelectedBg, darkItemHoverBg, darkGroupTitleColor, darkItemHoverColor, darkItemDisabledColor, darkDangerItemHoverColor, darkDangerItemSelectedColor, darkDangerItemActiveBg, popupBg, darkPopupBg } = token$1;
		const menuArrowSize = token$1.calc(fontSize).div(7).mul(5).equal();
		const menuToken = merge(token$1, {
			menuArrowSize,
			menuHorizontalHeight: token$1.calc(controlHeightLG).mul(1.15).equal(),
			menuArrowOffset: token$1.calc(menuArrowSize).mul(.25).equal(),
			menuSubMenuBg: colorBgElevated,
			calc: token$1.calc,
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
	});
	return useStyle$1(prefixCls, rootCls);
};
var import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
init_omit();
const SubMenu = (props) => {
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
var __rest$4 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
function isEmptyIcon(icon) {
	return icon === null || icon === false;
}
const MENU_COMPONENTS = {
	item: MenuItem_default,
	submenu: SubMenu_default,
	divider: MenuDivider_default
};
const InternalMenu = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var _a;
	const override = import_react.useContext(OverrideContext_default);
	const overrideObj = override || {};
	const { getPrefixCls, getPopupContainer, direction, menu } = import_react.useContext(ConfigContext);
	const rootPrefixCls = getPrefixCls();
	const { prefixCls: customizePrefixCls, className, style, theme = "light", expandIcon, _internalDisableMenuItemTitleTooltip, inlineCollapsed, siderCollapsed, rootClassName, mode, selectable, onClick, overflowedIndicatorPopupClassName } = props, restProps = __rest$4(props, [
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
	]);
	const passedProps = omit(restProps, ["collapsedWidth"]);
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
var menu_default$1 = InternalMenu;
init_es$9();
const Menu = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
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
const genStatusStyle = (token$1) => {
	const { componentCls, menuCls, colorError, colorTextLightSolid } = token$1;
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
const genBaseStyle = (token$1) => {
	const { componentCls, menuCls, zIndexPopup, dropdownArrowDistance, sizePopupArrow, antCls, iconCls, motionDurationMid, paddingBlock, fontSize, dropdownEdgeChildPadding, colorTextDisabled, fontSizeIcon, controlPaddingHorizontal, colorBgElevated } = token$1;
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
				insetBlock: token$1.calc(sizePopupArrow).div(2).sub(dropdownArrowDistance).equal(),
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
		getArrowStyle(token$1, colorBgElevated, { arrowPlacement: {
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
			[`${componentCls}, ${componentCls}-menu-submenu`]: Object.assign(Object.assign({}, resetComponent(token$1)), { [menuCls]: Object.assign(Object.assign({
				padding: dropdownEdgeChildPadding,
				listStyleType: "none",
				backgroundColor: colorBgElevated,
				backgroundClip: "padding-box",
				borderRadius: token$1.borderRadiusLG,
				outline: "none",
				boxShadow: token$1.boxShadowSecondary
			}, genFocusStyle(token$1)), {
				"&:empty": {
					padding: 0,
					boxShadow: "none"
				},
				[`${menuCls}-item-group-title`]: {
					padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
					color: token$1.colorTextDescription,
					transition: `all ${motionDurationMid}`
				},
				[`${menuCls}-item`]: {
					position: "relative",
					display: "flex",
					alignItems: "center"
				},
				[`${menuCls}-item-icon`]: {
					minWidth: fontSize,
					marginInlineEnd: token$1.marginXS,
					fontSize: token$1.fontSizeSM
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
						paddingInlineStart: token$1.padding,
						marginInlineStart: "auto",
						fontSize: token$1.fontSizeSM,
						color: token$1.colorTextDescription
					}
				},
				[`${menuCls}-item, ${menuCls}-submenu-title`]: Object.assign(Object.assign({
					display: "flex",
					margin: 0,
					padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
					color: token$1.colorText,
					fontWeight: "normal",
					fontSize,
					lineHeight: token$1.lineHeight,
					cursor: "pointer",
					transition: `all ${motionDurationMid}`,
					borderRadius: token$1.borderRadiusSM,
					"&:hover, &-active": { backgroundColor: token$1.controlItemBgHover }
				}, genFocusStyle(token$1)), {
					"&-selected": {
						color: token$1.colorPrimary,
						backgroundColor: token$1.controlItemBgActive,
						"&:hover, &-active": { backgroundColor: token$1.controlItemBgActiveHover }
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
						margin: `${unit(token$1.marginXXS)} 0`,
						overflow: "hidden",
						lineHeight: 0,
						backgroundColor: token$1.colorSplit
					},
					[`${componentCls}-menu-submenu-expand-icon`]: {
						position: "absolute",
						insetInlineEnd: token$1.paddingXS,
						[`${componentCls}-menu-submenu-arrow-icon`]: {
							marginInlineEnd: "0 !important",
							color: token$1.colorIcon,
							fontSize: fontSizeIcon,
							fontStyle: "normal"
						}
					}
				}),
				[`${menuCls}-item-group-list`]: {
					margin: `0 ${unit(token$1.marginXS)}`,
					padding: 0,
					listStyle: "none"
				},
				[`${menuCls}-submenu-title`]: { paddingInlineEnd: token$1.calc(controlPaddingHorizontal).add(token$1.fontSizeSM).equal() },
				[`${menuCls}-submenu-vertical`]: { position: "relative" },
				[`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: { [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
					color: colorTextDisabled,
					backgroundColor: colorBgElevated,
					cursor: "not-allowed"
				} },
				[`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: { color: token$1.colorPrimary }
			}) })
		},
		[
			initSlideMotion(token$1, "slide-up"),
			initSlideMotion(token$1, "slide-down"),
			initMoveMotion(token$1, "move-up"),
			initMoveMotion(token$1, "move-down"),
			initZoomMotion(token$1, "zoom-big")
		]
	];
};
const prepareComponentToken$1 = (token$1) => Object.assign(Object.assign({
	zIndexPopup: token$1.zIndexPopupBase + 50,
	paddingBlock: (token$1.controlHeight - token$1.fontSize * token$1.lineHeight) / 2
}, getArrowOffsetToken({
	contentRadius: token$1.borderRadiusLG,
	limitVerticalRadius: true
})), getArrowToken(token$1));
var style_default$2 = genStyleHooks("Dropdown", (token$1) => {
	const { marginXXS, sizePopupArrow, paddingXXS, componentCls } = token$1;
	const dropdownToken = merge(token$1, {
		menuCls: `${componentCls}-menu`,
		dropdownArrowDistance: token$1.calc(sizePopupArrow).div(2).add(marginXXS).equal(),
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
const Dropdown$1 = (props) => {
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
	const [, token$1] = useToken();
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
		offset: token$1.marginXXS,
		arrowWidth: arrow ? token$1.sizePopupArrow : 0,
		borderRadius: token$1.borderRadius
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
const PurePanel = PurePanel_default(Dropdown$1, "align", void 0, "dropdown", (prefixCls) => prefixCls);
/* istanbul ignore next */
const WrapPurePanel = (props) => /* @__PURE__ */ import_react.createElement(PurePanel, Object.assign({}, props), /* @__PURE__ */ import_react.createElement("span", null));
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
const Item = ({ className, index, children, split, style }) => {
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
var __rest$3 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const InternalSpace = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
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
	const childNodes = toArray(children, { keepEmpty: true });
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
	const nodes = childNodes.map((child, i$2) => {
		var _a$1;
		if (child !== null && child !== void 0) latestIndex = i$2;
		const key = (child === null || child === void 0 ? void 0 : child.key) || `${itemClassName}-${i$2}`;
		return /* @__PURE__ */ import_react.createElement(Item_default, {
			className: itemClassName,
			key,
			index: i$2,
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
const Space = InternalSpace;
Space.Compact = Compact_default;
var space_default = Space;
init_EllipsisOutlined();
var import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
var __rest$2 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const DropdownButton = (props) => {
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
	const mergedPopupRender = popupRender || dropdownRender;
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
		popupRender: mergedPopupRender
	};
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const classes = (0, import_classnames$2.default)(buttonPrefixCls, compactItemClassnames, className);
	if ("destroyPopupOnHide" in props) dropdownProps.destroyPopupOnHide = destroyPopupOnHide;
	if ("overlay" in props) dropdownProps.overlay = overlay;
	if ("open" in props) dropdownProps.open = open;
	if ("placement" in props) dropdownProps.placement = placement;
	else dropdownProps.placement = direction === "rtl" ? "bottomLeft" : "bottomRight";
	const leftButton = /* @__PURE__ */ import_react.createElement(button_default, {
		type,
		danger,
		disabled,
		loading,
		onClick,
		htmlType,
		href,
		title
	}, children);
	const rightButton = /* @__PURE__ */ import_react.createElement(button_default, {
		type,
		danger,
		icon
	});
	const [leftButtonToRender, rightButtonToRender] = buttonsRender([leftButton, rightButton]);
	return /* @__PURE__ */ import_react.createElement(space_default.Compact, Object.assign({
		className: classes,
		size: compactSize,
		block: true
	}, restProps), leftButtonToRender, /* @__PURE__ */ import_react.createElement(dropdown_default$1, Object.assign({}, dropdownProps), rightButtonToRender));
};
DropdownButton.__ANT_BUTTON = true;
var dropdown_button_default = DropdownButton;
const Dropdown = dropdown_default$1;
Dropdown.Button = dropdown_button_default;
var dropdown_default = Dropdown;
init_es$2();
init_es();
const genBoxStyle = (position$1) => ({
	position: position$1 || "absolute",
	inset: 0
});
const genImageMaskStyle = (token$1) => {
	const { iconCls, motionDurationSlow, paddingXXS, marginXXS, prefixCls, colorTextLightSolid } = token$1;
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
const genPreviewOperationsStyle = (token$1) => {
	const { previewCls, modalMaskBg, paddingSM, marginXL, margin, paddingLG, previewOperationColorDisabled, previewOperationHoverColor, motionDurationSlow, iconCls, colorTextLightSolid } = token$1;
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
			color: token$1.previewOperationColor,
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
			[`& > ${iconCls}`]: { fontSize: token$1.previewOperationSize }
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
				[`& > ${iconCls}`]: { fontSize: token$1.previewOperationSize }
			}
		}
	};
};
const genPreviewSwitchStyle = (token$1) => {
	const { modalMaskBg, iconCls, previewOperationColorDisabled, previewCls, zIndexPopup, motionDurationSlow } = token$1;
	const operationBg = new FastColor(modalMaskBg).setA(.1);
	const operationBgHover = operationBg.clone().setA(.2);
	return {
		[`${previewCls}-switch-left, ${previewCls}-switch-right`]: {
			position: "fixed",
			insetBlockStart: "50%",
			zIndex: token$1.calc(zIndexPopup).add(1).equal(),
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: token$1.imagePreviewSwitchSize,
			height: token$1.imagePreviewSwitchSize,
			marginTop: token$1.calc(token$1.imagePreviewSwitchSize).mul(-1).div(2).equal(),
			color: token$1.previewOperationColor,
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
			[`> ${iconCls}`]: { fontSize: token$1.previewOperationSize }
		},
		[`${previewCls}-switch-left`]: { insetInlineStart: token$1.marginSM },
		[`${previewCls}-switch-right`]: { insetInlineEnd: token$1.marginSM }
	};
};
const genImagePreviewStyle = (token$1) => {
	const { motionEaseOut, previewCls, motionDurationSlow, componentCls } = token$1;
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
		{ [`${componentCls}-preview-root`]: { [`${previewCls}-wrap`]: { zIndex: token$1.zIndexPopup } } },
		{
			[`${componentCls}-preview-operations-wrapper`]: {
				position: "fixed",
				zIndex: token$1.calc(token$1.zIndexPopup).add(1).equal()
			},
			"&": [genPreviewOperationsStyle(token$1), genPreviewSwitchStyle(token$1)]
		}
	];
};
const genImageStyle = (token$1) => {
	const { componentCls } = token$1;
	return { [componentCls]: {
		position: "relative",
		display: "inline-block",
		[`${componentCls}-img`]: {
			width: "100%",
			height: "auto",
			verticalAlign: "middle"
		},
		[`${componentCls}-img-placeholder`]: {
			backgroundColor: token$1.colorBgContainerDisabled,
			backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			backgroundSize: "30%"
		},
		[`${componentCls}-mask`]: Object.assign({}, genImageMaskStyle(token$1)),
		[`${componentCls}-mask:hover`]: { opacity: 1 },
		[`${componentCls}-placeholder`]: Object.assign({}, genBoxStyle())
	} };
};
const genPreviewMotion = (token$1) => {
	const { previewCls } = token$1;
	return {
		[`${previewCls}-root`]: initZoomMotion(token$1, "zoom"),
		"&": initFadeMotion(token$1, true)
	};
};
const prepareComponentToken = (token$1) => ({
	zIndexPopup: token$1.zIndexPopupBase + 80,
	previewOperationColor: new FastColor(token$1.colorTextLightSolid).setA(.65).toRgbString(),
	previewOperationHoverColor: new FastColor(token$1.colorTextLightSolid).setA(.85).toRgbString(),
	previewOperationColorDisabled: new FastColor(token$1.colorTextLightSolid).setA(.25).toRgbString(),
	previewOperationSize: token$1.fontSizeIcon * 1.5
});
var style_default = genStyleHooks("Image", (token$1) => {
	const previewCls = `${token$1.componentCls}-preview`;
	const imageToken = merge(token$1, {
		previewCls,
		modalMaskBg: new FastColor("#000").setA(.45).toRgbString(),
		imagePreviewSwitchSize: token$1.controlHeightLG
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
var __rest$1 = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
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
const InternalPreviewGroup = (_a) => {
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
var __rest = function(s$2, e$1) {
	var t$1 = {};
	for (var p$1 in s$2) if (Object.prototype.hasOwnProperty.call(s$2, p$1) && e$1.indexOf(p$1) < 0) t$1[p$1] = s$2[p$1];
	if (s$2 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$2 = 0, p$1 = Object.getOwnPropertySymbols(s$2); i$2 < p$1.length; i$2++) if (e$1.indexOf(p$1[i$2]) < 0 && Object.prototype.propertyIsEnumerable.call(s$2, p$1[i$2])) t$1[p$1[i$2]] = s$2[p$1[i$2]];
	}
	return t$1;
};
const Image$1 = (props) => {
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
Image$1.PreviewGroup = PreviewGroup_default;
var image_default = Image$1;
const LayoutGroupContext = (0, import_react.createContext)({});
function useConstant(init) {
	const ref = (0, import_react.useRef)(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}
const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? import_react.useLayoutEffect : import_react.useEffect;
const PresenceContext = /* @__PURE__ */ (0, import_react.createContext)(null);
const MotionConfigContext = (0, import_react.createContext)({
	transformPagePoint: (p$1) => p$1,
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
const stepsOrder = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
const statsBuffer = {
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
			const addToCurrentFrame = immediate && isProcessing;
			const queue = addToCurrentFrame ? thisFrame : nextFrame;
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
const MotionGlobalConfig = {};
const maxElapsed = 40;
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
		for (let i$2 = 0; i$2 < stepsOrder.length; i$2++) steps[stepsOrder[i$2]].cancel(process$1);
	};
	return {
		schedule,
		cancel,
		state,
		steps
	};
}
const noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;
const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
const LazyContext = (0, import_react.createContext)({ strict: false });
const featureProps = {
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
const featureDefinitions = {};
for (const key in featureProps) featureDefinitions[key] = { isEnabled: (props) => featureProps[key].some((name) => !!props[name]) };
function loadFeatures(features) {
	for (const key in features) featureDefinitions[key] = {
		...featureDefinitions[key],
		...features[key]
	};
}
const validMotionProps = new Set([
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
var emotion_is_prop_valid_esm_exports = {};
__export(emotion_is_prop_valid_esm_exports, { default: () => isPropValid });
var reactPropsRegex, isPropValid;
var init_emotion_is_prop_valid_esm = __esmMin((() => {
	init_emotion_memoize_esm();
	reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
	isPropValid = /* @__PURE__ */ memoize(function(prop) {
		return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
	});
}));
let shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
	if (!isValidProp) return;
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
function createDOMMotionComponentProxy(componentFactory) {
	if (typeof Proxy === "undefined") return componentFactory;
	const componentCache = /* @__PURE__ */ new Map();
	const deprecatedFactoryFunction = (...args) => {
		return componentFactory(...args);
	};
	return new Proxy(deprecatedFactoryFunction, { get: (_target, key) => {
		if (key === "create") return componentFactory;
		if (!componentCache.has(key)) componentCache.set(key, componentFactory(key));
		return componentCache.get(key);
	} });
}
const MotionContext = /* @__PURE__ */ (0, import_react.createContext)({});
function isAnimationControls(v$1) {
	return v$1 !== null && typeof v$1 === "object" && typeof v$1.start === "function";
}
function isVariantLabel(v$1) {
	return typeof v$1 === "string" || Array.isArray(v$1);
}
const variantPriorityOrder = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
const variantProps = ["initial", ...variantPriorityOrder];
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
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
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
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
const SwitchLayoutGroupContext = (0, import_react.createContext)({});
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);
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
		microtask.render(visualElement.render);
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
let warning = () => {};
let invariant = () => {};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function createRendererMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component: Component$1 }) {
	preloadedFeatures && loadFeatures(preloadedFeatures);
	function MotionComponent(props, externalRef) {
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
			}) : null, useRender(Component$1, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)]
		});
	}
	MotionComponent.displayName = `motion.${typeof Component$1 === "string" ? Component$1 : `create(${Component$1.displayName ?? Component$1.name ?? ""})`}`;
	const ForwardRefMotionComponent = (0, import_react.forwardRef)(MotionComponent);
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
const checkStringStartsWith = (token$1) => (key) => typeof key === "string" && key.startsWith(token$1);
const isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
const startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
	const startsWithToken = startsAsVariableToken(value);
	if (!startsWithToken) return false;
	return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
const scaleCorrectors = {};
function addScaleCorrector(correctors) {
	for (const key in correctors) {
		scaleCorrectors[key] = correctors[key];
		if (isCSSVariableName(key)) scaleCorrectors[key].isCSSVariable = true;
	}
}
const transformPropOrder = [
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
const transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();
function isForcedMotionValue(key, { layout: layout$1, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout$1 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
const isMotionValue = (value) => Boolean(value && value.getVelocity);
const getValueAsType = (value, type) => {
	return type && typeof value === "number" ? type.transform(value) : value;
};
const clamp = (min, max, v$1) => {
	if (v$1 > max) return max;
	if (v$1 < min) return min;
	return v$1;
};
const number = {
	test: (v$1) => typeof v$1 === "number",
	parse: parseFloat,
	transform: (v$1) => v$1
};
const alpha = {
	...number,
	transform: (v$1) => clamp(0, 1, v$1)
};
const scale = {
	...number,
	default: 1
};
const int = {
	...number,
	transform: Math.round
};
const createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit$1) => ({
	test: (v$1) => typeof v$1 === "string" && v$1.endsWith(unit$1) && v$1.split(" ").length === 1,
	parse: parseFloat,
	transform: (v$1) => `${v$1}${unit$1}`
});
const degrees = /* @__PURE__ */ createUnitType("deg");
const percent = /* @__PURE__ */ createUnitType("%");
const px = /* @__PURE__ */ createUnitType("px");
const vh = /* @__PURE__ */ createUnitType("vh");
const vw = /* @__PURE__ */ createUnitType("vw");
const progressPercentage = /* @__PURE__ */ (() => ({
	...percent,
	parse: (v$1) => percent.parse(v$1) / 100,
	transform: (v$1) => percent.transform(v$1 * 100)
}))();
const transformValueTypes = {
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
	originZ: px
};
const numberValueTypes = {
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
	...transformValueTypes,
	zIndex: int,
	fillOpacity: alpha,
	strokeOpacity: alpha,
	numOctaves: int
};
const translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
	let transformString = "";
	let transformIsDefault = true;
	for (let i$2 = 0; i$2 < numTransforms; i$2++) {
		const key = transformPropOrder[i$2];
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
const createHtmlRenderState = () => ({
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
const lowercaseSVGElements = [
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
const dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
const camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function buildSVGPath(attrs, length$1, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = px.transform(-offset);
	const pathLength = px.transform(length$1);
	const pathSpacing = px.transform(spacing);
	attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0,...latest }, isSVGTag$1, transformTemplate, styleProp) {
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
const createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
});
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
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
function createUseRender(forwardMotionProps = false) {
	const useRender = (Component$1, props, ref, { latestValues }, isStatic) => {
		const useVisualProps = isSVGComponent(Component$1) ? useSVGProps : useHTMLProps;
		const visualProps = useVisualProps(props, latestValues, isStatic, Component$1);
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
	};
	return useRender;
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
	const state = {
		latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps$2),
		renderState: createRenderState()
	};
	return state;
}
const makeUseVisualState = (config) => (props, isStatic) => {
	const context = (0, import_react.useContext)(MotionContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const make = () => makeState(config, props, context, presenceContext);
	return isStatic ? make() : useConstant(make);
};
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
		for (let i$2 = 0; i$2 < list.length; i$2++) {
			const resolved = resolveVariantFromProps(props, list[i$2]);
			if (resolved) {
				const { transitionEnd, transition,...target } = resolved;
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
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
	const { style } = props;
	const newValues = {};
	for (const key in style) if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) newValues[key] = style[key];
	return newValues;
}
const htmlMotionConfig = { useVisualState: makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
}) };
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
	const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	for (const key in props) if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
		const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}
const svgMotionConfig = { useVisualState: makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
}) };
function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
	return function createMotionComponent$1(Component$1, { forwardMotionProps } = { forwardMotionProps: false }) {
		const baseConfig = isSVGComponent(Component$1) ? svgMotionConfig : htmlMotionConfig;
		const config = {
			...baseConfig,
			preloadedFeatures,
			useRender: createUseRender(forwardMotionProps),
			createVisualElement,
			Component: Component$1
		};
		return createRendererMotionComponent(config);
	};
}
function resolveVariant(visualElement, definition, custom) {
	const props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}
const isKeyframesTarget = (v$1) => {
	return Array.isArray(v$1);
};
let now;
function clearTime() {
	now = void 0;
}
const time = {
	now: () => {
		if (now === void 0) time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
		return now;
	},
	set: (newTime) => {
		now = newTime;
		queueMicrotask(clearTime);
	}
};
function addUniqueItem(arr, item) {
	if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
	const index = arr.indexOf(item);
	if (index > -1) arr.splice(index, 1);
}
var SubscriptionManager = class {
	constructor() {
		this.subscriptions = [];
	}
	add(handler) {
		addUniqueItem(this.subscriptions, handler);
		return () => removeItem(this.subscriptions, handler);
	}
	notify(a$2, b$1, c$2) {
		const numSubscriptions = this.subscriptions.length;
		if (!numSubscriptions) return;
		if (numSubscriptions === 1) this.subscriptions[0](a$2, b$1, c$2);
		else for (let i$2 = 0; i$2 < numSubscriptions; i$2++) {
			const handler = this.subscriptions[i$2];
			handler && handler(a$2, b$1, c$2);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
};
function velocityPerSecond(velocity, frameDuration) {
	return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
	return !isNaN(parseFloat(value));
};
const collectMotionValues = { current: void 0 };
var MotionValue = class {
	constructor(init, options = {}) {
		this.version = "__VERSION__";
		this.canTrackVelocity = null;
		this.events = {};
		this.updateAndNotify = (v$1, render$1 = true) => {
			const currentTime = time.now();
			if (this.updatedAt !== currentTime) this.setPrevFrameValue();
			this.prev = this.current;
			this.setCurrent(v$1);
			if (this.current !== this.prev) {
				this.events.change?.notify(this.current);
				if (this.dependents) for (const dependent of this.dependents) dependent.dirty();
			}
			if (render$1) this.events.renderRequest?.notify(this.current);
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
	set(v$1, render$1 = true) {
		if (!render$1 || !this.passiveEffect) this.updateAndNotify(v$1, render$1);
		else this.passiveEffect(v$1, this.updateAndNotify);
	}
	setWithVelocity(prev$1, current, delta) {
		this.set(current);
		this.prev = void 0;
		this.prevFrameValue = prev$1;
		this.prevUpdatedAt = this.updatedAt - delta;
	}
	jump(v$1, endAnimation = true) {
		this.updateAndNotify(v$1);
		this.prev = v$1;
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
function setMotionValue(visualElement, key, value) {
	if (visualElement.hasValue(key)) visualElement.getValue(key).set(value);
	else visualElement.addValue(key, motionValue(value));
}
function resolveFinalValueInKeyframes(v$1) {
	return isKeyframesTarget(v$1) ? v$1[v$1.length - 1] || 0 : v$1;
}
function setTarget(visualElement, definition) {
	const resolved = resolveVariant(visualElement, definition);
	let { transitionEnd = {}, transition = {},...target } = resolved || {};
	target = {
		...target,
		...transitionEnd
	};
	for (const key in target) {
		const value = resolveFinalValueInKeyframes(target[key]);
		setMotionValue(visualElement, key, value);
	}
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
const isNotNull$1 = (value) => value !== null;
function getFinalKeyframe(keyframes$1, { repeat, repeatType = "loop" }, finalKeyframe) {
	const resolvedKeyframes = keyframes$1.filter(isNotNull$1);
	const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
	return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
const underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
};
const criticallyDampedSpring = (target) => ({
	type: "spring",
	stiffness: 550,
	damping: target === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
});
const keyframesTransition = {
	type: "keyframes",
	duration: .8
};
const ease = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
};
const getDefaultTransition = (valueKey, { keyframes: keyframes$1 }) => {
	if (keyframes$1.length > 2) return keyframesTransition;
	else if (transformProps.has(valueKey)) return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes$1[1]) : underDampedSpring;
	return ease;
};
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from: from$1, elapsed,...transition }) {
	return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
	return transition?.[key] ?? transition?.["default"] ?? transition;
}
const secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
const millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;
const activeAnimations = {
	layout: 0,
	mainThread: 0,
	waapi: 0
};
const sanitize = (v$1) => Math.round(v$1 * 1e5) / 1e5;
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function isNullish(v$1) {
	return v$1 == null;
}
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
const isColorString = (type, testProp) => (v$1) => {
	return Boolean(typeof v$1 === "string" && singleColorRegex.test(v$1) && v$1.startsWith(type) || testProp && !isNullish(v$1) && Object.prototype.hasOwnProperty.call(v$1, testProp));
};
const splitColor = (aName, bName, cName) => (v$1) => {
	if (typeof v$1 !== "string") return v$1;
	const [a$2, b$1, c$2, alpha$1] = v$1.match(floatRegex);
	return {
		[aName]: parseFloat(a$2),
		[bName]: parseFloat(b$1),
		[cName]: parseFloat(c$2),
		alpha: alpha$1 !== void 0 ? parseFloat(alpha$1) : 1
	};
};
const clampRgbUnit = (v$1) => clamp(0, 255, v$1);
const rgbUnit = {
	...number,
	transform: (v$1) => Math.round(clampRgbUnit(v$1))
};
const rgba = {
	test: /* @__PURE__ */ isColorString("rgb", "red"),
	parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
	transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v$1) {
	let r$2 = "";
	let g$1 = "";
	let b$1 = "";
	let a$2 = "";
	if (v$1.length > 5) {
		r$2 = v$1.substring(1, 3);
		g$1 = v$1.substring(3, 5);
		b$1 = v$1.substring(5, 7);
		a$2 = v$1.substring(7, 9);
	} else {
		r$2 = v$1.substring(1, 2);
		g$1 = v$1.substring(2, 3);
		b$1 = v$1.substring(3, 4);
		a$2 = v$1.substring(4, 5);
		r$2 += r$2;
		g$1 += g$1;
		b$1 += b$1;
		a$2 += a$2;
	}
	return {
		red: parseInt(r$2, 16),
		green: parseInt(g$1, 16),
		blue: parseInt(b$1, 16),
		alpha: a$2 ? parseInt(a$2, 16) / 255 : 1
	};
}
const hex = {
	test: /* @__PURE__ */ isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
};
const hsla = {
	test: /* @__PURE__ */ isColorString("hsl", "hue"),
	parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
	transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
		return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
	}
};
const color = {
	test: (v$1) => rgba.test(v$1) || hex.test(v$1) || hsla.test(v$1),
	parse: (v$1) => {
		if (rgba.test(v$1)) return rgba.parse(v$1);
		else if (hsla.test(v$1)) return hsla.parse(v$1);
		else return hex.parse(v$1);
	},
	transform: (v$1) => {
		return typeof v$1 === "string" ? v$1 : v$1.hasOwnProperty("red") ? rgba.transform(v$1) : hsla.transform(v$1);
	}
};
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(v$1) {
	return isNaN(v$1) && typeof v$1 === "string" && (v$1.match(floatRegex)?.length || 0) + (v$1.match(colorRegex)?.length || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
	const originalValue = value.toString();
	const values = [];
	const indexes = {
		color: [],
		number: [],
		var: []
	};
	const types$2 = [];
	let i$2 = 0;
	const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
		if (color.test(parsedValue)) {
			indexes.color.push(i$2);
			types$2.push(COLOR_TOKEN);
			values.push(color.parse(parsedValue));
		} else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
			indexes.var.push(i$2);
			types$2.push(VAR_TOKEN);
			values.push(parsedValue);
		} else {
			indexes.number.push(i$2);
			types$2.push(NUMBER_TOKEN);
			values.push(parseFloat(parsedValue));
		}
		++i$2;
		return SPLIT_TOKEN;
	});
	const split = tokenised.split(SPLIT_TOKEN);
	return {
		values,
		split,
		indexes,
		types: types$2
	};
}
function parseComplexValue(v$1) {
	return analyseComplexValue(v$1).values;
}
function createTransformer(source) {
	const { split, types: types$2 } = analyseComplexValue(source);
	const numSections = split.length;
	return (v$1) => {
		let output = "";
		for (let i$2 = 0; i$2 < numSections; i$2++) {
			output += split[i$2];
			if (v$1[i$2] !== void 0) {
				const type = types$2[i$2];
				if (type === NUMBER_TOKEN) output += sanitize(v$1[i$2]);
				else if (type === COLOR_TOKEN) output += color.transform(v$1[i$2]);
				else output += v$1[i$2];
			}
		}
		return output;
	};
}
const convertNumbersToZero = (v$1) => typeof v$1 === "number" ? 0 : v$1;
function getAnimatableNone$1(v$1) {
	const parsed = parseComplexValue(v$1);
	const transformer = createTransformer(v$1);
	return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
function hueToRgb(p$1, q$1, t$1) {
	if (t$1 < 0) t$1 += 1;
	if (t$1 > 1) t$1 -= 1;
	if (t$1 < 1 / 6) return p$1 + (q$1 - p$1) * 6 * t$1;
	if (t$1 < 1 / 2) return q$1;
	if (t$1 < 2 / 3) return p$1 + (q$1 - p$1) * (2 / 3 - t$1) * 6;
	return p$1;
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
		const q$1 = lightness < .5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		const p$1 = 2 * lightness - q$1;
		red = hueToRgb(p$1, q$1, hue + 1 / 3);
		green = hueToRgb(p$1, q$1, hue);
		blue = hueToRgb(p$1, q$1, hue - 1 / 3);
	}
	return {
		red: Math.round(red * 255),
		green: Math.round(green * 255),
		blue: Math.round(blue * 255),
		alpha: alpha$1
	};
}
function mixImmediate(a$2, b$1) {
	return (p$1) => p$1 > 0 ? b$1 : a$2;
}
const mixNumber = (from$1, to, progress$1) => {
	return from$1 + (to - from$1) * progress$1;
};
const mixLinearColor = (from$1, to, v$1) => {
	const fromExpo = from$1 * from$1;
	const expo = v$1 * (to * to - fromExpo) + fromExpo;
	return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [
	hex,
	rgba,
	hsla
];
const getColorType = (v$1) => colorTypes.find((type) => type.test(v$1));
function asRGBA(color$1) {
	const type = getColorType(color$1);
	warning(Boolean(type), `'${color$1}' is not an animatable color. Use the equivalent color code instead.`);
	if (!Boolean(type)) return false;
	let model = type.parse(color$1);
	if (type === hsla) model = hslaToRgba(model);
	return model;
}
const mixColor = (from$1, to) => {
	const fromRGBA = asRGBA(from$1);
	const toRGBA = asRGBA(to);
	if (!fromRGBA || !toRGBA) return mixImmediate(from$1, to);
	const blended = { ...fromRGBA };
	return (v$1) => {
		blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v$1);
		blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v$1);
		blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v$1);
		blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v$1);
		return rgba.transform(blended);
	};
};
const invisibleValues = new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
	if (invisibleValues.has(origin)) return (p$1) => p$1 <= 0 ? origin : target;
	else return (p$1) => p$1 >= 1 ? target : origin;
}
const combineFunctions = (a$2, b$1) => (v$1) => b$1(a$2(v$1));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
function mixNumber$1(a$2, b$1) {
	return (p$1) => mixNumber(a$2, b$1, p$1);
}
function getMixer(a$2) {
	if (typeof a$2 === "number") return mixNumber$1;
	else if (typeof a$2 === "string") return isCSSVariableToken(a$2) ? mixImmediate : color.test(a$2) ? mixColor : mixComplex;
	else if (Array.isArray(a$2)) return mixArray;
	else if (typeof a$2 === "object") return color.test(a$2) ? mixColor : mixObject;
	return mixImmediate;
}
function mixArray(a$2, b$1) {
	const output = [...a$2];
	const numValues = output.length;
	const blendValue = a$2.map((v$1, i$2) => getMixer(v$1)(v$1, b$1[i$2]));
	return (p$1) => {
		for (let i$2 = 0; i$2 < numValues; i$2++) output[i$2] = blendValue[i$2](p$1);
		return output;
	};
}
function mixObject(a$2, b$1) {
	const output = {
		...a$2,
		...b$1
	};
	const blendValue = {};
	for (const key in output) if (a$2[key] !== void 0 && b$1[key] !== void 0) blendValue[key] = getMixer(a$2[key])(a$2[key], b$1[key]);
	return (v$1) => {
		for (const key in blendValue) output[key] = blendValue[key](v$1);
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
	for (let i$2 = 0; i$2 < target.values.length; i$2++) {
		const type = target.types[i$2];
		const originIndex = origin.indexes[type][pointers[type]];
		const originValue = origin.values[originIndex] ?? 0;
		orderedOrigin[i$2] = originValue;
		pointers[type]++;
	}
	return orderedOrigin;
}
const mixComplex = (origin, target) => {
	const template = complex.createTransformer(target);
	const originStats = analyseComplexValue(origin);
	const targetStats = analyseComplexValue(target);
	const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
	if (canInterpolate) {
		if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) return mixVisibility(origin, target);
		return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
	} else {
		warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
		return mixImmediate(origin, target);
	}
};
function mix(from$1, to, p$1) {
	if (typeof from$1 === "number" && typeof to === "number" && typeof p$1 === "number") return mixNumber(from$1, to, p$1);
	const mixer = getMixer(from$1);
	return mixer(from$1, to);
}
const frameloopDriver = (update) => {
	const passTimestamp = ({ timestamp }) => update(timestamp);
	return {
		start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
		stop: () => cancelFrame(passTimestamp),
		now: () => frameData.isProcessing ? frameData.timestamp : time.now()
	};
};
const generateLinearEasing = (easing, duration, resolution = 10) => {
	let points = "";
	const numPoints = Math.max(Math.round(duration / resolution), 2);
	for (let i$2 = 0; i$2 < numPoints; i$2++) points += easing(i$2 / (numPoints - 1)) + ", ";
	return `linear(${points.substring(0, points.length - 2)})`;
};
const maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
	let duration = 0;
	const timeStep = 50;
	let state = generator.next(duration);
	while (!state.done && duration < maxGeneratorDuration) {
		duration += timeStep;
		state = generator.next(duration);
	}
	return duration >= maxGeneratorDuration ? Infinity : duration;
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
const velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t$1, current) {
	const prevT = Math.max(t$1 - velocitySampleDuration, 0);
	return velocityPerSecond(current - resolveValue(prevT), t$1 - prevT);
}
const springDefaults = {
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
const safeMin = .001;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
	let envelope;
	let derivative$1;
	warning(duration <= /* @__PURE__ */ secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less");
	let dampingRatio = 1 - bounce;
	dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
	duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(duration));
	if (dampingRatio < 1) {
		envelope = (undampedFreq$1) => {
			const exponentialDecay = undampedFreq$1 * dampingRatio;
			const delta = exponentialDecay * duration;
			const a$2 = exponentialDecay - velocity;
			const b$1 = calcAngularFreq(undampedFreq$1, dampingRatio);
			const c$2 = Math.exp(-delta);
			return safeMin - a$2 / b$1 * c$2;
		};
		derivative$1 = (undampedFreq$1) => {
			const exponentialDecay = undampedFreq$1 * dampingRatio;
			const delta = exponentialDecay * duration;
			const d = delta * velocity + velocity;
			const e$1 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq$1, 2) * duration;
			const f$2 = Math.exp(-delta);
			const g$1 = calcAngularFreq(Math.pow(undampedFreq$1, 2), dampingRatio);
			const factor = -envelope(undampedFreq$1) + safeMin > 0 ? -1 : 1;
			return factor * ((d - e$1) * f$2) / g$1;
		};
	} else {
		envelope = (undampedFreq$1) => {
			const a$2 = Math.exp(-undampedFreq$1 * duration);
			const b$1 = (undampedFreq$1 - velocity) * duration + 1;
			return -safeMin + a$2 * b$1;
		};
		derivative$1 = (undampedFreq$1) => {
			const a$2 = Math.exp(-undampedFreq$1 * duration);
			const b$1 = (velocity - undampedFreq$1) * (duration * duration);
			return a$2 * b$1;
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
const rootIterations = 12;
function approximateRoot(envelope, derivative$1, initialGuess) {
	let result = initialGuess;
	for (let i$2 = 1; i$2 < rootIterations; i$2++) result = result - envelope(result) / derivative$1(result);
	return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
	return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = [
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
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t$1);
			return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t$1) + initialDelta * Math.cos(angularFreq * t$1));
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
	const isOutOfBounds = (v$1) => min !== void 0 && v$1 < min || max !== void 0 && v$1 > max;
	const nearestBoundary = (v$1) => {
		if (min === void 0) return max;
		if (max === void 0) return min;
		return Math.abs(min - v$1) < Math.abs(max - v$1) ? min : max;
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
const progress = /* @__NO_SIDE_EFFECTS__ */ (from$1, to, value) => {
	const toFromDifference = to - from$1;
	return toFromDifference === 0 ? 1 : (value - from$1) / toFromDifference;
};
function createMixers(output, ease$1, customMixer) {
	const mixers = [];
	const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
	const numMixers = output.length - 1;
	for (let i$2 = 0; i$2 < numMixers; i$2++) {
		let mixer = mixerFactory(output[i$2], output[i$2 + 1]);
		if (ease$1) {
			const easingFunction = Array.isArray(ease$1) ? ease$1[i$2] || noop : ease$1;
			mixer = pipe(easingFunction, mixer);
		}
		mixers.push(mixer);
	}
	return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease$1, mixer } = {}) {
	const inputLength = input.length;
	invariant(inputLength === output.length, "Both input and output ranges must be the same length");
	if (inputLength === 1) return () => output[0];
	if (inputLength === 2 && output[0] === output[1]) return () => output[1];
	const isZeroDeltaRange = input[0] === input[1];
	if (input[0] > input[inputLength - 1]) {
		input = [...input].reverse();
		output = [...output].reverse();
	}
	const mixers = createMixers(output, ease$1, mixer);
	const numMixers = mixers.length;
	const interpolator = (v$1) => {
		if (isZeroDeltaRange && v$1 < input[0]) return output[0];
		let i$2 = 0;
		if (numMixers > 1) {
			for (; i$2 < input.length - 2; i$2++) if (v$1 < input[i$2 + 1]) break;
		}
		const progressInRange = /* @__PURE__ */ progress(input[i$2], input[i$2 + 1], v$1);
		return mixers[i$2](progressInRange);
	};
	return isClamp ? (v$1) => interpolator(clamp(input[0], input[inputLength - 1], v$1)) : interpolator;
}
function fillOffset(offset, remaining) {
	const min = offset[offset.length - 1];
	for (let i$2 = 1; i$2 <= remaining; i$2++) {
		const offsetProgress = /* @__PURE__ */ progress(0, remaining, i$2);
		offset.push(mixNumber(min, 1, offsetProgress));
	}
}
function defaultOffset(arr) {
	const offset = [0];
	fillOffset(offset, arr.length - 1);
	return offset;
}
function convertOffsetToTimes(offset, duration) {
	return offset.map((o$2) => o$2 * duration);
}
const calcBezier = (t$1, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t$1 + (3 * a2 - 6 * a1)) * t$1 + 3 * a1) * t$1;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x$1, lowerBound, upperBound, mX1, mX2) {
	let currentX;
	let currentT;
	let i$2 = 0;
	do {
		currentT = lowerBound + (upperBound - lowerBound) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - x$1;
		if (currentX > 0) upperBound = currentT;
		else lowerBound = currentT;
	} while (Math.abs(currentX) > subdivisionPrecision && ++i$2 < subdivisionMaxIterations);
	return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
	if (mX1 === mY1 && mX2 === mY2) return noop;
	const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
	return (t$1) => t$1 === 0 || t$1 === 1 ? t$1 : calcBezier(getTForX(t$1), mY1, mY2);
}
const easeIn = /* @__PURE__ */ cubicBezier(.42, 0, 1, 1);
const easeOut = /* @__PURE__ */ cubicBezier(0, 0, .58, 1);
const easeInOut = /* @__PURE__ */ cubicBezier(.42, 0, .58, 1);
const isEasingArray = (ease$1) => {
	return Array.isArray(ease$1) && typeof ease$1[0] !== "number";
};
const mirrorEasing = (easing) => (p$1) => p$1 <= .5 ? easing(2 * p$1) / 2 : (2 - easing(2 * (1 - p$1))) / 2;
const reverseEasing = (easing) => (p$1) => 1 - easing(1 - p$1);
const backOut = /* @__PURE__ */ cubicBezier(.33, 1.53, .69, .99);
const backIn = /* @__PURE__ */ reverseEasing(backOut);
const backInOut = /* @__PURE__ */ mirrorEasing(backIn);
const anticipate = (p$1) => (p$1 *= 2) < 1 ? .5 * backIn(p$1) : .5 * (2 - Math.pow(2, -10 * (p$1 - 1)));
const circIn = (p$1) => 1 - Math.sin(Math.acos(p$1));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circIn);
const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
const easingLookup = {
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
const isValidEasing = (easing) => {
	return typeof easing === "string";
};
const easingDefinitionToFunction = (definition) => {
	if (isBezierDefinition(definition)) {
		invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
		const [x1, y1, x2, y2] = definition;
		return cubicBezier(x1, y1, x2, y2);
	} else if (isValidEasing(definition)) {
		invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
		return easingLookup[definition];
	}
	return definition;
};
function defaultEasing(values, easing) {
	return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease$1 = "easeInOut" }) {
	const easingFunctions = isEasingArray(ease$1) ? ease$1.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease$1);
	const state = {
		done: false,
		value: keyframeValues[0]
	};
	const absoluteTimes = convertOffsetToTimes(times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues), duration);
	const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, { ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions) });
	return {
		calculatedDuration: duration,
		next: (t$1) => {
			state.value = mapTimeToKeyframe(t$1);
			state.done = t$1 >= duration;
			return state;
		}
	};
}
const isNotNull = (value) => value !== null;
function getFinalKeyframe$1(keyframes$1, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
	const resolvedKeyframes = keyframes$1.filter(isNotNull);
	const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
	const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
	return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
const transitionTypeMap = {
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
		this.count = 0;
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this.count++;
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
const percentToProgress = (percent$1) => percent$1 / 100;
var JSAnimation = class extends WithPromise {
	constructor(options) {
		super();
		this.state = "idle";
		this.startTime = null;
		this.isStopped = false;
		this.currentTime = 0;
		this.holdTime = null;
		this.playbackSpeed = 1;
		this.stop = (sync = true) => {
			if (sync) {
				const { motionValue: motionValue$1 } = this.options;
				if (motionValue$1 && motionValue$1.updatedAt !== time.now()) this.tick(time.now());
			}
			this.isStopped = true;
			if (this.state === "idle") return;
			this.teardown();
			const { onStop } = this.options;
			onStop && onStop();
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
			const isOddIteration = Boolean(currentIteration % 2);
			if (isOddIteration) {
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
		const { driver = frameloopDriver, onPlay, startTime } = this.options;
		if (!this.driver) this.driver = driver((timestamp) => this.tick(timestamp));
		onPlay && onPlay();
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
		this.teardown();
		this.state = "finished";
		const { onComplete } = this.options;
		onComplete && onComplete();
	}
	cancel() {
		this.holdTime = null;
		this.startTime = 0;
		this.tick(0);
		this.teardown();
	}
	teardown() {
		this.notifyFinished();
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
	for (let i$2 = 1; i$2 < keyframes$1.length; i$2++) keyframes$1[i$2] ?? (keyframes$1[i$2] = keyframes$1[i$2 - 1]);
}
const radToDeg = (rad) => rad * 180 / Math.PI;
const rotate = (v$1) => {
	const angle = radToDeg(Math.atan2(v$1[1], v$1[0]));
	return rebaseAngle(angle);
};
const matrix2dParsers = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (v$1) => (Math.abs(v$1[0]) + Math.abs(v$1[3])) / 2,
	rotate,
	rotateZ: rotate,
	skewX: (v$1) => radToDeg(Math.atan(v$1[1])),
	skewY: (v$1) => radToDeg(Math.atan(v$1[2])),
	skew: (v$1) => (Math.abs(v$1[1]) + Math.abs(v$1[2])) / 2
};
const rebaseAngle = (angle) => {
	angle = angle % 360;
	if (angle < 0) angle += 360;
	return angle;
};
const rotateZ = rotate;
const scaleX = (v$1) => Math.sqrt(v$1[0] * v$1[0] + v$1[1] * v$1[1]);
const scaleY = (v$1) => Math.sqrt(v$1[4] * v$1[4] + v$1[5] * v$1[5]);
const matrix3dParsers = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX,
	scaleY,
	scale: (v$1) => (scaleX(v$1) + scaleY(v$1)) / 2,
	rotateX: (v$1) => rebaseAngle(radToDeg(Math.atan2(v$1[6], v$1[5]))),
	rotateY: (v$1) => rebaseAngle(radToDeg(Math.atan2(-v$1[2], v$1[0]))),
	rotateZ,
	rotate: rotateZ,
	skewX: (v$1) => radToDeg(Math.atan(v$1[4])),
	skewY: (v$1) => radToDeg(Math.atan(v$1[1])),
	skew: (v$1) => (Math.abs(v$1[1]) + Math.abs(v$1[4])) / 2
};
function defaultTransformValue(name) {
	return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
	if (!transform || transform === "none") return defaultTransformValue(name);
	const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
	let parsers;
	let match$1;
	if (matrix3dMatch) {
		parsers = matrix3dParsers;
		match$1 = matrix3dMatch;
	} else {
		const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		parsers = matrix2dParsers;
		match$1 = matrix2dMatch;
	}
	if (!match$1) return defaultTransformValue(name);
	const valueParser = parsers[name];
	const values = match$1[1].split(",").map(convertTransformToNumber);
	return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name) => {
	const { transform = "none" } = getComputedStyle(instance);
	return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
	return parseFloat(value.trim());
}
const isNumOrPxType = (v$1) => v$1 === number || v$1 === px;
const transformKeys = new Set([
	"x",
	"y",
	"z"
]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
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
const positionalValues = {
	width: ({ x: x$1 }, { paddingLeft = "0", paddingRight = "0" }) => x$1.max - x$1.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
	height: ({ y: y$1 }, { paddingTop = "0", paddingBottom = "0" }) => y$1.max - y$1.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
	top: (_bbox, { top }) => parseFloat(top),
	left: (_bbox, { left }) => parseFloat(left),
	bottom: ({ y: y$1 }, { top }) => parseFloat(top) + (y$1.max - y$1.min),
	right: ({ x: x$1 }, { left }) => parseFloat(left) + (x$1.max - x$1.min),
	x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
	y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
const toResolve = /* @__PURE__ */ new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
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
const isCSSVar = (name) => name.startsWith("--");
function setStyle(element, name, value) {
	isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
/* @__NO_SIDE_EFFECTS__ */
function memo(callback) {
	let result;
	return () => {
		if (result === void 0) result = callback();
		return result;
	};
}
const supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0);
const supportsFlags = {};
function memoSupports(callback, supportsFlag) {
	const memoized = /* @__PURE__ */ memo(callback);
	return () => supportsFlags[supportsFlag] ?? memoized();
}
const supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch (e$1) {
		return false;
	}
	return true;
}, "linearEasing");
const cubicBezierAsString = ([a$2, b$1, c$2, d]) => `cubic-bezier(${a$2}, ${b$1}, ${c$2}, ${d})`;
const supportedWaapiEasing = {
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
	if (!easing) return void 0;
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
function applyGeneratorOptions({ type,...options }) {
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
		invariant(typeof options.type !== "string", `animateMini doesn't support "type" as a string. Did you mean to import { spring } from "motion"?`);
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
		this.animation.oncancel = () => this.notifyFinished();
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
const unsupportedEasingFunctions = {
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
const sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
	constructor(options) {
		replaceStringEasing(options);
		replaceTransitionType(options);
		super(options);
		if (options.startTime) this.startTime = options.startTime;
		this.options = options;
	}
	updateMotionValue(value) {
		const { motionValue: motionValue$1, onUpdate, onComplete, element,...options } = this.options;
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
const isAnimatable = (value, name) => {
	if (name === "zIndex") return false;
	if (typeof value === "number" || Array.isArray(value)) return true;
	if (typeof value === "string" && (complex.test(value) || value === "0") && !value.startsWith("url(")) return true;
	return false;
};
function hasKeyframesChanged(keyframes$1) {
	const current = keyframes$1[0];
	if (keyframes$1.length === 1) return true;
	for (let i$2 = 0; i$2 < keyframes$1.length; i$2++) if (keyframes$1[i$2] !== current) return true;
}
function canAnimate(keyframes$1, name, type, velocity) {
	const originKeyframe = keyframes$1[0];
	if (originKeyframe === null) return false;
	if (name === "display" || name === "visibility") return true;
	const targetKeyframe = keyframes$1[keyframes$1.length - 1];
	const isOriginAnimatable = isAnimatable(originKeyframe, name);
	const isTargetAnimatable = isAnimatable(targetKeyframe, name);
	warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
	if (!isOriginAnimatable || !isTargetAnimatable) return false;
	return hasKeyframesChanged(keyframes$1) || (type === "spring" || isGenerator(type)) && velocity;
}
const acceleratedValues = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]);
const supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
	const { motionValue: motionValue$1, name, repeatDelay, repeatType, damping, type } = options;
	if (!motionValue$1 || !motionValue$1.owner || !(motionValue$1.owner.current instanceof HTMLElement)) return false;
	const { onUpdate, transformTemplate } = motionValue$1.owner.getProps();
	return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) && !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
const MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
	constructor({ autoplay = true, delay: delay$1 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes$1, name, motionValue: motionValue$1, element,...options }) {
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
		const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
		this.keyframeResolver = new KeyframeResolver$1(keyframes$1, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue$1, element);
		this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(keyframes$1, finalKeyframe, options, sync) {
		this.keyframeResolver = void 0;
		const { name, type, velocity, delay: delay$1, isHandoff, onUpdate } = options;
		this.resolvedAt = time.now();
		if (!canAnimate(keyframes$1, name, type, velocity)) {
			if (MotionGlobalConfig.instantAnimations || !delay$1) onUpdate?.(getFinalKeyframe$1(keyframes$1, options, finalKeyframe));
			keyframes$1[0] = keyframes$1[keyframes$1.length - 1];
			options.duration = 0;
			options.repeat = 0;
		}
		const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
		const resolvedOptions = {
			startTime,
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
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
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
		onUpdate: (v$1) => {
			value.set(v$1);
			valueTransition.onUpdate && valueTransition.onUpdate(v$1);
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
		options.duration = 0;
		if (options.delay === 0) shouldSkip = true;
	}
	if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) {
		shouldSkip = true;
		options.duration = 0;
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
const positionalKeys = new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...transformPropOrder
]);
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
	const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
	needsAnimating[key] = false;
	return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay$1 = 0, transitionOverride, type } = {}) {
	let { transition = visualElement.getDefaultTransition(), transitionEnd,...target } = targetAndTransition;
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
function animateVariant(visualElement, variant, options = {}) {
	const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
	let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
	if (options.transitionOverride) transition = options.transitionOverride;
	const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
	const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
		const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
		return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
	} : () => Promise.resolve();
	const { when } = transition;
	if (when) {
		const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
		return first().then(() => last());
	} else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
	const animations$1 = [];
	const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
	const generateStaggerDuration = staggerDirection === 1 ? (i$2 = 0) => i$2 * staggerChildren : (i$2 = 0) => maxStaggerDuration - i$2 * staggerChildren;
	Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i$2) => {
		child.notify("AnimationStart", variant);
		animations$1.push(animateVariant(child, variant, {
			...options,
			delay: delayChildren + generateStaggerDuration(i$2)
		}).then(() => child.notify("AnimationComplete", variant)));
	});
	return Promise.all(animations$1);
}
function sortByTreeOrder(a$2, b$1) {
	return a$2.sortNodePosition(b$1);
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
function shallowCompare(next$1, prev$1) {
	if (!Array.isArray(prev$1)) return false;
	const prevLength = prev$1.length;
	if (prevLength !== next$1.length) return false;
	for (let i$2 = 0; i$2 < prevLength; i$2++) if (prev$1[i$2] !== next$1[i$2]) return false;
	return true;
}
const numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
	if (!visualElement) return void 0;
	if (!visualElement.isControllingVariants) {
		const context$1 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
		if (visualElement.props.initial !== void 0) context$1.initial = visualElement.props.initial;
		return context$1;
	}
	const context = {};
	for (let i$2 = 0; i$2 < numVariantProps; i$2++) {
		const name = variantProps[i$2];
		const prop = visualElement.props[name];
		if (isVariantLabel(prop) || prop === false) context[name] = prop;
	}
	return context;
}
const reversePriorityOrder = [...variantPriorityOrder].reverse();
const numAnimationTypes = variantPriorityOrder.length;
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
			const { transition, transitionEnd,...target } = resolved;
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
		for (let i$2 = 0; i$2 < numAnimationTypes; i$2++) {
			const type = reversePriorityOrder[i$2];
			const typeState = state[type];
			const prop = props[type] !== void 0 ? props[type] : context[type];
			const propIsVariant = isVariantLabel(prop);
			const activeDelta = type === changedActiveType ? typeState.isActive : null;
			if (activeDelta === false) removedVariantIndex = i$2;
			let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
			if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) isInherited = false;
			typeState.protectedKeys = { ...encounteredKeys };
			if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") continue;
			const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
			let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i$2 > removedVariantIndex && propIsVariant;
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
				const next$1 = resolvedValues[key];
				const prev$1 = prevResolvedValues[key];
				if (encounteredKeys.hasOwnProperty(key)) continue;
				let valueHasChanged = false;
				if (isKeyframesTarget(next$1) && isKeyframesTarget(prev$1)) valueHasChanged = !shallowCompare(next$1, prev$1);
				else valueHasChanged = next$1 !== prev$1;
				if (valueHasChanged) if (next$1 !== void 0 && next$1 !== null) markToAnimate(key);
				else removedKeys.add(key);
				else if (next$1 !== void 0 && removedKeys.has(key)) markToAnimate(key);
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
			const needsAnimating = !willAnimateViaParent || handledRemovedValues;
			if (shouldAnimateType && needsAnimating) animations$1.push(...definitionList.map((animation) => ({
				animation,
				options: { type }
			})));
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
			isInitialRender = true;
		}
	};
}
function checkVariantsDidChange(prev$1, next$1) {
	if (typeof next$1 === "string") return next$1 !== prev$1;
	else if (Array.isArray(next$1)) return !shallowCompare(next$1, prev$1);
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
	constructor(node$1) {
		this.isMounted = false;
		this.node = node$1;
	}
	update() {}
};
var AnimationFeature = class extends Feature {
	constructor(node$1) {
		super(node$1);
		node$1.animationState || (node$1.animationState = createAnimationState(node$1));
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
let id$1 = 0;
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
const animations = {
	animation: { Feature: AnimationFeature },
	exit: { Feature: ExitAnimationFeature }
};
function addDomEvent(target, eventName, handler, options = { passive: true }) {
	target.addEventListener(eventName, handler, options);
	return () => target.removeEventListener(eventName, handler);
}
const isPrimaryPointer = (event) => {
	if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
	else return event.isPrimary !== false;
};
function extractEventInfo(event) {
	return { point: {
		x: event.pageX,
		y: event.pageY
	} };
}
const addPointerInfo = (handler) => {
	return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};
function addPointerEvent(target, eventName, handler, options) {
	return addDomEvent(target, eventName, addPointerInfo(handler), options);
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
function convertBoxToBoundingBox({ x: x$1, y: y$1 }) {
	return {
		top: y$1.min,
		right: x$1.max,
		bottom: y$1.max,
		left: x$1.min
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
const SCALE_PRECISION = 1e-4;
const SCALE_MIN = 1 - SCALE_PRECISION;
const SCALE_MAX = 1 + SCALE_PRECISION;
const TRANSLATE_PRECISION = .01;
const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
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
const createAxisDelta = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
});
const createDelta = () => ({
	x: createAxisDelta(),
	y: createAxisDelta()
});
const createAxis = () => ({
	min: 0,
	max: 0
});
const createBox = () => ({
	x: createAxis(),
	y: createAxis()
});
function eachAxis(callback) {
	return [callback("x"), callback("y")];
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
	const distanceFromOrigin = point - originPoint;
	const scaled = scale$1 * distanceFromOrigin;
	return originPoint + scaled;
}
function applyPointDelta(point, translate, scale$1, originPoint, boxScale) {
	if (boxScale !== void 0) point = scalePoint(point, boxScale, originPoint);
	return scalePoint(point, scale$1, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale$1 = 1, originPoint, boxScale) {
	axis.min = applyPointDelta(axis.min, translate, scale$1, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale$1, originPoint, boxScale);
}
function applyBoxDelta(box$1, { x: x$1, y: y$1 }) {
	applyAxisDelta(box$1.x, x$1.translate, x$1.scale, x$1.originPoint);
	applyAxisDelta(box$1.y, y$1.translate, y$1.scale, y$1.originPoint);
}
const TREE_SCALE_SNAP_MIN = .999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box$1, treeScale, treePath, isSharedTransition = false) {
	const treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	let node$1;
	let delta;
	for (let i$2 = 0; i$2 < treeLength; i$2++) {
		node$1 = treePath[i$2];
		delta = node$1.projectionDelta;
		const { visualElement } = node$1.options;
		if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") continue;
		if (isSharedTransition && node$1.options.layoutScroll && node$1.scroll && node$1 !== node$1.root) transformBox(box$1, {
			x: -node$1.scroll.offset.x,
			y: -node$1.scroll.offset.y
		});
		if (delta) {
			treeScale.x *= delta.x.scale;
			treeScale.y *= delta.y.scale;
			applyBoxDelta(box$1, delta);
		}
		if (isSharedTransition && hasTransform(node$1.latestValues)) transformBox(box$1, node$1.latestValues);
	}
	if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) treeScale.x = 1;
	if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) treeScale.y = 1;
}
function translateAxis(axis, distance$1) {
	axis.min = axis.min + distance$1;
	axis.max = axis.max + distance$1;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = .5) {
	const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
	applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
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
const getContextWindow = ({ current }) => {
	return current ? current.ownerDocument.defaultView : null;
};
const distance = (a$2, b$1) => Math.abs(a$2 - b$1);
function distance2D(a$2, b$1) {
	const xDelta = distance(a$2.x, b$1.x);
	const yDelta = distance(a$2.y, b$1.y);
	return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
var PanSession = class {
	constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
		this.startEvent = null;
		this.lastMoveEvent = null;
		this.lastMoveEventInfo = null;
		this.handlers = {};
		this.contextWindow = window;
		this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const info$1 = getPanInfo(this.lastMoveEventInfo, this.history);
			const isPanStarted = this.startEvent !== null;
			const isDistancePastThreshold = distance2D(info$1.offset, {
				x: 0,
				y: 0
			}) >= 3;
			if (!isPanStarted && !isDistancePastThreshold) return;
			const { point: point$1 } = info$1;
			const { timestamp: timestamp$1 } = frameData;
			this.history.push({
				...point$1,
				timestamp: timestamp$1
			});
			const { onStart, onMove } = this.handlers;
			if (!isPanStarted) {
				onStart && onStart(this.lastMoveEvent, info$1);
				this.startEvent = this.lastMoveEvent;
			}
			onMove && onMove(this.lastMoveEvent, info$1);
		};
		this.handlePointerMove = (event$1, info$1) => {
			this.lastMoveEvent = event$1;
			this.lastMoveEventInfo = transformPoint(info$1, this.transformPagePoint);
			frame.update(this.updatePoint, true);
		};
		this.handlePointerUp = (event$1, info$1) => {
			this.end();
			const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
			if (this.dragSnapToOrigin) resumeAnimation && resumeAnimation();
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const panInfo = getPanInfo(event$1.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info$1, this.transformPagePoint), this.history);
			if (this.startEvent && onEnd) onEnd(event$1, panInfo);
			onSessionEnd && onSessionEnd(event$1, panInfo);
		};
		if (!isPrimaryPointer(event)) return;
		this.dragSnapToOrigin = dragSnapToOrigin;
		this.handlers = handlers;
		this.transformPagePoint = transformPagePoint;
		this.contextWindow = contextWindow || window;
		const info = extractEventInfo(event);
		const initialInfo = transformPoint(info, this.transformPagePoint);
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
function subtractPoint(a$2, b$1) {
	return {
		x: a$2.x - b$1.x,
		y: a$2.y - b$1.y
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
	let i$2 = history.length - 1;
	let timestampedPoint = null;
	const lastPoint = lastDevicePoint(history);
	while (i$2 >= 0) {
		timestampedPoint = history[i$2];
		if (lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta)) break;
		i$2--;
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
const defaultElastic = .35;
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
const isDragging = {
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
const elementDragControls = /* @__PURE__ */ new WeakMap();
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
		this.visualElement = visualElement;
	}
	start(originEvent, { snapToCursor = false } = {}) {
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
						if (measuredAxis) {
							const length$1 = calcLength(measuredAxis);
							current = length$1 * (parseFloat(current) / 100);
						}
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
		const onSessionEnd = (event, info) => this.stop(event, info);
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
			contextWindow: getContextWindow(this.visualElement)
		});
	}
	stop(event, info) {
		const isDragging$1 = this.isDragging;
		this.cancel();
		if (!isDragging$1) return;
		const { velocity } = info;
		this.startAnimation(velocity);
		const { onDragEnd } = this.getProps();
		if (onDragEnd) frame.postRender(() => onDragEnd(event, info));
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
		let next$1 = this.originPoint[axis] + offset[axis];
		if (this.constraints && this.constraints[axis]) next$1 = applyConstraints(next$1, this.constraints[axis], this.elastic[axis]);
		axisValue.set(next$1);
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
		invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
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
	constructor(node$1) {
		super(node$1);
		this.removeGroupControls = noop;
		this.removeListeners = noop;
		this.controls = new VisualElementDragControls(node$1);
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
const asyncHandler = (handler) => (event, info) => {
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
const globalProjectionState = {
	hasAnimatedSinceResize: true,
	hasEverUpdated: false
};
function pixelsToPercent(pixels, axis) {
	if (axis.max === axis.min) return 0;
	return pixels / (axis.max - axis.min) * 100;
}
const correctBorderRadius = { correct: (latest, node$1) => {
	if (!node$1.target) return latest;
	if (typeof latest === "string") if (px.test(latest)) latest = parseFloat(latest);
	else return latest;
	const x$1 = pixelsToPercent(latest, node$1.target.x);
	const y$1 = pixelsToPercent(latest, node$1.target.y);
	return `${x$1}% ${y$1}%`;
} };
const correctBoxShadow = { correct: (latest, { treeScale, projectionDelta }) => {
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
var MeasureLayoutWithContext = class extends import_react.Component {
	componentDidMount() {
		const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
		const { projection } = visualElement;
		addScaleCorrector(defaultScaleCorrectors);
		if (projection) {
			if (layoutGroup.group) layoutGroup.group.add(projection);
			if (switchLayoutGroup && switchLayoutGroup.register && layoutId) switchLayoutGroup.register(projection);
			projection.root.didUpdate();
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
const defaultScaleCorrectors = {
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
function animateSingleValue(value, keyframes$1, options) {
	const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
	motionValue$1.start(animateMotionValue("", motionValue$1, keyframes$1, options));
	return motionValue$1.animation;
}
function isSVGElement(element) {
	return element instanceof SVGElement && element.tagName !== "svg";
}
const compareByDepth = (a$2, b$1) => a$2.depth - b$1.depth;
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
const borders = [
	"TopLeft",
	"TopRight",
	"BottomLeft",
	"BottomRight"
];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress$1, shouldCrossfadeOpacity, isOnlyMember) {
	if (shouldCrossfadeOpacity) {
		target.opacity = mixNumber(0, lead.opacity ?? 1, easeCrossfadeIn(progress$1));
		target.opacityExit = mixNumber(follow.opacity ?? 1, 0, easeCrossfadeOut(progress$1));
	} else if (isOnlyMember) target.opacity = mixNumber(follow.opacity ?? 1, lead.opacity ?? 1, progress$1);
	for (let i$2 = 0; i$2 < numBorders; i$2++) {
		const borderLabel = `border${borders[i$2]}Radius`;
		let followRadius = getRadius(follow, borderLabel);
		let leadRadius = getRadius(lead, borderLabel);
		if (followRadius === void 0 && leadRadius === void 0) continue;
		followRadius || (followRadius = 0);
		leadRadius || (leadRadius = 0);
		const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
		if (canMix) {
			target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress$1), 0);
			if (percent.test(leadRadius) || percent.test(followRadius)) target[borderLabel] += "%";
		} else target[borderLabel] = leadRadius;
	}
	if (follow.rotate || lead.rotate) target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress$1);
}
function getRadius(values, radiusName) {
	return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
const easeCrossfadeIn = /* @__PURE__ */ compress(0, .5, circOut);
const easeCrossfadeOut = /* @__PURE__ */ compress(.5, .95, noop);
function compress(min, max, easing) {
	return (p$1) => {
		if (p$1 < min) return 0;
		if (p$1 > max) return 1;
		return easing(/* @__PURE__ */ progress(min, max, p$1));
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
		const relativeProgress = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100);
		translate = relativeProgress - sourceAxis.min;
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
const xKeys = [
	"x",
	"scaleX",
	"originX"
];
const yKeys = [
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
function axisEquals(a$2, b$1) {
	return a$2.min === b$1.min && a$2.max === b$1.max;
}
function boxEquals(a$2, b$1) {
	return axisEquals(a$2.x, b$1.x) && axisEquals(a$2.y, b$1.y);
}
function axisEqualsRounded(a$2, b$1) {
	return Math.round(a$2.min) === Math.round(b$1.min) && Math.round(a$2.max) === Math.round(b$1.max);
}
function boxEqualsRounded(a$2, b$1) {
	return axisEqualsRounded(a$2.x, b$1.x) && axisEqualsRounded(a$2.y, b$1.y);
}
function aspectRatio(box$1) {
	return calcLength(box$1.x) / calcLength(box$1.y);
}
function axisDeltaEquals(a$2, b$1) {
	return a$2.translate === b$1.translate && a$2.scale === b$1.scale && a$2.originPoint === b$1.originPoint;
}
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(node$1) {
		addUniqueItem(this.members, node$1);
		node$1.scheduleRender();
	}
	remove(node$1) {
		removeItem(this.members, node$1);
		if (node$1 === this.prevLead) this.prevLead = void 0;
		if (node$1 === this.lead) {
			const prevLead = this.members[this.members.length - 1];
			if (prevLead) this.promote(prevLead);
		}
	}
	relegate(node$1) {
		const indexOfNode = this.members.findIndex((member) => node$1 === member);
		if (indexOfNode === 0) return false;
		let prevLead;
		for (let i$2 = indexOfNode; i$2 >= 0; i$2--) {
			const member = this.members[i$2];
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
	promote(node$1, preserveFollowOpacity) {
		const prevLead = this.lead;
		if (node$1 === prevLead) return;
		this.prevLead = prevLead;
		this.lead = node$1;
		node$1.show();
		if (prevLead) {
			prevLead.instance && prevLead.scheduleRender();
			node$1.scheduleRender();
			node$1.resumeFrom = prevLead;
			if (preserveFollowOpacity) node$1.resumeFrom.preserveOpacity = true;
			if (prevLead.snapshot) {
				node$1.snapshot = prevLead.snapshot;
				node$1.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
			}
			if (node$1.root && node$1.root.isUpdating) node$1.isLayoutDirty = true;
			const { crossfade } = node$1.options;
			if (crossfade === false) prevLead.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((node$1) => {
			const { options, resumingFrom } = node$1;
			options.onExitComplete && options.onExitComplete();
			if (resumingFrom) resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((node$1) => {
			node$1.instance && node$1.scheduleRender(false);
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
const metrics = {
	nodes: 0,
	calculatedTargetDeltas: 0,
	calculatedProjections: 0
};
const transformAxes = [
	"",
	"X",
	"Y",
	"Z"
];
const hiddenVisibility = { visibility: "hidden" };
const animationTarget = 1e3;
let id = 0;
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
			this.hasProjected = false;
			this.isVisible = true;
			this.animationProgress = 0;
			this.sharedNodes = /* @__PURE__ */ new Map();
			this.latestValues = latestValues;
			this.root = parent ? parent.root || parent : this;
			this.path = parent ? [...parent.path, parent] : [];
			this.parent = parent;
			this.depth = parent ? parent.depth + 1 : 0;
			for (let i$2 = 0; i$2 < this.path.length; i$2++) this.path[i$2].shouldResetTransform = true;
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
			this.isSVG = isSVGElement(instance);
			this.instance = instance;
			const { layoutId, layout: layout$1, visualElement } = this.options;
			if (visualElement && !visualElement.current) visualElement.mount(instance);
			this.root.nodes.add(this);
			this.parent && this.parent.children.add(this);
			if (this.root.hasTreeAnimated && (layout$1 || layoutId)) this.isLayoutDirty = true;
			if (attachResizeListener) {
				let cancelDelay;
				const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
				attachResizeListener(instance, () => {
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
					this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
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
			for (let i$2 = 0; i$2 < this.path.length; i$2++) {
				const node$1 = this.path[i$2];
				node$1.shouldResetTransform = true;
				node$1.updateScroll("snapshot");
				if (node$1.options.layoutRoot) node$1.willUpdate(false);
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
			const updateWasBlocked = this.isUpdateBlocked();
			if (updateWasBlocked) {
				this.unblockUpdate();
				this.clearAllSnapshots();
				this.nodes.forEach(clearMeasurements);
				return;
			}
			if (!this.isUpdating) this.nodes.forEach(clearIsLayoutDirty);
			this.isUpdating = false;
			this.nodes.forEach(resetTransformStyle);
			this.nodes.forEach(updateLayout);
			this.nodes.forEach(notifyLayoutUpdate);
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
			if (this.resumeFrom && !this.resumeFrom.instance) for (let i$2 = 0; i$2 < this.path.length; i$2++) {
				const node$1 = this.path[i$2];
				node$1.updateScroll();
			}
			const prevLayout = this.layout;
			this.layout = this.measure(false);
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
			const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
			if (!wasInScrollRoot) {
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
			for (let i$2 = 0; i$2 < this.path.length; i$2++) {
				const node$1 = this.path[i$2];
				const { scroll, options } = node$1;
				if (node$1 !== this.root && scroll && options.layoutScroll) {
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
			for (let i$2 = 0; i$2 < this.path.length; i$2++) {
				const node$1 = this.path[i$2];
				if (!transformOnly && node$1.options.layoutScroll && node$1.scroll && node$1 !== node$1.root) transformBox(withTransforms, {
					x: -node$1.scroll.offset.x,
					y: -node$1.scroll.offset.y
				});
				if (!hasTransform(node$1.latestValues)) continue;
				transformBox(withTransforms, node$1.latestValues);
			}
			if (hasTransform(this.latestValues)) transformBox(withTransforms, this.latestValues);
			return withTransforms;
		}
		removeTransform(box$1) {
			const boxWithoutTransform = createBox();
			copyBoxInto(boxWithoutTransform, box$1);
			for (let i$2 = 0; i$2 < this.path.length; i$2++) {
				const node$1 = this.path[i$2];
				if (!node$1.instance) continue;
				if (!hasTransform(node$1.latestValues)) continue;
				hasScale(node$1.latestValues) && node$1.updateSnapshot();
				const sourceBox = createBox();
				const nodeBox = node$1.measurePageBox();
				copyBoxInto(sourceBox, nodeBox);
				removeBoxTransforms(boxWithoutTransform, node$1.latestValues, node$1.snapshot ? node$1.snapshot.layoutBox : void 0, sourceBox);
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
			const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
			if (canSkip) return;
			const { layout: layout$1, layoutId } = this.options;
			if (!this.layout || !(layout$1 || layoutId)) return;
			this.resolvedRelativeTargetAt = frameData.timestamp;
			if (!this.targetDelta && !this.relativeTarget) {
				const relativeParent = this.getClosestProjectingParent();
				if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
					this.relativeParent = relativeParent;
					this.forceRelativeParentToResolveTarget();
					this.relativeTarget = createBox();
					this.relativeTargetOrigin = createBox();
					calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
					copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
				} else this.relativeParent = this.relativeTarget = void 0;
			}
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
				const relativeParent = this.getClosestProjectingParent();
				if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
					this.relativeParent = relativeParent;
					this.forceRelativeParentToResolveTarget();
					this.relativeTarget = createBox();
					this.relativeTargetOrigin = createBox();
					calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
					copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
				} else this.relativeParent = this.relativeTarget = void 0;
			}
			if (statsBuffer.value) metrics.calculatedTargetDeltas++;
		}
		getClosestProjectingParent() {
			if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) return void 0;
			if (this.parent.isProjecting()) return this.parent;
			else return this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
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
			const snapshotSource = snapshot ? snapshot.source : void 0;
			const layoutSource = this.layout ? this.layout.source : void 0;
			const isSharedLayoutAnimation = snapshotSource !== layoutSource;
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
			this.currentAnimation?.stop(false);
			this.resumingFrom?.currentAnimation?.stop(false);
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
				this.currentAnimation.stop(false);
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
		registerSharedNode(layoutId, node$1) {
			if (!this.sharedNodes.has(layoutId)) this.sharedNodes.set(layoutId, new NodeStack());
			const stack = this.sharedNodes.get(layoutId);
			stack.add(node$1);
			const config = node$1.options.initialPromotionConfig;
			node$1.promote({
				transition: config ? config.transition : void 0,
				preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node$1) : void 0
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
			for (let i$2 = 0; i$2 < transformAxes.length; i$2++) {
				resetDistortingTransform(`rotate${transformAxes[i$2]}`, visualElement, resetValues, this.animationValues);
				resetDistortingTransform(`skew${transformAxes[i$2]}`, visualElement, resetValues, this.animationValues);
			}
			visualElement.render();
			for (const key in resetValues) {
				visualElement.setStaticValue(key, resetValues[key]);
				if (this.animationValues) this.animationValues[key] = resetValues[key];
			}
			visualElement.scheduleRender();
		}
		getProjectionStyles(styleProp) {
			if (!this.instance || this.isSVG) return void 0;
			if (!this.isVisible) return hiddenVisibility;
			const styles = { visibility: "" };
			const transformTemplate = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = false;
				styles.opacity = "";
				styles.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
				return styles;
			}
			const lead = this.getLead();
			if (!this.projectionDelta || !this.layout || !lead.target) {
				const emptyStyles = {};
				if (this.options.layoutId) {
					emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
					emptyStyles.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				}
				if (this.hasProjected && !hasTransform(this.latestValues)) {
					emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
					this.hasProjected = false;
				}
				return emptyStyles;
			}
			const valuesToRender = lead.animationValues || lead.latestValues;
			this.applyTransformsToTarget();
			styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
			if (transformTemplate) styles.transform = transformTemplate(valuesToRender, styles.transform);
			const { x: x$1, y: y$1 } = this.projectionDelta;
			styles.transformOrigin = `${x$1.origin * 100}% ${y$1.origin * 100}% 0`;
			if (lead.animationValues) styles.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
			else styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
			for (const key in scaleCorrectors) {
				if (valuesToRender[key] === void 0) continue;
				const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
				const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
				if (applyTo) {
					const num = applyTo.length;
					for (let i$2 = 0; i$2 < num; i$2++) styles[applyTo[i$2]] = corrected;
				} else if (isCSSVariable) this.options.visualElement.renderState.vars[key] = corrected;
				else styles[key] = corrected;
			}
			if (this.options.layoutId) styles.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
			return styles;
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((node$1) => node$1.currentAnimation?.stop(false));
			this.root.nodes.forEach(clearMeasurements);
			this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(node$1) {
	node$1.updateLayout();
}
function notifyLayoutUpdate(node$1) {
	const snapshot = node$1.resumeFrom?.snapshot || node$1.snapshot;
	if (node$1.isLead() && node$1.layout && snapshot && node$1.hasListeners("didUpdate")) {
		const { layoutBox: layout$1, measuredBox: measuredLayout } = node$1.layout;
		const { animationType } = node$1.options;
		const isShared = snapshot.source !== node$1.layout.source;
		if (animationType === "size") eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length$1 = calcLength(axisSnapshot);
			axisSnapshot.min = layout$1[axis].min;
			axisSnapshot.max = axisSnapshot.min + length$1;
		});
		else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout$1)) eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length$1 = calcLength(layout$1[axis]);
			axisSnapshot.max = axisSnapshot.min + length$1;
			if (node$1.relativeTarget && !node$1.currentAnimation) {
				node$1.isProjectionDirty = true;
				node$1.relativeTarget[axis].max = node$1.relativeTarget[axis].min + length$1;
			}
		});
		const layoutDelta = createDelta();
		calcBoxDelta(layoutDelta, layout$1, snapshot.layoutBox);
		const visualDelta = createDelta();
		if (isShared) calcBoxDelta(visualDelta, node$1.applyTransform(measuredLayout, true), snapshot.measuredBox);
		else calcBoxDelta(visualDelta, layout$1, snapshot.layoutBox);
		const hasLayoutChanged = !isDeltaZero(layoutDelta);
		let hasRelativeLayoutChanged = false;
		if (!node$1.resumeFrom) {
			const relativeParent = node$1.getClosestProjectingParent();
			if (relativeParent && !relativeParent.resumeFrom) {
				const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
				if (parentSnapshot && parentLayout) {
					const relativeSnapshot = createBox();
					calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
					const relativeLayout = createBox();
					calcRelativePosition(relativeLayout, layout$1, parentLayout.layoutBox);
					if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) hasRelativeLayoutChanged = true;
					if (relativeParent.options.layoutRoot) {
						node$1.relativeTarget = relativeLayout;
						node$1.relativeTargetOrigin = relativeSnapshot;
						node$1.relativeParent = relativeParent;
					}
				}
			}
		}
		node$1.notifyListeners("didUpdate", {
			layout: layout$1,
			snapshot,
			delta: visualDelta,
			layoutDelta,
			hasLayoutChanged,
			hasRelativeLayoutChanged
		});
	} else if (node$1.isLead()) {
		const { onExitComplete } = node$1.options;
		onExitComplete && onExitComplete();
	}
	node$1.options.transition = void 0;
}
function propagateDirtyNodes(node$1) {
	if (statsBuffer.value) metrics.nodes++;
	if (!node$1.parent) return;
	if (!node$1.isProjecting()) node$1.isProjectionDirty = node$1.parent.isProjectionDirty;
	node$1.isSharedProjectionDirty || (node$1.isSharedProjectionDirty = Boolean(node$1.isProjectionDirty || node$1.parent.isProjectionDirty || node$1.parent.isSharedProjectionDirty));
	node$1.isTransformDirty || (node$1.isTransformDirty = node$1.parent.isTransformDirty);
}
function cleanDirtyNodes(node$1) {
	node$1.isProjectionDirty = node$1.isSharedProjectionDirty = node$1.isTransformDirty = false;
}
function clearSnapshot(node$1) {
	node$1.clearSnapshot();
}
function clearMeasurements(node$1) {
	node$1.clearMeasurements();
}
function clearIsLayoutDirty(node$1) {
	node$1.isLayoutDirty = false;
}
function resetTransformStyle(node$1) {
	const { visualElement } = node$1.options;
	if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) visualElement.notify("BeforeLayoutMeasure");
	node$1.resetTransform();
}
function finishAnimation(node$1) {
	node$1.finishAnimation();
	node$1.targetDelta = node$1.relativeTarget = node$1.target = void 0;
	node$1.isProjectionDirty = true;
}
function resolveTargetDelta(node$1) {
	node$1.resolveTargetDelta();
}
function calcProjection(node$1) {
	node$1.calcProjection();
}
function resetSkewAndRotation(node$1) {
	node$1.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
	stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p$1) {
	output.translate = mixNumber(delta.translate, 0, p$1);
	output.scale = mixNumber(delta.scale, 1, p$1);
	output.origin = delta.origin;
	output.originPoint = delta.originPoint;
}
function mixAxis(output, from$1, to, p$1) {
	output.min = mixNumber(from$1.min, to.min, p$1);
	output.max = mixNumber(from$1.max, to.max, p$1);
}
function mixBox(output, from$1, to, p$1) {
	mixAxis(output.x, from$1.x, to.x, p$1);
	mixAxis(output.y, from$1.y, to.y, p$1);
}
function hasOpacityCrossfade(node$1) {
	return node$1.animationValues && node$1.animationValues.opacityExit !== void 0;
}
const defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
};
const userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
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
function checkNodeWasScrollRoot(node$1) {
	return node$1 !== node$1.root && node$1.scroll?.wasRoot;
}
const DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body.scrollLeft,
		y: document.documentElement.scrollTop || document.body.scrollTop
	}),
	checkIsScrollRoot: () => true
});
const rootProjectionNode = { current: void 0 };
const HTMLProjectionNode = createProjectionNode({
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
const drag = {
	pan: { Feature: PanGesture },
	drag: {
		Feature: DragGesture,
		ProjectionNode: HTMLProjectionNode,
		MeasureLayout
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
function handleHoverEvent(node$1, event, lifecycle) {
	const { props } = node$1;
	if (node$1.animationState && props.whileHover) node$1.animationState.setActive("whileHover", lifecycle === "Start");
	const eventName = "onHover" + lifecycle;
	const callback = props[eventName];
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
const isNodeOrChild = (parent, child) => {
	if (!child) return false;
	else if (parent === child) return true;
	else return isNodeOrChild(parent, child.parentElement);
};
const focusableElements = new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
function isElementKeyboardAccessible(element) {
	return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}
const isPressing = /* @__PURE__ */ new WeakSet();
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
const enableKeyboardPress = (focusEvent, eventOptions) => {
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
		const pointerDownTarget = options.useGlobalTarget ? window : target;
		pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
		if (target instanceof HTMLElement) {
			target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
			if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) target.tabIndex = 0;
		}
	});
	return cancelEvents;
}
function handlePressEvent(node$1, event, lifecycle) {
	const { props } = node$1;
	if (node$1.current instanceof HTMLButtonElement && node$1.current.disabled) return;
	if (node$1.animationState && props.whileTap) node$1.animationState.setActive("whileTap", lifecycle === "Start");
	const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
	const callback = props[eventName];
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
const observerCallbacks = /* @__PURE__ */ new WeakMap();
const observers = /* @__PURE__ */ new WeakMap();
const fireObserverCallback = (entry) => {
	const callback = observerCallbacks.get(entry.target);
	callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
	entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root,...options }) {
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
const thresholdNames = {
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
		const hasOptionsChanged = [
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(props, prevProps));
		if (hasOptionsChanged) this.startObserver();
	}
	unmount() {}
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
	return (name) => viewport[name] !== prevViewport[name];
}
const gestureAnimations = {
	inView: { Feature: InViewFeature },
	tap: { Feature: PressGesture },
	focus: { Feature: FocusGesture },
	hover: { Feature: HoverGesture }
};
const layout = { layout: {
	ProjectionNode: HTMLProjectionNode,
	MeasureLayout
} };
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
	hasReducedMotionListener.current = true;
	if (!isBrowser) return;
	if (window.matchMedia) {
		const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
		const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
		motionMediaQuery.addListener(setReducedMotionPreferences);
		setReducedMotionPreferences();
	} else prefersReducedMotion.current = false;
}
const visualElementStore = /* @__PURE__ */ new WeakMap();
function updateMotionValuesFromProps(element, next$1, prev$1) {
	for (const key in next$1) {
		const nextValue = next$1[key];
		const prevValue = prev$1[key];
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
	for (const key in prev$1) if (next$1[key] === void 0) element.removeValue(key);
	return next$1;
}
const isNumericalString = (v$1) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v$1);
const isZeroValueString = (v$1) => /^0[^.\s]+$/u.test(v$1);
const auto = {
	test: (v$1) => v$1 === "auto",
	parse: (v$1) => v$1
};
const testValueType = (v$1) => (type) => type.test(v$1);
const dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	auto
];
const findDimensionValueType = (v$1) => dimensionValueTypes.find(testValueType(v$1));
const valueTypes = [
	...dimensionValueTypes,
	color,
	complex
];
const findValueType = (v$1) => valueTypes.find(testValueType(v$1));
const maxDefaults = new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function applyDefaultFilter(v$1) {
	const [name, value] = v$1.slice(0, -1).split("(");
	if (name === "drop-shadow") return v$1;
	const [number$1] = value.match(floatRegex) || [];
	if (!number$1) return v$1;
	const unit$1 = value.replace(number$1, "");
	let defaultValue = maxDefaults.has(name) ? 1 : 0;
	if (number$1 !== value) defaultValue *= 100;
	return name + "(" + defaultValue + unit$1 + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
	...complex,
	getAnimatableNone: (v$1) => {
		const functions = v$1.match(functionRegex);
		return functions ? functions.map(applyDefaultFilter).join(" ") : v$1;
	}
};
const defaultValueTypes = {
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
const getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
	let defaultValueType = getDefaultValueType(key);
	if (defaultValueType !== filter) defaultValueType = complex;
	return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const propEventHandlers = [
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
		const { willChange,...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
		for (const key in initialMotionValues) {
			const value = initialMotionValues[key];
			if (latestValues[key] !== void 0 && isMotionValue(value)) value.set(latestValues[key], false);
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
		if (this.parent) this.parent.children.add(this);
		this.update(this.props, this.presenceContext);
	}
	unmount() {
		this.projection && this.projection.unmount();
		cancelFrame(this.notifyUpdate);
		cancelFrame(this.render);
		this.valueSubscriptions.forEach((remove) => remove());
		this.valueSubscriptions.clear();
		this.removeFromVariantTree && this.removeFromVariantTree();
		this.parent && this.parent.children.delete(this);
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
	bindToMotionValue(key, value) {
		if (this.valueSubscriptions.has(key)) this.valueSubscriptions.get(key)();
		const valueIsTransform = transformProps.has(key);
		if (valueIsTransform && this.onBindTransform) this.onBindTransform();
		const removeOnChange = value.on("change", (latestValue) => {
			this.latestValues[key] = latestValue;
			this.props.onUpdate && frame.preRender(this.notifyUpdate);
			if (valueIsTransform && this.projection) this.projection.isTransformDirty = true;
		});
		const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
		let removeSyncCheck;
		if (window.MotionCheckAppearSync) removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
		this.valueSubscriptions.set(key, () => {
			removeOnChange();
			removeOnRenderRequest();
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
		for (let i$2 = 0; i$2 < propEventHandlers.length; i$2++) {
			const key = propEventHandlers[i$2];
			if (this.propEventSubscriptions[key]) {
				this.propEventSubscriptions[key]();
				delete this.propEventSubscriptions[key];
			}
			const listenerName = "on" + key;
			const listener = props[listenerName];
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
};
const splitCSSVariableRegex = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
	const match$1 = splitCSSVariableRegex.exec(current);
	if (!match$1) return [,];
	const [, token1, token2, fallback] = match$1;
	return [`--${token1 ?? token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
	invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
	const [token$1, fallback] = parseCSSVariable(current);
	if (!token$1) return;
	const resolved = window.getComputedStyle(element).getPropertyValue(token$1);
	if (resolved) {
		const trimmed = resolved.trim();
		return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
	}
	return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
function isNone(value) {
	if (typeof value === "number") return value === 0;
	else if (value !== null) return value === "none" || value === "0" || isZeroValueString(value);
	else return true;
}
const invalidTemplates = new Set([
	"auto",
	"none",
	"0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
	let i$2 = 0;
	let animatableTemplate = void 0;
	while (i$2 < unresolvedKeyframes.length && !animatableTemplate) {
		const keyframe = unresolvedKeyframes[i$2];
		if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) animatableTemplate = unresolvedKeyframes[i$2];
		i$2++;
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
		for (let i$2 = 0; i$2 < unresolvedKeyframes.length; i$2++) {
			let keyframe = unresolvedKeyframes[i$2];
			if (typeof keyframe === "string") {
				keyframe = keyframe.trim();
				if (isCSSVariableToken(keyframe)) {
					const resolved = getVariableValue(keyframe, element.current);
					if (resolved !== void 0) unresolvedKeyframes[i$2] = resolved;
					if (i$2 === unresolvedKeyframes.length - 1) this.finalKeyframe = keyframe;
				}
			}
		}
		this.resolveNoneKeyframes();
		if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) return;
		const [origin, target] = unresolvedKeyframes;
		const originType = findDimensionValueType(origin);
		const targetType = findDimensionValueType(target);
		if (originType === targetType) return;
		if (isNumOrPxType(originType) && isNumOrPxType(targetType)) for (let i$2 = 0; i$2 < unresolvedKeyframes.length; i$2++) {
			const value = unresolvedKeyframes[i$2];
			if (typeof value === "string") unresolvedKeyframes[i$2] = parseFloat(value);
		}
		else if (positionalValues[name]) this.needsMeasurement = true;
	}
	resolveNoneKeyframes() {
		const { unresolvedKeyframes, name } = this;
		const noneKeyframeIndexes = [];
		for (let i$2 = 0; i$2 < unresolvedKeyframes.length; i$2++) if (unresolvedKeyframes[i$2] === null || isNone(unresolvedKeyframes[i$2])) noneKeyframeIndexes.push(i$2);
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
var DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(a$2, b$1) {
		return a$2.compareDocumentPosition(b$1) & 2 ? 1 : -1;
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
	Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
	for (const key in vars) element.style.setProperty(key, vars[key]);
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
		if (transformProps.has(key)) return readTransformValue(instance, key);
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
const camelCaseAttributes = new Set([
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
const createDomVisualElement = (Component$1, options) => {
	return isSVGComponent(Component$1) ? new SVGVisualElement(options) : new HTMLVisualElement(options, { allowProjection: Component$1 !== import_react.Fragment });
};
const createMotionComponent = /* @__PURE__ */ createMotionComponentFactory({
	...animations,
	...gestureAnimations,
	...drag,
	...layout
}, createDomVisualElement);
const motion = /* @__PURE__ */ createDOMMotionComponentProxy(createMotionComponent);
const logger$3 = loggerService.withContext("FallbackFavicon");
const FAILED_FAVICON_CACHE_PREFIX = "failed_favicon_";
const FAILED_FAVICON_CACHE_DURATION = 1440 * 60 * 1e3;
const isUrlFailedRecently = (url) => {
	const cacheKey = `${FAILED_FAVICON_CACHE_PREFIX}${url}`;
	const cachedTimestamp = localStorage.getItem(cacheKey);
	if (!cachedTimestamp) return false;
	const timestamp = parseInt(cachedTimestamp, 10);
	const now$1 = Date.now();
	if (now$1 - timestamp < FAILED_FAVICON_CACHE_DURATION) return true;
	localStorage.removeItem(cacheKey);
	return false;
};
const markUrlAsFailed = (url) => {
	const cacheKey = `${FAILED_FAVICON_CACHE_PREFIX}${url}`;
	localStorage.setItem(cacheKey, Date.now().toString());
};
const FallbackFavicon = ({ hostname, alt }) => {
	const [faviconState, setFaviconState] = (0, import_react.useState)({ status: "idle" });
	(0, import_react.useEffect)(() => {
		setFaviconState({ status: "loading" });
		const faviconUrls = [
			`https://icon.horse/icon/${hostname}`,
			`https://favicon.splitbee.io/?url=${hostname}`,
			`https://favicon.im/${hostname}`,
			`https://${hostname}/favicon.ico`
		];
		const validFaviconUrls = faviconUrls.filter((url) => !isUrlFailedRecently(url));
		if (validFaviconUrls.length === 0) {
			setFaviconState({
				status: "loaded",
				src: faviconUrls[0]
			});
			return;
		}
		const controller = new AbortController();
		const { signal } = controller;
		const faviconPromises = validFaviconUrls.map((url) => fetch(url, {
			method: "HEAD",
			signal,
			credentials: "omit"
		}).then((response) => {
			if (response.ok) return url;
			if (response.status >= 400) markUrlAsFailed(url);
			throw new Error(`Failed to fetch ${url}`);
		}).catch((error) => {
			if (error.name === "AbortError") throw error;
			return null;
		}));
		const timeoutPromise = new Promise((resolve) => {
			const timer = setTimeout(() => {
				resolve(faviconUrls[0]);
			}, 2e3);
			signal.addEventListener("abort", () => clearTimeout(timer));
		});
		Promise.race([Promise.any(faviconPromises).then((result) => result || faviconUrls[0]).catch(() => faviconUrls[0]), timeoutPromise]).then((url) => {
			setFaviconState({
				status: "loaded",
				src: url
			});
		}).catch((error) => {
			logger$3.error("All favicon requests failed:", error);
			setFaviconState({
				status: "loaded",
				src: faviconUrls[0]
			});
		});
		return () => {
			controller.abort();
		};
	}, [hostname]);
	const handleError = () => {
		if (faviconState.status === "loaded") markUrlAsFailed(faviconState.src);
		setFaviconState({ status: "failed" });
	};
	if (faviconState.status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaviconPlaceholder, { children: hostname.charAt(0).toUpperCase() });
	if (faviconState.status === "loaded") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Favicon, {
		src: faviconState.src,
		alt,
		onError: handleError
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaviconLoading, {});
};
const FaviconLoading = /* @__PURE__ */ dt.div.withConfig({ displayName: "FaviconLoading" })([`width:16px;height:16px;border-radius:4px;background-color:var(--color-background-mute);`]);
const FaviconPlaceholder = /* @__PURE__ */ dt.div.withConfig({ displayName: "FaviconPlaceholder" })([`width:16px;height:16px;border-radius:4px;background-color:var(--color-primary-1);color:var(--color-primary-6);font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:bold;`]);
const Favicon = /* @__PURE__ */ dt.img.withConfig({ displayName: "Favicon" })([`width:16px;height:16px;border-radius:4px;background-color:var(--color-background-mute);`]);
var FallbackFavicon_default = FallbackFavicon;
const logger$2 = loggerService.withContext("Utils:download");
const download = (url, filename) => {
	const SUPPORTED_PREFIXES = [
		"file://",
		"blob:",
		"data:image/png",
		"data:image/jpeg"
	];
	if (SUPPORTED_PREFIXES.some((prefix$1) => url.startsWith(prefix$1))) {
		const link = document.createElement("a");
		link.href = url;
		let resolvedFilename = filename;
		if (!resolvedFilename) if (url.startsWith("file://")) {
			const pathname = new URL(url).pathname;
			resolvedFilename = decodeURIComponent(pathname.substring(pathname.lastIndexOf("/") + 1));
		} else if (url.startsWith("blob:")) resolvedFilename = `${Date.now()}_diagram.svg`;
		else if (url.startsWith("data:")) {
			const mimeMatch = url.match(/^data:([^;,]+)[;,]/);
			const mimeType = mimeMatch && mimeMatch[1];
			const extension = getExtensionFromMimeType(mimeType);
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
				const contentType = response.headers.get("Content-Type");
				const extension = getExtensionFromMimeType(contentType);
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
	}).catch((error) => {
		logger$2.error("Download failed:", error);
		if (error.message) window.toast?.error(`${i18n_default.t("message.download.failed")}：${error.message}`);
		else window.toast?.error(i18n_default.t("message.download.failed"));
	});
};
function getExtensionFromMimeType(mimeType) {
	if (!mimeType) return ".bin";
	const mimeToExtension = {
		"image/jpeg": ".jpg",
		"image/png": ".png",
		"image/gif": ".gif",
		"image/svg+xml": ".svg",
		"application/pdf": ".pdf",
		"text/plain": ".txt",
		"application/msword": ".doc",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx"
	};
	return mimeToExtension[mimeType] || ".bin";
}
const version = "3.7.7";
const VERSION = version;
const _hasBuffer = typeof Buffer === "function";
const _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
const _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
const b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64chs = Array.prototype.slice.call(b64ch);
const b64tab = ((a$2) => {
	let tab = {};
	a$2.forEach((c$2, i$2) => tab[c$2] = i$2);
	return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it$1) => new Uint8Array(Array.prototype.slice.call(it$1, 0));
const _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
const _tidyB64 = (s$2) => s$2.replace(/[^A-Za-z0-9\+\/]/g, "");
const btoaPolyfill = (bin) => {
	let u32, c0, c1, c2, asc = "";
	const pad = bin.length % 3;
	for (let i$2 = 0; i$2 < bin.length;) {
		if ((c0 = bin.charCodeAt(i$2++)) > 255 || (c1 = bin.charCodeAt(i$2++)) > 255 || (c2 = bin.charCodeAt(i$2++)) > 255) throw new TypeError("invalid character found");
		u32 = c0 << 16 | c1 << 8 | c2;
		asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
	}
	return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
const _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
const _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
	const maxargs = 4096;
	let strs = [];
	for (let i$2 = 0, l$2 = u8a.length; i$2 < l$2; i$2 += maxargs) strs.push(_fromCC.apply(null, u8a.subarray(i$2, i$2 + maxargs)));
	return _btoa(strs.join(""));
};
const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
const cb_utob = (c$2) => {
	if (c$2.length < 2) {
		var cc = c$2.charCodeAt(0);
		return cc < 128 ? c$2 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
	} else {
		var cc = 65536 + (c$2.charCodeAt(0) - 55296) * 1024 + (c$2.charCodeAt(1) - 56320);
		return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
	}
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
const utob = (u$1) => u$1.replace(re_utob, cb_utob);
const _encode = _hasBuffer ? (s$2) => Buffer.from(s$2, "utf8").toString("base64") : _TE ? (s$2) => _fromUint8Array(_TE.encode(s$2)) : (s$2) => _btoa(utob(s$2));
const encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
const encodeURI = (src) => encode(src, true);
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc) => {
	switch (cccc.length) {
		case 4:
			var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
			return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
		case 3: return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
		default: return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
	}
};
const btou = (b$1) => b$1.replace(re_btou, cb_btou);
const atobPolyfill = (asc) => {
	asc = asc.replace(/\s+/g, "");
	if (!b64re.test(asc)) throw new TypeError("malformed base64.");
	asc += "==".slice(2 - (asc.length & 3));
	let u24, bin = "", r1, r2;
	for (let i$2 = 0; i$2 < asc.length;) {
		u24 = b64tab[asc.charAt(i$2++)] << 18 | b64tab[asc.charAt(i$2++)] << 12 | (r1 = b64tab[asc.charAt(i$2++)]) << 6 | (r2 = b64tab[asc.charAt(i$2++)]);
		bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
	}
	return bin;
};
const _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
const _toUint8Array = _hasBuffer ? (a$2) => _U8Afrom(Buffer.from(a$2, "base64")) : (a$2) => _U8Afrom(_atob(a$2).split("").map((c$2) => c$2.charCodeAt(0)));
const toUint8Array = (a$2) => _toUint8Array(_unURI(a$2));
const _decode = _hasBuffer ? (a$2) => Buffer.from(a$2, "base64").toString("utf8") : _TD ? (a$2) => _TD.decode(_toUint8Array(a$2)) : (a$2) => btou(_atob(a$2));
const _unURI = (a$2) => _tidyB64(a$2.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
const decode = (src) => _decode(_unURI(src));
const isValid = (src) => {
	if (typeof src !== "string") return false;
	const s$2 = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
	return !/[^\s0-9a-zA-Z\+/]/.test(s$2) || !/[^\s0-9a-zA-Z\-_]/.test(s$2);
};
const _noEnum = (v$1) => {
	return {
		value: v$1,
		enumerable: false,
		writable: true,
		configurable: true
	};
};
const extendString = function() {
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
const extendUint8Array = function() {
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
const extendBuiltins = () => {
	extendString();
	extendUint8Array();
};
const gBase64 = {
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
const types$1 = {
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
const types = {
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
var __classPrivateFieldGet = function(receiver, state, kind, f$2) {
	if (kind === "a" && !f$2) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f$2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f$2 : kind === "a" ? f$2.call(receiver) : f$2 ? f$2.value : state.get(receiver);
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
	getType(path) {
		if (typeof path !== "string") return null;
		const last = path.replace(/^.*[/\\]/s, "").toLowerCase();
		const ext = last.replace(/^.*\./s, "").toLowerCase();
		const hasPath = last.length < path.length;
		const hasDot = ext.length < last.length - 1;
		if (!hasDot && hasPath) return null;
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
var Mime_default = Mime;
var src_default = new Mime_default(standard_default, other_default)._freeze();
const CopyIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
	size: "1rem",
	...props
});
var CopyIcon_default = CopyIcon;
const DeleteIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
	size: "1rem",
	...props
});
var DeleteIcon_default = DeleteIcon;
const EditIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
	size: "1rem",
	...props
});
var EditIcon_default = EditIcon;
const textStyle = {
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
const tspanStyle = {
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
const BaseFileIcon = ({ size = "1.1em", text = "SVG",...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
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
var aistudio_default = "" + new URL("aistudio-BoQeEsOP.svg", import.meta.url).href;
var application_default = "" + new URL("application-D27DKxis.png", import.meta.url).href;
var baidu_ai_default = "" + new URL("baidu-ai-ClFE_v7N.png", import.meta.url).href;
var baidu_ai_search_default = "" + new URL("baidu-ai-search-CHTvGVQ0.webp", import.meta.url).href;
var baixiaoying_default = "" + new URL("baixiaoying-BvEr2bgX.webp", import.meta.url).href;
var bolt_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='16'%20height='16'%20rx='4'%20fill='black'/%3e%3cg%20filter='url(%23filter0_i_2119_154)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.64368%2011.7731C7.91976%2011.7731%207.20901%2011.5147%206.80099%2010.9591L6.65707%2011.6143L4%2013L4.28684%2011.6143L6.22186%203H8.59103L7.9066%206.03634C8.45941%205.44199%208.97273%205.22234%209.63083%205.22234C11.0523%205.22234%2012%206.1397%2012%207.81938C12%209.55074%2010.9076%2011.7731%208.64368%2011.7731ZM9.55186%208.31036C9.55186%209.11144%208.97273%209.71871%208.22249%209.71871C7.8013%209.71871%207.4196%209.56366%207.16952%209.29233L7.53806%207.70309C7.81447%207.43176%208.13036%207.27671%208.49889%207.27671C9.06486%207.27671%209.55186%207.69017%209.55186%208.31036Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_i_2119_154'%20x='4'%20y='3'%20width='8'%20height='10'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset/%3e%3cfeGaussianBlur%20stdDeviation='0.0192413'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.95%200'/%3e%3cfeBlend%20mode='normal'%20in2='shape'%20result='effect1_innerShadow_2119_154'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e";
var cici_default = "" + new URL("cici-BWax0i0M.webp", import.meta.url).href;
var coze_default = "" + new URL("coze-DYlX4xIp.webp", import.meta.url).href;
var dangbei_default = "" + new URL("dangbei-D7rGNj_W.jpg", import.meta.url).href;
var devv_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAggAAAIKBAMAAAC0GqpbAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURRISE////4qKim9vb7q6utLS0qOjpCsrLFdXWEFBQufn5/b29r9jNIMAAAybSURBVHja7Z09b1tHFoaHpCOK7kaWBZtsxCCIALmRgajhNtYGQeRuBQaI0kluDG0aIcgayG5DA3KzlQIoSpEmkovdllpsgv13m42zjixd3jkzc2bmzMz71uK91HPn45mPy1EKQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRDEmG++rxzA8oefXGg9/OzZrFoE/Y/m+reMPj6utBh8qa/lpyoLQ/dCv5Phen0Menv6Ru5vVVcXdvStrFZWIwaHuiFrp7WXg9rKQnM5qKss9B/phbmqxRc2dUsu62CwrVszrYHBiTZkt3wG59qYo9IZfDU3QxhtFC7LF5qQYdECfXvA0JyShxGLRLEmdVwsivWoY5soVqOOE22V1yUyeKUts1+hKFagjufaIYWpI0UUS1dHmiiWrY7Le9ox94uRpsGOds5qIdLUP9QeWStCmuxEsVB13NaeKWC+7UR7J3tpOtMMeZo3gxeaJc9zZtC94IGQ87J9b08zJd/5tuUdzZZc59sGh5oxec63UUVxvVuwOm6SG35iF5LhUu22hQidFKqOdv/XdpHqSJxNezujTJyJzmq+7YXtAJE61MxIHYmieL3XI/an+agjURTf9R+iWeWijo7/jhO6zEXxdsF2qERiRXHsvKRAXJxYka+Omx6d3Xkh6uinPWWoo+9/UYI6+pfnzezVkaFl82hXsxVFxh42Y1Fkc62sRTEYzKxEMVC1SiKKnGNh65G4kPDOitjOyZQgimWoI/93zk8dQwx8clNHoijarZ4Q126kqGMvTI9G7XNFSFMwt8lIHQN+1WzUMeh4JxN1DLxokoc6EkXReefVWQbqSHyRY1/yHXxzFkFutwOXtUiieOV3l0ei1TGIKGamjtRe3Lv/GsiVJuKLHBxvbUS8VZDHw2P2xNFJ7BdEqBWVaWK8G6f5scxmUFF0VseoS7XxO+8YShJkNo1V44jqGG2+Lc1csKxdfi+iiKKzOkbZ5Ucd5LO31MQeKcZSbTRRFKyO1Nm0IPZGVMfQ823EchBqCpiojmHLArFAjoJVS6I6hhRo4l6akA00sWsKuNdxEl0U5c06niUQRWd1DPQkevO0z8CuPI7CNI7jNKLoqo4rIW59R8yQnqiOTwLceid132TbU6/y3/g9SdN8NHX8E/t95wlF0VEdR0kKwrqKlm6KonCYVhTd1HGNufjJWw6kqBtv9fxB4MIwQR3/E7l/TLBFYBK3l+ym8TN/h+Vsqv8mbO2HrI4/R0Se6mfijOrIWUAvpK0HU9VxGK2DTLmp1KSOfF/tjhhRtG6z+YaSL+WIoq06PojjzMl/He4sijn3he4gJKnjcYx2UToErpZxSedbHfQB013u6nwbRv0j022+1fl2kfphlB5Stiyx9ZGP5W2jpM+43os2tSZ2AMUnCoRZfqlDab55FcpSh9BJFT4IpJUOkdNr/2uvYkIQOdEaHYLEKXdGCLTdUgIXXzjnlqgQxC3DcUKYk28YTR3ph8iMYkMQtjTPCkHTI2mTxm+JD0HSdp10EGKo41hLhyBlC19aCEI2cyaGIGJbb3IIAjZ4C4AQTh27Oh8IiV/6kAEh7es/UiCkfBFMDoR0rwRKgsCvjmOdH4RErwkLg5DkhXFxEBL8dEBUCMT6GftHJOJCIB/3lUwUI0BQA5q3RP1hmegQ1DLti0X8iaEEEEivQOiIPzaVBIKKdLqf37HUoSGQX95OIoqxIKjvIqjjRAuHoP4eXB1fafEQzNuZPNWR4Vjq8BCoNTbsD9WmhhBUHbs6Dwgh1dFLFKNCCKeOfqIYF0IodfQUxcgQwqijryjGhhBEHcc6MwgB1HGis4PAro6vdIYQqOr4Ke2OX+ssIVDr8AHlhks6Uwh9Yo9GUMeuzhUCnzryiGIaCFzqyCSKiSCQ1bFVmqjVSioEsjq23exQZw6B2rWtRBDFdBC81XGiC4DgqY6vdBEQvNTxa10IBA91XNLFQHBWx64uB4KrOjKLYmIIburILYqpIbioI7soJofgoI6HujgI1uo41gVCsFTHiS4SAvX/2g8liiIgUEv4p4FEUQYEalt3sKQLhhCu18sIQjj/yQlCMBPOCkKoMVFeENQSIKjQ3V8mEMKKUC4QgipxNhBCDo7ygRBwmJwRBK4tWFlDSKuOUiAkVUcxEFKqoxwILFu1s4fAsWk/fwjJ1FEUhFTqKAtCInUUBoFtz3bOENKoozQISdRRHATqEaxlQ0igjgIhxFdHiRCiq6NICLHVUSYE9QdAiK2OUiFEVUepEKKqo1gIMdVRLoSI6igYguoAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiDUBGH4x/c/uKgcwuXpL5dbPqwawvT41+sNDiuGcPn/C/b2qoWwcvz2it/VCmHt9PcrLjhwp3gIq7Prl/yhSgj3t965ZLdGCMP1G9fcqQ/CaOPmNV/WB+Ho1jXfqw7C7u1rdmuDMG245nJlEBrPHu0HhDCXB+HqmPq4RsVCuC6KkSBcSIOwekqvuMNCIbwry5EgNAxMThNCuCHL1zJo+utwEK7SQbgly7+nFxdCYzcdB8LzxddcCgihcVzyNBGEo5Zr3m1qQEJCaHsiASHstl3zcUAIY9u6GQ7C1LrerjBBeGzbSgeDcNl6ycbx0z0mCC+t++tAEBbIcuv3fMAE4Vtbew0EwXC7xjGkfsgE4S5lwjs8BFPBa661PzJBWHKtpKwQTE3Qgt9HP2CC0HNurhkhDA0MFi1AbTFB6Dt33HwQbs+q3mgQdhZ88JgJQvsJd0dRIBjusnA5do2LwcI+8k02IkAwlLf+eNEHH7BBuOM6rOOCsG+42ObCTz5hg9Dza7e9IZha3+3FH91ig6D2/HpwTwiXhsbtpOX58DFYNHrwUUc6hDUDg/OWz95jhPBXi70S3BBMgFsPkfkHI4Se22IIBwRTVetetH2asUmgnIU7DQPB1Oj2WpurNU4G6i/eXbkbBFP3u1AU3+RzVgjL/lLnBMEgYqYTQ2asEEhn1WywQzBwNZ0ds8LLwCCNtIGeNQSTLG8aPv+EGUJ/j9KKzVgheIjim69zzAyB0jRaqaMZgmnCxniy2OfcDFR/h8NsLCAYZlXNZ8ytshcEWqtgoY4dT5znxq/yRAXImEThNQ8EU8X6am58HCEYUA+w2ueAMDJIkvnweptG2ibEUz+fMkD4wvt5rKtAIZ53+dwbwv1TH1nmWDT36JktnkLHvSAM+IdzVnlEmx/f8oTQ+vm++UtchWRAeQjEVqnjPAKeMNqKYxdBcqbFm+xIEB76VcnVmQqcHq2jNE0MtkI4cJtVZdk3QewoL2jq6AFh5iOKnjtoiCEej/0vZwhDH1H03UtFzblmUMcWCKs+pfBIRcoJgzp2HGoSoT3aVdGy7a+ODhAIPdNURcymtzraQyA4ymVMBtTjsVvU0RpCf+zfL0tTR+uGcTO5KPKro20XKUEU2dWxTZZOpYoitzraabMUUWzQNx91bIPws4OkbqhE8VHHjkXhkSSKrOrYOqlyKlgUOdWxQ14ykCaKjOrYoTamgx1houjkcc3q2D7lfmDjph577ROrY4fmWH2Josimjh3S0+3LFEUudTQtyP66g3P5z0JFkUkdjUvz/372/gdzsaLIo470Ha0yRdFZHf/JDuFICYq9OrJA2FWiYq2OHBCmSlhs1ZEBwqU0BlR1fLvg7A8hvSg6q+NwxgRBgij6qqMvBBmi6KmOnhCkiKKfOvpBkCOKDeo4J/0L93whjDaU4NDVsVOMKDqr4xdeEHaV8FDVsVOQKDqr47ggUWxQx0c6aEyvAGSljkWJorM6FiWKzupYlCg6q2NRouisjkWJorM6FiWKzupYlCg6q2NRouisjiWJYmh1zEMUw6pjLqIYUh3zEcVw6piTKIZSx7xEMYw65iaKQdTxSGWfkwpFkV0dp6qITHwYvC6DgZc65iqKnOqYryjyqWPOosiljnmLYgMFB3UcFsbARR3zF0UGdTxSBeakQlH0VMepKjST+kTRRx3LEUV3dSxJFF3VsSxRdFPH0kTRRR2HxTMwq2OJomitjkeqipxUKIpW6jhV1WRSnyg2qOM4n5dZYqtj2aJIU8fSRZGijuWL4u3cXLDOfenZsUZ8eZ3BTzNVZfofvTXo0cfHqtYsf/jJL5Vi+Nmzmao733yvEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEMSQ/wLMw4zfsp/7ZgAAAABJRU5ErkJggg==";
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
var kimi_default = "" + new URL("kimi-0y7baRrS.webp", import.meta.url).href;
var lambdachat_default = "data:image/webp;base64,UklGRswCAABXRUJQVlA4IMACAADQGgCdASrIAMgAPpFIoUslpKOholgJuLASCWlu4XExG5ayOUv5+AHFf3gxd/sA9vv0r0wHsAF14CLcwDwEW5gHgItzAPARbmAeAgrFaTcdZjYeKagOcooZV3BqiR/Cyp4cTJN+mxFrddlLQItrZR3nZU2LZ6es+BT32M9+5XDBkJBl3WD1xNes9cfc1ugITWQK/CkzPlXWYwVqB3OFOHFsy4vKiQKHUx5qOXfQNEcHTsq51kaHKOpIICNlTpvcspwVqyCaNK8Pg4zw0kMPboCLcwDwEW5gHgItzAPARbkgAP7+1SwHh3mdvxj4Y+DlybMLFLf+8x94n+0LrTU5v+G2IIXZV69DVrvwZTLlX5tUvxe6s8jfv4YD5M0fkMAmMXTBOGRIxzou8vV6v/t+zbDR4p4mZAcBzB5jkXXEfaeEqi+2juOagHqzUnhn4B0CpcB9vGzhcJTcxg9VgNGP4/or4CWXMRyz8VfXTlZ63q31gmyWcQiG4/qL2y8oOpYg6Bquu5sjuQjSWpTISrFaiGulfqezop7r5r/ejiPJqz3/IUuJRzv5QWYgtisvCQP5F0+4kUQ6Y5cGe5CCkFCej6zduAz3OqzCQKkEEsE0lvVsuRB+FuXJrxiK3/SV/3pp3nLajs1wDmgVBHlvfzViec2qEN/P8Xa8uf22Yza1iV8zoI5caGY/CGE9QRrjVt1eKAJ6HFBPfvbYXBxUfqq4KSkmlNeBM9FFzuTMlOuMGo/OvYyBioEipdXoEjgQSRKze5TU8SRBrSv+Nh27i4JS1TNj+yl+Jw5Crrj/FR/Lnc2Dl3BNJtg9bCpljZQu5ANX+wi8gN6+gWwhx7BS/VmOKbvsvIpkOQk4rlnpXTtYMsOMNmXiUnMb1joAisXrTziNpz8FPi5KG7/09w0flfg5vaSdMLHYyaLmQ0JanUAAAAAAAA==";
var lechat_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAB7CAAAewgFu0HU+AAAK30lEQVR4nO3dzY8bdx3H8fdvZvy4j0mTJk3ShNCkSQkPLaqEKpAQlTj0zAWJS5GoACG4Ia4V4t4LtCD+GiohJa1SpFyqgNptE0HaKJtsstn12jPz+3JwthREvx5vd2JP83lJm9M82J552zOW/E0wM0NE/q9k1g9AZJ4pEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEUc2i50OBgOuXLnCjRs36HQ67rIhwK07Od/71kGOH+1RljX9n6OxIGkdJHRPQtKtZx9zysy4dOkSd+7cmbhsjEaWpXzpxCLnTndrOx7BSki6JIvfqGX7Vc0kkPX1dV5//XXefPNN0jSduPzOMPLn357n+HcPUe6U7P8hCVDcJVl5gezoy4TOsX3fwzyLMfLaa69x+fLlicuaGf1+nx//4CnOvbxMuV3P8bByi6RzjPbTf9j3rU9jJoHkec7169f54IMPKq+zudGB0QAb1hRIfhvrPQVW7PvW510IgbW1Nd57771Ky6dpxq2bGeQHsGFRTyDFZg3bnd5MAgkhTLy0+l9p1oOkB0lZxyOCdAGSzvia7hE0zfHo9Xq02j1I+pDkNTyaAGmci0td3aR/Yh7er5qmztdsPo6HAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxzGRow56kAdoBijqGKiQQjNDpENqLNWx/vlmScH9Yffn725HtMkAngWEdxyNAkkBr9gM0mhPIVgl3CuKgprE/ZUIoPqYo/wqtx4Eaxv+UOcnySZKV05VXiTHy9ttvc/PmTcwmP/OdPPLEgQ7PnV6i302JFdaxCC8+DUeLg5OXNaPXX+Crh8Bujog1zSmzIof+7EcwNSaQuJ5j14eUwzrG/gCkxOTv5Nf+CKE1Pmv2mQ3v0v7Kj+h87ZXK6+R5zhtvvMHFixcpy8nPPS+NF55e5Hc/PMbJQx2GxeTnEYBfvmiMvnNm4rJmRpIkLPUDg/e3ibUMHwlYsQOLU3ys1aQxgVgRsdH4rx4BswHE22Al49Nmf9nwDjZYn24dM9bW1rh69WrldZ4IGTu3B1inS6z4ep06uELIepMXDEA08mHJYCfWNEYsYHnE2rMf/dOYQEgCZHXdg4wFMmC5jjZ2d1DtJPz0KiHQ6/XIsoyiqHbJ0ektkHRWCN0eIakWyObAmOqyMkDIanyhYhjfd85YcwJ5aKy+mWVmPLyBaDbeX4V7EHhkB0pOpK95RRwKRMShQEQcCkTEoUBEHApExKFARBwKRMShQEQcCkTEoUBEHApExKFARBwKRMShQEQcCkTEoUBEHApExNGgn9zap/6aam8DJ4zqP53dXaP5r1dkHh57YwIJaUJopYS6pv48DGVC6HSmWiV0OtwvM4opnvfmCCxNx6+XNfHH5gHICNnsL3AaEwijPjZYwYazHya2Z3lKceMmSeci45Ng8jtkmRe8dLrHqW+ffTAXyz/hi7zgwslFFjlAsd3GKszFmjsWsDzFWotYkROy1sweSmMCiR/vUK7doxw1+CPEjPJffyF/p3ogAD85PqA48lilZWOEVgrdWwOG64M5uEjZi4Dt3MceW5n5uJXGBGJbd7HbYHkD3xF3hYCVI4ijqVZb7S+QZWm1XaRQlDC4GynNahvxVasQsO17WGuRkM72FG1MIGQZtFsQGhwIENotYGGqdbbNph4VHFpJM+OA8adGbEFr9qfn7B/Bo2aqb6PGGnuifx5zcm04+68JROaYAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXEoEBGHAhFxKBARhwIRcSgQEYcCEXHoJ7efk33yTzUzHtLxmaZ6HuHR+RlwcwIJQGLjv1q2H6AosOE2xMnzp3YtLS3TamWVzq0QYDCKbJeRJEmo5YfXIYEif/A8qg+4WFpeJssmnw4BiNEYlpGB1RRKYHxtMwcVNiiQPoQD1DNaMUCZExaWSE8dIbS7UPpjRAIBM+PqtQ/ZXN8kVPhoyGPkiX6XxzsZZSyo5QyIkbC4QHbqCGRtsGqRvLu2xva9bcbRfvbjMjPSJOFgt8XhVkLcwxCKiUKAJCOEpfFxmOHon8YEYptg62B5PduPm1u0n32W3vdfITlyAnJ/dlUIgeHOkD/95te8dekfhGTyyT4oSn723FP89OwqG7duQlJt1tU04vYW7WeeoffSrwirhx98Gk5YJxq//8XPuXLlfcz8y0CL0F/o84OzR3nlsLFV1hEI2DZYYpUDr0tjAokbt4kf5cQ6RmmGQLxzEzv7HOniYZLFQ5VWK3dG/O3D27x19VrlXV07vEhyNFB+9M/9H4oWAvHeOvHJc6SrxwgrByuvenltnXfe/bDawu0e3+wGQiiwUdz/C8UQsK17hKQ1/hScocYE8snguKSeQOh1IAlYOay+XjGi15rui8B2K4UsHT+XGgKh3YY0xcpR5Qu4ECP9dvXnsdhp0W2n0ArsdWK9/4AC5C1ozW4m7y59zbtrTgaVyXxRICIOBSLiUCAiDgUi4lAgIg4FIuJQICIOBSLiUCAiDgUi4lAgIg4FIuJQICIOBSLiUCAiDgUi4lAgIg4FIuJozm/Sv0hC+M9fHdudh4FSXxDNCSQBUur57Xh4sO0pP0/NjMFgMNU6w61NuN/HNjdqGdoQ793BBvenGhq3J7vHo47d7B6P/Z+KNLXmBDIy2DYo6pnDxJbBjk11wLMs4/nnn6+8fDQ48/Un4cwy7ZXjkO7/GZBu3aP15QvQ6uz7tv9Lwfh45DUej8HsJ2k0J5BbhsXx374LYLcMO2fjA19Rt9vl1VdfZTQaVZqsWMTISqcNrZTlCgPd9sQMshaht1DP9nd3cx/smmGl1TAXC2zTxoPjZqw5gZSM361qCoTiwafTVIOoA6urq3vaZeO/HTHGx6OmyYrkNX06Tak5gexel9Zx//npexDd31ZX1z3CHN2DNP6NTKROCkTEoUBEHApExKFARBwKRMShQEQcCkTEoUBEHApExKFARBwKRMShQEQcCkTEoUBEHApExKFARBwKRMShQEQcM/tNutmUP8g3G896spoGMVkc7+MRNe3xMLMHr1mdx6Pm2V4VzCQQMyPP86nWKfMh5O16BqKFgA2HUOZzcVAeNjOjKKrPOxqNRpT5CGwEZT3Hg+EIpjxH6jCTQDqdDufPn+fGjRssLCy4714BuD8YcvDMCdIDi2Q1HZB0Y4PszDlCt7f/259zSZJw4cIFiqLAzNwZX0VZsrS4xJMnjpB0ICtjDXOxAmxtkRw7vt9bnv6h2NTXOp9fWZZsbm4yGAxIK0wXHJpxKEvpJik1jCkbz3iySNLpQH8Bkkfv1mxjY4PRaDRxOQMCgW4SWE6TWiaPjg9xJCQprB6Y6SSmmQQi0hSP3lulyBQUiIhDgYg4FIiIQ4GIOBSIiEOBiDgUiIhDgYg4FIiIQ4GIOBSIiEOBiDgUiIhDgYg4FIiIQ4GIOBSIiEOBiDgUiIhDgYg4FIiIQ4GIOBSIiEOBiDgUiIhDgYg4FIiIQ4GIOBSIiEOBiDgUiIhDgYg4FIiIQ4GIOP4Ns59UWjaX0VYAAAAASUVORK5CYII=";
var ling_default = "" + new URL("ling-CfgVSDNN.png", import.meta.url).href;
var longcat_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20fill='none'%20version='1.1'%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%3e%3cg%3e%3cg%3e%3crect%20x='0'%20y='0'%20width='40'%20height='40'%20rx='10'%20fill='%23FFFFFF'%20fill-opacity='1'/%3e%3c/g%3e%3cg%3e%3cg%3e%3cpath%20d='M3.7180590000000002,31.9163C3.24403,31.9163,2.9002264,31.4649,3.0262264,31.0079L9.07884,9.056280000000001C9.337579999999999,8.117891,10.43555,7.703758,11.24956,8.237532L19.2136,13.459869999999999C19.6909,13.77281,20.3081,13.77329,20.7859,13.46111L28.7837,8.234667C29.5984,7.702255,30.6956,8.11792,30.953,9.056519999999999L36.974,31.0089C37.0993,31.4656,36.7556,31.9163,36.2819,31.9163L28.5948,31.9163C29.9941,30.2961,30.7641,28.2266,30.7641,26.0857L30.7641,25.8358C30.7641,23.7417,30.0023,21.719,28.6209,20.1451L27.6344,15.19322C27.5764,14.90227,27.321,14.69275,27.0243,14.69275C26.8898,14.69275,26.7588,14.7364,26.6511,14.81715L22.9316,17.60681C22.6667,17.80548,22.3241,17.868740000000003,22.0057,17.77777C20.6944,17.403100000000002,19.3043,17.403100000000002,17.9929,17.77777C17.674599999999998,17.868740000000003,17.332,17.80548,17.0671,17.60681L13.3459,14.815909999999999C13.2393,14.73596,13.1096,14.69275,12.97639,14.69275C12.67948,14.69275,12.42483,14.90461,12.37083,15.196570000000001L11.41369,20.371000000000002C10.01719,21.7911,9.2346,23.703,9.2346,25.6947L9.2346,26.168C9.2346,28.2566,9.98171,30.2762,11.3409,31.8619L11.38755,31.9163L3.7180590000000002,31.9163Z'%20fill-rule='evenodd'%20fill='%2329E154'%20fill-opacity='1'/%3e%3c/g%3e%3cg%3e%3cpath%20d='M16.05224895477295,27.610614743041992L18.20519895477295,27.610614743041992L18.20519895477295,22.587064743041992L16.37845295477295,22.587064743041992L16.05224895477295,27.610614743041992ZM23.94638895477295,27.610614743041992L21.79344895477295,27.610614743041992L21.79344895477295,22.587064743041992L23.62018895477295,22.587064743041992L23.94638895477295,27.610614743041992Z'%20fill='%23000000'%20fill-opacity='1'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
var metaso_default = "data:image/webp;base64,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";
var monica_default = "" + new URL("monica-Dh3VTqHn.webp", import.meta.url).href;
var n8n_default = "data:image/svg+xml,%3csvg%20height='1em'%20style='flex:none;line-height:1'%20viewBox='0%200%2024%2024'%20width='1em'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3en8n%3c/title%3e%3cpath%20clip-rule='evenodd'%20d='M24%208.4c0%201.325-1.102%202.4-2.462%202.4-1.146%200-2.11-.765-2.384-1.8h-3.436c-.602%200-1.115.424-1.214%201.003l-.101.592a2.38%202.38%200%2001-.8%201.405c.412.354.704.844.8%201.405l.1.592A1.222%201.222%200%200015.719%2015h.975c.273-1.035%201.237-1.8%202.384-1.8%201.36%200%202.461%201.075%202.461%202.4S20.436%2018%2019.078%2018c-1.147%200-2.11-.765-2.384-1.8h-.975c-1.204%200-2.23-.848-2.428-2.005l-.101-.592a1.222%201.222%200%2000-1.214-1.003H10.97c-.308.984-1.246%201.7-2.356%201.7-1.11%200-2.048-.716-2.355-1.7H4.817c-.308.984-1.246%201.7-2.355%201.7C1.102%2014.3%200%2013.225%200%2011.9s1.102-2.4%202.462-2.4c1.183%200%202.172.815%202.408%201.9h1.337c.236-1.085%201.225-1.9%202.408-1.9%201.184%200%202.172.815%202.408%201.9h.952c.601%200%201.115-.424%201.213-1.003l.102-.592c.198-1.157%201.225-2.005%202.428-2.005h3.436c.274-1.035%201.238-1.8%202.384-1.8C22.898%206%2024%207.075%2024%208.4zm-1.23%200c0%20.663-.552%201.2-1.232%201.2-.68%200-1.23-.537-1.23-1.2%200-.663.55-1.2%201.23-1.2.68%200%201.231.537%201.231%201.2zM2.461%2013.1c.68%200%201.23-.537%201.23-1.2%200-.663-.55-1.2-1.23-1.2-.68%200-1.231.537-1.231%201.2%200%20.663.55%201.2%201.23%201.2zm6.153%200c.68%200%201.231-.537%201.231-1.2%200-.663-.55-1.2-1.23-1.2-.68%200-1.231.537-1.231%201.2%200%20.663.55%201.2%201.23%201.2zm10.462%203.7c.68%200%201.23-.537%201.23-1.2%200-.663-.55-1.2-1.23-1.2-.68%200-1.23.537-1.23%201.2%200%20.663.55%201.2%201.23%201.2z'%20fill='%23EA4B71'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
var nm_default = "data:image/png;base64,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";
var notebooklm_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='512px'%20height='512px'%20viewBox='0%200%20512%20512'%20version='1.1'%3e%3cg%20id='surface1'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(85.09804%25,85.09804%25,85.09804%25);fill-opacity:1;'%20d='M%20512%20256%20C%20512%20114.613281%20397.386719%200%20256%200%20C%20114.613281%200%200%20114.613281%200%20256%20C%200%20397.386719%20114.613281%20512%20256%20512%20C%20397.386719%20512%20512%20397.386719%20512%20256%20Z%20M%20512%20256%20'/%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%20256.011719%20114.753906%20C%20167.050781%20114.753906%2094.945312%20186.261719%2094.945312%20274.507812%20L%2094.945312%20350.988281%20L%20124.628906%20350.988281%20L%20124.628906%20343.359375%20C%20124.628906%20307.574219%20153.867188%20278.558594%20189.941406%20278.558594%20C%20226.015625%20278.558594%20255.253906%20307.585938%20255.253906%20343.359375%20L%20255.253906%20350.988281%20L%20284.9375%20350.988281%20L%20284.9375%20343.359375%20C%20284.9375%20291.308594%20242.390625%20249.140625%20189.929688%20249.140625%20C%20169.503906%20249.140625%20150.582031%20255.53125%20135.082031%20266.433594%20C%20151.296875%20234.464844%20184.691406%20212.535156%20223.242188%20212.535156%20C%20277.707031%20212.535156%20321.867188%20256.339844%20321.867188%20310.355469%20L%20321.867188%20350.996094%20L%20351.5625%20350.996094%20L%20351.5625%20310.355469%20C%20351.5625%20240.074219%20294.113281%20183.082031%20223.242188%20183.082031%20C%20191.382812%20183.082031%20162.230469%20194.601562%20139.785156%20213.683594%20C%20161.824219%20172.375%20205.578125%20144.214844%20256%20144.214844%20C%20328.566406%20144.214844%20387.382812%20202.550781%20387.382812%20274.515625%20L%20387.382812%20350.996094%20L%20417.066406%20350.996094%20L%20417.066406%20274.515625%20C%20417.066406%20186.28125%20344.960938%20114.761719%20256%20114.761719%20Z%20M%20256.011719%20114.753906%20'/%3e%3c/g%3e%3c/svg%3e";
var perplexity_default = "data:image/webp;base64,UklGRpQOAABXRUJQVlA4IIgOAADwaACdASqQAZABPpFInkulpCMhovVZkLASCWdu8p97/QgxRC5ZoalBtFjN9AitWe/O16e/3/irm6ATq1+O/Tvw7/aruw+137D/KjcX+26hf4/+ce+DsV2if8n7QT0z7TCn6pcyP91yOeKnhd+0t3caMj/////3pft3/////8Ko2g39w7M+hTAA839w7M+hTAA839w7M+hTAA839w7M3T5ahVZn0KYAHm/rfLFY1vOyfqbBEKCY5gAEKOR5qmm5gmaSFMAAyXVHCxMrgZotufYSLIuNBXABaW1bk2kmhaP6FMADzfoqOczqiwbVvWS5wlr1ueSbBBPrRLPaFVlktFcdQ839w7M+H7qEL7SSukmqoYyvXekPHjfAms2DWpqQOyTFZn0KYAHQqMPsG2MyBM59OmkdukGS7yqBTH/kpzDL/YsB5q0a/cOzN0a0amf4VpnPJbMDUiLIeCvrfDbdgNmvUFqpPbqia/vZl/4qW1ZNzgNDAzzf2/bQt+s3x324TVHLY8lspWjd9Rj4TYe/e7NZ9cbIgRtcUjmmuHaqUodG/uG1UMY89vYWh2WDK6tGltQH9jc6V6MzihzX6l/t/DxBPwbFZnz8d0KSBbQn1Q8NcLFcXHfWp9AidoaySAxCnO9NVDGPQpf7tWzaTGHP2kfn9JWr38hkNCF9pJXyBR1n1umLpDOb+38AedylQep+RZDhULa4e6pm0Cwu09BZS0XarGA07C3L3NDFb1J+UPw/IZHUbcLKmy2VQxj0KX+7Sk/OekivtgoEhsTV3zAijn+XitzRlSiCa2/Aasz58avImxOKlcR6XJvi8Ryxl+9fD5NEIMl8klz1U/U6pR1Hl6+sZ2Z3nAfsB11eSavyhiyyd0kuVBVwY0L6iHY1CKrb8wtZ/dKTtg/oUwAPN+i9LNVtDR6PCa03KnerD4qnU8RvHhhWVgnOIOD4COHm/uHZnFhnjeHe1TZbofZr7kUdvzjS11im9RF1RpqHoSdu839w7M3oBLJ5UG2/OgUtHuQRfby51N0HAn63kJdyp4lDOb+4dme/cNUht9vv3dCoyplPKegGsJhavuYAHm/uIXpcUm/KSmPpKYAHm/uHZn0KYAHm/uHZn0KYAHm/uHZn0KXmAAD+/bIz4Jdvr0Rl4u0tCf1AAAn8cAAK01g3j1nA3iE92+5cMXhNnIUSbfcAC4z3K8fth/s3njWZ7fYcjamEcTp1HlAb5Eh76pNeuSmhGczo4wxPT6LqzjskYekduYqWq7GeAsrvTIORGibTizbNRIytcoCd/8f4vttd+38fKkvFIzSPOn94W4ifxHU+wPiqrUelTzu17F8Fzz9qVKXD1DWE7EPIezoTlyEID8qzn2YNAXE0iVF6rIWTHjdRPLgaG58r2zmN98pEqPaNj+ygpChTIG8qLoVGqw8IHXxcSHxjnkchnQ2hhyVh4jMGNvtw179tKRFJoH1aZTqxyJihzDz5lWOn0xFRpRLr114jyYqmwHraZOAKx+YZjD0z9yD3KnpdNlZ5P36JGc1GO7dM0Oor+l54XOeXbf+A0/awM1kkyEHb0oG2iR+orCAKxDEtkF62gbWJzWJRbnmasKGcASCdSWa0oNmH8bSyRTn7F7AVWMvkN9us0WjJmkQTM/BCk5AyE7SwF774xqsF1RoFeNOpg86D+7y+YnkfQXh3yiLaB3ERVWCECfk1pmBPD/IzTiDahNLnG3x0Ao8W21GKAurEhpgz8MdEaRorHmxL5I1DB+hXM1cbx4CFS9KPB8WzcXLvmAiAcEskBEgnOLjrMGckwcLGOZRFITk3yS5vtCUZD9Mx9GKhhfJ+/moKfgjf5BPtzzCuY5zoz6kUFsivUwHSdTJZGynAmtxLWSMlYJWWVU43Ia45ydwpVxVP7XjN8a0wr/xis+yfKRWv8iW8u+nKDMRd20AFAQPIeA2/Y4R5xIVjTccwSsIKw1UxEVjy2xfttcJf03gPpQ+BeLBxYbU98anbI/MgRObhuK3PdgNZBJtKSg7mU8ZGIdM5MnH2OC9dHAXBwfUv+1sDoUtV/5ew9Onc+zrcbNGsAuWuEYIBxfed4U2j/dgHIycNzV116FaqzaPrnbDyy08wcVU+k6Sejw/KE29mS7VfpMRXnri8bBmmDLzhlrJSh6Z90M5v/nlvXjKSag16g0YxYOYBOQTWGKRssgzQCqZPdby1Mp1knWVZjMcKrcSi79HH5bYlZWFR4AoIppV+yBnaV7yi7e3OKI823Zvei29PkA2qu5xgQKkH/IeRpfYO+7iIJRUrPnFz2cAPhhQ4exRSh4ILp6HOryvFHc4MP0l45hen14yKmZmfKB2Xcr+DnJ7tc99qqi2oWZGUi8w0AFGWFPS5wr+mUt0Yianb+z0CWgfmvfX+7b940WkYjEtkEeI2x9o/Zj1d/++bKaalcVx4F+oFfMkmxAdKymb6T2wDTKdOUkyVWWBrBUYdBd+oyoHju74iZj9irbsOCJmJjzsR4mMiZFk+s5D557k32ghZscPXkurtgwnKnlWvY11+YoD6aBzx0Z6re37FADChqlvIRaZlWWHdU4KCXbTHwkRvZHO4GHUkaMr52xkN6qkOAJZwNL1bwnKh+RJ8JE5hYRFcOn3XfwCpD8tTkpWyfERzvIEldGNDIGSn9l0CvDEvepjcnaLrMf0ih3oHwzPwbC225/jMlfFa1YbLi+7/80Hb3/0T8GyR8FL33gFyosRYuPAAkoC99I4+SH4Mfmf3F04Z6Wkj643+dqr4jbrx4HNxjGQ+WXXC0tZ4NvFg8aXnLa6wXlW+rESwg9yp6XTZWeSA6SP3ri7AzdZgDeIIGmSawuNMG6aU3ALgilXcJqcFMH9WsIzmC1VMfYUSKcfvnB3+3NFuzsCf4f6XNGVhg5puXJyeUSvf/r9arlEKFz0JWRq4M88kgXba+QH1G72GklCE6Zgwns1PiVDw2iDZuuLMiQatGKRucauEkExJzt1vNtmjy0UZme1e/Qhdf6MuQ42ZfJIsWlnROk4nyxEVLpsrA0FO38CMjpq0C7rDWiMiLN40YSNO+7GoTEkxxaa5QB3pBP1bHvlYip/kWMsovybQx5+IfQF0nhZdMalYGDWl1xqELg/vQhWJgHTlFhbz6wnNe9dgAQHzLH386WxgvLcDiHLmsibawvNaHy6bWxkM65jyeKCbuNplPgeG6po8a1rY3tQqLcsNK/i+R2ID1YlTBqsSGmDPvrKsOTzgjJpB6VYlsqxq5zlSxUP3kVgZzMLc3IqtE44QbopQNVywVEczWktPxfdbYLMQ5iC/kSm70Cgwnmy/0GQC21RcJeuTGtH3MajtgNxdNURTzSBR6rSDnkqmSPZZwDwL/nqRALkC63ToJyEnz1SjfDjSSkaEFgXOmYFwQksm/3VVfvDg2Do4D2VykqSsX/OZQzFiIqXTZT5YIfgCMjr7x51Ai9fQjobR0gjPNLb1EJMX/m/8AGXYKGyAEqGMXXG3BNgPfhbE3gh8XEscvJmYrsosC0nOPAL2lnJFDhCEWgV3urbWbTuF4ttZosnYOwlmP1DYrgZElOOlClxoP0dwFj9kW7YTABslwnNyR2OWg+lgFvNBw/7VatDVlsNu72neAi5RikRkd0KaMDJhs8WhTuTydVfY5VptuPB1U/WrHdftVAseIDmXqwutYh4UpnExcwkpZQ+tl2aUAhsxE0vi/WOmgq1vFMk6bY4uYEawCjUQsbfIE19U81ZmQzJede447593jQkD0F2RJlxZCqqThlV1tZIzBFceoUlwWLf1Q8pTR+aP1WonitiIL83YRLOtq4pY2sW+RDHxA2yH7WaN+1z7pVoXVLqmCPQAl/WWj52XIpYQBo/X8FxuBc+GXF6XwRfeNcQnXFtgIX9ny8xPyHw8sXjmPpuK7ID14Z/1pMrwhP6tL2egYBa9LJ19ogDLn/1YfNX8M1EkrsjzzE0scMzK2L60Fr2GO0UngSUDOWb/VDodF08uVUAFcGMIZGblc4Q0Brui31t77f4A3aIvCy9xpZsScWNZgz4K3wPrm7+7/D375YqRF0CtSbbCvW3Fc9B5XaixFutLZ+PpsRpck+g+zTMpkE7XxULCj4KkqnPiAKJoxzCRTk+b6jRhLBA6qXQnTEcJ/u6y242LMjbYMyOKOScKHa3m7JgmtObQ0Mq3dRZCOwAMrtrRKQOG482B3H1eT2dOOZd6ngAEIGzhiqEubzvKjZdWKL7rcCTcxnnbv/gIJ3H2vk3CJtbhpt80CRzq4nHYBoGaZk3F0V4/rjYzR68tBu+Mv0K0stwt17AZUbt/CgVNCt5pkXvnee3vbCfOfp3SkWgz+EkedQRPSEQhlsMG8YJoH68I2LsJu9NnRUbpRuBcHWdgET8ajZXmuyiT4cfyURST19qFrUGHLjpXAPNkFOFVGw0MAbktCYey6nNJNgLgfOLvUfFcrE6GQNjax0kKkk0ZrpZUtGze4HWgB8tBzzFBP339wbm/pP8icyMdaLje+fk9j/2hh1fv3ueQzQghhPGRo9okfCW9KR/nHjmvZCMTV+hN7FW/XC5njAwG9t18JHGMoxTRjGItCjxBlERMQ8oUJbwnO49xwVVqq/m3zPWiLDHn975HJfPudwtCMoVyvTrlUoo52yLTQCS5kEsttVhwA/BNDBeezWF77FUkiwnzQPkS6DfIUAfuTxxJrSsW5R0K9ab+VxKQB4aeJKsEXkRfvwtB+SQ9NtQ46pXQCvdmpF9/oTtsSjjn2b2pMpBFUP0d648Oq0fQ1/d8321nKvnkRTAmGfusYoU91hzex9Kmr40BjFP6IJslXgF38i30Diuew9Z5sdd3LI6REQsT7i9gbY3RihYKyprDUWQHCu9BE/e3FZbYrTlkwmfcXTNcxUsbXsiR9BY2sInQI2HzNDXke8l0txkngivLi6w9WABE7irmt1LMlQaSsrcd+dnwsRecHRuEEAAAAAAAAAA=";
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
var zai_default = "" + new URL("zai-D-LYDdSb.png", import.meta.url).href;
var zhihu_default = "" + new URL("zhihu-DB2As3_m.png", import.meta.url).href;
var claude_default = "" + new URL("claude-DinCUo5s.png", import.meta.url).href;
var hailuo_default = "" + new URL("hailuo-BIMNDGOY.png", import.meta.url).href;
var qwen_default = "" + new URL("qwen-Bqu9tU27.png", import.meta.url).href;
var deepseek_default = "" + new URL("deepseek-BfIKgrKz.png", import.meta.url).href;
var groq_default = "" + new URL("groq-DxjL3oyr.png", import.meta.url).href;
var openai_default = "" + new URL("openai--2_yMGcs.png", import.meta.url).href;
var silicon_default = "data:image/png;base64,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";
var zhipu_default = "" + new URL("zhipu-CFgqzqwQ.png", import.meta.url).href;
const logger$1 = loggerService.withContext("Config:minapps");
const loadCustomMiniApp = async () => {
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
			addTime: app.addTime || now$1
		}));
	} catch (error) {
		logger$1.error("Failed to load custom mini apps:", error);
		return [];
	}
};
const ORIGIN_DEFAULT_MIN_APPS = [
	{
		id: "openai",
		name: "ChatGPT",
		url: "https://chatgpt.com/",
		logo: openai_default,
		bodered: true
	},
	{
		id: "gemini",
		name: "Gemini",
		url: "https://gemini.google.com/",
		logo: gemini_default,
		bodered: true
	},
	{
		id: "silicon",
		name: "SiliconFlow",
		url: "https://cloud.siliconflow.cn/playground/chat",
		logo: silicon_default
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		url: "https://chat.deepseek.com/",
		logo: deepseek_default
	},
	{
		id: "yi",
		name: i18n_default.t("minapps.wanzhi"),
		url: "https://www.wanzhi.com/",
		logo: wanzhi_default,
		bodered: true
	},
	{
		id: "zhipu",
		name: i18n_default.t("minapps.chatglm"),
		url: "https://chatglm.cn/main/alltoolsdetail",
		logo: zhipu_default,
		bodered: true
	},
	{
		id: "moonshot",
		name: "Kimi",
		url: "https://kimi.moonshot.cn/",
		logo: kimi_default
	},
	{
		id: "baichuan",
		name: i18n_default.t("minapps.baichuan"),
		url: "https://ying.baichuan-ai.com/chat",
		logo: baixiaoying_default
	},
	{
		id: "dashscope",
		name: i18n_default.t("minapps.qwen"),
		url: "https://www.tongyi.com/",
		logo: qwen_default
	},
	{
		id: "stepfun",
		name: i18n_default.t("minapps.stepfun"),
		url: "https://stepfun.com",
		logo: stepfun_default,
		bodered: true
	},
	{
		id: "doubao",
		name: i18n_default.t("minapps.doubao"),
		url: "https://www.doubao.com/chat/",
		logo: doubao_default
	},
	{
		id: "cici",
		name: "Cici",
		url: "https://www.cici.com/chat/",
		logo: cici_default
	},
	{
		id: "minimax",
		name: i18n_default.t("minapps.hailuo"),
		url: "https://chat.minimaxi.com/",
		logo: hailuo_default,
		bodered: true
	},
	{
		id: "groq",
		name: "Groq",
		url: "https://chat.groq.com/",
		logo: groq_default
	},
	{
		id: "anthropic",
		name: "Claude",
		url: "https://claude.ai/",
		logo: claude_default
	},
	{
		id: "google",
		name: "Google",
		url: "https://google.com/",
		logo: google_default,
		bodered: true,
		style: { padding: 5 }
	},
	{
		id: "baidu-ai-chat",
		name: i18n_default.t("minapps.wenxin"),
		logo: baidu_ai_default,
		url: "https://yiyan.baidu.com/"
	},
	{
		id: "baidu-ai-search",
		name: i18n_default.t("minapps.baidu-ai-search"),
		logo: baidu_ai_search_default,
		url: "https://chat.baidu.com/",
		bodered: true,
		style: { padding: 5 }
	},
	{
		id: "tencent-yuanbao",
		name: i18n_default.t("minapps.tencent-yuanbao"),
		logo: yuanbao_default,
		url: "https://yuanbao.tencent.com/chat",
		bodered: true
	},
	{
		id: "sensetime-chat",
		name: i18n_default.t("minapps.sensechat"),
		logo: sensetime_default,
		url: "https://chat.sensetime.com/wb/chat",
		bodered: true
	},
	{
		id: "spark-desk",
		name: "SparkDesk",
		logo: sparkdesk_default,
		url: "https://xinghuo.xfyun.cn/desk"
	},
	{
		id: "metaso",
		name: i18n_default.t("minapps.metaso"),
		logo: metaso_default,
		url: "https://metaso.cn/"
	},
	{
		id: "poe",
		name: "Poe",
		logo: poe_default,
		url: "https://poe.com"
	},
	{
		id: "perplexity",
		name: "Perplexity",
		logo: perplexity_default,
		url: "https://www.perplexity.ai/"
	},
	{
		id: "devv",
		name: "DEVV_",
		logo: devv_default,
		url: "https://devv.ai/"
	},
	{
		id: "tiangong-ai",
		name: i18n_default.t("minapps.tiangong-ai"),
		logo: tiangong_default,
		url: "https://www.tiangong.cn/",
		bodered: true
	},
	{
		id: "Felo",
		name: "Felo",
		logo: felo_default,
		url: "https://felo.ai/",
		bodered: true
	},
	{
		id: "duckduckgo",
		name: "DuckDuckGo",
		logo: duckduckgo_default,
		url: "https://duck.ai"
	},
	{
		id: "bolt",
		name: "bolt",
		logo: bolt_default,
		url: "https://bolt.new/",
		bodered: true
	},
	{
		id: "nm",
		name: i18n_default.t("minapps.nami-ai"),
		logo: nm_default,
		url: "https://bot.n.cn/",
		bodered: true
	},
	{
		id: "thinkany",
		name: "ThinkAny",
		logo: thinkany_default,
		url: "https://thinkany.ai/",
		bodered: true,
		style: { padding: 5 }
	},
	{
		id: "github-copilot",
		name: "GitHub Copilot",
		logo: github_copilot_default,
		url: "https://github.com/copilot"
	},
	{
		id: "genspark",
		name: "Genspark",
		logo: genspark_default,
		url: "https://www.genspark.ai/"
	},
	{
		id: "grok",
		name: "Grok",
		logo: grok_default,
		url: "https://grok.com",
		bodered: true
	},
	{
		id: "grok-x",
		name: "Grok / X",
		logo: grok_x_default,
		url: "https://x.com/i/grok",
		bodered: true
	},
	{
		id: "qwenlm",
		name: "QwenLM",
		logo: qwenlm_default,
		url: "https://qwenlm.ai/"
	},
	{
		id: "flowith",
		name: "Flowith",
		logo: flowith_default,
		url: "https://www.flowith.io/",
		bodered: true
	},
	{
		id: "3mintop",
		name: "3MinTop",
		logo: _3mintop_default,
		url: "https://3min.top",
		bodered: false
	},
	{
		id: "aistudio",
		name: "AI Studio",
		logo: aistudio_default,
		url: "https://aistudio.google.com/"
	},
	{
		id: "xiaoyi",
		name: i18n_default.t("minapps.xiaoyi"),
		logo: xiaoyi_default,
		url: "https://xiaoyi.huawei.com/chat/",
		bodered: true
	},
	{
		id: "notebooklm",
		name: "NotebookLM",
		logo: notebooklm_default,
		url: "https://notebooklm.google.com/"
	},
	{
		id: "coze",
		name: "Coze",
		logo: coze_default,
		url: "https://www.coze.com/space",
		bodered: true
	},
	{
		id: "dify",
		name: "Dify",
		logo: dify_default,
		url: "https://cloud.dify.ai/apps",
		bodered: true,
		style: { padding: 5 }
	},
	{
		id: "wpslingxi",
		name: i18n_default.t("minapps.wps-copilot"),
		logo: wpslingxi_default,
		url: "https://copilot.wps.cn/",
		bodered: true
	},
	{
		id: "lechat",
		name: "LeChat",
		logo: lechat_default,
		url: "https://chat.mistral.ai/chat",
		bodered: true
	},
	{
		id: "abacus",
		name: "Abacus",
		logo: abacus_default,
		url: "https://apps.abacus.ai/chatllm",
		bodered: true
	},
	{
		id: "lambdachat",
		name: "Lambda Chat",
		logo: lambdachat_default,
		url: "https://lambda.chat/",
		bodered: true
	},
	{
		id: "monica",
		name: "Monica",
		logo: monica_default,
		url: "https://monica.im/home/",
		bodered: true
	},
	{
		id: "you",
		name: "You",
		logo: you_default,
		url: "https://you.com/"
	},
	{
		id: "zhihu",
		name: i18n_default.t("minapps.zhihu"),
		logo: zhihu_default,
		url: "https://zhida.zhihu.com/",
		bodered: true
	},
	{
		id: "dangbei",
		name: i18n_default.t("minapps.dangbei"),
		logo: dangbei_default,
		url: "https://ai.dangbei.com/",
		bodered: true
	},
	{
		id: `zai`,
		name: `Z.ai`,
		logo: zai_default,
		url: `https://chat.z.ai/`,
		bodered: true,
		style: { padding: 10 }
	},
	{
		id: "n8n",
		name: "n8n",
		logo: n8n_default,
		url: "https://app.n8n.cloud/",
		bodered: true,
		style: { padding: 5 }
	},
	{
		id: "longcat",
		name: "LongCat",
		logo: longcat_default,
		url: "https://longcat.chat/",
		bodered: true
	},
	{
		id: "ling",
		name: i18n_default.t("minapps.ant-ling"),
		url: "https://ling.tbox.cn/chat",
		logo: ling_default,
		bodered: true,
		style: { padding: 6 }
	},
	{
		id: "huggingchat",
		name: "HuggingChat",
		url: "https://huggingface.co/chat/",
		logo: huggingchat_default,
		bodered: true,
		style: { padding: 6 }
	}
];
let DEFAULT_MIN_APPS = [...ORIGIN_DEFAULT_MIN_APPS, ...await loadCustomMiniApp()];
function updateDefaultMinApps(param) {
	DEFAULT_MIN_APPS = param;
}
const MinAppIcon = ({ app, size = 48, style, sidebar = false }) => {
	const _app = DEFAULT_MIN_APPS.find((item) => item.id === app.id);
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
const IconSpan = /* @__PURE__ */ dt.span.withConfig({ displayName: "IconSpan" })([`display:flex;justify-content:center;align-items:center;height:100%;`]);
function NutstoreIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSpan, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		...props,
		width: "16px",
		height: "16px",
		viewBox: "0 0 20 20",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "线性单坚果" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			id: "线性单坚果",
			stroke: "none",
			strokeWidth: "1",
			fill: "none",
			fillRule: "evenodd",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.1590439,0.886175571 C10.1753674,0.890326544 10.291709,0.910777855 10.428428,0.935202765 L10.6388345,0.973279488 C10.7074276,0.985937901 10.77116,0.998048871 10.8200766,1.00807156 C11.2437905,1.09488771 11.6662387,1.21011472 12.1133986,1.37210166 C13.2580363,1.78675499 14.3714894,2.43940777 15.4224927,3.39703693 L15.621,3.584 L15.6351722,3.57092562 C16.53166,2.76294504 17.6751418,2.31986999 18.4291849,2.58060734 L18.5580792,2.63399481 C18.9455012,2.81584984 19.2328582,3.16284846 19.437028,3.61729231 C19.5709871,3.91546021 19.6526725,4.21929758 19.6985752,4.50662941 C19.7148596,4.80478115 19.5904581,5.0358501 19.4098118,5.1582622 C19.3815042,5.17858714 19.3523426,5.19648783 19.3224017,5.21197531 C19.1152073,5.31915066 18.9086763,5.30466603 18.6939183,5.22086872 C18.6620576,5.20843687 18.6328325,5.19564599 18.6006654,5.18105502 C18.4394695,5.11546938 18.2846309,5.06753532 18.1365915,5.04232952 C17.7415971,4.96197402 17.3578102,5.06378907 17.051656,5.32621284 L17.046624,5.33098744 L17.1856424,5.55157847 C18.0964209,7.0577136 18.6880009,8.98631362 18.5914984,10.988329 L18.5672508,11.3423168 C18.518886,12.3590196 18.336046,13.2889191 17.9959883,14.1391815 C17.4227031,15.6418626 16.5311196,16.5912538 15.4105898,16.2529712 L15.278,16.207 C15.204042,16.2889459 15.1247235,16.3618831 15.0410669,16.4278107 L14.9126231,16.5212291 C13.2906651,17.9150353 10.9315401,19.0281897 7.99389616,19.2 L7.17106258,19.2 C3.43360072,19.2 1.02132454,17.63803 0.534391412,16.0333683 L0.513,15.954 L0.504265285,15.9449232 C-0.110228462,15.1972878 0.264421351,10.4760569 2.09599684,6.99794495 L2.22026541,6.76796973 C2.29571954,6.63016882 2.43695112,6.39220857 2.63659846,6.08729923 C2.9688861,5.57981633 3.34471126,5.07232148 3.75709487,4.59788661 C4.2749895,4.0020645 4.81413532,3.50121679 5.3386949,3.15177019 C5.36355777,3.12648036 5.4278064,3.07827062 5.50910569,3.02364741 L5.559,2.991 L5.5530361,2.96941337 C5.48899059,2.69876461 5.47862138,2.4784725 5.54146387,2.2521942 L5.58811106,2.11525813 C5.68308256,1.86409186 5.94349142,1.57994703 6.25873284,1.38755406 C6.58654657,1.18748816 7.23187921,0.95895859 7.69473739,0.883035787 C8.37505518,0.763266442 9.38159553,0.78076773 10.1590439,0.886175571 Z M6.59801776,3.85068129 C6.46732353,3.85068129 6.2240354,3.97828097 6.07844768,4.1001814 C5.59811888,4.42589962 5.12194443,4.87010868 4.65860433,5.40361803 C4.52372819,5.55892011 4.37448327,5.74624534 4.22515758,5.94252901 L4.04684241,6.18089332 C3.57610889,6.82012555 3.16307203,7.45661922 3.27592159,7.33459023 C1.39280393,10.7336939 1.18786427,14.1190682 1.66513528,15.5784041 C1.72944314,15.8645824 2.24255786,16.4352772 2.98506717,16.8902532 C4.03558482,17.5339627 5.43381914,17.9303112 7.15636912,17.9630362 L7.95282724,17.9633776 C10.5671194,17.8104156 12.6011819,16.8513512 14.1270746,15.5866906 L14.2005419,15.5269075 L14.2189125,15.5136158 C14.591184,15.2751975 14.6855045,14.9945722 14.5299888,14.3127204 C14.1480256,12.8500475 13.2023047,10.9705228 11.4802274,8.76564869 C10.6761315,7.73569508 9.84271439,6.77270459 8.9812637,5.88185595 C8.26651717,5.13999817 7.48191474,4.46126051 6.65303256,3.86947602 C6.6343697,3.85523851 6.62003281,3.85068129 6.59801776,3.85068129 Z M8.0520431,2.14478343 C7.34750556,2.24716005 6.81392621,2.48276912 6.75769294,2.58286729 C6.75315545,2.59094425 6.75172186,2.59912409 6.75788522,2.63367631 L6.761,2.653 C6.92447955,2.67441039 7.07755879,2.72514333 7.22081781,2.80306173 L7.36053304,2.88992896 C8.25106173,3.52400396 9.08393795,4.2496146 9.84209216,5.05104835 C10.7498631,5.98954517 11.620838,6.99715009 12.4127624,8.02643665 C14.2357617,10.3660968 15.255676,12.4067536 15.6810213,14.0171728 C15.7810435,14.3986973 15.8140553,14.7531702 15.7838468,15.0855202 L15.779624,15.1139874 L15.7923351,15.1170186 C16.0195271,15.1453183 16.2337261,14.9383655 16.4514,14.5090146 L16.5168229,14.3735502 C16.5998938,14.1934825 16.8522658,13.5389313 16.8131724,13.6336744 L16.800624,13.6629874 L16.8933423,13.4088509 C17.1021765,12.7846983 17.2487406,12.0003637 17.2861365,11.2776414 C17.4525549,9.34169753 16.8847303,7.51332101 15.9618076,5.9792161 C15.8725231,5.8278532 15.7620551,5.66138642 15.6942132,5.57820575 C14.7595226,4.31701776 13.5999579,3.42705248 12.3136888,2.84260842 C11.4827868,2.46507019 10.794487,2.2853603 10.1559862,2.18983638 C9.43796126,2.09113972 8.59553714,2.05880421 8.0520431,2.14478343 Z M16.4823653,4.32067121 L16.364,4.418 L16.393,4.454 L16.5100007,4.3621392 C17.0306065,3.97118443 17.6106194,3.7900296 18.1665334,3.88918284 L18.233,3.904 L18.2063581,3.87419362 C18.1376794,3.79892884 18.0675642,3.72412847 18.0165076,3.68190508 L17.972563,3.65173005 C17.800955,3.56958653 17.0606024,3.86572493 16.4823653,4.32067121 Z",
				id: "形状结合",
				fill: "currentColor",
				fillRule: "nonzero"
			})
		})]
	}) });
}
function FolderIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSpan, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16px",
		height: "16px",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 1024 1024",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "folder" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M396.5,185.7l22.7,27.2a36.1,36.1,0,0,0,27.7,12.7H906.8c29.4,0,53.2,22.8,53.2,50.9V800.1c0,28.1-23.8,50.9-53.2,50.9H117.2C87.8,851,64,828.2,64,800.1V223.9c0-28.1,23.8-50.9,53.2-50.9H368.8A36.1,36.1,0,0,1,396.5,185.7Z",
				style: { fill: "#9fddff" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M64,342.5V797.8c0,29.4,24,53.2,53.6,53.2H906.4c29.6,0,53.6-23.8,53.6-53.2V342.5Z",
				style: { fill: "#74c6ff" }
			})
		]
	}) });
}
const RefreshIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
	size: "1rem",
	...props
});
var RefreshIcon_default = RefreshIcon;
const ResetIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
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
	const { size = "1em", isActive,...svgProps } = props;
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
					"stop-color": "#8364FF"
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
					"stop-color": "#CF4BFF"
				})]
			})] })
		]
	});
}
function SvgSpinners180Ring(props) {
	const { size = "1em",...svgProps } = props;
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
init_es$12();
await init_es$12();
const logger = loggerService.withContext("ImageViewer");
const ImageViewer = ({ src, style,...props }) => {
	const { t: t$1 } = useTranslation();
	const handleCopyImage = async (src$1) => {
		try {
			let blob;
			if (src$1.startsWith("data:")) {
				const match$1 = src$1.match(/^data:(image\/\w+);base64,(.+)$/);
				if (!match$1) throw new Error("Invalid base64 image format");
				const mimeType = match$1[1];
				const byteArray = gBase64.toUint8Array(match$1[2]);
				blob = new Blob([byteArray], { type: mimeType });
			} else if (src$1.startsWith("file://")) {
				const bytes = await window.api.fs.read(src$1);
				const mimeType = src_default.getType(src$1) || "application/octet-stream";
				blob = new Blob([bytes], { type: mimeType });
			} else {
				const response = await fetch(src$1);
				blob = await response.blob();
			}
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
				toolbarRender: (_$1, { transform: { scale: scale$1 }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset } }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarWrapper, {
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
const ToolbarWrapper = /* @__PURE__ */ dt(space_default).withConfig({ displayName: "ToolbarWrapper" })([`padding:0px 24px;color:#fff;font-size:20px;background-color:rgba(0,0,0,0.1);border-radius:100px;.anticon{padding:12px;cursor:pointer;}.anticon:hover{opacity:0.3;}`]);
var ImageViewer_default = ImageViewer;
export { OverrideProvider as $, DEFAULT_MIN_APPS as A, ORIGIN_DEFAULT_MIN_APPS as B, loadCustomMiniApp as C, updateDefaultMinApps as D, FilePngIcon as E, FileSvgIcon as F, EditIcon_default as G, DeleteIcon_default as H, CopyIcon_default as I, download as J, FallbackFavicon_default as K, motion as L, emotion_is_prop_valid_esm_exports as M, init_emotion_is_prop_valid_esm as N, isPropValid as O, usePresence as P, MotionConfigContext as Q, PresenceContext as R, useIsomorphicLayoutEffect as S, useConstant as T, LayoutGroupContext as U, image_default as V, dropdown_default as W, space_default as X, isPresetSize as Y, dropdown_default$1 as Z, menu_default as _, genSubStyleComponent as a$, tooltip_default as a1, isPresetColor as a2, isPresetStatusColor as a3, getArrowOffsetToken as a4, getArrowStyle as a5, getArrowToken as a6, addMediaQueryListener as a7, removeMediaQueryListener as a8, PurePanel_default as a9, slideDownOut as aA, slideUpIn as aB, slideUpOut as aC, initMoveMotion as aD, initFadeMotion as aE, initMotion as aF, collapse_default as aG, AggregationColor as aH, toHexFormat as aI, convertLegacyProps as aJ, useCompactItemContext as aK, useSize_default as aL, wave_default as aM, TARGET_CLS as aN, getTransitionName as aO, motion_default as aP, unstableSetRender as aQ, CONTAINER_MAX_OFFSET as aR, useZIndex as aS, zindexContext_default as aT, useCSSVarCls_default as aU, cloneElement as aV, replaceElement as aW, config_provider_default as aX, globalConfig as aY, genPresetColor as aZ, genStyleHooks as a_, withPureRenderTheme as aa, prepareComponentToken$4 as ab, prepareToken as ac, style_default$5 as ad, useColStyle as ae, useRowStyle as af, ContextIsolator_default as ag, FormContext as ah, FormItemInputContext as ai, FormItemPrefixContext as aj, FormProvider$1 as ak, NoStyleItemContext as al, VariantContext as am, button_default as an, genCompactItemStyle as ao, ColorPresets_default as ap, genAlphaColor as aq, generateColor as ar, getColorAlpha as as, getGradientPercentColor as at, getRoundNumber as au, collapse_default$1 as av, initZoomMotion as aw, zoomIn as ax, initSlideMotion as ay, slideDownIn as az, ImageViewer_default as b, clearFix as b0, genFocusOutline as b1, genFocusStyle as b2, operationUnit as b3, resetComponent as b4, resetIcon as b5, textEllipsis as b6, useToken as b7, formatToken as b8, PresetColors as b9, captureScrollableAsDataURL as bA, captureScrollableIframeAsBlob as bB, captureScrollableIframeAsDataURL as bC, compressImage as bD, convertToBase64 as bE, makeSvgSizeAdaptive as bF, parseDataUrlMediaType as bG, svgToPngBlob as bH, svgToSvgBlob as bI, SizeContext_default as ba, DisabledContextProvider as bb, DisabledContext_default as bc, ConfigContext as bd, Variants as be, useComponentConfig as bf, DesignTokenContext as bg, defaultConfig as bh, theme_default$1 as bi, derivative as bj, genFontMapToken_default as bk, genControlHeight_default as bl, genColorMapToken as bm, defaultPresetColors as bn, seed_default as bo, useLocale_default as bp, getConfirmLocale as bq, en_US_default as br, en_US_default$1 as bs, validateMessagesContext_default as bt, devUseWarning as bu, Ye as bv, dt as bw, lt as bx, mt as by, captureScrollableAsBlob as bz, SvgSpinners180Ring_default as c, BingLogo as d, BochaLogo as e, ExaLogo as f, MdiLightbulbAutoOutline as g, MdiLightbulbOffOutline as h, MdiLightbulbOn as i, MdiLightbulbOn30 as j, MdiLightbulbOn50 as k, MdiLightbulbOn80 as l, MdiLightbulbOn90 as m, MdiLightbulbQuestion as n, PoeLogo as o, SearXNGLogo as p, StreamlineGoodHealthAndWellBeing as q, TavilyLogo as r, ZhipuLogo as s, lightbulbSoftVariants as t, lightbulbVariants as u, ResetIcon_default as v, RefreshIcon_default as w, FolderIcon as x, NutstoreIcon as y, MinAppIcon_default as z };
