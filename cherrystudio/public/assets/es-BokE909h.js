import { d as __export, f as __toCommonJS, g as __toESM } from "./chunk-st2fFX3F.js";
import { b as require_react } from "./react-Cs7_W7Sm.js";
import { b as require_jsx_runtime } from "./jsx-runtime-VX_aOJrC.js";
import { b as emotion_is_prop_valid_esm_exports, c as init_emotion_is_prop_valid_esm } from "./emotion-is-prop-valid.esm-B2kLQv7X.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const LayoutGroupContext = (0, import_react.createContext)({});
function useConstant(init) {
	const ref = (0, import_react.useRef)(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}
const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? import_react.useLayoutEffect : import_react.useEffect;
const PresenceContext = /* @__PURE__ */ (0, import_react.createContext)(null);
function addUniqueItem(arr, item) {
	if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
	const index = arr.indexOf(item);
	if (index > -1) arr.splice(index, 1);
}
function moveItem([ ...arr], fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
	if (startIndex >= 0 && startIndex < arr.length) {
		const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
		const [item] = arr.splice(fromIndex, 1);
		arr.splice(endIndex, 0, item);
	}
	return arr;
}
const clamp = (min, max, v) => {
	if (v > max) return max;
	if (v < min) return min;
	return v;
};
function formatErrorMessage(message, errorCode) {
	return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}
let warning = () => {};
let invariant = () => {};
const MotionGlobalConfig = {};
const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
function isObject(value) {
	return typeof value === "object" && value !== null;
}
const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);
/* @__NO_SIDE_EFFECTS__ */
function memo(callback) {
	let result;
	return () => {
		if (result === void 0) result = callback();
		return result;
	};
}
const noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;
const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
const progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
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
	notify(a, b, c) {
		const numSubscriptions = this.subscriptions.length;
		if (!numSubscriptions) return;
		if (numSubscriptions === 1) this.subscriptions[0](a, b, c);
		else for (let i = 0; i < numSubscriptions; i++) {
			const handler = this.subscriptions[i];
			handler && handler(a, b, c);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
};
const secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
const millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;
function velocityPerSecond(velocity, frameDuration) {
	return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
const warned = /* @__PURE__ */ new Set();
function hasWarned$1(message) {
	return warned.has(message);
}
function warnOnce(condition, message, errorCode) {
	if (condition || warned.has(message)) return;
	console.warn(formatErrorMessage(message, errorCode));
	warned.add(message);
}
const wrap = (min, max, v) => {
	const rangeSize = max - min;
	return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
const calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
	let currentX;
	let currentT;
	let i = 0;
	do {
		currentT = lowerBound + (upperBound - lowerBound) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - x;
		if (currentX > 0) upperBound = currentT;
		else lowerBound = currentT;
	} while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
	return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
	if (mX1 === mY1 && mX2 === mY2) return noop;
	const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
	return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
const mirrorEasing = (easing) => (p) => p <= .5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);
const backOut = /* @__PURE__ */ cubicBezier(.33, 1.53, .69, .99);
const backIn = /* @__PURE__ */ reverseEasing(backOut);
const backInOut = /* @__PURE__ */ mirrorEasing(backIn);
const anticipate = (p) => (p *= 2) < 1 ? .5 * backIn(p) : .5 * (2 - Math.pow(2, -10 * (p - 1)));
const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circIn);
const easeIn = /* @__PURE__ */ cubicBezier(.42, 0, 1, 1);
const easeOut = /* @__PURE__ */ cubicBezier(0, 0, .58, 1);
const easeInOut = /* @__PURE__ */ cubicBezier(.42, 0, .58, 1);
function steps(numSteps, direction = "end") {
	return (progress$1) => {
		progress$1 = direction === "end" ? Math.min(progress$1, .999) : Math.max(progress$1, .001);
		const expanded = progress$1 * numSteps;
		const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
		return clamp(0, 1, rounded / numSteps);
	};
}
const isEasingArray = (ease$1) => {
	return Array.isArray(ease$1) && typeof ease$1[0] !== "number";
};
function getEasingForSegment(easing, i) {
	return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
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
		invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
		const [x1, y1, x2, y2] = definition;
		return cubicBezier(x1, y1, x2, y2);
	} else if (isValidEasing(definition)) {
		invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
		return easingLookup[definition];
	}
	return definition;
};
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
const maxElapsed$1 = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
	let runNextFrame = false;
	let useDefaultElapsed = true;
	const state = {
		delta: 0,
		timestamp: 0,
		isProcessing: false
	};
	const flagRunNextFrame = () => runNextFrame = true;
	const steps$1 = stepsOrder.reduce((acc, key) => {
		acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
		return acc;
	}, {});
	const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps$1;
	const processBatch = () => {
		const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
		runNextFrame = false;
		if (!MotionGlobalConfig.useManualTiming) state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed$1), 1);
		state.timestamp = timestamp;
		state.isProcessing = true;
		setup.process(state);
		read.process(state);
		resolveKeyframes.process(state);
		preUpdate.process(state);
		update.process(state);
		preRender.process(state);
		render.process(state);
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
		const step = steps$1[key];
		acc[key] = (process, keepAlive = false, immediate = false) => {
			if (!runNextFrame) wake();
			return step.schedule(process, keepAlive, immediate);
		};
		return acc;
	}, {});
	const cancel = (process) => {
		for (let i = 0; i < stepsOrder.length; i++) steps$1[stepsOrder[i]].cancel(process);
	};
	return {
		schedule,
		cancel,
		state,
		steps: steps$1
	};
}
const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
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
const activeAnimations = {
	layout: 0,
	mainThread: 0,
	waapi: 0
};
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
const startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
	const startsWithToken = startsAsVariableToken(value);
	if (!startsWithToken) return false;
	return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
