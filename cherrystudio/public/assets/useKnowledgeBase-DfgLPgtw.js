import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { C as string, M as datetime, S as strictObject, n as _enum, u as int } from "./schemas-1oAyIgyK.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { a as useInvalidateCache, i as useInfiniteQuery, o as useMutation, r as useInfiniteFlatItems } from "./useDataApi-H7ZhyZ_J.js";
import { a as KnowledgeBaseGroupIdInputSchema, c as KnowledgeItemTypeSchema, r as KnowledgeBaseEntitySchema } from "./knowledge-8Me8AnnG.js";
KnowledgeBaseEntitySchema.pick({
	name: true,
	groupId: true,
	embeddingModelId: true,
	dimensions: true,
	rerankModelId: true,
	fileProcessorId: true,
	chunkSize: true,
	chunkOverlap: true,
	chunkStrategy: true,
	chunkSeparator: true,
	threshold: true,
	documentCount: true
}).partial().extend({
	groupId: KnowledgeBaseGroupIdInputSchema.nullable().optional(),
	rerankModelId: KnowledgeBaseEntitySchema.shape.rerankModelId,
	fileProcessorId: KnowledgeBaseEntitySchema.shape.fileProcessorId,
	threshold: KnowledgeBaseEntitySchema.shape.threshold,
	documentCount: KnowledgeBaseEntitySchema.shape.documentCount
}).superRefine((value, ctx) => {
	const embeddingModelIdProvided = value.embeddingModelId !== void 0;
	if (embeddingModelIdProvided !== (value.dimensions !== void 0)) {
		ctx.addIssue({
			code: "custom",
			path: ["dimensions"],
			message: "Embedding model and dimensions must be provided together"
		});
		return;
	}
	if (embeddingModelIdProvided && value.embeddingModelId === null !== (value.dimensions === null)) ctx.addIssue({
		code: "custom",
		path: ["dimensions"],
		message: "Embedding model and dimensions must be both null or both set"
	});
});
strictObject({
	cursor: string().optional(),
	limit: int().positive().max(100).default(20),
	search: string().trim().min(1).optional(),
	updatedAtFrom: datetime().optional(),
	sortBy: _enum([
		"createdAt",
		"updatedAt",
		"name"
	]).optional(),
	sortOrder: _enum(["asc", "desc"]).optional()
});
strictObject({
	cursor: string().optional(),
	limit: int().positive().max(100).default(20),
	type: KnowledgeItemTypeSchema.optional(),
	groupId: string().nullable().optional()
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useKnowledgeBases");
var EMPTY_KNOWLEDGE_BASES = [];
var normalizeError = (error) => {
	if (error instanceof Error) return error;
	return new Error(String(error));
};
const useKnowledgeBases = (options = {}) => {
	const enabled = options.enabled !== false;
	const [revalidateAllPages, setRevalidateAllPages] = (0, import_react.useState)(false);
	const { pages, isLoading, isRefreshing, error, hasNext, loadNext, refresh } = useInfiniteQuery("/knowledge-bases", {
		limit: 100,
		enabled: options.enabled,
		swrOptions: {
			revalidateAll: revalidateAllPages,
			revalidateFirstPage: false,
			...options.revalidateOnFocus !== void 0 && { revalidateOnFocus: options.revalidateOnFocus }
		}
	});
	const flatBases = useInfiniteFlatItems(pages);
	const isFullyLoaded = enabled && pages.length > 0 && !isLoading && !hasNext && !error;
	const lastCompleteBasesRef = (0, import_react.useRef)(EMPTY_KNOWLEDGE_BASES);
	if (isFullyLoaded) lastCompleteBasesRef.current = flatBases;
	(0, import_react.useEffect)(() => {
		setRevalidateAllPages(isFullyLoaded);
	}, [isFullyLoaded]);
	(0, import_react.useEffect)(() => {
		if (enabled && hasNext && !isLoading && !isRefreshing && !error) loadNext();
	}, [
		enabled,
		error,
		hasNext,
		isLoading,
		isRefreshing,
		loadNext
	]);
	return {
		bases: enabled ? lastCompleteBasesRef.current : EMPTY_KNOWLEDGE_BASES,
		isLoading: enabled && !isFullyLoaded && !error,
		error,
		refetch: refresh
	};
};
const useCreateKnowledgeBase = () => {
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	const [createError, setCreateError] = (0, import_react.useState)();
	const invalidateCache = useInvalidateCache();
	return {
		createBase: (0, import_react.useCallback)(async (input) => {
			setCreateError(void 0);
			const name = input.name.trim();
			const groupId = input.groupId?.trim();
			const embeddingModelId = input.embeddingModelId?.trim();
			if (!name) throw new Error("Knowledge base name is required");
			const body = { name };
			if (groupId) body.groupId = groupId;
			if (embeddingModelId) {
				body.embeddingModelId = embeddingModelId;
				body.dimensions = input.dimensions;
			}
			setIsCreating(true);
			try {
				const createdBase = await ipcApi.request("knowledge.create_base", { base: body });
				try {
					await invalidateCache("/knowledge-bases");
				} catch (invalidateError) {
					logger.error("Failed to refresh knowledge base list after create", normalizeError(invalidateError), { baseId: createdBase.id });
				}
				setIsCreating(false);
				return createdBase;
			} catch (error) {
				const normalizedError = normalizeError(error);
				logger.error("Failed to create knowledge base", normalizedError, {
					name,
					groupId
				});
				setCreateError(normalizedError);
				setIsCreating(false);
				throw normalizedError;
			}
		}, [invalidateCache]),
		isCreating,
		createError
	};
};
const useRestoreKnowledgeBase = () => {
	const [isRestoring, setIsRestoring] = (0, import_react.useState)(false);
	const [restoreError, setRestoreError] = (0, import_react.useState)();
	const invalidateCache = useInvalidateCache();
	return {
		restoreBase: (0, import_react.useCallback)(async (input) => {
			setRestoreError(void 0);
			const sourceBaseId = input.sourceBaseId.trim();
			const name = input.name?.trim();
			const embeddingModelId = input.embeddingModelId?.trim() || null;
			const dimensions = input.dimensions;
			if (!sourceBaseId) throw new Error("Source knowledge base id is required");
			if (!name) throw new Error("Knowledge base name is required");
			if (dimensions !== null && (!Number.isInteger(dimensions) || dimensions <= 0)) throw new Error(`Knowledge base dimensions must be a positive integer, received "${input.dimensions}"`);
			if (embeddingModelId === null !== (dimensions === null)) throw new Error("Knowledge base embedding model and dimensions must be provided together");
			setIsRestoring(true);
			try {
				const result = await ipcApi.request("knowledge.restore_base", {
					sourceBaseId,
					name,
					embeddingModelId,
					dimensions
				});
				try {
					await invalidateCache("/knowledge-bases");
				} catch (invalidateError) {
					logger.error("Failed to refresh knowledge base list after restore", normalizeError(invalidateError), {
						sourceBaseId,
						restoredBaseId: result.base.id
					});
				}
				setIsRestoring(false);
				return result;
			} catch (error) {
				const normalizedError = normalizeError(error);
				logger.error("Failed to restore knowledge base", normalizedError, {
					sourceBaseId,
					name,
					embeddingModelId
				});
				setRestoreError(normalizedError);
				setIsRestoring(false);
				throw normalizedError;
			}
		}, [invalidateCache]),
		isRestoring,
		restoreError
	};
};
const useEnableKnowledgeBaseEmbedding = () => {
	const [isEnabling, setIsEnabling] = (0, import_react.useState)(false);
	const [enableError, setEnableError] = (0, import_react.useState)();
	const invalidateCache = useInvalidateCache();
	return {
		enableEmbedding: (0, import_react.useCallback)(async (baseId, patch) => {
			setEnableError(void 0);
			const trimmedBaseId = baseId.trim();
			const embeddingModelId = patch.embeddingModelId?.trim();
			const dimensions = patch.dimensions;
			if (!trimmedBaseId) throw new Error("Knowledge base id is required");
			if (!embeddingModelId) throw new Error("Knowledge base embedding model is required");
			if (!Number.isInteger(dimensions) || dimensions <= 0) throw new Error(`Knowledge base dimensions must be a positive integer, received "${dimensions}"`);
			setIsEnabling(true);
			try {
				const result = await ipcApi.request("knowledge.enable_embedding_model", {
					baseId: trimmedBaseId,
					patch: {
						...patch,
						embeddingModelId,
						dimensions
					}
				});
				try {
					await invalidateCache([`/knowledge-bases/${trimmedBaseId}/items`, "/knowledge-bases"]);
				} catch (invalidateError) {
					logger.error("Failed to refresh knowledge base list after enabling embedding", normalizeError(invalidateError), { baseId: trimmedBaseId });
				}
				setIsEnabling(false);
				return result;
			} catch (error) {
				const normalizedError = normalizeError(error);
				logger.error("Failed to enable knowledge base embedding", normalizedError, {
					baseId: trimmedBaseId,
					embeddingModelId
				});
				setEnableError(normalizedError);
				setIsEnabling(false);
				throw normalizedError;
			}
		}, [invalidateCache]),
		isEnabling,
		enableError
	};
};
const useUpdateKnowledgeBase = () => {
	const { trigger: updateTrigger, isLoading: isUpdating, error: updateError } = useMutation("PATCH", "/knowledge-bases/:id", { refresh: ["/knowledge-bases"] });
	return {
		updateBase: (0, import_react.useCallback)(async (baseId, updates) => {
			try {
				return await updateTrigger({
					params: { id: baseId },
					body: updates
				});
			} catch (error) {
				const normalizedError = normalizeError(error);
				logger.error("Failed to update knowledge base", normalizedError, {
					baseId,
					updates
				});
				throw normalizedError;
			}
		}, [updateTrigger]),
		isUpdating,
		updateError
	};
};
const useDeleteKnowledgeBase = () => {
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	const [deleteError, setDeleteError] = (0, import_react.useState)();
	const invalidateCache = useInvalidateCache();
	return {
		deleteBase: (0, import_react.useCallback)(async (baseId) => {
			setDeleteError(void 0);
			setIsDeleting(true);
			let mutationError;
			try {
				await ipcApi.request("knowledge.delete_base", { baseId });
			} catch (error) {
				const normalizedError = normalizeError(error);
				logger.error("Failed to delete knowledge base", normalizedError, { baseId });
				setDeleteError(normalizedError);
				mutationError = normalizedError;
			}
			try {
				await invalidateCache([
					"/knowledge-bases",
					"/agents",
					"/agents/*",
					"/assistants",
					"/assistants/*"
				]);
			} catch (invalidateError) {
				logger.error("Failed to refresh dependent data after knowledge base delete", normalizeError(invalidateError), { baseId });
			}
			setIsDeleting(false);
			if (mutationError) throw mutationError;
		}, [invalidateCache]),
		isDeleting,
		deleteError
	};
};
export { useRestoreKnowledgeBase as a, useKnowledgeBases as i, useDeleteKnowledgeBase as n, useUpdateKnowledgeBase as o, useEnableKnowledgeBaseEmbedding as r, useCreateKnowledgeBase as t };
