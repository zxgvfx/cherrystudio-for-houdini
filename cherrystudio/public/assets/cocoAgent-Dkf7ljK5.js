import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
var logger = loggerService.withContext("createAgent");
async function createAgentAndRefresh(input, refreshAgents) {
	const agent = await ipcApi.request("ai.agent.create", input);
	try {
		await refreshAgents();
	} catch (error) {
		logger.warn("Failed to refresh agents cache after IPC creation", {
			agentId: agent.id,
			error
		});
	}
	return agent;
}
const COCO_AGENT_MODES = [
	"agent",
	"plan",
	"ask",
	"debug",
	"multitask"
];
const COCO_AGENT_PERMISSIONS = [
	"ask",
	"auto",
	"read_only"
];
const DEFAULT_COCO_MODE = "agent";
const DEFAULT_COCO_PERMISSION = "ask";
function isCocoAgentMode(value) {
	return typeof value === "string" && COCO_AGENT_MODES.includes(value);
}
function isCocoAgentPermission(value) {
	return typeof value === "string" && COCO_AGENT_PERMISSIONS.includes(value);
}
function readCocoMode(configuration) {
	if (!configuration || typeof configuration !== "object") return DEFAULT_COCO_MODE;
	const value = configuration.coco_mode;
	return isCocoAgentMode(value) ? value : DEFAULT_COCO_MODE;
}
function readCocoPermission(configuration) {
	if (!configuration || typeof configuration !== "object") return "ask";
	const value = configuration.coco_permission;
	return isCocoAgentPermission(value) ? value : "ask";
}
const COCO_MODE_CARDS = [
	{
		value: "agent",
		labelKey: "library.config.agent.field.coco_mode.option.agent",
		labelFallback: "Agent",
		descriptionKey: "library.config.agent.field.coco_mode.option.agent_description",
		descriptionFallback: "Build and edit the session canvas with Pipeline Script."
	},
	{
		value: "plan",
		labelKey: "library.config.agent.field.coco_mode.option.plan",
		labelFallback: "Plan",
		descriptionKey: "library.config.agent.field.coco_mode.option.plan_description",
		descriptionFallback: "Plan the graph without submitting a run."
	},
	{
		value: "ask",
		labelKey: "library.config.agent.field.coco_mode.option.ask",
		labelFallback: "Ask",
		descriptionKey: "library.config.agent.field.coco_mode.option.ask_description",
		descriptionFallback: "Read-only questions about the current canvas."
	},
	{
		value: "debug",
		labelKey: "library.config.agent.field.coco_mode.option.debug",
		labelFallback: "Debug",
		descriptionKey: "library.config.agent.field.coco_mode.option.debug_description",
		descriptionFallback: "Inspect diagnostics and failed nodes."
	},
	{
		value: "multitask",
		labelKey: "library.config.agent.field.coco_mode.option.multitask",
		labelFallback: "Multitask",
		descriptionKey: "library.config.agent.field.coco_mode.option.multitask_description",
		descriptionFallback: "Coordinate several canvas tasks in one session."
	}
];
const COCO_PERMISSION_CARDS = [
	{
		value: "ask",
		labelKey: "library.config.agent.field.coco_permission.option.ask",
		labelFallback: "Ask",
		descriptionKey: "library.config.agent.field.coco_permission.option.ask_description",
		descriptionFallback: "Show a script diff and wait before applying it to this session canvas."
	},
	{
		value: "auto",
		labelKey: "library.config.agent.field.coco_permission.option.auto",
		labelFallback: "Auto",
		descriptionKey: "library.config.agent.field.coco_permission.option.auto_description",
		descriptionFallback: "Apply a valid Pipeline Script proposal to this session canvas immediately."
	},
	{
		value: "read_only",
		labelKey: "library.config.agent.field.coco_permission.option.read_only",
		labelFallback: "Read only",
		descriptionKey: "library.config.agent.field.coco_permission.option.read_only_description",
		descriptionFallback: "Inspect the canvas; do not propose or submit writes."
	}
];
export { readCocoMode as a, DEFAULT_COCO_PERMISSION as i, COCO_PERMISSION_CARDS as n, readCocoPermission as o, DEFAULT_COCO_MODE as r, createAgentAndRefresh as s, COCO_MODE_CARDS as t };
