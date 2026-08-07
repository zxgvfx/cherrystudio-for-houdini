import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { n as omitBy, t as isUndefined } from "./isUndefined-CZjb9k0E.js";
import { r as resolver_default } from "./resolver-DYDQGqns.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { c as useQuery, o as useMutation } from "./useDataApi-DhDD9bgI.js";
import { o as getProviderLabelKey } from "./label-B7fCsuWT.js";
import { n as isSystemProviderId } from "./provider-DxZtFw5B.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var EMPTY_PROVIDERS = [];
var logger = loggerService.withContext("useProviders");
function providerRefreshPaths(providerId) {
	return [
		"/providers",
		`/providers/${providerId}`,
		`/providers/${providerId}/*`
	];
}
function useProviders(query, options) {
	const filtered = query ? omitBy(query, isUndefined) : void 0;
	const hasQuery = filtered && Object.keys(filtered).length > 0;
	const { data, isLoading, refetch } = useQuery("/providers", hasQuery || options?.enabled === false || options?.swrOptions ? {
		...hasQuery && { query: filtered },
		...options?.enabled === false && { enabled: false },
		...options?.swrOptions && { swrOptions: options.swrOptions }
	} : void 0);
	const { trigger: createTrigger, isLoading: isCreating, error: createError } = useMutation("POST", "/providers", { refresh: ["/providers"] });
	const createProvider = (0, import_react.useCallback)(async (dto) => {
		try {
			return await createTrigger({ body: dto });
		} catch (error) {
			logger.error("Failed to create provider", {
				providerId: dto.providerId,
				error
			});
			throw error;
		}
	}, [createTrigger]);
	return {
		providers: data ?? EMPTY_PROVIDERS,
		isLoading,
		createProvider,
		isCreating,
		createError,
		refetch
	};
}
function useProvider(providerId) {
	const resolvedProviderId = providerId ?? "";
	const { data, isLoading, error, refetch } = useQuery("/providers/:providerId", {
		params: { providerId: resolvedProviderId },
		enabled: !!providerId,
		swrOptions: { keepPreviousData: false }
	});
	return {
		provider: data,
		isLoading,
		error,
		refetch,
		...useProviderMutations(resolvedProviderId)
	};
}
function useProviderMutations(providerId) {
	const refresh = providerRefreshPaths(providerId);
	const { trigger: patchTrigger, isLoading: isUpdating, error: updateError } = useMutation("PATCH", "/providers/:providerId", { refresh });
	const { trigger: deleteTrigger, isLoading: isDeleting, error: deleteError } = useMutation("DELETE", "/providers/:providerId", { refresh });
	const { trigger: addApiKeyTrigger, isLoading: isAddingApiKey, error: addApiKeyError } = useMutation("POST", "/providers/:providerId/api-keys", { refresh });
	const { trigger: deleteApiKeyTrigger, isLoading: isDeletingApiKey, error: deleteApiKeyError } = useMutation("DELETE", "/providers/:providerId/api-keys/:keyId", { refresh });
	const { trigger: updateApiKeyTrigger, isLoading: isUpdatingApiKey, error: updateApiKeyError } = useMutation("PATCH", "/providers/:providerId/api-keys/:keyId", { refresh });
	const { trigger: replaceApiKeysTrigger } = useMutation("PUT", "/providers/:providerId/api-keys", { refresh });
	const updateProvider = (0, import_react.useCallback)(async (updates) => {
		try {
			return await patchTrigger({
				params: { providerId },
				body: updates
			});
		} catch (error) {
			logger.error("Failed to update provider", {
				providerId,
				error
			});
			throw error;
		}
	}, [patchTrigger, providerId]);
	return {
		updateProvider,
		isUpdating,
		updateError,
		deleteProvider: (0, import_react.useCallback)(async () => {
			try {
				return await deleteTrigger({ params: { providerId } });
			} catch (error) {
				logger.error("Failed to delete provider", {
					providerId,
					error
				});
				throw error;
			}
		}, [deleteTrigger, providerId]),
		isDeleting,
		deleteError,
		enableProvider: (0, import_react.useCallback)(() => updateProvider({ isEnabled: true }), [updateProvider]),
		updateAuthConfig: (0, import_react.useCallback)(async (authConfig) => {
			try {
				await patchTrigger({
					params: { providerId },
					body: { authConfig }
				});
			} catch (error) {
				logger.error("Failed to update auth config", {
					providerId,
					error
				});
				throw error;
			}
		}, [patchTrigger, providerId]),
		addApiKey: (0, import_react.useCallback)(async (key, label) => {
			try {
				await addApiKeyTrigger({
					params: { providerId },
					body: {
						key,
						label
					}
				});
			} catch (error) {
				logger.error("Failed to add API key", {
					providerId,
					error
				});
				throw error;
			}
		}, [addApiKeyTrigger, providerId]),
		isAddingApiKey,
		addApiKeyError,
		deleteApiKey: (0, import_react.useCallback)(async (keyId) => {
			try {
				await deleteApiKeyTrigger({ params: {
					providerId,
					keyId
				} });
			} catch (error) {
				logger.error("Failed to delete API key", {
					providerId,
					keyId,
					error
				});
				throw error;
			}
		}, [deleteApiKeyTrigger, providerId]),
		isDeletingApiKey,
		deleteApiKeyError,
		updateApiKeys: (0, import_react.useCallback)(async (apiKeys) => {
			try {
				await replaceApiKeysTrigger({
					params: { providerId },
					body: { keys: apiKeys }
				});
			} catch (error) {
				logger.error("Failed to update API keys", {
					providerId,
					error
				});
				throw error;
			}
		}, [providerId, replaceApiKeysTrigger]),
		updateApiKey: (0, import_react.useCallback)(async (keyId, updates) => {
			try {
				await updateApiKeyTrigger({
					params: {
						providerId,
						keyId
					},
					body: updates
				});
			} catch (error) {
				logger.error("Failed to update API key", {
					providerId,
					keyId,
					error
				});
				throw error;
			}
		}, [providerId, updateApiKeyTrigger]),
		isUpdatingApiKey,
		updateApiKeyError
	};
}
function useProviderAuthConfig(providerId) {
	const result = useQuery("/providers/:providerId/auth-config", {
		params: { providerId },
		enabled: !!providerId
	});
	return {
		...result,
		data: result.data
	};
}
function useProviderApiKeys(providerId) {
	return useQuery("/providers/:providerId/api-keys", { params: { providerId } });
}
function useProviderPreset(providerId, fields) {
	return useQuery("/providers/:providerId/preset", {
		params: { providerId: providerId ?? "" },
		query: { fields: [...fields] },
		enabled: !!providerId
	});
}
function getProviderDisplayName(provider) {
	if (!provider) return "";
	return isSystemProviderId(provider.id) ? resolver_default.t(getProviderLabelKey(provider.id)) : provider.name;
}
function useProviderDisplayName(providerId) {
	const { data } = useQuery("/providers/:providerId", {
		params: { providerId: providerId ?? "" },
		enabled: !!providerId,
		swrOptions: { keepPreviousData: false }
	});
	return getProviderDisplayName(data);
}
function useProviderActions() {
	const { trigger: updateTrigger } = useMutation("PATCH", "/providers/:providerId", { refresh: ({ args }) => providerRefreshPaths(args.params.providerId) });
	const { trigger: deleteTrigger } = useMutation("DELETE", "/providers/:providerId", { refresh: ({ args }) => providerRefreshPaths(args.params.providerId) });
	return {
		updateProviderById: (0, import_react.useCallback)(async (providerId, updates) => {
			try {
				return await updateTrigger({
					params: { providerId },
					body: updates
				});
			} catch (error) {
				logger.error("Failed to update provider", {
					providerId,
					error
				});
				throw error;
			}
		}, [updateTrigger]),
		deleteProviderById: (0, import_react.useCallback)(async (providerId) => {
			try {
				return await deleteTrigger({ params: { providerId } });
			} catch (error) {
				logger.error("Failed to delete provider", {
					providerId,
					error
				});
				throw error;
			}
		}, [deleteTrigger])
	};
}
export { useProviderAuthConfig as a, useProviderPreset as c, useProviderApiKeys as i, useProviders as l, useProvider as n, useProviderDisplayName as o, useProviderActions as r, useProviderMutations as s, getProviderDisplayName as t };
