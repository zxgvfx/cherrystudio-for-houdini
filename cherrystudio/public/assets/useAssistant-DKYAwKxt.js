import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import { c as useQuery, o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { n as useModelById } from "./useModel-kU1hKaYa.js";
import { u as useProviders } from "./useProvider-DvntuFRN.js";
import { a as reconcileReasoningEffortForModel, o as reconcileWebSearchForModel } from "./model-BCwc3I-J.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useAssistant");
var ASSISTANTS_LIST_LIMIT = 500;
var EMPTY_ASSISTANTS = Object.freeze([]);
var ASSISTANTS_REFRESH_KEYS = ["/assistants", "/assistants/*"];
function useAssistantsApi(options = {}) {
	const { data, isLoading, isRefreshing, error, refetch, mutate } = useQuery("/assistants", {
		enabled: options.enabled ?? true,
		query: { limit: ASSISTANTS_LIST_LIMIT }
	});
	return {
		assistants: data?.items ?? EMPTY_ASSISTANTS,
		total: data?.total ?? 0,
		hasLoaded: data !== void 0,
		isLoading,
		isRefreshing,
		error,
		refetch,
		mutate
	};
}
function useAssistantApiById(id) {
	const { data, isLoading, error, refetch, mutate } = useQuery("/assistants/:id", {
		params: { id: id ?? "" },
		enabled: !!id,
		swrOptions: { keepPreviousData: false }
	});
	return {
		assistant: data,
		isLoading,
		error,
		refetch,
		mutate
	};
}
function useAssistantMutations() {
	const { trigger: createTrigger, isLoading: isCreating } = useMutation("POST", "/assistants", { refresh: ASSISTANTS_REFRESH_KEYS });
	const { trigger: updateTrigger, isLoading: isUpdating } = useMutation("PATCH", "/assistants/:id", { refresh: ASSISTANTS_REFRESH_KEYS });
	const { trigger: deleteTrigger, isLoading: isDeleting } = useMutation("DELETE", "/assistants/:id", { refresh: ({ args }) => [
		...ASSISTANTS_REFRESH_KEYS,
		"/pins",
		...args?.query?.deleteTopics === true ? ["/topics"] : []
	] });
	const createTriggerRef = (0, import_react.useRef)(createTrigger);
	const updateTriggerRef = (0, import_react.useRef)(updateTrigger);
	const deleteTriggerRef = (0, import_react.useRef)(deleteTrigger);
	createTriggerRef.current = createTrigger;
	updateTriggerRef.current = updateTrigger;
	deleteTriggerRef.current = deleteTrigger;
	return {
		createAssistant: (0, import_react.useCallback)(async (dto) => {
			const created = await createTriggerRef.current({ body: dto });
			logger.info("Created assistant", { id: created.id });
			return created;
		}, []),
		updateAssistant: (0, import_react.useCallback)(async (id, dto) => {
			if (!id) throw new Error("updateAssistant called with empty id; refusing to issue PATCH /assistants/");
			const updated = await updateTriggerRef.current({
				params: { id },
				body: dto
			});
			logger.info("Updated assistant", { id });
			return updated;
		}, []),
		deleteAssistant: (0, import_react.useCallback)(async (id, options = {}) => {
			const result = await deleteTriggerRef.current(options.deleteTopics === true ? {
				params: { id },
				query: { deleteTopics: true }
			} : { params: { id } });
			logger.info("Deleted assistant", {
				id,
				deleteTopics: options.deleteTopics === true
			});
			return result;
		}, []),
		isCreating,
		isUpdating,
		isDeleting
	};
}
function useAssistants() {
	const { assistants, hasLoaded, isLoading, isRefreshing, error, refetch } = useAssistantsApi();
	const { createAssistant, deleteAssistant, updateAssistant } = useAssistantMutations();
	return {
		assistants,
		hasLoaded,
		isLoading,
		isRefreshing,
		error,
		refetch,
		addAssistant: (dto) => createAssistant(dto),
		removeAssistant: (id) => deleteAssistant(id),
		updateAssistant: (id, patch) => updateAssistant(id, patch)
	};
}
function useAssistant(id, options = {}) {
	const { assistant, isLoading, error } = useAssistantApiById(id ?? void 0);
	const { updateAssistant: patchAssistant } = useAssistantMutations();
	const [defaultModelId] = usePreference("chat.default_model_id");
	const shouldLoadDefaultModel = options.loadDefaultModel ?? true;
	const { providers } = useProviders();
	const idRef = (0, import_react.useRef)(id);
	const assistantRef = (0, import_react.useRef)(assistant);
	const patchAssistantRef = (0, import_react.useRef)(patchAssistant);
	const providersRef = (0, import_react.useRef)(providers);
	idRef.current = id;
	assistantRef.current = assistant;
	patchAssistantRef.current = patchAssistant;
	providersRef.current = providers;
	const modelId = assistant?.modelId ?? (!id && shouldLoadDefaultModel ? defaultModelId : void 0);
	const { model, isLoading: isModelLoading } = useModelById(modelId);
	const isModelPending = !!id && isLoading || !!modelId && isModelLoading;
	const isModelMissing = !isModelPending && !model;
	const updateAssistantSettings = (0, import_react.useCallback)((settings) => {
		const currentId = idRef.current;
		const currentAssistant = assistantRef.current;
		if (!currentId || !currentAssistant) return Promise.resolve(void 0);
		return patchAssistantRef.current(currentId, { settings });
	}, []);
	return {
		assistant,
		isLoading,
		error,
		model,
		isModelPending,
		isModelMissing,
		setModel: (0, import_react.useCallback)((next, extraSettings) => {
			const currentId = idRef.current;
			const currentAssistant = assistantRef.current;
			if (!currentId || !currentAssistant) return;
			const reasoning = reconcileReasoningEffortForModel(next, currentAssistant.settings.reasoning_effort);
			const nextProvider = providersRef.current.find((provider) => provider.id === next.providerId);
			const webSearch = reconcileWebSearchForModel(next, currentAssistant.settings, nextProvider);
			const settingsPatch = extraSettings || reasoning || webSearch ? {
				...currentAssistant.settings,
				...reasoning,
				...webSearch,
				...extraSettings
			} : void 0;
			return patchAssistantRef.current(currentId, settingsPatch ? {
				modelId: next.id,
				settings: settingsPatch
			} : { modelId: next.id });
		}, []),
		updateAssistant: (0, import_react.useCallback)((patch) => {
			const currentId = idRef.current;
			if (!currentId) return Promise.resolve(void 0);
			return patchAssistantRef.current(currentId, patch);
		}, []),
		updateAssistantSettings
	};
}
export { useAssistantsApi as a, useAssistants as i, useAssistantApiById as n, useAssistantMutations as r, useAssistant as t };
