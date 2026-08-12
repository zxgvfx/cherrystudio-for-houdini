import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { C as AGENT_PROMPT } from "./PreferenceService-uLlqCRc6.js";
import { a as replacePromptVariables, i as containsSupportedVariables } from "./aiGeneration-Dqw73yb1.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, o as SelectSeparator, s as SelectTrigger, t as Select } from "./select-BPh2DI-f.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import { t as DIALOG_UNMOUNT_DELAY_MS } from "./dialog-Bm50HQ1E.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as Input$1 } from "./textarea-Djv1FqZD.js";
import { t as editable_number_default } from "./editable-number-Dhr-NqcZ.js";
import { a as FormItem, d as useForm, i as FormField, n as FormControl, o as FormLabel, p as useWatch, s as FormMessage } from "./form-BNX-faEF.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { t as Slider } from "./slider-_Xxahv5d.js";
import { n as TabsContent } from "./tabs-C7Ec2BdI.js";
import { t as useCloseBeforeAction } from "./useCloseBeforeAction-OyC3zPmq.js";
import { r as openSettingsTab } from "./mainWindowNavigation-m8-JFOdz.js";
import { n as cn } from "./style-qqUWb85F.js";
import { c as useQuery } from "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as Settings } from "./settings-DM9xfvj6.js";
import { t as Sparkles } from "./sparkles-CUMLbh34.js";
import { t as ToolCase } from "./tool-case-DruupNDs.js";
import { t as Trash2 } from "./trash-2-_PaXFSXZ.js";
import { t as Wrench } from "./wrench-CiDr7-m1.js";
import { t as X } from "./x-CZLr1OkN.js";
import { h as isNonChatModel } from "./model-Z1svQByC.js";
import { r as useAgentModelFilter } from "./ModelSelector-Dwt-BrMn.js";
import { n as useAssistantApiById } from "./useAssistant-D7pB4IBa.js";
import { S as PromptPolishActions, _ as SkillCatalogPicker, a as EditDialogShell, b as CatalogToggleGrid, c as PromptVariablesPopover, d as editDialogFormRowLabelClassName, g as useDebouncedAutoSave, h as setFormValues, i as EDIT_DIALOG_PROMPT_MIN_HEIGHT, l as TextInputField, n as CompactModelField, o as FieldLabelWithHelp, r as EDIT_DIALOG_PROMPT_MAX_HEIGHT, s as KnowledgeBaseField, t as AvatarField, u as editDialogFormRowClassName, w as PromptEditorField_default } from "./EditDialogShared-CX4x_OiL.js";
import { T as useReconcileSkillsOnOpen, a as RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT, c as initialAssistantFormState, d as diffAgentSaveIntent, i as MCP_MODE_OPTIONS, l as applyAgentFormPatch, s as diffAssistantSaveIntent, u as buildInitialAgentFormState, v as useAssistantMutationsById, w as useInstalledSkills, x as useAgentMutationsById } from "./resourceCatalog-Bd6dsVEl.js";
import { n as PermissionModeOptionLabel, r as useAgent, t as PermissionModeIcon } from "./PermissionModeOption-BMvGaWwP.js";
import { a as useGroupMutations, i as permissionModeCards, l as DEFAULT_ASSISTANT_SETTINGS, o as useGroups } from "./agent-BnqSANST.js";
import { i as useKnowledgeBases } from "./useKnowledgeBase-BQiV-Uju.js";
import { n as useMcpRuntimeStatusMap } from "./useMcpRuntimeStatus-B1mtExmO.js";
import { t as CreateGroupDialog } from "./CreateGroupDialog-BBFEzR8V.js";
var CLAUDE_TOOL_REGISTRY = {
	Bash: {
		name: "Bash",
		category: "shell",
		exposure: "user",
		description: "Executes shell commands in your environment"
	},
	BashOutput: {
		name: "BashOutput",
		category: "shell",
		exposure: "internal",
		description: "Retrieves output from a running background shell",
		dependsOn: ["Bash"]
	},
	REPL: {
		name: "REPL",
		category: "shell",
		exposure: "disabled",
		description: "Runs code in a persistent REPL session"
	},
	Read: {
		name: "Read",
		category: "file",
		exposure: "user",
		description: "Reads the contents of files"
	},
	Edit: {
		name: "Edit",
		category: "file",
		exposure: "user",
		description: "Makes targeted edits to specific files"
	},
	Write: {
		name: "Write",
		category: "file",
		exposure: "user",
		description: "Creates or overwrites files"
	},
	NotebookEdit: {
		name: "NotebookEdit",
		category: "file",
		exposure: "disabled",
		description: "Modifies Jupyter notebook cells"
	},
	Glob: {
		name: "Glob",
		category: "search",
		exposure: "user",
		description: "Finds files based on pattern matching"
	},
	Grep: {
		name: "Grep",
		category: "search",
		exposure: "user",
		description: "Searches for patterns in file contents"
	},
	Agent: {
		name: "Agent",
		category: "orchestration",
		exposure: "internal",
		description: "Runs a sub-agent to handle complex, multi-step tasks"
	},
	Task: {
		name: "Task",
		category: "orchestration",
		exposure: "internal",
		description: "Runs a sub-agent to handle complex, multi-step tasks"
	},
	TaskOutput: {
		name: "TaskOutput",
		category: "orchestration",
		exposure: "internal",
		description: "Gets output from a background task"
	},
	TaskStop: {
		name: "TaskStop",
		category: "orchestration",
		exposure: "internal",
		description: "Stops a running background task"
	},
	TaskCreate: {
		name: "TaskCreate",
		category: "orchestration",
		exposure: "internal",
		description: "Creates a structured task"
	},
	TaskGet: {
		name: "TaskGet",
		category: "orchestration",
		exposure: "internal",
		description: "Retrieves a task by id"
	},
	TaskUpdate: {
		name: "TaskUpdate",
		category: "orchestration",
		exposure: "internal",
		description: "Updates a task"
	},
	TaskList: {
		name: "TaskList",
		category: "orchestration",
		exposure: "internal",
		description: "Lists tasks"
	},
	TodoWrite: {
		name: "TodoWrite",
		category: "orchestration",
		exposure: "disabled",
		description: "Creates and manages structured task lists"
	},
	ExitPlanMode: {
		name: "ExitPlanMode",
		category: "orchestration",
		exposure: "internal",
		description: "Exits plan mode and presents the plan"
	},
	EnterPlanMode: {
		name: "EnterPlanMode",
		category: "orchestration",
		exposure: "internal",
		description: "Enters plan mode"
	},
	EnterWorktree: {
		name: "EnterWorktree",
		category: "orchestration",
		exposure: "internal",
		description: "Switches into a git worktree"
	},
	ExitWorktree: {
		name: "ExitWorktree",
		category: "orchestration",
		exposure: "internal",
		description: "Leaves the current git worktree"
	},
	AskUserQuestion: {
		name: "AskUserQuestion",
		category: "orchestration",
		exposure: "internal",
		description: "Asks the user a structured question"
	},
	ToolSearch: {
		name: "ToolSearch",
		category: "orchestration",
		exposure: "internal",
		description: "Searches for available tools by name"
	},
	ListMcpResources: {
		name: "ListMcpResources",
		category: "orchestration",
		exposure: "internal",
		description: "Lists resources from connected MCP servers"
	},
	ReadMcpResource: {
		name: "ReadMcpResource",
		category: "orchestration",
		exposure: "internal",
		description: "Reads a resource from a connected MCP server"
	},
	Workflow: {
		name: "Workflow",
		category: "orchestration",
		exposure: "user",
		description: "Runs a multi-step workflow that orchestrates subagents"
	},
	CronCreate: {
		name: "CronCreate",
		category: "orchestration",
		exposure: "disabled",
		description: "Creates a scheduled (cron) task"
	},
	CronDelete: {
		name: "CronDelete",
		category: "orchestration",
		exposure: "disabled",
		description: "Deletes a scheduled (cron) task"
	},
	CronList: {
		name: "CronList",
		category: "orchestration",
		exposure: "disabled",
		description: "Lists scheduled (cron) tasks"
	},
	ScheduleWakeup: {
		name: "ScheduleWakeup",
		category: "orchestration",
		exposure: "disabled",
		description: "Schedules a wakeup for the session"
	},
	RemoteTrigger: {
		name: "RemoteTrigger",
		category: "orchestration",
		exposure: "disabled",
		description: "Registers a remote trigger"
	},
	Monitor: {
		name: "Monitor",
		category: "orchestration",
		exposure: "disabled",
		description: "Monitors an external condition"
	},
	PushNotification: {
		name: "PushNotification",
		category: "orchestration",
		exposure: "disabled",
		description: "Sends a push notification"
	},
	SendMessage: {
		name: "SendMessage",
		category: "orchestration",
		exposure: "internal",
		description: "Sends a message to another agent in the team"
	},
	TeamCreate: {
		name: "TeamCreate",
		category: "orchestration",
		exposure: "internal",
		description: "Creates an agent team"
	},
	TeamDelete: {
		name: "TeamDelete",
		category: "orchestration",
		exposure: "internal",
		description: "Deletes an agent team"
	},
	WebSearch: {
		name: "WebSearch",
		category: "context",
		exposure: "disabled",
		description: "Performs web searches with domain filtering"
	},
	WebFetch: {
		name: "WebFetch",
		category: "context",
		exposure: "disabled",
		description: "Fetches content from a specified URL"
	},
	CherryWebSearch: {
		name: "mcp__cherry-tools__web_search",
		category: "context",
		exposure: "user",
		description: "Searches the web via your configured provider",
		mcpServer: "cherry-tools"
	},
	CherryWebFetch: {
		name: "mcp__cherry-tools__web_fetch",
		category: "context",
		exposure: "user",
		description: "Fetches and reads a web page",
		mcpServer: "cherry-tools"
	},
	CherryKbSearch: {
		name: "mcp__cherry-tools__kb_search",
		category: "context",
		exposure: "user",
		description: "Searches your knowledge bases",
		mcpServer: "cherry-tools",
		requiresKnowledgeScope: true
	},
	CherryKbList: {
		name: "mcp__cherry-tools__kb_list",
		category: "context",
		exposure: "internal",
		description: "Lists your knowledge bases, or outlines one base’s structure",
		dependsOn: ["mcp__cherry-tools__kb_search"],
		mcpServer: "cherry-tools",
		requiresKnowledgeScope: true
	},
	CherryKbRead: {
		name: "mcp__cherry-tools__kb_read",
		category: "context",
		exposure: "internal",
		description: "Reads a knowledge base document, or greps within it",
		dependsOn: ["mcp__cherry-tools__kb_search"],
		mcpServer: "cherry-tools",
		requiresKnowledgeScope: true
	},
	CherryKbManage: {
		name: "mcp__cherry-tools__kb_manage",
		category: "context",
		exposure: "user",
		description: "Adds, deletes, or refreshes knowledge base documents",
		mcpServer: "cherry-tools",
		requiresKnowledgeScope: true
	},
	CherryCron: {
		name: "mcp__cherry-tools__cron",
		category: "orchestration",
		exposure: "user",
		description: "Manages the in-app scheduler",
		mcpServer: "cherry-tools"
	},
	CherryNotify: {
		name: "mcp__cherry-tools__notify",
		category: "orchestration",
		exposure: "user",
		description: "Sends a notification through a connected channel",
		mcpServer: "cherry-tools"
	},
	CherryConfig: {
		name: "mcp__cherry-tools__config",
		category: "orchestration",
		exposure: "user",
		description: "Inspects and manages this agent configuration and channels",
		mcpServer: "cherry-tools"
	},
	CherryGenerateImage: {
		name: "mcp__cherry-tools__generate_image",
		category: "media",
		exposure: "user",
		description: "Generates an image from a text prompt using your configured painting model",
		mcpServer: "cherry-tools"
	},
	AgentMemory: {
		name: "mcp__agent-memory__memory",
		category: "context",
		exposure: "user",
		description: "Stores and recalls cross-session memory",
		mcpServer: "agent-memory"
	},
	SearchSkills: {
		name: "mcp__skills__search_skills",
		category: "context",
		exposure: "internal",
		description: "Searches the skill marketplace",
		mcpServer: "skills"
	},
	InstallSkill: {
		name: "mcp__skills__install_skill",
		category: "context",
		exposure: "internal",
		description: "Installs a marketplace skill into the library",
		mcpServer: "skills"
	}
};
const CLAUDE_TOOL_DEFS = Object.values(CLAUDE_TOOL_REGISTRY);
const isMcpTool = (def) => def.mcpServer !== void 0;
const CLAUDE_KNOWLEDGE_TOOL_NAMES = new Set(CLAUDE_TOOL_DEFS.filter((def) => def.requiresKnowledgeScope).map((def) => def.name));
const CLAUDE_TOOL_CATEGORIES = [
	"file",
	"shell",
	"search",
	"context",
	"orchestration",
	"media"
];
var MCP_TOOL_LABELS = {
	"mcp__cherry-tools__web_search": "Web Search",
	"mcp__cherry-tools__web_fetch": "Web Fetch",
	"mcp__cherry-tools__kb_search": "Knowledge Search",
	"mcp__cherry-tools__kb_manage": "Manage Knowledge",
	"mcp__agent-memory__memory": "Memory",
	"mcp__cherry-tools__cron": "Scheduler",
	"mcp__cherry-tools__notify": "Notify",
	"mcp__cherry-tools__config": "Configuration",
	"mcp__cherry-tools__generate_image": "Generate Image"
};
function claudeUserFacingTools() {
	return Object.entries(CLAUDE_TOOL_REGISTRY).filter(([, def]) => def.exposure === "user").map(([key, def]) => ({
		key,
		name: def.name,
		label: isMcpTool(def) ? MCP_TOOL_LABELS[def.name] ?? def.name : def.name,
		category: def.category,
		description: def.description
	}));
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MCP_SERVERS_SETTINGS_PATH = "/settings/mcp/servers";
function getStatusBadge(t, state) {
	switch (state) {
		case "connected": return t("settings.mcp.runtimeStatus.connected", "Connected");
		case "connecting": return t("settings.mcp.runtimeStatus.connecting", "Connecting");
		case "error": return t("settings.mcp.runtimeStatus.unavailable", "Unavailable");
		default: return;
	}
}
function getStatusBadgeClassName(state) {
	switch (state) {
		case "connected": return "border-success-border bg-success-subtle text-success-subtle-foreground";
		case "connecting": return "border-warning-border bg-warning-subtle text-warning-subtle-foreground";
		case "error": return "border-error-border bg-error-subtle text-error-subtle-foreground";
		default: return;
	}
}
function getServerState(server, status) {
	return server.isActive ? status?.state ?? "connecting" : "disabled";
}
function McpServerCatalogGrid({ enabledIds, emptyLabel, onOpenSettings, onToggle, portalContainer, title }) {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery("/mcp-servers", {});
	const mcpServers = (0, import_react.useMemo)(() => data?.items ?? [], [data]);
	const mcpStatuses = useMcpRuntimeStatusMap(mcpServers);
	const settingsLabel = title ? `${title} ${t("settings.title")}` : t("settings.mcp.title");
	const catalog = (0, import_react.useMemo)(() => mcpServers.map((server) => {
		const state = getServerState(server, mcpStatuses[server.id]);
		return {
			id: server.id,
			name: server.name,
			inactiveBadge: server.isActive ? void 0 : t("library.config.tools.inactive_badge"),
			statusBadge: getStatusBadge(t, state),
			statusBadgeClassName: getStatusBadgeClassName(state),
			pickable: server.isActive
		};
	}), [
		mcpServers,
		mcpStatuses,
		t
	]);
	const handleOpenMcpSettings = () => {
		openSettingsTab(MCP_SERVERS_SETTINGS_PATH);
		onOpenSettings?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.mcp-server-catalog-grid",
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium text-[13px] text-foreground leading-none",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: settingsLabel,
				portalContainer: portalContainer ?? void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": settingsLabel,
					title: settingsLabel,
					onClick: handleOpenMcpSettings,
					className: "flex size-6 min-h-0 shrink-0 items-center justify-center rounded-md p-0 text-muted-foreground shadow-none hover:bg-accent/50 hover:text-foreground focus-visible:bg-accent/50 focus-visible:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
						size: 12,
						strokeWidth: 1.7
					})
				})
			})]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: title ? "mt-2" : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogToggleGrid, {
				items: catalog,
				enabledIds,
				loading: isLoading,
				onToggle,
				emptyLabel,
				portalContainer,
				layout: "list"
			})
		})]
	});
}
var logger$3 = loggerService.withContext("AgentEditDialog");
var DEFAULT_TOOL_TAB = "tools.builtin";
var SKILLS_SETTINGS_PATH = "/settings/skills";
function openSkillsSettingsTab() {
	openSettingsTab(SKILLS_SETTINGS_PATH);
}
var CATEGORY_LABEL_KEYS = {
	file: "library.config.agent.section.tools.category.file",
	shell: "library.config.agent.section.tools.category.shell",
	search: "library.config.agent.section.tools.category.search",
	context: "library.config.agent.section.tools.category.context",
	orchestration: "library.config.agent.section.tools.category.orchestration",
	media: "library.config.agent.section.tools.category.media"
};
var CATEGORY_LABEL_FALLBACKS = {
	file: "File",
	shell: "Shell",
	search: "Search",
	context: "Context",
	orchestration: "Orchestration",
	media: "Media"
};
function isToolTab(value) {
	return value === "tools.builtin" || value === "tools.knowledge" || value === "tools.mcp" || value === "tools.skills";
}
function getLeafTabIds(tabs) {
	return tabs.flatMap((tab) => tab.children?.length ? tab.children.map((child) => child.id) : [tab.id]);
}
function defaultValuesForAgent(resource) {
	const form = buildInitialAgentFormState(resource);
	return {
		avatar: form.avatar || "🤖",
		name: form.name,
		description: form.description,
		modelId: form.model || null,
		planModelId: form.planModel,
		smallModelId: form.smallModel,
		instructions: form.instructions,
		mcps: [...form.mcps],
		knowledgeBaseIds: [...form.knowledgeBaseIds],
		skillIds: [...form.skillIds],
		disabledTools: [...form.disabledTools],
		permissionMode: form.permissionMode,
		envVarsText: form.envVarsText,
		heartbeatEnabled: form.heartbeatEnabled,
		heartbeatInterval: form.heartbeatInterval
	};
}
function modelLabelsForAgent(resource) {
	return {
		modelId: resource.model ?? null,
		planModelId: resource.planModel ?? null,
		smallModelId: resource.smallModel ?? null,
		contextCompressModelId: null
	};
}
function buildAgentFormState(baseline, values) {
	return {
		...baseline,
		avatar: values.avatar,
		name: values.name,
		description: values.description,
		model: values.modelId ?? "",
		planModel: values.planModelId || "",
		smallModel: values.smallModelId || "",
		instructions: values.instructions,
		mcps: [...values.mcps],
		knowledgeBaseIds: [...values.knowledgeBaseIds],
		skillIds: [...values.skillIds],
		disabledTools: [...values.disabledTools],
		permissionMode: values.permissionMode,
		envVarsText: values.envVarsText,
		heartbeatEnabled: values.heartbeatEnabled,
		heartbeatInterval: values.heartbeatInterval
	};
}
function advanceAgentFormBaseline(latest, submitted, payload) {
	const next = { ...latest };
	const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
	if (hasOwn(payload, "name")) next.name = submitted.name;
	if (hasOwn(payload, "description")) next.description = submitted.description;
	if (hasOwn(payload, "model")) next.model = submitted.model;
	if (hasOwn(payload, "planModel")) next.planModel = submitted.planModel;
	if (hasOwn(payload, "smallModel")) next.smallModel = submitted.smallModel;
	if (hasOwn(payload, "instructions")) next.instructions = submitted.instructions;
	if (hasOwn(payload, "mcps")) next.mcps = [...submitted.mcps];
	if (hasOwn(payload, "knowledgeBaseIds")) next.knowledgeBaseIds = [...submitted.knowledgeBaseIds];
	if (hasOwn(payload, "skillUpdates")) next.skillIds = [...submitted.skillIds];
	if (hasOwn(payload, "disabledTools")) next.disabledTools = [...submitted.disabledTools];
	const configuration = payload.configuration;
	if (configuration) {
		if (hasOwn(configuration, "avatar")) next.avatar = submitted.avatar;
		if (hasOwn(configuration, "permission_mode")) next.permissionMode = submitted.permissionMode;
		if (hasOwn(configuration, "env_vars")) next.envVarsText = submitted.envVarsText;
		if (hasOwn(configuration, "heartbeat_enabled")) next.heartbeatEnabled = submitted.heartbeatEnabled;
		if (hasOwn(configuration, "heartbeat_interval")) next.heartbeatInterval = submitted.heartbeatInterval;
	}
	return next;
}
function syncAgentFormState(form, next) {
	form.setValue("modelId", next.model || null, { shouldDirty: true });
	form.setValue("planModelId", next.planModel, { shouldDirty: true });
	form.setValue("smallModelId", next.smallModel, { shouldDirty: true });
	form.setValue("mcps", next.mcps, { shouldDirty: true });
	form.setValue("knowledgeBaseIds", next.knowledgeBaseIds, { shouldDirty: true });
	form.setValue("skillIds", next.skillIds, { shouldDirty: true });
	form.setValue("disabledTools", next.disabledTools, { shouldDirty: true });
	form.setValue("permissionMode", next.permissionMode, { shouldDirty: true });
	form.setValue("heartbeatEnabled", next.heartbeatEnabled, { shouldDirty: true });
	form.setValue("heartbeatInterval", next.heartbeatInterval, { shouldDirty: true });
}
function AgentEditDialog({ resource, open, onOpenChange, modelFilter, initialTab }) {
	if (!resource) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentEditDialogContent, {
		resource,
		open,
		onOpenChange,
		modelFilter,
		initialTab
	});
}
function AgentEditDialogContent({ resource, open, onOpenChange, modelFilter, initialTab }) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = (0, import_react.useState)(initialTab ?? "basic");
	const [emojiPickerOpen, setEmojiPickerOpen] = (0, import_react.useState)(false);
	const [dialogContentElement, setDialogContentElement] = (0, import_react.useState)(null);
	const [modelLabels, setModelLabels] = (0, import_react.useState)(() => modelLabelsForAgent(resource));
	const [formBaseline, setFormBaseline] = (0, import_react.useState)(() => buildInitialAgentFormState(resource));
	const formBaselineRef = (0, import_react.useRef)(formBaseline);
	const [baselineSkillAgentId, setBaselineSkillAgentId] = (0, import_react.useState)(null);
	const defaultValues = (0, import_react.useMemo)(() => defaultValuesForAgent(resource), [resource]);
	const form = useForm({ defaultValues });
	const values = form.watch();
	const replaceFormBaseline = (0, import_react.useCallback)((next) => {
		formBaselineRef.current = next;
		setFormBaseline(next);
	}, []);
	const patchAgentForm = (0, import_react.useCallback)((patch) => {
		syncAgentFormState(form, applyAgentFormPatch(buildAgentFormState(formBaselineRef.current, form.getValues()), patch));
	}, [form]);
	const { updateAgent } = useAgentMutationsById(resource.id);
	const { bases: knowledgeBases, isLoading: knowledgeBasesLoading } = useKnowledgeBases();
	const availableKnowledgeBaseIds = (0, import_react.useMemo)(() => new Set(knowledgeBases.map((base) => base.id)), [knowledgeBases]);
	const { skills, loading: skillsLoading, refreshing: skillsRefreshing } = useInstalledSkills(resource.id || void 0, { enabled: open && Boolean(resource.id) });
	useReconcileSkillsOnOpen(open && activeTab === "tools.skills");
	const skillIdsFromQueryKey = (0, import_react.useMemo)(() => skills.filter((skill) => skill.isEnabled).map((skill) => skill.id).join("\0"), [skills]);
	const skillIdsFromQuery = (0, import_react.useMemo)(() => skillIdsFromQueryKey ? skillIdsFromQueryKey.split("\0") : [], [skillIdsFromQueryKey]);
	const currentFormState = (0, import_react.useMemo)(() => buildAgentFormState(formBaseline, values), [formBaseline, values]);
	const saveIntent = (0, import_react.useMemo)(() => {
		return diffAgentSaveIntent(currentFormState, formBaseline);
	}, [currentFormState, formBaseline]);
	const tabs = (0, import_react.useMemo)(() => [
		{
			id: "basic",
			label: t("library.config.dialogs.edit.basic_tab")
		},
		{
			id: "prompt",
			label: t("library.config.dialogs.edit.prompt_tab")
		},
		{
			id: "tools",
			label: t("library.config.dialogs.edit.tools_tab"),
			children: [
				{
					id: DEFAULT_TOOL_TAB,
					label: t("library.config.agent.section.tools.tab.tools")
				},
				{
					id: "tools.knowledge",
					label: t("library.config.dialogs.edit.knowledge_tab")
				},
				{
					id: "tools.mcp",
					label: t("library.config.agent.section.tools.tab.mcp")
				},
				{
					id: "tools.skills",
					label: t("library.config.agent.section.tools.tab.skills")
				}
			]
		},
		{
			id: "advanced",
			label: t("library.config.dialogs.edit.advanced_tab")
		}
	], [t]);
	const leafTabIds = (0, import_react.useMemo)(() => new Set(getLeafTabIds(tabs)), [tabs]);
	const wasOpenRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const justOpened = open && !wasOpenRef.current;
		wasOpenRef.current = open;
		if (!justOpened) return;
		form.reset(defaultValues);
		form.clearErrors();
		setActiveTab(initialTab ?? "basic");
		setEmojiPickerOpen(false);
		setModelLabels(modelLabelsForAgent(resource));
		replaceFormBaseline(buildInitialAgentFormState(resource));
		setBaselineSkillAgentId(null);
	}, [
		defaultValues,
		form,
		initialTab,
		open,
		replaceFormBaseline,
		resource
	]);
	(0, import_react.useEffect)(() => {
		if (!open || skillsLoading || skillsRefreshing || baselineSkillAgentId === resource.id) return;
		replaceFormBaseline({
			...formBaselineRef.current,
			skillIds: [...skillIdsFromQuery]
		});
		form.setValue("skillIds", skillIdsFromQuery, { shouldDirty: false });
		setBaselineSkillAgentId(resource.id);
	}, [
		baselineSkillAgentId,
		form,
		open,
		replaceFormBaseline,
		resource.id,
		skillIdsFromQuery,
		skillsLoading,
		skillsRefreshing
	]);
	(0, import_react.useEffect)(() => {
		if (!open || knowledgeBasesLoading) return;
		const currentIds = form.getValues("knowledgeBaseIds");
		const convergedIds = currentIds.filter((id) => availableKnowledgeBaseIds.has(id));
		if (convergedIds.length !== currentIds.length) {
			replaceFormBaseline({
				...formBaselineRef.current,
				knowledgeBaseIds: formBaselineRef.current.knowledgeBaseIds.filter((id) => availableKnowledgeBaseIds.has(id))
			});
			form.setValue("knowledgeBaseIds", convergedIds, { shouldDirty: false });
		}
	}, [
		availableKnowledgeBaseIds,
		form,
		knowledgeBasesLoading,
		open,
		replaceFormBaseline
	]);
	(0, import_react.useEffect)(() => {
		if (leafTabIds.has(activeTab)) return;
		setActiveTab("basic");
	}, [activeTab, leafTabIds]);
	const rootError = form.formState.errors.root?.message;
	const autoSaveChangeKey = saveIntent && values.name.trim().length > 0 ? JSON.stringify({
		values,
		payload: saveIntent.payload
	}) : null;
	const canPersist = autoSaveChangeKey !== null;
	const saveFailedRef = (0, import_react.useRef)(false);
	const persist = async () => {
		const submittedFormState = buildAgentFormState(formBaselineRef.current, form.getValues());
		const pending = diffAgentSaveIntent(submittedFormState, formBaselineRef.current);
		if (!pending) return;
		form.clearErrors("root");
		saveFailedRef.current = false;
		try {
			await updateAgent(pending.payload);
		} catch (error) {
			logger$3.error("Failed to auto-save agent edit dialog", error, { agentId: resource.id });
			form.setError("root", { message: t("library.config.dialogs.edit.save_failed") });
			saveFailedRef.current = true;
			return;
		}
		replaceFormBaseline(advanceAgentFormBaseline(formBaselineRef.current, submittedFormState, pending.payload));
	};
	const flush = useDebouncedAutoSave({
		enabled: open,
		changeKey: autoSaveChangeKey,
		onSave: persist
	});
	const handleOpenChange = (next) => {
		if (next || !canPersist) {
			onOpenChange(next);
			return;
		}
		(async () => {
			await flush();
			if (saveFailedRef.current) return;
			onOpenChange(false);
		})();
	};
	const closeBeforeAction = useCloseBeforeAction(handleOpenChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditDialogShell, {
		activeTab,
		form,
		onActiveTabChange: setActiveTab,
		onOpenChange: handleOpenChange,
		open,
		rootError,
		setDialogContentElement,
		groupPresentation: "inline",
		tabs,
		title: t("library.config.dialogs.edit.agent_title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "basic",
				forceMount: true,
				hidden: activeTab !== "basic",
				className: "m-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentBasicFields, {
					form,
					modelFilter,
					portalContainer: dialogContentElement,
					modelLabels,
					setModelLabels,
					patchAgentForm,
					emojiPickerOpen,
					setEmojiPickerOpen,
					onSettingsNavigate: closeBeforeAction
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "prompt",
				forceMount: true,
				hidden: activeTab !== "prompt",
				className: "m-0 flex h-full min-h-0 flex-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentPromptField, {
					form,
					portalContainer: dialogContentElement
				})
			}),
			isToolTab(activeTab) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: activeTab,
				forceMount: true,
				className: "m-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentToolsFields, {
					agent: resource,
					form,
					activeToolTab: activeTab,
					portalContainer: dialogContentElement,
					skills,
					skillsLoading,
					skillsReady: baselineSkillAgentId === resource.id
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "advanced",
				forceMount: true,
				hidden: activeTab !== "advanced",
				className: "m-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentAdvancedFields, { form })
			})
		] })
	});
}
function AgentBasicFields({ form, modelFilter, portalContainer, modelLabels, setModelLabels, patchAgentForm, emojiPickerOpen, setEmojiPickerOpen, onSettingsNavigate }) {
	const { t } = useTranslation();
	const heartbeatEnabled = form.watch("heartbeatEnabled");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.agent-basic-fields",
		className: "divide-y divide-border-subtle border-border-subtle border-b [&>*:first-child]:pt-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarField, {
				form,
				emojiPickerOpen,
				setEmojiPickerOpen,
				fallback: "🤖",
				portalContainer,
				size: "sm",
				layout: "row"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInputField, {
				form,
				name: "name",
				label: t("library.config.agent.field.name.label"),
				placeholder: t("library.config.agent.field.name.placeholder"),
				required: true,
				layout: "row"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInputField, {
				form,
				name: "description",
				label: t("library.config.agent.field.description.label"),
				placeholder: t("library.config.agent.field.description.placeholder"),
				layout: "row"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
				form,
				name: "modelId",
				label: t("library.config.agent.field.model.label"),
				filter: modelFilter,
				portalContainer,
				modelLabels,
				setModelLabels,
				onModelChange: (modelId) => patchAgentForm({ model: modelId ?? "" }),
				onSettingsNavigate,
				layout: "row",
				triggerClassName: "h-9 rounded-md border border-input bg-transparent px-3 hover:bg-accent/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
				form,
				name: "planModelId",
				label: t("library.config.agent.field.plan_model.label"),
				allowClear: true,
				filter: modelFilter,
				portalContainer,
				modelLabels,
				setModelLabels,
				onModelChange: (modelId) => patchAgentForm({ planModel: modelId ?? "" }),
				onSettingsNavigate,
				layout: "row",
				triggerClassName: "h-9 rounded-md border border-input bg-transparent px-3 hover:bg-accent/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
				form,
				name: "smallModelId",
				label: t("library.config.agent.field.small_model.label"),
				allowClear: true,
				filter: modelFilter,
				portalContainer,
				modelLabels,
				setModelLabels,
				onModelChange: (modelId) => patchAgentForm({ smallModel: modelId ?? "" }),
				onSettingsNavigate,
				layout: "row",
				triggerClassName: "h-9 rounded-md border border-input bg-transparent px-3 hover:bg-accent/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionModeField, {
				form,
				portalContainer,
				patchAgentForm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartbeatSettingsField, {
				form,
				enabled: heartbeatEnabled,
				onEnabledChange: (checked) => patchAgentForm({ heartbeatEnabled: checked })
			})
		]
	});
}
function PermissionModeField({ form, portalContainer, patchAgentForm }) {
	const { t } = useTranslation();
	const permissionMode = useWatch({
		control: form.control,
		name: "permissionMode"
	}) || "default";
	const selectedPermissionModeCard = permissionModeCards.find((card) => card.mode === permissionMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		control: form.control,
		name: "permissionMode",
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
			className: editDialogFormRowClassName,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
					className: editDialogFormRowLabelClassName,
					children: t("library.config.agent.field.permission_mode.label")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: field.value || "default",
					onValueChange: (value) => patchAgentForm({ permissionMode: value }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-9 w-full rounded-md",
						"aria-label": t("library.config.agent.field.permission_mode.label"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: selectedPermissionModeCard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: selectedPermissionModeCard.dangerous ? "text-destructive" : void 0,
							children: t(selectedPermissionModeCard.titleKey, selectedPermissionModeCard.titleFallback)
						}) })
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						portalContainer,
						children: permissionModeCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: card.mode,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionModeIcon, {
									mode: card.mode,
									size: 16
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionModeOptionLabel, {
									card,
									t
								})]
							})
						}, card.mode))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { className: "col-start-2" })
			]
		})
	});
}
function HeartbeatSettingsField({ form, enabled, onEnabledChange }) {
	const { t } = useTranslation();
	const label = t("library.config.agent.field.heartbeat_enabled.label");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.heartbeat-settings-field",
		className: "divide-y divide-border-subtle",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "heartbeatEnabled",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: editDialogFormRowClassName,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
						className: editDialogFormRowLabelClassName,
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							size: "sm",
							checked: field.value,
							onCheckedChange: onEnabledChange,
							"aria-label": label
						})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { className: "col-start-2" })
				]
			})
		}), enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "heartbeatInterval",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: editDialogFormRowClassName,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
						className: editDialogFormRowLabelClassName,
						children: t("library.config.agent.field.heartbeat_interval.label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
						min: 1,
						max: 1440,
						step: 1,
						precision: 0,
						align: "start",
						changeOnBlur: true,
						className: "h-9 w-full",
						value: field.value || null,
						onChange: (v) => field.onChange(typeof v === "number" ? v : 0)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { className: "col-start-2" })
				]
			})
		}) : null]
	});
}
function AgentPromptField({ form, portalContainer }) {
	const { t } = useTranslation();
	const [resetPreviewKey, setResetPreviewKey] = (0, import_react.useState)(0);
	const name = useWatch({
		control: form.control,
		name: "name"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		control: form.control,
		name: "instructions",
		render: ({ field }) => {
			const handlePromptActionChange = (instructions) => {
				field.onChange(instructions);
				setResetPreviewKey((key) => key + 1);
			};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptEditorField_default, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
					label: t("library.config.agent.field.instructions.label"),
					helpTrigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptVariablesPopover, { portalContainer }),
					formLabel: false
				}),
				value: field.value,
				onChange: field.onChange,
				placeholder: t("library.config.agent.field.instructions.placeholder"),
				resetPreviewKey,
				fill: true,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptPolishActions, {
					value: field.value,
					fallbackSource: name,
					emptyValueSystemPrompt: AGENT_PROMPT,
					existingValueSystemPrompt: RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT,
					onChange: handlePromptActionChange
				}),
				minHeight: EDIT_DIALOG_PROMPT_MIN_HEIGHT,
				maxHeight: EDIT_DIALOG_PROMPT_MAX_HEIGHT
			});
		}
	});
}
function AgentToolsFields({ agent, form, activeToolTab, portalContainer, skills, skillsLoading, skillsReady }) {
	const { t } = useTranslation();
	const disabledTools = form.watch("disabledTools");
	const mcps = form.watch("mcps");
	const knowledgeBaseIds = form.watch("knowledgeBaseIds");
	const skillIds = form.watch("skillIds");
	const canManageSkills = Boolean(agent.id);
	const hasKnowledgeScope = knowledgeBaseIds.length > 0;
	const disabledSet = (0, import_react.useMemo)(() => new Set(disabledTools), [disabledTools]);
	const builtinSections = (0, import_react.useMemo)(() => {
		const tools = claudeUserFacingTools().filter((tool) => hasKnowledgeScope || !CLAUDE_KNOWLEDGE_TOOL_NAMES.has(tool.name));
		return CLAUDE_TOOL_CATEGORIES.map((category) => ({
			category,
			label: t(CATEGORY_LABEL_KEYS[category], CATEGORY_LABEL_FALLBACKS[category]),
			items: tools.filter((tool) => tool.category === category).map((tool) => ({
				id: tool.name,
				name: t(`agent.tools.builtin.${tool.key}.label`, tool.label),
				description: t(`agent.tools.builtin.${tool.key}.description`, tool.description),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
					size: 13,
					strokeWidth: 1.5,
					className: "text-muted-foreground"
				})
			}))
		})).filter((section) => section.items.length > 0);
	}, [t, hasKnowledgeScope]);
	const enabledToolIds = (0, import_react.useMemo)(() => new Set(builtinSections.flatMap((s) => s.items.map((i) => i.id)).filter((id) => !disabledSet.has(id))), [builtinSections, disabledSet]);
	const setToolEnabled = (name, enabled) => form.setValue("disabledTools", enabled ? disabledTools.filter((n) => n !== name) : [...disabledTools, name], { shouldDirty: true });
	const mcpIds = (0, import_react.useMemo)(() => new Set(mcps), [mcps]);
	const enableMCP = (id) => form.setValue("mcps", [...mcps, id], { shouldDirty: true });
	const disableMCP = (id) => form.setValue("mcps", mcps.filter((mcpId) => mcpId !== id), { shouldDirty: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.agent-tools-fields",
		className: "grid gap-4",
		children: [
			activeToolTab === "tools.builtin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5",
				children: builtinSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-muted-foreground text-xs",
						children: section.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogToggleGrid, {
						items: section.items,
						enabledIds: enabledToolIds,
						onToggle: setToolEnabled,
						emptyLabel: t("library.config.agent.section.tools.no_builtin_enabled"),
						portalContainer
					})]
				}, section.category))
			}) : null,
			activeToolTab === "tools.knowledge" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeBaseField, {
				form,
				portalContainer
			}) : null,
			activeToolTab === "tools.mcp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpServerCatalogGrid, {
				title: t("library.config.tools.added"),
				enabledIds: mcpIds,
				onToggle: (id, enabled) => enabled ? enableMCP(id) : disableMCP(id),
				emptyLabel: t("library.config.agent.section.tools.no_mcp_bound"),
				portalContainer
			}) : null,
			activeToolTab === "tools.skills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCatalogPicker, {
				mode: "edit",
				skills,
				loading: skillsLoading,
				selectedIds: skillIds,
				disabled: !canManageSkills || !skillsReady,
				onSelectedIdsChange: (ids) => form.setValue("skillIds", ids, { shouldDirty: true }),
				emptyLabel: canManageSkills ? t("library.config.agent.section.tools.no_skills_enabled") : t("library.config.agent.section.tools.skills_require_save"),
				portalContainer,
				trailingItem: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					onClick: openSkillsSettingsTab,
					className: "h-full min-h-11 w-full rounded-lg border border-border-subtle border-dashed px-2.5 py-1.5 font-normal text-muted-foreground text-sm shadow-none transition-colors hover:border-border-strong hover:bg-accent/50 hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCase, {
						size: 14,
						strokeWidth: 1.7
					}), t("agent.settings.skills.addMore")]
				})
			}) : null
		]
	});
}
function AgentAdvancedFields({ form }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "resource-catalog.agent-advanced-fields",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "envVarsText",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
					label: t("library.config.agent.field.env_vars.label"),
					help: t("library.config.agent.field.env_vars.help")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					value: field.value,
					onValueChange: field.onChange,
					placeholder: t("library.config.agent.field.env_vars.placeholder"),
					rows: 5
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
			] })
		})
	});
}
var logger$2 = loggerService.withContext("usePromptProcessor");
function usePromptProcessor({ prompt, modelName }) {
	const [processedPrompt, setProcessedPrompt] = (0, import_react.useState)(prompt);
	(0, import_react.useEffect)(() => {
		const processPrompt = async () => {
			try {
				if (containsSupportedVariables(prompt)) setProcessedPrompt(await replacePromptVariables(prompt, modelName));
				else setProcessedPrompt(prompt);
			} catch (error) {
				logger$2.error("Failed to process prompt variables, falling back:", error);
				setProcessedPrompt(prompt);
			}
		};
		processPrompt();
	}, [prompt, modelName]);
	return processedPrompt;
}
var GROUP_SELECT_VALUE_PREFIX = "group:";
var CREATE_GROUP_SELECT_VALUE = "action:create-group";
function encodeGroupSelectValue(groupId) {
	return `${GROUP_SELECT_VALUE_PREFIX}${groupId}`;
}
function decodeGroupSelectValue(value) {
	if (!value.startsWith(GROUP_SELECT_VALUE_PREFIX)) return null;
	return value.slice(6);
}
const GroupSelector = ({ value, onChange, groups, isLoading, error, disabled, portalContainer, onCreateGroup, triggerClassName }) => {
	const { t } = useTranslation();
	const [open, setOpen] = (0, import_react.useState)(false);
	const hasGroupOptions = groups.length > 0;
	const isUnavailable = Boolean(isLoading || error);
	const canOpen = !disabled && !isUnavailable && (hasGroupOptions || Boolean(onCreateGroup));
	const selectOpen = canOpen && open;
	const placeholder = isLoading ? t("common.loading") : error ? t("library.group_sync_failed") : t(hasGroupOptions || onCreateGroup ? "library.config.basic.group_placeholder" : "library.config.basic.group_empty");
	(0, import_react.useEffect)(() => {
		if (!canOpen) setOpen(false);
	}, [canOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.group-selector",
		className: "group/group-select relative flex w-full min-w-0 items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			disabled: !canOpen,
			open: selectOpen,
			value: !isUnavailable && value ? encodeGroupSelectValue(value) : "",
			onOpenChange: (nextOpen) => setOpen(canOpen && nextOpen),
			onValueChange: (selectedValue) => {
				if (selectedValue === CREATE_GROUP_SELECT_VALUE) {
					setOpen(false);
					onCreateGroup?.();
					return;
				}
				const groupId = decodeGroupSelectValue(selectedValue);
				if (groupId !== null) onChange(groupId);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				size: "sm",
				className: cn("w-full", triggerClassName, value && "[&_svg]:transition-opacity group-focus-within/group-select:[&_svg]:opacity-0 group-hover/group-select:[&_svg]:opacity-0"),
				"aria-label": t("library.config.basic.group"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
				portalContainer: portalContainer ?? void 0,
				children: [
					groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: encodeGroupSelectValue(group.id),
						children: group.name
					}, group.id)),
					onCreateGroup && hasGroupOptions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator, {}) : null,
					onCreateGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
						value: CREATE_GROUP_SELECT_VALUE,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("common.group.create")]
					}) : null
				]
			})]
		}), value && !disabled && !isUnavailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			"aria-label": `${t("library.config.basic.group")} ${t("common.clear")}`,
			onClick: (event) => {
				event.stopPropagation();
				onChange(null);
			},
			className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-2.5 flex size-5 min-h-0 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-muted-foreground opacity-0 shadow-none transition-[background-color,color,opacity] hover:bg-muted hover:text-foreground focus-visible:pointer-events-auto focus-visible:opacity-100 active:bg-muted group-focus-within/group-select:pointer-events-auto group-focus-within/group-select:opacity-100 group-hover/group-select:pointer-events-auto group-hover/group-select:opacity-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
		}) : null]
	});
};
var logger$1 = loggerService.withContext("AssistantEditDialog");
var UI_DEFAULT_MAX_TOKENS = 4096;
var UI_MAX_TOOL_CALLS = 100;
function isAssistantToolTab(value) {
	return value === "tools.mcp" || value === "tools.knowledge";
}
function defaultValuesForAssistant(resource) {
	const form = initialAssistantFormState(resource);
	return {
		avatar: form.emoji,
		name: form.name,
		description: form.description,
		modelId: form.modelId ?? null,
		groupId: form.groupId,
		prompt: form.prompt,
		temperature: form.temperature,
		enableTemperature: form.enableTemperature,
		topP: form.topP,
		enableTopP: form.enableTopP,
		maxTokens: form.maxTokens,
		enableMaxTokens: form.enableMaxTokens,
		streamOutput: form.streamOutput,
		maxToolCalls: form.maxToolCalls,
		enableMaxToolCalls: form.enableMaxToolCalls,
		customParameters: form.customParameters.map((parameter) => ({ ...parameter })),
		mcpMode: form.mcpMode,
		contextOverrideEnabled: form.contextOverrideEnabled,
		contextCompressEnabled: form.contextCompressEnabled,
		contextTruncateThreshold: form.contextTruncateThreshold,
		contextCompressModelId: form.contextCompressModelId,
		knowledgeBaseIds: [...form.knowledgeBaseIds],
		mcpServerIds: [...form.mcpServerIds]
	};
}
function modelLabelsForAssistant(resource) {
	return {
		modelId: resource.modelName ?? null,
		planModelId: null,
		smallModelId: null,
		contextCompressModelId: null
	};
}
function buildAssistantFormState(baseline, values) {
	return {
		...baseline,
		emoji: values.avatar,
		name: values.name,
		description: values.description,
		modelId: values.modelId,
		groupId: values.groupId,
		prompt: values.prompt,
		temperature: values.temperature,
		enableTemperature: values.enableTemperature,
		topP: values.topP,
		enableTopP: values.enableTopP,
		maxTokens: values.maxTokens,
		enableMaxTokens: values.enableMaxTokens,
		streamOutput: values.streamOutput,
		maxToolCalls: values.maxToolCalls,
		enableMaxToolCalls: values.enableMaxToolCalls,
		customParameters: values.customParameters,
		mcpMode: values.mcpMode,
		contextOverrideEnabled: values.contextOverrideEnabled,
		contextCompressEnabled: values.contextCompressEnabled,
		contextTruncateThreshold: values.contextTruncateThreshold,
		contextCompressModelId: values.contextCompressModelId,
		knowledgeBaseIds: values.knowledgeBaseIds,
		mcpServerIds: values.mcpServerIds
	};
}
function AssistantEditDialog({ resource, open, onOpenChange, modelFilter, initialTab }) {
	if (!resource) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantEditDialogContent, {
		resource,
		open,
		onOpenChange,
		modelFilter,
		initialTab
	});
}
function AssistantEditDialogContent({ resource, open, onOpenChange, modelFilter, initialTab }) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = (0, import_react.useState)(initialTab ?? "basic");
	const [emojiPickerOpen, setEmojiPickerOpen] = (0, import_react.useState)(false);
	const [createGroupDialogOpen, setCreateGroupDialogOpen] = (0, import_react.useState)(false);
	const [dialogContentElement, setDialogContentElement] = (0, import_react.useState)(null);
	const [modelLabels, setModelLabels] = (0, import_react.useState)(() => modelLabelsForAssistant(resource));
	const defaultValues = (0, import_react.useMemo)(() => defaultValuesForAssistant(resource), [resource]);
	const form = useForm({ defaultValues });
	const values = form.watch();
	const { groups, isLoading: isGroupsLoading, error: groupsError } = useGroups("assistant");
	const { createGroup } = useGroupMutations("assistant");
	const { updateAssistant } = useAssistantMutationsById(resource.id);
	const saveIntent = (0, import_react.useMemo)(() => {
		const baseline = initialAssistantFormState(resource);
		return diffAssistantSaveIntent(buildAssistantFormState(baseline, values), baseline, resource);
	}, [resource, values]);
	const tabs = (0, import_react.useMemo)(() => [
		{
			id: "basic",
			label: t("library.config.dialogs.edit.basic_tab")
		},
		{
			id: "advanced",
			label: t("library.config.agent.model_config")
		},
		{
			id: "prompt",
			label: t("library.config.dialogs.edit.prompt_tab")
		},
		{
			id: "tools",
			label: t("library.config.dialogs.edit.tools_tab"),
			children: [{
				id: "tools.knowledge",
				label: t("library.config.dialogs.edit.knowledge_tab")
			}, {
				id: "tools.mcp",
				label: t("library.config.agent.section.tools.tab.mcp")
			}]
		}
	], [t]);
	const failedSaveKeyRef = (0, import_react.useRef)(null);
	const wasOpenRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const justOpened = open && !wasOpenRef.current;
		wasOpenRef.current = open;
		if (!open) {
			setCreateGroupDialogOpen(false);
			return;
		}
		if (!justOpened) return;
		form.reset(defaultValues);
		form.clearErrors();
		setActiveTab(initialTab ?? "basic");
		setEmojiPickerOpen(false);
		setCreateGroupDialogOpen(false);
		setModelLabels(modelLabelsForAssistant(resource));
		failedSaveKeyRef.current = null;
	}, [
		defaultValues,
		form,
		initialTab,
		open,
		resource
	]);
	const rootError = form.formState.errors.root?.message;
	const canPersist = Boolean(saveIntent) && values.name.trim().length > 0;
	const changeKey = canPersist ? JSON.stringify(values) : null;
	const persist = async () => {
		const pending = saveIntent;
		if (!pending) return;
		const attemptedKey = changeKey;
		form.clearErrors("root");
		failedSaveKeyRef.current = null;
		try {
			await updateAssistant(pending.payload);
		} catch (error) {
			logger$1.error("Failed to auto-save assistant edit dialog", error, { assistantId: resource.id });
			failedSaveKeyRef.current = attemptedKey;
			form.setError("root", { message: t("library.config.dialogs.edit.save_failed") });
		}
	};
	const flush = useDebouncedAutoSave({
		enabled: open,
		changeKey,
		onSave: persist
	});
	const handleOpenChange = (next) => {
		if (next || !canPersist) {
			onOpenChange(next);
			return;
		}
		if (failedSaveKeyRef.current === changeKey) {
			onOpenChange(false);
			return;
		}
		(async () => {
			await flush();
			if (failedSaveKeyRef.current === changeKey) return;
			onOpenChange(false);
		})();
	};
	const closeBeforeAction = useCloseBeforeAction(handleOpenChange);
	const handleCreateGroup = async (name) => {
		try {
			const group = await createGroup(name);
			form.setValue("groupId", group.id, {
				shouldDirty: true,
				shouldTouch: true
			});
		} catch (error) {
			logger$1.error("Failed to create assistant group from edit dialog", error instanceof Error ? error : new Error(String(error)), {
				assistantId: resource.id,
				name
			});
			throw error;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditDialogShell, {
		activeTab,
		form,
		groupPresentation: "inline",
		onActiveTabChange: setActiveTab,
		onOpenChange: handleOpenChange,
		open,
		rootError,
		setDialogContentElement,
		tabs,
		title: t("library.config.dialogs.edit.assistant_title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "basic",
				forceMount: true,
				hidden: activeTab !== "basic",
				className: "m-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantBasicFields, {
					form,
					modelFilter,
					portalContainer: dialogContentElement,
					modelLabels,
					setModelLabels,
					groups,
					groupsLoading: isGroupsLoading,
					groupsError,
					emojiPickerOpen,
					setEmojiPickerOpen,
					onCreateGroup: () => setCreateGroupDialogOpen(true),
					onSettingsNavigate: closeBeforeAction
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "prompt",
				forceMount: true,
				hidden: activeTab !== "prompt",
				className: "m-0 flex h-full min-h-0 flex-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantPromptField, {
					form,
					resource,
					modelName: modelLabels.modelId,
					portalContainer: dialogContentElement
				})
			}),
			isAssistantToolTab(activeTab) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: activeTab,
				forceMount: true,
				className: "m-0",
				children: activeTab === "tools.mcp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantToolsFields, {
					form,
					portalContainer: dialogContentElement
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeBaseField, {
						form,
						portalContainer: dialogContentElement
					})
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "advanced",
				forceMount: true,
				hidden: activeTab !== "advanced",
				className: "m-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantAdvancedFields, {
					form,
					portalContainer: dialogContentElement,
					modelLabels,
					setModelLabels
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateGroupDialog, {
				open: createGroupDialogOpen,
				onCreate: handleCreateGroup,
				onOpenChange: setCreateGroupDialogOpen
			})
		] })
	});
}
function AssistantBasicFields({ form, modelFilter, portalContainer, modelLabels, setModelLabels, groups, groupsLoading, groupsError, emojiPickerOpen, setEmojiPickerOpen, onCreateGroup, onSettingsNavigate }) {
	const { t } = useTranslation();
	const handleAssistantModelChange = (modelId, model) => {
		const patch = { modelId };
		const nameLower = model?.name.toLowerCase() ?? "";
		if (nameLower.includes("kimi-k2")) patch.temperature = .6;
		else if (nameLower.includes("moonshot")) patch.temperature = .3;
		setFormValues(form, patch);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.assistant-basic-fields",
		className: "divide-y divide-border-subtle border-border-subtle border-b [&>*:first-child]:pt-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarField, {
				form,
				emojiPickerOpen,
				setEmojiPickerOpen,
				fallback: "💬",
				portalContainer,
				size: "sm",
				layout: "row"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInputField, {
				form,
				name: "name",
				label: t("common.name"),
				placeholder: t("library.config.basic.field.name.placeholder"),
				required: true,
				layout: "row"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInputField, {
				form,
				name: "description",
				label: t("common.description"),
				placeholder: t("library.config.basic.field.description.placeholder"),
				layout: "row"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
				form,
				name: "modelId",
				label: t("common.model"),
				allowClear: true,
				filter: modelFilter,
				portalContainer,
				modelLabels,
				setModelLabels,
				onModelChange: handleAssistantModelChange,
				onSettingsNavigate,
				layout: "row",
				triggerClassName: "h-9 rounded-md border border-input bg-transparent px-3 hover:bg-accent/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "groupId",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: editDialogFormRowClassName,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
							className: editDialogFormRowLabelClassName,
							children: t("library.config.basic.group")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupSelector, {
							value: field.value,
							onChange: field.onChange,
							groups,
							isLoading: groupsLoading,
							error: groupsError,
							portalContainer,
							onCreateGroup,
							triggerClassName: "h-9 rounded-md border border-input bg-transparent px-3 shadow-none hover:bg-accent/50 focus-visible:ring-1 focus-visible:ring-ring/40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { className: "col-start-2" })
					]
				})
			})
		]
	});
}
function AssistantPromptField({ form, resource, modelName, portalContainer }) {
	const { t } = useTranslation();
	const [resetPreviewKey, setResetPreviewKey] = (0, import_react.useState)(0);
	const prompt = form.watch("prompt");
	const name = form.watch("name");
	const processedPrompt = usePromptProcessor({
		prompt,
		modelName: modelName ?? resource.modelName ?? void 0
	});
	const handlePromptChange = (nextPrompt) => {
		form.setValue("prompt", nextPrompt, {
			shouldDirty: true,
			shouldTouch: true
		});
	};
	const handlePromptActionChange = (nextPrompt) => {
		handlePromptChange(nextPrompt);
		setResetPreviewKey((key) => key + 1);
	};
	const promptActions = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptPolishActions, {
		value: prompt,
		fallbackSource: name,
		emptyValueSystemPrompt: AGENT_PROMPT,
		existingValueSystemPrompt: RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT,
		onChange: handlePromptActionChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		control: form.control,
		name: "prompt",
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptEditorField_default, {
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
				label: t("library.config.prompt.label"),
				helpTrigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptVariablesPopover, { portalContainer }),
				formLabel: false
			}),
			value: field.value,
			onChange: handlePromptChange,
			placeholder: t("library.config.prompt.placeholder"),
			previewValue: processedPrompt || prompt,
			resetPreviewKey,
			actions: promptActions,
			fill: true,
			minHeight: EDIT_DIALOG_PROMPT_MIN_HEIGHT,
			maxHeight: EDIT_DIALOG_PROMPT_MAX_HEIGHT
		})
	});
}
function AssistantToolsFields({ form, portalContainer }) {
	const { t } = useTranslation();
	const mcpMode = form.watch("mcpMode");
	const mcpServerIds = form.watch("mcpServerIds");
	const mcpModeLabel = t("library.config.basic.mcp_mode");
	const enabledIds = (0, import_react.useMemo)(() => new Set(mcpServerIds), [mcpServerIds]);
	const toggleMcpServer = (id, enabled) => form.setValue("mcpServerIds", enabled ? Array.from(new Set([...mcpServerIds, id])) : mcpServerIds.filter((serverId) => serverId !== id), { shouldDirty: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.assistant-tools-fields",
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "mcpMode",
			render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
					className: "font-normal text-[13px]",
					children: mcpModeLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
					size: "sm",
					className: "shrink-0",
					"aria-label": mcpModeLabel,
					value: mcpMode,
					onValueChange: (value) => form.setValue("mcpMode", value, { shouldDirty: true }),
					options: MCP_MODE_OPTIONS.map((mode) => ({
						value: mode.id,
						label: t(mode.labelKey)
					}))
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})] })
		}), mcpMode === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "mcpServerIds",
			render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpServerCatalogGrid, {
				title: t("library.config.tools.added"),
				enabledIds,
				onToggle: toggleMcpServer,
				emptyLabel: t("library.config.tools.empty_title"),
				portalContainer
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})] })
		}) : null]
	});
}
function AssistantAdvancedFields({ form, portalContainer, modelLabels, setModelLabels }) {
	const { t } = useTranslation();
	const values = form.watch();
	const [globalCompressEnabled] = usePreference("chat.context_settings.compress.enabled");
	const [globalTruncateThreshold] = usePreference("chat.context_settings.truncate_threshold");
	const [globalCompressModelId] = usePreference("chat.context_settings.compress.model_id");
	const temperatureMarks = [
		{
			value: 0,
			label: t("library.config.basic.precise")
		},
		{
			value: 1,
			label: "1"
		},
		{
			value: 2,
			label: t("library.config.basic.creative")
		}
	];
	const topPMarks = [
		{
			value: 0,
			label: "0"
		},
		{
			value: .5,
			label: "0.5"
		},
		{
			value: 1,
			label: "1"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.assistant-advanced-fields",
		className: "divide-y divide-border-subtle [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*]:py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleFieldGroup, {
				label: t("library.config.basic.temperature"),
				valueLabel: values.enableTemperature ? values.temperature.toFixed(1) : t("library.config.basic.default_value"),
				description: t("library.config.basic.field.temperature.hint"),
				enabled: values.enableTemperature,
				onEnabledChange: (checked) => form.setValue("enableTemperature", checked, { shouldDirty: true }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "temperature",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mb-2 mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 2,
							step: .1,
							value: [field.value],
							marks: temperatureMarks,
							onValueChange: ([value]) => field.onChange(value),
							className: "w-full"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleFieldGroup, {
				label: t("library.config.basic.top_p"),
				valueLabel: values.enableTopP ? values.topP.toFixed(2) : t("library.config.basic.default_value"),
				description: t("library.config.basic.field.top_p.hint"),
				enabled: values.enableTopP,
				onEnabledChange: (checked) => form.setValue("enableTopP", checked, { shouldDirty: true }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "topP",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mb-2 mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 1,
							step: .05,
							value: [field.value],
							marks: topPMarks,
							onValueChange: ([value]) => field.onChange(value),
							className: "w-full"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleFieldGroup, {
				label: t("library.config.basic.max_tokens"),
				valueLabel: values.enableMaxTokens ? void 0 : t("library.config.basic.default_value"),
				description: t("library.config.basic.field.max_tokens.hint"),
				enabled: values.enableMaxTokens,
				onEnabledChange: (checked) => form.setValue("enableMaxTokens", checked, { shouldDirty: true }),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "maxTokens",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
						block: true,
						min: 1,
						step: 1,
						precision: 0,
						align: "start",
						changeOnBlur: true,
						className: "h-8 rounded-lg border-border bg-transparent px-2.5 shadow-none focus-visible:border-primary",
						value: field.value,
						onChange: (value) => field.onChange(typeof value === "number" && value > 0 ? value : UI_DEFAULT_MAX_TOKENS)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "streamOutput",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
							label: t("library.config.basic.stream_output"),
							help: t("library.config.basic.field.stream_output.hint")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						size: "sm",
						checked: field.value,
						onCheckedChange: field.onChange,
						"aria-label": t("library.config.basic.stream_output")
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleFieldGroup, {
				label: t("library.config.basic.max_tool_calls"),
				valueLabel: values.enableMaxToolCalls ? void 0 : t("library.config.basic.max_tool_calls_default", { count: DEFAULT_ASSISTANT_SETTINGS.maxToolCalls }),
				description: t("library.config.basic.field.max_tool_calls.hint"),
				enabled: values.enableMaxToolCalls,
				onEnabledChange: (checked) => form.setValue("enableMaxToolCalls", checked, { shouldDirty: true }),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "maxToolCalls",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
						block: true,
						min: 1,
						max: UI_MAX_TOOL_CALLS,
						step: 1,
						precision: 0,
						align: "start",
						changeOnBlur: true,
						className: "h-8 rounded-lg border-border bg-transparent px-2.5 shadow-none focus-visible:border-primary",
						value: field.value,
						onChange: (value) => field.onChange(typeof value === "number" && value > 0 ? value : DEFAULT_ASSISTANT_SETTINGS.maxToolCalls)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextManagementFields, {
				form,
				portalContainer,
				modelLabels,
				setModelLabels,
				globalDefaults: {
					compressEnabled: globalCompressEnabled,
					truncateThreshold: globalTruncateThreshold,
					compressModelId: globalCompressModelId || null
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "customParameters",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomParametersField, {
					value: field.value,
					onChange: (customParameters) => field.onChange(customParameters),
					portalContainer
				})
			})
		]
	});
}
function ContextManagementFields({ form, portalContainer, modelLabels, setModelLabels, globalDefaults }) {
	const { t } = useTranslation();
	const values = form.watch();
	const hadStoredOverride = (0, import_react.useRef)(values.contextOverrideEnabled);
	const onOverrideToggle = (checked) => {
		if (checked && !hadStoredOverride.current) {
			form.setValue("contextCompressEnabled", globalDefaults.compressEnabled, { shouldDirty: true });
			form.setValue("contextTruncateThreshold", globalDefaults.truncateThreshold, { shouldDirty: true });
			form.setValue("contextCompressModelId", globalDefaults.compressModelId, { shouldDirty: true });
		}
		form.setValue("contextOverrideEnabled", checked, { shouldDirty: true });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleFieldGroup, {
		label: t("library.config.basic.context_management"),
		description: t("library.config.basic.field.context_management.hint"),
		enabled: values.contextOverrideEnabled,
		onEnabledChange: onOverrideToggle
	}), values.contextOverrideEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.context-management-fields",
		className: "grid gap-4 border-border/60 border-l pl-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "contextCompressEnabled",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
							label: t("library.config.basic.context_compress_enabled"),
							help: t("library.config.basic.field.context_compress_enabled.hint")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						size: "sm",
						checked: field.value,
						onCheckedChange: field.onChange,
						"aria-label": t("library.config.basic.context_compress_enabled")
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "contextTruncateThreshold",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
						label: t("library.config.basic.context_truncate_threshold"),
						help: t("library.config.basic.field.context_truncate_threshold.hint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
						block: true,
						min: 1,
						step: 1e3,
						precision: 0,
						align: "start",
						changeOnBlur: true,
						className: "h-8 rounded-lg border-border bg-transparent px-2.5 shadow-none focus-visible:border-primary",
						value: field.value,
						onChange: (value) => field.onChange(typeof value === "number" && value > 0 ? value : globalDefaults.truncateThreshold)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
				form,
				name: "contextCompressModelId",
				label: t("library.config.basic.context_compress_model"),
				allowClear: true,
				emptyLabel: t("library.config.basic.context_compress_model_follow"),
				filter: (model) => !isNonChatModel(model),
				portalContainer,
				modelLabels,
				setModelLabels,
				onModelChange: (modelId) => form.setValue("contextCompressModelId", modelId, { shouldDirty: true })
			})
		]
	}) : null] });
}
function ToggleFieldGroup({ label, valueLabel, description, enabled, onEnabledChange, control, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.toggle-field-group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
					label,
					help: description,
					formLabel: false
				}), valueLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-xs",
					children: valueLabel
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-3",
				children: [enabled && control ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-36",
					children: control
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					size: "sm",
					checked: enabled,
					onCheckedChange: onEnabledChange,
					"aria-label": label
				})]
			})]
		}), enabled && children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		}) : null]
	});
}
function CustomParametersField({ value, onChange, portalContainer }) {
	const { t } = useTranslation();
	const add = () => onChange([...value, {
		name: "",
		type: "string",
		value: ""
	}]);
	const remove = (index) => onChange(value.filter((_, i) => i !== index));
	const updateField = (index, patch) => {
		const next = [...value];
		if (patch.type && patch.type !== next[index].type) next[index] = {
			name: next[index].name,
			type: patch.type,
			value: defaultValueForType(patch.type)
		};
		else next[index] = {
			...next[index],
			...patch
		};
		onChange(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
					label: t("library.config.basic.custom_params"),
					help: t("library.config.basic.field.custom_params.hint")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "secondary",
				size: "sm",
				onClick: add,
				className: "h-7 gap-1 px-2.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 11 }), t("library.config.basic.custom_params_add")]
			})]
		}),
		value.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 space-y-2",
			children: value.map((param, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomParameterRow, {
				param,
				portalContainer,
				onNameChange: (name) => updateField(index, { name }),
				onTypeChange: (type) => updateField(index, { type }),
				onValueChange: (nextValue) => updateField(index, { value: nextValue }),
				onDelete: () => remove(index)
			}, index))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
	] });
}
function defaultValueForType(type) {
	switch (type) {
		case "number": return 0;
		case "boolean": return false;
		case "json": return "";
		default: return "";
	}
}
function CustomParameterRow({ param, portalContainer, onNameChange, onTypeChange, onValueChange, onDelete }) {
	const { t } = useTranslation();
	const jsonString = param.type === "json" ? typeof param.value === "string" ? param.value : JSON.stringify(param.value ?? "", null, 2) : "";
	const jsonInvalid = (() => {
		if (param.type !== "json") return false;
		if (!jsonString.trim()) return false;
		try {
			JSON.parse(jsonString);
			return false;
		} catch {
			return true;
		}
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.custom-parameter-row",
		className: "rounded-xs border border-border-subtle bg-accent/15 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-stretch gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: t("library.config.basic.custom_params_name"),
					value: param.name,
					onChange: (event) => onNameChange(event.target.value),
					className: "flex-1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: param.type,
					onValueChange: (value) => onTypeChange(value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						size: "sm",
						className: "w-[100px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						portalContainer,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "string",
								children: "string"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "number",
								children: "number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "boolean",
								children: "boolean"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "json",
								children: "json"
							})
						]
					})]
				}),
				param.type !== "json" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [
						param.type === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: String(param.value),
							onChange: (event) => {
								const parsed = parseFloat(event.target.value);
								onValueChange(Number.isFinite(parsed) ? parsed : 0);
							}
						}) : null,
						param.type === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: String(param.value),
							onValueChange: (value) => onValueChange(value === "true"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								portalContainer,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "true",
									children: "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "false",
									children: "false"
								})]
							})]
						}) : null,
						param.type === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: String(param.value),
							onChange: (event) => onValueChange(event.target.value)
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "destructive",
					size: "icon",
					"aria-label": t("common.delete"),
					onClick: onDelete,
					className: "h-8 w-8 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
				})
			]
		}), param.type === "json" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				value: jsonString,
				onValueChange,
				rows: 4,
				spellCheck: false,
				placeholder: "{\"key\": \"value\"}",
				hasError: jsonInvalid
			}), jsonInvalid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-error text-xs",
				children: t("library.config.basic.json_invalid")
			}) : null]
		}) : null]
	});
}
var logger = loggerService.withContext("ResourceEditDialogHost");
function ResourceEditDialogHost({ target, onOpenChange }) {
	const [open, setOpen] = (0, import_react.useState)(target !== null);
	const closeTimerRef = (0, import_react.useRef)(null);
	const clearCloseTimer = (0, import_react.useCallback)(() => {
		if (closeTimerRef.current === null) return;
		clearTimeout(closeTimerRef.current);
		closeTimerRef.current = null;
	}, []);
	(0, import_react.useEffect)(() => {
		clearCloseTimer();
		setOpen(target !== null);
	}, [clearCloseTimer, target]);
	(0, import_react.useEffect)(() => clearCloseTimer, [clearCloseTimer]);
	const handleOpenChange = (0, import_react.useCallback)((nextOpen) => {
		clearCloseTimer();
		setOpen(nextOpen);
		if (nextOpen) {
			onOpenChange(true);
			return;
		}
		closeTimerRef.current = setTimeout(() => {
			closeTimerRef.current = null;
			onOpenChange(false);
		}, 200);
	}, [clearCloseTimer, onOpenChange]);
	if (target?.kind === "assistant") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantEditDialogHost, {
		target,
		open,
		onOpenChange: handleOpenChange
	});
	if (target?.kind === "agent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentEditDialogHost, {
		target,
		open,
		onOpenChange: handleOpenChange
	});
	return null;
}
function AssistantEditDialogHost({ target, open, onOpenChange }) {
	const { t } = useTranslation();
	const { assistant, error } = useAssistantApiById(target.id);
	(0, import_react.useEffect)(() => {
		if (!error) return;
		logger.error("Failed to load assistant for edit dialog", error, { id: target.id });
		toast.error(t("common.error"));
	}, [
		error,
		t,
		target.id
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantEditDialog, {
		open,
		resource: assistant ?? null,
		onOpenChange,
		modelFilter: (candidate) => !isNonChatModel(candidate),
		initialTab: target.initialTab
	});
}
function AgentEditDialogHost({ target, open, onOpenChange }) {
	const { t } = useTranslation();
	const { agent, error } = useAgent(target.id);
	const modelFilter = useAgentModelFilter(agent?.type);
	(0, import_react.useEffect)(() => {
		if (!error) return;
		logger.error("Failed to load agent for edit dialog", error, { id: target.id });
		toast.error(t("common.error"));
	}, [
		error,
		t,
		target.id
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentEditDialog, {
		open,
		resource: agent ?? null,
		onOpenChange,
		modelFilter,
		initialTab: target.initialTab
	});
}
export { ResourceEditDialogHost as t };