const number = {
	test: (v) => typeof v === "number",
	parse: parseFloat,
	transform: (v) => v
};
const alpha = {
	...number,
	transform: (v) => clamp(0, 1, v)
};
const scale = {
	...number,
	default: 1
};
const sanitize = (v) => Math.round(v * 1e5) / 1e5;
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function isNullish(v) {
	return v == null;
}
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
const isColorString = (type, testProp) => (v) => {
	return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
const splitColor = (aName, bName, cName) => (v) => {
	if (typeof v !== "string") return v;
	const [a, b, c, alpha$1] = v.match(floatRegex);
	return {
		[aName]: parseFloat(a),
		[bName]: parseFloat(b),
		[cName]: parseFloat(c),
		alpha: alpha$1 !== void 0 ? parseFloat(alpha$1) : 1
	};
};
const clampRgbUnit = (v) => clamp(0, 255, v);
const rgbUnit = {
	...number,
	transform: (v) => Math.round(clampRgbUnit(v))
};
const rgba = {
	test: /* @__PURE__ */ isColorString("rgb", "red"),
	parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
	transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
	let r = "";
	let g = "";
	let b = "";
	let a = "";
	if (v.length > 5) {
		r = v.substring(1, 3);
		g = v.substring(3, 5);
		b = v.substring(5, 7);
		a = v.substring(7, 9);
	} else {
		r = v.substring(1, 2);
		g = v.substring(2, 3);
		b = v.substring(3, 4);
		a = v.substring(4, 5);
		r += r;
		g += g;
		b += b;
		a += a;
	}
	return {
		red: parseInt(r, 16),
		green: parseInt(g, 16),
		blue: parseInt(b, 16),
		alpha: a ? parseInt(a, 16) / 255 : 1
	};
}
const hex = {
	test: /* @__PURE__ */ isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
};
const createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
	test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
	parse: parseFloat,
	transform: (v) => `${v}${unit}`
});
const degrees = /* @__PURE__ */ createUnitType("deg");
const percent = /* @__PURE__ */ createUnitType("%");
const px = /* @__PURE__ */ createUnitType("px");
const vh = /* @__PURE__ */ createUnitType("vh");
const vw = /* @__PURE__ */ createUnitType("vw");
const progressPercentage = /* @__PURE__ */ (() => ({
	...percent,
	parse: (v) => percent.parse(v) / 100,
	transform: (v) => percent.transform(v * 100)
}))();
const hsla = {
	test: /* @__PURE__ */ isColorString("hsl", "hue"),
	parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
	transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
		return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
	}
};
const color = {
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
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(v) {
	return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
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
	const types = [];
	let i = 0;
	const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
		if (color.test(parsedValue)) {
			indexes.color.push(i);
			types.push(COLOR_TOKEN);
			values.push(color.parse(parsedValue));
		} else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
			indexes.var.push(i);
			types.push(VAR_TOKEN);
			values.push(parsedValue);
		} else {
			indexes.number.push(i);
			types.push(NUMBER_TOKEN);
			values.push(parseFloat(parsedValue));
		}
		++i;
		return SPLIT_TOKEN;
	});
	const split = tokenised.split(SPLIT_TOKEN);
	return {
		values,
		split,
		indexes,
		types
	};
}
function parseComplexValue(v) {
	return analyseComplexValue(v).values;
}
function createTransformer(source) {
	const { split, types } = analyseComplexValue(source);
	const numSections = split.length;
	return (v) => {
		let output = "";
		for (let i = 0; i < numSections; i++) {
			output += split[i];
			if (v[i] !== void 0) {
				const type = types[i];
				if (type === NUMBER_TOKEN) output += sanitize(v[i]);
				else if (type === COLOR_TOKEN) output += color.transform(v[i]);
				else output += v[i];
			}
		}
		return output;
	};
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
function getAnimatableNone$1(v) {
	const parsed = parseComplexValue(v);
	const transformer = createTransformer(v);
	return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
function hueToRgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
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
function mixImmediate(a, b) {
	return (p) => p > 0 ? b : a;
}
const mixNumber = (from, to, progress$1) => {
	return from + (to - from) * progress$1;
};
const mixLinearColor = (from, to, v) => {
	const fromExpo = from * from;
	const expo = v * (to * to - fromExpo) + fromExpo;
	return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [
	hex,
	rgba,
	hsla
];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color$1) {
	const type = getColorType(color$1);
	warning(Boolean(type), `'${color$1}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
	if (!Boolean(type)) return false;
	let model = type.parse(color$1);
	if (type === hsla) model = hslaToRgba(model);
	return model;
}
const mixColor = (from, to) => {
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
const invisibleValues = new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
	if (invisibleValues.has(origin)) return (p) => p <= 0 ? origin : target;
	else return (p) => p >= 1 ? target : origin;
}
function mixNumber$1(a, b) {
	return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
	if (typeof a === "number") return mixNumber$1;
	else if (typeof a === "string") return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
	else if (Array.isArray(a)) return mixArray;
	else if (typeof a === "object") return color.test(a) ? mixColor : mixObject;
	return mixImmediate;
}
function mixArray(a, b) {
	const output = [...a];
	const numValues = output.length;
	const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
	return (p) => {
		for (let i = 0; i < numValues; i++) output[i] = blendValue[i](p);
		return output;
	};
}
function mixObject(a, b) {
	const output = {
		...a,
		...b
	};
	const blendValue = {};
	for (const key in output) if (a[key] !== void 0 && b[key] !== void 0) blendValue[key] = getMixer(a[key])(a[key], b[key]);
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
	for (let i = 0; i < target.values.length; i++) {
		const type = target.types[i];
		const originIndex = origin.indexes[type][pointers[type]];
		const originValue = origin.values[originIndex] ?? 0;
		orderedOrigin[i] = originValue;
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
		warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
		return mixImmediate(origin, target);
	}
};
function mix(from, to, p) {
	if (typeof from === "number" && typeof to === "number" && typeof p === "number") return mixNumber(from, to, p);
	const mixer = getMixer(from);
	return mixer(from, to);
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
	for (let i = 0; i < numPoints; i++) points += Math.round(easing(i / (numPoints - 1)) * 1e4) / 1e4 + ", ";
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
function calcGeneratorVelocity(resolveValue, t, current$1) {
	const prevT = Math.max(t - velocitySampleDuration, 0);
	return velocityPerSecond(current$1 - resolveValue(prevT), t - prevT);
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
	let derivative;
	warning(duration <= /* @__PURE__ */ secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let dampingRatio = 1 - bounce;
	dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
	duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(duration));
	if (dampingRatio < 1) {
		envelope = (undampedFreq$1) => {
			const exponentialDecay = undampedFreq$1 * dampingRatio;
			const delta = exponentialDecay * duration;
			const a = exponentialDecay - velocity;
			const b = calcAngularFreq(undampedFreq$1, dampingRatio);
			const c = Math.exp(-delta);
			return safeMin - a / b * c;
		};
		derivative = (undampedFreq$1) => {
			const exponentialDecay = undampedFreq$1 * dampingRatio;
			const delta = exponentialDecay * duration;
			const d = delta * velocity + velocity;
			const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq$1, 2) * duration;
			const f = Math.exp(-delta);
			const g = calcAngularFreq(Math.pow(undampedFreq$1, 2), dampingRatio);
			const factor = -envelope(undampedFreq$1) + safeMin > 0 ? -1 : 1;
			return factor * ((d - e) * f) / g;
		};
	} else {
		envelope = (undampedFreq$1) => {
			const a = Math.exp(-undampedFreq$1 * duration);
			const b = (undampedFreq$1 - velocity) * duration + 1;
			return -safeMin + a * b;
		};
		derivative = (undampedFreq$1) => {
			const a = Math.exp(-undampedFreq$1 * duration);
			const b = (velocity - undampedFreq$1) * (duration * duration);
			return a * b;
		};
	}
	const initialGuess = 5 / duration;
	const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
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
function approximateRoot(envelope, derivative, initialGuess) {
	let result = initialGuess;
	for (let i = 1; i < rootIterations; i++) result = result - envelope(result) / derivative(result);
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
function isSpringType(options, keys$1) {
	return keys$1.some((key) => options[key] !== void 0);
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
		resolveSpring = (t) => {
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
			return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
		};
	} else if (dampingRatio === 1) resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
	else {
		const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
		resolveSpring = (t) => {
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
			const freqForT = Math.min(dampedAngularFreq * t, 300);
			return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
		};
	}
	const generator = {
		calculatedDuration: isResolvedFromDuration ? duration || null : null,
		next: (t) => {
			const current$1 = resolveSpring(t);
			if (!isResolvedFromDuration) {
				let currentVelocity = t === 0 ? initialVelocity : 0;
				if (dampingRatio < 1) currentVelocity = t === 0 ? /* @__PURE__ */ secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t, current$1);
				const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
				const isBelowDisplacementThreshold = Math.abs(target - current$1) <= restDelta;
				state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
			} else state.done = t >= duration;
			state.value = state.done ? target : current$1;
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
	const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
	const calcLatest = (t) => target + calcDelta(t);
	const applyFriction = (t) => {
		const delta = calcDelta(t);
		const latest = calcLatest(t);
		state.done = Math.abs(delta) <= restDelta;
		state.value = state.done ? target : latest;
	};
	let timeReachedBoundary;
	let spring$1;
	const checkCatchBoundary = (t) => {
		if (!isOutOfBounds(state.value)) return;
		timeReachedBoundary = t;
		spring$1 = spring({
			keyframes: [state.value, nearestBoundary(state.value)],
			velocity: calcGeneratorVelocity(calcLatest, t, state.value),
			damping: bounceDamping,
			stiffness: bounceStiffness,
			restDelta,
			restSpeed
		});
	};
	checkCatchBoundary(0);
	return {
		calculatedDuration: null,
		next: (t) => {
			let hasUpdatedFrame = false;
			if (!spring$1 && timeReachedBoundary === void 0) {
				hasUpdatedFrame = true;
				applyFriction(t);
				checkCatchBoundary(t);
			}
			if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) return spring$1.next(t - timeReachedBoundary);
			else {
				!hasUpdatedFrame && applyFriction(t);
				return state;
			}
		}
	};
}
function createMixers(output, ease$1, customMixer) {
	const mixers = [];
	const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
	const numMixers = output.length - 1;
	for (let i = 0; i < numMixers; i++) {
		let mixer = mixerFactory(output[i], output[i + 1]);
		if (ease$1) {
			const easingFunction = Array.isArray(ease$1) ? ease$1[i] || noop : ease$1;
			mixer = pipe(easingFunction, mixer);
		}
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
		let i = 0;
		if (numMixers > 1) {
			for (; i < input.length - 2; i++) if (v < input[i + 1]) break;
		}
		const progressInRange = /* @__PURE__ */ progress(input[i], input[i + 1], v);
		return mixers[i](progressInRange);
	};
	return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
function fillOffset(offset, remaining) {
	const min = offset[offset.length - 1];
	for (let i = 1; i <= remaining; i++) {
		const offsetProgress = /* @__PURE__ */ progress(0, remaining, i);
		offset.push(mixNumber(min, 1, offsetProgress));
	}
}
function defaultOffset(arr) {
	const offset = [0];
	fillOffset(offset, arr.length - 1);
	return offset;
}
function convertOffsetToTimes(offset, duration) {
	return offset.map((o) => o * duration);
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
	const absoluteTimes = convertOffsetToTimes(times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues), duration);
	const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, { ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions) });
	return {
		calculatedDuration: duration,
		next: (t) => {
			state.value = mapTimeToKeyframe(t);
			state.done = t >= duration;
			return state;
		}
	};
}
const isNotNull$1 = (value) => value !== null;
function getFinalKeyframe$1(keyframes$1, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
	const resolvedKeyframes = keyframes$1.filter(isNotNull$1);
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
function animateValue(options) {
	return new JSAnimation(options);
}
function fillWildcards(keyframes$1) {
	for (let i = 1; i < keyframes$1.length; i++) keyframes$1[i] ?? (keyframes$1[i] = keyframes$1[i - 1]);
}
const radToDeg = (rad) => rad * 180 / Math.PI;
const rotate = (v) => {
	const angle = radToDeg(Math.atan2(v[1], v[0]));
	return rebaseAngle(angle);
};
const matrix2dParsers = {
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
const rebaseAngle = (angle) => {
	angle = angle % 360;
	if (angle < 0) angle += 360;
	return angle;
};
const rotateZ = rotate;
const scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
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
function parseValueFromTransform(transform$1, name) {
	if (!transform$1 || transform$1 === "none") return defaultTransformValue(name);
	const matrix3dMatch = transform$1.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
	let parsers;
	let match;
	if (matrix3dMatch) {
		parsers = matrix3dParsers;
		match = matrix3dMatch;
	} else {
		const matrix2dMatch = transform$1.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		parsers = matrix2dParsers;
		match = matrix2dMatch;
	}
	if (!match) return defaultTransformValue(name);
	const valueParser = parsers[name];
	const values = match[1].split(",").map(convertTransformToNumber);
	return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name) => {
	const { transform: transform$1 = "none" } = getComputedStyle(instance);
	return parseValueFromTransform(transform$1, name);
};
function convertTransformToNumber(value) {
	return parseFloat(value.trim());
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
const isNumOrPxType = (v) => v === number || v === px;
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
	width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
	height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
	top: (_bbox, { top }) => parseFloat(top),
	left: (_bbox, { left }) => parseFloat(left),
	bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
	right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
	x: (_bbox, { transform: transform$1 }) => parseValueFromTransform(transform$1, "x"),
	y: (_bbox, { transform: transform$1 }) => parseValueFromTransform(transform$1, "y")
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
const supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0);
const supportsFlags = {};
function memoSupports(callback, supportsFlag) {
	const memoized = /* @__PURE__ */ memo(callback);
	return () => supportsFlags[supportsFlag] ?? memoized();
}
const supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch (e) {
		return false;
	}
	return true;
}, "linearEasing");
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
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
		} catch (e) {}
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
	const current$1 = keyframes$1[0];
	if (keyframes$1.length === 1) return true;
	for (let i = 0; i < keyframes$1.length; i++) if (keyframes$1[i] !== current$1) return true;
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
	options.type;
}
const acceleratedValues$1 = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]);
const supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
	const { motionValue: motionValue$1, name, repeatDelay, repeatType, damping, type } = options;
	const subject = motionValue$1?.owner?.current;
	if (!(subject instanceof HTMLElement)) return false;
	const { onUpdate, transformTemplate } = motionValue$1.owner.getProps();
	return supportsWaapi() && name && acceleratedValues$1.has(name) && (name !== "transform" || !transformTemplate) && !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
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
	onKeyframesResolved(keyframes$1, finalKeyframe, options, sync$1) {
		this.keyframeResolver = void 0;
		const { name, type, velocity, delay: delay$1, isHandoff, onUpdate } = options;
		this.resolvedAt = time.now();
		if (!canAnimate(keyframes$1, name, type, velocity)) {
			if (MotionGlobalConfig.instantAnimations || !delay$1) onUpdate?.(getFinalKeyframe$1(keyframes$1, options, finalKeyframe));
			keyframes$1[0] = keyframes$1[keyframes$1.length - 1];
			makeAnimationInstant(options);
			options.repeat = 0;
		}
		const startTime = sync$1 ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
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
var GroupAnimation = class {
	constructor(animations$1) {
		this.stop = () => this.runAll("stop");
		this.animations = animations$1.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((animation) => animation.finished));
	}
	getAll(propName) {
		return this.animations[0][propName];
	}
	setAll(propName, newValue) {
		for (let i = 0; i < this.animations.length; i++) this.animations[i][propName] = newValue;
	}
	attachTimeline(timeline) {
		const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
		return () => {
			subscriptions.forEach((cancel, i) => {
				cancel && cancel();
				this.animations[i].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(time$1) {
		this.setAll("time", time$1);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(speed) {
		this.setAll("speed", speed);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		let max = 0;
		for (let i = 0; i < this.animations.length; i++) max = Math.max(max, this.animations[i].duration);
		return max;
	}
	runAll(methodName) {
		this.animations.forEach((controls) => controls[methodName]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
var GroupAnimationWithThen = class extends GroupAnimation {
	then(onResolve, _onReject) {
		return this.finished.finally(onResolve).then(() => {});
	}
};
var NativeAnimationWrapper = class extends NativeAnimation {
	constructor(animation) {
		super();
		this.animation = animation;
		animation.onfinish = () => {
			this.finishedTime = this.time;
			this.notifyFinished();
		};
	}
};
const animationMaps = /* @__PURE__ */ new WeakMap();
const animationMapKey = (name, pseudoElement = "") => `${name}:${pseudoElement}`;
function getAnimationMap(element) {
	const map = animationMaps.get(element) || /* @__PURE__ */ new Map();
	animationMaps.set(element, map);
	return map;
}
const splitCSSVariableRegex = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current$1) {
	const match = splitCSSVariableRegex.exec(current$1);
	if (!match) return [,];
	const [, token1, token2, fallback] = match;
	return [`--${token1 ?? token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current$1, element, depth = 1) {
	invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current$1}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	const [token, fallback] = parseCSSVariable(current$1);
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
const positionalKeys = new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...transformPropOrder
]);
const auto = {
	test: (v) => v === "auto",
	parse: (v) => v
};
const testValueType = (v) => (type) => type.test(v);
const dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	auto
];
const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
function isNone(value) {
	if (typeof value === "number") return value === 0;
	else if (value !== null) return value === "none" || value === "0" || isZeroValueString(value);
	else return true;
}
const maxDefaults = new Set([
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
	const unit = value.replace(number$1, "");
	let defaultValue = maxDefaults.has(name) ? 1 : 0;
	if (number$1 !== value) defaultValue *= 100;
	return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
	...complex,
	getAnimatableNone: (v) => {
		const functions = v.match(functionRegex);
		return functions ? functions.map(applyDefaultFilter).join(" ") : v;
	}
};
const int = {
	...number,
	transform: Math.round
};
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
const invalidTemplates = new Set([
	"auto",
	"none",
	"0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
	let i = 0;
	let animatableTemplate = void 0;
	while (i < unresolvedKeyframes.length && !animatableTemplate) {
		const keyframe = unresolvedKeyframes[i];
		if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) animatableTemplate = unresolvedKeyframes[i];
		i++;
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
		for (let i = 0; i < unresolvedKeyframes.length; i++) {
			let keyframe = unresolvedKeyframes[i];
			if (typeof keyframe === "string") {
				keyframe = keyframe.trim();
				if (isCSSVariableToken(keyframe)) {
					const resolved = getVariableValue(keyframe, element.current);
					if (resolved !== void 0) unresolvedKeyframes[i] = resolved;
					if (i === unresolvedKeyframes.length - 1) this.finalKeyframe = keyframe;
				}
			}
		}
		this.resolveNoneKeyframes();
		if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) return;
		const [origin, target] = unresolvedKeyframes;
		const originType = findDimensionValueType(origin);
		const targetType = findDimensionValueType(target);
		if (originType === targetType) return;
		if (isNumOrPxType(originType) && isNumOrPxType(targetType)) for (let i = 0; i < unresolvedKeyframes.length; i++) {
			const value = unresolvedKeyframes[i];
			if (typeof value === "string") unresolvedKeyframes[i] = parseFloat(value);
		}
		else if (positionalValues[name]) this.needsMeasurement = true;
	}
	resolveNoneKeyframes() {
		const { unresolvedKeyframes, name } = this;
		const noneKeyframeIndexes = [];
		for (let i = 0; i < unresolvedKeyframes.length; i++) if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) noneKeyframeIndexes.push(i);
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
const pxValues = new Set([
	"borderWidth",
	"borderTopWidth",
	"borderRightWidth",
	"borderBottomWidth",
	"borderLeftWidth",
	"borderRadius",
	"radius",
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius",
	"width",
	"maxWidth",
	"height",
	"maxHeight",
	"top",
	"right",
	"bottom",
	"left",
	"padding",
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
	"margin",
	"marginTop",
	"marginRight",
	"marginBottom",
	"marginLeft",
	"backgroundPositionX",
	"backgroundPositionY"
]);
function applyPxDefaults(keyframes$1, name) {
	for (let i = 0; i < keyframes$1.length; i++) if (typeof keyframes$1[i] === "number" && pxValues.has(name)) keyframes$1[i] = keyframes$1[i] + "px";
}
function isWaapiSupportedEasing(easing) {
	return Boolean(typeof easing === "function" && supportsLinearEasing() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || supportsLinearEasing()) || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
const supportsPartialKeyframes = /* @__PURE__ */ memo(() => {
	try {
		document.createElement("div").animate({ opacity: [1] });
	} catch (e) {
		return false;
	}
	return true;
});
const acceleratedValues = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]);
function camelToDash$1(str) {
	return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}
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
function createSelectorEffect(subjectEffect) {
	return (subject, values) => {
		const elements = resolveElements(subject);
		const subscriptions = [];
		for (const element of elements) {
			const remove = subjectEffect(element, values);
			subscriptions.push(remove);
		}
		return () => {
			for (const remove of subscriptions) remove();
		};
	};
}
const getValueAsType = (value, type) => {
	return type && typeof value === "number" ? type.transform(value) : value;
};
var MotionValueState = class {
	constructor() {
		this.latest = {};
		this.values = /* @__PURE__ */ new Map();
	}
	set(name, value, render, computed, useDefaultValueType = true) {
		const existingValue = this.values.get(name);
		if (existingValue) existingValue.onRemove();
		const onChange = () => {
			const v = value.get();
			if (useDefaultValueType) this.latest[name] = getValueAsType(v, numberValueTypes[name]);
			else this.latest[name] = v;
			render && frame.render(render);
		};
		onChange();
		const cancelOnChange = value.on("change", onChange);
		computed && value.addDependent(computed);
		const remove = () => {
			cancelOnChange();
			render && cancelFrame(render);
			this.values.delete(name);
			computed && value.removeDependent(computed);
		};
		this.values.set(name, {
			value,
			onRemove: remove
		});
		return remove;
	}
	get(name) {
		return this.values.get(name)?.value;
	}
	destroy() {
		for (const value of this.values.values()) value.onRemove();
	}
};
function createEffect(addValue) {
	const stateCache = /* @__PURE__ */ new WeakMap();
	const subscriptions = [];
	return (subject, values) => {
		const state = stateCache.get(subject) ?? new MotionValueState();
		stateCache.set(subject, state);
		for (const key in values) {
			const value = values[key];
			const remove = addValue(subject, state, key, value);
			subscriptions.push(remove);
		}
		return () => {
			for (const cancel of subscriptions) cancel();
		};
	};
}
function canSetAsProperty(element, name) {
	if (!(name in element)) return false;
	const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), name) || Object.getOwnPropertyDescriptor(element, name);
	return descriptor && typeof descriptor.set === "function";
}
const addAttrValue = (element, state, key, value) => {
	const isProp = canSetAsProperty(element, key);
	const name = isProp ? key : key.startsWith("data") || key.startsWith("aria") ? camelToDash$1(key) : key;
	const render = isProp ? () => {
		element[name] = state.latest[key];
	} : () => {
		const v = state.latest[key];
		if (v === null || v === void 0) element.removeAttribute(name);
		else element.setAttribute(name, String(v));
	};
	return state.set(key, value, render);
};
const attrEffect = /* @__PURE__ */ createSelectorEffect(/* @__PURE__ */ createEffect(addAttrValue));
const propEffect = /* @__PURE__ */ createEffect((subject, state, key, value) => {
	return state.set(key, value, () => {
		subject[key] = state.latest[key];
	}, void 0, false);
});
function isHTMLElement(element) {
	return isObject(element) && "offsetHeight" in element;
}
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
	return !isNaN(parseFloat(value));
};
const collectMotionValues = { current: void 0 };
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
	setCurrent(current$1) {
		this.current = current$1;
		this.updatedAt = time.now();
		if (this.canTrackVelocity === null && current$1 !== void 0) this.canTrackVelocity = isFloat(this.current);
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
	setWithVelocity(prev, current$1, delta) {
		this.set(current$1);
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
const translateAlias$1 = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
function buildTransform$1(state) {
	let transform$1 = "";
	let transformIsDefault = true;
	for (let i = 0; i < transformPropOrder.length; i++) {
		const key = transformPropOrder[i];
		const value = state.latest[key];
		if (value === void 0) continue;
		let valueIsDefault = true;
		if (typeof value === "number") valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
		else valueIsDefault = parseFloat(value) === 0;
		if (!valueIsDefault) {
			transformIsDefault = false;
			const transformName = translateAlias$1[key] || key;
			const valueToRender = state.latest[key];
			transform$1 += `${transformName}(${valueToRender}) `;
		}
	}
	return transformIsDefault ? "none" : transform$1.trim();
}
const originProps = new Set([
	"originX",
	"originY",
	"originZ"
]);
const addStyleValue = (element, state, key, value) => {
	let render = void 0;
	let computed = void 0;
	if (transformProps.has(key)) {
		if (!state.get("transform")) {
			if (!isHTMLElement(element) && !state.get("transformBox")) addStyleValue(element, state, "transformBox", new MotionValue("fill-box"));
			state.set("transform", new MotionValue("none"), () => {
				element.style.transform = buildTransform$1(state);
			});
		}
		computed = state.get("transform");
	} else if (originProps.has(key)) {
		if (!state.get("transformOrigin")) state.set("transformOrigin", new MotionValue(""), () => {
			const originX = state.latest.originX ?? "50%";
			const originY = state.latest.originY ?? "50%";
			const originZ = state.latest.originZ ?? 0;
			element.style.transformOrigin = `${originX} ${originY} ${originZ}`;
		});
		computed = state.get("transformOrigin");
	} else if (isCSSVar(key)) render = () => {
		element.style.setProperty(key, state.latest[key]);
	};
	else render = () => {
		element.style[key] = state.latest[key];
	};
	return state.set(key, value, render, computed);
};
const styleEffect = /* @__PURE__ */ createSelectorEffect(/* @__PURE__ */ createEffect(addStyleValue));
const toPx = px.transform;
function addSVGPathValue(element, state, key, value) {
	frame.render(() => element.setAttribute("pathLength", "1"));
	if (key === "pathOffset") return state.set(key, value, () => element.setAttribute("stroke-dashoffset", toPx(-state.latest[key])));
	else {
		if (!state.get("stroke-dasharray")) state.set("stroke-dasharray", new MotionValue("1 1"), () => {
			const { pathLength = 1, pathSpacing } = state.latest;
			element.setAttribute("stroke-dasharray", `${toPx(pathLength)} ${toPx(pathSpacing ?? 1 - Number(pathLength))}`);
		});
		return state.set(key, value, void 0, state.get("stroke-dasharray"));
	}
}
const addSVGValue = (element, state, key, value) => {
	if (key.startsWith("path")) return addSVGPathValue(element, state, key, value);
	else if (key.startsWith("attr")) return addAttrValue(element, state, convertAttrKey(key), value);
	const handler = key in element.style ? addStyleValue : addAttrValue;
	return handler(element, state, key, value);
};
const svgEffect = /* @__PURE__ */ createSelectorEffect(/* @__PURE__ */ createEffect(addSVGValue));
function convertAttrKey(key) {
	return key.replace(/^attr([A-Z])/, (_, firstChar) => firstChar.toLowerCase());
}
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);
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
const isNodeOrChild = (parent, child) => {
	if (!child) return false;
	else if (parent === child) return true;
	else return isNodeOrChild(parent, child.parentElement);
};
const isPrimaryPointer = (event) => {
	if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
	else return event.isPrimary !== false;
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
		if (isHTMLElement(target)) {
			target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
			if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) target.tabIndex = 0;
		}
	});
	return cancelEvents;
}
function getComputedStyle$1(element, name) {
	const computedStyle = window.getComputedStyle(element);
	return isCSSVar(name) ? computedStyle.getPropertyValue(name) : computedStyle[name];
}
function isSVGElement(element) {
	return isObject(element) && "ownerSVGElement" in element;
}
const resizeHandlers = /* @__PURE__ */ new WeakMap();
let observer;
const getSize = (borderBoxAxis, svgAxis, htmlAxis) => (target, borderBoxSize) => {
	if (borderBoxSize && borderBoxSize[0]) return borderBoxSize[0][borderBoxAxis + "Size"];
	else if (isSVGElement(target) && "getBBox" in target) return target.getBBox()[svgAxis];
	else return target[htmlAxis];
};
const getWidth = /* @__PURE__ */ getSize("inline", "width", "offsetWidth");
const getHeight = /* @__PURE__ */ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
	resizeHandlers.get(target)?.forEach((handler) => {
		handler(target, {
			get width() {
				return getWidth(target, borderBoxSize);
			},
			get height() {
				return getHeight(target, borderBoxSize);
			}
		});
	});
}
function notifyAll(entries) {
	entries.forEach(notifyTarget);
}
function createResizeObserver() {
	if (typeof ResizeObserver === "undefined") return;
	observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
	if (!observer) createResizeObserver();
	const elements = resolveElements(target);
	elements.forEach((element) => {
		let elementHandlers = resizeHandlers.get(element);
		if (!elementHandlers) {
			elementHandlers = /* @__PURE__ */ new Set();
			resizeHandlers.set(element, elementHandlers);
		}
		elementHandlers.add(handler);
		observer?.observe(element);
	});
	return () => {
		elements.forEach((element) => {
			const elementHandlers = resizeHandlers.get(element);
			elementHandlers?.delete(handler);
			if (!elementHandlers?.size) observer?.unobserve(element);
		});
	};
}
const windowCallbacks = /* @__PURE__ */ new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
	windowResizeHandler = () => {
		const info = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			}
		};
		windowCallbacks.forEach((callback) => callback(info));
	};
	window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
	windowCallbacks.add(callback);
	if (!windowResizeHandler) createWindowResizeHandler();
	return () => {
		windowCallbacks.delete(callback);
		if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
			window.removeEventListener("resize", windowResizeHandler);
			windowResizeHandler = void 0;
		}
	};
}
function resize(a, b) {
	return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}
