import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { C as string, M as datetime, O as uuidv4, S as strictObject, T as unknown, _ as object, a as array, c as discriminatedUnion, g as number, l as emoji, n as _enum, o as boolean, p as literal } from "./schemas-1oAyIgyK.js";
import { H as BUILTIN_AGENT_ROLE } from "./error-CskkREu_.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { a as isUniqueModelId, o as parseUniqueModelId, r as UniqueModelIdSchema } from "./model-BOGgSmTN.js";
import { t as ReasoningEffortOptionSchema } from "./aiSdk-C-csCQz7.js";
import { c as useQuery, o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { t as AGENT_RUNTIME_CAPABILITIES } from "./agentRuntimeCapabilities-C7UvdsI7.js";
import { t as GroupIdSchema } from "./group-Cqj37oRb.js";
import { t as ContextSettingsOverrideSchema } from "./contextSettings-CKgBWQdg.js";
const McpModeSchema = _enum([
	"disabled",
	"auto",
	"manual"
]);
const DEFAULT_MCP_MODE = "manual";
const MIN_TOOL_CALLS = 1;
const MAX_TOOL_CALLS = 1e3;
const AssistantSettingsSchema = object({
	temperature: number().min(0).max(2),
	enableTemperature: boolean(),
	topP: number().min(0).max(1),
	enableTopP: boolean(),
	maxTokens: number().int().positive(),
	enableMaxTokens: boolean(),
	streamOutput: boolean(),
	reasoning_effort: ReasoningEffortOptionSchema,
	mcpMode: McpModeSchema,
	maxToolCalls: number().int().positive(),
	enableMaxToolCalls: boolean(),
	enableWebSearch: boolean(),
	enableGenerateImage: boolean(),
	customParameters: array(discriminatedUnion("type", [
		object({
			name: string(),
			type: literal("string"),
			value: string()
		}),
		object({
			name: string(),
			type: literal("number"),
			value: number()
		}),
		object({
			name: string(),
			type: literal("boolean"),
			value: boolean()
		}),
		object({
			name: string(),
			type: literal("json"),
			value: unknown()
		})
	])),
	contextSettings: ContextSettingsOverrideSchema.nullable().optional()
});
const DEFAULT_ASSISTANT_SETTINGS = {
	temperature: 1,
	enableTemperature: false,
	topP: 1,
	enableTopP: false,
	maxTokens: 4096,
	enableMaxTokens: false,
	streamOutput: true,
	reasoning_effort: "default",
	mcpMode: DEFAULT_MCP_MODE,
	maxToolCalls: 100,
	enableMaxToolCalls: true,
	enableWebSearch: false,
	enableGenerateImage: false,
	customParameters: []
};
const AssistantSchema = strictObject({
	id: uuidv4(),
	name: string().min(1),
	prompt: string(),
	emoji: emoji(),
	description: string(),
	settings: AssistantSettingsSchema,
	modelId: UniqueModelIdSchema.nullable(),
	groupId: GroupIdSchema.nullable(),
	orderKey: string(),
	mcpServerIds: array(string()),
	knowledgeBaseIds: array(string()),
	createdAt: datetime(),
	updatedAt: datetime(),
	modelName: string().nullable()
});
var import_react = /* @__PURE__ */ __toESM(require_react());
function useGroups(entityType, options = {}) {
	const { data, isLoading, error, refetch } = useQuery("/groups", {
		...options.enabled !== void 0 && { enabled: options.enabled },
		query: { entityType }
	});
	return {
		groups: (0, import_react.useMemo)(() => data ?? [], [data]),
		isLoading,
		error,
		refetch
	};
}
function useGroupReorder() {
	const { trigger } = useMutation("PATCH", "/groups/:id/order", { refresh: ["/groups"] });
	return { reorderGroup: (0, import_react.useCallback)((id, body) => trigger({
		params: { id },
		body
	}), [trigger]) };
}
function useGroupMutations(entityType, options = {}) {
	const { trigger: createTrigger, isLoading: isCreating, error: createError } = useMutation("POST", "/groups", { refresh: ["/groups"] });
	const { trigger: updateTrigger, isLoading: isUpdating, error: updateError } = useMutation("PATCH", "/groups/:id", { refresh: ["/groups"] });
	const { trigger: deleteTrigger, isLoading: isDeleting, error: deleteError } = useMutation("DELETE", "/groups/:id", { refresh: ["/groups", ...options.refreshOnDelete ?? []] });
	return {
		createGroup: (0, import_react.useCallback)((name) => createTrigger({ body: {
			entityType,
			name: name.trim()
		} }), [createTrigger, entityType]),
		updateGroup: (0, import_react.useCallback)((id, updates) => updateTrigger({
			params: { id },
			body: updates.name === void 0 ? updates : {
				...updates,
				name: updates.name.trim()
			}
		}), [updateTrigger]),
		deleteGroup: (0, import_react.useCallback)((id) => deleteTrigger({ params: { id } }).then(() => void 0), [deleteTrigger]),
		isCreating,
		isUpdating,
		isDeleting,
		createError,
		updateError,
		deleteError
	};
}
const DEFAULT_AGENT_AVATAR = "🤖";
function getAgentAvatar(avatar) {
	return typeof avatar === "string" ? avatar.trim() || "🤖" : DEFAULT_AGENT_AVATAR;
}
function getAgentAvatarFromConfiguration(configuration) {
	return getAgentAvatar(configuration?.avatar);
}
function getAgentDescriptionForDisplay(agent, t) {
	if (agent.description) return agent.description;
	if (agent.configuration?.builtin_role === BUILTIN_AGENT_ROLE.ASSISTANT) return t("agent.builtin.cherry_assistant.description");
	if (agent.configuration?.builtin_role === BUILTIN_AGENT_ROLE.SUPPORT) return t("agent.builtin.cherry_support.description");
	return "";
}
function getAgentModelFallbackSnapshot(agent) {
	const modelString = agent?.model;
	if (!isUniqueModelId(modelString)) return void 0;
	const { providerId, modelId } = parseUniqueModelId(modelString);
	if (!providerId || !modelId) return void 0;
	return {
		id: modelId,
		name: agent?.modelName ?? modelId,
		provider: providerId
	};
}
const permissionModeCards = [
	{
		mode: "default",
		titleKey: "agent.settings.tooling.permissionMode.default.title",
		titleFallback: "Ask Before Acting",
		descriptionKey: "agent.settings.tooling.permissionMode.default.description",
		descriptionFallback: "Asks before editing files or running commands."
	},
	{
		mode: "plan",
		titleKey: "agent.settings.tooling.permissionMode.plan.title",
		titleFallback: "Plan Only",
		descriptionKey: "agent.settings.tooling.permissionMode.plan.description",
		descriptionFallback: "Plans without editing files. Only read-only or vetted commands run."
	},
	{
		mode: "acceptEdits",
		titleKey: "agent.settings.tooling.permissionMode.acceptEdits.title",
		titleFallback: "Auto-accept Edits",
		descriptionKey: "agent.settings.tooling.permissionMode.acceptEdits.description",
		descriptionFallback: "Edits files freely. Asks before commands."
	},
	{
		mode: "auto",
		titleKey: "agent.settings.tooling.permissionMode.auto.title",
		titleFallback: "Approve for Me",
		descriptionKey: "agent.settings.tooling.permissionMode.auto.description",
		descriptionFallback: "Runs without routine prompts. A safety check blocks risky actions.",
		warningKey: "agent.settings.tooling.permissionMode.auto.warning",
		warningFallback: "Needs a model that supports it; others may ignore it or keep asking."
	},
	{
		mode: "bypassPermissions",
		titleKey: "agent.settings.tooling.permissionMode.bypassPermissions.title",
		titleFallback: "Full Access",
		descriptionKey: "agent.settings.tooling.permissionMode.bypassPermissions.description",
		descriptionFallback: "Skips permission checks. Can delete files and use the network.",
		warningKey: "agent.settings.tooling.permissionMode.bypassPermissions.warning",
		warningFallback: "Use with caution — most tools run without approval; explicit safety blocks still apply.",
		dangerous: true
	}
];
function getPermissionModeCards(agentType) {
	if (!agentType || !(agentType in AGENT_RUNTIME_CAPABILITIES)) return permissionModeCards;
	const modes = new Set(AGENT_RUNTIME_CAPABILITIES[agentType].permissionModes);
	return permissionModeCards.filter((card) => modes.has(card.mode));
}
export { permissionModeCards as a, useGroups as c, DEFAULT_ASSISTANT_SETTINGS as d, DEFAULT_MCP_MODE as f, McpModeSchema as h, getPermissionModeCards as i, AssistantSchema as l, MIN_TOOL_CALLS as m, getAgentDescriptionForDisplay as n, useGroupMutations as o, MAX_TOOL_CALLS as p, getAgentModelFallbackSnapshot as r, useGroupReorder as s, getAgentAvatarFromConfiguration as t, AssistantSettingsSchema as u };
