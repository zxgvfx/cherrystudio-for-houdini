import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { C as string, M as datetime, S as strictObject, n as _enum, o as boolean, u as int } from "./schemas-1oAyIgyK.js";
import { R as AGENTS_MAX_LIMIT, z as AgentPermissionModeSchema } from "./error-CskkREu_.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import { a as useInvalidateCache, c as useQuery, o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as Bot } from "./bot-CmbvEihZ.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { t as MessageCircle } from "./message-circle-bJVB-g1l.js";
import { t as Search } from "./search-CafLf998.js";
import { t as ToolCase } from "./tool-case-D8bAQ4Jh.js";
import { t as X } from "./x-CpgfqVTG.js";
import { t as AGENT_RUNTIME_CAPABILITIES } from "./agentRuntimeCapabilities-C7UvdsI7.js";
import { a as readCocoMode, i as DEFAULT_COCO_PERMISSION, o as readCocoPermission, r as DEFAULT_COCO_MODE, s as createAgentAndRefresh } from "./cocoAgent-Dkf7ljK5.js";
import { r as useReconcileSkillsOnOpen } from "./useSkills-Be92aMP5.js";
import { n as GroupNameSchema, t as GroupIdSchema } from "./group-Cqj37oRb.js";
import { n as DEFAULT_CONTEXT_SETTINGS } from "./contextSettings-CKgBWQdg.js";
import { c as useGroups, d as DEFAULT_ASSISTANT_SETTINGS, h as McpModeSchema, l as AssistantSchema, n as getAgentDescriptionForDisplay, o as useGroupMutations, t as getAgentAvatarFromConfiguration, u as AssistantSettingsSchema } from "./agent-IxO6TDCv.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ResourceCatalogSearchInput({ value, onValueChange, placeholder, autoFocus, className, ...inputProps }) {
	const { t } = useTranslation();
	const handleChange = (0, import_react.useCallback)((event) => {
		onValueChange(event.target.value);
	}, [onValueChange]);
	const clear = (0, import_react.useCallback)(() => onValueChange(""), [onValueChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.search-input",
		className: cn("relative", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				size: 14,
				className: "-translate-y-1/2 absolute top-1/2 left-2.5 text-foreground-tertiary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				...inputProps,
				autoFocus,
				value,
				onChange: handleChange,
				placeholder,
				className: "h-8 rounded-md border-input bg-background pr-8 pl-8 text-sm placeholder:text-muted-foreground"
			}),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				"aria-label": t("common.clear"),
				onClick: clear,
				className: "-translate-y-1/2 absolute top-1/2 right-1 size-6 rounded-full text-muted-foreground hover:bg-transparent hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
			}) : null
		]
	});
}
function useAgentList(query) {
	const { data, isLoading, isRefreshing, error, refetch } = useQuery("/agents", {
		enabled: query?.enabled !== false,
		query: {
			limit: query?.limit ?? 500,
			...query?.search ? { search: query.search } : {}
		}
	});
	return {
		data: data?.items ?? [],
		isLoading,
		isRefreshing,
		error,
		refetch: (0, import_react.useCallback)(() => refetch(), [refetch])
	};
}
const agentAdapter = {
	resource: "agent",
	useList: useAgentList
};
function useAgentMutations() {
	const invalidate = useInvalidateCache();
	const [isCreatingAgent, setIsCreatingAgent] = (0, import_react.useState)(false);
	return {
		createAgent: (0, import_react.useCallback)(async (dto) => {
			setIsCreatingAgent(true);
			try {
				return await createAgentAndRefresh(dto, () => invalidate("/agents"));
			} finally {
				setIsCreatingAgent(false);
			}
		}, [invalidate]),
		isCreatingAgent
	};
}
function useAgentMutationsById(id) {
	const path = `/agents/${id}`;
	const { trigger: updateTrigger } = useMutation("PATCH", path, { refresh: ({ args }) => args?.body?.skillUpdates !== void 0 ? [
		"/agents",
		"/agents/*",
		"/skills"
	] : ["/agents", "/agents/*"] });
	const { trigger: deleteTrigger } = useMutation("DELETE", path, { refresh: [
		"/agents",
		"/agents/*",
		"/pins"
	] });
	return {
		updateAgent: (0, import_react.useCallback)((dto) => updateTrigger({ body: dto }), [updateTrigger]),
		deleteAgent: (0, import_react.useCallback)(() => deleteTrigger().then(() => void 0), [deleteTrigger])
	};
}
var ASSISTANT_MUTABLE_FIELDS = {
	name: true,
	prompt: true,
	emoji: true,
	description: true,
	settings: true,
	modelId: true,
	groupId: true,
	mcpServerIds: true,
	knowledgeBaseIds: true
};
AssistantSchema.pick(ASSISTANT_MUTABLE_FIELDS).partial().required({ name: true }).pick({
	name: true,
	prompt: true,
	emoji: true,
	description: true,
	settings: true
}).extend({ groupName: GroupNameSchema.optional() });
AssistantSchema.pick(ASSISTANT_MUTABLE_FIELDS).partial().extend({ settings: AssistantSettingsSchema.partial().optional() });
strictObject({
	id: string().optional(),
	search: string().trim().min(1).optional(),
	groupId: GroupIdSchema.optional(),
	updatedAtFrom: datetime().optional(),
	sortBy: _enum([
		"createdAt",
		"updatedAt",
		"name",
		"orderKey"
	]).optional(),
	sortOrder: _enum(["asc", "desc"]).optional(),
	page: int().positive().default(1),
	limit: int().positive().max(500).default(100)
});
strictObject({ deleteTopics: boolean().optional() });
function useAssistantList(query) {
	const { data, isLoading, isRefreshing, error, refetch } = useQuery("/assistants", {
		enabled: query?.enabled !== false,
		query: {
			limit: query?.limit ?? 500,
			...query?.search ? { search: query.search } : {},
			...query?.groupId ? { groupId: query.groupId } : {}
		}
	});
	return {
		data: data?.items ?? [],
		isLoading,
		isRefreshing,
		error,
		refetch: (0, import_react.useCallback)(() => refetch(), [refetch])
	};
}
const assistantAdapter = {
	resource: "assistant",
	useList: useAssistantList
};
function useAssistantMutations() {
	const { t } = useTranslation();
	const { trigger: createTrigger } = useMutation("POST", "/assistants", { refresh: ["/assistants"] });
	return {
		createAssistant: (0, import_react.useCallback)((dto) => createTrigger({ body: dto }), [createTrigger]),
		duplicateAssistant: (0, import_react.useCallback)(async (source) => {
			return createTrigger({ body: {
				name: t("library.duplicate_name", { name: source.name }),
				prompt: source.prompt,
				emoji: source.emoji,
				description: source.description,
				modelId: source.modelId,
				settings: source.settings,
				mcpServerIds: source.mcpServerIds,
				knowledgeBaseIds: source.knowledgeBaseIds,
				groupId: source.groupId
			} });
		}, [createTrigger, t])
	};
}
function useImportAssistantMutation() {
	const { trigger } = useMutation("POST", "/assistants:import", { refresh: ["/assistants", "/groups"] });
	return { importAssistant: (0, import_react.useCallback)((dto) => trigger({ body: dto }), [trigger]) };
}
function useAssistantMutationsById(id) {
	const path = `/assistants/${id}`;
	const { trigger: updateTrigger } = useMutation("PATCH", path, { refresh: ["/assistants", "/assistants/*"] });
	const { trigger: deleteTrigger } = useMutation("DELETE", path, { refresh: [
		"/assistants",
		"/assistants/*",
		"/pins"
	] });
	return {
		updateAssistant: (0, import_react.useCallback)((dto) => updateTrigger({ body: dto }), [updateTrigger]),
		deleteAssistant: (0, import_react.useCallback)(() => deleteTrigger().then(() => void 0), [deleteTrigger])
	};
}
function usePromptList(query) {
	const { data, isLoading, isRefreshing, error, refetch } = useQuery("/prompts", {
		enabled: query?.enabled !== false,
		query: { ...query?.search ? { search: query.search } : {} }
	});
	const stableRefetch = (0, import_react.useCallback)(() => refetch(), [refetch]);
	return {
		data: data ?? [],
		isLoading,
		isRefreshing,
		error,
		refetch: stableRefetch
	};
}
const promptAdapter = {
	resource: "prompt",
	useList: usePromptList
};
function usePromptMutations() {
	const { trigger: createTrigger } = useMutation("POST", "/prompts", { refresh: ["/prompts"] });
	return { createPrompt: (0, import_react.useCallback)((dto) => createTrigger({ body: dto }), [createTrigger]) };
}
function usePromptMutationsById(id) {
	const path = `/prompts/${id}`;
	const { trigger: updateTrigger } = useMutation("PATCH", path, { refresh: ["/prompts"] });
	const { trigger: deleteTrigger } = useMutation("DELETE", path, { refresh: ["/prompts"] });
	return {
		updatePrompt: (0, import_react.useCallback)((dto) => updateTrigger({ body: dto }), [updateTrigger]),
		deletePrompt: (0, import_react.useCallback)(() => deleteTrigger().then(() => void 0), [deleteTrigger])
	};
}
var logger = loggerService.withContext("SkillAdapter");
function useSkillList(query) {
	const enabled = query?.enabled !== false;
	const { data, isLoading, isRefreshing, error, refetch } = useQuery("/skills", {
		enabled,
		query: { ...query?.search ? { search: query.search } : {} }
	});
	useReconcileSkillsOnOpen(enabled);
	return {
		data: Array.isArray(data) ? data : [],
		isLoading,
		isRefreshing,
		error,
		refetch: (0, import_react.useCallback)(() => refetch(), [refetch])
	};
}
const skillAdapter = {
	resource: "skill",
	useList: useSkillList
};
function unwrapSkillResult(result, fallbackMessage) {
	if (result.success) return result.data;
	if (result.error instanceof Error) throw result.error;
	throw new Error(typeof result.error === "string" ? result.error : fallbackMessage);
}
function useSkillMutationsById(id) {
	const invalidate = useInvalidateCache();
	return { uninstallSkill: (0, import_react.useCallback)(async () => {
		unwrapSkillResult(await ipcApi.request("skill.uninstall", { skillId: id }), "Failed to uninstall skill");
		try {
			await invalidate("/skills");
		} catch (error) {
			logger.warn("Failed to refresh skills cache after IPC mutation", { error });
		}
	}, [id, invalidate]) };
}
var AssistantTransferError = class extends Error {
	constructor(code) {
		super(code);
		this.code = code;
		this.name = "AssistantTransferError";
	}
};
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readString(value, fallback = "") {
	return typeof value === "string" ? value : fallback;
}
function readStringArray(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((item) => typeof item === "string");
}
function normalizeRecord(record) {
	if (!isRecord(record)) throw new AssistantTransferError("invalid_format");
	const name = readString(record.name);
	const prompt = readString(record.prompt);
	if (!name || !prompt) throw new AssistantTransferError("invalid_format");
	const groupName = readStringArray(record.group)[0];
	return {
		dto: {
			name,
			prompt,
			emoji: readString(record.emoji) || "🤖",
			description: readString(record.description),
			settings: DEFAULT_ASSISTANT_SETTINGS
		},
		groupName
	};
}
function buildExportRecord(assistant, groupName) {
	return {
		name: assistant.name,
		emoji: assistant.emoji,
		group: groupName ? [groupName] : [],
		prompt: assistant.prompt,
		description: assistant.description,
		regularPhrases: [],
		type: "agent"
	};
}
function serializeAssistantForExport(assistant, groupName) {
	return JSON.stringify([buildExportRecord(assistant, groupName)], null, 2);
}
function parseAssistantImportContent(content) {
	let parsed;
	try {
		parsed = JSON.parse(content);
	} catch {
		throw new AssistantTransferError("invalid_format");
	}
	const records = Array.isArray(parsed) ? parsed : [parsed];
	if (records.length === 0) throw new AssistantTransferError("invalid_format");
	return records.map((record) => normalizeRecord(record));
}
var permissionModeParser = AgentPermissionModeSchema.catch("default");
function normalizePermissionMode(mode) {
	return permissionModeParser.parse(mode);
}
function asString(value) {
	return typeof value === "string" ? value : "";
}
function asNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function envVarsToText(raw) {
	if (Array.isArray(raw)) return raw.filter((item) => typeof item === "object" && item !== null).map(({ key, value }) => {
		const k = asString(key);
		if (!k) return "";
		return `${k}=${asString(value)}`;
	}).filter(Boolean).join("\n");
	if (raw && typeof raw === "object") return Object.entries(raw).map(([k, v]) => `${k}=${asString(v)}`).join("\n");
	return "";
}
function envVarsFromText(text) {
	const entries = text.split(/\r?\n/).filter((line) => line.trim().length > 0).map((line) => {
		const idx = line.indexOf("=");
		if (idx === -1) return [line.trim(), ""];
		return [line.slice(0, idx).trim(), line.slice(idx + 1)];
	}).filter((entry) => entry !== null && entry[0].length > 0);
	return Object.fromEntries(entries);
}
function buildInitialAgentFormState(agent, skillIds = []) {
	const cfg = agent?.configuration ?? {};
	return {
		name: agent?.name ?? "",
		description: agent?.description ?? "",
		model: agent?.model ?? "",
		planModel: agent?.planModel ?? "",
		smallModel: agent?.smallModel ?? "",
		instructions: agent?.instructions ?? "",
		mcps: [...agent?.mcps ?? []],
		knowledgeBaseIds: [...agent?.knowledgeBaseIds ?? []],
		skillIds: [...skillIds],
		disabledTools: [...agent?.disabledTools ?? []],
		avatar: asString(cfg.avatar),
		permissionMode: asString(cfg.permission_mode),
		cocoMode: readCocoMode(cfg),
		cocoPermission: readCocoPermission(cfg),
		envVarsText: envVarsToText(cfg.env_vars),
		heartbeatEnabled: cfg.heartbeat_enabled ?? true,
		heartbeatInterval: asNumber(cfg.heartbeat_interval) || 30
	};
}
function applyAgentFormPatch(current, patch) {
	const next = {
		...current,
		...patch
	};
	if (Object.prototype.hasOwnProperty.call(patch, "permissionMode")) next.permissionMode = normalizePermissionMode(patch.permissionMode);
	return next;
}
function diffAgentUpdate(baseline, next) {
	const dto = {};
	let dirty = false;
	if (baseline.name !== next.name) {
		dto.name = next.name;
		dirty = true;
	}
	if (baseline.description !== next.description) {
		dto.description = next.description;
		dirty = true;
	}
	if (baseline.model !== next.model) {
		if (next.model) dto.model = next.model;
		dirty = true;
	}
	if (baseline.planModel !== next.planModel) {
		dto.planModel = next.planModel || void 0;
		dirty = true;
	}
	if (baseline.smallModel !== next.smallModel) {
		dto.smallModel = next.smallModel || void 0;
		dirty = true;
	}
	if (baseline.instructions !== next.instructions) {
		dto.instructions = next.instructions;
		dirty = true;
	}
	if (!arraysEqual(baseline.mcps, next.mcps)) {
		dto.mcps = next.mcps;
		dirty = true;
	}
	if (!stringSetsEqual(baseline.knowledgeBaseIds, next.knowledgeBaseIds)) {
		dto.knowledgeBaseIds = next.knowledgeBaseIds;
		dirty = true;
	}
	const skillUpdates = diffSkillUpdates(baseline.skillIds, next.skillIds);
	if (skillUpdates.length > 0) {
		dto.skillUpdates = skillUpdates;
		dirty = true;
	}
	if (!arraysEqual(baseline.disabledTools, next.disabledTools)) {
		dto.disabledTools = next.disabledTools;
		dirty = true;
	}
	const cfgPatch = {};
	let cfgDirty = false;
	if (baseline.avatar !== next.avatar) {
		cfgPatch.avatar = next.avatar;
		cfgDirty = true;
	}
	if (baseline.permissionMode !== next.permissionMode) {
		cfgPatch.permission_mode = normalizePermissionMode(next.permissionMode);
		cfgDirty = true;
	}
	if (baseline.cocoMode !== next.cocoMode) {
		cfgPatch.coco_mode = next.cocoMode;
		cfgDirty = true;
	}
	if (baseline.cocoPermission !== next.cocoPermission) {
		cfgPatch.coco_permission = next.cocoPermission;
		cfgDirty = true;
	}
	if (baseline.envVarsText !== next.envVarsText) {
		cfgPatch.env_vars = envVarsFromText(next.envVarsText);
		cfgDirty = true;
	}
	if (baseline.heartbeatEnabled !== next.heartbeatEnabled) {
		cfgPatch.heartbeat_enabled = next.heartbeatEnabled;
		cfgDirty = true;
	}
	if (baseline.heartbeatInterval !== next.heartbeatInterval) {
		if (next.heartbeatEnabled) cfgPatch.heartbeat_enabled = true;
		cfgPatch.heartbeat_interval = next.heartbeatInterval;
		cfgDirty = true;
	}
	if (cfgDirty) {
		dto.configuration = {
			...cfgPatch,
			max_turns: void 0
		};
		dirty = true;
	}
	if (!dirty) return null;
	return { dto };
}
function arraysEqual(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
function stringSetsEqual(a, b) {
	const aSet = new Set(a);
	const bSet = new Set(b);
	return aSet.size === bSet.size && [...aSet].every((value) => bSet.has(value));
}
function diffSkillUpdates(baselineSkillIds, nextSkillIds) {
	const baselineSet = new Set(baselineSkillIds);
	const nextSet = new Set(nextSkillIds);
	const updates = [];
	for (const skillId of baselineSkillIds) if (!nextSet.has(skillId)) updates.push({
		skillId,
		isEnabled: false
	});
	for (const skillId of nextSkillIds) if (!baselineSet.has(skillId)) updates.push({
		skillId,
		isEnabled: true
	});
	return updates;
}
function diffAgentSaveIntent(form, baseline) {
	const result = diffAgentUpdate(baseline, form);
	if (!result) return null;
	return {
		kind: "update",
		payload: result.dto
	};
}
var UI_DEFAULT_TEMPERATURE = 1;
var UI_DEFAULT_TOP_P = 1;
var UI_DEFAULT_MAX_TOKENS = 4096;
function initialAssistantFormState(assistant) {
	const settings = assistant.settings ?? {};
	const mcpMode = McpModeSchema.safeParse(settings.mcpMode);
	const maxTokens = AssistantSettingsSchema.shape.maxTokens.safeParse(settings.maxTokens);
	const ctx = settings.contextSettings;
	return {
		name: assistant.name,
		emoji: assistant.emoji,
		description: assistant.description,
		modelId: assistant.modelId,
		prompt: assistant.prompt ?? "",
		temperature: settings.temperature ?? UI_DEFAULT_TEMPERATURE,
		enableTemperature: settings.enableTemperature ?? false,
		topP: settings.topP ?? UI_DEFAULT_TOP_P,
		enableTopP: settings.enableTopP ?? false,
		maxTokens: maxTokens.success ? maxTokens.data : UI_DEFAULT_MAX_TOKENS,
		enableMaxTokens: settings.enableMaxTokens ?? false,
		streamOutput: settings.streamOutput ?? true,
		maxToolCalls: settings.maxToolCalls ?? DEFAULT_ASSISTANT_SETTINGS.maxToolCalls,
		enableMaxToolCalls: settings.enableMaxToolCalls ?? true,
		customParameters: settings.customParameters ?? [],
		mcpMode: mcpMode.success ? mcpMode.data : DEFAULT_ASSISTANT_SETTINGS.mcpMode,
		contextOverrideEnabled: ctx != null && (ctx.truncateThreshold !== void 0 || ctx.compress !== void 0),
		contextCompressEnabled: ctx?.compress?.enabled ?? DEFAULT_CONTEXT_SETTINGS.compress.enabled,
		contextTruncateThreshold: ctx?.truncateThreshold ?? DEFAULT_CONTEXT_SETTINGS.truncateThreshold,
		contextMaxMessages: ctx?.maxMessages ?? null,
		contextCompressModelId: ctx?.compress?.modelId ?? null,
		groupId: assistant.groupId,
		knowledgeBaseIds: assistant.knowledgeBaseIds ?? [],
		mcpServerIds: assistant.mcpServerIds ?? []
	};
}
function diffAssistantUpdate(form, baseline, assistant) {
	const customParametersChanged = JSON.stringify(baseline.customParameters) !== JSON.stringify(form.customParameters);
	const maxTokensChanged = baseline.maxTokens !== form.maxTokens;
	const enableMaxTokensChanged = baseline.enableMaxTokens !== form.enableMaxTokens;
	const contextSettingsChanged = baseline.contextOverrideEnabled !== form.contextOverrideEnabled || baseline.contextMaxMessages !== form.contextMaxMessages || form.contextOverrideEnabled && (baseline.contextCompressEnabled !== form.contextCompressEnabled || baseline.contextTruncateThreshold !== form.contextTruncateThreshold || baseline.contextCompressModelId !== form.contextCompressModelId);
	const settings = {
		...baseline.temperature !== form.temperature ? { temperature: form.temperature } : {},
		...baseline.enableTemperature !== form.enableTemperature ? { enableTemperature: form.enableTemperature } : {},
		...baseline.topP !== form.topP ? { topP: form.topP } : {},
		...baseline.enableTopP !== form.enableTopP ? { enableTopP: form.enableTopP } : {},
		...maxTokensChanged || enableMaxTokensChanged && form.enableMaxTokens ? { maxTokens: form.maxTokens } : {},
		...enableMaxTokensChanged ? { enableMaxTokens: form.enableMaxTokens } : {},
		...baseline.streamOutput !== form.streamOutput ? { streamOutput: form.streamOutput } : {},
		...baseline.maxToolCalls !== form.maxToolCalls ? { maxToolCalls: form.maxToolCalls } : {},
		...baseline.enableMaxToolCalls !== form.enableMaxToolCalls ? { enableMaxToolCalls: form.enableMaxToolCalls } : {},
		...baseline.mcpMode !== form.mcpMode ? { mcpMode: form.mcpMode } : {},
		...customParametersChanged ? { customParameters: form.customParameters } : {},
		...contextSettingsChanged ? { contextSettings: form.contextOverrideEnabled ? {
			truncateThreshold: form.contextTruncateThreshold,
			...form.contextMaxMessages !== null ? { maxMessages: form.contextMaxMessages } : {},
			compress: {
				enabled: form.contextCompressEnabled,
				modelId: form.contextCompressModelId
			}
		} : form.contextMaxMessages !== null ? { maxMessages: form.contextMaxMessages } : null } : {}
	};
	const nameChanged = baseline.name !== form.name;
	const emojiChanged = baseline.emoji !== form.emoji;
	const descriptionChanged = baseline.description !== form.description;
	const modelIdChanged = baseline.modelId !== form.modelId;
	const promptChanged = baseline.prompt !== form.prompt;
	const settingsChanged = Object.keys(settings).length > 0;
	const groupChanged = baseline.groupId !== form.groupId;
	const knowledgeBaseIdsChanged = !sameIdSet(baseline.knowledgeBaseIds, form.knowledgeBaseIds);
	const mcpServerIdsChanged = !sameIdSet(baseline.mcpServerIds, form.mcpServerIds);
	if (!nameChanged && !emojiChanged && !descriptionChanged && !modelIdChanged && !promptChanged && !settingsChanged && !groupChanged && !knowledgeBaseIdsChanged && !mcpServerIdsChanged) return null;
	return { dto: {
		...nameChanged ? { name: form.name.trim() || assistant.name } : {},
		...emojiChanged ? { emoji: form.emoji } : {},
		...descriptionChanged ? { description: form.description } : {},
		...modelIdChanged ? { modelId: form.modelId } : {},
		...promptChanged ? { prompt: form.prompt } : {},
		...settingsChanged ? { settings } : {},
		...knowledgeBaseIdsChanged ? { knowledgeBaseIds: form.knowledgeBaseIds } : {},
		...mcpServerIdsChanged ? { mcpServerIds: form.mcpServerIds } : {},
		...groupChanged ? { groupId: form.groupId } : {}
	} };
}
function diffAssistantSaveIntent(form, baseline, assistant) {
	const diff = diffAssistantUpdate(form, baseline, assistant);
	if (!diff) return null;
	return {
		kind: "update",
		payload: diff.dto
	};
}
function sameIdSet(a, b) {
	if (a.length !== b.length) return false;
	const set = new Set(a);
	return b.every((id) => set.has(id));
}
const RESOURCE_TYPE_META = {
	agent: {
		icon: Bot,
		color: "bg-secondary text-secondary-foreground",
		labelKey: "library.type.agent"
	},
	assistant: {
		icon: MessageCircle,
		color: "bg-secondary text-secondary-foreground",
		labelKey: "library.type.assistant"
	},
	skill: {
		icon: ToolCase,
		color: "bg-warning-subtle text-warning",
		labelKey: "library.type.skill"
	},
	prompt: {
		icon: FileText,
		color: "bg-secondary text-secondary-foreground",
		labelKey: "library.type.prompt"
	}
};
const RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT = [
	"Improve the supplied system prompt without changing its intent or authority.",
	"Preserve roles, goals, constraints, tool instructions, workflows, and output requirements.",
	"Do not replace its structure or force it into a predefined template.",
	"Keep the output in the same language as the input.",
	"Preserve Markdown, code, URLs, and every placeholder token verbatim, including tokens shaped like {{name}} and ${name}; keep duplicate occurrences.",
	"Return only the polished system prompt with no explanation, wrapper, or code fence."
].join("\n");
const MCP_MODE_OPTIONS = [
	{
		id: "disabled",
		labelKey: "library.config.tools.mode.disabled.label",
		descKey: "library.config.tools.mode.disabled.desc"
	},
	{
		id: "auto",
		labelKey: "library.config.tools.mode.auto.label",
		descKey: "library.config.tools.mode.auto.desc"
	},
	{
		id: "manual",
		labelKey: "library.config.tools.mode.manual.label",
		descKey: "library.config.tools.mode.manual.desc"
	}
];
function buildCreateAssistantDto(values) {
	return {
		name: values.name,
		emoji: values.avatar,
		modelId: values.modelId,
		description: values.description,
		prompt: values.prompt,
		knowledgeBaseIds: values.knowledgeBaseIds
	};
}
function buildCreateAgentCommand(values) {
	const caps = AGENT_RUNTIME_CAPABILITIES[values.agentType];
	const permissionMode = caps.permissionModes.some((mode) => mode === values.permissionMode) ? values.permissionMode : caps.createDefaults.permissionMode;
	return {
		type: values.agentType,
		name: values.name,
		model: values.modelId,
		...caps.modelTiers ? {
			planModel: values.modelId,
			smallModel: values.modelId
		} : {},
		description: values.description,
		instructions: values.prompt,
		...caps.knowledgeBases ? { knowledgeBaseIds: values.knowledgeBaseIds } : {},
		...caps.skills ? { skillIds: values.skillIds } : {},
		configuration: {
			avatar: values.avatar,
			permission_mode: permissionMode,
			...values.agentType === "coco" ? {
				coco_mode: values.cocoMode ?? "agent",
				coco_permission: values.cocoPermission ?? "ask"
			} : {}
		}
	};
}
function compareItems(a, b, sort) {
	if (sort === "name") return a.name.localeCompare(b.name, "zh");
	const aKey = sort === "createdAt" ? a.createdAt : a.updatedAt;
	return (sort === "createdAt" ? b.createdAt : b.updatedAt).localeCompare(aKey);
}
function useResourceLibrary({ resourceType, activeGroupId, search, sort }) {
	const { t } = useTranslation();
	const assistantGroups = useGroups("assistant");
	const trimmedSearch = search.trim() || void 0;
	const isAssistant = resourceType === "assistant";
	const isAgent = resourceType === "agent";
	const isSkill = resourceType === "skill";
	const isPrompt = resourceType === "prompt";
	const baseAssistants = assistantAdapter.useList({ enabled: isAssistant });
	const groupById = (0, import_react.useMemo)(() => new Map(assistantGroups.groups.map((group) => [group.id, group])), [assistantGroups.groups]);
	const filteredAssistants = assistantAdapter.useList({
		enabled: isAssistant,
		search: isAssistant ? trimmedSearch : void 0,
		groupId: isAssistant ? activeGroupId ?? void 0 : void 0
	});
	const agents = agentAdapter.useList({
		enabled: isAgent,
		search: isAgent ? trimmedSearch : void 0
	});
	const skills = skillAdapter.useList({
		enabled: isSkill,
		search: isSkill ? trimmedSearch : void 0
	});
	const prompts = promptAdapter.useList({
		enabled: isPrompt,
		search: isPrompt ? trimmedSearch : void 0
	});
	const buildAssistantItem = (0, import_react.useCallback)((a) => {
		const group = a.groupId ? groupById.get(a.groupId) : void 0;
		return {
			id: a.id,
			type: "assistant",
			name: a.name,
			description: a.description || "",
			avatar: a.emoji || "💬",
			model: a.modelName ?? void 0,
			groupId: a.groupId ?? void 0,
			groupName: group?.name,
			createdAt: a.createdAt,
			updatedAt: a.updatedAt,
			raw: a
		};
	}, [groupById]);
	const buildAgentItem = (0, import_react.useCallback)((a) => {
		return {
			id: a.id,
			type: "agent",
			name: a.name ?? "",
			description: getAgentDescriptionForDisplay(a, t),
			avatar: getAgentAvatarFromConfiguration(a.configuration),
			model: a.modelName ?? void 0,
			createdAt: a.createdAt,
			updatedAt: a.updatedAt,
			raw: a
		};
	}, [t]);
	const buildSkillItem = (0, import_react.useCallback)((s) => {
		return {
			id: s.id,
			type: "skill",
			name: s.name,
			description: s.description ?? "",
			avatar: "⚡",
			createdAt: s.createdAt,
			updatedAt: s.updatedAt,
			raw: s
		};
	}, []);
	const buildPromptItem = (0, import_react.useCallback)((p) => {
		return {
			id: p.id,
			type: "prompt",
			name: p.title,
			description: p.content.replace(/\s+/g, " ").trim(),
			avatar: "Aa",
			createdAt: p.createdAt,
			updatedAt: p.updatedAt,
			raw: p
		};
	}, []);
	const allResources = (0, import_react.useMemo)(() => {
		if (isAssistant) return baseAssistants.data.map(buildAssistantItem);
		if (isAgent) return agents.data.map(buildAgentItem);
		if (isPrompt) return prompts.data.map(buildPromptItem);
		return skills.data.map(buildSkillItem);
	}, [
		isAssistant,
		isAgent,
		isPrompt,
		baseAssistants.data,
		agents.data,
		skills.data,
		prompts.data,
		buildAssistantItem,
		buildAgentItem,
		buildSkillItem,
		buildPromptItem
	]);
	const filteredAssistantItems = (0, import_react.useMemo)(() => filteredAssistants.data.map(buildAssistantItem), [filteredAssistants.data, buildAssistantItem]);
	const agentItems = (0, import_react.useMemo)(() => agents.data.map(buildAgentItem), [agents.data, buildAgentItem]);
	const skillItems = (0, import_react.useMemo)(() => skills.data.map(buildSkillItem), [skills.data, buildSkillItem]);
	const promptItems = (0, import_react.useMemo)(() => prompts.data.map(buildPromptItem), [prompts.data, buildPromptItem]);
	const resources = (0, import_react.useMemo)(() => {
		let list;
		if (isAssistant) list = filteredAssistantItems;
		else if (isAgent) list = agentItems;
		else if (isPrompt) list = promptItems;
		else list = skillItems;
		return [...list].sort((a, b) => compareItems(a, b, sort));
	}, [
		isAssistant,
		isAgent,
		isPrompt,
		filteredAssistantItems,
		agentItems,
		promptItems,
		skillItems,
		sort
	]);
	const isLoading = isAssistant ? baseAssistants.isLoading || filteredAssistants.isLoading || assistantGroups.isLoading : isAgent ? agents.isLoading : isPrompt ? prompts.isLoading : skills.isLoading;
	const isRefreshing = isAssistant ? baseAssistants.isRefreshing || filteredAssistants.isRefreshing : isAgent ? agents.isRefreshing : isPrompt ? prompts.isRefreshing : skills.isRefreshing;
	const error = isAssistant ? baseAssistants.error ?? filteredAssistants.error ?? assistantGroups.error : isAgent ? agents.error : isPrompt ? prompts.error : skills.error;
	const baseAssistantsRefetch = baseAssistants.refetch;
	const filteredAssistantsRefetch = filteredAssistants.refetch;
	const agentsRefetch = agents.refetch;
	const skillsRefetch = skills.refetch;
	const promptsRefetch = prompts.refetch;
	const groupsRefetch = assistantGroups.refetch;
	return {
		resources,
		allResources,
		isLoading,
		isRefreshing,
		error,
		refetch: (0, import_react.useCallback)(() => {
			if (isAssistant) {
				baseAssistantsRefetch();
				filteredAssistantsRefetch();
				groupsRefetch();
			} else if (isAgent) agentsRefetch();
			else if (isPrompt) promptsRefetch();
			else skillsRefetch();
		}, [
			isAssistant,
			isAgent,
			isPrompt,
			baseAssistantsRefetch,
			filteredAssistantsRefetch,
			agentsRefetch,
			skillsRefetch,
			promptsRefetch,
			groupsRefetch
		])
	};
}
var CREATE_DIALOG_EXIT_ANIMATION_MS = 200;
function buildGroups(resources, groups, filterType) {
	const counts = /* @__PURE__ */ new Map();
	const list = filterType ? resources.filter((r) => r.type === filterType) : resources;
	for (const resource of list) if (resource.type === "assistant" && resource.groupId) counts.set(resource.groupId, (counts.get(resource.groupId) ?? 0) + 1);
	return groups.flatMap((group) => {
		const count = counts.get(group.id);
		return count ? [{
			id: group.id,
			name: group.name,
			count
		}] : [];
	});
}
function useResourceCatalogController(resourceType) {
	const { t } = useTranslation();
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeGroupId, setActiveGroupId] = (0, import_react.useState)(null);
	const [deleteConfirm, setDeleteConfirm] = (0, import_react.useState)(null);
	const [createDialogKind, setCreateDialogKind] = (0, import_react.useState)(null);
	const [createDialogOpen, setCreateDialogOpen] = (0, import_react.useState)(false);
	const [editDialogTarget, setEditDialogTarget] = (0, import_react.useState)(null);
	const [creatingResource, setCreatingResource] = (0, import_react.useState)(false);
	const [selectedSkill, setSelectedSkill] = (0, import_react.useState)(null);
	const [assistantImportOpen, setAssistantImportOpen] = (0, import_react.useState)(false);
	const [assistantLibraryOpen, setAssistantLibraryOpen] = (0, import_react.useState)(false);
	const [skillImportOpen, setSkillImportOpen] = (0, import_react.useState)(false);
	const [skillMarketplaceOpen, setSkillMarketplaceOpen] = (0, import_react.useState)(false);
	const [systemSkillOpen, setSystemSkillOpen] = (0, import_react.useState)(false);
	const isAssistantLibrary = resourceType === "assistant";
	const { resources, allResources, isLoading, error: resourceError, refetch } = useResourceLibrary({
		resourceType,
		activeGroupId: isAssistantLibrary ? activeGroupId : null,
		search,
		sort: "name"
	});
	(0, import_react.useEffect)(() => {
		setActiveGroupId(null);
	}, [resourceType]);
	const { createAssistant, duplicateAssistant } = useAssistantMutations();
	const { createAgent } = useAgentMutations();
	const { groups } = useGroups("assistant");
	const { createGroup } = useGroupMutations("assistant");
	const groupById = (0, import_react.useMemo)(() => new Map(groups.map((group) => [group.id, group])), [groups]);
	const scopedGroups = (0, import_react.useMemo)(() => {
		if (!isAssistantLibrary) return [];
		return buildGroups(allResources, groups, "assistant");
	}, [
		allResources,
		groups,
		isAssistantLibrary
	]);
	(0, import_react.useEffect)(() => {
		if (createDialogOpen || !createDialogKind) return;
		const timeoutId = window.setTimeout(() => setCreateDialogKind(null), CREATE_DIALOG_EXIT_ANIMATION_MS);
		return () => window.clearTimeout(timeoutId);
	}, [createDialogKind, createDialogOpen]);
	const handleOpenResource = (0, import_react.useCallback)((resource) => {
		if (resource.type === "assistant") setEditDialogTarget({
			kind: "assistant",
			id: resource.id
		});
		else if (resource.type === "agent") setEditDialogTarget({
			kind: "agent",
			id: resource.id
		});
		else if (resource.type === "skill") setSelectedSkill(resource.raw);
	}, []);
	const handleDuplicate = (0, import_react.useCallback)(async (resource) => {
		if (resource.type === "assistant") try {
			await duplicateAssistant(resource.raw);
			refetch();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("library.duplicate_assistant_failed"));
		}
	}, [
		duplicateAssistant,
		refetch,
		t
	]);
	const handleExport = (0, import_react.useCallback)(async (resource) => {
		if (resource.type !== "assistant") return;
		const assistant = resource.raw;
		try {
			const content = serializeAssistantForExport(assistant, assistant.groupId ? groupById.get(assistant.groupId)?.name : void 0);
			await window.api.file.save(`${assistant.name}.json`, new TextEncoder().encode(content), { filters: [{
				name: t("assistants.presets.import.file_filter"),
				extensions: ["json"]
			}] });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("library.export_assistant_failed"));
		}
	}, [groupById, t]);
	const handleCreate = (0, import_react.useCallback)((type) => {
		if (type === "assistant") {
			setCreateDialogKind("assistant");
			setCreateDialogOpen(true);
		} else if (type === "agent") {
			setCreateDialogKind("agent");
			setCreateDialogOpen(true);
		} else if (type === "skill") setSkillImportOpen(true);
	}, []);
	const handleCreateDialogOpenChange = (0, import_react.useCallback)((open) => {
		if (!open && creatingResource) return;
		setCreateDialogOpen(open);
	}, [creatingResource]);
	const handleSubmitCreateResource = (0, import_react.useCallback)(async (values) => {
		const kind = createDialogKind;
		if (!kind || creatingResource) return;
		setCreatingResource(true);
		try {
			if (kind === "assistant") await createAssistant(buildCreateAssistantDto(values));
			else await createAgent(buildCreateAgentCommand(values));
			setCreateDialogOpen(false);
			refetch();
		} finally {
			setCreatingResource(false);
		}
	}, [
		createAgent,
		createAssistant,
		createDialogKind,
		creatingResource,
		refetch
	]);
	return {
		resourceError,
		refetch,
		gridProps: {
			resources,
			isLoading,
			activeResourceType: resourceType,
			search,
			onSearchChange: setSearch,
			onEdit: handleOpenResource,
			onDuplicate: handleDuplicate,
			onDelete: setDeleteConfirm,
			onExport: (resource) => {
				handleExport(resource);
			},
			onCreate: handleCreate,
			onImportAssistant: () => setAssistantImportOpen(true),
			onOpenAssistantLibrary: isAssistantLibrary ? () => setAssistantLibraryOpen(true) : void 0,
			onOpenSkillMarketplace: () => setSkillMarketplaceOpen(true),
			onOpenSystemSkills: () => setSystemSkillOpen(true),
			groups: scopedGroups,
			activeGroupId,
			onGroupFilter: setActiveGroupId,
			onAddGroup: async (groupName) => {
				await createGroup(groupName);
			},
			allGroups: groups
		},
		dialogs: {
			assistantImportOpen,
			assistantLibraryOpen,
			createDialogKind,
			createDialogOpen,
			creatingResource,
			deleteConfirm,
			editDialogTarget,
			selectedSkill,
			skillImportOpen,
			skillMarketplaceOpen,
			systemSkillOpen,
			setAssistantImportOpen,
			setAssistantLibraryOpen,
			setDeleteConfirm,
			setEditDialogTarget,
			setSelectedSkill,
			setSkillImportOpen,
			setSkillMarketplaceOpen,
			setSystemSkillOpen,
			handleCreateDialogOpenChange,
			handleSubmitCreateResource
		}
	};
}
export { ResourceCatalogSearchInput as S, useAssistantMutations as _, RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT as a, useAgentMutations as b, initialAssistantFormState as c, diffAgentSaveIntent as d, AssistantTransferError as f, usePromptMutationsById as g, usePromptMutations as h, MCP_MODE_OPTIONS as i, applyAgentFormPatch as l, useSkillMutationsById as m, buildCreateAgentCommand as n, RESOURCE_TYPE_META as o, parseAssistantImportContent as p, buildCreateAssistantDto as r, diffAssistantSaveIntent as s, useResourceCatalogController as t, buildInitialAgentFormState as u, useAssistantMutationsById as v, useAgentMutationsById as x, useImportAssistantMutation as y };
