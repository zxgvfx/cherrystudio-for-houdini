import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { L as AGENTS_MAX_LIMIT, i as formatErrorMessageWithPrefix, z as sanitizeAgentConfiguration } from "./error-3V5V4Mev.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { a as useInvalidateCache, c as useQuery, o as useMutation } from "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as FolderPen } from "./folder-pen-BZuTvpgY.js";
import { t as Hand } from "./hand-DmYqu5Yr.js";
import { t as Route } from "./route-CrZMTzaG.js";
import { t as ShieldAlert } from "./shield-alert-B6lZZRb-.js";
import { t as ShieldCheck } from "./shield-check-CLBeCwLn.js";
import { k as createAgentAndRefresh } from "./resourceCatalog-Bd6dsVEl.js";
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
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PERMISSION_MODE_ICONS = {
	default: Hand,
	plan: Route,
	acceptEdits: FolderPen,
	auto: ShieldCheck,
	bypassPermissions: ShieldAlert
};
function PermissionModeIcon({ mode, size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PERMISSION_MODE_ICONS[mode] ?? Hand, {
		size,
		className: mode === "bypassPermissions" ? "text-destructive" : "text-muted-foreground"
	});
}
function PermissionModeOptionLabel({ card, t, withDescription = true, withWarning = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.permission-mode-option-label",
		className: "flex flex-col gap-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-sm", card.dangerous && "text-destructive"),
				children: t(card.titleKey, card.titleFallback)
			}),
			withDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-xs", card.dangerous ? "text-destructive" : "text-muted-foreground"),
				children: t(card.descriptionKey, card.descriptionFallback)
			}),
			withWarning && card.warningKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-xs", card.dangerous ? "text-destructive" : "text-warning"),
				children: t(card.warningKey, card.warningFallback ?? "")
			})
		]
	});
}
export { useUpdateAgent as a, useAgents as i, PermissionModeOptionLabel as n, useAgent as r, PermissionModeIcon as t };
