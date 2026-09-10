import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var segmenter = new Intl.Segmenter([
	"en-US",
	"de-DE",
	"es-ES",
	"zh-CN",
	"zh-TW",
	"ja-JP",
	"ru-RU",
	"el-GR",
	"fr-FR",
	"pt-PT",
	"ro-RO"
]);
var SUSTAINED_MIN_MS = 1e3;
var TARGET_DELAY_FLOOR_SEC = .08;
var TARGET_DELAY_CAP_SEC = .8;
var STALL_ARM_ABS_MIN_SEC = .25;
var STALL_ARM_FACTOR = 6;
var STALL_RELEASE_SEC = 6;
var GAP_SAMPLES = 32;
var RELAX_SEC = .3;
var MAX_BACKLOG = 400;
var MAX_FRAME_DT_MS = 100;
var POST_STREAM_STEP = 5;
var POST_STREAM_DRAIN_SEC = 2;
var MIN_STEP = 1;
const useSmoothStream = ({ onUpdate, streamDone: externalStreamDone, minDelay = 10, initialText = "" }) => {
	const chunkQueueRef = (0, import_react.useRef)([]);
	const animationFrameRef = (0, import_react.useRef)(null);
	const displayedTextRef = (0, import_react.useRef)(initialText);
	const lastFrameTimeRef = (0, import_react.useRef)(0);
	const lastAccumulatedRef = (0, import_react.useRef)(initialText);
	const totalCharsRef = (0, import_react.useRef)(0);
	const firstChunkTRef = (0, import_react.useRef)(-1);
	const stallEstRef = (0, import_react.useRef)(0);
	const gapsRef = (0, import_react.useRef)([]);
	const lastArrivalTRef = (0, import_react.useRef)(0);
	const sawFirstChunkRef = (0, import_react.useRef)(false);
	const creditRef = (0, import_react.useRef)(0);
	const [internalStreamDone, setInternalStreamDone] = (0, import_react.useState)(false);
	const streamDone = externalStreamDone ?? internalStreamDone;
	const onUpdateRef = (0, import_react.useRef)(onUpdate);
	(0, import_react.useEffect)(() => {
		onUpdateRef.current = onUpdate;
	});
	const addChunk = (0, import_react.useCallback)((chunk) => {
		const chars = Array.from(segmenter.segment(chunk)).map((s) => s.segment);
		if (chars.length === 0) return;
		const now = performance.now();
		chunkQueueRef.current = [...chunkQueueRef.current, ...chars];
		if (firstChunkTRef.current < 0) firstChunkTRef.current = now;
		totalCharsRef.current += chars.length;
		const prev = lastArrivalTRef.current;
		lastArrivalTRef.current = now;
		if (prev > 0) {
			const gap = now - prev;
			const gaps = gapsRef.current;
			if (sawFirstChunkRef.current) {
				gaps.push(gap);
				if (gaps.length > GAP_SAMPLES) gaps.shift();
			}
			const sorted = [...gaps].sort((a, b) => a - b);
			const medGap = sorted[sorted.length >> 1] ?? 0;
			if (gap > Math.max(STALL_ARM_ABS_MIN_SEC * 1e3, STALL_ARM_FACTOR * medGap)) stallEstRef.current = Math.max(stallEstRef.current, Math.min(gap / 1e3, TARGET_DELAY_CAP_SEC));
			sawFirstChunkRef.current = true;
		}
		ensureLoopRef.current();
	}, []);
	const reset = (0, import_react.useCallback)((newText = "") => {
		if (animationFrameRef.current !== null) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}
		chunkQueueRef.current = [];
		totalCharsRef.current = 0;
		firstChunkTRef.current = -1;
		stallEstRef.current = 0;
		gapsRef.current = [];
		lastArrivalTRef.current = 0;
		sawFirstChunkRef.current = false;
		creditRef.current = 0;
		lastFrameTimeRef.current = 0;
		displayedTextRef.current = newText;
		lastAccumulatedRef.current = newText;
		if (externalStreamDone === void 0) setInternalStreamDone(false);
		onUpdateRef.current(newText);
		ensureLoopRef.current();
	}, [externalStreamDone]);
	const update = (0, import_react.useCallback)((accumulated, isComplete) => {
		if (accumulated.startsWith(lastAccumulatedRef.current)) {
			const delta = accumulated.slice(lastAccumulatedRef.current.length);
			lastAccumulatedRef.current = accumulated;
			if (delta) addChunk(delta);
		} else {
			lastAccumulatedRef.current = accumulated;
			const shown = displayedTextRef.current;
			if (accumulated.startsWith(shown)) chunkQueueRef.current = Array.from(segmenter.segment(accumulated.slice(shown.length))).map((s) => s.segment);
			else {
				chunkQueueRef.current = [];
				displayedTextRef.current = accumulated;
				onUpdateRef.current(accumulated);
			}
			ensureLoopRef.current();
		}
		if (isComplete && externalStreamDone === void 0) setInternalStreamDone(true);
	}, [addChunk, externalStreamDone]);
	const renderLoop = (0, import_react.useCallback)(() => {
		const queue = chunkQueueRef.current;
		if (queue.length === 0) {
			if (streamDone) {
				onUpdateRef.current(displayedTextRef.current);
				animationFrameRef.current = null;
				return;
			}
			if (lastArrivalTRef.current === 0) lastArrivalTRef.current = performance.now();
			animationFrameRef.current = requestAnimationFrame(renderLoop);
			return;
		}
		const now = performance.now();
		const last = lastFrameTimeRef.current;
		if (last === 0) {
			lastFrameTimeRef.current = now;
			const n = Math.min(MIN_STEP, queue.length);
			displayedTextRef.current += queue.slice(0, n).join("");
			chunkQueueRef.current = queue.slice(n);
			onUpdateRef.current(displayedTextRef.current);
			if (chunkQueueRef.current.length > 0 || !streamDone) animationFrameRef.current = requestAnimationFrame(renderLoop);
			else animationFrameRef.current = null;
			return;
		}
		const elapsed = now - last;
		if (elapsed < minDelay) {
			animationFrameRef.current = requestAnimationFrame(renderLoop);
			return;
		}
		lastFrameTimeRef.current = now;
		const dt = Math.min(elapsed, MAX_FRAME_DT_MS);
		let count;
		if (streamDone) {
			const perFrameToFinish = Math.ceil(queue.length * dt / (POST_STREAM_DRAIN_SEC * 1e3));
			count = Math.max(POST_STREAM_STEP, perFrameToFinish);
		} else {
			const elapsedMs = now - firstChunkTRef.current;
			const ratePerSec = totalCharsRef.current / Math.max(elapsedMs, SUSTAINED_MIN_MS) * 1e3;
			stallEstRef.current *= Math.exp(-(dt / 1e3) / STALL_RELEASE_SEC);
			const target = ratePerSec * Math.min(TARGET_DELAY_CAP_SEC, Math.max(TARGET_DELAY_FLOOR_SEC, stallEstRef.current));
			const adjustedRate = ratePerSec + (queue.length - target) / RELAX_SEC;
			if (adjustedRate > 0) {
				creditRef.current += adjustedRate * dt / 1e3;
				count = Math.floor(creditRef.current);
				creditRef.current -= count;
			} else {
				count = MIN_STEP;
				creditRef.current = 0;
			}
			if (queue.length - count > MAX_BACKLOG) count = queue.length - MAX_BACKLOG;
		}
		count = Math.min(count, queue.length);
		displayedTextRef.current += queue.slice(0, count).join("");
		chunkQueueRef.current = queue.slice(count);
		onUpdateRef.current(displayedTextRef.current);
		if (chunkQueueRef.current.length > 0 || !streamDone) animationFrameRef.current = requestAnimationFrame(renderLoop);
		else animationFrameRef.current = null;
	}, [streamDone, minDelay]);
	const ensureLoop = (0, import_react.useCallback)(() => {
		if (animationFrameRef.current === null) animationFrameRef.current = requestAnimationFrame(renderLoop);
	}, [renderLoop]);
	const ensureLoopRef = (0, import_react.useRef)(ensureLoop);
	(0, import_react.useEffect)(() => {
		ensureLoopRef.current = ensureLoop;
	});
	(0, import_react.useEffect)(() => {
		ensureLoop();
		return () => {
			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current);
				animationFrameRef.current = null;
			}
		};
	}, [ensureLoop]);
	return {
		addChunk,
		reset,
		update
	};
};
export { useSmoothStream as t };
