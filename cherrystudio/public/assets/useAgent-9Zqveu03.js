import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { B as sanitizeAgentConfiguration, R as AGENTS_MAX_LIMIT, i as formatErrorMessageWithPrefix } from "./error-CskkREu_.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { a as useInvalidateCache, c as useQuery, n as useDataChange, o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { s as createAgentAndRefresh } from "./cocoAgent-Dkf7ljK5.js";
var logger = loggerService.withContext("agentConfiguration");
function parseAgentConfiguration(raw, context) {
	const { data, invalidKeys } = sanitizeAgentConfiguration(raw);
	if (invalidKeys.length > 0) logger.warn("Agent configuration drift detected; dropping invalid keys", {
		...context,
		invalidKeys
	});
	return data;
}
var import_react = /* @__PURE__ */ __toESM(require_react());
const useAgent = (id) => {
	const { data, error, isLoading, refetch } = useQuery("/agents/:agentId", {
		params: { agentId: id },
		enabled: !!id,
		swrOptions: {
			revalidateOnMount: true,
			dedupingInterval: 2e3,
			keepPreviousData: false
		}
	});
	useDataChange("/agents/:agentId", () => {
		refetch();
	}, { routeParams: id ? { agentId: id } : void 0 });
	return {
		agent: (0, import_react.useMemo)(() => {
			if (!data) return void 0;
			return {
				...data,
				configuration: parseAgentConfiguration(data.configuration, {
					entityId: data.id,
					entityType: "agent"
				})
			};
		}, [data]),
		error,
		isLoading,
		revalidate: (0, import_react.useCallback)(async () => {
			await refetch();
		}, [refetch])
	};
};
const useAgents = () => {
	const { t } = useTranslation();
	const { data, isLoading, error, refetch } = useQuery("/agents", { query: { limit: 500 } });
	const agents = (0, import_react.useMemo)(() => data?.items ?? [], [data]);
	const invalidate = useInvalidateCache();
	const addAgent = (0, import_react.useCallback)(async (form) => {
		try {
			const result = await createAgentAndRefresh(form, () => invalidate("/agents"));
			toast.success(t("common.add_success"));
			return {
				success: true,
				data: result
			};
		} catch (error$1) {
			const msg = formatErrorMessageWithPrefix(error$1, t("agent.add.error.failed"));
			toast.error(msg);
			return {
				success: false,
				error: error$1 instanceof Error ? error$1 : new Error(msg)
			};
		}
	}, [invalidate, t]);
	const { trigger: deleteTrigger } = useMutation("DELETE", "/agents/:agentId", { refresh: [
		"/agents",
		"/agent-sessions",
		"/pins"
	] });
	return {
		agents,
		error,
		isLoading,
		addAgent,
		deleteAgent: (0, import_react.useCallback)(async (id) => {
			try {
				await deleteTrigger({ params: { agentId: id } });
				toast.success(t("common.delete_success"));
			} catch (error$1) {
				toast.error(formatErrorMessageWithPrefix(error$1, t("agent.delete.error.failed")));
			}
		}, [deleteTrigger, t]),
		refetch
	};
};
const useUpdateAgent = () => {
	const { t } = useTranslation();
	const { trigger: updateTrigger } = useMutation("PATCH", "/agents/:agentId", { refresh: ({ args }) => ["/agents", `/agents/${args?.params?.agentId}`] });
	const updateAgent = (0, import_react.useCallback)(async (form, options) => {
		try {
			const { id, ...patch } = form;
			const result = await updateTrigger({
				params: { agentId: id },
				body: patch
			});
			if (options?.showSuccessToast ?? true) toast.success({
				key: "update-agent",
				title: t("common.update_success")
			});
			return {
				...result,
				configuration: parseAgentConfiguration(result.configuration, {
					entityId: result.id,
					entityType: "agent"
				})
			};
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("agent.update.error.failed")));
			return;
		}
	}, [updateTrigger, t]);
	return {
		updateAgent,
		updateModel: (0, import_react.useCallback)(async ({ agentId, modelId, reasoningEffort }, options) => {
			return updateAgent({
				id: agentId,
				model: modelId,
				...reasoningEffort === void 0 ? {} : { configuration: { reasoning_effort: reasoningEffort } }
			}, options);
		}, [updateAgent])
	};
};
export { useAgents as n, useUpdateAgent as r, useAgent as t };
