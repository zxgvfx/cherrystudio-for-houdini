import { w as select_default } from "./src-CVa4gIVB.js";
import { C as isFunction_default, D as _root_default, O as eq_default, T as _baseGetTag_default, _ as _Uint8Array_default, a as _overArg_default, c as isTypedArray_default, f as _isIndex_default, g as isArray_default, h as isObjectLike_default, i as isArrayLike_default, m as isArguments_default, n as identity_default, o as _isPrototype_default, p as isBuffer_default, r as memoize_default, s as _arrayLikeKeys_default, t as _baseFor_default, v as _Stack_default, w as isObject_default, x as _getNative_default } from "./_baseFor-DopXmZGg.js";
import { n as __name, r as log } from "./src-BfEXwqas.js";
import { F as sanitizeDirective, f as detectType, m as directiveRegex, r as assignWithDepth_default, s as common_default } from "./chunk-ABZYJK2D-yCGHmLnA.js";
import { o as epsilon } from "./math-HYWoavDF.js";
import { t as require_dist } from "./dist-ZQpw1vMj.js";
function Linear(context) {
	this._context = context;
}
Linear.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1: this._point = 2;
			default:
				this._context.lineTo(x, y);
				break;
		}
	}
};
function linear_default(context) {
	return new Linear(context);
}
var Bump = class {
	constructor(context, x) {
		this._context = context;
		this._x = x;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	}
	point(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				if (this._line) this._context.lineTo(x, y);
				else this._context.moveTo(x, y);
				break;
			case 1: this._point = 2;
			default:
				if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
				else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
				break;
		}
		this._x0 = x, this._y0 = y;
	}
};
function bumpX(context) {
	return new Bump(context, true);
}
function bumpY(context) {
	return new Bump(context, false);
}
function noop_default() {}
function point$3(that, x, y) {
	that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}
function Basis(context) {
	this._context = context;
}
Basis.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: point$3(this, this._x1, this._y1);
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default:
				point$3(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
	}
};
function basis_default(context) {
	return new Basis(context);
}
function BasisClosed(context) {
	this._context = context;
}
BasisClosed.prototype = {
	areaStart: noop_default,
	areaEnd: noop_default,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2);
				this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
				this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
				this._context.closePath();
				break;
			case 3:
				this.point(this._x2, this._y2);
				this.point(this._x3, this._y3);
				this.point(this._x4, this._y4);
				break;
		}
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._x2 = x, this._y2 = y;
				break;
			case 1:
				this._point = 2;
				this._x3 = x, this._y3 = y;
				break;
			case 2:
				this._point = 3;
				this._x4 = x, this._y4 = y;
				this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
				break;
			default:
				point$3(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
	}
};
function basisClosed_default(context) {
	return new BasisClosed(context);
}
function BasisOpen(context) {
	this._context = context;
}
BasisOpen.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6;
				this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
				break;
			case 3: this._point = 4;
			default:
				point$3(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
	}
};
function basisOpen_default(context) {
	return new BasisOpen(context);
}
function Bundle(context, beta) {
	this._basis = new Basis(context);
	this._beta = beta;
}
Bundle.prototype = {
	lineStart: function() {
		this._x = [];
		this._y = [];
		this._basis.lineStart();
	},
	lineEnd: function() {
		var x = this._x, y = this._y, j = x.length - 1;
		if (j > 0) {
			var x0 = x[0], y0 = y[0], dx = x[j] - x0, dy = y[j] - y0, i = -1, t;
			while (++i <= j) {
				t = i / j;
				this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
			}
		}
		this._x = this._y = null;
		this._basis.lineEnd();
	},
	point: function(x, y) {
		this._x.push(+x);
		this._y.push(+y);
	}
};
var bundle_default = (function custom(beta) {
	function bundle(context) {
		return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	}
	bundle.beta = function(beta$1) {
		return custom(+beta$1);
	};
	return bundle;
})(.85);
function point$2(that, x, y) {
	that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}
