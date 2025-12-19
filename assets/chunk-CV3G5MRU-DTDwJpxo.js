import { x as select_default } from "./src-5u9chS5z.js";
import { d as calculateTextWidth, f as decodeEntities, k as handleUndefinedAttr, n as parseFontSize } from "./chunk-U37J5Y7L-43VRkMh9.js";
import { D as hasKatex, F as log, G as parseGenericTypes, J as renderKatexSanitized, M as sanitizeText, N as sanitizeText3, d as __name, j as common_default, n as defaultConfig_default, r as evaluate, v as getConfig, w as getConfig2 } from "./src-CEhSfknn.js";
import { c as createText, d as getIconSVG } from "./chunk-62K37W7T-BeZbC9lK.js";
import { b as getSubGraphTitleMargins } from "./chunk-JSVUIEYQ-BvqTIx8Q.js";
import { b as compileStyles, d as solidStateFill, e as styles2String, f as userNodeOverrides } from "./chunk-7RNWAQOT-Cj-WKKVW.js";
function t(t$1, e$1, s$1) {
	if (t$1 && t$1.length) {
		const [n$1, o$1] = e$1, a$1 = Math.PI / 180 * s$1, h$1 = Math.cos(a$1), r$1 = Math.sin(a$1);
		for (const e$2 of t$1) {
			const [t$2, s$2] = e$2;
			e$2[0] = (t$2 - n$1) * h$1 - (s$2 - o$1) * r$1 + n$1, e$2[1] = (t$2 - n$1) * r$1 + (s$2 - o$1) * h$1 + o$1;
		}
	}
}
function e(t$1, e$1) {
	return t$1[0] === e$1[0] && t$1[1] === e$1[1];
}
function s(s$1, n$1, o$1, a$1 = 1) {
	const h$1 = o$1, r$1 = Math.max(n$1, .1), i$1 = s$1[0] && s$1[0][0] && "number" == typeof s$1[0][0] ? [s$1] : s$1, c$1 = [0, 0];
	if (h$1) for (const e$1 of i$1) t(e$1, c$1, h$1);
	const l$1 = function(t$1, s$2, n$2) {
		const o$2 = [];
		for (const s$3 of t$1) {
			const t$2 = [...s$3];
			e(t$2[0], t$2[t$2.length - 1]) || t$2.push([t$2[0][0], t$2[0][1]]), t$2.length > 2 && o$2.push(t$2);
		}
		const a$2 = [];
		s$2 = Math.max(s$2, .1);
		const h$2 = [];
		for (const t$2 of o$2) for (let e$1 = 0; e$1 < t$2.length - 1; e$1++) {
			const s$3 = t$2[e$1], n$3 = t$2[e$1 + 1];
			if (s$3[1] !== n$3[1]) {
				const t$3 = Math.min(s$3[1], n$3[1]);
				h$2.push({
					ymin: t$3,
					ymax: Math.max(s$3[1], n$3[1]),
					x: t$3 === s$3[1] ? s$3[0] : n$3[0],
					islope: (n$3[0] - s$3[0]) / (n$3[1] - s$3[1])
				});
			}
		}
		if (h$2.sort(((t$2, e$1) => t$2.ymin < e$1.ymin ? -1 : t$2.ymin > e$1.ymin ? 1 : t$2.x < e$1.x ? -1 : t$2.x > e$1.x ? 1 : t$2.ymax === e$1.ymax ? 0 : (t$2.ymax - e$1.ymax) / Math.abs(t$2.ymax - e$1.ymax))), !h$2.length) return a$2;
		let r$2 = [], i$2 = h$2[0].ymin, c$2 = 0;
		for (; r$2.length || h$2.length;) {
			if (h$2.length) {
				let t$2 = -1;
				for (let e$1 = 0; e$1 < h$2.length && !(h$2[e$1].ymin > i$2); e$1++) t$2 = e$1;
				h$2.splice(0, t$2 + 1).forEach(((t$3) => {
					r$2.push({
						s: i$2,
						edge: t$3
					});
				}));
			}
			if (r$2 = r$2.filter(((t$2) => !(t$2.edge.ymax <= i$2))), r$2.sort(((t$2, e$1) => t$2.edge.x === e$1.edge.x ? 0 : (t$2.edge.x - e$1.edge.x) / Math.abs(t$2.edge.x - e$1.edge.x))), (1 !== n$2 || c$2 % s$2 == 0) && r$2.length > 1) for (let t$2 = 0; t$2 < r$2.length; t$2 += 2) {
				const e$1 = t$2 + 1;
				if (e$1 >= r$2.length) break;
				const s$3 = r$2[t$2].edge, n$3 = r$2[e$1].edge;
				a$2.push([[Math.round(s$3.x), i$2], [Math.round(n$3.x), i$2]]);
			}
			i$2 += n$2, r$2.forEach(((t$2) => {
				t$2.edge.x = t$2.edge.x + n$2 * t$2.edge.islope;
			})), c$2++;
		}
		return a$2;
	}(i$1, r$1, a$1);
	if (h$1) {
		for (const e$1 of i$1) t(e$1, c$1, -h$1);
		(function(e$1, s$2, n$2) {
			const o$2 = [];
			e$1.forEach(((t$1) => o$2.push(...t$1))), t(o$2, s$2, n$2);
		})(l$1, c$1, -h$1);
	}
	return l$1;
}
function n(t$1, e$1) {
	var n$1;
	const o$1 = e$1.hachureAngle + 90;
	let a$1 = e$1.hachureGap;
	a$1 < 0 && (a$1 = 4 * e$1.strokeWidth), a$1 = Math.round(Math.max(a$1, .1));
	let h$1 = 1;
	return e$1.roughness >= 1 && ((null === (n$1 = e$1.randomizer) || void 0 === n$1 ? void 0 : n$1.next()) || Math.random()) > .7 && (h$1 = a$1), s(t$1, a$1, o$1, h$1 || 1);
}
var o = class {
	constructor(t$1) {
		this.helper = t$1;
	}
	fillPolygons(t$1, e$1) {
		return this._fillPolygons(t$1, e$1);
	}
	_fillPolygons(t$1, e$1) {
		const s$1 = n(t$1, e$1);
		return {
			type: "fillSketch",
			ops: this.renderLines(s$1, e$1)
		};
	}
	renderLines(t$1, e$1) {
		const s$1 = [];
		for (const n$1 of t$1) s$1.push(...this.helper.doubleLineOps(n$1[0][0], n$1[0][1], n$1[1][0], n$1[1][1], e$1));
		return s$1;
	}
};
function a(t$1) {
	const e$1 = t$1[0], s$1 = t$1[1];
	return Math.sqrt(Math.pow(e$1[0] - s$1[0], 2) + Math.pow(e$1[1] - s$1[1], 2));
}
var h = class extends o {
	fillPolygons(t$1, e$1) {
		let s$1 = e$1.hachureGap;
		s$1 < 0 && (s$1 = 4 * e$1.strokeWidth), s$1 = Math.max(s$1, .1);
		const o$1 = n(t$1, Object.assign({}, e$1, { hachureGap: s$1 })), h$1 = Math.PI / 180 * e$1.hachureAngle, r$1 = [], i$1 = .5 * s$1 * Math.cos(h$1), c$1 = .5 * s$1 * Math.sin(h$1);
		for (const [t$2, e$2] of o$1) a([t$2, e$2]) && r$1.push([[t$2[0] - i$1, t$2[1] + c$1], [...e$2]], [[t$2[0] + i$1, t$2[1] - c$1], [...e$2]]);
		return {
			type: "fillSketch",
			ops: this.renderLines(r$1, e$1)
		};
	}
};
var r = class extends o {
	fillPolygons(t$1, e$1) {
		const s$1 = this._fillPolygons(t$1, e$1), n$1 = Object.assign({}, e$1, { hachureAngle: e$1.hachureAngle + 90 }), o$1 = this._fillPolygons(t$1, n$1);
		return s$1.ops = s$1.ops.concat(o$1.ops), s$1;
	}
};
var i = class {
	constructor(t$1) {
		this.helper = t$1;
	}
	fillPolygons(t$1, e$1) {
		const s$1 = n(t$1, e$1 = Object.assign({}, e$1, { hachureAngle: 0 }));
		return this.dotsOnLines(s$1, e$1);
	}
	dotsOnLines(t$1, e$1) {
		const s$1 = [];
		let n$1 = e$1.hachureGap;
		n$1 < 0 && (n$1 = 4 * e$1.strokeWidth), n$1 = Math.max(n$1, .1);
		let o$1 = e$1.fillWeight;
		o$1 < 0 && (o$1 = e$1.strokeWidth / 2);
		const h$1 = n$1 / 4;
		for (const r$1 of t$1) {
			const t$2 = a(r$1), i$1 = t$2 / n$1, c$1 = Math.ceil(i$1) - 1, l$1 = t$2 - c$1 * n$1, u$1 = (r$1[0][0] + r$1[1][0]) / 2 - n$1 / 4, p$1 = Math.min(r$1[0][1], r$1[1][1]);
			for (let t$3 = 0; t$3 < c$1; t$3++) {
				const a$1 = p$1 + l$1 + t$3 * n$1, r$2 = u$1 - h$1 + 2 * Math.random() * h$1, i$2 = a$1 - h$1 + 2 * Math.random() * h$1, c$2 = this.helper.ellipse(r$2, i$2, o$1, o$1, e$1);
				s$1.push(...c$2.ops);
			}
		}
		return {
			type: "fillSketch",
			ops: s$1
		};
	}
};
var c = class {
	constructor(t$1) {
		this.helper = t$1;
	}
	fillPolygons(t$1, e$1) {
		const s$1 = n(t$1, e$1);
		return {
			type: "fillSketch",
			ops: this.dashedLine(s$1, e$1)
		};
	}
	dashedLine(t$1, e$1) {
		const s$1 = e$1.dashOffset < 0 ? e$1.hachureGap < 0 ? 4 * e$1.strokeWidth : e$1.hachureGap : e$1.dashOffset, n$1 = e$1.dashGap < 0 ? e$1.hachureGap < 0 ? 4 * e$1.strokeWidth : e$1.hachureGap : e$1.dashGap, o$1 = [];
		return t$1.forEach(((t$2) => {
			const h$1 = a(t$2), r$1 = Math.floor(h$1 / (s$1 + n$1)), i$1 = (h$1 + n$1 - r$1 * (s$1 + n$1)) / 2;
			let c$1 = t$2[0], l$1 = t$2[1];
			c$1[0] > l$1[0] && (c$1 = t$2[1], l$1 = t$2[0]);
			const u$1 = Math.atan((l$1[1] - c$1[1]) / (l$1[0] - c$1[0]));
			for (let t$3 = 0; t$3 < r$1; t$3++) {
				const a$1 = t$3 * (s$1 + n$1), h$2 = a$1 + s$1, r$2 = [c$1[0] + a$1 * Math.cos(u$1) + i$1 * Math.cos(u$1), c$1[1] + a$1 * Math.sin(u$1) + i$1 * Math.sin(u$1)], l$2 = [c$1[0] + h$2 * Math.cos(u$1) + i$1 * Math.cos(u$1), c$1[1] + h$2 * Math.sin(u$1) + i$1 * Math.sin(u$1)];
				o$1.push(...this.helper.doubleLineOps(r$2[0], r$2[1], l$2[0], l$2[1], e$1));
			}
		})), o$1;
	}
};
var l = class {
	constructor(t$1) {
		this.helper = t$1;
	}
	fillPolygons(t$1, e$1) {
		const s$1 = e$1.hachureGap < 0 ? 4 * e$1.strokeWidth : e$1.hachureGap, o$1 = e$1.zigzagOffset < 0 ? s$1 : e$1.zigzagOffset, a$1 = n(t$1, e$1 = Object.assign({}, e$1, { hachureGap: s$1 + o$1 }));
		return {
			type: "fillSketch",
			ops: this.zigzagLines(a$1, o$1, e$1)
		};
	}
	zigzagLines(t$1, e$1, s$1) {
		const n$1 = [];
		return t$1.forEach(((t$2) => {
			const o$1 = a(t$2), h$1 = Math.round(o$1 / (2 * e$1));
			let r$1 = t$2[0], i$1 = t$2[1];
			r$1[0] > i$1[0] && (r$1 = t$2[1], i$1 = t$2[0]);
			const c$1 = Math.atan((i$1[1] - r$1[1]) / (i$1[0] - r$1[0]));
			for (let t$3 = 0; t$3 < h$1; t$3++) {
				const o$2 = 2 * t$3 * e$1, a$1 = 2 * (t$3 + 1) * e$1, h$2 = Math.sqrt(2 * Math.pow(e$1, 2)), i$2 = [r$1[0] + o$2 * Math.cos(c$1), r$1[1] + o$2 * Math.sin(c$1)], l$1 = [r$1[0] + a$1 * Math.cos(c$1), r$1[1] + a$1 * Math.sin(c$1)], u$1 = [i$2[0] + h$2 * Math.cos(c$1 + Math.PI / 4), i$2[1] + h$2 * Math.sin(c$1 + Math.PI / 4)];
				n$1.push(...this.helper.doubleLineOps(i$2[0], i$2[1], u$1[0], u$1[1], s$1), ...this.helper.doubleLineOps(u$1[0], u$1[1], l$1[0], l$1[1], s$1));
			}
		})), n$1;
	}
};
const u = {};
var p = class {
	constructor(t$1) {
		this.seed = t$1;
	}
	next() {
		return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
	}
};
const f = 0, d = 1, g = 2, M = {
	A: 7,
	a: 7,
	C: 6,
	c: 6,
	H: 1,
	h: 1,
	L: 2,
	l: 2,
	M: 2,
	m: 2,
	Q: 4,
	q: 4,
	S: 4,
	s: 4,
	T: 2,
	t: 2,
	V: 1,
	v: 1,
	Z: 0,
	z: 0
};
function k(t$1, e$1) {
	return t$1.type === e$1;
}
function b(t$1) {
	const e$1 = [], s$1 = function(t$2) {
		const e$2 = new Array();
		for (; "" !== t$2;) if (t$2.match(/^([ \t\r\n,]+)/)) t$2 = t$2.substr(RegExp.$1.length);
		else if (t$2.match(/^([aAcChHlLmMqQsStTvVzZ])/)) e$2[e$2.length] = {
			type: f,
			text: RegExp.$1
		}, t$2 = t$2.substr(RegExp.$1.length);
		else {
			if (!t$2.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
			e$2[e$2.length] = {
				type: d,
				text: `${parseFloat(RegExp.$1)}`
			}, t$2 = t$2.substr(RegExp.$1.length);
		}
		return e$2[e$2.length] = {
			type: g,
			text: ""
		}, e$2;
	}(t$1);
	let n$1 = "BOD", o$1 = 0, a$1 = s$1[o$1];
	for (; !k(a$1, g);) {
		let h$1 = 0;
		const r$1 = [];
		if ("BOD" === n$1) {
			if ("M" !== a$1.text && "m" !== a$1.text) return b("M0,0" + t$1);
			o$1++, h$1 = M[a$1.text], n$1 = a$1.text;
		} else k(a$1, d) ? h$1 = M[n$1] : (o$1++, h$1 = M[a$1.text], n$1 = a$1.text);
		if (!(o$1 + h$1 < s$1.length)) throw new Error("Path data ended short");
		for (let t$2 = o$1; t$2 < o$1 + h$1; t$2++) {
			const e$2 = s$1[t$2];
			if (!k(e$2, d)) throw new Error("Param not a number: " + n$1 + "," + e$2.text);
			r$1[r$1.length] = +e$2.text;
		}
		if ("number" != typeof M[n$1]) throw new Error("Bad segment: " + n$1);
		{
			const t$2 = {
				key: n$1,
				data: r$1
			};
			e$1.push(t$2), o$1 += h$1, a$1 = s$1[o$1], "M" === n$1 && (n$1 = "L"), "m" === n$1 && (n$1 = "l");
		}
	}
	return e$1;
}
function y(t$1) {
	let e$1 = 0, s$1 = 0, n$1 = 0, o$1 = 0;
	const a$1 = [];
	for (const { key: h$1, data: r$1 } of t$1) switch (h$1) {
		case "M":
			a$1.push({
				key: "M",
				data: [...r$1]
			}), [e$1, s$1] = r$1, [n$1, o$1] = r$1;
			break;
		case "m":
			e$1 += r$1[0], s$1 += r$1[1], a$1.push({
				key: "M",
				data: [e$1, s$1]
			}), n$1 = e$1, o$1 = s$1;
			break;
		case "L":
			a$1.push({
				key: "L",
				data: [...r$1]
			}), [e$1, s$1] = r$1;
			break;
		case "l":
			e$1 += r$1[0], s$1 += r$1[1], a$1.push({
				key: "L",
				data: [e$1, s$1]
			});
			break;
		case "C":
			a$1.push({
				key: "C",
				data: [...r$1]
			}), e$1 = r$1[4], s$1 = r$1[5];
			break;
		case "c": {
			const t$2 = r$1.map(((t$3, n$2) => n$2 % 2 ? t$3 + s$1 : t$3 + e$1));
			a$1.push({
				key: "C",
				data: t$2
			}), e$1 = t$2[4], s$1 = t$2[5];
			break;
		}
		case "Q":
			a$1.push({
				key: "Q",
				data: [...r$1]
			}), e$1 = r$1[2], s$1 = r$1[3];
			break;
		case "q": {
			const t$2 = r$1.map(((t$3, n$2) => n$2 % 2 ? t$3 + s$1 : t$3 + e$1));
			a$1.push({
				key: "Q",
				data: t$2
			}), e$1 = t$2[2], s$1 = t$2[3];
			break;
		}
		case "A":
			a$1.push({
				key: "A",
				data: [...r$1]
			}), e$1 = r$1[5], s$1 = r$1[6];
			break;
		case "a":
			e$1 += r$1[5], s$1 += r$1[6], a$1.push({
				key: "A",
				data: [
					r$1[0],
					r$1[1],
					r$1[2],
					r$1[3],
					r$1[4],
					e$1,
					s$1
				]
			});
			break;
		case "H":
			a$1.push({
				key: "H",
				data: [...r$1]
			}), e$1 = r$1[0];
			break;
		case "h":
			e$1 += r$1[0], a$1.push({
				key: "H",
				data: [e$1]
			});
			break;
		case "V":
			a$1.push({
				key: "V",
				data: [...r$1]
			}), s$1 = r$1[0];
			break;
		case "v":
			s$1 += r$1[0], a$1.push({
				key: "V",
				data: [s$1]
			});
			break;
		case "S":
			a$1.push({
				key: "S",
				data: [...r$1]
			}), e$1 = r$1[2], s$1 = r$1[3];
			break;
		case "s": {
			const t$2 = r$1.map(((t$3, n$2) => n$2 % 2 ? t$3 + s$1 : t$3 + e$1));
			a$1.push({
				key: "S",
				data: t$2
			}), e$1 = t$2[2], s$1 = t$2[3];
			break;
		}
		case "T":
			a$1.push({
				key: "T",
				data: [...r$1]
			}), e$1 = r$1[0], s$1 = r$1[1];
			break;
		case "t":
			e$1 += r$1[0], s$1 += r$1[1], a$1.push({
				key: "T",
				data: [e$1, s$1]
			});
			break;
		case "Z":
		case "z": a$1.push({
			key: "Z",
			data: []
		}), e$1 = n$1, s$1 = o$1;
	}
	return a$1;
}
function m(t$1) {
	const e$1 = [];
	let s$1 = "", n$1 = 0, o$1 = 0, a$1 = 0, h$1 = 0, r$1 = 0, i$1 = 0;
	for (const { key: c$1, data: l$1 } of t$1) {
		switch (c$1) {
			case "M":
				e$1.push({
					key: "M",
					data: [...l$1]
				}), [n$1, o$1] = l$1, [a$1, h$1] = l$1;
				break;
			case "C":
				e$1.push({
					key: "C",
					data: [...l$1]
				}), n$1 = l$1[4], o$1 = l$1[5], r$1 = l$1[2], i$1 = l$1[3];
				break;
			case "L":
				e$1.push({
					key: "L",
					data: [...l$1]
				}), [n$1, o$1] = l$1;
				break;
			case "H":
				n$1 = l$1[0], e$1.push({
					key: "L",
					data: [n$1, o$1]
				});
				break;
			case "V":
				o$1 = l$1[0], e$1.push({
					key: "L",
					data: [n$1, o$1]
				});
				break;
			case "S": {
				let t$2 = 0, a$2 = 0;
				"C" === s$1 || "S" === s$1 ? (t$2 = n$1 + (n$1 - r$1), a$2 = o$1 + (o$1 - i$1)) : (t$2 = n$1, a$2 = o$1), e$1.push({
					key: "C",
					data: [
						t$2,
						a$2,
						...l$1
					]
				}), r$1 = l$1[0], i$1 = l$1[1], n$1 = l$1[2], o$1 = l$1[3];
				break;
			}
			case "T": {
				const [t$2, a$2] = l$1;
				let h$2 = 0, c$2 = 0;
				"Q" === s$1 || "T" === s$1 ? (h$2 = n$1 + (n$1 - r$1), c$2 = o$1 + (o$1 - i$1)) : (h$2 = n$1, c$2 = o$1);
				const u$1 = n$1 + 2 * (h$2 - n$1) / 3, p$1 = o$1 + 2 * (c$2 - o$1) / 3, f$1 = t$2 + 2 * (h$2 - t$2) / 3, d$1 = a$2 + 2 * (c$2 - a$2) / 3;
				e$1.push({
					key: "C",
					data: [
						u$1,
						p$1,
						f$1,
						d$1,
						t$2,
						a$2
					]
				}), r$1 = h$2, i$1 = c$2, n$1 = t$2, o$1 = a$2;
				break;
			}
			case "Q": {
				const [t$2, s$2, a$2, h$2] = l$1, c$2 = n$1 + 2 * (t$2 - n$1) / 3, u$1 = o$1 + 2 * (s$2 - o$1) / 3, p$1 = a$2 + 2 * (t$2 - a$2) / 3, f$1 = h$2 + 2 * (s$2 - h$2) / 3;
				e$1.push({
					key: "C",
					data: [
						c$2,
						u$1,
						p$1,
						f$1,
						a$2,
						h$2
					]
				}), r$1 = t$2, i$1 = s$2, n$1 = a$2, o$1 = h$2;
				break;
			}
			case "A": {
				const t$2 = Math.abs(l$1[0]), s$2 = Math.abs(l$1[1]), a$2 = l$1[2], h$2 = l$1[3], r$2 = l$1[4], i$2 = l$1[5], c$2 = l$1[6];
				if (0 === t$2 || 0 === s$2) e$1.push({
					key: "C",
					data: [
						n$1,
						o$1,
						i$2,
						c$2,
						i$2,
						c$2
					]
				}), n$1 = i$2, o$1 = c$2;
				else if (n$1 !== i$2 || o$1 !== c$2) x(n$1, o$1, i$2, c$2, t$2, s$2, a$2, h$2, r$2).forEach((function(t$3) {
					e$1.push({
						key: "C",
						data: t$3
					});
				})), n$1 = i$2, o$1 = c$2;
				break;
			}
			case "Z": e$1.push({
				key: "Z",
				data: []
			}), n$1 = a$1, o$1 = h$1;
		}
		s$1 = c$1;
	}
	return e$1;
}
function w(t$1, e$1, s$1) {
	return [t$1 * Math.cos(s$1) - e$1 * Math.sin(s$1), t$1 * Math.sin(s$1) + e$1 * Math.cos(s$1)];
}
function x(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1, i$1, c$1) {
	const l$1 = (u$1 = h$1, Math.PI * u$1 / 180);
	var u$1;
	let p$1 = [], f$1 = 0, d$1 = 0, g$1 = 0, M$1 = 0;
	if (c$1) [f$1, d$1, g$1, M$1] = c$1;
	else {
		[t$1, e$1] = w(t$1, e$1, -l$1), [s$1, n$1] = w(s$1, n$1, -l$1);
		const h$2 = (t$1 - s$1) / 2, c$2 = (e$1 - n$1) / 2;
		let u$2 = h$2 * h$2 / (o$1 * o$1) + c$2 * c$2 / (a$1 * a$1);
		u$2 > 1 && (u$2 = Math.sqrt(u$2), o$1 *= u$2, a$1 *= u$2);
		const p$2 = o$1 * o$1, k$2 = a$1 * a$1, b$2 = p$2 * k$2 - p$2 * c$2 * c$2 - k$2 * h$2 * h$2, y$2 = p$2 * c$2 * c$2 + k$2 * h$2 * h$2, m$2 = (r$1 === i$1 ? -1 : 1) * Math.sqrt(Math.abs(b$2 / y$2));
		g$1 = m$2 * o$1 * c$2 / a$1 + (t$1 + s$1) / 2, M$1 = m$2 * -a$1 * h$2 / o$1 + (e$1 + n$1) / 2, f$1 = Math.asin(parseFloat(((e$1 - M$1) / a$1).toFixed(9))), d$1 = Math.asin(parseFloat(((n$1 - M$1) / a$1).toFixed(9))), t$1 < g$1 && (f$1 = Math.PI - f$1), s$1 < g$1 && (d$1 = Math.PI - d$1), f$1 < 0 && (f$1 = 2 * Math.PI + f$1), d$1 < 0 && (d$1 = 2 * Math.PI + d$1), i$1 && f$1 > d$1 && (f$1 -= 2 * Math.PI), !i$1 && d$1 > f$1 && (d$1 -= 2 * Math.PI);
	}
	let k$1 = d$1 - f$1;
	if (Math.abs(k$1) > 120 * Math.PI / 180) {
		const t$2 = d$1, e$2 = s$1, r$2 = n$1;
		d$1 = i$1 && d$1 > f$1 ? f$1 + 120 * Math.PI / 180 * 1 : f$1 + 120 * Math.PI / 180 * -1, p$1 = x(s$1 = g$1 + o$1 * Math.cos(d$1), n$1 = M$1 + a$1 * Math.sin(d$1), e$2, r$2, o$1, a$1, h$1, 0, i$1, [
			d$1,
			t$2,
			g$1,
			M$1
		]);
	}
	k$1 = d$1 - f$1;
	const b$1 = Math.cos(f$1), y$1 = Math.sin(f$1), m$1 = Math.cos(d$1), P$1 = Math.sin(d$1), v$1 = Math.tan(k$1 / 4), S$1 = 4 / 3 * o$1 * v$1, O$1 = 4 / 3 * a$1 * v$1, L$1 = [t$1, e$1], T$1 = [t$1 + S$1 * y$1, e$1 - O$1 * b$1], D$1 = [s$1 + S$1 * P$1, n$1 - O$1 * m$1], A$1 = [s$1, n$1];
	if (T$1[0] = 2 * L$1[0] - T$1[0], T$1[1] = 2 * L$1[1] - T$1[1], c$1) return [
		T$1,
		D$1,
		A$1
	].concat(p$1);
	{
		p$1 = [
			T$1,
			D$1,
			A$1
		].concat(p$1);
		const t$2 = [];
		for (let e$2 = 0; e$2 < p$1.length; e$2 += 3) {
			const s$2 = w(p$1[e$2][0], p$1[e$2][1], l$1), n$2 = w(p$1[e$2 + 1][0], p$1[e$2 + 1][1], l$1), o$2 = w(p$1[e$2 + 2][0], p$1[e$2 + 2][1], l$1);
			t$2.push([
				s$2[0],
				s$2[1],
				n$2[0],
				n$2[1],
				o$2[0],
				o$2[1]
			]);
		}
		return t$2;
	}
}
const P = {
	randOffset: function(t$1, e$1) {
		return G(t$1, e$1);
	},
	randOffsetWithRange: function(t$1, e$1, s$1) {
		return E(t$1, e$1, s$1);
	},
	ellipse: function(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = T(s$1, n$1, o$1);
		return D(t$1, e$1, o$1, a$1).opset;
	},
	doubleLineOps: function(t$1, e$1, s$1, n$1, o$1) {
		return $(t$1, e$1, s$1, n$1, o$1, !0);
	}
};
function v(t$1, e$1, s$1, n$1, o$1) {
	return {
		type: "path",
		ops: $(t$1, e$1, s$1, n$1, o$1)
	};
}
function S(t$1, e$1, s$1) {
	const n$1 = (t$1 || []).length;
	if (n$1 > 2) {
		const o$1 = [];
		for (let e$2 = 0; e$2 < n$1 - 1; e$2++) o$1.push(...$(t$1[e$2][0], t$1[e$2][1], t$1[e$2 + 1][0], t$1[e$2 + 1][1], s$1));
		return e$1 && o$1.push(...$(t$1[n$1 - 1][0], t$1[n$1 - 1][1], t$1[0][0], t$1[0][1], s$1)), {
			type: "path",
			ops: o$1
		};
	}
	return 2 === n$1 ? v(t$1[0][0], t$1[0][1], t$1[1][0], t$1[1][1], s$1) : {
		type: "path",
		ops: []
	};
}
function O(t$1, e$1, s$1, n$1, o$1) {
	return function(t$2, e$2) {
		return S(t$2, !0, e$2);
	}([
		[t$1, e$1],
		[t$1 + s$1, e$1],
		[t$1 + s$1, e$1 + n$1],
		[t$1, e$1 + n$1]
	], o$1);
}
function L(t$1, e$1) {
	if (t$1.length) {
		const s$1 = "number" == typeof t$1[0][0] ? [t$1] : t$1, n$1 = j(s$1[0], 1 * (1 + .2 * e$1.roughness), e$1), o$1 = e$1.disableMultiStroke ? [] : j(s$1[0], 1.5 * (1 + .22 * e$1.roughness), z(e$1));
		for (let t$2 = 1; t$2 < s$1.length; t$2++) {
			const a$1 = s$1[t$2];
			if (a$1.length) {
				const t$3 = j(a$1, 1 * (1 + .2 * e$1.roughness), e$1), s$2 = e$1.disableMultiStroke ? [] : j(a$1, 1.5 * (1 + .22 * e$1.roughness), z(e$1));
				for (const e$2 of t$3) "move" !== e$2.op && n$1.push(e$2);
				for (const t$4 of s$2) "move" !== t$4.op && o$1.push(t$4);
			}
		}
		return {
			type: "path",
			ops: n$1.concat(o$1)
		};
	}
	return {
		type: "path",
		ops: []
	};
}
function T(t$1, e$1, s$1) {
	const n$1 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t$1 / 2, 2) + Math.pow(e$1 / 2, 2)) / 2)), o$1 = Math.ceil(Math.max(s$1.curveStepCount, s$1.curveStepCount / Math.sqrt(200) * n$1)), a$1 = 2 * Math.PI / o$1;
	let h$1 = Math.abs(t$1 / 2), r$1 = Math.abs(e$1 / 2);
	const i$1 = 1 - s$1.curveFitting;
	return h$1 += G(h$1 * i$1, s$1), r$1 += G(r$1 * i$1, s$1), {
		increment: a$1,
		rx: h$1,
		ry: r$1
	};
}
function D(t$1, e$1, s$1, n$1) {
	const [o$1, a$1] = F(n$1.increment, t$1, e$1, n$1.rx, n$1.ry, 1, n$1.increment * E(.1, E(.4, 1, s$1), s$1), s$1);
	let h$1 = q(o$1, null, s$1);
	if (!s$1.disableMultiStroke && 0 !== s$1.roughness) {
		const [o$2] = F(n$1.increment, t$1, e$1, n$1.rx, n$1.ry, 1.5, 0, s$1), a$2 = q(o$2, null, s$1);
		h$1 = h$1.concat(a$2);
	}
	return {
		estimatedPoints: a$1,
		opset: {
			type: "path",
			ops: h$1
		}
	};
}
function A(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1, i$1) {
	const c$1 = t$1, l$1 = e$1;
	let u$1 = Math.abs(s$1 / 2), p$1 = Math.abs(n$1 / 2);
	u$1 += G(.01 * u$1, i$1), p$1 += G(.01 * p$1, i$1);
	let f$1 = o$1, d$1 = a$1;
	for (; f$1 < 0;) f$1 += 2 * Math.PI, d$1 += 2 * Math.PI;
	d$1 - f$1 > 2 * Math.PI && (f$1 = 0, d$1 = 2 * Math.PI);
	const g$1 = 2 * Math.PI / i$1.curveStepCount, M$1 = Math.min(g$1 / 2, (d$1 - f$1) / 2), k$1 = V(M$1, c$1, l$1, u$1, p$1, f$1, d$1, 1, i$1);
	if (!i$1.disableMultiStroke) {
		const t$2 = V(M$1, c$1, l$1, u$1, p$1, f$1, d$1, 1.5, i$1);
		k$1.push(...t$2);
	}
	return h$1 && (r$1 ? k$1.push(...$(c$1, l$1, c$1 + u$1 * Math.cos(f$1), l$1 + p$1 * Math.sin(f$1), i$1), ...$(c$1, l$1, c$1 + u$1 * Math.cos(d$1), l$1 + p$1 * Math.sin(d$1), i$1)) : k$1.push({
		op: "lineTo",
		data: [c$1, l$1]
	}, {
		op: "lineTo",
		data: [c$1 + u$1 * Math.cos(f$1), l$1 + p$1 * Math.sin(f$1)]
	})), {
		type: "path",
		ops: k$1
	};
}
function _(t$1, e$1) {
	const s$1 = m(y(b(t$1))), n$1 = [];
	let o$1 = [0, 0], a$1 = [0, 0];
	for (const { key: t$2, data: h$1 } of s$1) switch (t$2) {
		case "M":
			a$1 = [h$1[0], h$1[1]], o$1 = [h$1[0], h$1[1]];
			break;
		case "L":
			n$1.push(...$(a$1[0], a$1[1], h$1[0], h$1[1], e$1)), a$1 = [h$1[0], h$1[1]];
			break;
		case "C": {
			const [t$3, s$2, o$2, r$1, i$1, c$1] = h$1;
			n$1.push(...Z(t$3, s$2, o$2, r$1, i$1, c$1, a$1, e$1)), a$1 = [i$1, c$1];
			break;
		}
		case "Z": n$1.push(...$(a$1[0], a$1[1], o$1[0], o$1[1], e$1)), a$1 = [o$1[0], o$1[1]];
	}
	return {
		type: "path",
		ops: n$1
	};
}
function I(t$1, e$1) {
	const s$1 = [];
	for (const n$1 of t$1) if (n$1.length) {
		const t$2 = e$1.maxRandomnessOffset || 0, o$1 = n$1.length;
		if (o$1 > 2) {
			s$1.push({
				op: "move",
				data: [n$1[0][0] + G(t$2, e$1), n$1[0][1] + G(t$2, e$1)]
			});
			for (let a$1 = 1; a$1 < o$1; a$1++) s$1.push({
				op: "lineTo",
				data: [n$1[a$1][0] + G(t$2, e$1), n$1[a$1][1] + G(t$2, e$1)]
			});
		}
	}
	return {
		type: "fillPath",
		ops: s$1
	};
}
function C(t$1, e$1) {
	return function(t$2, e$2) {
		let s$1 = t$2.fillStyle || "hachure";
		if (!u[s$1]) switch (s$1) {
			case "zigzag":
				u[s$1] || (u[s$1] = new h(e$2));
				break;
			case "cross-hatch":
				u[s$1] || (u[s$1] = new r(e$2));
				break;
			case "dots":
				u[s$1] || (u[s$1] = new i(e$2));
				break;
			case "dashed":
				u[s$1] || (u[s$1] = new c(e$2));
				break;
			case "zigzag-line":
				u[s$1] || (u[s$1] = new l(e$2));
				break;
			default: s$1 = "hachure", u[s$1] || (u[s$1] = new o(e$2));
		}
		return u[s$1];
	}(e$1, P).fillPolygons(t$1, e$1);
}
function z(t$1) {
	const e$1 = Object.assign({}, t$1);
	return e$1.randomizer = void 0, t$1.seed && (e$1.seed = t$1.seed + 1), e$1;
}
function W(t$1) {
	return t$1.randomizer || (t$1.randomizer = new p(t$1.seed || 0)), t$1.randomizer.next();
}
function E(t$1, e$1, s$1, n$1 = 1) {
	return s$1.roughness * n$1 * (W(s$1) * (e$1 - t$1) + t$1);
}
function G(t$1, e$1, s$1 = 1) {
	return E(-t$1, t$1, e$1, s$1);
}
function $(t$1, e$1, s$1, n$1, o$1, a$1 = !1) {
	const h$1 = a$1 ? o$1.disableMultiStrokeFill : o$1.disableMultiStroke, r$1 = R(t$1, e$1, s$1, n$1, o$1, !0, !1);
	if (h$1) return r$1;
	const i$1 = R(t$1, e$1, s$1, n$1, o$1, !0, !0);
	return r$1.concat(i$1);
}
function R(t$1, e$1, s$1, n$1, o$1, a$1, h$1) {
	const r$1 = Math.pow(t$1 - s$1, 2) + Math.pow(e$1 - n$1, 2), i$1 = Math.sqrt(r$1);
	let c$1 = 1;
	c$1 = i$1 < 200 ? 1 : i$1 > 500 ? .4 : -.0016668 * i$1 + 1.233334;
	let l$1 = o$1.maxRandomnessOffset || 0;
	l$1 * l$1 * 100 > r$1 && (l$1 = i$1 / 10);
	const u$1 = l$1 / 2, p$1 = .2 + .2 * W(o$1);
	let f$1 = o$1.bowing * o$1.maxRandomnessOffset * (n$1 - e$1) / 200, d$1 = o$1.bowing * o$1.maxRandomnessOffset * (t$1 - s$1) / 200;
	f$1 = G(f$1, o$1, c$1), d$1 = G(d$1, o$1, c$1);
	const g$1 = [], M$1 = () => G(u$1, o$1, c$1), k$1 = () => G(l$1, o$1, c$1), b$1 = o$1.preserveVertices;
	return a$1 && (h$1 ? g$1.push({
		op: "move",
		data: [t$1 + (b$1 ? 0 : M$1()), e$1 + (b$1 ? 0 : M$1())]
	}) : g$1.push({
		op: "move",
		data: [t$1 + (b$1 ? 0 : G(l$1, o$1, c$1)), e$1 + (b$1 ? 0 : G(l$1, o$1, c$1))]
	})), h$1 ? g$1.push({
		op: "bcurveTo",
		data: [
			f$1 + t$1 + (s$1 - t$1) * p$1 + M$1(),
			d$1 + e$1 + (n$1 - e$1) * p$1 + M$1(),
			f$1 + t$1 + 2 * (s$1 - t$1) * p$1 + M$1(),
			d$1 + e$1 + 2 * (n$1 - e$1) * p$1 + M$1(),
			s$1 + (b$1 ? 0 : M$1()),
			n$1 + (b$1 ? 0 : M$1())
		]
	}) : g$1.push({
		op: "bcurveTo",
		data: [
			f$1 + t$1 + (s$1 - t$1) * p$1 + k$1(),
			d$1 + e$1 + (n$1 - e$1) * p$1 + k$1(),
			f$1 + t$1 + 2 * (s$1 - t$1) * p$1 + k$1(),
			d$1 + e$1 + 2 * (n$1 - e$1) * p$1 + k$1(),
			s$1 + (b$1 ? 0 : k$1()),
			n$1 + (b$1 ? 0 : k$1())
		]
	}), g$1;
}
function j(t$1, e$1, s$1) {
	if (!t$1.length) return [];
	const n$1 = [];
	n$1.push([t$1[0][0] + G(e$1, s$1), t$1[0][1] + G(e$1, s$1)]), n$1.push([t$1[0][0] + G(e$1, s$1), t$1[0][1] + G(e$1, s$1)]);
	for (let o$1 = 1; o$1 < t$1.length; o$1++) n$1.push([t$1[o$1][0] + G(e$1, s$1), t$1[o$1][1] + G(e$1, s$1)]), o$1 === t$1.length - 1 && n$1.push([t$1[o$1][0] + G(e$1, s$1), t$1[o$1][1] + G(e$1, s$1)]);
	return q(n$1, null, s$1);
}
function q(t$1, e$1, s$1) {
	const n$1 = t$1.length, o$1 = [];
	if (n$1 > 3) {
		const a$1 = [], h$1 = 1 - s$1.curveTightness;
		o$1.push({
			op: "move",
			data: [t$1[1][0], t$1[1][1]]
		});
		for (let e$2 = 1; e$2 + 2 < n$1; e$2++) {
			const s$2 = t$1[e$2];
			a$1[0] = [s$2[0], s$2[1]], a$1[1] = [s$2[0] + (h$1 * t$1[e$2 + 1][0] - h$1 * t$1[e$2 - 1][0]) / 6, s$2[1] + (h$1 * t$1[e$2 + 1][1] - h$1 * t$1[e$2 - 1][1]) / 6], a$1[2] = [t$1[e$2 + 1][0] + (h$1 * t$1[e$2][0] - h$1 * t$1[e$2 + 2][0]) / 6, t$1[e$2 + 1][1] + (h$1 * t$1[e$2][1] - h$1 * t$1[e$2 + 2][1]) / 6], a$1[3] = [t$1[e$2 + 1][0], t$1[e$2 + 1][1]], o$1.push({
				op: "bcurveTo",
				data: [
					a$1[1][0],
					a$1[1][1],
					a$1[2][0],
					a$1[2][1],
					a$1[3][0],
					a$1[3][1]
				]
			});
		}
		if (e$1 && 2 === e$1.length) {
			const t$2 = s$1.maxRandomnessOffset;
			o$1.push({
				op: "lineTo",
				data: [e$1[0] + G(t$2, s$1), e$1[1] + G(t$2, s$1)]
			});
		}
	} else 3 === n$1 ? (o$1.push({
		op: "move",
		data: [t$1[1][0], t$1[1][1]]
	}), o$1.push({
		op: "bcurveTo",
		data: [
			t$1[1][0],
			t$1[1][1],
			t$1[2][0],
			t$1[2][1],
			t$1[2][0],
			t$1[2][1]
		]
	})) : 2 === n$1 && o$1.push(...R(t$1[0][0], t$1[0][1], t$1[1][0], t$1[1][1], s$1, !0, !0));
	return o$1;
}
function F(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1) {
	const i$1 = [], c$1 = [];
	if (0 === r$1.roughness) {
		t$1 /= 4, c$1.push([e$1 + n$1 * Math.cos(-t$1), s$1 + o$1 * Math.sin(-t$1)]);
		for (let a$2 = 0; a$2 <= 2 * Math.PI; a$2 += t$1) {
			const t$2 = [e$1 + n$1 * Math.cos(a$2), s$1 + o$1 * Math.sin(a$2)];
			i$1.push(t$2), c$1.push(t$2);
		}
		c$1.push([e$1 + n$1 * Math.cos(0), s$1 + o$1 * Math.sin(0)]), c$1.push([e$1 + n$1 * Math.cos(t$1), s$1 + o$1 * Math.sin(t$1)]);
	} else {
		const l$1 = G(.5, r$1) - Math.PI / 2;
		c$1.push([G(a$1, r$1) + e$1 + .9 * n$1 * Math.cos(l$1 - t$1), G(a$1, r$1) + s$1 + .9 * o$1 * Math.sin(l$1 - t$1)]);
		const u$1 = 2 * Math.PI + l$1 - .01;
		for (let h$2 = l$1; h$2 < u$1; h$2 += t$1) {
			const t$2 = [G(a$1, r$1) + e$1 + n$1 * Math.cos(h$2), G(a$1, r$1) + s$1 + o$1 * Math.sin(h$2)];
			i$1.push(t$2), c$1.push(t$2);
		}
		c$1.push([G(a$1, r$1) + e$1 + n$1 * Math.cos(l$1 + 2 * Math.PI + .5 * h$1), G(a$1, r$1) + s$1 + o$1 * Math.sin(l$1 + 2 * Math.PI + .5 * h$1)]), c$1.push([G(a$1, r$1) + e$1 + .98 * n$1 * Math.cos(l$1 + h$1), G(a$1, r$1) + s$1 + .98 * o$1 * Math.sin(l$1 + h$1)]), c$1.push([G(a$1, r$1) + e$1 + .9 * n$1 * Math.cos(l$1 + .5 * h$1), G(a$1, r$1) + s$1 + .9 * o$1 * Math.sin(l$1 + .5 * h$1)]);
	}
	return [c$1, i$1];
}
function V(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1, i$1) {
	const c$1 = a$1 + G(.1, i$1), l$1 = [];
	l$1.push([G(r$1, i$1) + e$1 + .9 * n$1 * Math.cos(c$1 - t$1), G(r$1, i$1) + s$1 + .9 * o$1 * Math.sin(c$1 - t$1)]);
	for (let a$2 = c$1; a$2 <= h$1; a$2 += t$1) l$1.push([G(r$1, i$1) + e$1 + n$1 * Math.cos(a$2), G(r$1, i$1) + s$1 + o$1 * Math.sin(a$2)]);
	return l$1.push([e$1 + n$1 * Math.cos(h$1), s$1 + o$1 * Math.sin(h$1)]), l$1.push([e$1 + n$1 * Math.cos(h$1), s$1 + o$1 * Math.sin(h$1)]), q(l$1, null, i$1);
}
function Z(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1) {
	const i$1 = [], c$1 = [r$1.maxRandomnessOffset || 1, (r$1.maxRandomnessOffset || 1) + .3];
	let l$1 = [0, 0];
	const u$1 = r$1.disableMultiStroke ? 1 : 2, p$1 = r$1.preserveVertices;
	for (let f$1 = 0; f$1 < u$1; f$1++) 0 === f$1 ? i$1.push({
		op: "move",
		data: [h$1[0], h$1[1]]
	}) : i$1.push({
		op: "move",
		data: [h$1[0] + (p$1 ? 0 : G(c$1[0], r$1)), h$1[1] + (p$1 ? 0 : G(c$1[0], r$1))]
	}), l$1 = p$1 ? [o$1, a$1] : [o$1 + G(c$1[f$1], r$1), a$1 + G(c$1[f$1], r$1)], i$1.push({
		op: "bcurveTo",
		data: [
			t$1 + G(c$1[f$1], r$1),
			e$1 + G(c$1[f$1], r$1),
			s$1 + G(c$1[f$1], r$1),
			n$1 + G(c$1[f$1], r$1),
			l$1[0],
			l$1[1]
		]
	});
	return i$1;
}
function Q(t$1) {
	return [...t$1];
}
function H(t$1, e$1 = 0) {
	const s$1 = t$1.length;
	if (s$1 < 3) throw new Error("A curve must have at least three points.");
	const n$1 = [];
	if (3 === s$1) n$1.push(Q(t$1[0]), Q(t$1[1]), Q(t$1[2]), Q(t$1[2]));
	else {
		const s$2 = [];
		s$2.push(t$1[0], t$1[0]);
		for (let e$2 = 1; e$2 < t$1.length; e$2++) s$2.push(t$1[e$2]), e$2 === t$1.length - 1 && s$2.push(t$1[e$2]);
		const o$1 = [], a$1 = 1 - e$1;
		n$1.push(Q(s$2[0]));
		for (let t$2 = 1; t$2 + 2 < s$2.length; t$2++) {
			const e$2 = s$2[t$2];
			o$1[0] = [e$2[0], e$2[1]], o$1[1] = [e$2[0] + (a$1 * s$2[t$2 + 1][0] - a$1 * s$2[t$2 - 1][0]) / 6, e$2[1] + (a$1 * s$2[t$2 + 1][1] - a$1 * s$2[t$2 - 1][1]) / 6], o$1[2] = [s$2[t$2 + 1][0] + (a$1 * s$2[t$2][0] - a$1 * s$2[t$2 + 2][0]) / 6, s$2[t$2 + 1][1] + (a$1 * s$2[t$2][1] - a$1 * s$2[t$2 + 2][1]) / 6], o$1[3] = [s$2[t$2 + 1][0], s$2[t$2 + 1][1]], n$1.push(o$1[1], o$1[2], o$1[3]);
		}
	}
	return n$1;
}
function N(t$1, e$1) {
	return Math.pow(t$1[0] - e$1[0], 2) + Math.pow(t$1[1] - e$1[1], 2);
}
function B(t$1, e$1, s$1) {
	const n$1 = N(e$1, s$1);
	if (0 === n$1) return N(t$1, e$1);
	let o$1 = ((t$1[0] - e$1[0]) * (s$1[0] - e$1[0]) + (t$1[1] - e$1[1]) * (s$1[1] - e$1[1])) / n$1;
	return o$1 = Math.max(0, Math.min(1, o$1)), N(t$1, J(e$1, s$1, o$1));
}
function J(t$1, e$1, s$1) {
	return [t$1[0] + (e$1[0] - t$1[0]) * s$1, t$1[1] + (e$1[1] - t$1[1]) * s$1];
}
function K(t$1, e$1, s$1, n$1) {
	const o$1 = n$1 || [];
	if (function(t$2, e$2) {
		const s$2 = t$2[e$2 + 0], n$2 = t$2[e$2 + 1], o$2 = t$2[e$2 + 2], a$2 = t$2[e$2 + 3];
		let h$2 = 3 * n$2[0] - 2 * s$2[0] - a$2[0];
		h$2 *= h$2;
		let r$1 = 3 * n$2[1] - 2 * s$2[1] - a$2[1];
		r$1 *= r$1;
		let i$1 = 3 * o$2[0] - 2 * a$2[0] - s$2[0];
		i$1 *= i$1;
		let c$1 = 3 * o$2[1] - 2 * a$2[1] - s$2[1];
		return c$1 *= c$1, h$2 < i$1 && (h$2 = i$1), r$1 < c$1 && (r$1 = c$1), h$2 + r$1;
	}(t$1, e$1) < s$1) {
		const s$2 = t$1[e$1 + 0];
		if (o$1.length) (a$1 = o$1[o$1.length - 1], h$1 = s$2, Math.sqrt(N(a$1, h$1))) > 1 && o$1.push(s$2);
		else o$1.push(s$2);
		o$1.push(t$1[e$1 + 3]);
	} else {
		const n$2 = .5, a$2 = t$1[e$1 + 0], h$2 = t$1[e$1 + 1], r$1 = t$1[e$1 + 2], i$1 = t$1[e$1 + 3], c$1 = J(a$2, h$2, n$2), l$1 = J(h$2, r$1, n$2), u$1 = J(r$1, i$1, n$2), p$1 = J(c$1, l$1, n$2), f$1 = J(l$1, u$1, n$2), d$1 = J(p$1, f$1, n$2);
		K([
			a$2,
			c$1,
			p$1,
			d$1
		], 0, s$1, o$1), K([
			d$1,
			f$1,
			u$1,
			i$1
		], 0, s$1, o$1);
	}
	var a$1, h$1;
	return o$1;
}
function U(t$1, e$1) {
	return X(t$1, 0, t$1.length, e$1);
}
function X(t$1, e$1, s$1, n$1, o$1) {
	const a$1 = o$1 || [], h$1 = t$1[e$1], r$1 = t$1[s$1 - 1];
	let i$1 = 0, c$1 = 1;
	for (let n$2 = e$1 + 1; n$2 < s$1 - 1; ++n$2) {
		const e$2 = B(t$1[n$2], h$1, r$1);
		e$2 > i$1 && (i$1 = e$2, c$1 = n$2);
	}
	return Math.sqrt(i$1) > n$1 ? (X(t$1, e$1, c$1 + 1, n$1, a$1), X(t$1, c$1, s$1, n$1, a$1)) : (a$1.length || a$1.push(h$1), a$1.push(r$1)), a$1;
}
function Y(t$1, e$1 = .15, s$1) {
	const n$1 = [], o$1 = (t$1.length - 1) / 3;
	for (let s$2 = 0; s$2 < o$1; s$2++) K(t$1, 3 * s$2, e$1, n$1);
	return s$1 && s$1 > 0 ? X(n$1, 0, n$1.length, s$1) : n$1;
}
const tt = "none";
var et = class {
	constructor(t$1) {
		this.defaultOptions = {
			maxRandomnessOffset: 2,
			roughness: 1,
			bowing: 1,
			stroke: "#000",
			strokeWidth: 1,
			curveTightness: 0,
			curveFitting: .95,
			curveStepCount: 9,
			fillStyle: "hachure",
			fillWeight: -1,
			hachureAngle: -41,
			hachureGap: -1,
			dashOffset: -1,
			dashGap: -1,
			zigzagOffset: -1,
			seed: 0,
			disableMultiStroke: !1,
			disableMultiStrokeFill: !1,
			preserveVertices: !1,
			fillShapeRoughnessGain: .8
		}, this.config = t$1 || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
	}
	static newSeed() {
		return Math.floor(Math.random() * 2 ** 31);
	}
	_o(t$1) {
		return t$1 ? Object.assign({}, this.defaultOptions, t$1) : this.defaultOptions;
	}
	_d(t$1, e$1, s$1) {
		return {
			shape: t$1,
			sets: e$1 || [],
			options: s$1 || this.defaultOptions
		};
	}
	line(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this._o(o$1);
		return this._d("line", [v(t$1, e$1, s$1, n$1, a$1)], a$1);
	}
	rectangle(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this._o(o$1), h$1 = [], r$1 = O(t$1, e$1, s$1, n$1, a$1);
		if (a$1.fill) {
			const o$2 = [
				[t$1, e$1],
				[t$1 + s$1, e$1],
				[t$1 + s$1, e$1 + n$1],
				[t$1, e$1 + n$1]
			];
			"solid" === a$1.fillStyle ? h$1.push(I([o$2], a$1)) : h$1.push(C([o$2], a$1));
		}
		return a$1.stroke !== tt && h$1.push(r$1), this._d("rectangle", h$1, a$1);
	}
	ellipse(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this._o(o$1), h$1 = [], r$1 = T(s$1, n$1, a$1), i$1 = D(t$1, e$1, a$1, r$1);
		if (a$1.fill) if ("solid" === a$1.fillStyle) {
			const s$2 = D(t$1, e$1, a$1, r$1).opset;
			s$2.type = "fillPath", h$1.push(s$2);
		} else h$1.push(C([i$1.estimatedPoints], a$1));
		return a$1.stroke !== tt && h$1.push(i$1.opset), this._d("ellipse", h$1, a$1);
	}
	circle(t$1, e$1, s$1, n$1) {
		const o$1 = this.ellipse(t$1, e$1, s$1, s$1, n$1);
		return o$1.shape = "circle", o$1;
	}
	linearPath(t$1, e$1) {
		const s$1 = this._o(e$1);
		return this._d("linearPath", [S(t$1, !1, s$1)], s$1);
	}
	arc(t$1, e$1, s$1, n$1, o$1, a$1, h$1 = !1, r$1) {
		const i$1 = this._o(r$1), c$1 = [], l$1 = A(t$1, e$1, s$1, n$1, o$1, a$1, h$1, !0, i$1);
		if (h$1 && i$1.fill) if ("solid" === i$1.fillStyle) {
			const h$2 = Object.assign({}, i$1);
			h$2.disableMultiStroke = !0;
			const r$2 = A(t$1, e$1, s$1, n$1, o$1, a$1, !0, !1, h$2);
			r$2.type = "fillPath", c$1.push(r$2);
		} else c$1.push(function(t$2, e$2, s$2, n$2, o$2, a$2, h$2) {
			const r$2 = t$2, i$2 = e$2;
			let c$2 = Math.abs(s$2 / 2), l$2 = Math.abs(n$2 / 2);
			c$2 += G(.01 * c$2, h$2), l$2 += G(.01 * l$2, h$2);
			let u$1 = o$2, p$1 = a$2;
			for (; u$1 < 0;) u$1 += 2 * Math.PI, p$1 += 2 * Math.PI;
			p$1 - u$1 > 2 * Math.PI && (u$1 = 0, p$1 = 2 * Math.PI);
			const f$1 = (p$1 - u$1) / h$2.curveStepCount, d$1 = [];
			for (let t$3 = u$1; t$3 <= p$1; t$3 += f$1) d$1.push([r$2 + c$2 * Math.cos(t$3), i$2 + l$2 * Math.sin(t$3)]);
			return d$1.push([r$2 + c$2 * Math.cos(p$1), i$2 + l$2 * Math.sin(p$1)]), d$1.push([r$2, i$2]), C([d$1], h$2);
		}(t$1, e$1, s$1, n$1, o$1, a$1, i$1));
		return i$1.stroke !== tt && c$1.push(l$1), this._d("arc", c$1, i$1);
	}
	curve(t$1, e$1) {
		const s$1 = this._o(e$1), n$1 = [], o$1 = L(t$1, s$1);
		if (s$1.fill && s$1.fill !== tt) if ("solid" === s$1.fillStyle) {
			const e$2 = L(t$1, Object.assign(Object.assign({}, s$1), {
				disableMultiStroke: !0,
				roughness: s$1.roughness ? s$1.roughness + s$1.fillShapeRoughnessGain : 0
			}));
			n$1.push({
				type: "fillPath",
				ops: this._mergedShape(e$2.ops)
			});
		} else {
			const e$2 = [], o$2 = t$1;
			if (o$2.length) {
				const t$2 = "number" == typeof o$2[0][0] ? [o$2] : o$2;
				for (const n$2 of t$2) n$2.length < 3 ? e$2.push(...n$2) : 3 === n$2.length ? e$2.push(...Y(H([
					n$2[0],
					n$2[0],
					n$2[1],
					n$2[2]
				]), 10, (1 + s$1.roughness) / 2)) : e$2.push(...Y(H(n$2), 10, (1 + s$1.roughness) / 2));
			}
			e$2.length && n$1.push(C([e$2], s$1));
		}
		return s$1.stroke !== tt && n$1.push(o$1), this._d("curve", n$1, s$1);
	}
	polygon(t$1, e$1) {
		const s$1 = this._o(e$1), n$1 = [], o$1 = S(t$1, !0, s$1);
		return s$1.fill && ("solid" === s$1.fillStyle ? n$1.push(I([t$1], s$1)) : n$1.push(C([t$1], s$1))), s$1.stroke !== tt && n$1.push(o$1), this._d("polygon", n$1, s$1);
	}
	path(t$1, e$1) {
		const s$1 = this._o(e$1), n$1 = [];
		if (!t$1) return this._d("path", n$1, s$1);
		t$1 = (t$1 || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
		const o$1 = s$1.fill && "transparent" !== s$1.fill && s$1.fill !== tt, a$1 = s$1.stroke !== tt, h$1 = !!(s$1.simplification && s$1.simplification < 1), r$1 = function(t$2, e$2, s$2) {
			const n$2 = m(y(b(t$2))), o$2 = [];
			let a$2 = [], h$2 = [0, 0], r$2 = [];
			const i$2 = () => {
				r$2.length >= 4 && a$2.push(...Y(r$2, e$2)), r$2 = [];
			}, c$1 = () => {
				i$2(), a$2.length && (o$2.push(a$2), a$2 = []);
			};
			for (const { key: t$3, data: e$3 } of n$2) switch (t$3) {
				case "M":
					c$1(), h$2 = [e$3[0], e$3[1]], a$2.push(h$2);
					break;
				case "L":
					i$2(), a$2.push([e$3[0], e$3[1]]);
					break;
				case "C":
					if (!r$2.length) {
						const t$4 = a$2.length ? a$2[a$2.length - 1] : h$2;
						r$2.push([t$4[0], t$4[1]]);
					}
					r$2.push([e$3[0], e$3[1]]), r$2.push([e$3[2], e$3[3]]), r$2.push([e$3[4], e$3[5]]);
					break;
				case "Z": i$2(), a$2.push([h$2[0], h$2[1]]);
			}
			if (c$1(), !s$2) return o$2;
			const l$1 = [];
			for (const t$3 of o$2) {
				const e$3 = U(t$3, s$2);
				e$3.length && l$1.push(e$3);
			}
			return l$1;
		}(t$1, 1, h$1 ? 4 - 4 * (s$1.simplification || 1) : (1 + s$1.roughness) / 2), i$1 = _(t$1, s$1);
		if (o$1) if ("solid" === s$1.fillStyle) if (1 === r$1.length) {
			const e$2 = _(t$1, Object.assign(Object.assign({}, s$1), {
				disableMultiStroke: !0,
				roughness: s$1.roughness ? s$1.roughness + s$1.fillShapeRoughnessGain : 0
			}));
			n$1.push({
				type: "fillPath",
				ops: this._mergedShape(e$2.ops)
			});
		} else n$1.push(I(r$1, s$1));
		else n$1.push(C(r$1, s$1));
		return a$1 && (h$1 ? r$1.forEach(((t$2) => {
			n$1.push(S(t$2, !1, s$1));
		})) : n$1.push(i$1)), this._d("path", n$1, s$1);
	}
	opsToPath(t$1, e$1) {
		let s$1 = "";
		for (const n$1 of t$1.ops) {
			const t$2 = "number" == typeof e$1 && e$1 >= 0 ? n$1.data.map(((t$3) => +t$3.toFixed(e$1))) : n$1.data;
			switch (n$1.op) {
				case "move":
					s$1 += `M${t$2[0]} ${t$2[1]} `;
					break;
				case "bcurveTo":
					s$1 += `C${t$2[0]} ${t$2[1]}, ${t$2[2]} ${t$2[3]}, ${t$2[4]} ${t$2[5]} `;
					break;
				case "lineTo": s$1 += `L${t$2[0]} ${t$2[1]} `;
			}
		}
		return s$1.trim();
	}
	toPaths(t$1) {
		const e$1 = t$1.sets || [], s$1 = t$1.options || this.defaultOptions, n$1 = [];
		for (const t$2 of e$1) {
			let e$2 = null;
			switch (t$2.type) {
				case "path":
					e$2 = {
						d: this.opsToPath(t$2),
						stroke: s$1.stroke,
						strokeWidth: s$1.strokeWidth,
						fill: tt
					};
					break;
				case "fillPath":
					e$2 = {
						d: this.opsToPath(t$2),
						stroke: tt,
						strokeWidth: 0,
						fill: s$1.fill || tt
					};
					break;
				case "fillSketch": e$2 = this.fillSketch(t$2, s$1);
			}
			e$2 && n$1.push(e$2);
		}
		return n$1;
	}
	fillSketch(t$1, e$1) {
		let s$1 = e$1.fillWeight;
		return s$1 < 0 && (s$1 = e$1.strokeWidth / 2), {
			d: this.opsToPath(t$1),
			stroke: e$1.fill || tt,
			strokeWidth: s$1,
			fill: tt
		};
	}
	_mergedShape(t$1) {
		return t$1.filter(((t$2, e$1) => 0 === e$1 || "move" !== t$2.op));
	}
};
var st = class {
	constructor(t$1, e$1) {
		this.canvas = t$1, this.ctx = this.canvas.getContext("2d"), this.gen = new et(e$1);
	}
	draw(t$1) {
		const e$1 = t$1.sets || [], s$1 = t$1.options || this.getDefaultOptions(), n$1 = this.ctx, o$1 = t$1.options.fixedDecimalPlaceDigits;
		for (const a$1 of e$1) switch (a$1.type) {
			case "path":
				n$1.save(), n$1.strokeStyle = "none" === s$1.stroke ? "transparent" : s$1.stroke, n$1.lineWidth = s$1.strokeWidth, s$1.strokeLineDash && n$1.setLineDash(s$1.strokeLineDash), s$1.strokeLineDashOffset && (n$1.lineDashOffset = s$1.strokeLineDashOffset), this._drawToContext(n$1, a$1, o$1), n$1.restore();
				break;
			case "fillPath": {
				n$1.save(), n$1.fillStyle = s$1.fill || "";
				const e$2 = "curve" === t$1.shape || "polygon" === t$1.shape || "path" === t$1.shape ? "evenodd" : "nonzero";
				this._drawToContext(n$1, a$1, o$1, e$2), n$1.restore();
				break;
			}
			case "fillSketch": this.fillSketch(n$1, a$1, s$1);
		}
	}
	fillSketch(t$1, e$1, s$1) {
		let n$1 = s$1.fillWeight;
		n$1 < 0 && (n$1 = s$1.strokeWidth / 2), t$1.save(), s$1.fillLineDash && t$1.setLineDash(s$1.fillLineDash), s$1.fillLineDashOffset && (t$1.lineDashOffset = s$1.fillLineDashOffset), t$1.strokeStyle = s$1.fill || "", t$1.lineWidth = n$1, this._drawToContext(t$1, e$1, s$1.fixedDecimalPlaceDigits), t$1.restore();
	}
	_drawToContext(t$1, e$1, s$1, n$1 = "nonzero") {
		t$1.beginPath();
		for (const n$2 of e$1.ops) {
			const e$2 = "number" == typeof s$1 && s$1 >= 0 ? n$2.data.map(((t$2) => +t$2.toFixed(s$1))) : n$2.data;
			switch (n$2.op) {
				case "move":
					t$1.moveTo(e$2[0], e$2[1]);
					break;
				case "bcurveTo":
					t$1.bezierCurveTo(e$2[0], e$2[1], e$2[2], e$2[3], e$2[4], e$2[5]);
					break;
				case "lineTo": t$1.lineTo(e$2[0], e$2[1]);
			}
		}
		"fillPath" === e$1.type ? t$1.fill(n$1) : t$1.stroke();
	}
	get generator() {
		return this.gen;
	}
	getDefaultOptions() {
		return this.gen.defaultOptions;
	}
	line(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this.gen.line(t$1, e$1, s$1, n$1, o$1);
		return this.draw(a$1), a$1;
	}
	rectangle(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this.gen.rectangle(t$1, e$1, s$1, n$1, o$1);
		return this.draw(a$1), a$1;
	}
	ellipse(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this.gen.ellipse(t$1, e$1, s$1, n$1, o$1);
		return this.draw(a$1), a$1;
	}
	circle(t$1, e$1, s$1, n$1) {
		const o$1 = this.gen.circle(t$1, e$1, s$1, n$1);
		return this.draw(o$1), o$1;
	}
	linearPath(t$1, e$1) {
		const s$1 = this.gen.linearPath(t$1, e$1);
		return this.draw(s$1), s$1;
	}
	polygon(t$1, e$1) {
		const s$1 = this.gen.polygon(t$1, e$1);
		return this.draw(s$1), s$1;
	}
	arc(t$1, e$1, s$1, n$1, o$1, a$1, h$1 = !1, r$1) {
		const i$1 = this.gen.arc(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1);
		return this.draw(i$1), i$1;
	}
	curve(t$1, e$1) {
		const s$1 = this.gen.curve(t$1, e$1);
		return this.draw(s$1), s$1;
	}
	path(t$1, e$1) {
		const s$1 = this.gen.path(t$1, e$1);
		return this.draw(s$1), s$1;
	}
};
const nt = "http://www.w3.org/2000/svg";
var ot = class {
	constructor(t$1, e$1) {
		this.svg = t$1, this.gen = new et(e$1);
	}
	draw(t$1) {
		const e$1 = t$1.sets || [], s$1 = t$1.options || this.getDefaultOptions(), n$1 = this.svg.ownerDocument || window.document, o$1 = n$1.createElementNS(nt, "g"), a$1 = t$1.options.fixedDecimalPlaceDigits;
		for (const h$1 of e$1) {
			let e$2 = null;
			switch (h$1.type) {
				case "path":
					e$2 = n$1.createElementNS(nt, "path"), e$2.setAttribute("d", this.opsToPath(h$1, a$1)), e$2.setAttribute("stroke", s$1.stroke), e$2.setAttribute("stroke-width", s$1.strokeWidth + ""), e$2.setAttribute("fill", "none"), s$1.strokeLineDash && e$2.setAttribute("stroke-dasharray", s$1.strokeLineDash.join(" ").trim()), s$1.strokeLineDashOffset && e$2.setAttribute("stroke-dashoffset", `${s$1.strokeLineDashOffset}`);
					break;
				case "fillPath":
					e$2 = n$1.createElementNS(nt, "path"), e$2.setAttribute("d", this.opsToPath(h$1, a$1)), e$2.setAttribute("stroke", "none"), e$2.setAttribute("stroke-width", "0"), e$2.setAttribute("fill", s$1.fill || ""), "curve" !== t$1.shape && "polygon" !== t$1.shape || e$2.setAttribute("fill-rule", "evenodd");
					break;
				case "fillSketch": e$2 = this.fillSketch(n$1, h$1, s$1);
			}
			e$2 && o$1.appendChild(e$2);
		}
		return o$1;
	}
	fillSketch(t$1, e$1, s$1) {
		let n$1 = s$1.fillWeight;
		n$1 < 0 && (n$1 = s$1.strokeWidth / 2);
		const o$1 = t$1.createElementNS(nt, "path");
		return o$1.setAttribute("d", this.opsToPath(e$1, s$1.fixedDecimalPlaceDigits)), o$1.setAttribute("stroke", s$1.fill || ""), o$1.setAttribute("stroke-width", n$1 + ""), o$1.setAttribute("fill", "none"), s$1.fillLineDash && o$1.setAttribute("stroke-dasharray", s$1.fillLineDash.join(" ").trim()), s$1.fillLineDashOffset && o$1.setAttribute("stroke-dashoffset", `${s$1.fillLineDashOffset}`), o$1;
	}
	get generator() {
		return this.gen;
	}
	getDefaultOptions() {
		return this.gen.defaultOptions;
	}
	opsToPath(t$1, e$1) {
		return this.gen.opsToPath(t$1, e$1);
	}
	line(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this.gen.line(t$1, e$1, s$1, n$1, o$1);
		return this.draw(a$1);
	}
	rectangle(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this.gen.rectangle(t$1, e$1, s$1, n$1, o$1);
		return this.draw(a$1);
	}
	ellipse(t$1, e$1, s$1, n$1, o$1) {
		const a$1 = this.gen.ellipse(t$1, e$1, s$1, n$1, o$1);
		return this.draw(a$1);
	}
	circle(t$1, e$1, s$1, n$1) {
		const o$1 = this.gen.circle(t$1, e$1, s$1, n$1);
		return this.draw(o$1);
	}
	linearPath(t$1, e$1) {
		const s$1 = this.gen.linearPath(t$1, e$1);
		return this.draw(s$1);
	}
	polygon(t$1, e$1) {
		const s$1 = this.gen.polygon(t$1, e$1);
		return this.draw(s$1);
	}
	arc(t$1, e$1, s$1, n$1, o$1, a$1, h$1 = !1, r$1) {
		const i$1 = this.gen.arc(t$1, e$1, s$1, n$1, o$1, a$1, h$1, r$1);
		return this.draw(i$1);
	}
	curve(t$1, e$1) {
		const s$1 = this.gen.curve(t$1, e$1);
		return this.draw(s$1);
	}
	path(t$1, e$1) {
		const s$1 = this.gen.path(t$1, e$1);
		return this.draw(s$1);
	}
};
var at = {
	canvas: (t$1, e$1) => new st(t$1, e$1),
	svg: (t$1, e$1) => new ot(t$1, e$1),
	generator: (t$1) => new et(t$1),
	newSeed: () => et.newSeed()
};
var labelHelper = /* @__PURE__ */ __name(async (parent, node, _classes) => {
	let cssClasses;
	const useHtmlLabels = node.useHtmlLabels || evaluate(getConfig2()?.htmlLabels);
	if (!_classes) cssClasses = "node default";
	else cssClasses = _classes;
	const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
	const labelEl = shapeSvg.insert("g").attr("class", "label").attr("style", handleUndefinedAttr(node.labelStyle));
	let label;
	if (node.label === void 0) label = "";
	else label = typeof node.label === "string" ? node.label : node.label[0];
	const text2 = await createText(labelEl, sanitizeText(decodeEntities(label), getConfig2()), {
		useHtmlLabels,
		width: node.width || getConfig2().flowchart?.wrappingWidth,
		cssClasses: "markdown-node-label",
		style: node.labelStyle,
		addSvgBackground: !!node.icon || !!node.img
	});
	let bbox = text2.getBBox();
	const halfPadding = (node?.padding ?? 0) / 2;
	if (useHtmlLabels) {
		const div = text2.children[0];
		const dv = select_default(text2);
		const images = div.getElementsByTagName("img");
		if (images) {
			const noImgText = label.replace(/<img[^>]*>/g, "").trim() === "";
			await Promise.all([...images].map((img) => new Promise((res) => {
				function setupImage() {
					img.style.display = "flex";
					img.style.flexDirection = "column";
					if (noImgText) {
						const bodyFontSize = getConfig2().fontSize ? getConfig2().fontSize : window.getComputedStyle(document.body).fontSize;
						const enlargingFactor = 5;
						const [parsedBodyFontSize = defaultConfig_default.fontSize] = parseFontSize(bodyFontSize);
						const width = parsedBodyFontSize * enlargingFactor + "px";
						img.style.minWidth = width;
						img.style.maxWidth = width;
					} else img.style.width = "100%";
					res(img);
				}
				__name(setupImage, "setupImage");
				setTimeout(() => {
					if (img.complete) setupImage();
				});
				img.addEventListener("error", setupImage);
				img.addEventListener("load", setupImage);
			})));
		}
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	if (useHtmlLabels) labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
	else labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
	if (node.centerLabel) labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
	labelEl.insert("rect", ":first-child");
	return {
		shapeSvg,
		bbox,
		halfPadding,
		label: labelEl
	};
}, "labelHelper");
var insertLabel = /* @__PURE__ */ __name(async (parent, label, options) => {
	const useHtmlLabels = options.useHtmlLabels || evaluate(getConfig2()?.flowchart?.htmlLabels);
	const labelEl = parent.insert("g").attr("class", "label").attr("style", options.labelStyle || "");
	const text2 = await createText(labelEl, sanitizeText(decodeEntities(label), getConfig2()), {
		useHtmlLabels,
		width: options.width || getConfig2()?.flowchart?.wrappingWidth,
		style: options.labelStyle,
		addSvgBackground: !!options.icon || !!options.img
	});
	let bbox = text2.getBBox();
	const halfPadding = options.padding / 2;
	if (evaluate(getConfig2()?.flowchart?.htmlLabels)) {
		const div = text2.children[0];
		const dv = select_default(text2);
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	if (useHtmlLabels) labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
	else labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
	if (options.centerLabel) labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
	labelEl.insert("rect", ":first-child");
	return {
		shapeSvg: parent,
		bbox,
		halfPadding,
		label: labelEl
	};
}, "insertLabel");
var updateNodeBounds = /* @__PURE__ */ __name((node, element) => {
	const bbox = element.node().getBBox();
	node.width = bbox.width;
	node.height = bbox.height;
}, "updateNodeBounds");
var getNodeClasses = /* @__PURE__ */ __name((node, extra) => (node.look === "handDrawn" ? "rough-node" : "node") + " " + node.cssClasses + " " + (extra || ""), "getNodeClasses");
function createPathFromPoints(points) {
	const pointStrings = points.map((p$1, i$1) => `${i$1 === 0 ? "M" : "L"}${p$1.x},${p$1.y}`);
	pointStrings.push("Z");
	return pointStrings.join(" ");
}
__name(createPathFromPoints, "createPathFromPoints");
function generateFullSineWavePoints(x1, y1, x2, y2, amplitude, numCycles) {
	const points = [];
	const steps = 50;
	const deltaX = x2 - x1;
	const deltaY = y2 - y1;
	const cycleLength = deltaX / numCycles;
	const frequency = 2 * Math.PI / cycleLength;
	const midY = y1 + deltaY / 2;
	for (let i$1 = 0; i$1 <= steps; i$1++) {
		const t$1 = i$1 / steps;
		const x$1 = x1 + t$1 * deltaX;
		const y$1 = midY + amplitude * Math.sin(frequency * (x$1 - x1));
		points.push({
			x: x$1,
			y: y$1
		});
	}
	return points;
}
__name(generateFullSineWavePoints, "generateFullSineWavePoints");
function generateCirclePoints(centerX, centerY, radius, numPoints, startAngle, endAngle) {
	const points = [];
	const startAngleRad = startAngle * Math.PI / 180;
	const endAngleRad = endAngle * Math.PI / 180;
	const angleRange = endAngleRad - startAngleRad;
	const angleStep = angleRange / (numPoints - 1);
	for (let i$1 = 0; i$1 < numPoints; i$1++) {
		const angle = startAngleRad + i$1 * angleStep;
		const x$1 = centerX + radius * Math.cos(angle);
		const y$1 = centerY + radius * Math.sin(angle);
		points.push({
			x: -x$1,
			y: -y$1
		});
	}
	return points;
}
__name(generateCirclePoints, "generateCirclePoints");
var intersectRect = /* @__PURE__ */ __name((node, point) => {
	var x$1 = node.x;
	var y$1 = node.y;
	var dx = point.x - x$1;
	var dy = point.y - y$1;
	var w$1 = node.width / 2;
	var h$1 = node.height / 2;
	var sx, sy;
	if (Math.abs(dy) * w$1 > Math.abs(dx) * h$1) {
		if (dy < 0) h$1 = -h$1;
		sx = dy === 0 ? 0 : h$1 * dx / dy;
		sy = h$1;
	} else {
		if (dx < 0) w$1 = -w$1;
		sx = w$1;
		sy = dx === 0 ? 0 : w$1 * dy / dx;
	}
	return {
		x: x$1 + sx,
		y: y$1 + sy
	};
}, "intersectRect");
var intersect_rect_default = intersectRect;
function applyStyle(dom, styleFn) {
	if (styleFn) dom.attr("style", styleFn);
}
__name(applyStyle, "applyStyle");
async function addHtmlLabel(node) {
	const fo = select_default(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"));
	const div = fo.append("xhtml:div");
	const config = getConfig2();
	let label = node.label;
	if (node.label && hasKatex(node.label)) label = await renderKatexSanitized(node.label.replace(common_default.lineBreakRegex, "\n"), config);
	const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
	const labelSpan = "<span class=\"" + labelClass + "\" " + (node.labelStyle ? "style=\"" + node.labelStyle + "\"" : "") + ">" + label + "</span>";
	div.html(sanitizeText(labelSpan, config));
	applyStyle(div, node.labelStyle);
	div.style("display", "inline-block");
	div.style("padding-right", "1px");
	div.style("white-space", "nowrap");
	div.attr("xmlns", "http://www.w3.org/1999/xhtml");
	return fo.node();
}
__name(addHtmlLabel, "addHtmlLabel");
var createLabel = /* @__PURE__ */ __name(async (_vertexText, style, isTitle, isNode) => {
	let vertexText = _vertexText || "";
	if (typeof vertexText === "object") vertexText = vertexText[0];
	if (evaluate(getConfig2().flowchart.htmlLabels)) {
		vertexText = vertexText.replace(/\\n|\n/g, "<br />");
		log.info("vertexText" + vertexText);
		const node = {
			isNode,
			label: decodeEntities(vertexText).replace(/fa[blrs]?:fa-[\w-]+/g, (s$1) => `<i class='${s$1.replace(":", " ")}'></i>`),
			labelStyle: style ? style.replace("fill:", "color:") : style
		};
		let vertexNode = await addHtmlLabel(node);
		return vertexNode;
	} else {
		const svgLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		svgLabel.setAttribute("style", style.replace("color:", "fill:"));
		let rows = [];
		if (typeof vertexText === "string") rows = vertexText.split(/\\n|\n|<br\s*\/?>/gi);
		else if (Array.isArray(vertexText)) rows = vertexText;
		else rows = [];
		for (const row of rows) {
			const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
			tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
			tspan.setAttribute("dy", "1em");
			tspan.setAttribute("x", "0");
			if (isTitle) tspan.setAttribute("class", "title-row");
			else tspan.setAttribute("class", "row");
			tspan.textContent = row.trim();
			svgLabel.appendChild(tspan);
		}
		return svgLabel;
	}
}, "createLabel");
var createLabel_default = createLabel;
var createRoundedRectPathD = /* @__PURE__ */ __name((x$1, y$1, totalWidth, totalHeight, radius) => [
	"M",
	x$1 + radius,
	y$1,
	"H",
	x$1 + totalWidth - radius,
	"A",
	radius,
	radius,
	0,
	0,
	1,
	x$1 + totalWidth,
	y$1 + radius,
	"V",
	y$1 + totalHeight - radius,
	"A",
	radius,
	radius,
	0,
	0,
	1,
	x$1 + totalWidth - radius,
	y$1 + totalHeight,
	"H",
	x$1 + radius,
	"A",
	radius,
	radius,
	0,
	0,
	1,
	x$1,
	y$1 + totalHeight - radius,
	"V",
	y$1 + radius,
	"A",
	radius,
	radius,
	0,
	0,
	1,
	x$1 + radius,
	y$1,
	"Z"
].join(" "), "createRoundedRectPathD");
var rect = /* @__PURE__ */ __name(async (parent, node) => {
	log.info("Creating subgraph rect for ", node.id, node);
	const siteConfig = getConfig2();
	const { themeVariables, handDrawnSeed } = siteConfig;
	const { clusterBkg, clusterBorder } = themeVariables;
	const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
	const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.id).attr("data-look", node.look);
	const useHtmlLabels = evaluate(siteConfig.flowchart.htmlLabels);
	const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
	const text2 = await createText(labelEl, node.label, {
		style: node.labelStyle,
		useHtmlLabels,
		isNode: true
	});
	let bbox = text2.getBBox();
	if (evaluate(siteConfig.flowchart.htmlLabels)) {
		const div = text2.children[0];
		const dv = select_default(text2);
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
	if (node.width <= bbox.width + node.padding) node.diff = (width - node.width) / 2 - node.padding;
	else node.diff = -node.padding;
	const height = node.height;
	const x$1 = node.x - width / 2;
	const y$1 = node.y - height / 2;
	log.trace("Data ", node, JSON.stringify(node));
	let rect2;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {
			roughness: .7,
			fill: clusterBkg,
			stroke: clusterBorder,
			fillWeight: 3,
			seed: handDrawnSeed
		});
		const roughNode = rc.path(createRoundedRectPathD(x$1, y$1, width, height, 0), options);
		rect2 = shapeSvg.insert(() => {
			log.debug("Rough node insert CXC", roughNode);
			return roughNode;
		}, ":first-child");
		rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
		rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
	} else {
		rect2 = shapeSvg.insert("rect", ":first-child");
		rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x$1).attr("y", y$1).attr("width", width).attr("height", height);
	}
	const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
	labelEl.attr("transform", `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`);
	if (labelStyles) {
		const span = labelEl.select("span");
		if (span) span.attr("style", labelStyles);
	}
	const rectBox = rect2.node().getBBox();
	node.offsetX = 0;
	node.width = rectBox.width;
	node.height = rectBox.height;
	node.offsetY = bbox.height - node.padding / 2;
	node.intersect = function(point) {
		return intersect_rect_default(node, point);
	};
	return {
		cluster: shapeSvg,
		labelBBox: bbox
	};
}, "rect");
var noteGroup = /* @__PURE__ */ __name((parent, node) => {
	const shapeSvg = parent.insert("g").attr("class", "note-cluster").attr("id", node.id);
	const rect2 = shapeSvg.insert("rect", ":first-child");
	const padding = 0 * node.padding;
	const halfPadding = padding / 2;
	rect2.attr("rx", node.rx).attr("ry", node.ry).attr("x", node.x - node.width / 2 - halfPadding).attr("y", node.y - node.height / 2 - halfPadding).attr("width", node.width + padding).attr("height", node.height + padding).attr("fill", "none");
	const rectBox = rect2.node().getBBox();
	node.width = rectBox.width;
	node.height = rectBox.height;
	node.intersect = function(point) {
		return intersect_rect_default(node, point);
	};
	return {
		cluster: shapeSvg,
		labelBBox: {
			width: 0,
			height: 0
		}
	};
}, "noteGroup");
var roundedWithTitle = /* @__PURE__ */ __name(async (parent, node) => {
	const siteConfig = getConfig2();
	const { themeVariables, handDrawnSeed } = siteConfig;
	const { altBackground, compositeBackground, compositeTitleBackground, nodeBorder } = themeVariables;
	const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.id).attr("data-id", node.id).attr("data-look", node.look);
	const outerRectG = shapeSvg.insert("g", ":first-child");
	const label = shapeSvg.insert("g").attr("class", "cluster-label");
	let innerRect = shapeSvg.append("rect");
	const text2 = label.node().appendChild(await createLabel_default(node.label, node.labelStyle, void 0, true));
	let bbox = text2.getBBox();
	if (evaluate(siteConfig.flowchart.htmlLabels)) {
		const div = text2.children[0];
		const dv = select_default(text2);
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	const padding = 0 * node.padding;
	const halfPadding = padding / 2;
	const width = (node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width) + padding;
	if (node.width <= bbox.width + node.padding) node.diff = (width - node.width) / 2 - node.padding;
	else node.diff = -node.padding;
	const height = node.height + padding;
	const innerHeight = node.height + padding - bbox.height - 6;
	const x$1 = node.x - width / 2;
	const y$1 = node.y - height / 2;
	node.width = width;
	const innerY = node.y - node.height / 2 - halfPadding + bbox.height + 2;
	let rect2;
	if (node.look === "handDrawn") {
		const isAlt = node.cssClasses.includes("statediagram-cluster-alt");
		const rc = at.svg(shapeSvg);
		const roughOuterNode = node.rx || node.ry ? rc.path(createRoundedRectPathD(x$1, y$1, width, height, 10), {
			roughness: .7,
			fill: compositeTitleBackground,
			fillStyle: "solid",
			stroke: nodeBorder,
			seed: handDrawnSeed
		}) : rc.rectangle(x$1, y$1, width, height, { seed: handDrawnSeed });
		rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
		const roughInnerNode = rc.rectangle(x$1, innerY, width, innerHeight, {
			fill: isAlt ? altBackground : compositeBackground,
			fillStyle: isAlt ? "hachure" : "solid",
			stroke: nodeBorder,
			seed: handDrawnSeed
		});
		rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
		innerRect = shapeSvg.insert(() => roughInnerNode);
	} else {
		rect2 = outerRectG.insert("rect", ":first-child");
		const outerRectClass = "outer";
		rect2.attr("class", outerRectClass).attr("x", x$1).attr("y", y$1).attr("width", width).attr("height", height).attr("data-look", node.look);
		innerRect.attr("class", "inner").attr("x", x$1).attr("y", innerY).attr("width", width).attr("height", innerHeight);
	}
	label.attr("transform", `translate(${node.x - bbox.width / 2}, ${y$1 + 1 - (evaluate(siteConfig.flowchart.htmlLabels) ? 0 : 3)})`);
	const rectBox = rect2.node().getBBox();
	node.height = rectBox.height;
	node.offsetX = 0;
	node.offsetY = bbox.height - node.padding / 2;
	node.labelBBox = bbox;
	node.intersect = function(point) {
		return intersect_rect_default(node, point);
	};
	return {
		cluster: shapeSvg,
		labelBBox: bbox
	};
}, "roundedWithTitle");
var kanbanSection = /* @__PURE__ */ __name(async (parent, node) => {
	log.info("Creating subgraph rect for ", node.id, node);
	const siteConfig = getConfig2();
	const { themeVariables, handDrawnSeed } = siteConfig;
	const { clusterBkg, clusterBorder } = themeVariables;
	const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
	const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.id).attr("data-look", node.look);
	const useHtmlLabels = evaluate(siteConfig.flowchart.htmlLabels);
	const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
	const text2 = await createText(labelEl, node.label, {
		style: node.labelStyle,
		useHtmlLabels,
		isNode: true,
		width: node.width
	});
	let bbox = text2.getBBox();
	if (evaluate(siteConfig.flowchart.htmlLabels)) {
		const div = text2.children[0];
		const dv = select_default(text2);
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
	if (node.width <= bbox.width + node.padding) node.diff = (width - node.width) / 2 - node.padding;
	else node.diff = -node.padding;
	const height = node.height;
	const x$1 = node.x - width / 2;
	const y$1 = node.y - height / 2;
	log.trace("Data ", node, JSON.stringify(node));
	let rect2;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {
			roughness: .7,
			fill: clusterBkg,
			stroke: clusterBorder,
			fillWeight: 4,
			seed: handDrawnSeed
		});
		const roughNode = rc.path(createRoundedRectPathD(x$1, y$1, width, height, node.rx), options);
		rect2 = shapeSvg.insert(() => {
			log.debug("Rough node insert CXC", roughNode);
			return roughNode;
		}, ":first-child");
		rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
		rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
	} else {
		rect2 = shapeSvg.insert("rect", ":first-child");
		rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x$1).attr("y", y$1).attr("width", width).attr("height", height);
	}
	const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
	labelEl.attr("transform", `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`);
	if (labelStyles) {
		const span = labelEl.select("span");
		if (span) span.attr("style", labelStyles);
	}
	const rectBox = rect2.node().getBBox();
	node.offsetX = 0;
	node.width = rectBox.width;
	node.height = rectBox.height;
	node.offsetY = bbox.height - node.padding / 2;
	node.intersect = function(point) {
		return intersect_rect_default(node, point);
	};
	return {
		cluster: shapeSvg,
		labelBBox: bbox
	};
}, "kanbanSection");
var divider = /* @__PURE__ */ __name((parent, node) => {
	const siteConfig = getConfig2();
	const { themeVariables, handDrawnSeed } = siteConfig;
	const { nodeBorder } = themeVariables;
	const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.id).attr("data-look", node.look);
	const outerRectG = shapeSvg.insert("g", ":first-child");
	const padding = 0 * node.padding;
	const width = node.width + padding;
	node.diff = -node.padding;
	const height = node.height + padding;
	const x$1 = node.x - width / 2;
	const y$1 = node.y - height / 2;
	node.width = width;
	let rect2;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const roughOuterNode = rc.rectangle(x$1, y$1, width, height, {
			fill: "lightgrey",
			roughness: .5,
			strokeLineDash: [5],
			stroke: nodeBorder,
			seed: handDrawnSeed
		});
		rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
	} else {
		rect2 = outerRectG.insert("rect", ":first-child");
		const outerRectClass = "divider";
		rect2.attr("class", outerRectClass).attr("x", x$1).attr("y", y$1).attr("width", width).attr("height", height).attr("data-look", node.look);
	}
	const rectBox = rect2.node().getBBox();
	node.height = rectBox.height;
	node.offsetX = 0;
	node.offsetY = 0;
	node.intersect = function(point) {
		return intersect_rect_default(node, point);
	};
	return {
		cluster: shapeSvg,
		labelBBox: {}
	};
}, "divider");
var squareRect = rect;
var shapes = {
	rect,
	squareRect,
	roundedWithTitle,
	noteGroup,
	divider,
	kanbanSection
};
var clusterElems = /* @__PURE__ */ new Map();
var insertCluster = /* @__PURE__ */ __name(async (elem, node) => {
	const shape = node.shape || "rect";
	const cluster = await shapes[shape](elem, node);
	clusterElems.set(node.id, cluster);
	return cluster;
}, "insertCluster");
var clear = /* @__PURE__ */ __name(() => {
	clusterElems = /* @__PURE__ */ new Map();
}, "clear");
function intersectNode(node, point) {
	return node.intersect(point);
}
__name(intersectNode, "intersectNode");
var intersect_node_default = intersectNode;
function intersectEllipse(node, rx, ry, point) {
	var cx = node.x;
	var cy = node.y;
	var px = cx - point.x;
	var py = cy - point.y;
	var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);
	var dx = Math.abs(rx * ry * px / det);
	if (point.x < cx) dx = -dx;
	var dy = Math.abs(rx * ry * py / det);
	if (point.y < cy) dy = -dy;
	return {
		x: cx + dx,
		y: cy + dy
	};
}
__name(intersectEllipse, "intersectEllipse");
var intersect_ellipse_default = intersectEllipse;
function intersectCircle(node, rx, point) {
	return intersect_ellipse_default(node, rx, rx, point);
}
__name(intersectCircle, "intersectCircle");
var intersect_circle_default = intersectCircle;
function intersectLine(p1, p2, q1, q2) {
	var a1, a2, b1, b2, c1, c2;
	var r1, r2, r3, r4;
	var denom, offset, num;
	var x$1, y$1;
	a1 = p2.y - p1.y;
	b1 = p1.x - p2.x;
	c1 = p2.x * p1.y - p1.x * p2.y;
	r3 = a1 * q1.x + b1 * q1.y + c1;
	r4 = a1 * q2.x + b1 * q2.y + c1;
	if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) return;
	a2 = q2.y - q1.y;
	b2 = q1.x - q2.x;
	c2 = q2.x * q1.y - q1.x * q2.y;
	r1 = a2 * p1.x + b2 * p1.y + c2;
	r2 = a2 * p2.x + b2 * p2.y + c2;
	if (r1 !== 0 && r2 !== 0 && sameSign(r1, r2)) return;
	denom = a1 * b2 - a2 * b1;
	if (denom === 0) return;
	offset = Math.abs(denom / 2);
	num = b1 * c2 - b2 * c1;
	x$1 = num < 0 ? (num - offset) / denom : (num + offset) / denom;
	num = a2 * c1 - a1 * c2;
	y$1 = num < 0 ? (num - offset) / denom : (num + offset) / denom;
	return {
		x: x$1,
		y: y$1
	};
}
__name(intersectLine, "intersectLine");
function sameSign(r1, r2) {
	return r1 * r2 > 0;
}
__name(sameSign, "sameSign");
var intersect_line_default = intersectLine;
function intersectPolygon(node, polyPoints, point) {
	let x1 = node.x;
	let y1 = node.y;
	let intersections = [];
	let minX = Number.POSITIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	if (typeof polyPoints.forEach === "function") polyPoints.forEach(function(entry) {
		minX = Math.min(minX, entry.x);
		minY = Math.min(minY, entry.y);
	});
	else {
		minX = Math.min(minX, polyPoints.x);
		minY = Math.min(minY, polyPoints.y);
	}
	let left = x1 - node.width / 2 - minX;
	let top = y1 - node.height / 2 - minY;
	for (let i$1 = 0; i$1 < polyPoints.length; i$1++) {
		let p1 = polyPoints[i$1];
		let p2 = polyPoints[i$1 < polyPoints.length - 1 ? i$1 + 1 : 0];
		let intersect = intersect_line_default(node, point, {
			x: left + p1.x,
			y: top + p1.y
		}, {
			x: left + p2.x,
			y: top + p2.y
		});
		if (intersect) intersections.push(intersect);
	}
	if (!intersections.length) return node;
	if (intersections.length > 1) intersections.sort(function(p$1, q$1) {
		let pdx = p$1.x - point.x;
		let pdy = p$1.y - point.y;
		let distp = Math.sqrt(pdx * pdx + pdy * pdy);
		let qdx = q$1.x - point.x;
		let qdy = q$1.y - point.y;
		let distq = Math.sqrt(qdx * qdx + qdy * qdy);
		return distp < distq ? -1 : distp === distq ? 0 : 1;
	});
	return intersections[0];
}
__name(intersectPolygon, "intersectPolygon");
var intersect_polygon_default = intersectPolygon;
var intersect_default = {
	node: intersect_node_default,
	circle: intersect_circle_default,
	ellipse: intersect_ellipse_default,
	polygon: intersect_polygon_default,
	rect: intersect_rect_default
};
function anchor(parent, node) {
	const { labelStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const classes = getNodeClasses(node);
	let cssClasses = classes;
	if (!classes) cssClasses = "anchor";
	const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
	const radius = 1;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {
		fill: "black",
		stroke: "none",
		fillStyle: "solid"
	});
	if (node.look !== "handDrawn") options.roughness = 0;
	const roughNode = rc.circle(0, 0, radius * 2, options);
	const circleElem = shapeSvg.insert(() => roughNode, ":first-child");
	circleElem.attr("class", "anchor").attr("style", handleUndefinedAttr(cssStyles));
	updateNodeBounds(node, circleElem);
	node.intersect = function(point) {
		log.info("Circle intersect", node, radius, point);
		return intersect_default.circle(node, radius, point);
	};
	return shapeSvg;
}
__name(anchor, "anchor");
function generateArcPoints(x1, y1, x2, y2, rx, ry, clockwise) {
	const numPoints = 20;
	const midX = (x1 + x2) / 2;
	const midY = (y1 + y2) / 2;
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const dx = (x2 - x1) / 2;
	const dy = (y2 - y1) / 2;
	const transformedX = dx / rx;
	const transformedY = dy / ry;
	const distance = Math.sqrt(transformedX ** 2 + transformedY ** 2);
	if (distance > 1) throw new Error("The given radii are too small to create an arc between the points.");
	const scaledCenterDistance = Math.sqrt(1 - distance ** 2);
	const centerX = midX + scaledCenterDistance * ry * Math.sin(angle) * (clockwise ? -1 : 1);
	const centerY = midY - scaledCenterDistance * rx * Math.cos(angle) * (clockwise ? -1 : 1);
	const startAngle = Math.atan2((y1 - centerY) / ry, (x1 - centerX) / rx);
	const endAngle = Math.atan2((y2 - centerY) / ry, (x2 - centerX) / rx);
	let angleRange = endAngle - startAngle;
	if (clockwise && angleRange < 0) angleRange += 2 * Math.PI;
	if (!clockwise && angleRange > 0) angleRange -= 2 * Math.PI;
	const points = [];
	for (let i$1 = 0; i$1 < numPoints; i$1++) {
		const t$1 = i$1 / (numPoints - 1);
		const angle2 = startAngle + t$1 * angleRange;
		const x$1 = centerX + rx * Math.cos(angle2);
		const y$1 = centerY + ry * Math.sin(angle2);
		points.push({
			x: x$1,
			y: y$1
		});
	}
	return points;
}
__name(generateArcPoints, "generateArcPoints");
async function bowTieRect(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + node.padding + 20;
	const h$1 = bbox.height + node.padding;
	const ry = h$1 / 2;
	const rx = ry / (2.5 + h$1 / 50);
	const { cssStyles } = node;
	const points = [
		{
			x: w$1 / 2,
			y: -h$1 / 2
		},
		{
			x: -w$1 / 2,
			y: -h$1 / 2
		},
		...generateArcPoints(-w$1 / 2, -h$1 / 2, -w$1 / 2, h$1 / 2, rx, ry, false),
		{
			x: w$1 / 2,
			y: h$1 / 2
		},
		...generateArcPoints(w$1 / 2, h$1 / 2, w$1 / 2, -h$1 / 2, rx, ry, true)
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const bowTieRectPath = createPathFromPoints(points);
	const bowTieRectShapePath = rc.path(bowTieRectPath, options);
	const bowTieRectShape = shapeSvg.insert(() => bowTieRectShapePath, ":first-child");
	bowTieRectShape.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") bowTieRectShape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") bowTieRectShape.selectAll("path").attr("style", nodeStyles);
	bowTieRectShape.attr("transform", `translate(${rx / 2}, 0)`);
	updateNodeBounds(node, bowTieRectShape);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(bowTieRect, "bowTieRect");
function insertPolygonShape(parent, w$1, h$1, points) {
	return parent.insert("polygon", ":first-child").attr("points", points.map(function(d$1) {
		return d$1.x + "," + d$1.y;
	}).join(" ")).attr("class", "label-container").attr("transform", "translate(" + -w$1 / 2 + "," + h$1 / 2 + ")");
}
__name(insertPolygonShape, "insertPolygonShape");
async function card(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const h$1 = bbox.height + node.padding;
	const padding = 12;
	const w$1 = bbox.width + node.padding + padding;
	const left = 0;
	const right = w$1;
	const top = -h$1;
	const bottom = 0;
	const points = [
		{
			x: left + padding,
			y: top
		},
		{
			x: right,
			y: top
		},
		{
			x: right,
			y: bottom
		},
		{
			x: left,
			y: bottom
		},
		{
			x: left,
			y: top + padding
		},
		{
			x: left + padding,
			y: top
		}
	];
	let polygon;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const pathData = createPathFromPoints(points);
		const roughNode = rc.path(pathData, options);
		polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w$1 / 2}, ${h$1 / 2})`);
		if (cssStyles) polygon.attr("style", cssStyles);
	} else polygon = insertPolygonShape(shapeSvg, w$1, h$1, points);
	if (nodeStyles) polygon.attr("style", nodeStyles);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(card, "card");
function choice(parent, node) {
	const { nodeStyles } = styles2String(node);
	node.label = "";
	const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
	const { cssStyles } = node;
	const s$1 = Math.max(28, node.width ?? 0);
	const points = [
		{
			x: 0,
			y: s$1 / 2
		},
		{
			x: s$1 / 2,
			y: 0
		},
		{
			x: 0,
			y: -s$1 / 2
		},
		{
			x: -s$1 / 2,
			y: 0
		}
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const choicePath = createPathFromPoints(points);
	const roughNode = rc.path(choicePath, options);
	const choiceShape = shapeSvg.insert(() => roughNode, ":first-child");
	if (cssStyles && node.look !== "handDrawn") choiceShape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") choiceShape.selectAll("path").attr("style", nodeStyles);
	node.width = 28;
	node.height = 28;
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(choice, "choice");
async function circle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
	const radius = bbox.width / 2 + halfPadding;
	let circleElem;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const roughNode = rc.circle(0, 0, radius * 2, options);
		circleElem = shapeSvg.insert(() => roughNode, ":first-child");
		circleElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
	} else circleElem = shapeSvg.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("r", radius).attr("cx", 0).attr("cy", 0);
	updateNodeBounds(node, circleElem);
	node.intersect = function(point) {
		log.info("Circle intersect", node, radius, point);
		return intersect_default.circle(node, radius, point);
	};
	return shapeSvg;
}
__name(circle, "circle");
function createLine(r$1) {
	const xAxis45 = Math.cos(Math.PI / 4);
	const yAxis45 = Math.sin(Math.PI / 4);
	const lineLength = r$1 * 2;
	const pointQ1 = {
		x: lineLength / 2 * xAxis45,
		y: lineLength / 2 * yAxis45
	};
	const pointQ2 = {
		x: -(lineLength / 2) * xAxis45,
		y: lineLength / 2 * yAxis45
	};
	const pointQ3 = {
		x: -(lineLength / 2) * xAxis45,
		y: -(lineLength / 2) * yAxis45
	};
	const pointQ4 = {
		x: lineLength / 2 * xAxis45,
		y: -(lineLength / 2) * yAxis45
	};
	return `M ${pointQ2.x},${pointQ2.y} L ${pointQ4.x},${pointQ4.y}
                   M ${pointQ1.x},${pointQ1.y} L ${pointQ3.x},${pointQ3.y}`;
}
__name(createLine, "createLine");
function crossedCircle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	node.label = "";
	const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
	const radius = Math.max(30, node?.width ?? 0);
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const circleNode = rc.circle(0, 0, radius * 2, options);
	const linePath = createLine(radius);
	const lineNode = rc.path(linePath, options);
	const crossedCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
	crossedCircle2.insert(() => lineNode);
	if (cssStyles && node.look !== "handDrawn") crossedCircle2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") crossedCircle2.selectAll("path").attr("style", nodeStyles);
	updateNodeBounds(node, crossedCircle2);
	node.intersect = function(point) {
		log.info("crossedCircle intersect", node, {
			radius,
			point
		});
		const pos = intersect_default.circle(node, radius, point);
		return pos;
	};
	return shapeSvg;
}
__name(crossedCircle, "crossedCircle");
function generateCirclePoints2(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
	const points = [];
	const startAngleRad = startAngle * Math.PI / 180;
	const endAngleRad = endAngle * Math.PI / 180;
	const angleRange = endAngleRad - startAngleRad;
	const angleStep = angleRange / (numPoints - 1);
	for (let i$1 = 0; i$1 < numPoints; i$1++) {
		const angle = startAngleRad + i$1 * angleStep;
		const x$1 = centerX + radius * Math.cos(angle);
		const y$1 = centerY + radius * Math.sin(angle);
		points.push({
			x: -x$1,
			y: -y$1
		});
	}
	return points;
}
__name(generateCirclePoints2, "generateCirclePoints");
async function curlyBraceLeft(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + (node.padding ?? 0);
	const h$1 = bbox.height + (node.padding ?? 0);
	const radius = Math.max(5, h$1 * .1);
	const { cssStyles } = node;
	const points = [
		...generateCirclePoints2(w$1 / 2, -h$1 / 2, radius, 30, -90, 0),
		{
			x: -w$1 / 2 - radius,
			y: radius
		},
		...generateCirclePoints2(w$1 / 2 + radius * 2, -radius, radius, 20, -180, -270),
		...generateCirclePoints2(w$1 / 2 + radius * 2, radius, radius, 20, -90, -180),
		{
			x: -w$1 / 2 - radius,
			y: -h$1 / 2
		},
		...generateCirclePoints2(w$1 / 2, h$1 / 2, radius, 20, 0, 90)
	];
	const rectPoints = [
		{
			x: w$1 / 2,
			y: -h$1 / 2 - radius
		},
		{
			x: -w$1 / 2,
			y: -h$1 / 2 - radius
		},
		...generateCirclePoints2(w$1 / 2, -h$1 / 2, radius, 20, -90, 0),
		{
			x: -w$1 / 2 - radius,
			y: -radius
		},
		...generateCirclePoints2(w$1 / 2 + w$1 * .1, -radius, radius, 20, -180, -270),
		...generateCirclePoints2(w$1 / 2 + w$1 * .1, radius, radius, 20, -90, -180),
		{
			x: -w$1 / 2 - radius,
			y: h$1 / 2
		},
		...generateCirclePoints2(w$1 / 2, h$1 / 2, radius, 20, 0, 90),
		{
			x: -w$1 / 2,
			y: h$1 / 2 + radius
		},
		{
			x: w$1 / 2,
			y: h$1 / 2 + radius
		}
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, { fill: "none" });
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const curlyBraceLeftPath = createPathFromPoints(points);
	const newCurlyBracePath = curlyBraceLeftPath.replace("Z", "");
	const curlyBraceLeftNode = rc.path(newCurlyBracePath, options);
	const rectPath = createPathFromPoints(rectPoints);
	const rectShape = rc.path(rectPath, { ...options });
	const curlyBraceLeftShape = shapeSvg.insert("g", ":first-child");
	curlyBraceLeftShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
	curlyBraceLeftShape.insert(() => curlyBraceLeftNode, ":first-child");
	curlyBraceLeftShape.attr("class", "text");
	if (cssStyles && node.look !== "handDrawn") curlyBraceLeftShape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") curlyBraceLeftShape.selectAll("path").attr("style", nodeStyles);
	curlyBraceLeftShape.attr("transform", `translate(${radius}, 0)`);
	label.attr("transform", `translate(${-w$1 / 2 + radius - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, curlyBraceLeftShape);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, rectPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(curlyBraceLeft, "curlyBraceLeft");
function generateCirclePoints3(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
	const points = [];
	const startAngleRad = startAngle * Math.PI / 180;
	const endAngleRad = endAngle * Math.PI / 180;
	const angleRange = endAngleRad - startAngleRad;
	const angleStep = angleRange / (numPoints - 1);
	for (let i$1 = 0; i$1 < numPoints; i$1++) {
		const angle = startAngleRad + i$1 * angleStep;
		const x$1 = centerX + radius * Math.cos(angle);
		const y$1 = centerY + radius * Math.sin(angle);
		points.push({
			x: x$1,
			y: y$1
		});
	}
	return points;
}
__name(generateCirclePoints3, "generateCirclePoints");
async function curlyBraceRight(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + (node.padding ?? 0);
	const h$1 = bbox.height + (node.padding ?? 0);
	const radius = Math.max(5, h$1 * .1);
	const { cssStyles } = node;
	const points = [
		...generateCirclePoints3(w$1 / 2, -h$1 / 2, radius, 20, -90, 0),
		{
			x: w$1 / 2 + radius,
			y: -radius
		},
		...generateCirclePoints3(w$1 / 2 + radius * 2, -radius, radius, 20, -180, -270),
		...generateCirclePoints3(w$1 / 2 + radius * 2, radius, radius, 20, -90, -180),
		{
			x: w$1 / 2 + radius,
			y: h$1 / 2
		},
		...generateCirclePoints3(w$1 / 2, h$1 / 2, radius, 20, 0, 90)
	];
	const rectPoints = [
		{
			x: -w$1 / 2,
			y: -h$1 / 2 - radius
		},
		{
			x: w$1 / 2,
			y: -h$1 / 2 - radius
		},
		...generateCirclePoints3(w$1 / 2, -h$1 / 2, radius, 20, -90, 0),
		{
			x: w$1 / 2 + radius,
			y: -radius
		},
		...generateCirclePoints3(w$1 / 2 + radius * 2, -radius, radius, 20, -180, -270),
		...generateCirclePoints3(w$1 / 2 + radius * 2, radius, radius, 20, -90, -180),
		{
			x: w$1 / 2 + radius,
			y: h$1 / 2
		},
		...generateCirclePoints3(w$1 / 2, h$1 / 2, radius, 20, 0, 90),
		{
			x: w$1 / 2,
			y: h$1 / 2 + radius
		},
		{
			x: -w$1 / 2,
			y: h$1 / 2 + radius
		}
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, { fill: "none" });
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const curlyBraceRightPath = createPathFromPoints(points);
	const newCurlyBracePath = curlyBraceRightPath.replace("Z", "");
	const curlyBraceRightNode = rc.path(newCurlyBracePath, options);
	const rectPath = createPathFromPoints(rectPoints);
	const rectShape = rc.path(rectPath, { ...options });
	const curlyBraceRightShape = shapeSvg.insert("g", ":first-child");
	curlyBraceRightShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
	curlyBraceRightShape.insert(() => curlyBraceRightNode, ":first-child");
	curlyBraceRightShape.attr("class", "text");
	if (cssStyles && node.look !== "handDrawn") curlyBraceRightShape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") curlyBraceRightShape.selectAll("path").attr("style", nodeStyles);
	curlyBraceRightShape.attr("transform", `translate(${-radius}, 0)`);
	label.attr("transform", `translate(${-w$1 / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, curlyBraceRightShape);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, rectPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(curlyBraceRight, "curlyBraceRight");
function generateCirclePoints4(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
	const points = [];
	const startAngleRad = startAngle * Math.PI / 180;
	const endAngleRad = endAngle * Math.PI / 180;
	const angleRange = endAngleRad - startAngleRad;
	const angleStep = angleRange / (numPoints - 1);
	for (let i$1 = 0; i$1 < numPoints; i$1++) {
		const angle = startAngleRad + i$1 * angleStep;
		const x$1 = centerX + radius * Math.cos(angle);
		const y$1 = centerY + radius * Math.sin(angle);
		points.push({
			x: -x$1,
			y: -y$1
		});
	}
	return points;
}
__name(generateCirclePoints4, "generateCirclePoints");
async function curlyBraces(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + (node.padding ?? 0);
	const h$1 = bbox.height + (node.padding ?? 0);
	const radius = Math.max(5, h$1 * .1);
	const { cssStyles } = node;
	const leftCurlyBracePoints = [
		...generateCirclePoints4(w$1 / 2, -h$1 / 2, radius, 30, -90, 0),
		{
			x: -w$1 / 2 - radius,
			y: radius
		},
		...generateCirclePoints4(w$1 / 2 + radius * 2, -radius, radius, 20, -180, -270),
		...generateCirclePoints4(w$1 / 2 + radius * 2, radius, radius, 20, -90, -180),
		{
			x: -w$1 / 2 - radius,
			y: -h$1 / 2
		},
		...generateCirclePoints4(w$1 / 2, h$1 / 2, radius, 20, 0, 90)
	];
	const rightCurlyBracePoints = [
		...generateCirclePoints4(-w$1 / 2 + radius + radius / 2, -h$1 / 2, radius, 20, -90, -180),
		{
			x: w$1 / 2 - radius / 2,
			y: radius
		},
		...generateCirclePoints4(-w$1 / 2 - radius / 2, -radius, radius, 20, 0, 90),
		...generateCirclePoints4(-w$1 / 2 - radius / 2, radius, radius, 20, -90, 0),
		{
			x: w$1 / 2 - radius / 2,
			y: -radius
		},
		...generateCirclePoints4(-w$1 / 2 + radius + radius / 2, h$1 / 2, radius, 30, -180, -270)
	];
	const rectPoints = [
		{
			x: w$1 / 2,
			y: -h$1 / 2 - radius
		},
		{
			x: -w$1 / 2,
			y: -h$1 / 2 - radius
		},
		...generateCirclePoints4(w$1 / 2, -h$1 / 2, radius, 20, -90, 0),
		{
			x: -w$1 / 2 - radius,
			y: -radius
		},
		...generateCirclePoints4(w$1 / 2 + radius * 2, -radius, radius, 20, -180, -270),
		...generateCirclePoints4(w$1 / 2 + radius * 2, radius, radius, 20, -90, -180),
		{
			x: -w$1 / 2 - radius,
			y: h$1 / 2
		},
		...generateCirclePoints4(w$1 / 2, h$1 / 2, radius, 20, 0, 90),
		{
			x: -w$1 / 2,
			y: h$1 / 2 + radius
		},
		{
			x: w$1 / 2 - radius - radius / 2,
			y: h$1 / 2 + radius
		},
		...generateCirclePoints4(-w$1 / 2 + radius + radius / 2, -h$1 / 2, radius, 20, -90, -180),
		{
			x: w$1 / 2 - radius / 2,
			y: radius
		},
		...generateCirclePoints4(-w$1 / 2 - radius / 2, -radius, radius, 20, 0, 90),
		...generateCirclePoints4(-w$1 / 2 - radius / 2, radius, radius, 20, -90, 0),
		{
			x: w$1 / 2 - radius / 2,
			y: -radius
		},
		...generateCirclePoints4(-w$1 / 2 + radius + radius / 2, h$1 / 2, radius, 30, -180, -270)
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, { fill: "none" });
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const leftCurlyBracePath = createPathFromPoints(leftCurlyBracePoints);
	const newLeftCurlyBracePath = leftCurlyBracePath.replace("Z", "");
	const leftCurlyBraceNode = rc.path(newLeftCurlyBracePath, options);
	const rightCurlyBracePath = createPathFromPoints(rightCurlyBracePoints);
	const newRightCurlyBracePath = rightCurlyBracePath.replace("Z", "");
	const rightCurlyBraceNode = rc.path(newRightCurlyBracePath, options);
	const rectPath = createPathFromPoints(rectPoints);
	const rectShape = rc.path(rectPath, { ...options });
	const curlyBracesShape = shapeSvg.insert("g", ":first-child");
	curlyBracesShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
	curlyBracesShape.insert(() => leftCurlyBraceNode, ":first-child");
	curlyBracesShape.insert(() => rightCurlyBraceNode, ":first-child");
	curlyBracesShape.attr("class", "text");
	if (cssStyles && node.look !== "handDrawn") curlyBracesShape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") curlyBracesShape.selectAll("path").attr("style", nodeStyles);
	curlyBracesShape.attr("transform", `translate(${radius - radius / 4}, 0)`);
	label.attr("transform", `translate(${-w$1 / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, curlyBracesShape);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, rectPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(curlyBraces, "curlyBraces");
async function curvedTrapezoid(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const minWidth = 80, minHeight = 20;
	const w$1 = Math.max(minWidth, (bbox.width + (node.padding ?? 0) * 2) * 1.25, node?.width ?? 0);
	const h$1 = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const radius = h$1 / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const totalWidth = w$1, totalHeight = h$1;
	const rw = totalWidth - radius;
	const tw = totalHeight / 4;
	const points = [
		{
			x: rw,
			y: 0
		},
		{
			x: tw,
			y: 0
		},
		{
			x: 0,
			y: totalHeight / 2
		},
		{
			x: tw,
			y: totalHeight
		},
		{
			x: rw,
			y: totalHeight
		},
		...generateCirclePoints(-rw, -totalHeight / 2, radius, 50, 270, 90)
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	polygon.attr("transform", `translate(${-w$1 / 2}, ${-h$1 / 2})`);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(curvedTrapezoid, "curvedTrapezoid");
var createCylinderPathD = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return [
		`M${x$1},${y$1 + ry}`,
		`a${rx},${ry} 0,0,0 ${width},0`,
		`a${rx},${ry} 0,0,0 ${-width},0`,
		`l0,${height}`,
		`a${rx},${ry} 0,0,0 ${width},0`,
		`l0,${-height}`
	].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return [
		`M${x$1},${y$1 + ry}`,
		`M${x$1 + width},${y$1 + ry}`,
		`a${rx},${ry} 0,0,0 ${-width},0`,
		`l0,${height}`,
		`a${rx},${ry} 0,0,0 ${width},0`,
		`l0,${-height}`
	].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return [`M${x$1 - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
async function cylinder(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + node.padding, node.width ?? 0);
	const rx = w$1 / 2;
	const ry = rx / (2.5 + w$1 / 50);
	const h$1 = Math.max(bbox.height + ry + node.padding, node.height ?? 0);
	let cylinder2;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const outerPathData = createOuterCylinderPathD(0, 0, w$1, h$1, rx, ry);
		const innerPathData = createInnerCylinderPathD(0, ry, w$1, h$1, rx, ry);
		const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
		const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
		cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
		cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
		cylinder2.attr("class", "basic label-container");
		if (cssStyles) cylinder2.attr("style", cssStyles);
	} else {
		const pathData = createCylinderPathD(0, 0, w$1, h$1, rx, ry);
		cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
	}
	cylinder2.attr("label-offset-y", ry);
	cylinder2.attr("transform", `translate(${-w$1 / 2}, ${-(h$1 / 2 + ry)})`);
	updateNodeBounds(node, cylinder2);
	label.attr("transform", `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + (node.padding ?? 0) / 1.5 - (bbox.y - (bbox.top ?? 0))})`);
	node.intersect = function(point) {
		const pos = intersect_default.rect(node, point);
		const x$1 = pos.x - (node.x ?? 0);
		if (rx != 0 && (Math.abs(x$1) < (node.width ?? 0) / 2 || Math.abs(x$1) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
			let y$1 = ry * ry * (1 - x$1 * x$1 / (rx * rx));
			if (y$1 > 0) y$1 = Math.sqrt(y$1);
			y$1 = ry - y$1;
			if (point.y - (node.y ?? 0) > 0) y$1 = -y$1;
			pos.y += y$1;
		}
		return pos;
	};
	return shapeSvg;
}
__name(cylinder, "cylinder");
async function dividedRectangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + node.padding;
	const h$1 = bbox.height + node.padding;
	const rectOffset = h$1 * .2;
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2 - rectOffset / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const pts = [
		{
			x: x$1,
			y: y$1 + rectOffset
		},
		{
			x: -x$1,
			y: y$1 + rectOffset
		},
		{
			x: -x$1,
			y: -y$1
		},
		{
			x: x$1,
			y: -y$1
		},
		{
			x: x$1,
			y: y$1
		},
		{
			x: -x$1,
			y: y$1
		},
		{
			x: -x$1,
			y: y$1 + rectOffset
		}
	];
	const poly = rc.polygon(pts.map((p$1) => [p$1.x, p$1.y]), options);
	const polygon = shapeSvg.insert(() => poly, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectAll("path").attr("style", nodeStyles);
	label.attr("transform", `translate(${x$1 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))}, ${y$1 + rectOffset + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		const pos = intersect_default.rect(node, point);
		return pos;
	};
	return shapeSvg;
}
__name(dividedRectangle, "dividedRectangle");
async function doublecircle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
	const gap = 5;
	const outerRadius = bbox.width / 2 + halfPadding + gap;
	const innerRadius = bbox.width / 2 + halfPadding;
	let circleGroup;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const outerOptions = userNodeOverrides(node, {
			roughness: .2,
			strokeWidth: 2.5
		});
		const innerOptions = userNodeOverrides(node, {
			roughness: .2,
			strokeWidth: 1.5
		});
		const outerRoughNode = rc.circle(0, 0, outerRadius * 2, outerOptions);
		const innerRoughNode = rc.circle(0, 0, innerRadius * 2, innerOptions);
		circleGroup = shapeSvg.insert("g", ":first-child");
		circleGroup.attr("class", handleUndefinedAttr(node.cssClasses)).attr("style", handleUndefinedAttr(cssStyles));
		circleGroup.node()?.appendChild(outerRoughNode);
		circleGroup.node()?.appendChild(innerRoughNode);
	} else {
		circleGroup = shapeSvg.insert("g", ":first-child");
		const outerCircle = circleGroup.insert("circle", ":first-child");
		const innerCircle = circleGroup.insert("circle");
		circleGroup.attr("class", "basic label-container").attr("style", nodeStyles);
		outerCircle.attr("class", "outer-circle").attr("style", nodeStyles).attr("r", outerRadius).attr("cx", 0).attr("cy", 0);
		innerCircle.attr("class", "inner-circle").attr("style", nodeStyles).attr("r", innerRadius).attr("cx", 0).attr("cy", 0);
	}
	updateNodeBounds(node, circleGroup);
	node.intersect = function(point) {
		log.info("DoubleCircle intersect", node, outerRadius, point);
		return intersect_default.circle(node, outerRadius, point);
	};
	return shapeSvg;
}
__name(doublecircle, "doublecircle");
function filledCircle(parent, node, { config: { themeVariables } }) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.label = "";
	node.labelStyle = labelStyles;
	const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
	const radius = 7;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const { nodeBorder } = themeVariables;
	const options = userNodeOverrides(node, { fillStyle: "solid" });
	if (node.look !== "handDrawn") options.roughness = 0;
	const circleNode = rc.circle(0, 0, radius * 2, options);
	const filledCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
	filledCircle2.selectAll("path").attr("style", `fill: ${nodeBorder} !important;`);
	if (cssStyles && cssStyles.length > 0 && node.look !== "handDrawn") filledCircle2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") filledCircle2.selectAll("path").attr("style", nodeStyles);
	updateNodeBounds(node, filledCircle2);
	node.intersect = function(point) {
		log.info("filledCircle intersect", node, {
			radius,
			point
		});
		const pos = intersect_default.circle(node, radius, point);
		return pos;
	};
	return shapeSvg;
}
__name(filledCircle, "filledCircle");
async function flippedTriangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + (node.padding ?? 0);
	const h$1 = w$1 + bbox.height;
	const tw = w$1 + bbox.height;
	const points = [
		{
			x: 0,
			y: -h$1
		},
		{
			x: tw,
			y: -h$1
		},
		{
			x: tw / 2,
			y: 0
		}
	];
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const pathData = createPathFromPoints(points);
	const roughNode = rc.path(pathData, options);
	const flippedTriangle2 = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h$1 / 2}, ${h$1 / 2})`);
	if (cssStyles && node.look !== "handDrawn") flippedTriangle2.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") flippedTriangle2.selectChildren("path").attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, flippedTriangle2);
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-h$1 / 2 + (node.padding ?? 0) / 2 + (bbox.y - (bbox.top ?? 0))})`);
	node.intersect = function(point) {
		log.info("Triangle intersect", node, points, point);
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(flippedTriangle, "flippedTriangle");
function forkJoin(parent, node, { dir, config: { state: state2, themeVariables } }) {
	const { nodeStyles } = styles2String(node);
	node.label = "";
	const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
	const { cssStyles } = node;
	let width = Math.max(70, node?.width ?? 0);
	let height = Math.max(10, node?.height ?? 0);
	if (dir === "LR") {
		width = Math.max(10, node?.width ?? 0);
		height = Math.max(70, node?.height ?? 0);
	}
	const x$1 = -1 * width / 2;
	const y$1 = -1 * height / 2;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {
		stroke: themeVariables.lineColor,
		fill: themeVariables.lineColor
	});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const roughNode = rc.rectangle(x$1, y$1, width, height, options);
	const shape = shapeSvg.insert(() => roughNode, ":first-child");
	if (cssStyles && node.look !== "handDrawn") shape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") shape.selectAll("path").attr("style", nodeStyles);
	updateNodeBounds(node, shape);
	const padding = state2?.padding ?? 0;
	if (node.width && node.height) {
		node.width += padding / 2 || 0;
		node.height += padding / 2 || 0;
	}
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(forkJoin, "forkJoin");
async function halfRoundedRectangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const minWidth = 80, minHeight = 50;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(minWidth, bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const radius = h$1 / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2,
			y: -h$1 / 2
		},
		{
			x: w$1 / 2 - radius,
			y: -h$1 / 2
		},
		...generateCirclePoints(-w$1 / 2 + radius, 0, radius, 50, 90, 270),
		{
			x: w$1 / 2 - radius,
			y: h$1 / 2
		},
		{
			x: -w$1 / 2,
			y: h$1 / 2
		}
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		log.info("Pill intersect", node, {
			radius,
			point
		});
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(halfRoundedRectangle, "halfRoundedRectangle");
async function hexagon(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const h$1 = bbox.height + (node.padding ?? 0);
	const w$1 = bbox.width + (node.padding ?? 0) * 2.5;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	let halfWidth = w$1 / 2;
	const m$1 = halfWidth / 6;
	halfWidth = halfWidth + m$1;
	const halfHeight = h$1 / 2;
	const fixedLength = halfHeight / 2;
	const deducedWidth = halfWidth - fixedLength;
	const points = [
		{
			x: -deducedWidth,
			y: -halfHeight
		},
		{
			x: 0,
			y: -halfHeight
		},
		{
			x: deducedWidth,
			y: -halfHeight
		},
		{
			x: halfWidth,
			y: 0
		},
		{
			x: deducedWidth,
			y: halfHeight
		},
		{
			x: 0,
			y: halfHeight
		},
		{
			x: -deducedWidth,
			y: halfHeight
		},
		{
			x: -halfWidth,
			y: 0
		}
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(hexagon, "hexagon");
async function hourglass(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.label = "";
	node.labelStyle = labelStyles;
	const { shapeSvg } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(30, node?.width ?? 0);
	const h$1 = Math.max(30, node?.height ?? 0);
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: 0,
			y: 0
		},
		{
			x: w$1,
			y: 0
		},
		{
			x: 0,
			y: h$1
		},
		{
			x: w$1,
			y: h$1
		}
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	polygon.attr("transform", `translate(${-w$1 / 2}, ${-h$1 / 2})`);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		log.info("Pill intersect", node, { points });
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(hourglass, "hourglass");
async function icon(parent, node, { config: { themeVariables, flowchart } }) {
	const { labelStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const assetHeight = node.assetHeight ?? 48;
	const assetWidth = node.assetWidth ?? 48;
	const iconSize = Math.max(assetHeight, assetWidth);
	const defaultWidth = flowchart?.wrappingWidth;
	node.width = Math.max(iconSize, defaultWidth ?? 0);
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
	const topLabel = node.pos === "t";
	const height = iconSize;
	const width = iconSize;
	const { nodeBorder } = themeVariables;
	const { stylesMap } = compileStyles(node);
	const x$1 = -width / 2;
	const y$1 = -height / 2;
	const labelPadding = node.label ? 8 : 0;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {
		stroke: "none",
		fill: "none"
	});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const iconNode = rc.rectangle(x$1, y$1, width, height, options);
	const outerWidth = Math.max(width, bbox.width);
	const outerHeight = height + bbox.height + labelPadding;
	const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
		...options,
		fill: "transparent",
		stroke: "none"
	});
	const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
	const outerShape = shapeSvg.insert(() => outerNode);
	if (node.icon) {
		const iconElem = shapeSvg.append("g");
		iconElem.html(`<g>${await getIconSVG(node.icon, {
			height: iconSize,
			width: iconSize,
			fallbackPrefix: ""
		})}</g>`);
		const iconBBox = iconElem.node().getBBox();
		const iconWidth = iconBBox.width;
		const iconHeight = iconBBox.height;
		const iconX = iconBBox.x;
		const iconY = iconBBox.y;
		iconElem.attr("transform", `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`);
		iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
	}
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`);
	iconShape.attr("transform", `translate(0,${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`);
	updateNodeBounds(node, outerShape);
	node.intersect = function(point) {
		log.info("iconSquare intersect", node, point);
		if (!node.label) return intersect_default.rect(node, point);
		const dx = node.x ?? 0;
		const dy = node.y ?? 0;
		const nodeHeight = node.height ?? 0;
		let points = [];
		if (topLabel) points = [
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			}
		];
		else points = [
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx + bbox.width / 2 / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2 + height
			}
		];
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(icon, "icon");
async function iconCircle(parent, node, { config: { themeVariables, flowchart } }) {
	const { labelStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const assetHeight = node.assetHeight ?? 48;
	const assetWidth = node.assetWidth ?? 48;
	const iconSize = Math.max(assetHeight, assetWidth);
	const defaultWidth = flowchart?.wrappingWidth;
	node.width = Math.max(iconSize, defaultWidth ?? 0);
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
	const padding = 20;
	const labelPadding = node.label ? 8 : 0;
	const topLabel = node.pos === "t";
	const { nodeBorder, mainBkg } = themeVariables;
	const { stylesMap } = compileStyles(node);
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const fill = stylesMap.get("fill");
	options.stroke = fill ?? mainBkg;
	const iconElem = shapeSvg.append("g");
	if (node.icon) iconElem.html(`<g>${await getIconSVG(node.icon, {
		height: iconSize,
		width: iconSize,
		fallbackPrefix: ""
	})}</g>`);
	const iconBBox = iconElem.node().getBBox();
	const iconWidth = iconBBox.width;
	const iconHeight = iconBBox.height;
	const iconX = iconBBox.x;
	const iconY = iconBBox.y;
	const diameter = Math.max(iconWidth, iconHeight) * Math.SQRT2 + padding * 2;
	const iconNode = rc.circle(0, 0, diameter, options);
	const outerWidth = Math.max(diameter, bbox.width);
	const outerHeight = diameter + bbox.height + labelPadding;
	const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
		...options,
		fill: "transparent",
		stroke: "none"
	});
	const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
	const outerShape = shapeSvg.insert(() => outerNode);
	iconElem.attr("transform", `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`);
	iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`);
	iconShape.attr("transform", `translate(0,${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`);
	updateNodeBounds(node, outerShape);
	node.intersect = function(point) {
		log.info("iconSquare intersect", node, point);
		const pos = intersect_default.rect(node, point);
		return pos;
	};
	return shapeSvg;
}
__name(iconCircle, "iconCircle");
async function iconRounded(parent, node, { config: { themeVariables, flowchart } }) {
	const { labelStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const assetHeight = node.assetHeight ?? 48;
	const assetWidth = node.assetWidth ?? 48;
	const iconSize = Math.max(assetHeight, assetWidth);
	const defaultWidth = flowchart?.wrappingWidth;
	node.width = Math.max(iconSize, defaultWidth ?? 0);
	const { shapeSvg, bbox, halfPadding, label } = await labelHelper(parent, node, "icon-shape default");
	const topLabel = node.pos === "t";
	const height = iconSize + halfPadding * 2;
	const width = iconSize + halfPadding * 2;
	const { nodeBorder, mainBkg } = themeVariables;
	const { stylesMap } = compileStyles(node);
	const x$1 = -width / 2;
	const y$1 = -height / 2;
	const labelPadding = node.label ? 8 : 0;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const fill = stylesMap.get("fill");
	options.stroke = fill ?? mainBkg;
	const iconNode = rc.path(createRoundedRectPathD(x$1, y$1, width, height, 5), options);
	const outerWidth = Math.max(width, bbox.width);
	const outerHeight = height + bbox.height + labelPadding;
	const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
		...options,
		fill: "transparent",
		stroke: "none"
	});
	const iconShape = shapeSvg.insert(() => iconNode, ":first-child").attr("class", "icon-shape2");
	const outerShape = shapeSvg.insert(() => outerNode);
	if (node.icon) {
		const iconElem = shapeSvg.append("g");
		iconElem.html(`<g>${await getIconSVG(node.icon, {
			height: iconSize,
			width: iconSize,
			fallbackPrefix: ""
		})}</g>`);
		const iconBBox = iconElem.node().getBBox();
		const iconWidth = iconBBox.width;
		const iconHeight = iconBBox.height;
		const iconX = iconBBox.x;
		const iconY = iconBBox.y;
		iconElem.attr("transform", `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`);
		iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
	}
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`);
	iconShape.attr("transform", `translate(0,${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`);
	updateNodeBounds(node, outerShape);
	node.intersect = function(point) {
		log.info("iconSquare intersect", node, point);
		if (!node.label) return intersect_default.rect(node, point);
		const dx = node.x ?? 0;
		const dy = node.y ?? 0;
		const nodeHeight = node.height ?? 0;
		let points = [];
		if (topLabel) points = [
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			}
		];
		else points = [
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx + bbox.width / 2 / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2 + height
			}
		];
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(iconRounded, "iconRounded");
async function iconSquare(parent, node, { config: { themeVariables, flowchart } }) {
	const { labelStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const assetHeight = node.assetHeight ?? 48;
	const assetWidth = node.assetWidth ?? 48;
	const iconSize = Math.max(assetHeight, assetWidth);
	const defaultWidth = flowchart?.wrappingWidth;
	node.width = Math.max(iconSize, defaultWidth ?? 0);
	const { shapeSvg, bbox, halfPadding, label } = await labelHelper(parent, node, "icon-shape default");
	const topLabel = node.pos === "t";
	const height = iconSize + halfPadding * 2;
	const width = iconSize + halfPadding * 2;
	const { nodeBorder, mainBkg } = themeVariables;
	const { stylesMap } = compileStyles(node);
	const x$1 = -width / 2;
	const y$1 = -height / 2;
	const labelPadding = node.label ? 8 : 0;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const fill = stylesMap.get("fill");
	options.stroke = fill ?? mainBkg;
	const iconNode = rc.path(createRoundedRectPathD(x$1, y$1, width, height, .1), options);
	const outerWidth = Math.max(width, bbox.width);
	const outerHeight = height + bbox.height + labelPadding;
	const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
		...options,
		fill: "transparent",
		stroke: "none"
	});
	const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
	const outerShape = shapeSvg.insert(() => outerNode);
	if (node.icon) {
		const iconElem = shapeSvg.append("g");
		iconElem.html(`<g>${await getIconSVG(node.icon, {
			height: iconSize,
			width: iconSize,
			fallbackPrefix: ""
		})}</g>`);
		const iconBBox = iconElem.node().getBBox();
		const iconWidth = iconBBox.width;
		const iconHeight = iconBBox.height;
		const iconX = iconBBox.x;
		const iconY = iconBBox.y;
		iconElem.attr("transform", `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`);
		iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
	}
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`);
	iconShape.attr("transform", `translate(0,${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`);
	updateNodeBounds(node, outerShape);
	node.intersect = function(point) {
		log.info("iconSquare intersect", node, point);
		if (!node.label) return intersect_default.rect(node, point);
		const dx = node.x ?? 0;
		const dy = node.y ?? 0;
		const nodeHeight = node.height ?? 0;
		let points = [];
		if (topLabel) points = [
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			}
		];
		else points = [
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx + bbox.width / 2 / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + height
			},
			{
				x: dx - width / 2,
				y: dy - nodeHeight / 2 + height
			}
		];
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(iconSquare, "iconSquare");
async function imageSquare(parent, node, { config: { flowchart } }) {
	const img = new Image();
	img.src = node?.img ?? "";
	await img.decode();
	const imageNaturalWidth = Number(img.naturalWidth.toString().replace("px", ""));
	const imageNaturalHeight = Number(img.naturalHeight.toString().replace("px", ""));
	node.imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
	const { labelStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const defaultWidth = flowchart?.wrappingWidth;
	node.defaultWidth = flowchart?.wrappingWidth;
	const imageRawWidth = Math.max(node.label ? defaultWidth ?? 0 : 0, node?.assetWidth ?? imageNaturalWidth);
	const imageWidth = node.constraint === "on" ? node?.assetHeight ? node.assetHeight * node.imageAspectRatio : imageRawWidth : imageRawWidth;
	const imageHeight = node.constraint === "on" ? imageWidth / node.imageAspectRatio : node?.assetHeight ?? imageNaturalHeight;
	node.width = Math.max(imageWidth, defaultWidth ?? 0);
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, "image-shape default");
	const topLabel = node.pos === "t";
	const x$1 = -imageWidth / 2;
	const y$1 = -imageHeight / 2;
	const labelPadding = node.label ? 8 : 0;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const imageNode = rc.rectangle(x$1, y$1, imageWidth, imageHeight, options);
	const outerWidth = Math.max(imageWidth, bbox.width);
	const outerHeight = imageHeight + bbox.height + labelPadding;
	const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
		...options,
		fill: "none",
		stroke: "none"
	});
	const iconShape = shapeSvg.insert(() => imageNode, ":first-child");
	const outerShape = shapeSvg.insert(() => outerNode);
	if (node.img) {
		const image = shapeSvg.append("image");
		image.attr("href", node.img);
		image.attr("width", imageWidth);
		image.attr("height", imageHeight);
		image.attr("preserveAspectRatio", "none");
		image.attr("transform", `translate(${-imageWidth / 2},${topLabel ? outerHeight / 2 - imageHeight : -outerHeight / 2})`);
	}
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -imageHeight / 2 - bbox.height / 2 - labelPadding / 2 : imageHeight / 2 - bbox.height / 2 + labelPadding / 2})`);
	iconShape.attr("transform", `translate(0,${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`);
	updateNodeBounds(node, outerShape);
	node.intersect = function(point) {
		log.info("iconSquare intersect", node, point);
		if (!node.label) return intersect_default.rect(node, point);
		const dx = node.x ?? 0;
		const dy = node.y ?? 0;
		const nodeHeight = node.height ?? 0;
		let points = [];
		if (topLabel) points = [
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + imageWidth / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx + imageWidth / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - imageWidth / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - imageWidth / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + bbox.height + labelPadding
			}
		];
		else points = [
			{
				x: dx - imageWidth / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + imageWidth / 2,
				y: dy - nodeHeight / 2
			},
			{
				x: dx + imageWidth / 2,
				y: dy - nodeHeight / 2 + imageHeight
			},
			{
				x: dx + bbox.width / 2,
				y: dy - nodeHeight / 2 + imageHeight
			},
			{
				x: dx + bbox.width / 2 / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy + nodeHeight / 2
			},
			{
				x: dx - bbox.width / 2,
				y: dy - nodeHeight / 2 + imageHeight
			},
			{
				x: dx - imageWidth / 2,
				y: dy - nodeHeight / 2 + imageHeight
			}
		];
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(imageSquare, "imageSquare");
async function inv_trapezoid(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const points = [
		{
			x: 0,
			y: 0
		},
		{
			x: w$1,
			y: 0
		},
		{
			x: w$1 + 3 * h$1 / 6,
			y: -h$1
		},
		{
			x: -3 * h$1 / 6,
			y: -h$1
		}
	];
	let polygon;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const pathData = createPathFromPoints(points);
		const roughNode = rc.path(pathData, options);
		polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w$1 / 2}, ${h$1 / 2})`);
		if (cssStyles) polygon.attr("style", cssStyles);
	} else polygon = insertPolygonShape(shapeSvg, w$1, h$1, points);
	if (nodeStyles) polygon.attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(inv_trapezoid, "inv_trapezoid");
