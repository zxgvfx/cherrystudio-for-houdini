import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { a as useInvalidateCache, l as useReadCache, o as useMutation, u as useWriteCache } from "./useDataApi-H7ZhyZ_J.js";
var DEFAULT_ID_KEY = "id";
function readItemId(item, idKey) {
	const value = item[idKey];
	if (typeof value !== "string" || value.length === 0) throw new Error(`reorder utils: item is missing a non-empty string at idKey="${idKey}"`);
	return value;
}
function reorderLocally(items, id, anchor, idKey = DEFAULT_ID_KEY) {
	const fromIndex = items.findIndex((item) => readItemId(item, idKey) === id);
	if (fromIndex === -1) throw new Error(`reorderLocally: target id "${id}" not found in list`);
	const next = items.slice();
	const [target] = next.splice(fromIndex, 1);
	let insertIndex;
	if ("position" in anchor) insertIndex = anchor.position === "first" ? 0 : next.length;
	else if ("before" in anchor) {
		if (anchor.before === id) throw new Error(`reorderLocally: cannot anchor item "${id}" before itself`);
		const anchorIndex = next.findIndex((item) => readItemId(item, idKey) === anchor.before);
		if (anchorIndex === -1) throw new Error(`reorderLocally: anchor id "${anchor.before}" not found (moving "${id}")`);
		insertIndex = anchorIndex;
	} else {
		if (anchor.after === id) throw new Error(`reorderLocally: cannot anchor item "${id}" after itself`);
		const anchorIndex = next.findIndex((item) => readItemId(item, idKey) === anchor.after);
		if (anchorIndex === -1) throw new Error(`reorderLocally: anchor id "${anchor.after}" not found (moving "${id}")`);
		insertIndex = anchorIndex + 1;
	}
	next.splice(insertIndex, 0, target);
	return next;
}
function computeMinimalMoves(currentList, newList, idKey = DEFAULT_ID_KEY) {
	if (currentList.length !== newList.length) throw new Error(`computeMinimalMoves: newList is not a permutation of currentList (length ${newList.length} vs ${currentList.length})`);
	if (currentList.length === 0) return [];
	const currentIndexById = /* @__PURE__ */ new Map();
	for (let i = 0; i < currentList.length; i++) currentIndexById.set(readItemId(currentList[i], idKey), i);
	const perm = new Array(newList.length);
	for (let i = 0; i < newList.length; i++) {
		const newId = readItemId(newList[i], idKey);
		const idx = currentIndexById.get(newId);
		if (idx === void 0) throw new Error(`computeMinimalMoves: newList id "${newId}" does not exist in currentList (not a permutation)`);
		perm[i] = idx;
	}
	if (new Set(perm).size !== perm.length) throw new Error("computeMinimalMoves: newList is not a permutation of currentList (duplicate ids)");
	let isIdentity = true;
	for (let i = 0; i < perm.length; i++) if (perm[i] !== i) {
		isIdentity = false;
		break;
	}
	if (isIdentity) return [];
	const lisIndexSet = longestIncreasingSubsequenceIndices(perm);
	const moves = [];
	for (let i = 0; i < newList.length; i++) {
		if (lisIndexSet.has(i)) continue;
		const id = readItemId(newList[i], idKey);
		if (i === 0) moves.push({
			id,
			anchor: { position: "first" }
		});
		else moves.push({
			id,
			anchor: { after: readItemId(newList[i - 1], idKey) }
		});
	}
	return moves;
}
function longestIncreasingSubsequenceIndices(values) {
	const n = values.length;
	if (n === 0) return /* @__PURE__ */ new Set();
	const tailIndices = [];
	const prev = new Array(n).fill(-1);
	for (let i = 0; i < n; i++) {
		const v = values[i];
		let lo = 0;
		let hi = tailIndices.length;
		while (lo < hi) {
			const mid = lo + hi >>> 1;
			if (values[tailIndices[mid]] < v) lo = mid + 1;
			else hi = mid;
		}
		if (lo > 0) prev[i] = tailIndices[lo - 1];
		if (lo === tailIndices.length) tailIndices.push(i);
		else tailIndices[lo] = i;
	}
	const result = /* @__PURE__ */ new Set();
	let cursor = tailIndices[tailIndices.length - 1];
	while (cursor !== -1) {
		result.add(cursor);
		cursor = prev[cursor];
	}
	return result;
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useReorder");
function defaultSelectItems(cache) {
	if (cache === void 0 || cache === null) return void 0;
	if (Array.isArray(cache)) return cache;
	if (typeof cache === "object" && "items" in cache) {
		const items = cache.items;
		if (Array.isArray(items)) return items;
	}
}
function defaultUpdateItems(cache, items) {
	if (Array.isArray(cache)) return items;
	if (cache !== null && typeof cache === "object") return {
		...cache,
		items
	};
	return items;
}
function useReorder(collectionUrl, options) {
	if (options?.selectItems !== void 0 !== (options?.updateItems !== void 0)) throw new Error("useReorder: options.selectItems and options.updateItems must be provided together");
	const selectItems = options?.selectItems ?? defaultSelectItems;
	const updateItems = options?.updateItems ?? defaultUpdateItems;
	const readCache = useReadCache();
	const writeCache = useWriteCache();
	const invalidateCache = useInvalidateCache();
	const [isPending, setIsPending] = (0, import_react.useState)(false);
	const unrecognizedWarnedRef = (0, import_react.useRef)(false);
	const revalidate = options?.revalidateOnSuccess !== false;
	const idKey = options?.idKey ?? "id";
	const computeOptimistic = options?.computeOptimistic ?? reorderLocally;
	const { trigger: patchOrder } = useMutation("PATCH", `${collectionUrl}/:id/order`, revalidate ? { refresh: [collectionUrl] } : void 0);
	const { trigger: patchBatch } = useMutation("PATCH", `${collectionUrl}/order:batch`, revalidate ? { refresh: [collectionUrl] } : void 0);
	const readCurrent = (0, import_react.useCallback)(() => readCache(collectionUrl), [readCache, collectionUrl]);
	const warnUnrecognizedShape = (0, import_react.useCallback)((source) => {
		if (unrecognizedWarnedRef.current) return;
		unrecognizedWarnedRef.current = true;
		logger.warn(`${source}: cache at ${String(collectionUrl)} has unrecognized shape; provide options.selectItems/updateItems or use a flat array / { items } response`);
	}, [collectionUrl]);
	const move = (0, import_react.useCallback)(async (id, anchor) => {
		const current = readCurrent();
		if (current === void 0) {
			logger.warn(`move called before data loaded at ${String(collectionUrl)}; ignored`);
			return;
		}
		setIsPending(true);
		const items = selectItems(current);
		const optimistic = items !== void 0 ? updateItems(current, computeOptimistic(items, id, anchor, idKey)) : void 0;
		if (items === void 0) warnUnrecognizedShape("move");
		try {
			if (optimistic !== void 0) await writeCache(collectionUrl, optimistic);
			await patchOrder({
				params: { id },
				body: anchor
			});
		} catch (err) {
			logger.warn(`move failed for ${String(collectionUrl)} id=${id}, rolling back`, { error: err });
			await invalidateCache(collectionUrl);
			throw err;
		} finally {
			setIsPending(false);
		}
	}, [
		readCurrent,
		selectItems,
		updateItems,
		computeOptimistic,
		idKey,
		writeCache,
		invalidateCache,
		collectionUrl,
		patchOrder,
		warnUnrecognizedShape
	]);
	const applyBatch = (0, import_react.useCallback)(async (current, items, moves) => {
		setIsPending(true);
		let next = items;
		for (const m of moves) next = computeOptimistic(next, m.id, m.anchor, idKey);
		const optimistic = updateItems(current, next);
		try {
			await writeCache(collectionUrl, optimistic);
			await patchBatch({ body: { moves } });
		} catch (err) {
			logger.warn(`batch reorder failed for ${String(collectionUrl)}, rolling back`, { error: err });
			await invalidateCache(collectionUrl);
			throw err;
		} finally {
			setIsPending(false);
		}
	}, [
		updateItems,
		computeOptimistic,
		idKey,
		writeCache,
		invalidateCache,
		collectionUrl,
		patchBatch
	]);
	return {
		move,
		applyReorderedList: (0, import_react.useCallback)(async (newList) => {
			const current = readCurrent();
			if (current === void 0) {
				logger.warn(`applyReorderedList called before data loaded at ${String(collectionUrl)}; ignored`);
				return;
			}
			const items = selectItems(current);
			if (items === void 0) {
				warnUnrecognizedShape("applyReorderedList");
				return;
			}
			const moves = computeMinimalMoves(items, newList, idKey);
			if (moves.length === 0) return;
			if (moves.length === 1) return move(moves[0].id, moves[0].anchor);
			return applyBatch(current, items, moves);
		}, [
			readCurrent,
			selectItems,
			idKey,
			move,
			applyBatch,
			collectionUrl,
			warnUnrecognizedShape
		]),
		isPending
	};
}
export { computeMinimalMoves as n, useReorder as t };
