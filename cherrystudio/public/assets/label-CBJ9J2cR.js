import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as BuiltinMcpServerNames } from "./mcp-UjkdK7II.js";
var logger = loggerService.withContext("i18n:label");
var getLabelKey = (keyMap, key, fallback) => {
	const labelKey = keyMap[key];
	if (labelKey) return labelKey;
	else {
		logger.error(`Missing key ${key}`);
		return fallback ?? key;
	}
};
var providerKeyMap = {
	"302ai": "provider.302ai",
	aihubmix: "provider.aihubmix",
	alayanew: "provider.alayanew",
	anthropic: "provider.anthropic",
	"aws-bedrock": "provider.aws-bedrock",
	"azure-openai": "provider.azure-openai",
	baichuan: "provider.baichuan",
	"baidu-cloud": "provider.baidu-cloud",
	burncloud: "provider.burncloud",
	cherryai: "provider.cherryai",
	cherryin: "provider.cherryin",
	"claude-code": "provider.claude-code",
	copilot: "provider.copilot",
	dashscope: "provider.dashscope",
	deepseek: "provider.deepseek",
	dmxapi: "provider.dmxapi",
	doubao: "provider.doubao",
	fireworks: "provider.fireworks",
	gemini: "provider.gemini",
	"gitee-ai": "provider.gitee-ai",
	github: "provider.github",
	gpustack: "provider.gpustack",
	grok: "provider.grok",
	"grok-cli": "provider.grok-cli",
	groq: "provider.groq",
	hunyuan: "provider.hunyuan",
	hyperbolic: "provider.hyperbolic",
	infini: "provider.infini",
	jina: "provider.jina",
	lanyun: "provider.lanyun",
	lmstudio: "provider.lmstudio",
	minimax: "provider.minimax",
	mistral: "provider.mistral",
	modelscope: "provider.modelscope",
	moonshot: "provider.moonshot",
	"new-api": "provider.new-api",
	nvidia: "provider.nvidia",
	o3: "provider.o3",
	ocoolai: "provider.ocoolai",
	ovms: "provider.ovms",
	ollama: "provider.ollama",
	openai: "provider.openai",
	"openai-codex": "provider.openai-codex",
	openrouter: "provider.openrouter",
	perplexity: "provider.perplexity",
	ph8: "provider.ph8",
	ppio: "provider.ppio",
	qiniu: "provider.qiniu",
	qwenlm: "provider.qwenlm",
	"radeon-cloud": "provider.radeon-cloud",
	silicon: "provider.silicon",
	stepfun: "provider.stepfun",
	"tencent-cloud-ti": "provider.tencent-cloud-ti",
	together: "provider.together",
	tokenhub: "provider.tokenhub",
	vertexai: "provider.vertexai",
	voyageai: "provider.voyageai",
	xirang: "provider.xirang",
	yi: "provider.yi",
	zhinao: "provider.zhinao",
	zhipu: "provider.zhipu",
	poe: "provider.poe",
	aionly: "provider.aionly",
	longcat: "provider.longcat",
	huggingface: "provider.huggingface",
	sophnet: "provider.sophnet",
	gateway: "provider.ai-gateway",
	cerebras: "provider.cerebras",
	mimo: "provider.mimo",
	"minimax-global": "provider.minimax-global",
	zai: "provider.zai",
	"local-embedding": "provider.local-embedding",
	opencode: "provider.opencode"
};
const getProviderLabelKey = (id) => {
	return getLabelKey(providerKeyMap, id);
};
var fileProcessorKeyMap = {
	doc2x: "provider.doc2x",
	mineru: "provider.mineru",
	ovocr: "provider.ovocr",
	paddleocr: "provider.paddleocr",
	system: "provider.system",
	tesseract: "provider.tesseract",
	mistral: "provider.mistral",
	"open-mineru": "provider.open-mineru"
};
const getFileProcessorLabelKey = (id) => {
	return getLabelKey(fileProcessorKeyMap, id);
};
var backupProgressKeyMap = {
	completed: "backup.progress.completed",
	compressing: "backup.progress.compressing",
	copying_database: "backup.progress.copying_database",
	copying_files: "backup.progress.copying_files",
	preparing: "backup.progress.preparing",
	preparing_compression: "backup.progress.preparing_compression",
	title: "backup.progress.title",
	writing_data: "backup.progress.writing_data"
};
const getBackupProgressLabelKey = (key) => {
	return getLabelKey(backupProgressKeyMap, key);
};
var restoreProgressKeyMap = {
	completed: "restore.progress.completed",
	copying_files: "restore.progress.copying_files",
	extracted: "restore.progress.extracted",
	extracting: "restore.progress.extracting",
	preparing: "restore.progress.preparing",
	reading_data: "restore.progress.reading_data",
	restoring_data: "restore.progress.restoring_data",
	restoring_database: "restore.progress.restoring_database",
	title: "restore.progress.title",
	validating: "restore.progress.validating"
};
const getRestoreProgressLabelKey = (key) => {
	return getLabelKey(restoreProgressKeyMap, key);
};
var sidebarIconKeyMap = {
	assistants: "title.chat",
	agents: "title.work",
	ai_pipeline: "title.ai_pipeline",
	paintings: "title.paintings",
	translate: "translate.title",
	mini_app: "miniApp.title",
	knowledge: "knowledge.title",
	files: "files.title",
	code_tools: "code.title",
	notes: "notes.title"
};
const getSidebarIconLabelKey = (key) => {
	return getLabelKey(sidebarIconKeyMap, key);
};
var selectionDescriptionKeyMap = {
	linux: "selection.settings.toolbar.trigger_mode.description_note.linux",
	mac: "selection.settings.toolbar.trigger_mode.description_note.mac",
	windows: "selection.settings.toolbar.trigger_mode.description_note.windows"
};
const getSelectionDescriptionLabelKey = (key) => {
	return getLabelKey(selectionDescriptionKeyMap, key);
};
var mcpTypeKeyMap = {
	inMemory: "settings.mcp.types.inMemory",
	sse: "settings.mcp.types.sse",
	stdio: "settings.mcp.types.stdio",
	streamableHttp: "settings.mcp.types.streamableHttp"
};
const getMcpTypeLabelKey = (key) => {
	return getLabelKey(mcpTypeKeyMap, key);
};
var httpMessageKeyMap = {
	"400": "error.http.400",
	"401": "error.http.401",
	"402": "error.http.402",
	"403": "error.http.403",
	"404": "error.http.404",
	"429": "error.http.429",
	"500": "error.http.500",
	"502": "error.http.502",
	"503": "error.http.503",
	"504": "error.http.504"
};
const getHttpMessageLabelKey = (key) => {
	return getLabelKey(httpMessageKeyMap, key);
};
var builtInMcpDescriptionKeyMap = {
	[BuiltinMcpServerNames.flomo]: "settings.mcp.builtinServersDescriptions.flomo",
	[BuiltinMcpServerNames.mcpAutoInstall]: "settings.mcp.builtinServersDescriptions.mcp_auto_install",
	[BuiltinMcpServerNames.memory]: "settings.mcp.builtinServersDescriptions.memory",
	[BuiltinMcpServerNames.sequentialThinking]: "settings.mcp.builtinServersDescriptions.sequentialthinking",
	[BuiltinMcpServerNames.braveSearch]: "settings.mcp.builtinServersDescriptions.brave_search",
	[BuiltinMcpServerNames.fetch]: "settings.mcp.builtinServersDescriptions.fetch",
	[BuiltinMcpServerNames.filesystem]: "settings.mcp.builtinServersDescriptions.filesystem",
	[BuiltinMcpServerNames.difyKnowledge]: "settings.mcp.builtinServersDescriptions.dify_knowledge",
	[BuiltinMcpServerNames.python]: "settings.mcp.builtinServersDescriptions.python",
	[BuiltinMcpServerNames.didiMcp]: "settings.mcp.builtinServersDescriptions.didi_mcp",
	[BuiltinMcpServerNames.browser]: "settings.mcp.builtinServersDescriptions.browser",
	[BuiltinMcpServerNames.nowledgeMem]: "settings.mcp.builtinServersDescriptions.nowledge_mem",
	[BuiltinMcpServerNames.hub]: "settings.mcp.builtinServersDescriptions.hub"
};
const getBuiltInMcpServerDescriptionLabelKey = (key) => {
	return getLabelKey(builtInMcpDescriptionKeyMap, key, "settings.mcp.builtinServersDescriptions.no");
};
export { getMcpTypeLabelKey as a, getSelectionDescriptionLabelKey as c, getHttpMessageLabelKey as i, getSidebarIconLabelKey as l, getBuiltInMcpServerDescriptionLabelKey as n, getProviderLabelKey as o, getFileProcessorLabelKey as r, getRestoreProgressLabelKey as s, getBackupProgressLabelKey as t };
