import { _ as ENDPOINT_TYPE, o as parseUniqueModelId } from "./model-BOGgSmTN.js";
import { t as SystemProviderIds } from "./systemProviderId-B4QvwwvR.js";
import { J as isManagedCherryAiDefaultModel, M as isGatewayRoutableModel, f as isLoginBasedProvider } from "./provider-bQl8RVRp.js";
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
	CherryToMarkdown: {
		name: "mcp__cherry-tools__to_markdown",
		category: "file",
		exposure: "user",
		description: "Markdown is easier for the agent to read",
		mcpServer: "cherry-tools"
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
	"mcp__cherry-tools__to_markdown": "File to Markdown",
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
const PI_BUILTIN_TOOLS = [
	{
		name: "read",
		category: "file",
		approval: "auto",
		permissionClass: "read"
	},
	{
		name: "grep",
		category: "search",
		approval: "auto",
		permissionClass: "read"
	},
	{
		name: "find",
		category: "search",
		approval: "auto",
		permissionClass: "read"
	},
	{
		name: "ls",
		category: "search",
		approval: "auto",
		permissionClass: "read"
	},
	{
		name: "bash",
		category: "shell",
		approval: "prompt",
		permissionClass: "shell"
	},
	{
		name: "edit",
		category: "file",
		approval: "prompt",
		permissionClass: "edit"
	},
	{
		name: "write",
		category: "file",
		approval: "prompt",
		permissionClass: "edit"
	}
];
var isOpenAILLM = (modelId) => {
	const id = modelId.toLowerCase();
	return /\bgpt\b|^o[134]/.test(id) && !id.includes("gpt-4o-image");
};
var isOpenAIChatCompletionOnly = (modelId) => {
	const id = modelId.toLowerCase();
	return id.includes("gpt-4o-search-preview") || id.includes("gpt-4o-mini-search-preview") || id.includes("o1-mini") || id.includes("o1-preview");
};
function resolveAihubmixChatFamily(modelId) {
	if (modelId.startsWith("claude")) return "anthropic";
	if ((modelId.startsWith("gemini") || modelId.startsWith("imagen")) && !modelId.endsWith("no-think") && !modelId.endsWith("-search") && !modelId.includes("embedding")) return "gemini";
	if (isOpenAILLM(modelId)) return isOpenAIChatCompletionOnly(modelId) ? "openai-chat" : "openai-responses";
	return "compat";
}
var AIHUBMIX_ENDPOINT = {
	anthropic: ENDPOINT_TYPE.ANTHROPIC_MESSAGES,
	gemini: ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT,
	"openai-responses": ENDPOINT_TYPE.OPENAI_RESPONSES,
	"openai-chat": ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS,
	compat: ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS
};
var AIHUBMIX_OPTIONS_KEY = {
	anthropic: "anthropic",
	gemini: "google",
	"openai-responses": "openai",
	"openai-chat": "openai",
	compat: "aihubmix"
};
var DMXAPI_FAMILIES = [
	{
		family: "anthropic",
		match: (id) => /claude/i.test(id)
	},
	{
		family: "gemini",
		match: (id) => /^gemini-/i.test(id) && !/(image|imagen|tts|audio|embedding)/i.test(id)
	},
	{
		family: "openai",
		match: (id) => /^(gpt-|o\d)/i.test(id) && !/(image|dall-e)/i.test(id)
	}
];
function resolveDmxapiChatFamily(modelId) {
	return DMXAPI_FAMILIES.find((entry) => entry.match(modelId))?.family ?? "openai-compat";
}
var DMXAPI_ENDPOINT = {
	anthropic: ENDPOINT_TYPE.ANTHROPIC_MESSAGES,
	gemini: ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT,
	openai: ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS,
	"openai-compat": ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS
};
var DMXAPI_OPTIONS_KEY = {
	anthropic: "anthropic",
	gemini: "google",
	openai: "openai",
	"openai-compat": "dmxapi"
};
function resolveAihubmixChatRoute(modelId) {
	const family = resolveAihubmixChatFamily(modelId);
	return {
		endpointType: AIHUBMIX_ENDPOINT[family],
		providerOptionsKey: AIHUBMIX_OPTIONS_KEY[family]
	};
}
function resolveDmxapiChatRoute(modelId) {
	const family = resolveDmxapiChatFamily(modelId);
	return {
		endpointType: DMXAPI_ENDPOINT[family],
		providerOptionsKey: DMXAPI_OPTIONS_KEY[family]
	};
}
var GATEWAY_MODEL_ROUTERS = {
	[SystemProviderIds.aihubmix]: resolveAihubmixChatRoute,
	[SystemProviderIds.dmxapi]: resolveDmxapiChatRoute
};
function resolveGatewayChatRoute(provider, model) {
	const route = (GATEWAY_MODEL_ROUTERS[provider.id] ?? (provider.presetProviderId ? GATEWAY_MODEL_ROUTERS[provider.presetProviderId] : void 0))?.(model.apiModelId ?? model.id);
	return route && provider.endpointConfigs?.[route.endpointType] ? route : void 0;
}
const OPENAI_CODEX_PROVIDER_ID = "openai-codex";
function isCodexProviderId(providerId) {
	return providerId === OPENAI_CODEX_PROVIDER_ID;
}
const GROK_CLI_PROVIDER_ID = "grok-cli";
function isGrokCliProviderId(providerId) {
	return providerId === GROK_CLI_PROVIDER_ID;
}
const RUNTIME_TRANSPORT_ADAPTER_PROVIDER_IDS = [GROK_CLI_PROVIDER_ID, OPENAI_CODEX_PROVIDER_ID];
function hasRuntimeTransportAdapter(providerId) {
	return RUNTIME_TRANSPORT_ADAPTER_PROVIDER_IDS.includes(providerId);
}
function mapEndpointToPiApi(endpointType, adapterFamily) {
	if (adapterFamily === "azure-responses") return "azure-openai-responses";
	if (adapterFamily === "azure") return void 0;
	if (adapterFamily === "bedrock" || adapterFamily === "google-vertex" || adapterFamily === "google-vertex-anthropic") return;
	switch (endpointType) {
		case ENDPOINT_TYPE.ANTHROPIC_MESSAGES: return "anthropic-messages";
		case ENDPOINT_TYPE.OPENAI_RESPONSES: return "openai-responses";
		case ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS: return "openai-completions";
		case ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT: return "google-generative-ai";
		default: return;
	}
}
function resolveEndpointType(provider, model) {
	return model.endpointTypes?.[0] ?? resolveGatewayChatRoute(provider, model)?.endpointType ?? provider.defaultChatEndpoint;
}
function resolvePiApi(provider, model) {
	if (isLoginBasedProvider(provider) && !hasRuntimeTransportAdapter(provider.id)) return void 0;
	const endpointType = resolveEndpointType(provider, model);
	return mapEndpointToPiApi(endpointType, endpointType ? provider.endpointConfigs?.[endpointType]?.adapterFamily : void 0);
}
function hasKnownPiContextWindow(model) {
	return typeof model.contextWindow === "number" && Number.isFinite(model.contextWindow) && model.contextWindow > 0;
}
function isPiCompatibleModel(provider, model) {
	return resolvePiApi(provider, model) !== void 0 && hasKnownPiContextWindow(model);
}
var ALL_PERMISSION_MODES = [
	"default",
	"plan",
	"acceptEdits",
	"auto",
	"bypassPermissions"
];
var CLAUDE_CODE_BUILTIN_COMMANDS = [
	{
		command: "/clear",
		description: "Start a new conversation with empty context"
	},
	{
		command: "/compact",
		description: "Free up context by summarizing the conversation so far"
	},
	{
		command: "/context",
		description: "Visualize current context usage as a colored grid"
	},
	{
		command: "/usage",
		description: "Show session cost, plan usage limits, and activity stats"
	}
];
var PI_BUILTIN_COMMANDS = [{
	command: "/compact",
	description: "Compact conversation with optional focus instructions"
}];
const AGENT_RUNTIME_CAPABILITIES = {
	"claude-code": {
		labelKey: "library.config.agent.field.runtime.option.claude_code",
		labelFallback: "Advanced: Claude Agent",
		permissionModes: ALL_PERMISSION_MODES,
		modelTiers: true,
		heartbeat: true,
		knowledgeBases: true,
		mcp: true,
		skills: true,
		claudeRegistryTools: true,
		slashCommands: CLAUDE_CODE_BUILTIN_COMMANDS,
		createDefaults: { permissionMode: "default" },
		isModelCompatible: (_provider, model) => isGatewayRoutableModel(model),
		transport: "claude-agent",
		builtinTools: () => claudeUserFacingTools().map((tool) => ({
			id: tool.name,
			labelKey: `agent.tools.builtin.${tool.key}.label`,
			descriptionKey: `agent.tools.builtin.${tool.key}.description`,
			labelFallback: tool.label,
			descriptionFallback: tool.description,
			category: tool.category
		}))
	},
	pi: {
		labelKey: "library.config.agent.field.runtime.option.pi",
		labelFallback: "Fast: Pi",
		permissionModes: ALL_PERMISSION_MODES.filter((mode) => mode !== "plan" && mode !== "auto"),
		modelTiers: false,
		heartbeat: true,
		knowledgeBases: true,
		mcp: true,
		skills: true,
		claudeRegistryTools: false,
		slashCommands: PI_BUILTIN_COMMANDS,
		createDefaults: { permissionMode: "acceptEdits" },
		isModelCompatible: (provider, model) => !!provider && isPiCompatibleModel(provider, model) && !isManagedCherryAiDefaultModel(model.providerId, model.apiModelId ?? parseUniqueModelId(model.id).modelId),
		transport: "pi-agent",
		builtinTools: () => PI_BUILTIN_TOOLS.map((tool) => ({
			id: tool.name,
			labelKey: `agent.tools.builtin.${tool.name}.label`,
			descriptionKey: `agent.tools.builtin.${tool.name}.description`,
			category: tool.category
		}))
	},
	coco: {
		labelKey: "library.config.agent.field.runtime.option.coco",
		labelFallback: "COCO Agent",
		permissionModes: ["default"],
		modelTiers: false,
		heartbeat: false,
		knowledgeBases: true,
		mcp: true,
		skills: true,
		claudeRegistryTools: false,
		slashCommands: [],
		createDefaults: { permissionMode: "default" },
		isModelCompatible: (_provider, model) => isGatewayRoutableModel(model),
		transport: "coco-pipeline",
		builtinTools: () => []
	}
};
export { CLAUDE_TOOL_CATEGORIES as a, CLAUDE_KNOWLEDGE_TOOL_NAMES as i, isGrokCliProviderId as n, isCodexProviderId as r, AGENT_RUNTIME_CAPABILITIES as t };
