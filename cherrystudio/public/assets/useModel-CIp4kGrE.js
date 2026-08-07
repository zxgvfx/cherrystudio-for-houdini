import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { n as omitBy, t as isUndefined } from "./isUndefined-CZjb9k0E.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
import { i as createUniqueModelId } from "./model-CfoN7z8F.js";
import { c as useQuery, o as useMutation } from "./useDataApi-DhDD9bgI.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useModels");
var EMPTY_MODELS = Object.freeze([]);
function useDefaultModel(options = {}) {
	const enabled = options.enabled ?? true;
	const [defaultModelId, setDefaultModelId] = usePreference("chat.default_model_id");
	const [quickModelId, setQuickModelId] = usePreference("feature.quick_assistant.model_id");
	const [translateModelId, setTranslateModelId] = usePreference("feature.translate.model_id");
	const [paintingModelId, setPaintingModelId] = usePreference("feature.paintings.default_model_id");
	const { model: defaultModel } = useModelById(enabled ? defaultModelId : null);
	const { model: quickModel } = useModelById(enabled ? quickModelId ?? defaultModelId : null);
	const { model: translateModel } = useModelById(enabled ? translateModelId ?? defaultModelId : null);
	const { model: paintingModel } = useModelById(enabled ? paintingModelId : null);
	return {
		defaultModel,
		quickModel,
		translateModel,
		paintingModel,
		setDefaultModel: async (next, options$1) => {
			await setDefaultModelId(next.id);
			await Promise.all([options$1?.forceCascade || !quickModelId ? setQuickModelId(next.id) : Promise.resolve(), options$1?.forceCascade || !translateModelId ? setTranslateModelId(next.id) : Promise.resolve()]);
		},
		setQuickModel: (next) => setQuickModelId(next.id),
		setTranslateModel: (next) => setTranslateModelId(next.id),
		setPaintingModel: (next) => setPaintingModelId(next.id)
	};
}
function useModels(query, options) {
	const filtered = query ? omitBy(query, isUndefined) : void 0;
	const hasQuery = filtered && Object.keys(filtered).length > 0;
	const fetchEnabledFlag = options?.fetchEnabled;
	const hasEnabled = fetchEnabledFlag !== void 0;
	const { data, isLoading, refetch } = useQuery("/models", hasQuery || hasEnabled ? {
		...hasQuery && { query: filtered },
		...hasEnabled && { enabled: fetchEnabledFlag },
		...options?.swrOptions && { swrOptions: options.swrOptions }
	} : options?.swrOptions ? { swrOptions: options.swrOptions } : void 0);
	return {
		models: data ?? EMPTY_MODELS,
		isLoading,
		refetch
	};
}
function useModelMutations() {
	const { trigger: createTrigger, isLoading: isCreating, error: createError } = useMutation("POST", "/models", { refresh: ["/models"] });
	const { trigger: deleteTrigger, isLoading: isDeleting, error: deleteError } = useMutation("DELETE", "/models/:uniqueModelId*", { refresh: ["/models"] });
	const { trigger: bulkDeleteTrigger, isLoading: isBulkDeleting, error: bulkDeleteError } = useMutation("DELETE", "/models", { refresh: ["/models"] });
	const { trigger: updateTrigger, isLoading: isUpdating, error: updateError } = useMutation("PATCH", "/models/:uniqueModelId*", { refresh: ["/models"] });
	const { trigger: bulkUpdateTrigger, isLoading: isBulkUpdating, error: bulkUpdateError } = useMutation("PATCH", "/models", { refresh: ["/models"] });
	return {
		createModel: (0, import_react.useCallback)(async (dto) => {
			try {
				const [created] = await createTrigger({ body: [dto] });
				return created;
			} catch (error) {
				logger.error("Failed to create model", {
					providerId: dto.providerId,
					modelId: dto.modelId,
					error
				});
				throw error;
			}
		}, [createTrigger]),
		createModels: (0, import_react.useCallback)(async (dtos) => {
			try {
				return await createTrigger({ body: dtos });
			} catch (error) {
				logger.error("Failed to create models", {
					count: dtos.length,
					error
				});
				throw error;
			}
		}, [createTrigger]),
		isCreating,
		createError,
		deleteModel: (0, import_react.useCallback)(async (providerId, modelId) => {
			try {
				await deleteTrigger({ params: { uniqueModelId: createUniqueModelId(providerId, modelId) } });
			} catch (error) {
				logger.error("Failed to delete model", {
					providerId,
					modelId,
					error
				});
				throw error;
			}
		}, [deleteTrigger]),
		isDeleting,
		deleteError,
		deleteModels: (0, import_react.useCallback)(async (uniqueModelIds) => {
			try {
				await bulkDeleteTrigger({ query: { ids: uniqueModelIds } });
			} catch (error) {
				logger.error("Failed to bulk delete models", {
					count: uniqueModelIds.length,
					error
				});
				throw error;
			}
		}, [bulkDeleteTrigger]),
		isBulkDeleting,
		bulkDeleteError,
		updateModel: (0, import_react.useCallback)(async (providerId, modelId, updates) => {
			try {
				await updateTrigger({
					params: { uniqueModelId: createUniqueModelId(providerId, modelId) },
					body: updates
				});
			} catch (error) {
				logger.error("Failed to update model", {
					providerId,
					modelId,
					error
				});
				throw error;
			}
		}, [updateTrigger]),
		isUpdating,
		updateError,
		updateModels: (0, import_react.useCallback)(async (items) => {
			try {
				return await bulkUpdateTrigger({ body: items });
			} catch (error) {
				logger.error("Failed to bulk update models", {
					count: items.length,
					error
				});
				throw error;
			}
		}, [bulkUpdateTrigger]),
		isBulkUpdating,
		bulkUpdateError
	};
}
function useModelById(uniqueModelId) {
	const modelKey = uniqueModelId ?? "";
	const { data, isLoading, error, refetch, mutate } = useQuery(`/models/${modelKey}`, {
		enabled: !!modelKey,
		swrOptions: { keepPreviousData: false }
	});
	return {
		model: data,
		isLoading,
		error,
		refetch,
		mutate
	};
}
export { useModels as i, useModelById as n, useModelMutations as r, useDefaultModel as t };