async function drawRect(parent, node, options) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const totalWidth = Math.max(bbox.width + options.labelPaddingX * 2, node?.width || 0);
	const totalHeight = Math.max(bbox.height + options.labelPaddingY * 2, node?.height || 0);
	const x$1 = -totalWidth / 2;
	const y$1 = -totalHeight / 2;
	let rect2;
	let { rx, ry } = node;
	const { cssStyles } = node;
	if (options?.rx && options.ry) {
		rx = options.rx;
		ry = options.ry;
	}
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options2 = userNodeOverrides(node, {});
		const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x$1, y$1, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x$1, y$1, totalWidth, totalHeight, options2);
		rect2 = shapeSvg.insert(() => roughNode, ":first-child");
		rect2.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
	} else {
		rect2 = shapeSvg.insert("rect", ":first-child");
		rect2.attr("class", "basic label-container").attr("style", nodeStyles).attr("rx", handleUndefinedAttr(rx)).attr("ry", handleUndefinedAttr(ry)).attr("x", x$1).attr("y", y$1).attr("width", totalWidth).attr("height", totalHeight);
	}
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(drawRect, "drawRect");
async function labelRect(parent, node) {
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, "label");
	const rect2 = shapeSvg.insert("rect", ":first-child");
	const totalWidth = .1;
	const totalHeight = .1;
	rect2.attr("width", totalWidth).attr("height", totalHeight);
	shapeSvg.attr("class", "label edgeLabel");
	label.attr("transform", `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(labelRect, "labelRect");
async function lean_left(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0), node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0), node?.height ?? 0);
	const points = [
		{
			x: 0,
			y: 0
		},
		{
			x: w$1 + 3 * h$1 / 6,
			y: 0
		},
		{
			x: w$1,
			y: -h$1
		},
		{
			x: -(3 * h$1) / 6,
			y: -h$1
		}
	];
	let polygon;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const pathData = createPathFromPoints(points);
		const roughNode = rc.path(pathData, options);
		polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w$1 / 2}, ${h$1 / 2})`);
		if (cssStyles) polygon.attr("style", cssStyles);
	} else polygon = insertPolygonShape(shapeSvg, w$1, h$1, points);
	if (nodeStyles) polygon.attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(lean_left, "lean_left");