function Cardinal(context, tension) {
	this._context = context;
	this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				point$2(this, this._x1, this._y1);
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				this._x1 = x, this._y1 = y;
				break;
			case 2: this._point = 3;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var cardinal_default = (function custom(tension) {
	function cardinal(context) {
		return new Cardinal(context, tension);
	}
	cardinal.tension = function(tension$1) {
		return custom(+tension$1);
	};
	return cardinal;
})(0);
function CardinalClosed(context, tension) {
	this._context = context;
	this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
	areaStart: noop_default,
	areaEnd: noop_default,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 3:
				this.point(this._x3, this._y3);
				this.point(this._x4, this._y4);
				this.point(this._x5, this._y5);
				break;
		}
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._x3 = x, this._y3 = y;
				break;
			case 1:
				this._point = 2;
				this._context.moveTo(this._x4 = x, this._y4 = y);
				break;
			case 2:
				this._point = 3;
				this._x5 = x, this._y5 = y;
				break;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var cardinalClosed_default = (function custom(tension) {
	function cardinal(context) {
		return new CardinalClosed(context, tension);
	}
	cardinal.tension = function(tension$1) {
		return custom(+tension$1);
	};
	return cardinal;
})(0);
function CardinalOpen(context, tension) {
	this._context = context;
	this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3: this._point = 4;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var cardinalOpen_default = (function custom(tension) {
	function cardinal(context) {
		return new CardinalOpen(context, tension);
	}
	cardinal.tension = function(tension$1) {
		return custom(+tension$1);
	};
	return cardinal;
})(0);
function point$1(that, x, y) {
	var x1 = that._x1, y1 = that._y1, x2 = that._x2, y2 = that._y2;
	if (that._l01_a > 1e-12) {
		var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
		x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
		y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	}
	if (that._l23_a > 1e-12) {
		var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
		x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
		y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	}
	that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
	this._context = context;
	this._alpha = alpha;
}
CatmullRom.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				this.point(this._x2, this._y2);
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) {
			var x23 = this._x2 - x, y23 = this._y2 - y;
			this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3;
			default:
				point$1(this, x, y);
				break;
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a;
		this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var catmullRom_default = (function custom(alpha) {
	function catmullRom(context) {
		return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	}
	catmullRom.alpha = function(alpha$1) {
		return custom(+alpha$1);
	};
	return catmullRom;
})(.5);
function CatmullRomClosed(context, alpha) {
	this._context = context;
	this._alpha = alpha;
}
CatmullRomClosed.prototype = {
	areaStart: noop_default,
	areaEnd: noop_default,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
		this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 3:
				this.point(this._x3, this._y3);
				this.point(this._x4, this._y4);
				this.point(this._x5, this._y5);
				break;
		}
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) {
			var x23 = this._x2 - x, y23 = this._y2 - y;
			this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				this._x3 = x, this._y3 = y;
				break;
			case 1:
				this._point = 2;
				this._context.moveTo(this._x4 = x, this._y4 = y);
				break;
			case 2:
				this._point = 3;
				this._x5 = x, this._y5 = y;
				break;
			default:
				point$1(this, x, y);
				break;
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a;
		this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var catmullRomClosed_default = (function custom(alpha) {
	function catmullRom(context) {
		return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	}
	catmullRom.alpha = function(alpha$1) {
		return custom(+alpha$1);
	};
	return catmullRom;
})(.5);
function CatmullRomOpen(context, alpha) {
	this._context = context;
	this._alpha = alpha;
}
CatmullRomOpen.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) {
			var x23 = this._x2 - x, y23 = this._y2 - y;
			this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3: this._point = 4;
			default:
				point$1(this, x, y);
				break;
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a;
		this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var catmullRomOpen_default = (function custom(alpha) {
	function catmullRom(context) {
		return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	}
	catmullRom.alpha = function(alpha$1) {
		return custom(+alpha$1);
	};
	return catmullRom;
})(.5);
function LinearClosed(context) {
	this._context = context;
}
LinearClosed.prototype = {
	areaStart: noop_default,
	areaEnd: noop_default,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		if (this._point) this._context.closePath();
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) this._context.lineTo(x, y);
		else this._point = 1, this._context.moveTo(x, y);
	}
};
function linearClosed_default(context) {
	return new LinearClosed(context);
}
function sign(x) {
	return x < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
	var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
	return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), .5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
	var h = that._x1 - that._x0;
	return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point(that, t0, t1) {
	var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
	that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
	this._context = context;
}
MonotoneX.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3:
				point(this, this._t0, slope2(this, this._t0));
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		var t1 = NaN;
		x = +x, y = +y;
		if (x === this._x1 && y === this._y1) return;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				point(this, slope2(this, t1 = slope3(this, x, y)), t1);
				break;
			default:
				point(this, this._t0, t1 = slope3(this, x, y));
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
		this._t0 = t1;
	}
};
function MonotoneY(context) {
	this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	MonotoneX.prototype.point.call(this, y, x);
};
function ReflectContext(context) {
	this._context = context;
}
ReflectContext.prototype = {
	moveTo: function(x, y) {
		this._context.moveTo(y, x);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(x, y) {
		this._context.lineTo(y, x);
	},
	bezierCurveTo: function(x1, y1, x2, y2, x, y) {
		this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
	}
};
function monotoneX(context) {
	return new MonotoneX(context);
}
function monotoneY(context) {
	return new MonotoneY(context);
}
function Natural(context) {
	this._context = context;
}
Natural.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [];
		this._y = [];
	},
	lineEnd: function() {
		var x = this._x, y = this._y, n = x.length;
		if (n) {
			this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
			if (n === 2) this._context.lineTo(x[1], y[1]);
			else {
				var px = controlPoints(x), py = controlPoints(y);
				for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
			}
		}
		if (this._line || this._line !== 0 && n === 1) this._context.closePath();
		this._line = 1 - this._line;
		this._x = this._y = null;
	},
	point: function(x, y) {
		this._x.push(+x);
		this._y.push(+y);
	}
};
function controlPoints(x) {
	var i, n = x.length - 1, m, a = new Array(n), b = new Array(n), r = new Array(n);
	a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	a[n - 1] = r[n - 1] / b[n - 1];
	for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	b[n - 1] = (x[n] + a[n - 1]) / 2;
	for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	return [a, b];
}
function natural_default(context) {
	return new Natural(context);
}
function Step(context, t) {
	this._context = context;
	this._t = t;
}
Step.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1: this._point = 2;
			default:
				if (this._t <= 0) {
					this._context.lineTo(this._x, y);
					this._context.lineTo(x, y);
				} else {
					var x1 = this._x * (1 - this._t) + x * this._t;
					this._context.lineTo(x1, this._y);
					this._context.lineTo(x1, y);
				}
				break;
		}
		this._x = x, this._y = y;
	}
};
function step_default(context) {
	return new Step(context, .5);
}
function stepBefore(context) {
	return new Step(context, 0);
}
function stepAfter(context) {
	return new Step(context, 1);
}
var _defineProperty_default = function() {
	try {
		var func = _getNative_default(Object, "defineProperty");
		func({}, "", {});
		return func;
	} catch (e) {}
}();
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && _defineProperty_default) _defineProperty_default(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
var _baseAssignValue_default = baseAssignValue;
function assignMergeValue(object, key, value) {
	if (value !== void 0 && !eq_default(object[key], value) || value === void 0 && !(key in object)) _baseAssignValue_default(object, key, value);
}
var _assignMergeValue_default = assignMergeValue;
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var Buffer = freeModule && freeModule.exports === freeExports ? _root_default.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
var _cloneBuffer_default = cloneBuffer;
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new _Uint8Array_default(result).set(new _Uint8Array_default(arrayBuffer));
	return result;
}
var _cloneArrayBuffer_default = cloneArrayBuffer;
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? _cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray_default = cloneTypedArray;
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
var _copyArray_default = copyArray;
var objectCreate = Object.create;
var _baseCreate_default = function() {
	function object() {}
	return function(proto) {
		if (!isObject_default(proto)) return {};
		if (objectCreate) return objectCreate(proto);
		object.prototype = proto;
		var result = new object();
		object.prototype = void 0;
		return result;
	};
}();
var _getPrototype_default = _overArg_default(Object.getPrototypeOf, Object);
function initCloneObject(object) {
	return typeof object.constructor == "function" && !_isPrototype_default(object) ? _baseCreate_default(_getPrototype_default(object)) : {};
}
var _initCloneObject_default = initCloneObject;
function isArrayLikeObject(value) {
	return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default = isArrayLikeObject;
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$2 = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
	if (!isObjectLike_default(value) || _baseGetTag_default(value) != objectTag) return false;
	var proto = _getPrototype_default(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_default = isPlainObject;
function safeGet(object, key) {
	if (key === "constructor" && typeof object[key] === "function") return;
	if (key == "__proto__") return;
	return object[key];
}
var _safeGet_default = safeGet;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function assignValue(object, key, value) {
	var objValue = object[key];
	if (!(hasOwnProperty$1.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) _baseAssignValue_default(object, key, value);
}
var _assignValue_default = assignValue;
function copyObject(source, props, object, customizer) {
	var isNew = !object;
	object || (object = {});
	var index = -1, length = props.length;
	while (++index < length) {
		var key = props[index];
		var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
		if (newValue === void 0) newValue = source[key];
		if (isNew) _baseAssignValue_default(object, key, newValue);
		else _assignValue_default(object, key, newValue);
	}
	return object;
}
var _copyObject_default = copyObject;
function nativeKeysIn(object) {
	var result = [];
	if (object != null) for (var key in Object(object)) result.push(key);
	return result;
}
var _nativeKeysIn_default = nativeKeysIn;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function baseKeysIn(object) {
	if (!isObject_default(object)) return _nativeKeysIn_default(object);
	var isProto = _isPrototype_default(object), result = [];
	for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) result.push(key);
	return result;
}
var _baseKeysIn_default = baseKeysIn;
function keysIn(object) {
	return isArrayLike_default(object) ? _arrayLikeKeys_default(object, true) : _baseKeysIn_default(object);
}
var keysIn_default = keysIn;
function toPlainObject(value) {
	return _copyObject_default(value, keysIn_default(value));
}
var toPlainObject_default = toPlainObject;
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	var objValue = _safeGet_default(object, key), srcValue = _safeGet_default(source, key), stacked = stack.get(srcValue);
	if (stacked) {
		_assignMergeValue_default(object, key, stacked);
		return;
	}
	var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
	var isCommon = newValue === void 0;
	if (isCommon) {
		var isArr = isArray_default(srcValue), isBuff = !isArr && isBuffer_default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
		newValue = srcValue;
		if (isArr || isBuff || isTyped) if (isArray_default(objValue)) newValue = objValue;
		else if (isArrayLikeObject_default(objValue)) newValue = _copyArray_default(objValue);
		else if (isBuff) {
			isCommon = false;
			newValue = _cloneBuffer_default(srcValue, true);
		} else if (isTyped) {
			isCommon = false;
			newValue = _cloneTypedArray_default(srcValue, true);
		} else newValue = [];
		else if (isPlainObject_default(srcValue) || isArguments_default(srcValue)) {
			newValue = objValue;
			if (isArguments_default(objValue)) newValue = toPlainObject_default(objValue);
			else if (!isObject_default(objValue) || isFunction_default(objValue)) newValue = _initCloneObject_default(srcValue);
		} else isCommon = false;
	}
	if (isCommon) {
		stack.set(srcValue, newValue);
		mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
		stack["delete"](srcValue);
	}
	_assignMergeValue_default(object, key, newValue);
}
var _baseMergeDeep_default = baseMergeDeep;
function baseMerge(object, source, srcIndex, customizer, stack) {
	if (object === source) return;
	_baseFor_default(source, function(srcValue, key) {
		stack || (stack = new _Stack_default());
		if (isObject_default(srcValue)) _baseMergeDeep_default(object, source, key, srcIndex, baseMerge, customizer, stack);
		else {
			var newValue = customizer ? customizer(_safeGet_default(object, key), srcValue, key + "", object, source, stack) : void 0;
			if (newValue === void 0) newValue = srcValue;
			_assignMergeValue_default(object, key, newValue);
		}
	}, keysIn_default);
}
var _baseMerge_default = baseMerge;
function apply(func, thisArg, args) {
	switch (args.length) {
		case 0: return func.call(thisArg);
		case 1: return func.call(thisArg, args[0]);
		case 2: return func.call(thisArg, args[0], args[1]);
		case 3: return func.call(thisArg, args[0], args[1], args[2]);
	}
	return func.apply(thisArg, args);
}
var _apply_default = apply;
var nativeMax = Math.max;
function overRest(func, start, transform) {
	start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
	return function() {
		var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
		while (++index < length) array[index] = args[start + index];
		index = -1;
		var otherArgs = Array(start + 1);
		while (++index < start) otherArgs[index] = args[index];
		otherArgs[start] = transform(array);
		return _apply_default(func, this, otherArgs);
	};
}
var _overRest_default = overRest;
function constant(value) {
	return function() {
		return value;
	};
}
var constant_default = constant;
var _baseSetToString_default = !_defineProperty_default ? identity_default : function(func, string) {
	return _defineProperty_default(func, "toString", {
		"configurable": true,
		"enumerable": false,
		"value": constant_default(string),
		"writable": true
	});
};
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
	var count = 0, lastCalled = 0;
	return function() {
		var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if (remaining > 0) {
			if (++count >= HOT_COUNT) return arguments[0];
		} else count = 0;
		return func.apply(void 0, arguments);
	};
}
var _setToString_default = shortOut(_baseSetToString_default);
function baseRest(func, start) {
	return _setToString_default(_overRest_default(func, start, identity_default), func + "");
}
var _baseRest_default = baseRest;
function isIterateeCall(value, index, object) {
	if (!isObject_default(object)) return false;
	var type = typeof index;
	if (type == "number" ? isArrayLike_default(object) && _isIndex_default(index, object.length) : type == "string" && index in object) return eq_default(object[index], value);
	return false;
}
var _isIterateeCall_default = isIterateeCall;
function createAssigner(assigner) {
	return _baseRest_default(function(object, sources) {
		var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
		customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
		if (guard && _isIterateeCall_default(sources[0], sources[1], guard)) {
			customizer = length < 3 ? void 0 : customizer;
			length = 1;
		}
		object = Object(object);
		while (++index < length) {
			var source = sources[index];
			if (source) assigner(object, source, index, customizer);
		}
		return object;
	});
}
var merge_default = createAssigner(function(object, source, srcIndex) {
	_baseMerge_default(object, source, srcIndex);
});
var import_dist = require_dist();
var ZERO_WIDTH_SPACE = "​";
var d3CurveTypes = {
	curveBasis: basis_default,
	curveBasisClosed: basisClosed_default,
	curveBasisOpen: basisOpen_default,
	curveBumpX: bumpX,
	curveBumpY: bumpY,
	curveBundle: bundle_default,
	curveCardinalClosed: cardinalClosed_default,
	curveCardinalOpen: cardinalOpen_default,
	curveCardinal: cardinal_default,
	curveCatmullRomClosed: catmullRomClosed_default,
	curveCatmullRomOpen: catmullRomOpen_default,
	curveCatmullRom: catmullRom_default,
	curveLinear: linear_default,
	curveLinearClosed: linearClosed_default,
	curveMonotoneX: monotoneX,
	curveMonotoneY: monotoneY,
	curveNatural: natural_default,
	curveStep: step_default,
	curveStepAfter: stepAfter,
	curveStepBefore: stepBefore
};
var directiveWithoutOpen = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi;
var detectInit = /* @__PURE__ */ __name(function(text, config) {
	const inits = detectDirective(text, /(?:init\b)|(?:initialize\b)/);
	let results = {};
	if (Array.isArray(inits)) {
		const args = inits.map((init) => init.args);
		sanitizeDirective(args);
		results = assignWithDepth_default(results, [...args]);
	} else results = inits.args;
	if (!results) return;
	let type = detectType(text, config);
	const prop = "config";
	if (results[prop] !== void 0) {
		if (type === "flowchart-v2") type = "flowchart";
		results[type] = results[prop];
		delete results[prop];
	}
	return results;
}, "detectInit");
var detectDirective = /* @__PURE__ */ __name(function(text, type = null) {
	try {
		const commentWithoutDirectives = new RegExp(`[%]{2}(?![{]${directiveWithoutOpen.source})(?=[}][%]{2}).*
`, "ig");
		text = text.trim().replace(commentWithoutDirectives, "").replace(/'/gm, "\"");
		log.debug(`Detecting diagram directive${type !== null ? " type:" + type : ""} based on the text:${text}`);
		let match;
		const result = [];
		while ((match = directiveRegex.exec(text)) !== null) {
			if (match.index === directiveRegex.lastIndex) directiveRegex.lastIndex++;
			if (match && !type || type && match[1]?.match(type) || type && match[2]?.match(type)) {
				const type2 = match[1] ? match[1] : match[2];
				const args = match[3] ? match[3].trim() : match[4] ? JSON.parse(match[4].trim()) : null;
				result.push({
					type: type2,
					args
				});
			}
		}
		if (result.length === 0) return {
			type: text,
			args: null
		};
		return result.length === 1 ? result[0] : result;
	} catch (error) {
		log.error(`ERROR: ${error.message} - Unable to parse directive type: '${type}' based on the text: '${text}'`);
		return {
			type: void 0,
			args: null
		};
	}
}, "detectDirective");
var removeDirectives = /* @__PURE__ */ __name(function(text) {
	return text.replace(directiveRegex, "");
}, "removeDirectives");
var isSubstringInArray = /* @__PURE__ */ __name(function(str, arr) {
	for (const [i, element] of arr.entries()) if (element.match(str)) return i;
	return -1;
}, "isSubstringInArray");
function interpolateToCurve(interpolate, defaultCurve) {
	if (!interpolate) return defaultCurve;
	return d3CurveTypes[`curve${interpolate.charAt(0).toUpperCase() + interpolate.slice(1)}`] ?? defaultCurve;
}
__name(interpolateToCurve, "interpolateToCurve");
function formatUrl(linkStr, config) {
	const url = linkStr.trim();
	if (!url) return;
	if (config.securityLevel !== "loose") return (0, import_dist.sanitizeUrl)(url);
	return url;
}
__name(formatUrl, "formatUrl");
var runFunc = /* @__PURE__ */ __name((functionName, ...params) => {
	const arrPaths = functionName.split(".");
	const len = arrPaths.length - 1;
	const fnName = arrPaths[len];
	let obj = window;
	for (let i = 0; i < len; i++) {
		obj = obj[arrPaths[i]];
		if (!obj) {
			log.error(`Function name: ${functionName} not found in window`);
			return;
		}
	}
	obj[fnName](...params);
}, "runFunc");
function distance(p1, p2) {
	if (!p1 || !p2) return 0;
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
__name(distance, "distance");
function traverseEdge(points) {
	let prevPoint;
	let totalDistance = 0;
	points.forEach((point$4) => {
		totalDistance += distance(point$4, prevPoint);
		prevPoint = point$4;
	});
	return calculatePoint(points, totalDistance / 2);
}
__name(traverseEdge, "traverseEdge");
function calcLabelPosition(points) {
	if (points.length === 1) return points[0];
	return traverseEdge(points);
}
__name(calcLabelPosition, "calcLabelPosition");
var roundNumber = /* @__PURE__ */ __name((num, precision = 2) => {
	const factor = Math.pow(10, precision);
	return Math.round(num * factor) / factor;
}, "roundNumber");
var calculatePoint = /* @__PURE__ */ __name((points, distanceToTraverse) => {
	let prevPoint = void 0;
	let remainingDistance = distanceToTraverse;
	for (const point$4 of points) {
		if (prevPoint) {
			const vectorDistance = distance(point$4, prevPoint);
			if (vectorDistance === 0) return prevPoint;
			if (vectorDistance < remainingDistance) remainingDistance -= vectorDistance;
			else {
				const distanceRatio = remainingDistance / vectorDistance;
				if (distanceRatio <= 0) return prevPoint;
				if (distanceRatio >= 1) return {
					x: point$4.x,
					y: point$4.y
				};
				if (distanceRatio > 0 && distanceRatio < 1) return {
					x: roundNumber((1 - distanceRatio) * prevPoint.x + distanceRatio * point$4.x, 5),
					y: roundNumber((1 - distanceRatio) * prevPoint.y + distanceRatio * point$4.y, 5)
				};
			}
		}
		prevPoint = point$4;
	}
	throw new Error("Could not find a suitable point for the given distance");
}, "calculatePoint");
var calcCardinalityPosition = /* @__PURE__ */ __name((isRelationTypePresent, points, initialPosition) => {
	log.info(`our points ${JSON.stringify(points)}`);
	if (points[0] !== initialPosition) points = points.reverse();
	const center = calculatePoint(points, 25);
	const d = isRelationTypePresent ? 10 : 5;
	const angle = Math.atan2(points[0].y - center.y, points[0].x - center.x);
	const cardinalityPosition = {
		x: 0,
		y: 0
	};
	cardinalityPosition.x = Math.sin(angle) * d + (points[0].x + center.x) / 2;
	cardinalityPosition.y = -Math.cos(angle) * d + (points[0].y + center.y) / 2;
	return cardinalityPosition;
}, "calcCardinalityPosition");
function calcTerminalLabelPosition(terminalMarkerSize, position, _points) {
	const points = structuredClone(_points);
	log.info("our points", points);
	if (position !== "start_left" && position !== "start_right") points.reverse();
	const center = calculatePoint(points, 25 + terminalMarkerSize);
	const d = 10 + terminalMarkerSize * .5;
	const angle = Math.atan2(points[0].y - center.y, points[0].x - center.x);
	const cardinalityPosition = {
		x: 0,
		y: 0
	};
	if (position === "start_left") {
		cardinalityPosition.x = Math.sin(angle + Math.PI) * d + (points[0].x + center.x) / 2;
		cardinalityPosition.y = -Math.cos(angle + Math.PI) * d + (points[0].y + center.y) / 2;
	} else if (position === "end_right") {
		cardinalityPosition.x = Math.sin(angle - Math.PI) * d + (points[0].x + center.x) / 2 - 5;
		cardinalityPosition.y = -Math.cos(angle - Math.PI) * d + (points[0].y + center.y) / 2 - 5;
	} else if (position === "end_left") {
		cardinalityPosition.x = Math.sin(angle) * d + (points[0].x + center.x) / 2 - 5;
		cardinalityPosition.y = -Math.cos(angle) * d + (points[0].y + center.y) / 2 - 5;
	} else {
		cardinalityPosition.x = Math.sin(angle) * d + (points[0].x + center.x) / 2;
		cardinalityPosition.y = -Math.cos(angle) * d + (points[0].y + center.y) / 2;
	}
	return cardinalityPosition;
}
__name(calcTerminalLabelPosition, "calcTerminalLabelPosition");
function getStylesFromArray(arr) {
	let style = "";
	let labelStyle = "";
	for (const element of arr) if (element !== void 0) if (element.startsWith("color:") || element.startsWith("text-align:")) labelStyle = labelStyle + element + ";";
	else style = style + element + ";";
	return {
		style,
		labelStyle
	};
}
__name(getStylesFromArray, "getStylesFromArray");
var cnt = 0;
var generateId = /* @__PURE__ */ __name(() => {
	cnt++;
	return "id-" + Math.random().toString(36).substr(2, 12) + "-" + cnt;
}, "generateId");
function makeRandomHex(length) {
	let result = "";
	const characters = "0123456789abcdef";
	const charactersLength = 16;
	for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}
__name(makeRandomHex, "makeRandomHex");
var random = /* @__PURE__ */ __name((options) => {
	return makeRandomHex(options.length);
}, "random");
var getTextObj = /* @__PURE__ */ __name(function() {
	return {
		x: 0,
		y: 0,
		fill: void 0,
		anchor: "start",
		style: "#666",
		width: 100,
		height: 100,
		textMargin: 0,
		rx: 0,
		ry: 0,
		valign: void 0,
		text: ""
	};
}, "getTextObj");
var drawSimpleText = /* @__PURE__ */ __name(function(elem, textData) {
	const nText = textData.text.replace(common_default.lineBreakRegex, " ");
	const [, _fontSizePx] = parseFontSize(textData.fontSize);
	const textElem = elem.append("text");
	textElem.attr("x", textData.x);
	textElem.attr("y", textData.y);
	textElem.style("text-anchor", textData.anchor);
	textElem.style("font-family", textData.fontFamily);
	textElem.style("font-size", _fontSizePx);
	textElem.style("font-weight", textData.fontWeight);
	textElem.attr("fill", textData.fill);
	if (textData.class !== void 0) textElem.attr("class", textData.class);
	const span = textElem.append("tspan");
	span.attr("x", textData.x + textData.textMargin * 2);
	span.attr("fill", textData.fill);
	span.text(nText);
	return textElem;
}, "drawSimpleText");
var wrapLabel = memoize_default((label, maxWidth, config) => {
	if (!label) return label;
	config = Object.assign({
		fontSize: 12,
		fontWeight: 400,
		fontFamily: "Arial",
		joinWith: "<br/>"
	}, config);
	if (common_default.lineBreakRegex.test(label)) return label;
	const words = label.split(" ").filter(Boolean);
	const completedLines = [];
	let nextLine = "";
	words.forEach((word, index) => {
		const wordLength = calculateTextWidth(`${word} `, config);
		const nextLineLength = calculateTextWidth(nextLine, config);
		if (wordLength > maxWidth) {
			const { hyphenatedStrings, remainingWord } = breakString(word, maxWidth, "-", config);
			completedLines.push(nextLine, ...hyphenatedStrings);
			nextLine = remainingWord;
		} else if (nextLineLength + wordLength >= maxWidth) {
			completedLines.push(nextLine);
			nextLine = word;
		} else nextLine = [nextLine, word].filter(Boolean).join(" ");
		if (index + 1 === words.length) completedLines.push(nextLine);
	});
	return completedLines.filter((line) => line !== "").join(config.joinWith);
}, (label, maxWidth, config) => `${label}${maxWidth}${config.fontSize}${config.fontWeight}${config.fontFamily}${config.joinWith}`);
var breakString = memoize_default((word, maxWidth, hyphenCharacter = "-", config) => {
	config = Object.assign({
		fontSize: 12,
		fontWeight: 400,
		fontFamily: "Arial",
		margin: 0
	}, config);
	const characters = [...word];
	const lines = [];
	let currentLine = "";
	characters.forEach((character, index) => {
		const nextLine = `${currentLine}${character}`;
		if (calculateTextWidth(nextLine, config) >= maxWidth) {
			const currentCharacter = index + 1;
			const isLastLine = characters.length === currentCharacter;
			const hyphenatedNextLine = `${nextLine}${hyphenCharacter}`;
			lines.push(isLastLine ? nextLine : hyphenatedNextLine);
			currentLine = "";
		} else currentLine = nextLine;
	});
	return {
		hyphenatedStrings: lines,
		remainingWord: currentLine
	};
}, (word, maxWidth, hyphenCharacter = "-", config) => `${word}${maxWidth}${hyphenCharacter}${config.fontSize}${config.fontWeight}${config.fontFamily}`);
function calculateTextHeight(text, config) {
	return calculateTextDimensions(text, config).height;
}
__name(calculateTextHeight, "calculateTextHeight");
function calculateTextWidth(text, config) {
	return calculateTextDimensions(text, config).width;
}
__name(calculateTextWidth, "calculateTextWidth");
var calculateTextDimensions = memoize_default((text, config) => {
	const { fontSize = 12, fontFamily = "Arial", fontWeight = 400 } = config;
	if (!text) return {
		width: 0,
		height: 0
	};
	const [, _fontSizePx] = parseFontSize(fontSize);
	const fontFamilies = ["sans-serif", fontFamily];
	const lines = text.split(common_default.lineBreakRegex);
	const dims = [];
	const body = select_default("body");
	if (!body.remove) return {
		width: 0,
		height: 0,
		lineHeight: 0
	};
	const g = body.append("svg");
	for (const fontFamily2 of fontFamilies) {
		let cHeight = 0;
		const dim = {
			width: 0,
			height: 0,
			lineHeight: 0
		};
		for (const line of lines) {
			const textObj = getTextObj();
			textObj.text = line || "​";
			const textElem = drawSimpleText(g, textObj).style("font-size", _fontSizePx).style("font-weight", fontWeight).style("font-family", fontFamily2);
			const bBox = (textElem._groups || textElem)[0][0].getBBox();
			if (bBox.width === 0 && bBox.height === 0) throw new Error("svg element not in render tree");
			dim.width = Math.round(Math.max(dim.width, bBox.width));
			cHeight = Math.round(bBox.height);
			dim.height += cHeight;
			dim.lineHeight = Math.round(Math.max(dim.lineHeight, cHeight));
		}
		dims.push(dim);
	}
	g.remove();
	return dims[isNaN(dims[1].height) || isNaN(dims[1].width) || isNaN(dims[1].lineHeight) || dims[0].height > dims[1].height && dims[0].width > dims[1].width && dims[0].lineHeight > dims[1].lineHeight ? 0 : 1];
}, (text, config) => `${text}${config.fontSize}${config.fontWeight}${config.fontFamily}`);
var InitIDGenerator = class {
	constructor(deterministic = false, seed) {
		this.count = 0;
		this.count = seed ? seed.length : 0;
		this.next = deterministic ? () => this.count++ : () => Date.now();
	}
	static {
		__name(this, "InitIDGenerator");
	}
};
var decoder;
var entityDecode = /* @__PURE__ */ __name(function(html) {
	decoder = decoder || document.createElement("div");
	html = escape(html).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";");
	decoder.innerHTML = html;
	return unescape(decoder.textContent);
}, "entityDecode");
function isDetailedError(error) {
	return "str" in error;
}
__name(isDetailedError, "isDetailedError");
var insertTitle = /* @__PURE__ */ __name((parent, cssClass, titleTopMargin, title) => {
	if (!title) return;
	const bounds = parent.node()?.getBBox();
	if (!bounds) return;
	parent.append("text").text(title).attr("text-anchor", "middle").attr("x", bounds.x + bounds.width / 2).attr("y", -titleTopMargin).attr("class", cssClass);
}, "insertTitle");
var parseFontSize = /* @__PURE__ */ __name((fontSize) => {
	if (typeof fontSize === "number") return [fontSize, fontSize + "px"];
	const fontSizeNumber = parseInt(fontSize ?? "", 10);
	if (Number.isNaN(fontSizeNumber)) return [void 0, void 0];
	else if (fontSize === String(fontSizeNumber)) return [fontSizeNumber, fontSize + "px"];
	else return [fontSizeNumber, fontSize];
}, "parseFontSize");
function cleanAndMerge(defaultData, data) {
	return merge_default({}, defaultData, data);
}
__name(cleanAndMerge, "cleanAndMerge");
var utils_default = {
	assignWithDepth: assignWithDepth_default,
	wrapLabel,
	calculateTextHeight,
	calculateTextWidth,
	calculateTextDimensions,
	cleanAndMerge,
	detectInit,
	detectDirective,
	isSubstringInArray,
	interpolateToCurve,
	calcLabelPosition,
	calcCardinalityPosition,
	calcTerminalLabelPosition,
	formatUrl,
	getStylesFromArray,
	generateId,
	random,
	runFunc,
	entityDecode,
	insertTitle,
	isLabelCoordinateInPath,
	parseFontSize,
	InitIDGenerator
};
var encodeEntities = /* @__PURE__ */ __name(function(text) {
	let txt = text;
	txt = txt.replace(/style.*:\S*#.*;/g, function(s) {
		return s.substring(0, s.length - 1);
	});
	txt = txt.replace(/classDef.*:\S*#.*;/g, function(s) {
		return s.substring(0, s.length - 1);
	});
	txt = txt.replace(/#\w+;/g, function(s) {
		const innerTxt = s.substring(1, s.length - 1);
		if (/^\+?\d+$/.test(innerTxt)) return "ﬂ°°" + innerTxt + "¶ß";
		else return "ﬂ°" + innerTxt + "¶ß";
	});
	return txt;
}, "encodeEntities");
var decodeEntities = /* @__PURE__ */ __name(function(text) {
	return text.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities");
var getEdgeId = /* @__PURE__ */ __name((from, to, { counter = 0, prefix, suffix }, id) => {
	if (id) return id;
	return `${prefix ? `${prefix}_` : ""}${from}_${to}_${counter}${suffix ? `_${suffix}` : ""}`;
}, "getEdgeId");
function handleUndefinedAttr(attrValue) {
	return attrValue ?? null;
}
__name(handleUndefinedAttr, "handleUndefinedAttr");
function isLabelCoordinateInPath(point$4, dAttr) {
	const roundedX = Math.round(point$4.x);
	const roundedY = Math.round(point$4.y);
	const sanitizedD = dAttr.replace(/(\d+\.\d+)/g, (match) => Math.round(parseFloat(match)).toString());
	return sanitizedD.includes(roundedX.toString()) || sanitizedD.includes(roundedY.toString());
}
__name(isLabelCoordinateInPath, "isLabelCoordinateInPath");
export { _copyArray_default as A, monotoneY as B, _overRest_default as C, isArrayLikeObject_default as D, _assignValue_default as E, stepAfter as F, bumpY as G, cardinal_default as H, stepBefore as I, linear_default as K, step_default as L, _cloneArrayBuffer_default as M, _cloneBuffer_default as N, _initCloneObject_default as O, _baseAssignValue_default as P, natural_default as R, constant_default as S, _copyObject_default as T, basis_default as U, catmullRom_default as V, bumpX as W, wrapLabel as _, decodeEntities as a, _baseRest_default as b, getEdgeId as c, interpolateToCurve as d, isDetailedError as f, utils_default as g, removeDirectives as h, cleanAndMerge as i, _cloneTypedArray_default as j, _getPrototype_default as k, getStylesFromArray as l, random as m, calculateTextHeight as n, encodeEntities as o, parseFontSize as p, calculateTextWidth as r, generateId as s, ZERO_WIDTH_SPACE as t, handleUndefinedAttr as u, merge_default as v, keysIn_default as w, _setToString_default as x, _isIterateeCall_default as y, monotoneX as z };