function observeTimeline(update, timeline) {
	let prevProgress;
	const onFrame = () => {
		const { currentTime } = timeline;
		const percentage = currentTime === null ? 0 : currentTime.value;
		const progress$1 = percentage / 100;
		if (prevProgress !== progress$1) update(progress$1);
		prevProgress = progress$1;
	};
	frame.preUpdate(onFrame, true);
	return () => cancelFrame(onFrame);
}
function record() {
	const { value } = statsBuffer;
	if (value === null) {
		cancelFrame(record);
		return;
	}
	value.frameloop.rate.push(frameData.delta);
	value.animations.mainThread.push(activeAnimations.mainThread);
	value.animations.waapi.push(activeAnimations.waapi);
	value.animations.layout.push(activeAnimations.layout);
}
function mean(values) {
	return values.reduce((acc, value) => acc + value, 0) / values.length;
}
function summarise(values, calcAverage = mean) {
	if (values.length === 0) return {
		min: 0,
		max: 0,
		avg: 0
	};
	return {
		min: Math.min(...values),
		max: Math.max(...values),
		avg: calcAverage(values)
	};
}
const msToFps = (ms) => Math.round(1e3 / ms);
function clearStatsBuffer() {
	statsBuffer.value = null;
	statsBuffer.addProjectionMetrics = null;
}
function reportStats() {
	const { value } = statsBuffer;
	if (!value) throw new Error("Stats are not being measured");
	clearStatsBuffer();
	cancelFrame(record);
	const summary = {
		frameloop: {
			setup: summarise(value.frameloop.setup),
			rate: summarise(value.frameloop.rate),
			read: summarise(value.frameloop.read),
			resolveKeyframes: summarise(value.frameloop.resolveKeyframes),
			preUpdate: summarise(value.frameloop.preUpdate),
			update: summarise(value.frameloop.update),
			preRender: summarise(value.frameloop.preRender),
			render: summarise(value.frameloop.render),
			postRender: summarise(value.frameloop.postRender)
		},
		animations: {
			mainThread: summarise(value.animations.mainThread),
			waapi: summarise(value.animations.waapi),
			layout: summarise(value.animations.layout)
		},
		layoutProjection: {
			nodes: summarise(value.layoutProjection.nodes),
			calculatedTargetDeltas: summarise(value.layoutProjection.calculatedTargetDeltas),
			calculatedProjections: summarise(value.layoutProjection.calculatedProjections)
		}
	};
	const { rate } = summary.frameloop;
	rate.min = msToFps(rate.min);
	rate.max = msToFps(rate.max);
	rate.avg = msToFps(rate.avg);
	[rate.min, rate.max] = [rate.max, rate.min];
	return summary;
}
function recordStats() {
	if (statsBuffer.value) {
		clearStatsBuffer();
		throw new Error("Stats are already being measured");
	}
	const newStatsBuffer = statsBuffer;
	newStatsBuffer.value = {
		frameloop: {
			setup: [],
			rate: [],
			read: [],
			resolveKeyframes: [],
			preUpdate: [],
			update: [],
			preRender: [],
			render: [],
			postRender: []
		},
		animations: {
			mainThread: [],
			waapi: [],
			layout: []
		},
		layoutProjection: {
			nodes: [],
			calculatedTargetDeltas: [],
			calculatedProjections: []
		}
	};
	newStatsBuffer.addProjectionMetrics = (metrics$1) => {
		const { layoutProjection } = newStatsBuffer.value;
		layoutProjection.nodes.push(metrics$1.nodes);
		layoutProjection.calculatedTargetDeltas.push(metrics$1.calculatedTargetDeltas);
		layoutProjection.calculatedProjections.push(metrics$1.calculatedProjections);
	};
	frame.postRender(record, true);
	return reportStats;
}
function isSVGSVGElement(element) {
	return isSVGElement(element) && element.tagName === "svg";
}
function getOriginIndex(from, total) {
	if (from === "first") return 0;
	else {
		const lastIndex = total - 1;
		return from === "last" ? lastIndex : lastIndex / 2;
	}
}
function stagger(duration = .1, { startDelay = 0, from = 0, ease: ease$1 } = {}) {
	return (i, total) => {
		const fromIndex = typeof from === "number" ? from : getOriginIndex(from, total);
		const distance$1 = Math.abs(fromIndex - i);
		let delay$1 = duration * distance$1;
		if (ease$1) {
			const maxDelay = total * duration;
			const easingFunction = easingDefinitionToFunction(ease$1);
			delay$1 = easingFunction(delay$1 / maxDelay) * maxDelay;
		}
		return startDelay + delay$1;
	};
}
function transform(...args) {
	const useImmediate = !Array.isArray(args[0]);
	const argOffset = useImmediate ? 0 : -1;
	const inputValue = args[0 + argOffset];
	const inputRange = args[1 + argOffset];
	const outputRange = args[2 + argOffset];
	const options = args[3 + argOffset];
	const interpolator = interpolate(inputRange, outputRange, options);
	return useImmediate ? interpolator(inputValue) : interpolator;
}
function subscribeValue(inputValues, outputValue, getLatest) {
	const update = () => outputValue.set(getLatest());
	const scheduleUpdate = () => frame.preRender(update, false, true);
	const subscriptions = inputValues.map((v) => v.on("change", scheduleUpdate));
	outputValue.on("destroy", () => {
		subscriptions.forEach((unsubscribe) => unsubscribe());
		cancelFrame(update);
	});
}
function transformValue(transform$1) {
	const collectedValues = [];
	collectMotionValues.current = collectedValues;
	const initialValue = transform$1();
	collectMotionValues.current = void 0;
	const value = motionValue(initialValue);
	subscribeValue(collectedValues, value, transform$1);
	return value;
}
function mapValue(inputValue, inputRange, outputRange, options) {
	const map = transform(inputRange, outputRange, options);
	return transformValue(() => map(inputValue.get()));
}
const isMotionValue = (value) => Boolean(value && value.getVelocity);
function springValue(source, options) {
	const initialValue = isMotionValue(source) ? source.get() : source;
	const value = motionValue(initialValue);
	attachSpring(value, source, options);
	return value;
}
function attachSpring(value, source, options) {
	const initialValue = value.get();
	let activeAnimation = null;
	let latestValue = initialValue;
	let latestSetter;
	const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
	const stopAnimation$1 = () => {
		if (activeAnimation) {
			activeAnimation.stop();
			activeAnimation = null;
		}
	};
	const startAnimation = () => {
		stopAnimation$1();
		activeAnimation = new JSAnimation({
			keyframes: [asNumber$1(value.get()), asNumber$1(latestValue)],
			velocity: value.getVelocity(),
			type: "spring",
			restDelta: .001,
			restSpeed: .01,
			...options,
			onUpdate: latestSetter
		});
	};
	value.attach((v, set) => {
		latestValue = v;
		latestSetter = (latest) => set(parseValue(latest, unit));
		frame.postRender(startAnimation);
		return value.get();
	}, stopAnimation$1);
	if (isMotionValue(source)) {
		const removeSourceOnChange = source.on("change", (v) => value.set(parseValue(v, unit)));
		const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
		return () => {
			removeSourceOnChange();
			removeValueOnDestroy();
		};
	}
	return stopAnimation$1;
}
function parseValue(v, unit) {
	return unit ? v + unit : v;
}
function asNumber$1(v) {
	return typeof v === "number" ? v : parseFloat(v);
}
const valueTypes = [
	...dimensionValueTypes,
	color,
	complex
];
const findValueType = (v) => valueTypes.find(testValueType(v));
function chooseLayerType(valueName) {
	if (valueName === "layout") return "group";
	if (valueName === "enter" || valueName === "new") return "new";
	if (valueName === "exit" || valueName === "old") return "old";
	return "group";
}
let pendingRules = {};
let style = null;
const css = {
	set: (selector, values) => {
		pendingRules[selector] = values;
	},
	commit: () => {
		if (!style) {
			style = document.createElement("style");
			style.id = "motion-view";
		}
		let cssText = "";
		for (const selector in pendingRules) {
			const rule = pendingRules[selector];
			cssText += `${selector} {\n`;
			for (const [property, value] of Object.entries(rule)) cssText += `  ${property}: ${value};\n`;
			cssText += "}\n";
		}
		style.textContent = cssText;
		document.head.appendChild(style);
		pendingRules = {};
	},
	remove: () => {
		if (style && style.parentElement) style.parentElement.removeChild(style);
	}
};
function getViewAnimationLayerInfo(pseudoElement) {
	const match = pseudoElement.match(/::view-transition-(old|new|group|image-pair)\((.*?)\)/);
	if (!match) return null;
	return {
		layer: match[2],
		type: match[1]
	};
}
function filterViewAnimations(animation) {
	const { effect } = animation;
	if (!effect) return false;
	return effect.target === document.documentElement && effect.pseudoElement?.startsWith("::view-transition");
}
function getViewAnimations() {
	return document.getAnimations().filter(filterViewAnimations);
}
function hasTarget(target, targets) {
	return targets.has(target) && Object.keys(targets.get(target)).length > 0;
}
const definitionNames = [
	"layout",
	"enter",
	"exit",
	"new",
	"old"
];
function startViewAnimation(builder) {
	const { update, targets, options: defaultOptions } = builder;
	if (!document.startViewTransition) return new Promise(async (resolve) => {
		await update();
		resolve(new GroupAnimation([]));
	});
	if (!hasTarget("root", targets)) css.set(":root", { "view-transition-name": "none" });
	css.set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", { "animation-timing-function": "linear !important" });
	css.commit();
	const transition = document.startViewTransition(async () => {
		await update();
	});
	transition.finished.finally(() => {
		css.remove();
	});
	return new Promise((resolve) => {
		transition.ready.then(() => {
			const generatedViewAnimations = getViewAnimations();
			const animations$1 = [];
			targets.forEach((definition, target) => {
				for (const key of definitionNames) {
					if (!definition[key]) continue;
					const { keyframes: keyframes$1, options } = definition[key];
					for (let [valueName, valueKeyframes] of Object.entries(keyframes$1)) {
						if (!valueKeyframes) continue;
						const valueOptions = {
							...getValueTransition(defaultOptions, valueName),
							...getValueTransition(options, valueName)
						};
						const type = chooseLayerType(key);
						if (valueName === "opacity" && !Array.isArray(valueKeyframes)) {
							const initialValue = type === "new" ? 0 : 1;
							valueKeyframes = [initialValue, valueKeyframes];
						}
						if (typeof valueOptions.delay === "function") valueOptions.delay = valueOptions.delay(0, 1);
						valueOptions.duration && (valueOptions.duration = /* @__PURE__ */ secondsToMilliseconds(valueOptions.duration));
						valueOptions.delay && (valueOptions.delay = /* @__PURE__ */ secondsToMilliseconds(valueOptions.delay));
						const animation = new NativeAnimation({
							...valueOptions,
							element: document.documentElement,
							name: valueName,
							pseudoElement: `::view-transition-${type}(${target})`,
							keyframes: valueKeyframes
						});
						animations$1.push(animation);
					}
				}
			});
			for (const animation of generatedViewAnimations) {
				if (animation.playState === "finished") continue;
				const { effect } = animation;
				if (!effect || !(effect instanceof KeyframeEffect)) continue;
				const { pseudoElement } = effect;
				if (!pseudoElement) continue;
				const name = getViewAnimationLayerInfo(pseudoElement);
				if (!name) continue;
				const targetDefinition = targets.get(name.layer);
				if (!targetDefinition) {
					const transitionName = name.type === "group" ? "layout" : "";
					let animationTransition = { ...getValueTransition(defaultOptions, transitionName) };
					animationTransition.duration && (animationTransition.duration = /* @__PURE__ */ secondsToMilliseconds(animationTransition.duration));
					animationTransition = applyGeneratorOptions(animationTransition);
					const easing = mapEasingToNativeEasing(animationTransition.ease, animationTransition.duration);
					effect.updateTiming({
						delay: /* @__PURE__ */ secondsToMilliseconds(animationTransition.delay ?? 0),
						duration: animationTransition.duration,
						easing
					});
					animations$1.push(new NativeAnimationWrapper(animation));
				} else if (hasOpacity(targetDefinition, "enter") && hasOpacity(targetDefinition, "exit") && effect.getKeyframes().some((keyframe) => keyframe.mixBlendMode)) animations$1.push(new NativeAnimationWrapper(animation));
				else animation.cancel();
			}
			resolve(new GroupAnimation(animations$1));
		});
	});
}
function hasOpacity(target, key) {
	return target?.[key]?.keyframes.opacity;
}
let builders = [];
let current = null;
function next() {
	current = null;
	const [nextBuilder] = builders;
	if (nextBuilder) start(nextBuilder);
}
function start(builder) {
	removeItem(builders, builder);
	current = builder;
	startViewAnimation(builder).then((animation) => {
		builder.notifyReady(animation);
		animation.finished.finally(next);
	});
}
function processQueue() {
	for (let i = builders.length - 1; i >= 0; i--) {
		const builder = builders[i];
		const { interrupt } = builder.options;
		if (interrupt === "immediate") {
			const batchedUpdates = builders.slice(0, i + 1).map((b) => b.update);
			const remaining = builders.slice(i + 1);
			builder.update = () => {
				batchedUpdates.forEach((update) => update());
			};
			builders = [builder, ...remaining];
			break;
		}
	}
	if (!current || builders[0]?.options.interrupt === "immediate") next();
}
function addToQueue(builder) {
	builders.push(builder);
	microtask.render(processQueue);
}
var ViewTransitionBuilder = class {
	constructor(update, options = {}) {
		this.currentSubject = "root";
		this.targets = /* @__PURE__ */ new Map();
		this.notifyReady = noop;
		this.readyPromise = new Promise((resolve) => {
			this.notifyReady = resolve;
		});
		this.update = update;
		this.options = {
			interrupt: "wait",
			...options
		};
		addToQueue(this);
	}
	get(subject) {
		this.currentSubject = subject;
		return this;
	}
	layout(keyframes$1, options) {
		this.updateTarget("layout", keyframes$1, options);
		return this;
	}
	new(keyframes$1, options) {
		this.updateTarget("new", keyframes$1, options);
		return this;
	}
	old(keyframes$1, options) {
		this.updateTarget("old", keyframes$1, options);
		return this;
	}
	enter(keyframes$1, options) {
		this.updateTarget("enter", keyframes$1, options);
		return this;
	}
	exit(keyframes$1, options) {
		this.updateTarget("exit", keyframes$1, options);
		return this;
	}
	crossfade(options) {
		this.updateTarget("enter", { opacity: 1 }, options);
		this.updateTarget("exit", { opacity: 0 }, options);
		return this;
	}
	updateTarget(target, keyframes$1, options = {}) {
		const { currentSubject, targets } = this;
		if (!targets.has(currentSubject)) targets.set(currentSubject, {});
		const targetData = targets.get(currentSubject);
		targetData[target] = {
			keyframes: keyframes$1,
			options
		};
	}
	then(resolve, reject) {
		return this.readyPromise.then(resolve, reject);
	}
};
function animateView(update, defaultOptions = {}) {
	return new ViewTransitionBuilder(update, defaultOptions);
}
const sync = frame;
const cancelSync = stepsOrder.reduce((acc, key) => {
	acc[key] = (process) => cancelFrame(process);
	return acc;
}, {});
const MotionConfigContext = (0, import_react.createContext)({
	transformPagePoint: (p) => p,
	isStatic: false,
	reducedMotion: "never"
});
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var PopChildMeasure = class extends import_react.Component {
	getSnapshotBeforeUpdate(prevProps) {
		const element = this.props.childRef.current;
		if (element && prevProps.isPresent && !this.props.isPresent) {
			const parent = element.offsetParent;
			const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
			const size = this.props.sizeRef.current;
			size.height = element.offsetHeight || 0;
			size.width = element.offsetWidth || 0;
			size.top = element.offsetTop;
			size.left = element.offsetLeft;
			size.right = parentWidth - size.width - size.left;
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children, isPresent: isPresent$1, anchorX, root }) {
	const id$3 = (0, import_react.useId)();
	const ref = (0, import_react.useRef)(null);
	const size = (0, import_react.useRef)({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0
	});
	const { nonce } = (0, import_react.useContext)(MotionConfigContext);
	(0, import_react.useInsertionEffect)(() => {
		const { width, height, top, left, right } = size.current;
		if (isPresent$1 || !ref.current || !width || !height) return;
		const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
		ref.current.dataset.motionPopId = id$3;
		const style$1 = document.createElement("style");
		if (nonce) style$1.nonce = nonce;
		const parent = root ?? document.head;
		parent.appendChild(style$1);
		if (style$1.sheet) style$1.sheet.insertRule(`
          [data-motion-pop-id="${id$3}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            top: ${top}px !important;
          }
        `);
		return () => {
			if (parent.contains(style$1)) parent.removeChild(style$1);
		};
	}, [isPresent$1]);
	return (0, import_jsx_runtime.jsx)(PopChildMeasure, {
		isPresent: isPresent$1,
		childRef: ref,
		sizeRef: size,
		children: import_react.cloneElement(children, { ref })
	});
}
const PresenceChild = ({ children, initial, isPresent: isPresent$1, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, root }) => {
	const presenceChildren = useConstant(newChildrenMap);
	const id$3 = (0, import_react.useId)();
	let isReusedContext = true;
	let context = (0, import_react.useMemo)(() => {
		isReusedContext = false;
		return {
			id: id$3,
			initial,
			isPresent: isPresent$1,
			custom,
			onExitComplete: (childId) => {
				presenceChildren.set(childId, true);
				for (const isComplete of presenceChildren.values()) if (!isComplete) return;
				onExitComplete && onExitComplete();
			},
			register: (childId) => {
				presenceChildren.set(childId, false);
				return () => presenceChildren.delete(childId);
			}
		};
	}, [
		isPresent$1,
		presenceChildren,
		onExitComplete
	]);
	if (presenceAffectsLayout && isReusedContext) context = { ...context };
	(0, import_react.useMemo)(() => {
		presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
	}, [isPresent$1]);
	import_react.useEffect(() => {
		!isPresent$1 && !presenceChildren.size && onExitComplete && onExitComplete();
	}, [isPresent$1]);
	if (mode === "popLayout") children = (0, import_jsx_runtime.jsx)(PopChild, {
		isPresent: isPresent$1,
		anchorX,
		root,
		children
	});
	return (0, import_jsx_runtime.jsx)(PresenceContext.Provider, {
		value: context,
		children
	});
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
function usePresence(subscribe = true) {
	const context = (0, import_react.useContext)(PresenceContext);
	if (context === null) return [true, null];
	const { isPresent: isPresent$1, onExitComplete, register } = context;
	const id$3 = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		if (subscribe) return register(id$3);
	}, [subscribe]);
	const safeToRemove = (0, import_react.useCallback)(() => subscribe && onExitComplete && onExitComplete(id$3), [
		id$3,
		onExitComplete,
		subscribe
	]);
	return !isPresent$1 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
	return isPresent((0, import_react.useContext)(PresenceContext));
}
function isPresent(context) {
	return context === null ? true : context.isPresent;
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
	const filtered = [];
	import_react.Children.forEach(children, (child) => {
		if ((0, import_react.isValidElement)(child)) filtered.push(child);
	});
	return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", root }) => {
	const [isParentPresent, safeToRemove] = usePresence(propagate);
	const presentChildren = (0, import_react.useMemo)(() => onlyElements(children), [children]);
	const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
	const isInitialRender = (0, import_react.useRef)(true);
	const pendingPresentChildren = (0, import_react.useRef)(presentChildren);
	const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
	const [diffedChildren, setDiffedChildren] = (0, import_react.useState)(presentChildren);
	const [renderedChildren, setRenderedChildren] = (0, import_react.useState)(presentChildren);
	useIsomorphicLayoutEffect(() => {
		isInitialRender.current = false;
		pendingPresentChildren.current = presentChildren;
		for (let i = 0; i < renderedChildren.length; i++) {
			const key = getChildKey(renderedChildren[i]);
			if (!presentKeys.includes(key)) {
				if (exitComplete.get(key) !== true) exitComplete.set(key, false);
			} else exitComplete.delete(key);
		}
	}, [
		renderedChildren,
		presentKeys.length,
		presentKeys.join("-")
	]);
	const exitingChildren = [];
	if (presentChildren !== diffedChildren) {
		let nextChildren = [...presentChildren];
		for (let i = 0; i < renderedChildren.length; i++) {
			const child = renderedChildren[i];
			const key = getChildKey(child);
			if (!presentKeys.includes(key)) {
				nextChildren.splice(i, 0, child);
				exitingChildren.push(child);
			}
		}
		if (mode === "wait" && exitingChildren.length) nextChildren = exitingChildren;
		setRenderedChildren(onlyElements(nextChildren));
		setDiffedChildren(presentChildren);
		return null;
	}
	const { forceRender } = (0, import_react.useContext)(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderedChildren.map((child) => {
		const key = getChildKey(child);
		const isPresent$1 = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
		const onExit = () => {
			if (exitComplete.has(key)) exitComplete.set(key, true);
			else return;
			let isEveryExitComplete = true;
			exitComplete.forEach((isExitComplete) => {
				if (!isExitComplete) isEveryExitComplete = false;
			});
			if (isEveryExitComplete) {
				forceRender?.();
				setRenderedChildren(pendingPresentChildren.current);
				propagate && safeToRemove?.();
				onExitComplete && onExitComplete();
			}
		};
		return (0, import_jsx_runtime.jsx)(PresenceChild, {
			isPresent: isPresent$1,
			initial: !isInitialRender.current || initial ? void 0 : false,
			custom,
			presenceAffectsLayout,
			mode,
			root,
			onExitComplete: isPresent$1 ? void 0 : onExit,
			anchorX,
			children: child
		}, key);
	}) });
};
const DeprecatedLayoutGroupContext = (0, import_react.createContext)(null);
function useIsMounted() {
	const isMounted = (0, import_react.useRef)(false);
	useIsomorphicLayoutEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return isMounted;
}
function useForceUpdate() {
	const isMounted = useIsMounted();
	const [forcedRenderCount, setForcedRenderCount] = (0, import_react.useState)(0);
	const forceRender = (0, import_react.useCallback)(() => {
		isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
	}, [forcedRenderCount]);
	const deferredForceRender = (0, import_react.useCallback)(() => frame.postRender(forceRender), [forceRender]);
	return [deferredForceRender, forcedRenderCount];
}
const notify = (node) => !node.isLayoutDirty && node.willUpdate(false);
function nodeGroup() {
	const nodes = /* @__PURE__ */ new Set();
	const subscriptions = /* @__PURE__ */ new WeakMap();
	const dirtyAll = () => nodes.forEach(notify);
	return {
		add: (node) => {
			nodes.add(node);
			subscriptions.set(node, node.addEventListener("willUpdate", dirtyAll));
		},
		remove: (node) => {
			nodes.delete(node);
			const unsubscribe = subscriptions.get(node);
			if (unsubscribe) {
				unsubscribe();
				subscriptions.delete(node);
			}
			dirtyAll();
		},
		dirty: dirtyAll
	};
}
const shouldInheritGroup = (inherit) => inherit === true;
const shouldInheritId = (inherit) => shouldInheritGroup(inherit === true) || inherit === "id";
const LayoutGroup = ({ children, id: id$3, inherit = true }) => {
	const layoutGroupContext = (0, import_react.useContext)(LayoutGroupContext);
	const deprecatedLayoutGroupContext = (0, import_react.useContext)(DeprecatedLayoutGroupContext);
	const [forceRender, key] = useForceUpdate();
	const context = (0, import_react.useRef)(null);
	const upstreamId = layoutGroupContext.id || deprecatedLayoutGroupContext;
	if (context.current === null) {
		if (shouldInheritId(inherit) && upstreamId) id$3 = id$3 ? upstreamId + "-" + id$3 : upstreamId;
		context.current = {
			id: id$3,
			group: shouldInheritGroup(inherit) ? layoutGroupContext.group || nodeGroup() : nodeGroup()
		};
	}
	const memoizedContext = (0, import_react.useMemo)(() => ({
		...context.current,
		forceRender
	}), [key]);
	return (0, import_jsx_runtime.jsx)(LayoutGroupContext.Provider, {
		value: memoizedContext,
		children
	});
};
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
function LazyMotion({ children, features, strict = false }) {
	const [, setIsLoaded] = (0, import_react.useState)(!isLazyBundle(features));
	const loadedRenderer = (0, import_react.useRef)(void 0);
	if (!isLazyBundle(features)) {
		const { renderer,...loadedFeatures } = features;
		loadedRenderer.current = renderer;
		loadFeatures(loadedFeatures);
	}
	(0, import_react.useEffect)(() => {
		if (isLazyBundle(features)) features().then(({ renderer,...loadedFeatures }) => {
			loadFeatures(loadedFeatures);
			loadedRenderer.current = renderer;
			setIsLoaded(true);
		});
	}, []);
	return (0, import_jsx_runtime.jsx)(LazyContext.Provider, {
		value: {
			renderer: loadedRenderer.current,
			strict
		},
		children
	});
}
function isLazyBundle(features) {
	return typeof features === "function";
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
let shouldForward = (key) => !isValidMotionProp(key);
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
function MotionConfig({ children, isValidProp,...config }) {
	isValidProp && loadExternalIsValidProp(isValidProp);
	config = {
		...(0, import_react.useContext)(MotionConfigContext),
		...config
	};
	config.isStatic = useConstant(() => config.isStatic);
	const context = (0, import_react.useMemo)(() => config, [
		JSON.stringify(config.transition),
		config.transformPagePoint,
		config.reducedMotion
	]);
	return (0, import_jsx_runtime.jsx)(MotionConfigContext.Provider, {
		value: context,
		children
	});
}
const MotionContext = /* @__PURE__ */ (0, import_react.createContext)({});
function isAnimationControls(v) {
	return v !== null && typeof v === "object" && typeof v.start === "function";
}
function isVariantLabel(v) {
	return typeof v === "string" || Array.isArray(v);
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
		const { initial, animate: animate$1 } = props;
		return {
			initial: initial === false || isVariantLabel(initial) ? initial : void 0,
			animate: isVariantLabel(animate$1) ? animate$1 : void 0
		};
	}
	return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
	const { initial, animate: animate$1 } = getCurrentTreeVariants(props, (0, import_react.useContext)(MotionContext));
	return (0, import_react.useMemo)(() => ({
		initial,
		animate: animate$1
	}), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate$1)]);
}
function variantLabelsAsDependency(prop) {
	return Array.isArray(prop) ? prop.join(" ") : prop;
}
const scaleCorrectors = {};
function addScaleCorrector(correctors) {
	for (const key in correctors) {
		scaleCorrectors[key] = correctors[key];
		if (isCSSVariableName(key)) scaleCorrectors[key].isCSSVariable = true;
	}
}
function isForcedMotionValue(key, { layout: layout$1, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout$1 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
const translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform$1, transformTemplate) {
	let transformString = "";
	let transformIsDefault = true;
	for (let i = 0; i < numTransforms; i++) {
		const key = transformPropOrder[i];
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
			if (transformTemplate) transform$1[key] = valueAsType;
		}
	}
	transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform$1, transformIsDefault ? "" : transformString);
	else if (transformIsDefault) transformString = "none";
	return transformString;
}
function buildHTMLStyles(state, latestValues, transformTemplate) {
	const { style: style$1, vars, transformOrigin } = state;
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
			} else style$1[key] = valueAsType;
		}
	}
	if (!latestValues.transform) {
		if (hasTransform$1 || transformTemplate) style$1.transform = buildTransform(latestValues, state.transform, transformTemplate);
		else if (style$1.transform) style$1.transform = "none";
	}
	if (hasTransformOrigin) {
		const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
		style$1.transformOrigin = `${originX} ${originY} ${originZ}`;
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
	const style$1 = {};
	copyRawValuesOnly(style$1, styleProp, props);
	Object.assign(style$1, useInitialMotionValues(props, visualState));
	return style$1;
}
function useHTMLProps(props, visualState) {
	const htmlProps = {};
	const style$1 = useStyle(props, visualState);
	if (props.drag && props.dragListener !== false) {
		htmlProps.draggable = false;
		style$1.userSelect = style$1.WebkitUserSelect = style$1.WebkitTouchCallout = "none";
		style$1.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
	}
	if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) htmlProps.tabIndex = 0;
	htmlProps.style = style$1;
	return htmlProps;
}
const dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
const camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys$1 = useDashCase ? dashKeys : camelKeys;
	attrs[keys$1.offset] = px.transform(-offset);
	const pathLength = px.transform(length);
	const pathSpacing = px.transform(spacing);
	attrs[keys$1.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0,...latest }, isSVGTag$1, transformTemplate, styleProp) {
	buildHTMLStyles(state, latest, transformTemplate);
	if (isSVGTag$1) {
		if (state.style.viewBox) state.attrs.viewBox = state.style.viewBox;
		return;
	}
	state.attrs = state.style;
	state.style = {};
	const { attrs, style: style$1 } = state;
	if (attrs.transform) {
		style$1.transform = attrs.transform;
		delete attrs.transform;
	}
	if (style$1.transform || attrs.transformOrigin) {
		style$1.transformOrigin = attrs.transformOrigin ?? "50% 50%";
		delete attrs.transformOrigin;
	}
	if (style$1.transform) {
		style$1.transformBox = styleProp?.transformBox ?? "fill-box";
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
function useRender(Component$1, props, ref, { latestValues }, isStatic, forwardMotionProps = false) {
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
		const [current$1, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current$1, velocity);
	}
	if (typeof definition === "string") definition = props.variants && props.variants[definition];
	if (typeof definition === "function") {
		const [current$1, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current$1, velocity);
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
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
	const values = {};
	const motionValues = scrapeMotionValues(props, {});
	for (const key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
	let { initial, animate: animate$1 } = props;
	const isControllingVariants$1 = isControllingVariants(props);
	const isVariantNode$1 = isVariantNode(props);
	if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
		if (initial === void 0) initial = context.initial;
		if (animate$1 === void 0) animate$1 = context.animate;
	}
	let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
	isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
	const variantToSet = isInitialAnimationBlocked ? animate$1 : initial;
	if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
		const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
		for (let i = 0; i < list.length; i++) {
			const resolved = resolveVariantFromProps(props, list[i]);
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
const makeUseVisualState = (config) => (props, isStatic) => {
	const context = (0, import_react.useContext)(MotionContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const make = () => makeState(config, props, context, presenceContext);
	return isStatic ? make() : useConstant(make);
};
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
	const { style: style$1 } = props;
	const newValues = {};
	for (const key in style$1) if (isMotionValue(style$1[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) newValues[key] = style$1[key];
	return newValues;
}
const useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
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
const useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
});
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
function createMotionComponent(Component$1, { forwardMotionProps = false } = {}, preloadedFeatures, createVisualElement) {
	preloadedFeatures && loadFeatures(preloadedFeatures);
	const useVisualState$1 = isSVGComponent(Component$1) ? useSVGVisualState : useHTMLVisualState;
	function MotionDOMComponent(props, externalRef) {
		let MeasureLayout$1;
		const configAndProps = {
			...(0, import_react.useContext)(MotionConfigContext),
			...props,
			layoutId: useLayoutId(props)
		};
		const { isStatic } = configAndProps;
		const context = useCreateMotionContext(props);
		const visualState = useVisualState$1(props, isStatic);
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
const m = /* @__PURE__ */ createMotionProxy();
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
function transformBoxPoints(point$1, transformPoint$1) {
	if (!transformPoint$1) return point$1;
	const topLeft = transformPoint$1({
		x: point$1.left,
		y: point$1.top
	});
	const bottomRight = transformPoint$1({
		x: point$1.right,
		y: point$1.bottom
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
function scalePoint(point$1, scale$1, originPoint) {
	const distanceFromOrigin = point$1 - originPoint;
	const scaled = scale$1 * distanceFromOrigin;
	return originPoint + scaled;
}
function applyPointDelta(point$1, translate, scale$1, originPoint, boxScale) {
	if (boxScale !== void 0) point$1 = scalePoint(point$1, boxScale, originPoint);
	return scalePoint(point$1, scale$1, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale$1 = 1, originPoint, boxScale) {
	axis.min = applyPointDelta(axis.min, translate, scale$1, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale$1, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
	applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
	applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = .999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
	const treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	let node;
	let delta;
	for (let i = 0; i < treeLength; i++) {
		node = treePath[i];
		delta = node.projectionDelta;
		const { visualElement } = node.options;
		if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") continue;
		if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(box, {
			x: -node.scroll.offset.x,
			y: -node.scroll.offset.y
		});
		if (delta) {
			treeScale.x *= delta.x.scale;
			treeScale.y *= delta.y.scale;
			applyBoxDelta(box, delta);
		}
		if (isSharedTransition && hasTransform(node.latestValues)) transformBox(box, node.latestValues);
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
function transformBox(box, transform$1) {
	transformAxis(box.x, transform$1.x, transform$1.scaleX, transform$1.scale, transform$1.originX);
	transformAxis(box.y, transform$1.y, transform$1.scaleY, transform$1.scale, transform$1.originY);
}
function measureViewportBox(instance, transformPoint$1) {
	return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint$1));
}
function measurePageBox(element, rootProjectionNode$1, transformPagePoint) {
	const viewportBox = measureViewportBox(element, transformPagePoint);
	const { scroll: scroll$1 } = rootProjectionNode$1;
	if (scroll$1) {
		translateAxis(viewportBox.x, scroll$1.offset.x);
		translateAxis(viewportBox.y, scroll$1.offset.y);
	}
	return viewportBox;
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
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
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
const visualElementStore = /* @__PURE__ */ new WeakMap();
function updateMotionValuesFromProps(element, next$1, prev) {
	for (const key in next$1) {
		const nextValue = next$1[key];
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
	for (const key in prev) if (next$1[key] === void 0) element.removeValue(key);
	return next$1;
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
		for (let i = 0; i < propEventHandlers.length; i++) {
			const key = propEventHandlers[i];
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
	scheduleRenderMicrotask() {
		microtask.render(this.render);
	}
};
var DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(a, b) {
		return a.compareDocumentPosition(b) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(props, key) {
		return props.style ? props.style[key] : void 0;
	}
	removeValueFromRenderState(key, { vars, style: style$1 }) {
		delete vars[key];
		delete style$1[key];
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
function renderHTML(element, { style: style$1, vars }, styleProp, projection) {
	const elementStyle = element.style;
	let key;
	for (key in style$1) elementStyle[key] = style$1[key];
	projection?.applyProjectionStyles(elementStyle, styleProp);
	for (key in vars) elementStyle.setProperty(key, vars[key]);
}
function getComputedStyle$2(element) {
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
			const computedStyle = getComputedStyle$2(instance);
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
function resolveVariant(visualElement, definition, custom) {
	const props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}
const isKeyframesTarget = (v) => {
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
const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes$1, { repeat, repeatType = "loop" }, finalKeyframe) {
	const resolvedKeyframes = keyframes$1.filter(isNotNull);
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
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed,...transition }) {
	return !!Object.keys(transition).length;
}
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
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
	const index = Array.from(children).sort((a, b) => a.sortNodePosition(b)).indexOf(child);
	const numChildren = children.size;
	const maxStaggerDuration = (numChildren - 1) * staggerChildren;
	const delayIsFunction = typeof delayChildren === "function";
	return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
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
function shallowCompare(next$1, prev) {
	if (!Array.isArray(prev)) return false;
	const prevLength = prev.length;
	if (prevLength !== next$1.length) return false;
	for (let i = 0; i < prevLength; i++) if (prev[i] !== next$1[i]) return false;
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
	for (let i = 0; i < numVariantProps; i++) {
		const name = variantProps[i];
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
	let animate$1 = animateList(visualElement);
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
		animate$1 = makeAnimator(visualElement);
	}
	function animateChanges(changedActiveType) {
		const { props } = visualElement;
		const context = getVariantContext(visualElement.parent) || {};
		const animations$1 = [];
		const removedKeys = /* @__PURE__ */ new Set();
		let encounteredKeys = {};
		let removedVariantIndex = Infinity;
		for (let i = 0; i < numAnimationTypes; i++) {
			const type = reversePriorityOrder[i];
			const typeState = state[type];
			const prop = props[type] !== void 0 ? props[type] : context[type];
			const propIsVariant = isVariantLabel(prop);
			const activeDelta = type === changedActiveType ? typeState.isActive : null;
			if (activeDelta === false) removedVariantIndex = i;
			let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
			if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) isInherited = false;
			typeState.protectedKeys = { ...encounteredKeys };
			if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") continue;
			const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
			let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
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
				const prev = prevResolvedValues[key];
				if (encounteredKeys.hasOwnProperty(key)) continue;
				let valueHasChanged = false;
				if (isKeyframesTarget(next$1) && isKeyframesTarget(prev)) valueHasChanged = !shallowCompare(next$1, prev);
				else valueHasChanged = next$1 !== prev;
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
			if (shouldAnimateType && needsAnimating) animations$1.push(...definitionList.map((animation) => {
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
		return shouldAnimate ? animate$1(animations$1) : Promise.resolve();
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
function checkVariantsDidChange(prev, next$1) {
	if (typeof next$1 === "string") return next$1 !== prev;
	else if (Array.isArray(next$1)) return !shallowCompare(next$1, prev);
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
		const { animate: animate$1 } = this.node.getProps();
		if (isAnimationControls(animate$1)) this.unmountControls = animate$1.subscribe(this.node);
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		const { animate: animate$1 } = this.node.getProps();
		const { animate: prevAnimate } = this.node.prevProps || {};
		if (animate$1 !== prevAnimate) this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset();
		this.unmountControls?.();
	}
};
let id$2 = 0;
var ExitAnimationFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.id = id$2++;
	}
	update() {
		if (!this.node.presenceContext) return;
		const { isPresent: isPresent$1, onExitComplete } = this.node.presenceContext;
		const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
		if (!this.node.animationState || isPresent$1 === prevIsPresent) return;
		const exitAnimation = this.node.animationState.setActive("exit", !isPresent$1);
		if (onExitComplete && !isPresent$1) exitAnimation.then(() => {
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
function eachAxis(callback) {
	return [callback("x"), callback("y")];
}
const getContextWindow = ({ current: current$1 }) => {
	return current$1 ? current$1.ownerDocument.defaultView : null;
};
const distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
	const xDelta = distance(a.x, b.x);
	const yDelta = distance(a.y, b.y);
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
			const info$1 = getPanInfo(this.lastMoveEventInfo, this.history);
			const isPanStarted = this.startEvent !== null;
			const isDistancePastThreshold = distance2D(info$1.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!isPanStarted && !isDistancePastThreshold) return;
			const { point: point$2 } = info$1;
			const { timestamp: timestamp$1 } = frameData;
			this.history.push({
				...point$2,
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
		this.distanceThreshold = distanceThreshold;
		this.contextWindow = contextWindow || window;
		const info = extractEventInfo(event);
		const initialInfo = transformPoint(info, this.transformPagePoint);
		const { point: point$1 } = initialInfo;
		const { timestamp } = frameData;
		this.history = [{
			...point$1,
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
function subtractPoint(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
function getPanInfo({ point: point$1 }, history) {
	return {
		point: point$1,
		delta: subtractPoint(point$1, lastDevicePoint(history)),
		offset: subtractPoint(point$1, startDevicePoint(history)),
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
	let i = history.length - 1;
	let timestampedPoint = null;
	const lastPoint = lastDevicePoint(history);
	while (i >= 0) {
		timestampedPoint = history[i];
		if (lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta)) break;
		i--;
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
function applyConstraints(point$1, { min, max }, elastic) {
	if (min !== void 0 && point$1 < min) point$1 = elastic ? mixNumber(min, point$1, elastic.min) : Math.max(point$1, min);
	else if (max !== void 0 && point$1 > max) point$1 = elastic ? mixNumber(max, point$1, elastic.max) : Math.min(point$1, max);
	return point$1;
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
				let current$1 = this.getAxisMotionValue(axis).get() || 0;
				if (percent.test(current$1)) {
					const { projection } = this.visualElement;
					if (projection && projection.layout) {
						const measuredAxis = projection.layout.layoutBox[axis];
						if (measuredAxis) {
							const length = calcLength(measuredAxis);
							current$1 = length * (parseFloat(current$1) / 100);
						}
					}
				}
				this.originPoint[axis] = current$1;
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
	snapToCursor(point$1) {
		eachAxis((axis) => {
			const { drag: drag$1 } = this.getProps();
			if (!shouldDrag(axis, drag$1, this.currentDirection)) return;
			const { projection } = this.visualElement;
			const axisValue = this.getAxisMotionValue(axis);
			if (projection && projection.layout) {
				const { min, max } = projection.layout.layoutBox[axis];
				axisValue.set(point$1[axis] - mixNumber(min, max, .5));
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
const correctBorderRadius = { correct: (latest, node) => {
	if (!node.target) return latest;
	if (typeof latest === "string") if (px.test(latest)) latest = parseFloat(latest);
	else return latest;
	const x = pixelsToPercent(latest, node.target.x);
	const y = pixelsToPercent(latest, node.target.y);
	return `${x}% ${y}%`;
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
let hasTakenAnySnapshot = false;
var MeasureLayoutWithContext = class extends import_react.Component {
	componentDidMount() {
		const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
		const { projection } = visualElement;
		addScaleCorrector(defaultScaleCorrectors);
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
		const { layoutDependency, visualElement, drag: drag$1, isPresent: isPresent$1 } = this.props;
		const { projection } = visualElement;
		if (!projection) return null;
		projection.isPresent = isPresent$1;
		hasTakenAnySnapshot = true;
		if (drag$1 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent$1) projection.willUpdate();
		else this.safeToRemove();
		if (prevProps.isPresent !== isPresent$1) {
			if (isPresent$1) projection.promote();
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
	const [isPresent$1, safeToRemove] = usePresence();
	const layoutGroup = (0, import_react.useContext)(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(MeasureLayoutWithContext, {
		...props,
		layoutGroup,
		switchLayoutGroup: (0, import_react.useContext)(SwitchLayoutGroupContext),
		isPresent: isPresent$1,
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
const compareByDepth = (a, b) => a.depth - b.depth;
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
	const start$1 = time.now();
	const checkElapsed = ({ timestamp }) => {
		const elapsed = timestamp - start$1;
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
	for (let i = 0; i < numBorders; i++) {
		const borderLabel = `border${borders[i]}Radius`;
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
function copyBoxInto(box, originBox) {
	copyAxisInto(box.x, originBox.x);
	copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
	delta.translate = originDelta.translate;
	delta.scale = originDelta.scale;
	delta.originPoint = originDelta.originPoint;
	delta.origin = originDelta.origin;
}
function removePointDelta(point$1, translate, scale$1, originPoint, boxScale) {
	point$1 -= translate;
	point$1 = scalePoint(point$1, 1 / scale$1, originPoint);
	if (boxScale !== void 0) point$1 = scalePoint(point$1, 1 / boxScale, originPoint);
	return point$1;
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
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
	removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
	removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
function isAxisDeltaZero(delta) {
	return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
	return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
	return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
	return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
	return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
	return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
	return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
	return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
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
		for (let i = indexOfNode; i >= 0; i--) {
			const member = this.members[i];
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
	let transform$1 = "";
	const xTranslate = delta.x.translate / treeScale.x;
	const yTranslate = delta.y.translate / treeScale.y;
	const zTranslate = latestTransform?.z || 0;
	if (xTranslate || yTranslate || zTranslate) transform$1 = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
	if (treeScale.x !== 1 || treeScale.y !== 1) transform$1 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
	if (latestTransform) {
		const { transformPerspective, rotate: rotate$1, rotateX, rotateY, skewX, skewY } = latestTransform;
		if (transformPerspective) transform$1 = `perspective(${transformPerspective}px) ${transform$1}`;
		if (rotate$1) transform$1 += `rotate(${rotate$1}deg) `;
		if (rotateX) transform$1 += `rotateX(${rotateX}deg) `;
		if (rotateY) transform$1 += `rotateY(${rotateY}deg) `;
		if (skewX) transform$1 += `skewX(${skewX}deg) `;
		if (skewY) transform$1 += `skewY(${skewY}deg) `;
	}
	const elementScaleX = delta.x.scale * treeScale.x;
	const elementScaleY = delta.y.scale * treeScale.y;
	if (elementScaleX !== 1 || elementScaleY !== 1) transform$1 += `scale(${elementScaleX}, ${elementScaleY})`;
	return transform$1 || "none";
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
const animationTarget = 1e3;
let id$1 = 0;
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
			this.id = id$1++;
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
			for (let i = 0; i < this.path.length; i++) this.path[i].shouldResetTransform = true;
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
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
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
			const updateWasBlocked = this.isUpdateBlocked();
			if (updateWasBlocked) {
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
			if (this.resumeFrom && !this.resumeFrom.instance) for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				node.updateScroll();
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
			const box = visualElement.measureViewportBox();
			const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
			if (!wasInScrollRoot) {
				const { scroll: scroll$1 } = this.root;
				if (scroll$1) {
					translateAxis(box.x, scroll$1.offset.x);
					translateAxis(box.y, scroll$1.offset.y);
				}
			}
			return box;
		}
		removeElementScroll(box) {
			const boxWithoutScroll = createBox();
			copyBoxInto(boxWithoutScroll, box);
			if (this.scroll?.wasRoot) return boxWithoutScroll;
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				const { scroll: scroll$1, options } = node;
				if (node !== this.root && scroll$1 && options.layoutScroll) {
					if (scroll$1.wasRoot) copyBoxInto(boxWithoutScroll, box);
					translateAxis(boxWithoutScroll.x, scroll$1.offset.x);
					translateAxis(boxWithoutScroll.y, scroll$1.offset.y);
				}
			}
			return boxWithoutScroll;
		}
		applyTransform(box, transformOnly = false) {
			const withTransforms = createBox();
			copyBoxInto(withTransforms, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
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
		removeTransform(box) {
			const boxWithoutTransform = createBox();
			copyBoxInto(boxWithoutTransform, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!node.instance) continue;
				if (!hasTransform(node.latestValues)) continue;
				hasScale(node.latestValues) && node.updateSnapshot();
				const sourceBox = createBox();
				const nodeBox = node.measurePageBox();
				copyBoxInto(sourceBox, nodeBox);
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
		scheduleRender(notifyAll$1 = true) {
			this.options.visualElement?.scheduleRender();
			if (notifyAll$1) {
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
			const stack = this.sharedNodes.get(layoutId);
			stack.add(node);
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
			for (let i = 0; i < transformAxes.length; i++) {
				resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
				resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
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
			let transform$1 = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
			if (transformTemplate) transform$1 = transformTemplate(valuesToRender, transform$1);
			targetStyle.transform = transform$1;
			const { x, y } = this.projectionDelta;
			targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
			if (lead.animationValues) targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
			else targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
			for (const key in scaleCorrectors) {
				if (valuesToRender[key] === void 0) continue;
				const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
				const corrected = transform$1 === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
				if (applyTo) {
					const num = applyTo.length;
					for (let i = 0; i < num; i++) targetStyle[applyTo[i]] = corrected;
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
function roundBox(box) {
	roundAxis(box.x);
	roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout$1) {
	return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout$1), .2);
}
function checkNodeWasScrollRoot(node) {
	return node !== node.root && node.scroll?.wasRoot;
}
const DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (ref, notify$1) => addDomEvent(ref, "resize", notify$1),
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
function handleHoverEvent(node, event, lifecycle) {
	const { props } = node;
	if (node.animationState && props.whileHover) node.animationState.setActive("whileHover", lifecycle === "Start");
	const eventName = "onHover" + lifecycle;
	const callback = props[eventName];
	if (callback) frame.postRender(() => callback(event, extractEventInfo(event)));
}
var HoverGesture = class extends Feature {
	mount() {
		const { current: current$1 } = this.node;
		if (!current$1) return;
		this.unmount = hover(current$1, (_element, startEvent) => {
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
		} catch (e) {
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
	const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
	const callback = props[eventName];
	if (callback) frame.postRender(() => callback(event, extractEventInfo(event)));
}
var PressGesture = class extends Feature {
	mount() {
		const { current: current$1 } = this.node;
		if (!current$1) return;
		this.unmount = press(current$1, (_element, startEvent) => {
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
const featureBundle = {
	...animations,
	...gestureAnimations,
	...drag,
	...layout
};
const motion = /* @__PURE__ */ createMotionProxy(featureBundle, createDomVisualElement);
function useUnmountEffect(callback) {
	return (0, import_react.useEffect)(() => () => callback(), []);
}
const domAnimation = {
	renderer: createDomVisualElement,
	...animations,
	...gestureAnimations
};
const domMax = {
	...domAnimation,
	...drag,
	...layout
};
const domMin = {
	renderer: createDomVisualElement,
	...animations
};
function useMotionValueEvent(value, event, callback) {
	(0, import_react.useInsertionEffect)(() => value.on(event, callback), [
		value,
		event,
		callback
	]);
}
const maxElapsed = 50;
const createAxisInfo = () => ({
	current: 0,
	offset: [],
	progress: 0,
	scrollLength: 0,
	targetOffset: 0,
	targetLength: 0,
	containerLength: 0,
	velocity: 0
});
const createScrollInfo = () => ({
	time: 0,
	x: createAxisInfo(),
	y: createAxisInfo()
});
const keys = {
	x: {
		length: "Width",
		position: "Left"
	},
	y: {
		length: "Height",
		position: "Top"
	}
};
function updateAxisInfo(element, axisName, info, time$1) {
	const axis = info[axisName];
	const { length, position } = keys[axisName];
	const prev = axis.current;
	const prevTime = info.time;
	axis.current = element[`scroll${position}`];
	axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
	axis.offset.length = 0;
	axis.offset[0] = 0;
	axis.offset[1] = axis.scrollLength;
	axis.progress = /* @__PURE__ */ progress(0, axis.scrollLength, axis.current);
	const elapsed = time$1 - prevTime;
	axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time$1) {
	updateAxisInfo(element, "x", info, time$1);
	updateAxisInfo(element, "y", info, time$1);
	info.time = time$1;
}
function calcInset(element, container) {
	const inset = {
		x: 0,
		y: 0
	};
	let current$1 = element;
	while (current$1 && current$1 !== container) if (isHTMLElement(current$1)) {
		inset.x += current$1.offsetLeft;
		inset.y += current$1.offsetTop;
		current$1 = current$1.offsetParent;
	} else if (current$1.tagName === "svg") {
		const svgBoundingBox = current$1.getBoundingClientRect();
		current$1 = current$1.parentElement;
		const parentBoundingBox = current$1.getBoundingClientRect();
		inset.x += svgBoundingBox.left - parentBoundingBox.left;
		inset.y += svgBoundingBox.top - parentBoundingBox.top;
	} else if (current$1 instanceof SVGGraphicsElement) {
		const { x, y } = current$1.getBBox();
		inset.x += x;
		inset.y += y;
		let svg = null;
		let parent = current$1.parentNode;
		while (!svg) {
			if (parent.tagName === "svg") svg = parent;
			parent = current$1.parentNode;
		}
		current$1 = svg;
	} else break;
	return inset;
}
const namedEdges = {
	start: 0,
	center: .5,
	end: 1
};
function resolveEdge(edge, length, inset = 0) {
	let delta = 0;
	if (edge in namedEdges) edge = namedEdges[edge];
	if (typeof edge === "string") {
		const asNumber$2 = parseFloat(edge);
		if (edge.endsWith("px")) delta = asNumber$2;
		else if (edge.endsWith("%")) edge = asNumber$2 / 100;
		else if (edge.endsWith("vw")) delta = asNumber$2 / 100 * document.documentElement.clientWidth;
		else if (edge.endsWith("vh")) delta = asNumber$2 / 100 * document.documentElement.clientHeight;
		else edge = asNumber$2;
	}
	if (typeof edge === "number") delta = length * edge;
	return inset + delta;
}
const defaultOffset$1 = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
	let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset$1;
	let targetPoint = 0;
	let containerPoint = 0;
	if (typeof offset === "number") offsetDefinition = [offset, offset];
	else if (typeof offset === "string") {
		offset = offset.trim();
		if (offset.includes(" ")) offsetDefinition = offset.split(" ");
		else offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
	}
	targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
	containerPoint = resolveEdge(offsetDefinition[1], containerLength);
	return targetPoint - containerPoint;
}
const ScrollOffset = {
	Enter: [[0, 1], [1, 1]],
	Exit: [[0, 0], [1, 0]],
	Any: [[1, 0], [0, 1]],
	All: [[0, 0], [1, 1]]
};
const point = {
	x: 0,
	y: 0
};
function getTargetSize(target) {
	return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : {
		width: target.clientWidth,
		height: target.clientHeight
	};
}
function resolveOffsets(container, info, options) {
	const { offset: offsetDefinition = ScrollOffset.All } = options;
	const { target = container, axis = "y" } = options;
	const lengthLabel = axis === "y" ? "height" : "width";
	const inset = target !== container ? calcInset(target, container) : point;
	const targetSize = target === container ? {
		width: container.scrollWidth,
		height: container.scrollHeight
	} : getTargetSize(target);
	const containerSize = {
		width: container.clientWidth,
		height: container.clientHeight
	};
	info[axis].offset.length = 0;
	let hasChanged = !info[axis].interpolate;
	const numOffsets = offsetDefinition.length;
	for (let i = 0; i < numOffsets; i++) {
		const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
		if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) hasChanged = true;
		info[axis].offset[i] = offset;
	}
	if (hasChanged) {
		info[axis].interpolate = interpolate(info[axis].offset, defaultOffset(offsetDefinition), { clamp: false });
		info[axis].interpolatorOffsets = [...info[axis].offset];
	}
	info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
	info.x.targetOffset = 0;
	info.y.targetOffset = 0;
	if (target !== container) {
		let node = target;
		while (node && node !== container) {
			info.x.targetOffset += node.offsetLeft;
			info.y.targetOffset += node.offsetTop;
			node = node.offsetParent;
		}
	}
	info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
	info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
	info.x.containerLength = container.clientWidth;
	info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
	return {
		measure: (time$1) => {
			measure(element, options.target, info);
			updateScrollInfo(element, info, time$1);
			if (options.offset || options.target) resolveOffsets(element, info, options);
		},
		notify: () => onScroll(info)
	};
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement,...options } = {}) {
	if (!container) return noop;
	let containerHandlers = onScrollHandlers.get(container);
	if (!containerHandlers) {
		containerHandlers = /* @__PURE__ */ new Set();
		onScrollHandlers.set(container, containerHandlers);
	}
	const info = createScrollInfo();
	const containerHandler = createOnScrollHandler(container, onScroll, info, options);
	containerHandlers.add(containerHandler);
	if (!scrollListeners.has(container)) {
		const measureAll = () => {
			for (const handler of containerHandlers) handler.measure(frameData.timestamp);
			frame.preUpdate(notifyAll$1);
		};
		const notifyAll$1 = () => {
			for (const handler of containerHandlers) handler.notify();
		};
		const listener$1 = () => frame.read(measureAll);
		scrollListeners.set(container, listener$1);
		const target = getEventTarget(container);
		window.addEventListener("resize", listener$1, { passive: true });
		if (container !== document.documentElement) resizeListeners.set(container, resize(container, listener$1));
		target.addEventListener("scroll", listener$1, { passive: true });
		listener$1();
	}
	const listener = scrollListeners.get(container);
	frame.read(listener, false, true);
	return () => {
		cancelFrame(listener);
		const currentHandlers = onScrollHandlers.get(container);
		if (!currentHandlers) return;
		currentHandlers.delete(containerHandler);
		if (currentHandlers.size) return;
		const scrollListener = scrollListeners.get(container);
		scrollListeners.delete(container);
		if (scrollListener) {
			getEventTarget(container).removeEventListener("scroll", scrollListener);
			resizeListeners.get(container)?.();
			window.removeEventListener("resize", scrollListener);
		}
	};
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
	const currentTime = { value: 0 };
	const cancel = scrollInfo((info) => {
		currentTime.value = info[options.axis].progress * 100;
	}, options);
	return {
		currentTime,
		cancel
	};
}
function getTimeline({ source, container,...options }) {
	const { axis } = options;
	if (source) container = source;
	const containerCache = timelineCache.get(container) ?? /* @__PURE__ */ new Map();
	timelineCache.set(container, containerCache);
	const targetKey = options.target ?? "self";
	const targetCache = containerCache.get(targetKey) ?? {};
	const axisKey = axis + (options.offset ?? []).join(",");
	if (!targetCache[axisKey]) targetCache[axisKey] = !options.target && supportsScrollTimeline() ? new ScrollTimeline({
		source: container,
		axis
	}) : scrollTimelineFallback({
		container,
		...options
	});
	return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
	const timeline = getTimeline(options);
	return animation.attachTimeline({
		timeline: options.target ? void 0 : timeline,
		observe: (valueAnimation) => {
			valueAnimation.pause();
			return observeTimeline((progress$1) => {
				valueAnimation.time = valueAnimation.duration * progress$1;
			}, timeline);
		}
	});
}
function isOnScrollWithInfo(onScroll) {
	return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
	if (isOnScrollWithInfo(onScroll)) return scrollInfo((info) => {
		onScroll(info[options.axis].progress, info);
	}, options);
	else return observeTimeline(onScroll, getTimeline(options));
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement,...options } = {}) {
	if (!container) return noop;
	const optionsWithDefaults = {
		axis,
		container,
		...options
	};
	return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
	scrollX: motionValue(0),
	scrollY: motionValue(0),
	scrollXProgress: motionValue(0),
	scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
	if (!ref) return false;
	return !ref.current;
};
function useScroll({ container, target,...options } = {}) {
	const values = useConstant(createScrollMotionValues);
	const scrollAnimation = (0, import_react.useRef)(null);
	const needsStart = (0, import_react.useRef)(false);
	const start$1 = (0, import_react.useCallback)(() => {
		scrollAnimation.current = scroll((_progress, { x, y }) => {
			values.scrollX.set(x.current);
			values.scrollXProgress.set(x.progress);
			values.scrollY.set(y.current);
			values.scrollYProgress.set(y.progress);
		}, {
			...options,
			container: container?.current || void 0,
			target: target?.current || void 0
		});
		return () => {
			scrollAnimation.current?.();
		};
	}, [
		container,
		target,
		JSON.stringify(options.offset)
	]);
	useIsomorphicLayoutEffect(() => {
		needsStart.current = false;
		if (isRefPending(container) || isRefPending(target)) {
			needsStart.current = true;
			return;
		} else return start$1();
	}, [start$1]);
	(0, import_react.useEffect)(() => {
		if (needsStart.current) {
			invariant(!isRefPending(container), "Container ref is defined but not hydrated", "use-scroll-ref");
			invariant(!isRefPending(target), "Target ref is defined but not hydrated", "use-scroll-ref");
			return start$1();
		} else return;
	}, [start$1]);
	return values;
}
function useElementScroll(ref) {
	return useScroll({ container: ref });
}
function useViewportScroll() {
	return useScroll();
}
function useMotionValue(initial) {
	const value = useConstant(() => motionValue(initial));
	const { isStatic } = (0, import_react.useContext)(MotionConfigContext);
	if (isStatic) {
		const [, setLatest] = (0, import_react.useState)(initial);
		(0, import_react.useEffect)(() => value.on("change", setLatest), []);
	}
	return value;
}
function useCombineMotionValues(values, combineValues) {
	const value = useMotionValue(combineValues());
	const updateValue = () => value.set(combineValues());
	updateValue();
	useIsomorphicLayoutEffect(() => {
		const scheduleUpdate = () => frame.preRender(updateValue, false, true);
		const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
		return () => {
			subscriptions.forEach((unsubscribe) => unsubscribe());
			cancelFrame(updateValue);
		};
	});
	return value;
}
function useMotionTemplate(fragments, ...values) {
	const numFragments = fragments.length;
	function buildValue() {
		let output = ``;
		for (let i = 0; i < numFragments; i++) {
			output += fragments[i];
			const value = values[i];
			if (value) output += isMotionValue(value) ? value.get() : value;
		}
		return output;
	}
	return useCombineMotionValues(values.filter(isMotionValue), buildValue);
}
function useComputed(compute) {
	collectMotionValues.current = [];
	compute();
	const value = useCombineMotionValues(collectMotionValues.current, compute);
	collectMotionValues.current = void 0;
	return value;
}
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
	if (typeof input === "function") return useComputed(input);
	const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
	return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
}
function useListTransform(values, transformer) {
	const latest = useConstant(() => []);
	return useCombineMotionValues(values, () => {
		latest.length = 0;
		const numValues = values.length;
		for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
		return transformer(latest);
	});
}
function useSpring(source, options = {}) {
	const { isStatic } = (0, import_react.useContext)(MotionConfigContext);
	const getFromSource = () => isMotionValue(source) ? source.get() : source;
	if (isStatic) return useTransform(getFromSource);
	const value = useMotionValue(getFromSource());
	(0, import_react.useInsertionEffect)(() => {
		return attachSpring(value, source, options);
	}, [value, JSON.stringify(options)]);
	return value;
}
function useAnimationFrame(callback) {
	const initialTimestamp = (0, import_react.useRef)(0);
	const { isStatic } = (0, import_react.useContext)(MotionConfigContext);
	(0, import_react.useEffect)(() => {
		if (isStatic) return;
		const provideTimeSinceStart = ({ timestamp, delta }) => {
			if (!initialTimestamp.current) initialTimestamp.current = timestamp;
			callback(timestamp - initialTimestamp.current, delta);
		};
		frame.update(provideTimeSinceStart, true);
		return () => cancelFrame(provideTimeSinceStart);
	}, [callback]);
}
function useTime() {
	const time$1 = useMotionValue(0);
	useAnimationFrame((t) => time$1.set(t));
	return time$1;
}
function useVelocity(value) {
	const velocity = useMotionValue(value.getVelocity());
	const updateVelocity = () => {
		const latest = value.getVelocity();
		velocity.set(latest);
		if (latest) frame.update(updateVelocity);
	};
	useMotionValueEvent(value, "change", () => {
		frame.update(updateVelocity, false, true);
	});
	return velocity;
}
var WillChangeMotionValue = class extends MotionValue {
	constructor() {
		super(...arguments);
		this.isEnabled = false;
	}
	add(name) {
		if (transformProps.has(name) || acceleratedValues.has(name)) {
			this.isEnabled = true;
			this.update();
		}
	}
	update() {
		this.set(this.isEnabled ? "transform" : "auto");
	}
};
function useWillChange() {
	return useConstant(() => new WillChangeMotionValue("auto"));
}
function useReducedMotion() {
	!hasReducedMotionListener.current && initPrefersReducedMotion();
	const [shouldReduceMotion] = (0, import_react.useState)(prefersReducedMotion.current);
	return shouldReduceMotion;
}
function useReducedMotionConfig() {
	const reducedMotionPreference = useReducedMotion();
	const { reducedMotion } = (0, import_react.useContext)(MotionConfigContext);
	if (reducedMotion === "never") return false;
	else if (reducedMotion === "always") return true;
	else return reducedMotionPreference;
}
function stopAnimation(visualElement) {
	visualElement.values.forEach((value) => value.stop());
}
function setVariants(visualElement, variantLabels) {
	const reversedLabels = [...variantLabels].reverse();
	reversedLabels.forEach((key) => {
		const variant = visualElement.getVariant(key);
		variant && setTarget(visualElement, variant);
		if (visualElement.variantChildren) visualElement.variantChildren.forEach((child) => {
			setVariants(child, variantLabels);
		});
	});
}
function setValues(visualElement, definition) {
	if (Array.isArray(definition)) return setVariants(visualElement, definition);
	else if (typeof definition === "string") return setVariants(visualElement, [definition]);
	else setTarget(visualElement, definition);
}
function animationControls() {
	let hasMounted = false;
	const subscribers = /* @__PURE__ */ new Set();
	const controls = {
		subscribe(visualElement) {
			subscribers.add(visualElement);
			return () => void subscribers.delete(visualElement);
		},
		start(definition, transitionOverride) {
			invariant(hasMounted, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");
			const animations$1 = [];
			subscribers.forEach((visualElement) => {
				animations$1.push(animateVisualElement(visualElement, definition, { transitionOverride }));
			});
			return Promise.all(animations$1);
		},
		set(definition) {
			invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
			return subscribers.forEach((visualElement) => {
				setValues(visualElement, definition);
			});
		},
		stop() {
			subscribers.forEach((visualElement) => {
				stopAnimation(visualElement);
			});
		},
		mount() {
			hasMounted = true;
			return () => {
				hasMounted = false;
				controls.stop();
			};
		}
	};
	return controls;
}
function isDOMKeyframes(keyframes$1) {
	return typeof keyframes$1 === "object" && !Array.isArray(keyframes$1);
}
function resolveSubjects(subject, keyframes$1, scope, selectorCache) {
	if (typeof subject === "string" && isDOMKeyframes(keyframes$1)) return resolveElements(subject, scope, selectorCache);
	else if (subject instanceof NodeList) return Array.from(subject);
	else if (Array.isArray(subject)) return subject;
	else return [subject];
}
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
	return duration * (repeat + 1);
}
function calcNextTime(current$1, next$1, prev, labels) {
	if (typeof next$1 === "number") return next$1;
	else if (next$1.startsWith("-") || next$1.startsWith("+")) return Math.max(0, current$1 + parseFloat(next$1));
	else if (next$1 === "<") return prev;
	else if (next$1.startsWith("<")) return Math.max(0, prev + parseFloat(next$1.slice(1)));
	else return labels.get(next$1) ?? current$1;
}
function eraseKeyframes(sequence, startTime, endTime) {
	for (let i = 0; i < sequence.length; i++) {
		const keyframe = sequence[i];
		if (keyframe.at > startTime && keyframe.at < endTime) {
			removeItem(sequence, keyframe);
			i--;
		}
	}
}
function addKeyframes(sequence, keyframes$1, easing, offset, startTime, endTime) {
	eraseKeyframes(sequence, startTime, endTime);
	for (let i = 0; i < keyframes$1.length; i++) sequence.push({
		value: keyframes$1[i],
		at: mixNumber(startTime, endTime, offset[i]),
		easing: getEasingForSegment(easing, i)
	});
}
function normalizeTimes(times, repeat) {
	for (let i = 0; i < times.length; i++) times[i] = times[i] / (repeat + 1);
}
function compareByTime(a, b) {
	if (a.at === b.at) {
		if (a.value === null) return 1;
		if (b.value === null) return -1;
		return 0;
	} else return a.at - b.at;
}
const defaultSegmentEasing = "easeInOut";
const MAX_REPEAT = 20;
function createAnimationsFromSequence(sequence, { defaultTransition = {},...sequenceTransition } = {}, scope, generators) {
	const defaultDuration = defaultTransition.duration || .3;
	const animationDefinitions = /* @__PURE__ */ new Map();
	const sequences = /* @__PURE__ */ new Map();
	const elementCache = {};
	const timeLabels = /* @__PURE__ */ new Map();
	let prevTime = 0;
	let currentTime = 0;
	let totalDuration = 0;
	for (let i = 0; i < sequence.length; i++) {
		const segment = sequence[i];
		if (typeof segment === "string") {
			timeLabels.set(segment, currentTime);
			continue;
		} else if (!Array.isArray(segment)) {
			timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
			continue;
		}
		let [subject, keyframes$1, transition = {}] = segment;
		if (transition.at !== void 0) currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
		let maxDuration = 0;
		const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
			const valueKeyframesAsList = keyframesAsList(valueKeyframes);
			const { delay: delay$1 = 0, times = defaultOffset(valueKeyframesAsList), type = "keyframes", repeat, repeatType, repeatDelay = 0,...remainingTransition } = valueTransition;
			let { ease: ease$1 = defaultTransition.ease || "easeOut", duration } = valueTransition;
			const calculatedDelay = typeof delay$1 === "function" ? delay$1(elementIndex, numSubjects) : delay$1;
			const numKeyframes = valueKeyframesAsList.length;
			const createGenerator = isGenerator(type) ? type : generators?.[type || "keyframes"];
			if (numKeyframes <= 2 && createGenerator) {
				let absoluteDelta = 100;
				if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
					const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
					absoluteDelta = Math.abs(delta);
				}
				const springTransition = { ...remainingTransition };
				if (duration !== void 0) springTransition.duration = /* @__PURE__ */ secondsToMilliseconds(duration);
				const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
				ease$1 = springEasing.ease;
				duration = springEasing.duration;
			}
			duration ?? (duration = defaultDuration);
			const startTime = currentTime + calculatedDelay;
			if (times.length === 1 && times[0] === 0) times[1] = 1;
			const remainder = times.length - valueKeyframesAsList.length;
			remainder > 0 && fillOffset(times, remainder);
			valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
			if (repeat) {
				invariant(repeat < MAX_REPEAT, "Repeat count too high, must be less than 20", "repeat-count-high");
				duration = calculateRepeatDuration(duration, repeat);
				const originalKeyframes = [...valueKeyframesAsList];
				const originalTimes = [...times];
				ease$1 = Array.isArray(ease$1) ? [...ease$1] : [ease$1];
				const originalEase = [...ease$1];
				for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
					valueKeyframesAsList.push(...originalKeyframes);
					for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
						times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
						ease$1.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
					}
				}
				normalizeTimes(times, repeat);
			}
			const targetTime = startTime + duration;
			addKeyframes(valueSequence, valueKeyframesAsList, ease$1, times, startTime, targetTime);
			maxDuration = Math.max(calculatedDelay + duration, maxDuration);
			totalDuration = Math.max(targetTime, totalDuration);
		};
		if (isMotionValue(subject)) {
			const subjectSequence = getSubjectSequence(subject, sequences);
			resolveValueSequence(keyframes$1, transition, getValueSequence("default", subjectSequence));
		} else {
			const subjects = resolveSubjects(subject, keyframes$1, scope, elementCache);
			const numSubjects = subjects.length;
			for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
				keyframes$1 = keyframes$1;
				transition = transition;
				const thisSubject = subjects[subjectIndex];
				const subjectSequence = getSubjectSequence(thisSubject, sequences);
				for (const key in keyframes$1) resolveValueSequence(keyframes$1[key], getValueTransition$1(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
			}
		}
		prevTime = currentTime;
		currentTime += maxDuration;
	}
	sequences.forEach((valueSequences, element) => {
		for (const key in valueSequences) {
			const valueSequence = valueSequences[key];
			valueSequence.sort(compareByTime);
			const keyframes$1 = [];
			const valueOffset = [];
			const valueEasing = [];
			for (let i = 0; i < valueSequence.length; i++) {
				const { at, value, easing } = valueSequence[i];
				keyframes$1.push(value);
				valueOffset.push(/* @__PURE__ */ progress(0, totalDuration, at));
				valueEasing.push(easing || "easeOut");
			}
			if (valueOffset[0] !== 0) {
				valueOffset.unshift(0);
				keyframes$1.unshift(keyframes$1[0]);
				valueEasing.unshift(defaultSegmentEasing);
			}
			if (valueOffset[valueOffset.length - 1] !== 1) {
				valueOffset.push(1);
				keyframes$1.push(null);
			}
			if (!animationDefinitions.has(element)) animationDefinitions.set(element, {
				keyframes: {},
				transition: {}
			});
			const definition = animationDefinitions.get(element);
			definition.keyframes[key] = keyframes$1;
			definition.transition[key] = {
				...defaultTransition,
				duration: totalDuration,
				ease: valueEasing,
				times: valueOffset,
				...sequenceTransition
			};
		}
	});
	return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
	!sequences.has(subject) && sequences.set(subject, {});
	return sequences.get(subject);
}
function getValueSequence(name, sequences) {
	if (!sequences[name]) sequences[name] = [];
	return sequences[name];
}
function keyframesAsList(keyframes$1) {
	return Array.isArray(keyframes$1) ? keyframes$1 : [keyframes$1];
}
function getValueTransition$1(transition, key) {
	return transition && transition[key] ? {
		...transition,
		...transition[key]
	} : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes$1) => keyframes$1.every(isNumber);
function isObjectKey(key, object) {
	return key in object;
}
var ObjectVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.type = "object";
	}
	readValueFromInstance(instance, key) {
		if (isObjectKey(key, instance)) {
			const value = instance[key];
			if (typeof value === "string" || typeof value === "number") return value;
		}
		return void 0;
	}
	getBaseTargetFromProps() {
		return void 0;
	}
	removeValueFromRenderState(key, renderState) {
		delete renderState.output[key];
	}
	measureInstanceViewportBox() {
		return createBox();
	}
	build(renderState, latestValues) {
		Object.assign(renderState.output, latestValues);
	}
	renderInstance(instance, { output }) {
		Object.assign(instance, output);
	}
	sortInstanceNodePosition() {
		return 0;
	}
};
function createDOMVisualElement(element) {
	const options = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: {
				transform: {},
				transformOrigin: {},
				style: {},
				vars: {},
				attrs: {}
			},
			latestValues: {}
		}
	};
	const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
	node.mount(element);
	visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
	const options = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	};
	const node = new ObjectVisualElement(options);
	node.mount(subject);
	visualElementStore.set(subject, node);
}
function isSingleValue(subject, keyframes$1) {
	return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes$1);
}
function animateSubject(subject, keyframes$1, options, scope) {
	const animations$1 = [];
	if (isSingleValue(subject, keyframes$1)) animations$1.push(animateSingleValue(subject, isDOMKeyframes(keyframes$1) ? keyframes$1.default || keyframes$1 : keyframes$1, options ? options.default || options : options));
	else {
		const subjects = resolveSubjects(subject, keyframes$1, scope);
		const numSubjects = subjects.length;
		invariant(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
		for (let i = 0; i < numSubjects; i++) {
			const thisSubject = subjects[i];
			invariant(thisSubject !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
			const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
			if (!visualElementStore.has(thisSubject)) createVisualElement(thisSubject);
			const visualElement = visualElementStore.get(thisSubject);
			const transition = { ...options };
			if ("delay" in transition && typeof transition.delay === "function") transition.delay = transition.delay(i, numSubjects);
			animations$1.push(...animateTarget(visualElement, {
				...keyframes$1,
				transition
			}, {}));
		}
	}
	return animations$1;
}
function animateSequence(sequence, options, scope) {
	const animations$1 = [];
	const animationDefinitions = createAnimationsFromSequence(sequence, options, scope, { spring });
	animationDefinitions.forEach(({ keyframes: keyframes$1, transition }, subject) => {
		animations$1.push(...animateSubject(subject, keyframes$1, transition));
	});
	return animations$1;
}
function isSequence(value) {
	return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(scope) {
	function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
		let animations$1 = [];
		if (isSequence(subjectOrSequence)) animations$1 = animateSequence(subjectOrSequence, optionsOrKeyframes, scope);
		else animations$1 = animateSubject(subjectOrSequence, optionsOrKeyframes, options, scope);
		const animation = new GroupAnimationWithThen(animations$1);
		if (scope) {
			scope.animations.push(animation);
			animation.finished.then(() => {
				removeItem(scope.animations, animation);
			});
		}
		return animation;
	}
	return scopedAnimate;
}
const animate = createScopedAnimate();
function useAnimate() {
	const scope = useConstant(() => ({
		current: null,
		animations: []
	}));
	const animate$1 = useConstant(() => createScopedAnimate(scope));
	useUnmountEffect(() => {
		scope.animations.forEach((animation) => animation.stop());
		scope.animations.length = 0;
	});
	return [scope, animate$1];
}
function animateElements(elementOrSelector, keyframes$1, options, scope) {
	const elements = resolveElements(elementOrSelector, scope);
	const numElements = elements.length;
	invariant(Boolean(numElements), "No valid elements provided.", "no-valid-elements");
	const animationDefinitions = [];
	for (let i = 0; i < numElements; i++) {
		const element = elements[i];
		const elementTransition = { ...options };
		if (typeof elementTransition.delay === "function") elementTransition.delay = elementTransition.delay(i, numElements);
		for (const valueName in keyframes$1) {
			let valueKeyframes = keyframes$1[valueName];
			if (!Array.isArray(valueKeyframes)) valueKeyframes = [valueKeyframes];
			const valueOptions = { ...getValueTransition(elementTransition, valueName) };
			valueOptions.duration && (valueOptions.duration = /* @__PURE__ */ secondsToMilliseconds(valueOptions.duration));
			valueOptions.delay && (valueOptions.delay = /* @__PURE__ */ secondsToMilliseconds(valueOptions.delay));
			const map = getAnimationMap(element);
			const key = animationMapKey(valueName, valueOptions.pseudoElement || "");
			const currentAnimation = map.get(key);
			currentAnimation && currentAnimation.stop();
			animationDefinitions.push({
				map,
				key,
				unresolvedKeyframes: valueKeyframes,
				options: {
					...valueOptions,
					element,
					name: valueName,
					allowFlatten: !elementTransition.type && !elementTransition.ease
				}
			});
		}
	}
	for (let i = 0; i < animationDefinitions.length; i++) {
		const { unresolvedKeyframes, options: animationOptions } = animationDefinitions[i];
		const { element, name, pseudoElement } = animationOptions;
		if (!pseudoElement && unresolvedKeyframes[0] === null) unresolvedKeyframes[0] = getComputedStyle$1(element, name);
		fillWildcards(unresolvedKeyframes);
		applyPxDefaults(unresolvedKeyframes, name);
		if (!pseudoElement && unresolvedKeyframes.length < 2) unresolvedKeyframes.unshift(getComputedStyle$1(element, name));
		animationOptions.keyframes = unresolvedKeyframes;
	}
	const animations$1 = [];
	for (let i = 0; i < animationDefinitions.length; i++) {
		const { map, key, options: animationOptions } = animationDefinitions[i];
		const animation = new NativeAnimation(animationOptions);
		map.set(key, animation);
		animation.finished.finally(() => map.delete(key));
		animations$1.push(animation);
	}
	return animations$1;
}
const createScopedWaapiAnimate = (scope) => {
	function scopedAnimate(elementOrSelector, keyframes$1, options) {
		return new GroupAnimationWithThen(animateElements(elementOrSelector, keyframes$1, options, scope));
	}
	return scopedAnimate;
};
const animateMini = /* @__PURE__ */ createScopedWaapiAnimate();
function useAnimateMini() {
	const scope = useConstant(() => ({
		current: null,
		animations: []
	}));
	const animate$1 = useConstant(() => createScopedWaapiAnimate(scope));
	useUnmountEffect(() => {
		scope.animations.forEach((animation) => animation.stop());
	});
	return [scope, animate$1];
}
function useAnimationControls() {
	const controls = useConstant(animationControls);
	useIsomorphicLayoutEffect(controls.mount, []);
	return controls;
}
const useAnimation = useAnimationControls;
function usePresenceData() {
	const context = (0, import_react.useContext)(PresenceContext);
	return context ? context.custom : void 0;
}
function useDomEvent(ref, eventName, handler, options) {
	(0, import_react.useEffect)(() => {
		const element = ref.current;
		if (handler && element) return addDomEvent(element, eventName, handler, options);
	}, [
		ref,
		eventName,
		handler,
		options
	]);
}
var DragControls = class {
	constructor() {
		this.componentControls = /* @__PURE__ */ new Set();
	}
	subscribe(controls) {
		this.componentControls.add(controls);
		return () => this.componentControls.delete(controls);
	}
	start(event, options) {
		this.componentControls.forEach((controls) => {
			controls.start(event.nativeEvent || event, options);
		});
	}
	cancel() {
		this.componentControls.forEach((controls) => {
			controls.cancel();
		});
	}
	stop() {
		this.componentControls.forEach((controls) => {
			controls.stop();
		});
	}
};
const createDragControls = () => new DragControls();
function useDragControls() {
	return useConstant(createDragControls);
}
function isMotionComponent(component) {
	return component !== null && typeof component === "object" && motionComponentSymbol in component;
}
function unwrapMotionComponent(component) {
	if (isMotionComponent(component)) return component[motionComponentSymbol];
	return void 0;
}
function useInstantLayoutTransition() {
	return startTransition;
}
function startTransition(callback) {
	if (!rootProjectionNode.current) return;
	rootProjectionNode.current.isUpdating = false;
	rootProjectionNode.current.blockUpdate();
	callback && callback();
}
function useResetProjection() {
	const reset = (0, import_react.useCallback)(() => {
		const root = rootProjectionNode.current;
		if (!root) return;
		root.resetTree();
	}, []);
	return reset;
}
function useCycle(...items) {
	const index = (0, import_react.useRef)(0);
	const [item, setItem] = (0, import_react.useState)(items[index.current]);
	const runCycle = (0, import_react.useCallback)((next$1) => {
		index.current = typeof next$1 !== "number" ? wrap(0, items.length, index.current + 1) : next$1;
		setItem(items[index.current]);
	}, [items.length, ...items]);
	return [item, runCycle];
}
const thresholds = {
	some: 0,
	all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
	const elements = resolveElements(elementOrSelector);
	const activeIntersections = /* @__PURE__ */ new WeakMap();
	const onIntersectionChange = (entries) => {
		entries.forEach((entry) => {
			const onEnd = activeIntersections.get(entry.target);
			if (entry.isIntersecting === Boolean(onEnd)) return;
			if (entry.isIntersecting) {
				const newOnEnd = onStart(entry.target, entry);
				if (typeof newOnEnd === "function") activeIntersections.set(entry.target, newOnEnd);
				else observer$1.unobserve(entry.target);
			} else if (typeof onEnd === "function") {
				onEnd(entry);
				activeIntersections.delete(entry.target);
			}
		});
	};
	const observer$1 = new IntersectionObserver(onIntersectionChange, {
		root,
		rootMargin,
		threshold: typeof amount === "number" ? amount : thresholds[amount]
	});
	elements.forEach((element) => observer$1.observe(element));
	return () => observer$1.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
	const [isInView, setInView] = (0, import_react.useState)(initial);
	(0, import_react.useEffect)(() => {
		if (!ref.current || once && isInView) return;
		const onEnter = () => {
			setInView(true);
			return once ? void 0 : () => setInView(false);
		};
		const options = {
			root: root && root.current || void 0,
			margin,
			amount
		};
		return inView(ref.current, onEnter, options);
	}, [
		root,
		ref,
		margin,
		once,
		amount
	]);
	return isInView;
}
function useInstantTransition() {
	const [forceUpdate, forcedRenderCount] = useForceUpdate();
	const startInstantLayoutTransition = useInstantLayoutTransition();
	const unlockOnFrameRef = (0, import_react.useRef)(-1);
	(0, import_react.useEffect)(() => {
		frame.postRender(() => frame.postRender(() => {
			if (forcedRenderCount !== unlockOnFrameRef.current) return;
			MotionGlobalConfig.instantAnimations = false;
		}));
	}, [forcedRenderCount]);
	return (callback) => {
		startInstantLayoutTransition(() => {
			MotionGlobalConfig.instantAnimations = true;
			forceUpdate();
			callback();
			unlockOnFrameRef.current = forcedRenderCount + 1;
		});
	};
}
function disableInstantTransitions() {
	MotionGlobalConfig.instantAnimations = false;
}
function usePageInView() {
	const [isInView, setIsInView] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const handleVisibilityChange = () => setIsInView(!document.hidden);
		if (document.hidden) handleVisibilityChange();
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);
	return isInView;
}
const appearAnimationStore = /* @__PURE__ */ new Map();
const appearComplete = /* @__PURE__ */ new Map();
const appearStoreId = (elementId, valueName) => {
	const key = transformProps.has(valueName) ? "transform" : valueName;
	return `${elementId}: ${key}`;
};
function handoffOptimizedAppearAnimation(elementId, valueName, frame$1) {
	const storeId = appearStoreId(elementId, valueName);
	const optimisedAnimation = appearAnimationStore.get(storeId);
	if (!optimisedAnimation) return null;
	const { animation, startTime } = optimisedAnimation;
	function cancelAnimation() {
		window.MotionCancelOptimisedAnimation?.(elementId, valueName, frame$1);
	}
	animation.onfinish = cancelAnimation;
	if (startTime === null || window.MotionHandoffIsComplete?.(elementId)) {
		cancelAnimation();
		return null;
	} else return startTime;
}
let startFrameTime;
let readyAnimation;
const suspendedAnimations = /* @__PURE__ */ new Set();
function resumeSuspendedAnimations() {
	suspendedAnimations.forEach((data) => {
		data.animation.play();
		data.animation.startTime = data.startTime;
	});
	suspendedAnimations.clear();
}
function startOptimizedAppearAnimation(element, name, keyframes$1, options, onReady) {
	if (window.MotionIsMounted) return;
	const id$3 = element.dataset[optimizedAppearDataId];
	if (!id$3) return;
	window.MotionHandoffAnimation = handoffOptimizedAppearAnimation;
	const storeId = appearStoreId(id$3, name);
	if (!readyAnimation) {
		readyAnimation = startWaapiAnimation(element, name, [keyframes$1[0], keyframes$1[0]], {
			duration: 1e4,
			ease: "linear"
		});
		appearAnimationStore.set(storeId, {
			animation: readyAnimation,
			startTime: null
		});
		window.MotionHandoffAnimation = handoffOptimizedAppearAnimation;
		window.MotionHasOptimisedAnimation = (elementId, valueName) => {
			if (!elementId) return false;
			if (!valueName) return appearComplete.has(elementId);
			const animationId = appearStoreId(elementId, valueName);
			return Boolean(appearAnimationStore.get(animationId));
		};
		window.MotionHandoffMarkAsComplete = (elementId) => {
			if (appearComplete.has(elementId)) appearComplete.set(elementId, true);
		};
		window.MotionHandoffIsComplete = (elementId) => {
			return appearComplete.get(elementId) === true;
		};
		window.MotionCancelOptimisedAnimation = (elementId, valueName, frame$1, canResume) => {
			const animationId = appearStoreId(elementId, valueName);
			const data = appearAnimationStore.get(animationId);
			if (!data) return;
			if (frame$1 && canResume === void 0) frame$1.postRender(() => {
				frame$1.postRender(() => {
					data.animation.cancel();
				});
			});
			else data.animation.cancel();
			if (frame$1 && canResume) {
				suspendedAnimations.add(data);
				frame$1.render(resumeSuspendedAnimations);
			} else {
				appearAnimationStore.delete(animationId);
				if (!appearAnimationStore.size) window.MotionCancelOptimisedAnimation = void 0;
			}
		};
		window.MotionCheckAppearSync = (visualElement, valueName, value) => {
			const appearId = getOptimisedAppearId(visualElement);
			if (!appearId) return;
			const valueIsOptimised = window.MotionHasOptimisedAnimation?.(appearId, valueName);
			const externalAnimationValue = visualElement.props.values?.[valueName];
			if (!valueIsOptimised || !externalAnimationValue) return;
			const removeSyncCheck = value.on("change", (latestValue) => {
				if (externalAnimationValue.get() !== latestValue) {
					window.MotionCancelOptimisedAnimation?.(appearId, valueName);
					removeSyncCheck();
				}
			});
			return removeSyncCheck;
		};
	}
	const startAnimation = () => {
		readyAnimation.cancel();
		const appearAnimation = startWaapiAnimation(element, name, keyframes$1, options);
		if (startFrameTime === void 0) startFrameTime = performance.now();
		appearAnimation.startTime = startFrameTime;
		appearAnimationStore.set(storeId, {
			animation: appearAnimation,
			startTime: startFrameTime
		});
		if (onReady) onReady(appearAnimation);
	};
	appearComplete.set(id$3, false);
	if (readyAnimation.ready) readyAnimation.ready.then(startAnimation).catch(noop);
	else startAnimation();
}
const createObject = () => ({});
var StateVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.measureInstanceViewportBox = createBox;
	}
	build() {}
	resetTransform() {}
	restoreTransform() {}
	removeValueFromRenderState() {}
	renderInstance() {}
	scrapeMotionValuesFromProps() {
		return createObject();
	}
	getBaseTargetFromProps() {
		return void 0;
	}
	readValueFromInstance(_state, key, options) {
		return options.initialState[key] || 0;
	}
	sortInstanceNodePosition() {
		return 0;
	}
};
const useVisualState = makeUseVisualState({
	scrapeMotionValuesFromProps: createObject,
	createRenderState: createObject
});
function useAnimatedState(initialState) {
	const [animationState, setAnimationState] = (0, import_react.useState)(initialState);
	const visualState = useVisualState({}, false);
	const element = useConstant(() => {
		return new StateVisualElement({
			props: { onUpdate: (v) => {
				setAnimationState({ ...v });
			} },
			visualState,
			presenceContext: null
		}, { initialState });
	});
	(0, import_react.useLayoutEffect)(() => {
		element.mount({});
		return () => element.unmount();
	}, [element]);
	const startAnimation = useConstant(() => (animationDefinition) => {
		return animateVisualElement(element, animationDefinition);
	});
	return [animationState, startAnimation];
}
let id = 0;
const AnimateSharedLayout = ({ children }) => {
	import_react.useEffect(() => {
		invariant(false, "AnimateSharedLayout is deprecated: https://www.framer.com/docs/guide-upgrade/##shared-layout-animations");
	}, []);
	return (0, import_jsx_runtime.jsx)(LayoutGroup, {
		id: useConstant(() => `asl-${id++}`),
		children
	});
};
const maxScale = 1e5;
const invertScale = (scale$1) => scale$1 > .001 ? 1 / scale$1 : maxScale;
let hasWarned = false;
function useInvertedScale(scale$1) {
	let parentScaleX = useMotionValue(1);
	let parentScaleY = useMotionValue(1);
	const { visualElement } = (0, import_react.useContext)(MotionContext);
	invariant(!!(scale$1 || visualElement), "If no scale values are provided, useInvertedScale must be used within a child of another motion component.");
	warning(hasWarned, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead.");
	hasWarned = true;
	if (scale$1) {
		parentScaleX = scale$1.scaleX || parentScaleX;
		parentScaleY = scale$1.scaleY || parentScaleY;
	} else if (visualElement) {
		parentScaleX = visualElement.getValue("scaleX", 1);
		parentScaleY = visualElement.getValue("scaleY", 1);
	}
	const scaleX$1 = useTransform(parentScaleX, invertScale);
	const scaleY$1 = useTransform(parentScaleY, invertScale);
	return {
		scaleX: scaleX$1,
		scaleY: scaleY$1
	};
}
const ReorderContext = (0, import_react.createContext)(null);
function checkReorder(order, value, offset, velocity) {
	if (!velocity) return order;
	const index = order.findIndex((item$1) => item$1.value === value);
	if (index === -1) return order;
	const nextOffset = velocity > 0 ? 1 : -1;
	const nextItem = order[index + nextOffset];
	if (!nextItem) return order;
	const item = order[index];
	const nextLayout = nextItem.layout;
	const nextItemCenter = mixNumber(nextLayout.min, nextLayout.max, .5);
	if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) return moveItem(order, index, index + nextOffset);
	return order;
}
function ReorderGroupComponent({ children, as = "ul", axis = "y", onReorder, values,...props }, externalRef) {
	const Component$1 = useConstant(() => motion[as]);
	const order = [];
	const isReordering = (0, import_react.useRef)(false);
	invariant(Boolean(values), "Reorder.Group must be provided a values prop", "reorder-values");
	const context = {
		axis,
		registerItem: (value, layout$1) => {
			const idx = order.findIndex((entry) => value === entry.value);
			if (idx !== -1) order[idx].layout = layout$1[axis];
			else order.push({
				value,
				layout: layout$1[axis]
			});
			order.sort(compareMin);
		},
		updateOrder: (item, offset, velocity) => {
			if (isReordering.current) return;
			const newOrder = checkReorder(order, item, offset, velocity);
			if (order !== newOrder) {
				isReordering.current = true;
				onReorder(newOrder.map(getValue).filter((value) => values.indexOf(value) !== -1));
			}
		}
	};
	(0, import_react.useEffect)(() => {
		isReordering.current = false;
	});
	return (0, import_jsx_runtime.jsx)(Component$1, {
		...props,
		ref: externalRef,
		ignoreStrict: true,
		children: (0, import_jsx_runtime.jsx)(ReorderContext.Provider, {
			value: context,
			children
		})
	});
}
const ReorderGroup = /* @__PURE__ */ (0, import_react.forwardRef)(ReorderGroupComponent);
function getValue(item) {
	return item.value;
}
function compareMin(a, b) {
	return a.layout.min - b.layout.min;
}
function useDefaultMotionValue(value, defaultValue = 0) {
	return isMotionValue(value) ? value : useMotionValue(defaultValue);
}
function ReorderItemComponent({ children, style: style$1 = {}, value, as = "li", onDrag, layout: layout$1 = true,...props }, externalRef) {
	const Component$1 = useConstant(() => motion[as]);
	const context = (0, import_react.useContext)(ReorderContext);
	const point$1 = {
		x: useDefaultMotionValue(style$1.x),
		y: useDefaultMotionValue(style$1.y)
	};
	const zIndex = useTransform([point$1.x, point$1.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
	invariant(Boolean(context), "Reorder.Item must be a child of Reorder.Group", "reorder-item-child");
	const { axis, registerItem, updateOrder } = context;
	return (0, import_jsx_runtime.jsx)(Component$1, {
		drag: axis,
		...props,
		dragSnapToOrigin: true,
		style: {
			...style$1,
			x: point$1.x,
			y: point$1.y,
			zIndex
		},
		layout: layout$1,
		onDrag: (event, gesturePoint) => {
			const { velocity } = gesturePoint;
			velocity[axis] && updateOrder(value, point$1[axis].get(), velocity[axis]);
			onDrag && onDrag(event, gesturePoint);
		},
		onLayoutMeasure: (measured) => registerItem(value, measured),
		ref: externalRef,
		ignoreStrict: true,
		children
	});
}
const ReorderItem = /* @__PURE__ */ (0, import_react.forwardRef)(ReorderItemComponent);
var namespace_exports = {};
__export(namespace_exports, {
	Group: () => ReorderGroup,
	Item: () => ReorderItem
});
export { distance2D as $, createScopedAnimate as A, animationControls as B, useReducedMotionConfig as C, useReducedMotion as D, useWillChange as E, WillChangeMotionValue as F, useVelocity as G, useTime as H, useAnimationFrame as I, useSpring as J, useTransform as K, useMotionTemplate as L, useMotionValue as M, useViewportScroll as N, useElementScroll as O, useScroll as P, scroll as Q, scrollInfo as R, useMotionValueEvent as S, domMin as T, domMax as U, domAnimation as V, useUnmountEffect as W, motion as X, delay as Y, FlatTree as Z, distance as _, motionValue as a$, calcLength as a1, addPointerEvent as a2, addPointerInfo as a3, animations as a4, animateVisualElement as a5, VisualElement as a6, visualElementStore as a7, createBox as a8, m as a9, springValue as aA, isMotionValue as aB, mapValue as aC, transformValue as aD, transform as aE, getOriginIndex as aF, stagger as aG, isSVGSVGElement as aH, recordStats as aI, observeTimeline as aJ, resize as aK, isSVGElement as aL, getComputedStyle$1 as aM, press as aN, isPrimaryPointer as aO, isNodeOrChild as aP, hover as aQ, setDragLock as aR, isDragActive as aS, isDragging as aT, cancelMicrotask as aU, microtask as aV, svgEffect as aW, addStyleValue as aX, styleEffect as aY, MotionValue as aZ, collectMotionValues as a_, SwitchLayoutGroupContext as aa, optimizedAppearDataAttribute as ab, makeUseVisualState as ac, resolveMotionValue as ad, buildTransform as ae, addScaleCorrector as af, MotionContext as ag, MotionConfig as ah, filterProps as ai, isValidMotionProp as aj, LazyMotion as ak, LayoutGroup as al, useForceUpdate as am, DeprecatedLayoutGroupContext as an, AnimatePresence as ao, useIsPresent as ap, usePresence as aq, MotionConfigContext as ar, cancelSync as as, sync as at, ViewTransitionBuilder as au, animateView as av, getViewAnimations as aw, getViewAnimationLayerInfo as ax, findValueType as ay, attachSpring as az, namespace_exports as b, maxGeneratorDuration as b$, isHTMLElement as b0, propEffect as b1, addAttrValue as b2, attrEffect as b3, getValueAsType as b4, resolveElements as b5, acceleratedValues as b6, supportsPartialKeyframes as b7, isWaapiSupportedEasing as b8, applyPxDefaults as b9, mapEasingToNativeEasing as bA, supportedWaapiEasing as bB, cubicBezierAsString as bC, supportsLinearEasing as bD, supportsFlags as bE, supportsScrollTimeline as bF, setStyle as bG, KeyframeResolver as bH, flushKeyframeResolvers as bI, transformPropOrder as bJ, transformProps as bK, defaultTransformValue as bL, parseValueFromTransform as bM, readTransformValue as bN, fillWildcards as bO, JSAnimation as bP, animateValue as bQ, defaultEasing as bR, keyframes as bS, convertOffsetToTimes as bT, defaultOffset as bU, fillOffset as bV, interpolate as bW, inertia as bX, spring as bY, createGeneratorEasing as bZ, calcGeneratorDuration as b_, DOMKeyframesResolver as ba, getAnimatableNone as bb, defaultValueTypes as bc, getDefaultValueType as bd, numberValueTypes as be, transformValueTypes as bf, dimensionValueTypes as bg, findDimensionValueType as bh, testValueType as bi, positionalKeys as bj, getValueTransition as bk, getVariableValue as bl, parseCSSVariable as bm, animationMapKey as bn, getAnimationMap as bo, NativeAnimationWrapper as bp, GroupAnimationWithThen as bq, GroupAnimation as br, AsyncMotionValueAnimation as bs, supportsBrowserAnimation as bt, makeAnimationInstant as bu, NativeAnimationExtended as bv, NativeAnimation as bw, applyGeneratorOptions as bx, isGenerator as by, startWaapiAnimation as bz, useInvertedScale as c, SubscriptionManager as c$, generateLinearEasing as c0, mix as c1, getMixer as c2, mixArray as c3, mixComplex as c4, mixObject as c5, invisibleValues as c6, mixVisibility as c7, mixColor as c8, mixLinearColor as c9, frameSteps as cA, createRenderBatcher as cB, statsBuffer as cC, easingDefinitionToFunction as cD, isBezierDefinition as cE, getEasingForSegment as cF, isEasingArray as cG, steps as cH, easeIn as cI, easeInOut as cJ, easeOut as cK, circIn as cL, circInOut as cM, circOut as cN, anticipate as cO, backIn as cP, backInOut as cQ, backOut as cR, reverseEasing as cS, mirrorEasing as cT, cubicBezier as cU, wrap as cV, hasWarned$1 as cW, warnOnce as cX, velocityPerSecond as cY, millisecondsToSeconds as cZ, secondsToMilliseconds as c_, mixNumber as ca, mixImmediate as cb, hslaToRgba as cc, analyseComplexValue as cd, complex as ce, color as cf, hsla as cg, degrees as ch, percent as ci, progressPercentage as cj, px as ck, vh as cl, vw as cm, hex as cn, rgbUnit as co, rgba as cp, alpha as cq, number as cr, scale as cs, isCSSVariableName as ct, isCSSVariableToken as cu, activeAnimations as cv, time as cw, cancelFrame as cx, frame as cy, frameData as cz, AnimateSharedLayout as d, progress as d0, pipe as d1, noop as d2, memo as d3, isZeroValueString as d4, isObject as d5, isNumericalString as d6, MotionGlobalConfig as d7, invariant as d8, warning as d9, clamp as da, addUniqueItem as db, moveItem as dc, removeItem as dd, PresenceContext as de, useIsomorphicLayoutEffect as df, isBrowser as dg, LayoutGroupContext as dh, useAnimatedState as e, startOptimizedAppearAnimation as f, usePageInView as g, disableInstantTransitions as h, useInstantTransition as i, useInView as j, inView as k, useCycle as l, useResetProjection as m, useInstantLayoutTransition as n, unwrapMotionComponent as o, isMotionComponent as p, DragControls as q, useDragControls as r, useDomEvent as s, usePresenceData as t, useAnimation as u, useAnimationControls as v, useAnimateMini as w, animateMini as x, useAnimate as y, animate as z };