async function lean_right(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0), node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0), node?.height ?? 0);
	const points = [
		{
			x: -3 * h$1 / 6,
			y: 0
		},
		{
			x: w$1,
			y: 0
		},
		{
			x: w$1 + 3 * h$1 / 6,
			y: -h$1
		},
		{
			x: 0,
			y: -h$1
		}
	];
	let polygon;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const pathData = createPathFromPoints(points);
		const roughNode = rc.path(pathData, options);
		polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w$1 / 2}, ${h$1 / 2})`);
		if (cssStyles) polygon.attr("style", cssStyles);
	} else polygon = insertPolygonShape(shapeSvg, w$1, h$1, points);
	if (nodeStyles) polygon.attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(lean_right, "lean_right");
function lightningBolt(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.label = "";
	node.labelStyle = labelStyles;
	const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
	const { cssStyles } = node;
	const width = Math.max(35, node?.width ?? 0);
	const height = Math.max(35, node?.height ?? 0);
	const gap = 7;
	const points = [
		{
			x: width,
			y: 0
		},
		{
			x: 0,
			y: height + gap / 2
		},
		{
			x: width - 2 * gap,
			y: height + gap / 2
		},
		{
			x: 0,
			y: 2 * height
		},
		{
			x: width,
			y: height - gap / 2
		},
		{
			x: 2 * gap,
			y: height - gap / 2
		}
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const linePath = createPathFromPoints(points);
	const lineNode = rc.path(linePath, options);
	const lightningBolt2 = shapeSvg.insert(() => lineNode, ":first-child");
	if (cssStyles && node.look !== "handDrawn") lightningBolt2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") lightningBolt2.selectAll("path").attr("style", nodeStyles);
	lightningBolt2.attr("transform", `translate(-${width / 2},${-height})`);
	updateNodeBounds(node, lightningBolt2);
	node.intersect = function(point) {
		log.info("lightningBolt intersect", node, point);
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(lightningBolt, "lightningBolt");
var createCylinderPathD2 = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry, outerOffset) => {
	return [
		`M${x$1},${y$1 + ry}`,
		`a${rx},${ry} 0,0,0 ${width},0`,
		`a${rx},${ry} 0,0,0 ${-width},0`,
		`l0,${height}`,
		`a${rx},${ry} 0,0,0 ${width},0`,
		`l0,${-height}`,
		`M${x$1},${y$1 + ry + outerOffset}`,
		`a${rx},${ry} 0,0,0 ${width},0`
	].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD2 = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry, outerOffset) => {
	return [
		`M${x$1},${y$1 + ry}`,
		`M${x$1 + width},${y$1 + ry}`,
		`a${rx},${ry} 0,0,0 ${-width},0`,
		`l0,${height}`,
		`a${rx},${ry} 0,0,0 ${width},0`,
		`l0,${-height}`,
		`M${x$1},${y$1 + ry + outerOffset}`,
		`a${rx},${ry} 0,0,0 ${width},0`
	].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD2 = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return [`M${x$1 - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
async function linedCylinder(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0), node.width ?? 0);
	const rx = w$1 / 2;
	const ry = rx / (2.5 + w$1 / 50);
	const h$1 = Math.max(bbox.height + ry + (node.padding ?? 0), node.height ?? 0);
	const outerOffset = h$1 * .1;
	let cylinder2;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const outerPathData = createOuterCylinderPathD2(0, 0, w$1, h$1, rx, ry, outerOffset);
		const innerPathData = createInnerCylinderPathD2(0, ry, w$1, h$1, rx, ry);
		const options = userNodeOverrides(node, {});
		const outerNode = rc.path(outerPathData, options);
		const innerLine = rc.path(innerPathData, options);
		const innerLineEl = shapeSvg.insert(() => innerLine, ":first-child");
		innerLineEl.attr("class", "line");
		cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
		cylinder2.attr("class", "basic label-container");
		if (cssStyles) cylinder2.attr("style", cssStyles);
	} else {
		const pathData = createCylinderPathD2(0, 0, w$1, h$1, rx, ry, outerOffset);
		cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
	}
	cylinder2.attr("label-offset-y", ry);
	cylinder2.attr("transform", `translate(${-w$1 / 2}, ${-(h$1 / 2 + ry)})`);
	updateNodeBounds(node, cylinder2);
	label.attr("transform", `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + ry - (bbox.y - (bbox.top ?? 0))})`);
	node.intersect = function(point) {
		const pos = intersect_default.rect(node, point);
		const x$1 = pos.x - (node.x ?? 0);
		if (rx != 0 && (Math.abs(x$1) < (node.width ?? 0) / 2 || Math.abs(x$1) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
			let y$1 = ry * ry * (1 - x$1 * x$1 / (rx * rx));
			if (y$1 > 0) y$1 = Math.sqrt(y$1);
			y$1 = ry - y$1;
			if (point.y - (node.y ?? 0) > 0) y$1 = -y$1;
			pos.y += y$1;
		}
		return pos;
	};
	return shapeSvg;
}
__name(linedCylinder, "linedCylinder");
async function linedWaveEdgedRect(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const waveAmplitude = h$1 / 4;
	const finalH = h$1 + waveAmplitude;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2 - w$1 / 2 * .1,
			y: -finalH / 2
		},
		{
			x: -w$1 / 2 - w$1 / 2 * .1,
			y: finalH / 2
		},
		...generateFullSineWavePoints(-w$1 / 2 - w$1 / 2 * .1, finalH / 2, w$1 / 2 + w$1 / 2 * .1, finalH / 2, waveAmplitude, .8),
		{
			x: w$1 / 2 + w$1 / 2 * .1,
			y: -finalH / 2
		},
		{
			x: -w$1 / 2 - w$1 / 2 * .1,
			y: -finalH / 2
		},
		{
			x: -w$1 / 2,
			y: -finalH / 2
		},
		{
			x: -w$1 / 2,
			y: finalH / 2 * 1.1
		},
		{
			x: -w$1 / 2,
			y: -finalH / 2
		}
	];
	const poly = rc.polygon(points.map((p$1) => [p$1.x, p$1.y]), options);
	const waveEdgeRect = shapeSvg.insert(() => poly, ":first-child");
	waveEdgeRect.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") waveEdgeRect.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") waveEdgeRect.selectAll("path").attr("style", nodeStyles);
	waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
	label.attr("transform", `translate(${-w$1 / 2 + (node.padding ?? 0) + w$1 / 2 * .1 / 2 - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, waveEdgeRect);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(linedWaveEdgedRect, "linedWaveEdgedRect");
async function multiRect(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const rectOffset = 5;
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	const outerPathPoints = [
		{
			x: x$1 - rectOffset,
			y: y$1 + rectOffset
		},
		{
			x: x$1 - rectOffset,
			y: y$1 + h$1 + rectOffset
		},
		{
			x: x$1 + w$1 - rectOffset,
			y: y$1 + h$1 + rectOffset
		},
		{
			x: x$1 + w$1 - rectOffset,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 + h$1 - rectOffset
		},
		{
			x: x$1 + w$1 + rectOffset,
			y: y$1 + h$1 - rectOffset
		},
		{
			x: x$1 + w$1 + rectOffset,
			y: y$1 - rectOffset
		},
		{
			x: x$1 + rectOffset,
			y: y$1 - rectOffset
		},
		{
			x: x$1 + rectOffset,
			y: y$1
		},
		{
			x: x$1,
			y: y$1
		},
		{
			x: x$1,
			y: y$1 + rectOffset
		}
	];
	const innerPathPoints = [
		{
			x: x$1,
			y: y$1 + rectOffset
		},
		{
			x: x$1 + w$1 - rectOffset,
			y: y$1 + rectOffset
		},
		{
			x: x$1 + w$1 - rectOffset,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1
		},
		{
			x: x$1,
			y: y$1
		}
	];
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const outerPath = createPathFromPoints(outerPathPoints);
	const outerNode = rc.path(outerPath, options);
	const innerPath = createPathFromPoints(innerPathPoints);
	const innerNode = rc.path(innerPath, {
		...options,
		fill: "none"
	});
	const multiRect2 = shapeSvg.insert(() => innerNode, ":first-child");
	multiRect2.insert(() => outerNode, ":first-child");
	multiRect2.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") multiRect2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") multiRect2.selectAll("path").attr("style", nodeStyles);
	label.attr("transform", `translate(${-(bbox.width / 2) - rectOffset - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, multiRect2);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, outerPathPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(multiRect, "multiRect");
async function multiWaveEdgedRectangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const waveAmplitude = h$1 / 4;
	const finalH = h$1 + waveAmplitude;
	const x$1 = -w$1 / 2;
	const y$1 = -finalH / 2;
	const rectOffset = 5;
	const { cssStyles } = node;
	const wavePoints = generateFullSineWavePoints(x$1 - rectOffset, y$1 + finalH + rectOffset, x$1 + w$1 - rectOffset, y$1 + finalH + rectOffset, waveAmplitude, .8);
	const lastWavePoint = wavePoints?.[wavePoints.length - 1];
	const outerPathPoints = [
		{
			x: x$1 - rectOffset,
			y: y$1 + rectOffset
		},
		{
			x: x$1 - rectOffset,
			y: y$1 + finalH + rectOffset
		},
		...wavePoints,
		{
			x: x$1 + w$1 - rectOffset,
			y: lastWavePoint.y - rectOffset
		},
		{
			x: x$1 + w$1,
			y: lastWavePoint.y - rectOffset
		},
		{
			x: x$1 + w$1,
			y: lastWavePoint.y - 2 * rectOffset
		},
		{
			x: x$1 + w$1 + rectOffset,
			y: lastWavePoint.y - 2 * rectOffset
		},
		{
			x: x$1 + w$1 + rectOffset,
			y: y$1 - rectOffset
		},
		{
			x: x$1 + rectOffset,
			y: y$1 - rectOffset
		},
		{
			x: x$1 + rectOffset,
			y: y$1
		},
		{
			x: x$1,
			y: y$1
		},
		{
			x: x$1,
			y: y$1 + rectOffset
		}
	];
	const innerPathPoints = [
		{
			x: x$1,
			y: y$1 + rectOffset
		},
		{
			x: x$1 + w$1 - rectOffset,
			y: y$1 + rectOffset
		},
		{
			x: x$1 + w$1 - rectOffset,
			y: lastWavePoint.y - rectOffset
		},
		{
			x: x$1 + w$1,
			y: lastWavePoint.y - rectOffset
		},
		{
			x: x$1 + w$1,
			y: y$1
		},
		{
			x: x$1,
			y: y$1
		}
	];
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const outerPath = createPathFromPoints(outerPathPoints);
	const outerNode = rc.path(outerPath, options);
	const innerPath = createPathFromPoints(innerPathPoints);
	const innerNode = rc.path(innerPath, options);
	const shape = shapeSvg.insert(() => outerNode, ":first-child");
	shape.insert(() => innerNode);
	shape.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") shape.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") shape.selectAll("path").attr("style", nodeStyles);
	shape.attr("transform", `translate(0,${-waveAmplitude / 2})`);
	label.attr("transform", `translate(${-(bbox.width / 2) - rectOffset - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, shape);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, outerPathPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(multiWaveEdgedRectangle, "multiWaveEdgedRectangle");
async function note(parent, node, { config: { themeVariables } }) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const useHtmlLabels = node.useHtmlLabels || getConfig().flowchart?.htmlLabels !== false;
	if (!useHtmlLabels) node.centerLabel = true;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const totalWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const totalHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const x$1 = -totalWidth / 2;
	const y$1 = -totalHeight / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {
		fill: themeVariables.noteBkgColor,
		stroke: themeVariables.noteBorderColor
	});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const noteShapeNode = rc.rectangle(x$1, y$1, totalWidth, totalHeight, options);
	const rect2 = shapeSvg.insert(() => noteShapeNode, ":first-child");
	rect2.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") rect2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") rect2.selectAll("path").attr("style", nodeStyles);
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(note, "note");
var createDecisionBoxPathD = /* @__PURE__ */ __name((x$1, y$1, size) => {
	return [
		`M${x$1 + size / 2},${y$1}`,
		`L${x$1 + size},${y$1 - size / 2}`,
		`L${x$1 + size / 2},${y$1 - size}`,
		`L${x$1},${y$1 - size / 2}`,
		"Z"
	].join(" ");
}, "createDecisionBoxPathD");
async function question(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + node.padding;
	const h$1 = bbox.height + node.padding;
	const s$1 = w$1 + h$1;
	const adjustment = .5;
	const points = [
		{
			x: s$1 / 2,
			y: 0
		},
		{
			x: s$1,
			y: -s$1 / 2
		},
		{
			x: s$1 / 2,
			y: -s$1
		},
		{
			x: 0,
			y: -s$1 / 2
		}
	];
	let polygon;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const pathData = createDecisionBoxPathD(0, 0, s$1);
		const roughNode = rc.path(pathData, options);
		polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-s$1 / 2 + adjustment}, ${s$1 / 2})`);
		if (cssStyles) polygon.attr("style", cssStyles);
	} else {
		polygon = insertPolygonShape(shapeSvg, s$1, s$1, points);
		polygon.attr("transform", `translate(${-s$1 / 2 + adjustment}, ${s$1 / 2})`);
	}
	if (nodeStyles) polygon.attr("style", nodeStyles);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		log.debug("APA12 Intersect called SPLIT\npoint:", point, "\nnode:\n", node, "\nres:", intersect_default.polygon(node, points, point));
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(question, "question");
async function rect_left_inv_arrow(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0), node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0), node?.height ?? 0);
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	const notch = y$1 / 2;
	const points = [
		{
			x: x$1 + notch,
			y: y$1
		},
		{
			x: x$1,
			y: 0
		},
		{
			x: x$1 + notch,
			y: -y$1
		},
		{
			x: -x$1,
			y: -y$1
		},
		{
			x: -x$1,
			y: y$1
		}
	];
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const pathData = createPathFromPoints(points);
	const roughNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => roughNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectAll("path").attr("style", nodeStyles);
	polygon.attr("transform", `translate(${-notch / 2},0)`);
	label.attr("transform", `translate(${-notch / 2 - bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(rect_left_inv_arrow, "rect_left_inv_arrow");
async function rectWithTitle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	let classes;
	if (!node.cssClasses) classes = "node default";
	else classes = "node " + node.cssClasses;
	const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId || node.id);
	const g$1 = shapeSvg.insert("g");
	const label = shapeSvg.insert("g").attr("class", "label").attr("style", nodeStyles);
	const description = node.description;
	const title = node.label;
	const text2 = label.node().appendChild(await createLabel_default(title, node.labelStyle, true, true));
	let bbox = {
		width: 0,
		height: 0
	};
	if (evaluate(getConfig2()?.flowchart?.htmlLabels)) {
		const div2 = text2.children[0];
		const dv2 = select_default(text2);
		bbox = div2.getBoundingClientRect();
		dv2.attr("width", bbox.width);
		dv2.attr("height", bbox.height);
	}
	log.info("Text 2", description);
	const textRows = description || [];
	const titleBox = text2.getBBox();
	const descr = label.node().appendChild(await createLabel_default(textRows.join ? textRows.join("<br/>") : textRows, node.labelStyle, true, true));
	const div = descr.children[0];
	const dv = select_default(descr);
	bbox = div.getBoundingClientRect();
	dv.attr("width", bbox.width);
	dv.attr("height", bbox.height);
	const halfPadding = (node.padding || 0) / 2;
	select_default(descr).attr("transform", "translate( " + (bbox.width > titleBox.width ? 0 : (titleBox.width - bbox.width) / 2) + ", " + (titleBox.height + halfPadding + 5) + ")");
	select_default(text2).attr("transform", "translate( " + (bbox.width < titleBox.width ? 0 : -(titleBox.width - bbox.width) / 2) + ", 0)");
	bbox = label.node().getBBox();
	label.attr("transform", "translate(" + -bbox.width / 2 + ", " + (-bbox.height / 2 - halfPadding + 3) + ")");
	const totalWidth = bbox.width + (node.padding || 0);
	const totalHeight = bbox.height + (node.padding || 0);
	const x$1 = -bbox.width / 2 - halfPadding;
	const y$1 = -bbox.height / 2 - halfPadding;
	let rect2;
	let innerLine;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const roughNode = rc.path(createRoundedRectPathD(x$1, y$1, totalWidth, totalHeight, node.rx || 0), options);
		const roughLine = rc.line(-bbox.width / 2 - halfPadding, -bbox.height / 2 - halfPadding + titleBox.height + halfPadding, bbox.width / 2 + halfPadding, -bbox.height / 2 - halfPadding + titleBox.height + halfPadding, options);
		innerLine = shapeSvg.insert(() => {
			log.debug("Rough node insert CXC", roughNode);
			return roughLine;
		}, ":first-child");
		rect2 = shapeSvg.insert(() => {
			log.debug("Rough node insert CXC", roughNode);
			return roughNode;
		}, ":first-child");
	} else {
		rect2 = g$1.insert("rect", ":first-child");
		innerLine = g$1.insert("line");
		rect2.attr("class", "outer title-state").attr("style", nodeStyles).attr("x", -bbox.width / 2 - halfPadding).attr("y", -bbox.height / 2 - halfPadding).attr("width", bbox.width + (node.padding || 0)).attr("height", bbox.height + (node.padding || 0));
		innerLine.attr("class", "divider").attr("x1", -bbox.width / 2 - halfPadding).attr("x2", bbox.width / 2 + halfPadding).attr("y1", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding).attr("y2", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding);
	}
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(rectWithTitle, "rectWithTitle");
function generateArcPoints2(x1, y1, x2, y2, rx, ry, clockwise) {
	const numPoints = 20;
	const midX = (x1 + x2) / 2;
	const midY = (y1 + y2) / 2;
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const dx = (x2 - x1) / 2;
	const dy = (y2 - y1) / 2;
	const transformedX = dx / rx;
	const transformedY = dy / ry;
	const distance = Math.sqrt(transformedX ** 2 + transformedY ** 2);
	if (distance > 1) throw new Error("The given radii are too small to create an arc between the points.");
	const scaledCenterDistance = Math.sqrt(1 - distance ** 2);
	const centerX = midX + scaledCenterDistance * ry * Math.sin(angle) * (clockwise ? -1 : 1);
	const centerY = midY - scaledCenterDistance * rx * Math.cos(angle) * (clockwise ? -1 : 1);
	const startAngle = Math.atan2((y1 - centerY) / ry, (x1 - centerX) / rx);
	const endAngle = Math.atan2((y2 - centerY) / ry, (x2 - centerX) / rx);
	let angleRange = endAngle - startAngle;
	if (clockwise && angleRange < 0) angleRange += 2 * Math.PI;
	if (!clockwise && angleRange > 0) angleRange -= 2 * Math.PI;
	const points = [];
	for (let i$1 = 0; i$1 < numPoints; i$1++) {
		const t$1 = i$1 / (numPoints - 1);
		const angle2 = startAngle + t$1 * angleRange;
		const x$1 = centerX + rx * Math.cos(angle2);
		const y$1 = centerY + ry * Math.sin(angle2);
		points.push({
			x: x$1,
			y: y$1
		});
	}
	return points;
}
__name(generateArcPoints2, "generateArcPoints");
async function roundedRect(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const labelPaddingX = node?.padding ?? 0;
	const labelPaddingY = node?.padding ?? 0;
	const w$1 = (node?.width ? node?.width : bbox.width) + labelPaddingX * 2;
	const h$1 = (node?.height ? node?.height : bbox.height) + labelPaddingY * 2;
	const radius = 5;
	const taper = 5;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2 + taper,
			y: -h$1 / 2
		},
		{
			x: w$1 / 2 - taper,
			y: -h$1 / 2
		},
		...generateArcPoints2(w$1 / 2 - taper, -h$1 / 2, w$1 / 2, -h$1 / 2 + taper, radius, radius, true),
		{
			x: w$1 / 2,
			y: -h$1 / 2 + taper
		},
		{
			x: w$1 / 2,
			y: h$1 / 2 - taper
		},
		...generateArcPoints2(w$1 / 2, h$1 / 2 - taper, w$1 / 2 - taper, h$1 / 2, radius, radius, true),
		{
			x: w$1 / 2 - taper,
			y: h$1 / 2
		},
		{
			x: -w$1 / 2 + taper,
			y: h$1 / 2
		},
		...generateArcPoints2(-w$1 / 2 + taper, h$1 / 2, -w$1 / 2, h$1 / 2 - taper, radius, radius, true),
		{
			x: -w$1 / 2,
			y: h$1 / 2 - taper
		},
		{
			x: -w$1 / 2,
			y: -h$1 / 2 + taper
		},
		...generateArcPoints2(-w$1 / 2, -h$1 / 2 + taper, -w$1 / 2 + taper, -h$1 / 2, radius, radius, true)
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container outer-path");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(roundedRect, "roundedRect");
async function shadedProcess(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const halfPadding = node?.padding ?? 0;
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const x$1 = -bbox.width / 2 - halfPadding;
	const y$1 = -bbox.height / 2 - halfPadding;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: x$1,
			y: y$1
		},
		{
			x: x$1 + w$1 + 8,
			y: y$1
		},
		{
			x: x$1 + w$1 + 8,
			y: y$1 + h$1
		},
		{
			x: x$1 - 8,
			y: y$1 + h$1
		},
		{
			x: x$1 - 8,
			y: y$1
		},
		{
			x: x$1,
			y: y$1
		},
		{
			x: x$1,
			y: y$1 + h$1
		}
	];
	const roughNode = rc.polygon(points.map((p$1) => [p$1.x, p$1.y]), options);
	const rect2 = shapeSvg.insert(() => roughNode, ":first-child");
	rect2.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
	if (nodeStyles && node.look !== "handDrawn") rect2.selectAll("path").attr("style", nodeStyles);
	if (cssStyles && node.look !== "handDrawn") rect2.selectAll("path").attr("style", nodeStyles);
	label.attr("transform", `translate(${-w$1 / 2 + 4 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(shadedProcess, "shadedProcess");
async function slopedRect(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: x$1,
			y: y$1
		},
		{
			x: x$1,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 - h$1 / 2
		}
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	polygon.attr("transform", `translate(0, ${h$1 / 4})`);
	label.attr("transform", `translate(${-w$1 / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))}, ${-h$1 / 4 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(slopedRect, "slopedRect");
async function squareRect2(parent, node) {
	const options = {
		rx: 0,
		ry: 0,
		classes: "",
		labelPaddingX: (node?.padding || 0) * 2,
		labelPaddingY: (node?.padding || 0) * 1
	};
	return drawRect(parent, node, options);
}
__name(squareRect2, "squareRect");
async function stadium(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const h$1 = bbox.height + node.padding;
	const w$1 = bbox.width + h$1 / 4 + node.padding;
	const radius = h$1 / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2 + radius,
			y: -h$1 / 2
		},
		{
			x: w$1 / 2 - radius,
			y: -h$1 / 2
		},
		...generateCirclePoints(-w$1 / 2 + radius, 0, radius, 50, 90, 270),
		{
			x: w$1 / 2 - radius,
			y: h$1 / 2
		},
		...generateCirclePoints(w$1 / 2 - radius, 0, radius, 50, 270, 450)
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container outer-path");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(stadium, "stadium");
async function state(parent, node) {
	const options = {
		rx: 5,
		ry: 5,
		classes: "flowchart-node"
	};
	return drawRect(parent, node, options);
}
__name(state, "state");
function stateEnd(parent, node, { config: { themeVariables } }) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { cssStyles } = node;
	const { lineColor, stateBorder, nodeBorder } = themeVariables;
	const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const roughNode = rc.circle(0, 0, 14, {
		...options,
		stroke: lineColor,
		strokeWidth: 2
	});
	const innerFill = stateBorder ?? nodeBorder;
	const roughInnerNode = rc.circle(0, 0, 5, {
		...options,
		fill: innerFill,
		stroke: innerFill,
		strokeWidth: 2,
		fillStyle: "solid"
	});
	const circle2 = shapeSvg.insert(() => roughNode, ":first-child");
	circle2.insert(() => roughInnerNode);
	if (cssStyles) circle2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles) circle2.selectAll("path").attr("style", nodeStyles);
	updateNodeBounds(node, circle2);
	node.intersect = function(point) {
		return intersect_default.circle(node, 7, point);
	};
	return shapeSvg;
}
__name(stateEnd, "stateEnd");
function stateStart(parent, node, { config: { themeVariables } }) {
	const { lineColor } = themeVariables;
	const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
	let circle2;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const roughNode = rc.circle(0, 0, 14, solidStateFill(lineColor));
		circle2 = shapeSvg.insert(() => roughNode);
		circle2.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
	} else {
		circle2 = shapeSvg.insert("circle", ":first-child");
		circle2.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
	}
	updateNodeBounds(node, circle2);
	node.intersect = function(point) {
		return intersect_default.circle(node, 7, point);
	};
	return shapeSvg;
}
__name(stateStart, "stateStart");
async function subroutine(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const halfPadding = (node?.padding || 0) / 2;
	const w$1 = bbox.width + node.padding;
	const h$1 = bbox.height + node.padding;
	const x$1 = -bbox.width / 2 - halfPadding;
	const y$1 = -bbox.height / 2 - halfPadding;
	const points = [
		{
			x: 0,
			y: 0
		},
		{
			x: w$1,
			y: 0
		},
		{
			x: w$1,
			y: -h$1
		},
		{
			x: 0,
			y: -h$1
		},
		{
			x: 0,
			y: 0
		},
		{
			x: -8,
			y: 0
		},
		{
			x: w$1 + 8,
			y: 0
		},
		{
			x: w$1 + 8,
			y: -h$1
		},
		{
			x: -8,
			y: -h$1
		},
		{
			x: -8,
			y: 0
		}
	];
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const roughNode = rc.rectangle(x$1 - 8, y$1, w$1 + 16, h$1, options);
		const l1 = rc.line(x$1, y$1, x$1, y$1 + h$1, options);
		const l2 = rc.line(x$1 + w$1, y$1, x$1 + w$1, y$1 + h$1, options);
		shapeSvg.insert(() => l1, ":first-child");
		shapeSvg.insert(() => l2, ":first-child");
		const rect2 = shapeSvg.insert(() => roughNode, ":first-child");
		const { cssStyles } = node;
		rect2.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
		updateNodeBounds(node, rect2);
	} else {
		const el = insertPolygonShape(shapeSvg, w$1, h$1, points);
		if (nodeStyles) el.attr("style", nodeStyles);
		updateNodeBounds(node, el);
	}
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(subroutine, "subroutine");
async function taggedRect(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	const tagWidth = .2 * h$1;
	const tagHeight = .2 * h$1;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	const rectPoints = [
		{
			x: x$1 - tagWidth / 2,
			y: y$1
		},
		{
			x: x$1 + w$1 + tagWidth / 2,
			y: y$1
		},
		{
			x: x$1 + w$1 + tagWidth / 2,
			y: y$1 + h$1
		},
		{
			x: x$1 - tagWidth / 2,
			y: y$1 + h$1
		}
	];
	const tagPoints = [
		{
			x: x$1 + w$1 - tagWidth / 2,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1 + tagWidth / 2,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1 + tagWidth / 2,
			y: y$1 + h$1 - tagHeight
		}
	];
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const rectPath = createPathFromPoints(rectPoints);
	const rectNode = rc.path(rectPath, options);
	const tagPath = createPathFromPoints(tagPoints);
	const tagNode = rc.path(tagPath, {
		...options,
		fillStyle: "solid"
	});
	const taggedRect2 = shapeSvg.insert(() => tagNode, ":first-child");
	taggedRect2.insert(() => rectNode, ":first-child");
	taggedRect2.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") taggedRect2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") taggedRect2.selectAll("path").attr("style", nodeStyles);
	updateNodeBounds(node, taggedRect2);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, rectPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(taggedRect, "taggedRect");
async function taggedWaveEdgedRectangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const waveAmplitude = h$1 / 4;
	const tagWidth = .2 * w$1;
	const tagHeight = .2 * h$1;
	const finalH = h$1 + waveAmplitude;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2 - w$1 / 2 * .1,
			y: finalH / 2
		},
		...generateFullSineWavePoints(-w$1 / 2 - w$1 / 2 * .1, finalH / 2, w$1 / 2 + w$1 / 2 * .1, finalH / 2, waveAmplitude, .8),
		{
			x: w$1 / 2 + w$1 / 2 * .1,
			y: -finalH / 2
		},
		{
			x: -w$1 / 2 - w$1 / 2 * .1,
			y: -finalH / 2
		}
	];
	const x$1 = -w$1 / 2 + w$1 / 2 * .1;
	const y$1 = -finalH / 2 - tagHeight * .4;
	const tagPoints = [
		{
			x: x$1 + w$1 - tagWidth,
			y: (y$1 + h$1) * 1.4
		},
		{
			x: x$1 + w$1,
			y: y$1 + h$1 - tagHeight
		},
		{
			x: x$1 + w$1,
			y: (y$1 + h$1) * .9
		},
		...generateFullSineWavePoints(x$1 + w$1, (y$1 + h$1) * 1.3, x$1 + w$1 - tagWidth, (y$1 + h$1) * 1.5, -h$1 * .03, .5)
	];
	const waveEdgeRectPath = createPathFromPoints(points);
	const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
	const taggedWaveEdgeRectPath = createPathFromPoints(tagPoints);
	const taggedWaveEdgeRectNode = rc.path(taggedWaveEdgeRectPath, {
		...options,
		fillStyle: "solid"
	});
	const waveEdgeRect = shapeSvg.insert(() => taggedWaveEdgeRectNode, ":first-child");
	waveEdgeRect.insert(() => waveEdgeRectNode, ":first-child");
	waveEdgeRect.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") waveEdgeRect.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") waveEdgeRect.selectAll("path").attr("style", nodeStyles);
	waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
	label.attr("transform", `translate(${-w$1 / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, waveEdgeRect);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(taggedWaveEdgedRectangle, "taggedWaveEdgedRectangle");
async function text(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const totalWidth = Math.max(bbox.width + node.padding, node?.width || 0);
	const totalHeight = Math.max(bbox.height + node.padding, node?.height || 0);
	const x$1 = -totalWidth / 2;
	const y$1 = -totalHeight / 2;
	const rect2 = shapeSvg.insert("rect", ":first-child");
	rect2.attr("class", "text").attr("style", nodeStyles).attr("rx", 0).attr("ry", 0).attr("x", x$1).attr("y", y$1).attr("width", totalWidth).attr("height", totalHeight);
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(text, "text");
var createCylinderPathD3 = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return `M${x$1},${y$1}
    a${rx},${ry} 0,0,1 0,${-height}
    l${width},0
    a${rx},${ry} 0,0,1 0,${height}
    M${width},${-height}
    a${rx},${ry} 0,0,0 0,${height}
    l${-width},0`;
}, "createCylinderPathD");
var createOuterCylinderPathD3 = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return [
		`M${x$1},${y$1}`,
		`M${x$1 + width},${y$1}`,
		`a${rx},${ry} 0,0,0 0,${-height}`,
		`l${-width},0`,
		`a${rx},${ry} 0,0,0 0,${height}`,
		`l${width},0`
	].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD3 = /* @__PURE__ */ __name((x$1, y$1, width, height, rx, ry) => {
	return [`M${x$1 + width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 0,${height}`].join(" ");
}, "createInnerCylinderPathD");
async function tiltedCylinder(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
	const labelPadding = node.look === "neo" ? halfPadding * 2 : halfPadding;
	const h$1 = bbox.height + labelPadding;
	const ry = h$1 / 2;
	const rx = ry / (2.5 + h$1 / 50);
	const w$1 = bbox.width + rx + labelPadding;
	const { cssStyles } = node;
	let cylinder2;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const outerPathData = createOuterCylinderPathD3(0, 0, w$1, h$1, rx, ry);
		const innerPathData = createInnerCylinderPathD3(0, 0, w$1, h$1, rx, ry);
		const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
		const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
		cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
		cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
		cylinder2.attr("class", "basic label-container");
		if (cssStyles) cylinder2.attr("style", cssStyles);
	} else {
		const pathData = createCylinderPathD3(0, 0, w$1, h$1, rx, ry);
		cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
		cylinder2.attr("class", "basic label-container");
		if (cssStyles) cylinder2.selectAll("path").attr("style", cssStyles);
		if (nodeStyles) cylinder2.selectAll("path").attr("style", nodeStyles);
	}
	cylinder2.attr("label-offset-x", rx);
	cylinder2.attr("transform", `translate(${-w$1 / 2}, ${h$1 / 2} )`);
	label.attr("transform", `translate(${-(bbox.width / 2) - rx - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, cylinder2);
	node.intersect = function(point) {
		const pos = intersect_default.rect(node, point);
		const y$1 = pos.y - (node.y ?? 0);
		if (ry != 0 && (Math.abs(y$1) < (node.height ?? 0) / 2 || Math.abs(y$1) == (node.height ?? 0) / 2 && Math.abs(pos.x - (node.x ?? 0)) > (node.width ?? 0) / 2 - rx)) {
			let x$1 = rx * rx * (1 - y$1 * y$1 / (ry * ry));
			if (x$1 != 0) x$1 = Math.sqrt(Math.abs(x$1));
			x$1 = rx - x$1;
			if (point.x - (node.x ?? 0) > 0) x$1 = -x$1;
			pos.x += x$1;
		}
		return pos;
	};
	return shapeSvg;
}
__name(tiltedCylinder, "tiltedCylinder");
async function trapezoid(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = bbox.width + node.padding;
	const h$1 = bbox.height + node.padding;
	const points = [
		{
			x: -3 * h$1 / 6,
			y: 0
		},
		{
			x: w$1 + 3 * h$1 / 6,
			y: 0
		},
		{
			x: w$1,
			y: -h$1
		},
		{
			x: 0,
			y: -h$1
		}
	];
	let polygon;
	const { cssStyles } = node;
	if (node.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options = userNodeOverrides(node, {});
		const pathData = createPathFromPoints(points);
		const roughNode = rc.path(pathData, options);
		polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w$1 / 2}, ${h$1 / 2})`);
		if (cssStyles) polygon.attr("style", cssStyles);
	} else polygon = insertPolygonShape(shapeSvg, w$1, h$1, points);
	if (nodeStyles) polygon.attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(trapezoid, "trapezoid");
async function trapezoidalPentagon(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const minWidth = 60, minHeight = 20;
	const w$1 = Math.max(minWidth, bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2 * .8,
			y: -h$1 / 2
		},
		{
			x: w$1 / 2 * .8,
			y: -h$1 / 2
		},
		{
			x: w$1 / 2,
			y: -h$1 / 2 * .6
		},
		{
			x: w$1 / 2,
			y: h$1 / 2
		},
		{
			x: -w$1 / 2,
			y: h$1 / 2
		},
		{
			x: -w$1 / 2,
			y: -h$1 / 2 * .6
		}
	];
	const pathData = createPathFromPoints(points);
	const shapeNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
	polygon.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	updateNodeBounds(node, polygon);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(trapezoidalPentagon, "trapezoidalPentagon");
async function triangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const useHtmlLabels = evaluate(getConfig2().flowchart?.htmlLabels);
	const w$1 = bbox.width + (node.padding ?? 0);
	const h$1 = w$1 + bbox.height;
	const tw = w$1 + bbox.height;
	const points = [
		{
			x: 0,
			y: 0
		},
		{
			x: tw,
			y: 0
		},
		{
			x: tw / 2,
			y: -h$1
		}
	];
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const pathData = createPathFromPoints(points);
	const roughNode = rc.path(pathData, options);
	const polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h$1 / 2}, ${h$1 / 2})`);
	if (cssStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") polygon.selectChildren("path").attr("style", nodeStyles);
	node.width = w$1;
	node.height = h$1;
	updateNodeBounds(node, polygon);
	label.attr("transform", `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${h$1 / 2 - (bbox.height + (node.padding ?? 0) / (useHtmlLabels ? 2 : 1) - (bbox.y - (bbox.top ?? 0)))})`);
	node.intersect = function(point) {
		log.info("Triangle intersect", node, points, point);
		return intersect_default.polygon(node, points, point);
	};
	return shapeSvg;
}
__name(triangle, "triangle");
async function waveEdgedRectangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const waveAmplitude = h$1 / 8;
	const finalH = h$1 + waveAmplitude;
	const { cssStyles } = node;
	const minWidth = 70;
	const widthDif = minWidth - w$1;
	const extraW = widthDif > 0 ? widthDif / 2 : 0;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2 - extraW,
			y: finalH / 2
		},
		...generateFullSineWavePoints(-w$1 / 2 - extraW, finalH / 2, w$1 / 2 + extraW, finalH / 2, waveAmplitude, .8),
		{
			x: w$1 / 2 + extraW,
			y: -finalH / 2
		},
		{
			x: -w$1 / 2 - extraW,
			y: -finalH / 2
		}
	];
	const waveEdgeRectPath = createPathFromPoints(points);
	const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
	const waveEdgeRect = shapeSvg.insert(() => waveEdgeRectNode, ":first-child");
	waveEdgeRect.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") waveEdgeRect.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") waveEdgeRect.selectAll("path").attr("style", nodeStyles);
	waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
	label.attr("transform", `translate(${-w$1 / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h$1 / 2 + (node.padding ?? 0) - waveAmplitude - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, waveEdgeRect);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(waveEdgedRectangle, "waveEdgedRectangle");
async function waveRectangle(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
	const minWidth = 100;
	const minHeight = 50;
	const baseWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const baseHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const aspectRatio = baseWidth / baseHeight;
	let w$1 = baseWidth;
	let h$1 = baseHeight;
	if (w$1 > h$1 * aspectRatio) h$1 = w$1 / aspectRatio;
	else w$1 = h$1 * aspectRatio;
	w$1 = Math.max(w$1, minWidth);
	h$1 = Math.max(h$1, minHeight);
	const waveAmplitude = Math.min(h$1 * .2, h$1 / 4);
	const finalH = h$1 + waveAmplitude * 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const points = [
		{
			x: -w$1 / 2,
			y: finalH / 2
		},
		...generateFullSineWavePoints(-w$1 / 2, finalH / 2, w$1 / 2, finalH / 2, waveAmplitude, 1),
		{
			x: w$1 / 2,
			y: -finalH / 2
		},
		...generateFullSineWavePoints(w$1 / 2, -finalH / 2, -w$1 / 2, -finalH / 2, waveAmplitude, -1)
	];
	const waveRectPath = createPathFromPoints(points);
	const waveRectNode = rc.path(waveRectPath, options);
	const waveRect = shapeSvg.insert(() => waveRectNode, ":first-child");
	waveRect.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") waveRect.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") waveRect.selectAll("path").attr("style", nodeStyles);
	updateNodeBounds(node, waveRect);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, points, point);
		return pos;
	};
	return shapeSvg;
}
__name(waveRectangle, "waveRectangle");
async function windowPane(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
	const w$1 = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
	const h$1 = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
	const rectOffset = 5;
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	const { cssStyles } = node;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	const outerPathPoints = [
		{
			x: x$1 - rectOffset,
			y: y$1 - rectOffset
		},
		{
			x: x$1 - rectOffset,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 + h$1
		},
		{
			x: x$1 + w$1,
			y: y$1 - rectOffset
		}
	];
	const path = `M${x$1 - rectOffset},${y$1 - rectOffset} L${x$1 + w$1},${y$1 - rectOffset} L${x$1 + w$1},${y$1 + h$1} L${x$1 - rectOffset},${y$1 + h$1} L${x$1 - rectOffset},${y$1 - rectOffset}
                M${x$1 - rectOffset},${y$1} L${x$1 + w$1},${y$1}
                M${x$1},${y$1 - rectOffset} L${x$1},${y$1 + h$1}`;
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const no = rc.path(path, options);
	const windowPane2 = shapeSvg.insert(() => no, ":first-child");
	windowPane2.attr("transform", `translate(${rectOffset / 2}, ${rectOffset / 2})`);
	windowPane2.attr("class", "basic label-container");
	if (cssStyles && node.look !== "handDrawn") windowPane2.selectAll("path").attr("style", cssStyles);
	if (nodeStyles && node.look !== "handDrawn") windowPane2.selectAll("path").attr("style", nodeStyles);
	label.attr("transform", `translate(${-(bbox.width / 2) + rectOffset / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset / 2 - (bbox.y - (bbox.top ?? 0))})`);
	updateNodeBounds(node, windowPane2);
	node.intersect = function(point) {
		const pos = intersect_default.polygon(node, outerPathPoints, point);
		return pos;
	};
	return shapeSvg;
}
__name(windowPane, "windowPane");
async function erBox(parent, node) {
	const entityNode = node;
	if (entityNode.alias) node.label = entityNode.alias;
	if (node.look === "handDrawn") {
		const { themeVariables: themeVariables2 } = getConfig();
		const { background } = themeVariables2;
		const backgroundNode = {
			...node,
			id: node.id + "-background",
			look: "default",
			cssStyles: ["stroke: none", `fill: ${background}`]
		};
		await erBox(parent, backgroundNode);
	}
	const config = getConfig();
	node.useHtmlLabels = config.htmlLabels;
	let PADDING = config.er?.diagramPadding ?? 10;
	let TEXT_PADDING = config.er?.entityPadding ?? 6;
	const { cssStyles } = node;
	const { labelStyles, nodeStyles } = styles2String(node);
	if (entityNode.attributes.length === 0 && node.label) {
		const options2 = {
			rx: 0,
			ry: 0,
			labelPaddingX: PADDING,
			labelPaddingY: PADDING * 1.5,
			classes: ""
		};
		if (calculateTextWidth(node.label, config) + options2.labelPaddingX * 2 < config.er.minEntityWidth) node.width = config.er.minEntityWidth;
		const shapeSvg2 = await drawRect(parent, node, options2);
		if (!evaluate(config.htmlLabels)) {
			const textElement = shapeSvg2.select("text");
			const bbox = textElement.node()?.getBBox();
			textElement.attr("transform", `translate(${-bbox.width / 2}, 0)`);
		}
		return shapeSvg2;
	}
	if (!config.htmlLabels) {
		PADDING *= 1.25;
		TEXT_PADDING *= 1.25;
	}
	let cssClasses = getNodeClasses(node);
	if (!cssClasses) cssClasses = "node default";
	const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
	const nameBBox = await addText(shapeSvg, node.label ?? "", config, 0, 0, ["name"], labelStyles);
	nameBBox.height += TEXT_PADDING;
	let yOffset = 0;
	const yOffsets = [];
	const rows = [];
	let maxTypeWidth = 0;
	let maxNameWidth = 0;
	let maxKeysWidth = 0;
	let maxCommentWidth = 0;
	let keysPresent = true;
	let commentPresent = true;
	for (const attribute of entityNode.attributes) {
		const typeBBox = await addText(shapeSvg, attribute.type, config, 0, yOffset, ["attribute-type"], labelStyles);
		maxTypeWidth = Math.max(maxTypeWidth, typeBBox.width + PADDING);
		const nameBBox2 = await addText(shapeSvg, attribute.name, config, 0, yOffset, ["attribute-name"], labelStyles);
		maxNameWidth = Math.max(maxNameWidth, nameBBox2.width + PADDING);
		const keysBBox = await addText(shapeSvg, attribute.keys.join(), config, 0, yOffset, ["attribute-keys"], labelStyles);
		maxKeysWidth = Math.max(maxKeysWidth, keysBBox.width + PADDING);
		const commentBBox = await addText(shapeSvg, attribute.comment, config, 0, yOffset, ["attribute-comment"], labelStyles);
		maxCommentWidth = Math.max(maxCommentWidth, commentBBox.width + PADDING);
		const rowHeight = Math.max(typeBBox.height, nameBBox2.height, keysBBox.height, commentBBox.height) + TEXT_PADDING;
		rows.push({
			yOffset,
			rowHeight
		});
		yOffset += rowHeight;
	}
	let totalWidthSections = 4;
	if (maxKeysWidth <= PADDING) {
		keysPresent = false;
		maxKeysWidth = 0;
		totalWidthSections--;
	}
	if (maxCommentWidth <= PADDING) {
		commentPresent = false;
		maxCommentWidth = 0;
		totalWidthSections--;
	}
	const shapeBBox = shapeSvg.node().getBBox();
	if (nameBBox.width + PADDING * 2 - (maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth) > 0) {
		const difference = nameBBox.width + PADDING * 2 - (maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth);
		maxTypeWidth += difference / totalWidthSections;
		maxNameWidth += difference / totalWidthSections;
		if (maxKeysWidth > 0) maxKeysWidth += difference / totalWidthSections;
		if (maxCommentWidth > 0) maxCommentWidth += difference / totalWidthSections;
	}
	const maxWidth = maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	let totalShapeBBoxHeight = 0;
	if (rows.length > 0) totalShapeBBoxHeight = rows.reduce((sum, row) => sum + (row?.rowHeight ?? 0), 0);
	const w$1 = Math.max(shapeBBox.width + PADDING * 2, node?.width || 0, maxWidth);
	const h$1 = Math.max((totalShapeBBoxHeight ?? 0) + nameBBox.height, node?.height || 0);
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	shapeSvg.selectAll("g:not(:first-child)").each((_$1, i$1, nodes) => {
		const text2 = select_default(nodes[i$1]);
		const transform = text2.attr("transform");
		let translateX = 0;
		let translateY = 0;
		if (transform) {
			const regex = RegExp(/translate\(([^,]+),([^)]+)\)/);
			const translate = regex.exec(transform);
			if (translate) {
				translateX = parseFloat(translate[1]);
				translateY = parseFloat(translate[2]);
				if (text2.attr("class").includes("attribute-name")) translateX += maxTypeWidth;
				else if (text2.attr("class").includes("attribute-keys")) translateX += maxTypeWidth + maxNameWidth;
				else if (text2.attr("class").includes("attribute-comment")) translateX += maxTypeWidth + maxNameWidth + maxKeysWidth;
			}
		}
		text2.attr("transform", `translate(${x$1 + PADDING / 2 + translateX}, ${translateY + y$1 + nameBBox.height + TEXT_PADDING / 2})`);
	});
	shapeSvg.select(".name").attr("transform", "translate(" + -nameBBox.width / 2 + ", " + (y$1 + TEXT_PADDING / 2) + ")");
	const roughRect = rc.rectangle(x$1, y$1, w$1, h$1, options);
	const rect2 = shapeSvg.insert(() => roughRect, ":first-child").attr("style", cssStyles.join(""));
	const { themeVariables } = getConfig();
	const { rowEven, rowOdd, nodeBorder } = themeVariables;
	yOffsets.push(0);
	for (const [i$1, row] of rows.entries()) {
		const contentRowIndex = i$1 + 1;
		const isEven = contentRowIndex % 2 === 0 && row.yOffset !== 0;
		const roughRect2 = rc.rectangle(x$1, nameBBox.height + y$1 + row?.yOffset, w$1, row?.rowHeight, {
			...options,
			fill: isEven ? rowEven : rowOdd,
			stroke: nodeBorder
		});
		shapeSvg.insert(() => roughRect2, "g.label").attr("style", cssStyles.join("")).attr("class", `row-rect-${isEven ? "even" : "odd"}`);
	}
	let roughLine = rc.line(x$1, nameBBox.height + y$1, w$1 + x$1, nameBBox.height + y$1, options);
	shapeSvg.insert(() => roughLine).attr("class", "divider");
	roughLine = rc.line(maxTypeWidth + x$1, nameBBox.height + y$1, maxTypeWidth + x$1, h$1 + y$1, options);
	shapeSvg.insert(() => roughLine).attr("class", "divider");
	if (keysPresent) {
		roughLine = rc.line(maxTypeWidth + maxNameWidth + x$1, nameBBox.height + y$1, maxTypeWidth + maxNameWidth + x$1, h$1 + y$1, options);
		shapeSvg.insert(() => roughLine).attr("class", "divider");
	}
	if (commentPresent) {
		roughLine = rc.line(maxTypeWidth + maxNameWidth + maxKeysWidth + x$1, nameBBox.height + y$1, maxTypeWidth + maxNameWidth + maxKeysWidth + x$1, h$1 + y$1, options);
		shapeSvg.insert(() => roughLine).attr("class", "divider");
	}
	for (const yOffset2 of yOffsets) {
		roughLine = rc.line(x$1, nameBBox.height + y$1 + yOffset2, w$1 + x$1, nameBBox.height + y$1 + yOffset2, options);
		shapeSvg.insert(() => roughLine).attr("class", "divider");
	}
	updateNodeBounds(node, rect2);
	if (nodeStyles && node.look !== "handDrawn") {
		const allStyle = nodeStyles.split(";");
		const strokeStyles = allStyle?.filter((e$1) => {
			return e$1.includes("stroke");
		})?.map((s$1) => `${s$1}`).join("; ");
		shapeSvg.selectAll("path").attr("style", strokeStyles ?? "");
		shapeSvg.selectAll(".row-rect-even path").attr("style", nodeStyles);
	}
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(erBox, "erBox");
async function addText(shapeSvg, labelText, config, translateX = 0, translateY = 0, classes = [], style = "") {
	const label = shapeSvg.insert("g").attr("class", `label ${classes.join(" ")}`).attr("transform", `translate(${translateX}, ${translateY})`).attr("style", style);
	if (labelText !== parseGenericTypes(labelText)) {
		labelText = parseGenericTypes(labelText);
		labelText = labelText.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
	}
	const text2 = label.node().appendChild(await createText(label, labelText, {
		width: calculateTextWidth(labelText, config) + 100,
		style,
		useHtmlLabels: config.htmlLabels
	}, config));
	if (labelText.includes("&lt;") || labelText.includes("&gt;")) {
		let child = text2.children[0];
		child.textContent = child.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
		while (child.childNodes[0]) {
			child = child.childNodes[0];
			child.textContent = child.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
		}
	}
	let bbox = text2.getBBox();
	if (evaluate(config.htmlLabels)) {
		const div = text2.children[0];
		div.style.textAlign = "start";
		const dv = select_default(text2);
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	return bbox;
}
__name(addText, "addText");
async function textHelper(parent, node, config, useHtmlLabels, GAP = config.class.padding ?? 12) {
	const TEXT_PADDING = !useHtmlLabels ? 3 : 0;
	const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId || node.id);
	let annotationGroup = null;
	let labelGroup = null;
	let membersGroup = null;
	let methodsGroup = null;
	let annotationGroupHeight = 0;
	let labelGroupHeight = 0;
	let membersGroupHeight = 0;
	annotationGroup = shapeSvg.insert("g").attr("class", "annotation-group text");
	if (node.annotations.length > 0) {
		const annotation = node.annotations[0];
		await addText2(annotationGroup, { text: `\xAB${annotation}\xBB` }, 0);
		const annotationGroupBBox = annotationGroup.node().getBBox();
		annotationGroupHeight = annotationGroupBBox.height;
	}
	labelGroup = shapeSvg.insert("g").attr("class", "label-group text");
	await addText2(labelGroup, node, 0, ["font-weight: bolder"]);
	const labelGroupBBox = labelGroup.node().getBBox();
	labelGroupHeight = labelGroupBBox.height;
	membersGroup = shapeSvg.insert("g").attr("class", "members-group text");
	let yOffset = 0;
	for (const member of node.members) {
		const height = await addText2(membersGroup, member, yOffset, [member.parseClassifier()]);
		yOffset += height + TEXT_PADDING;
	}
	membersGroupHeight = membersGroup.node().getBBox().height;
	if (membersGroupHeight <= 0) membersGroupHeight = GAP / 2;
	methodsGroup = shapeSvg.insert("g").attr("class", "methods-group text");
	let methodsYOffset = 0;
	for (const method of node.methods) {
		const height = await addText2(methodsGroup, method, methodsYOffset, [method.parseClassifier()]);
		methodsYOffset += height + TEXT_PADDING;
	}
	let bbox = shapeSvg.node().getBBox();
	if (annotationGroup !== null) {
		const annotationGroupBBox = annotationGroup.node().getBBox();
		annotationGroup.attr("transform", `translate(${-annotationGroupBBox.width / 2})`);
	}
	labelGroup.attr("transform", `translate(${-labelGroupBBox.width / 2}, ${annotationGroupHeight})`);
	bbox = shapeSvg.node().getBBox();
	membersGroup.attr("transform", `translate(0, ${annotationGroupHeight + labelGroupHeight + GAP * 2})`);
	bbox = shapeSvg.node().getBBox();
	methodsGroup.attr("transform", `translate(0, ${annotationGroupHeight + labelGroupHeight + (membersGroupHeight ? membersGroupHeight + GAP * 4 : GAP * 2)})`);
	bbox = shapeSvg.node().getBBox();
	return {
		shapeSvg,
		bbox
	};
}
__name(textHelper, "textHelper");
async function addText2(parentGroup, node, yOffset, styles = []) {
	const textEl = parentGroup.insert("g").attr("class", "label").attr("style", styles.join("; "));
	const config = getConfig();
	let useHtmlLabels = "useHtmlLabels" in node ? node.useHtmlLabels : evaluate(config.htmlLabels) ?? true;
	let textContent = "";
	if ("text" in node) textContent = node.text;
	else textContent = node.label;
	if (!useHtmlLabels && textContent.startsWith("\\")) textContent = textContent.substring(1);
	if (hasKatex(textContent)) useHtmlLabels = true;
	const text2 = await createText(textEl, sanitizeText3(decodeEntities(textContent)), {
		width: calculateTextWidth(textContent, config) + 50,
		classes: "markdown-node-label",
		useHtmlLabels
	}, config);
	let bbox;
	let numberOfLines = 1;
	if (!useHtmlLabels) {
		if (styles.includes("font-weight: bolder")) select_default(text2).selectAll("tspan").attr("font-weight", "");
		numberOfLines = text2.children.length;
		const textChild = text2.children[0];
		if (text2.textContent === "" || text2.textContent.includes("&gt")) {
			textChild.textContent = textContent[0] + textContent.substring(1).replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim();
			const preserveSpace = textContent[1] === " ";
			if (preserveSpace) textChild.textContent = textChild.textContent[0] + " " + textChild.textContent.substring(1);
		}
		if (textChild.textContent === "undefined") textChild.textContent = "";
		bbox = text2.getBBox();
	} else {
		const div = text2.children[0];
		const dv = select_default(text2);
		numberOfLines = div.innerHTML.split("<br>").length;
		if (div.innerHTML.includes("</math>")) numberOfLines += div.innerHTML.split("<mrow>").length - 1;
		const images = div.getElementsByTagName("img");
		if (images) {
			const noImgText = textContent.replace(/<img[^>]*>/g, "").trim() === "";
			await Promise.all([...images].map((img) => new Promise((res) => {
				function setupImage() {
					img.style.display = "flex";
					img.style.flexDirection = "column";
					if (noImgText) {
						const bodyFontSize = config.fontSize?.toString() ?? window.getComputedStyle(document.body).fontSize;
						const enlargingFactor = 5;
						const width = parseInt(bodyFontSize, 10) * enlargingFactor + "px";
						img.style.minWidth = width;
						img.style.maxWidth = width;
					} else img.style.width = "100%";
					res(img);
				}
				__name(setupImage, "setupImage");
				setTimeout(() => {
					if (img.complete) setupImage();
				});
				img.addEventListener("error", setupImage);
				img.addEventListener("load", setupImage);
			})));
		}
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	textEl.attr("transform", "translate(0," + (-bbox.height / (2 * numberOfLines) + yOffset) + ")");
	return bbox.height;
}
__name(addText2, "addText");
async function classBox(parent, node) {
	const config = getConfig2();
	const PADDING = config.class.padding ?? 12;
	const GAP = PADDING;
	const useHtmlLabels = node.useHtmlLabels ?? evaluate(config.htmlLabels) ?? true;
	const classNode = node;
	classNode.annotations = classNode.annotations ?? [];
	classNode.members = classNode.members ?? [];
	classNode.methods = classNode.methods ?? [];
	const { shapeSvg, bbox } = await textHelper(parent, node, config, useHtmlLabels, GAP);
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	node.cssStyles = classNode.styles || "";
	const styles = classNode.styles?.join(";") || nodeStyles || "";
	if (!node.cssStyles) node.cssStyles = styles.replaceAll("!important", "").split(";");
	const renderExtraBox = classNode.members.length === 0 && classNode.methods.length === 0 && !config.class?.hideEmptyMembersBox;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const w$1 = bbox.width;
	let h$1 = bbox.height;
	if (classNode.members.length === 0 && classNode.methods.length === 0) h$1 += GAP;
	else if (classNode.members.length > 0 && classNode.methods.length === 0) h$1 += GAP * 2;
	const x$1 = -w$1 / 2;
	const y$1 = -h$1 / 2;
	const roughRect = rc.rectangle(x$1 - PADDING, y$1 - PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0), w$1 + 2 * PADDING, h$1 + 2 * PADDING + (renderExtraBox ? PADDING * 2 : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING : 0), options);
	const rect2 = shapeSvg.insert(() => roughRect, ":first-child");
	rect2.attr("class", "basic label-container");
	const rectBBox = rect2.node().getBBox();
	shapeSvg.selectAll(".text").each((_$1, i$1, nodes) => {
		const text2 = select_default(nodes[i$1]);
		const transform = text2.attr("transform");
		let translateY = 0;
		if (transform) {
			const regex = RegExp(/translate\(([^,]+),([^)]+)\)/);
			const translate = regex.exec(transform);
			if (translate) translateY = parseFloat(translate[2]);
		}
		let newTranslateY = translateY + y$1 + PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0);
		if (!useHtmlLabels) newTranslateY -= 4;
		let newTranslateX = x$1;
		if (text2.attr("class").includes("label-group") || text2.attr("class").includes("annotation-group")) {
			newTranslateX = -text2.node()?.getBBox().width / 2 || 0;
			shapeSvg.selectAll("text").each(function(_2, i2, nodes2) {
				if (window.getComputedStyle(nodes2[i2]).textAnchor === "middle") newTranslateX = 0;
			});
		}
		text2.attr("transform", `translate(${newTranslateX}, ${newTranslateY})`);
	});
	const annotationGroupHeight = shapeSvg.select(".annotation-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
	const labelGroupHeight = shapeSvg.select(".label-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
	const membersGroupHeight = shapeSvg.select(".members-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
	if (classNode.members.length > 0 || classNode.methods.length > 0 || renderExtraBox) {
		const roughLine = rc.line(rectBBox.x, annotationGroupHeight + labelGroupHeight + y$1 + PADDING, rectBBox.x + rectBBox.width, annotationGroupHeight + labelGroupHeight + y$1 + PADDING, options);
		const line = shapeSvg.insert(() => roughLine);
		line.attr("class", "divider").attr("style", styles);
	}
	if (renderExtraBox || classNode.members.length > 0 || classNode.methods.length > 0) {
		const roughLine = rc.line(rectBBox.x, annotationGroupHeight + labelGroupHeight + membersGroupHeight + y$1 + GAP * 2 + PADDING, rectBBox.x + rectBBox.width, annotationGroupHeight + labelGroupHeight + membersGroupHeight + y$1 + PADDING + GAP * 2, options);
		const line = shapeSvg.insert(() => roughLine);
		line.attr("class", "divider").attr("style", styles);
	}
	if (classNode.look !== "handDrawn") shapeSvg.selectAll("path").attr("style", styles);
	rect2.select(":nth-child(2)").attr("style", styles);
	shapeSvg.selectAll(".divider").select("path").attr("style", styles);
	if (node.labelStyle) shapeSvg.selectAll("span").attr("style", node.labelStyle);
	else shapeSvg.selectAll("span").attr("style", styles);
	if (!useHtmlLabels) {
		const colorRegex = RegExp(/color\s*:\s*([^;]*)/);
		const match = colorRegex.exec(styles);
		if (match) {
			const colorStyle = match[0].replace("color", "fill");
			shapeSvg.selectAll("tspan").attr("style", colorStyle);
		} else if (labelStyles) {
			const match2 = colorRegex.exec(labelStyles);
			if (match2) {
				const colorStyle = match2[0].replace("color", "fill");
				shapeSvg.selectAll("tspan").attr("style", colorStyle);
			}
		}
	}
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(classBox, "classBox");
async function requirementBox(parent, node) {
	const { labelStyles, nodeStyles } = styles2String(node);
	node.labelStyle = labelStyles;
	const requirementNode = node;
	const elementNode = node;
	const padding = 20;
	const gap = 20;
	const isRequirementNode = "verifyMethod" in node;
	const classes = getNodeClasses(node);
	const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId ?? node.id);
	let typeHeight;
	if (isRequirementNode) typeHeight = await addText3(shapeSvg, `&lt;&lt;${requirementNode.type}&gt;&gt;`, 0, node.labelStyle);
	else typeHeight = await addText3(shapeSvg, "&lt;&lt;Element&gt;&gt;", 0, node.labelStyle);
	let accumulativeHeight = typeHeight;
	const nameHeight = await addText3(shapeSvg, requirementNode.name, accumulativeHeight, node.labelStyle + "; font-weight: bold;");
	accumulativeHeight += nameHeight + gap;
	if (isRequirementNode) {
		const idHeight = await addText3(shapeSvg, `${requirementNode.requirementId ? `ID: ${requirementNode.requirementId}` : ""}`, accumulativeHeight, node.labelStyle);
		accumulativeHeight += idHeight;
		const textHeight = await addText3(shapeSvg, `${requirementNode.text ? `Text: ${requirementNode.text}` : ""}`, accumulativeHeight, node.labelStyle);
		accumulativeHeight += textHeight;
		const riskHeight = await addText3(shapeSvg, `${requirementNode.risk ? `Risk: ${requirementNode.risk}` : ""}`, accumulativeHeight, node.labelStyle);
		accumulativeHeight += riskHeight;
		await addText3(shapeSvg, `${requirementNode.verifyMethod ? `Verification: ${requirementNode.verifyMethod}` : ""}`, accumulativeHeight, node.labelStyle);
	} else {
		const typeHeight2 = await addText3(shapeSvg, `${elementNode.type ? `Type: ${elementNode.type}` : ""}`, accumulativeHeight, node.labelStyle);
		accumulativeHeight += typeHeight2;
		await addText3(shapeSvg, `${elementNode.docRef ? `Doc Ref: ${elementNode.docRef}` : ""}`, accumulativeHeight, node.labelStyle);
	}
	const totalWidth = (shapeSvg.node()?.getBBox().width ?? 200) + padding;
	const totalHeight = (shapeSvg.node()?.getBBox().height ?? 200) + padding;
	const x$1 = -totalWidth / 2;
	const y$1 = -totalHeight / 2;
	const rc = at.svg(shapeSvg);
	const options = userNodeOverrides(node, {});
	if (node.look !== "handDrawn") {
		options.roughness = 0;
		options.fillStyle = "solid";
	}
	const roughRect = rc.rectangle(x$1, y$1, totalWidth, totalHeight, options);
	const rect2 = shapeSvg.insert(() => roughRect, ":first-child");
	rect2.attr("class", "basic label-container").attr("style", nodeStyles);
	shapeSvg.selectAll(".label").each((_$1, i$1, nodes) => {
		const text2 = select_default(nodes[i$1]);
		const transform = text2.attr("transform");
		let translateX = 0;
		let translateY = 0;
		if (transform) {
			const regex = RegExp(/translate\(([^,]+),([^)]+)\)/);
			const translate = regex.exec(transform);
			if (translate) {
				translateX = parseFloat(translate[1]);
				translateY = parseFloat(translate[2]);
			}
		}
		const newTranslateY = translateY - totalHeight / 2;
		let newTranslateX = x$1 + padding / 2;
		if (i$1 === 0 || i$1 === 1) newTranslateX = translateX;
		text2.attr("transform", `translate(${newTranslateX}, ${newTranslateY + padding})`);
	});
	if (accumulativeHeight > typeHeight + nameHeight + gap) {
		const roughLine = rc.line(x$1, y$1 + typeHeight + nameHeight + gap, x$1 + totalWidth, y$1 + typeHeight + nameHeight + gap, options);
		const dividerLine = shapeSvg.insert(() => roughLine);
		dividerLine.attr("style", nodeStyles);
	}
	updateNodeBounds(node, rect2);
	node.intersect = function(point) {
		return intersect_default.rect(node, point);
	};
	return shapeSvg;
}
__name(requirementBox, "requirementBox");
async function addText3(parentGroup, inputText, yOffset, style = "") {
	if (inputText === "") return 0;
	const textEl = parentGroup.insert("g").attr("class", "label").attr("style", style);
	const config = getConfig2();
	const useHtmlLabels = config.htmlLabels ?? true;
	const text2 = await createText(textEl, sanitizeText3(decodeEntities(inputText)), {
		width: calculateTextWidth(inputText, config) + 50,
		classes: "markdown-node-label",
		useHtmlLabels,
		style
	}, config);
	let bbox;
	if (!useHtmlLabels) {
		const textChild = text2.children[0];
		for (const child of textChild.children) {
			child.textContent = child.textContent.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
			if (style) child.setAttribute("style", style);
		}
		bbox = text2.getBBox();
		bbox.height += 6;
	} else {
		const div = text2.children[0];
		const dv = select_default(text2);
		bbox = div.getBoundingClientRect();
		dv.attr("width", bbox.width);
		dv.attr("height", bbox.height);
	}
	textEl.attr("transform", `translate(${-bbox.width / 2},${-bbox.height / 2 + yOffset})`);
	return bbox.height;
}
__name(addText3, "addText");
var colorFromPriority = /* @__PURE__ */ __name((priority) => {
	switch (priority) {
		case "Very High": return "red";
		case "High": return "orange";
		case "Medium": return null;
		case "Low": return "blue";
		case "Very Low": return "lightblue";
	}
}, "colorFromPriority");
async function kanbanItem(parent, kanbanNode, { config }) {
	const { labelStyles, nodeStyles } = styles2String(kanbanNode);
	kanbanNode.labelStyle = labelStyles || "";
	const labelPaddingX = 10;
	const orgWidth = kanbanNode.width;
	kanbanNode.width = (kanbanNode.width ?? 200) - 10;
	const { shapeSvg, bbox, label: labelElTitle } = await labelHelper(parent, kanbanNode, getNodeClasses(kanbanNode));
	const padding = kanbanNode.padding || 10;
	let ticketUrl = "";
	let link;
	if ("ticket" in kanbanNode && kanbanNode.ticket && config?.kanban?.ticketBaseUrl) {
		ticketUrl = config?.kanban?.ticketBaseUrl.replace("#TICKET#", kanbanNode.ticket);
		link = shapeSvg.insert("svg:a", ":first-child").attr("class", "kanban-ticket-link").attr("xlink:href", ticketUrl).attr("target", "_blank");
	}
	const options = {
		useHtmlLabels: kanbanNode.useHtmlLabels,
		labelStyle: kanbanNode.labelStyle || "",
		width: kanbanNode.width,
		img: kanbanNode.img,
		padding: kanbanNode.padding || 8,
		centerLabel: false
	};
	let labelEl, bbox2;
	if (link) ({label: labelEl, bbox: bbox2} = await insertLabel(link, "ticket" in kanbanNode && kanbanNode.ticket || "", options));
	else ({label: labelEl, bbox: bbox2} = await insertLabel(shapeSvg, "ticket" in kanbanNode && kanbanNode.ticket || "", options));
	const { label: labelElAssigned, bbox: bboxAssigned } = await insertLabel(shapeSvg, "assigned" in kanbanNode && kanbanNode.assigned || "", options);
	kanbanNode.width = orgWidth;
	const labelPaddingY = 10;
	const totalWidth = kanbanNode?.width || 0;
	const heightAdj = Math.max(bbox2.height, bboxAssigned.height) / 2;
	const totalHeight = Math.max(bbox.height + labelPaddingY * 2, kanbanNode?.height || 0) + heightAdj;
	const x$1 = -totalWidth / 2;
	const y$1 = -totalHeight / 2;
	labelElTitle.attr("transform", "translate(" + (padding - totalWidth / 2) + ", " + (-heightAdj - bbox.height / 2) + ")");
	labelEl.attr("transform", "translate(" + (padding - totalWidth / 2) + ", " + (-heightAdj + bbox.height / 2) + ")");
	labelElAssigned.attr("transform", "translate(" + (padding + totalWidth / 2 - bboxAssigned.width - 2 * labelPaddingX) + ", " + (-heightAdj + bbox.height / 2) + ")");
	let rect2;
	const { rx, ry } = kanbanNode;
	const { cssStyles } = kanbanNode;
	if (kanbanNode.look === "handDrawn") {
		const rc = at.svg(shapeSvg);
		const options2 = userNodeOverrides(kanbanNode, {});
		const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x$1, y$1, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x$1, y$1, totalWidth, totalHeight, options2);
		rect2 = shapeSvg.insert(() => roughNode, ":first-child");
		rect2.attr("class", "basic label-container").attr("style", cssStyles ? cssStyles : null);
	} else {
		rect2 = shapeSvg.insert("rect", ":first-child");
		rect2.attr("class", "basic label-container __APA__").attr("style", nodeStyles).attr("rx", rx ?? 5).attr("ry", ry ?? 5).attr("x", x$1).attr("y", y$1).attr("width", totalWidth).attr("height", totalHeight);
		const priority = "priority" in kanbanNode && kanbanNode.priority;
		if (priority) {
			const line = shapeSvg.append("line");
			const lineX = x$1 + 2;
			const y1 = y$1 + Math.floor((rx ?? 0) / 2);
			const y2 = y$1 + totalHeight - Math.floor((rx ?? 0) / 2);
			line.attr("x1", lineX).attr("y1", y1).attr("x2", lineX).attr("y2", y2).attr("stroke-width", "4").attr("stroke", colorFromPriority(priority));
		}
	}
	updateNodeBounds(kanbanNode, rect2);
	kanbanNode.height = totalHeight;
	kanbanNode.intersect = function(point) {
		return intersect_default.rect(kanbanNode, point);
	};
	return shapeSvg;
}
__name(kanbanItem, "kanbanItem");
var shapesDefs = [
	{
		semanticName: "Process",
		name: "Rectangle",
		shortName: "rect",
		description: "Standard process shape",
		aliases: [
			"proc",
			"process",
			"rectangle"
		],
		internalAliases: ["squareRect"],
		handler: squareRect2
	},
	{
		semanticName: "Event",
		name: "Rounded Rectangle",
		shortName: "rounded",
		description: "Represents an event",
		aliases: ["event"],
		internalAliases: ["roundedRect"],
		handler: roundedRect
	},
	{
		semanticName: "Terminal Point",
		name: "Stadium",
		shortName: "stadium",
		description: "Terminal point",
		aliases: ["terminal", "pill"],
		handler: stadium
	},
	{
		semanticName: "Subprocess",
		name: "Framed Rectangle",
		shortName: "fr-rect",
		description: "Subprocess",
		aliases: [
			"subprocess",
			"subproc",
			"framed-rectangle",
			"subroutine"
		],
		handler: subroutine
	},
	{
		semanticName: "Database",
		name: "Cylinder",
		shortName: "cyl",
		description: "Database storage",
		aliases: [
			"db",
			"database",
			"cylinder"
		],
		handler: cylinder
	},
	{
		semanticName: "Start",
		name: "Circle",
		shortName: "circle",
		description: "Starting point",
		aliases: ["circ"],
		handler: circle
	},
	{
		semanticName: "Decision",
		name: "Diamond",
		shortName: "diam",
		description: "Decision-making step",
		aliases: [
			"decision",
			"diamond",
			"question"
		],
		handler: question
	},
	{
		semanticName: "Prepare Conditional",
		name: "Hexagon",
		shortName: "hex",
		description: "Preparation or condition step",
		aliases: ["hexagon", "prepare"],
		handler: hexagon
	},
	{
		semanticName: "Data Input/Output",
		name: "Lean Right",
		shortName: "lean-r",
		description: "Represents input or output",
		aliases: ["lean-right", "in-out"],
		internalAliases: ["lean_right"],
		handler: lean_right
	},
	{
		semanticName: "Data Input/Output",
		name: "Lean Left",
		shortName: "lean-l",
		description: "Represents output or input",
		aliases: ["lean-left", "out-in"],
		internalAliases: ["lean_left"],
		handler: lean_left
	},
	{
		semanticName: "Priority Action",
		name: "Trapezoid Base Bottom",
		shortName: "trap-b",
		description: "Priority action",
		aliases: [
			"priority",
			"trapezoid-bottom",
			"trapezoid"
		],
		handler: trapezoid
	},
	{
		semanticName: "Manual Operation",
		name: "Trapezoid Base Top",
		shortName: "trap-t",
		description: "Represents a manual task",
		aliases: [
			"manual",
			"trapezoid-top",
			"inv-trapezoid"
		],
		internalAliases: ["inv_trapezoid"],
		handler: inv_trapezoid
	},
	{
		semanticName: "Stop",
		name: "Double Circle",
		shortName: "dbl-circ",
		description: "Represents a stop point",
		aliases: ["double-circle"],
		internalAliases: ["doublecircle"],
		handler: doublecircle
	},
	{
		semanticName: "Text Block",
		name: "Text Block",
		shortName: "text",
		description: "Text block",
		handler: text
	},
	{
		semanticName: "Card",
		name: "Notched Rectangle",
		shortName: "notch-rect",
		description: "Represents a card",
		aliases: ["card", "notched-rectangle"],
		handler: card
	},
	{
		semanticName: "Lined/Shaded Process",
		name: "Lined Rectangle",
		shortName: "lin-rect",
		description: "Lined process shape",
		aliases: [
			"lined-rectangle",
			"lined-process",
			"lin-proc",
			"shaded-process"
		],
		handler: shadedProcess
	},
	{
		semanticName: "Start",
		name: "Small Circle",
		shortName: "sm-circ",
		description: "Small starting point",
		aliases: ["start", "small-circle"],
		internalAliases: ["stateStart"],
		handler: stateStart
	},
	{
		semanticName: "Stop",
		name: "Framed Circle",
		shortName: "fr-circ",
		description: "Stop point",
		aliases: ["stop", "framed-circle"],
		internalAliases: ["stateEnd"],
		handler: stateEnd
	},
	{
		semanticName: "Fork/Join",
		name: "Filled Rectangle",
		shortName: "fork",
		description: "Fork or join in process flow",
		aliases: ["join"],
		internalAliases: ["forkJoin"],
		handler: forkJoin
	},
	{
		semanticName: "Collate",
		name: "Hourglass",
		shortName: "hourglass",
		description: "Represents a collate operation",
		aliases: ["hourglass", "collate"],
		handler: hourglass
	},
	{
		semanticName: "Comment",
		name: "Curly Brace",
		shortName: "brace",
		description: "Adds a comment",
		aliases: ["comment", "brace-l"],
		handler: curlyBraceLeft
	},
	{
		semanticName: "Comment Right",
		name: "Curly Brace",
		shortName: "brace-r",
		description: "Adds a comment",
		handler: curlyBraceRight
	},
	{
		semanticName: "Comment with braces on both sides",
		name: "Curly Braces",
		shortName: "braces",
		description: "Adds a comment",
		handler: curlyBraces
	},
	{
		semanticName: "Com Link",
		name: "Lightning Bolt",
		shortName: "bolt",
		description: "Communication link",
		aliases: ["com-link", "lightning-bolt"],
		handler: lightningBolt
	},
	{
		semanticName: "Document",
		name: "Document",
		shortName: "doc",
		description: "Represents a document",
		aliases: ["doc", "document"],
		handler: waveEdgedRectangle
	},
	{
		semanticName: "Delay",
		name: "Half-Rounded Rectangle",
		shortName: "delay",
		description: "Represents a delay",
		aliases: ["half-rounded-rectangle"],
		handler: halfRoundedRectangle
	},
	{
		semanticName: "Direct Access Storage",
		name: "Horizontal Cylinder",
		shortName: "h-cyl",
		description: "Direct access storage",
		aliases: ["das", "horizontal-cylinder"],
		handler: tiltedCylinder
	},
	{
		semanticName: "Disk Storage",
		name: "Lined Cylinder",
		shortName: "lin-cyl",
		description: "Disk storage",
		aliases: ["disk", "lined-cylinder"],
		handler: linedCylinder
	},
	{
		semanticName: "Display",
		name: "Curved Trapezoid",
		shortName: "curv-trap",
		description: "Represents a display",
		aliases: ["curved-trapezoid", "display"],
		handler: curvedTrapezoid
	},
	{
		semanticName: "Divided Process",
		name: "Divided Rectangle",
		shortName: "div-rect",
		description: "Divided process shape",
		aliases: [
			"div-proc",
			"divided-rectangle",
			"divided-process"
		],
		handler: dividedRectangle
	},
	{
		semanticName: "Extract",
		name: "Triangle",
		shortName: "tri",
		description: "Extraction process",
		aliases: ["extract", "triangle"],
		handler: triangle
	},
	{
		semanticName: "Internal Storage",
		name: "Window Pane",
		shortName: "win-pane",
		description: "Internal storage",
		aliases: ["internal-storage", "window-pane"],
		handler: windowPane
	},
	{
		semanticName: "Junction",
		name: "Filled Circle",
		shortName: "f-circ",
		description: "Junction point",
		aliases: ["junction", "filled-circle"],
		handler: filledCircle
	},
	{
		semanticName: "Loop Limit",
		name: "Trapezoidal Pentagon",
		shortName: "notch-pent",
		description: "Loop limit step",
		aliases: ["loop-limit", "notched-pentagon"],
		handler: trapezoidalPentagon
	},
	{
		semanticName: "Manual File",
		name: "Flipped Triangle",
		shortName: "flip-tri",
		description: "Manual file operation",
		aliases: ["manual-file", "flipped-triangle"],
		handler: flippedTriangle
	},
	{
		semanticName: "Manual Input",
		name: "Sloped Rectangle",
		shortName: "sl-rect",
		description: "Manual input step",
		aliases: ["manual-input", "sloped-rectangle"],
		handler: slopedRect
	},
	{
		semanticName: "Multi-Document",
		name: "Stacked Document",
		shortName: "docs",
		description: "Multiple documents",
		aliases: [
			"documents",
			"st-doc",
			"stacked-document"
		],
		handler: multiWaveEdgedRectangle
	},
	{
		semanticName: "Multi-Process",
		name: "Stacked Rectangle",
		shortName: "st-rect",
		description: "Multiple processes",
		aliases: [
			"procs",
			"processes",
			"stacked-rectangle"
		],
		handler: multiRect
	},
	{
		semanticName: "Stored Data",
		name: "Bow Tie Rectangle",
		shortName: "bow-rect",
		description: "Stored data",
		aliases: ["stored-data", "bow-tie-rectangle"],
		handler: bowTieRect
	},
	{
		semanticName: "Summary",
		name: "Crossed Circle",
		shortName: "cross-circ",
		description: "Summary",
		aliases: ["summary", "crossed-circle"],
		handler: crossedCircle
	},
	{
		semanticName: "Tagged Document",
		name: "Tagged Document",
		shortName: "tag-doc",
		description: "Tagged document",
		aliases: ["tag-doc", "tagged-document"],
		handler: taggedWaveEdgedRectangle
	},
	{
		semanticName: "Tagged Process",
		name: "Tagged Rectangle",
		shortName: "tag-rect",
		description: "Tagged process",
		aliases: [
			"tagged-rectangle",
			"tag-proc",
			"tagged-process"
		],
		handler: taggedRect
	},
	{
		semanticName: "Paper Tape",
		name: "Flag",
		shortName: "flag",
		description: "Paper tape",
		aliases: ["paper-tape"],
		handler: waveRectangle
	},
	{
		semanticName: "Odd",
		name: "Odd",
		shortName: "odd",
		description: "Odd shape",
		internalAliases: ["rect_left_inv_arrow"],
		handler: rect_left_inv_arrow
	},
	{
		semanticName: "Lined Document",
		name: "Lined Document",
		shortName: "lin-doc",
		description: "Lined document",
		aliases: ["lined-document"],
		handler: linedWaveEdgedRect
	}
];
var generateShapeMap = /* @__PURE__ */ __name(() => {
	const undocumentedShapes = {
		state,
		choice,
		note,
		rectWithTitle,
		labelRect,
		iconSquare,
		iconCircle,
		icon,
		iconRounded,
		imageSquare,
		anchor,
		kanbanItem,
		classBox,
		erBox,
		requirementBox
	};
	const entries = [...Object.entries(undocumentedShapes), ...shapesDefs.flatMap((shape) => {
		const aliases = [
			shape.shortName,
			..."aliases" in shape ? shape.aliases : [],
			..."internalAliases" in shape ? shape.internalAliases : []
		];
		return aliases.map((alias) => [alias, shape.handler]);
	})];
	return Object.fromEntries(entries);
}, "generateShapeMap");
var shapes2 = generateShapeMap();
function isValidShape(shape) {
	return shape in shapes2;
}
__name(isValidShape, "isValidShape");
var nodeElems = /* @__PURE__ */ new Map();
async function insertNode(elem, node, renderOptions) {
	let newEl;
	let el;
	if (node.shape === "rect") if (node.rx && node.ry) node.shape = "roundedRect";
	else node.shape = "squareRect";
	const shapeHandler = node.shape ? shapes2[node.shape] : void 0;
	if (!shapeHandler) throw new Error(`No such shape: ${node.shape}. Please check your syntax.`);
	if (node.link) {
		let target;
		if (renderOptions.config.securityLevel === "sandbox") target = "_top";
		else if (node.linkTarget) target = node.linkTarget || "_blank";
		newEl = elem.insert("svg:a").attr("xlink:href", node.link).attr("target", target ?? null);
		el = await shapeHandler(newEl, node, renderOptions);
	} else {
		el = await shapeHandler(elem, node, renderOptions);
		newEl = el;
	}
	if (node.tooltip) el.attr("title", node.tooltip);
	nodeElems.set(node.id, newEl);
	if (node.haveCallback) newEl.attr("class", newEl.attr("class") + " clickable");
	return newEl;
}
__name(insertNode, "insertNode");
var setNodeElem = /* @__PURE__ */ __name((elem, node) => {
	nodeElems.set(node.id, elem);
}, "setNodeElem");
var clear2 = /* @__PURE__ */ __name(() => {
	nodeElems.clear();
}, "clear");
var positionNode = /* @__PURE__ */ __name((node) => {
	const el = nodeElems.get(node.id);
	log.trace("Transforming node", node.diff, node, "translate(" + (node.x - node.width / 2 - 5) + ", " + node.width / 2 + ")");
	const padding = 8;
	const diff = node.diff || 0;
	if (node.clusterNode) el.attr("transform", "translate(" + (node.x + diff - node.width / 2) + ", " + (node.y - node.height / 2 - padding) + ")");
	else el.attr("transform", "translate(" + node.x + ", " + node.y + ")");
	return diff;
}, "positionNode");
export { clear as b, clear2 as c, createLabel_default as d, insertCluster as e, insertNode as f, isValidShape as g, labelHelper as h, positionNode as i, setNodeElem as j, updateNodeBounds as k, at as l };
