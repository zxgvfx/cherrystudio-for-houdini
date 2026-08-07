import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as AbsoluteFilePathSchema } from "./file-KsLXrn8b.js";
import { a as useInvalidateCache, i as useInfiniteQuery, r as useInfiniteFlatItems } from "./useDataApi-DhDD9bgI.js";
import { n as KNOWLEDGE_RUNTIME_ITEMS_MAX } from "./knowledge-CVZUSImo.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useListboxKeyboardNavigation = ({ open, options, value, onSelect }) => {
	const listboxId = (0, import_react.useId)();
	const listRef = (0, import_react.useRef)(null);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(-1);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setActiveIndex(-1);
			return;
		}
		const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled);
		setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled));
	}, [
		open,
		options,
		value
	]);
	(0, import_react.useEffect)(() => {
		if (activeIndex < 0) return;
		(listRef.current?.querySelector(`[data-listbox-option-index="${activeIndex}"]`))?.scrollIntoView?.({ block: "nearest" });
	}, [activeIndex]);
	const step = (from, direction) => {
		for (let count = 0, index = from; count < options.length; count += 1) {
			index = (index + direction + options.length) % options.length;
			if (!options[index]?.disabled) return index;
		}
		return -1;
	};
	const handleKeyDown = (event) => {
		if (event.nativeEvent.isComposing || event.keyCode === 229) return;
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setActiveIndex((index) => step(index < 0 ? -1 : index, 1));
				return;
			case "ArrowUp":
				event.preventDefault();
				setActiveIndex((index) => step(index < 0 ? options.length : index, -1));
				return;
			case "Home":
				if (options.length === 0) return;
				event.preventDefault();
				setActiveIndex(step(-1, 1));
				return;
			case "End":
				if (options.length === 0) return;
				event.preventDefault();
				setActiveIndex(step(0, -1));
				return;
			case "Enter": {
				if (event.target instanceof HTMLElement && event.target.closest("button")) return;
				const option = options[activeIndex];
				if (!option || option.disabled) return;
				event.preventDefault();
				onSelect(option);
				return;
			}
		}
	};
	const getOptionId = (index) => `${listboxId}-option-${index}`;
	return {
		activeIndex,
		activeOptionId: options[activeIndex] ? getOptionId(activeIndex) : void 0,
		getOptionId,
		handleKeyDown,
		listboxId,
		listRef,
		setActiveIndex
	};
};
const KNOWLEDGE_ITEMS_PAGE_SIZE = 50;
var KNOWLEDGE_ITEMS_POLLING_INTERVAL = 2e3;
var TERMINAL_STATUSES = new Set(["completed", "failed"]);
var chunkKnowledgeItemIds = (itemIds) => {
	const batches = [];
	for (let index = 0; index < itemIds.length; index += 100) batches.push(itemIds.slice(index, index + 100));
	return batches;
};
var hasNonTerminalItem = (pages) => pages?.some((page) => page.items.some((item) => !TERMINAL_STATUSES.has(item.status))) ?? false;
var normalizeKnowledgeError = (error) => {
	if (error instanceof Error) return error;
	return new Error(String(error));
};
var addLogger = loggerService.withContext("useAddKnowledgeItems");
var deleteLogger = loggerService.withContext("useDeleteKnowledgeItem");
var reindexLogger = loggerService.withContext("useReindexKnowledgeItem");
var refreshKnowledgeItemsCaches = async (invalidateCache, baseId, logger, message, context) => {
	try {
		await invalidateCache([`/knowledge-bases/${baseId}/items`, "/knowledge-bases"]);
	} catch (invalidateError) {
		logger.error(message, normalizeKnowledgeError(invalidateError), context);
	}
};
const useKnowledgeItems = (baseId, groupId = null) => {
	const [revalidateAllPages, setRevalidateAllPages] = (0, import_react.useState)(false);
	const query = (0, import_react.useMemo)(() => ({ groupId }), [groupId]);
	const { pages, isLoading, error, hasNext, loadNext, refresh } = useInfiniteQuery("/knowledge-bases/:id/items", {
		params: { id: baseId },
		query,
		limit: 50,
		enabled: Boolean(baseId),
		swrOptions: {
			refreshInterval: (pages$1) => hasNonTerminalItem(pages$1) ? KNOWLEDGE_ITEMS_POLLING_INTERVAL : 0,
			revalidateAll: revalidateAllPages
		}
	});
	(0, import_react.useEffect)(() => {
		setRevalidateAllPages(hasNonTerminalItem(pages));
	}, [pages]);
	const items = useInfiniteFlatItems(pages);
	const total = pages[0]?.total ?? 0;
	const hasMore = hasNext;
	const [isLoadingMore, setIsLoadingMore] = (0, import_react.useState)(false);
	const loadStartPagesRef = (0, import_react.useRef)(0);
	const loadMore = (0, import_react.useCallback)(() => {
		if (isLoadingMore || !hasMore) return;
		loadStartPagesRef.current = pages.length;
		setIsLoadingMore(true);
		loadNext();
	}, [
		isLoadingMore,
		hasMore,
		pages.length,
		loadNext
	]);
	(0, import_react.useEffect)(() => {
		if (isLoadingMore && (pages.length > loadStartPagesRef.current || !hasNext || error)) setIsLoadingMore(false);
	}, [
		isLoadingMore,
		pages.length,
		hasNext,
		error
	]);
	(0, import_react.useEffect)(() => {
		setIsLoadingMore(false);
		loadStartPagesRef.current = 0;
	}, [baseId, groupId]);
	return {
		items,
		total,
		isLoading,
		error,
		hasMore,
		isLoadingMore,
		loadMore,
		refresh
	};
};
const useAddKnowledgeItems = (baseId) => {
	const [error, setError] = (0, import_react.useState)();
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const invalidateCache = useInvalidateCache();
	return {
		submit: (0, import_react.useCallback)(async (items, conflictStrategy) => {
			if (!baseId) return Promise.reject(/* @__PURE__ */ new Error("Knowledge base id is required"));
			if (items.length === 0) return Promise.reject(/* @__PURE__ */ new Error("At least one knowledge source must be selected"));
			setError(void 0);
			setIsSubmitting(true);
			let submitError;
			let result;
			try {
				result = await ipcApi.request("knowledge.add_items", {
					baseId,
					items,
					conflictStrategy
				});
			} catch (error$1) {
				submitError = normalizeKnowledgeError(error$1);
				addLogger.error("Failed to add knowledge sources", submitError, {
					baseId,
					sourceCount: items.length
				});
				setError(submitError);
			} finally {
				if (submitError || result?.status === "added") await refreshKnowledgeItemsCaches(invalidateCache, baseId, addLogger, "Failed to refresh knowledge source list after submit", { baseId });
				setIsSubmitting(false);
			}
			if (submitError) throw submitError;
			return result;
		}, [baseId, invalidateCache]),
		isSubmitting,
		error
	};
};
const useDeleteKnowledgeItem = (baseId) => {
	const [error, setError] = (0, import_react.useState)();
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	const invalidateCache = useInvalidateCache();
	const deleteItems = (0, import_react.useCallback)(async (itemIds) => {
		if (!baseId) return Promise.reject(/* @__PURE__ */ new Error("Knowledge base id is required"));
		setError(void 0);
		setIsDeleting(true);
		let deleteError;
		try {
			for (const batchItemIds of chunkKnowledgeItemIds(itemIds)) await ipcApi.request("knowledge.delete_items", {
				baseId,
				itemIds: batchItemIds
			});
		} catch (error$1) {
			deleteError = normalizeKnowledgeError(error$1);
			deleteLogger.error("Failed to delete knowledge source", deleteError, {
				baseId,
				itemIds
			});
			setError(deleteError);
		} finally {
			await refreshKnowledgeItemsCaches(invalidateCache, baseId, deleteLogger, "Failed to refresh knowledge source list after delete", {
				baseId,
				itemIds
			});
			setIsDeleting(false);
		}
		if (deleteError) throw deleteError;
	}, [baseId, invalidateCache]);
	return {
		deleteItems,
		deleteItem: (0, import_react.useCallback)((item) => deleteItems([item.id]), [deleteItems]),
		isDeleting,
		error
	};
};
const useReindexKnowledgeItem = (baseId) => {
	const [error, setError] = (0, import_react.useState)();
	const [isReindexing, setIsReindexing] = (0, import_react.useState)(false);
	const invalidateCache = useInvalidateCache();
	const reindexItems = (0, import_react.useCallback)(async (itemIds) => {
		if (!baseId) return Promise.reject(/* @__PURE__ */ new Error("Knowledge base id is required"));
		setError(void 0);
		setIsReindexing(true);
		let reindexError;
		try {
			for (const batchItemIds of chunkKnowledgeItemIds(itemIds)) await ipcApi.request("knowledge.reindex_items", {
				baseId,
				itemIds: batchItemIds
			});
		} catch (error$1) {
			reindexError = normalizeKnowledgeError(error$1);
			reindexLogger.error("Failed to reindex knowledge source", reindexError, {
				baseId,
				itemIds
			});
			setError(reindexError);
		} finally {
			await refreshKnowledgeItemsCaches(invalidateCache, baseId, reindexLogger, "Failed to refresh knowledge source list after reindex", {
				baseId,
				itemIds
			});
			setIsReindexing(false);
		}
		if (reindexError) throw reindexError;
	}, [baseId, invalidateCache]);
	return {
		reindexItems,
		reindexItem: (0, import_react.useCallback)((item) => reindexItems([item.id]), [reindexItems]),
		isReindexing,
		error
	};
};
const resolveKnowledgeFileData = async (externalPath, displayName = externalPath) => {
	const source = externalPath.trim();
	if (!source) throw new Error(`Failed to resolve a local path for "${displayName}"`);
	const result = AbsoluteFilePathSchema.safeParse(source);
	if (!result.success) throw new Error(`Failed to resolve an absolute local path for "${displayName}"`);
	return {
		source,
		path: result.data
	};
};
const resolveKnowledgeFileMetadataEntryData = async (file) => resolveKnowledgeFileData(file.path, file.origin_name || file.name);
export { useDeleteKnowledgeItem as a, useListboxKeyboardNavigation as c, useAddKnowledgeItems as i, resolveKnowledgeFileMetadataEntryData as n, useKnowledgeItems as o, KNOWLEDGE_ITEMS_PAGE_SIZE as r, useReindexKnowledgeItem as s, resolveKnowledgeFileData as t };
