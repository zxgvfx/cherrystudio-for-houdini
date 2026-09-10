import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as NormalTooltip } from "./tooltip-a5SkzYdn.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-Cli1Z35D.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as AbsoluteFilePathSchema } from "./file-OKCzlHoD.js";
import { i as toSafeFileUrl, t as fileUrlToPath } from "./file-CkrjUGO_.js";
import { y as MODEL_CAPABILITY } from "./model-BOGgSmTN.js";
import { t as Boxes } from "./boxes-C247Db2w.js";
import { t as FileCode2 } from "./file-code-2-CItqs01v.js";
import { t as FileImage } from "./file-image-DCj_PnJj.js";
import { t as FileJson } from "./file-json-B_eqYVy7.js";
import { t as FileSpreadsheet } from "./file-spreadsheet-MOCUJr4i.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { t as FileType2 } from "./file-type-2-DvtTxk9j.js";
import { t as File } from "./file-Cp4G4u6m.js";
import { t as Folder } from "./folder-B15AlwXQ.js";
import { t as Link2 } from "./link-2-DhYTctKJ.js";
import { t as MessagesSquare } from "./messages-square-CUF7eErj.js";
import { t as Presentation } from "./presentation-K-NHJUUP.js";
import { t as TextQuote } from "./text-quote-CKcu8NdJ.js";
import { t as ToolCase } from "./tool-case-D8bAQ4Jh.js";
import { t as Workflow } from "./workflow-3FyQTBiU.js";
import { t as X } from "./x-CpgfqVTG.js";
import { i as useModels } from "./useModel-kU1hKaYa.js";
import { u as useProviders } from "./useProvider-DvntuFRN.js";
import { o as isGenerateImageModel, t as getRawModelId } from "./capabilities-DNV_QUgI.js";
import { r as createComposerSecureRandomId } from "./composerFileTokenSource-CsEu7TtB.js";
import { d as FILE_TYPE, n as formatFileSize, u as COMPOSER_FILE_KIND } from "./file-B-bjOfog.js";
import { r as formatQuotedText } from "./formats-BV-MUlSZ.js";
import { t as BracesVariableIcon } from "./BracesVariableIcon-zDcWRqre.js";
import { t as FallbackFavicon_default } from "./FallbackFavicon-Cm9QCLm8.js";
import { t as ImagePreviewService } from "./ImagePreviewService-B71uVdEp.js";
const DEFAULT_PIPELINE_API_BASE = "http://192.168.21.225:9331";
const PIPELINE_NODE_TOKEN_KIND = "pipelineNode";
const PIPELINE_NODE_TOKEN_ID_PREFIX = "pipelineNode:";
function pipelineAssetFileUrl(assetId, apiBase = DEFAULT_PIPELINE_API_BASE) {
	return `${apiBase.replace(/\/+$/, "")}/api/assets/${encodeURIComponent(assetId)}/file`;
}
var CATALOG_TTL_MS = 6e4;
var catalogCache = null;
var catalogInFlight = null;
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readString(value, fallback = "") {
	return typeof value === "string" ? value : fallback;
}
function readBoolean(value, fallback = false) {
	return typeof value === "boolean" ? value : fallback;
}
function readStringArray(value) {
	return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}
function normalizePort(raw) {
	if (!isRecord(raw) || typeof raw.name !== "string" || !raw.name) return null;
	return {
		name: raw.name,
		direction: readString(raw.direction, "input"),
		asset_type: readString(raw.asset_type),
		required: readBoolean(raw.required),
		description: readString(raw.description),
		tags: readStringArray(raw.tags)
	};
}
function normalizeConfigParam(raw) {
	if (!isRecord(raw) || typeof raw.name !== "string" || !raw.name) return null;
	return {
		name: raw.name,
		type: readString(raw.type, "string"),
		required: readBoolean(raw.required),
		default: raw.default,
		description: readString(raw.description),
		label: readString(raw.label, raw.name),
		group: readString(raw.group, "general"),
		placeholder: readString(raw.placeholder),
		secret: readBoolean(raw.secret),
		multiline: readBoolean(raw.multiline),
		advanced: readBoolean(raw.advanced),
		options: readStringArray(raw.options),
		surface: readBoolean(raw.surface)
	};
}
function normalizePipelineNodeCatalogItem(raw) {
	if (!isRecord(raw) || typeof raw.node_id !== "string" || !raw.node_id) return null;
	return {
		node_id: raw.node_id,
		name: readString(raw.name, raw.node_id),
		description: readString(raw.description),
		tags: readStringArray(raw.tags),
		input_ports: Array.isArray(raw.input_ports) ? raw.input_ports.flatMap((port) => normalizePort(port) ?? []) : [],
		output_ports: Array.isArray(raw.output_ports) ? raw.output_ports.flatMap((port) => normalizePort(port) ?? []) : [],
		config_schema: Array.isArray(raw.config_schema) ? raw.config_schema.flatMap((param) => normalizeConfigParam(param) ?? []) : []
	};
}
async function resolvePipelineApiBase() {
	try {
		const response = await fetch("/api/v1/plugins/ai-pipeline-bridge/health");
		if (response.ok) {
			const body = await response.json();
			if (isRecord(body) && typeof body.api_base === "string" && body.api_base.trim()) return body.api_base.trim().replace(/\/+$/, "");
		}
	} catch {}
	return DEFAULT_PIPELINE_API_BASE;
}
async function fetchPipelineNodeCatalog(force = false) {
	if (!force && catalogCache && Date.now() - catalogCache.at < CATALOG_TTL_MS) return catalogCache.nodes;
	if (!force && catalogInFlight) return catalogInFlight;
	catalogInFlight = (async () => {
		const base = await resolvePipelineApiBase();
		const response = await fetch(`${base}/api/nodes`);
		if (!response.ok) throw new Error(`pipeline nodes ${response.status}`);
		const body = await response.json();
		const nodes = Array.isArray(body) ? body.flatMap((item) => normalizePipelineNodeCatalogItem(item) ?? []) : [];
		catalogCache = {
			at: Date.now(),
			nodes
		};
		return nodes;
	})();
	try {
		return await catalogInFlight;
	} finally {
		catalogInFlight = null;
	}
}
function findPipelineNode(nodes, nodeId) {
	return nodes.find((node) => node.node_id === nodeId);
}
function isLiteralPort(port) {
	if (port.direction !== "input") return false;
	const assetType = port.asset_type.toLowerCase();
	return assetType.startsWith("data/text") || assetType.startsWith("data/number") || assetType.startsWith("data/boolean") || assetType === "data/json" || port.tags.includes("prompt") || port.tags.includes("primary");
}
function getPipelineNodeFormFields(node) {
	const ports = node.input_ports.filter(isLiteralPort).map((port) => ({
		key: port.name,
		kind: "port",
		label: port.name,
		description: port.description,
		required: port.required,
		advanced: false,
		type: port.asset_type.includes("number") ? "number" : "string",
		options: [],
		placeholder: port.required ? "必填；不填则由编排模型补全或提问" : "",
		secret: false,
		multiline: port.tags.includes("prompt") || port.name.toLowerCase().includes("prompt")
	}));
	const configs = node.config_schema.filter((param) => !param.secret).map((param) => ({
		key: param.name,
		kind: "config",
		label: param.label || param.name,
		description: param.description,
		required: param.required,
		advanced: param.advanced || !param.surface && !param.required,
		type: param.type || "string",
		options: param.options,
		placeholder: param.placeholder,
		secret: param.secret,
		multiline: param.multiline
	}));
	return [...ports, ...configs];
}
function serializePipelineNodePrompt(nodeId, values) {
	const entries = Object.entries(values).filter(([, value]) => {
		if (value == null) return false;
		if (typeof value === "string") return value.trim() !== "";
		if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return false;
		return true;
	});
	if (entries.length === 0) return `/${nodeId}`;
	return `/${nodeId}${JSON.stringify(Object.fromEntries(entries))}`;
}
function replacePropertySeparatorsOutsideStrings(source) {
	let result = "";
	let quote = null;
	let escaped = false;
	for (const char of source) {
		if (quote) {
			result += char;
			if (escaped) {
				escaped = false;
				continue;
			}
			if (char === "\\") {
				escaped = true;
				continue;
			}
			if (char === quote) quote = null;
			continue;
		}
		if (char === "\"" || char === "'") {
			quote = char;
			result += char;
			continue;
		}
		result += char === ";" ? "," : char;
	}
	return result;
}
function quoteBareKeys(source) {
	return source.replace(/([,{]\s*)([A-Za-z_][\w.-]*)(\s*:)/g, "$1\"$2\"$3");
}
function parseLooseJsonObject(raw) {
	const trimmed = raw.trim();
	if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) return null;
	const normalized = quoteBareKeys(replacePropertySeparatorsOutsideStrings(trimmed.replace(/[“”]/g, "\"").replace(/[‘’]/g, "'").replace(/×/g, "x")));
	try {
		const parsed = JSON.parse(normalized);
		return isRecord(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function parsePipelineNodePrompt(text) {
	const match = text.trim().match(/^\/?([A-Za-z][\w.-]*)\s*(\{[\s\S]*\})?\s*$/);
	if (!match) return null;
	const nodeId = match[1];
	const objectLiteral = match[2];
	return {
		nodeId,
		values: objectLiteral ? parseLooseJsonObject(objectLiteral) ?? {} : {}
	};
}
function parsePipelineNodeQuery(searchText, nodeId) {
	const raw = searchText.trim().replace(/^\//, "");
	if (!raw.startsWith(nodeId)) return {};
	const rest = raw.slice(nodeId.length).trim();
	if (!rest.startsWith("{")) return {};
	return parseLooseJsonObject(rest) ?? {};
}
function isPipelineNodeTokenPayload(value) {
	return isRecord(value) && typeof value.nodeId === "string" && value.nodeId.length > 0 && isRecord(value.values);
}
function readPipelineNodeTokenPayload(token) {
	if (isPipelineNodeTokenPayload(token.payload)) return token.payload;
	const fromPrompt = token.promptText ? parsePipelineNodePrompt(token.promptText) : null;
	if (fromPrompt) return {
		nodeId: fromPrompt.nodeId,
		values: fromPrompt.values
	};
	const fromLabel = parsePipelineNodePrompt(token.label);
	if (fromLabel) return {
		nodeId: fromLabel.nodeId,
		values: fromLabel.values
	};
	return {
		nodeId: (token.id.startsWith("pipelineNode:") ? token.id.slice(13).split(":")[0] : "") || token.label.replace(/^\//, ""),
		values: {}
	};
}
function pipelineNodeToComposerToken(node, values = {}) {
	const payload = {
		nodeId: node.node_id,
		values
	};
	return {
		id: `${PIPELINE_NODE_TOKEN_ID_PREFIX}${node.node_id}:${createComposerSecureRandomId("n")}`,
		kind: PIPELINE_NODE_TOKEN_KIND,
		label: `/${node.node_id}`,
		description: node.name || node.description || node.node_id,
		promptText: serializePipelineNodePrompt(node.node_id, values),
		payload
	};
}
function pipelineSlashQuickPanelFields(node) {
	const slashId = `/${node.node_id}`;
	return {
		description: slashId,
		label: (node.name || node.description || node.node_id).trim() || node.node_id,
		slashId
	};
}
function withPipelineNodeValues(token, values) {
	const current = readPipelineNodeTokenPayload(token);
	return {
		payload: {
			nodeId: current.nodeId,
			values
		},
		promptText: serializePipelineNodePrompt(current.nodeId, values)
	};
}
const PIPELINE_NODE_CATEGORY_ORDER = [
	"image",
	"video",
	"3d",
	"motion",
	"segmentation",
	"model",
	"workflow",
	"io",
	"interactive",
	"data",
	"other"
];
function hasAnyToken(haystack, tokens) {
	return tokens.some((token) => haystack.includes(token));
}
function classifyPipelineNode(node) {
	const nodeId = node.node_id.toLowerCase();
	const tags = new Set(node.tags.map((tag) => tag.toLowerCase()));
	const haystack = `${nodeId} ${node.name.toLowerCase()} ${[...tags].join(" ")}`;
	if (tags.has("workflow") || nodeId.startsWith("workflow.")) return "workflow";
	if (tags.has("video") || hasAnyToken(haystack, [
		"video",
		"text-to-video",
		"image-to-video"
	])) return "video";
	if (tags.has("segmentation") || nodeId.includes("segment")) return "segmentation";
	if (tags.has("3d-generation") || tags.has("3d-reconstruction") || tags.has("sam3d") || hasAnyToken(haystack, [
		"3d",
		"glb",
		"usd",
		"pixal",
		"mesh"
	])) return "3d";
	if (tags.has("kimodo") || tags.has("motion") || nodeId.startsWith("kimodo.") || haystack.includes("motion")) return "motion";
	if (nodeId.startsWith("image.") || hasAnyToken(haystack, [
		"text-to-image",
		"image-to-image",
		"image-gen",
		"inpaint",
		"outpaint"
	])) return "image";
	if (nodeId.startsWith("io.") || tags.has("io") && !tags.has("image")) return "io";
	if (tags.has("image")) return "image";
	if (nodeId.startsWith("model.") || tags.has("model")) return "model";
	if (tags.has("human-in-the-loop") || nodeId.startsWith("human.") || haystack.includes("approve")) return "interactive";
	if (tags.has("data") || nodeId.startsWith("data.")) return "data";
	return "other";
}
function groupPipelineNodesByCategory(nodes) {
	const buckets = /* @__PURE__ */ new Map();
	for (const node of nodes) {
		const category = classifyPipelineNode(node);
		const group = buckets.get(category);
		if (group) group.push(node);
		else buckets.set(category, [node]);
	}
	return PIPELINE_NODE_CATEGORY_ORDER.flatMap((category) => {
		const groupedNodes = buckets.get(category);
		return groupedNodes?.length ? [{
			category,
			nodes: groupedNodes
		}] : [];
	});
}
var HIDDEN_PIPELINE_NODE_FILTER_TAGS = new Set([
	"primary",
	"secondary",
	"prompt",
	"advanced",
	"file",
	"asset",
	"api"
]);
function isPipelineNodeFilterTag(tag) {
	const normalized = tag.trim().toLowerCase();
	return Boolean(normalized) && !HIDDEN_PIPELINE_NODE_FILTER_TAGS.has(normalized) && !normalized.includes(":");
}
function collectPipelineNodeFilterTags(nodes) {
	const buckets = /* @__PURE__ */ new Map();
	for (const node of nodes) {
		const seen = /* @__PURE__ */ new Set();
		for (const raw of node.tags) {
			const tag = raw.trim().toLowerCase();
			if (!isPipelineNodeFilterTag(tag) || seen.has(tag)) continue;
			seen.add(tag);
			const list = buckets.get(tag);
			if (list) list.push(node);
			else buckets.set(tag, [node]);
		}
	}
	return [...buckets.entries()].map(([tag, taggedNodes]) => ({
		tag,
		count: taggedNodes.length,
		nodes: taggedNodes
	})).sort((left, right) => right.count - left.count || left.tag.localeCompare(right.tag));
}
const PIPELINE_TEXT_TO_IMAGE_NODE_ID = "model.text-to-image";
const PIPELINE_IMAGE_TO_IMAGE_NODE_ID = "model.image-to-image";
function resolvePipelineNodeIdForAttachments(nodeId, hasImageAttachment) {
	return hasImageAttachment && nodeId === "model.text-to-image" ? PIPELINE_IMAGE_TO_IMAGE_NODE_ID : nodeId;
}
var FEATURED_PRESET_ALIASES = [
	"nano-banana-pro",
	"gpt-image-2",
	"nano-banana-2"
];
function pipelinePresetSlashQuickPanelFields(preset) {
	return {
		description: preset.slashId,
		label: preset.displayName.trim() || preset.slashId
	};
}
function stripModelGatewaySuffix(modelId) {
	return modelId.replace(/@[^@]+$/, "").trim();
}
function slugifyPipelinePresetAlias(modelId) {
	return stripModelGatewaySuffix(modelId).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "model";
}
function displayNameForPipelineModel(modelId) {
	return stripModelGatewaySuffix(modelId).replace(/[-_]+/g, " ");
}
function uniquePresetAlias(base, providerId, used) {
	if (!used.has(base)) {
		used.add(base);
		return base;
	}
	const providerSlug = slugifyPipelinePresetAlias(providerId.replace(/^coco-/, ""));
	let alias = `${base}-${providerSlug}`;
	let suffix = 2;
	while (used.has(alias)) {
		alias = `${base}-${providerSlug}-${suffix}`;
		suffix += 1;
	}
	used.add(alias);
	return alias;
}
function pickFeaturedPipelinePresets(presets) {
	const featured = [];
	const seenModels = /* @__PURE__ */ new Set();
	const consider = (preset) => {
		if (preset.nodeId !== "model.text-to-image") return;
		const modelKey = slugifyPipelinePresetAlias(preset.model);
		if (seenModels.has(modelKey)) return;
		seenModels.add(modelKey);
		featured.push(preset);
	};
	for (const wanted of FEATURED_PRESET_ALIASES) {
		const wantedSlug = slugifyPipelinePresetAlias(wanted);
		const match = presets.find((preset) => slugifyPipelinePresetAlias(preset.model) === wantedSlug);
		if (match) consider(match);
	}
	for (const preset of presets) consider(preset);
	return featured;
}
function pipelineImageModelChoiceValue(choice) {
	return `${choice.providerId}::${choice.model}`;
}
function pipelineImageModelChoices(presets, nodeId) {
	const relevant = presets.filter((preset) => preset.nodeId === nodeId);
	const usage = /* @__PURE__ */ new Map();
	for (const preset of relevant) {
		const key = preset.model.toLowerCase();
		usage.set(key, (usage.get(key) ?? 0) + 1);
	}
	const seen = /* @__PURE__ */ new Set();
	const choices = [];
	for (const preset of relevant) {
		const key = `${preset.providerId}:${preset.model}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const duplicated = (usage.get(preset.model.toLowerCase()) ?? 0) > 1;
		choices.push({
			model: preset.model,
			providerId: preset.providerId,
			providerName: preset.providerName,
			label: duplicated ? `${preset.model} · ${preset.providerName}` : preset.model
		});
	}
	return choices;
}
function findPipelineImageModelChoice(choices, model, providerId) {
	const modelId = typeof model === "string" ? model : "";
	if (!modelId) return void 0;
	const provider = typeof providerId === "string" ? providerId : "";
	if (provider) {
		const exact = choices.find((choice) => choice.providerId === provider && choice.model === modelId);
		if (exact) return exact;
	}
	return choices.find((choice) => choice.model === modelId);
}
function groupCherryImageModelsForPipelinePresets(providers, models) {
	const imageModels = /* @__PURE__ */ new Map();
	for (const model of models) {
		const modelId = model.modelId.trim();
		if (!modelId) continue;
		const list = imageModels.get(model.providerId);
		if (list) {
			if (!list.includes(modelId)) list.push(modelId);
		} else imageModels.set(model.providerId, [modelId]);
	}
	return providers.map((provider) => ({
		id: provider.id,
		name: provider.name,
		enabled: provider.enabled,
		imageModels: imageModels.get(provider.id) ?? []
	}));
}
function buildPipelineModelPresets(providers, availableNodeIds) {
	const textToImageAvailable = !availableNodeIds || availableNodeIds.has("model.text-to-image");
	const imageToImageAvailable = !availableNodeIds || availableNodeIds.has("model.image-to-image");
	if (!textToImageAvailable && !imageToImageAvailable) return [];
	const modelUsage = /* @__PURE__ */ new Map();
	for (const provider of providers) {
		if (!provider.enabled) continue;
		for (const model of provider.imageModels) {
			const key = stripModelGatewaySuffix(model).toLowerCase();
			modelUsage.set(key, (modelUsage.get(key) ?? 0) + 1);
		}
	}
	const presets = [];
	const appendPresets = (nodeId, label, acceptsProvider) => {
		const usedAliases = /* @__PURE__ */ new Set();
		for (const provider of providers) {
			if (!provider.enabled || !acceptsProvider(provider.id)) continue;
			for (const model of provider.imageModels) {
				if (!model.trim()) continue;
				const alias = uniquePresetAlias(slugifyPipelinePresetAlias(model), provider.id, usedAliases);
				const modelName = (modelUsage.get(stripModelGatewaySuffix(model).toLowerCase()) ?? 0) > 1 ? `${displayNameForPipelineModel(model)} · ${provider.name}` : displayNameForPipelineModel(model);
				presets.push({
					id: `${provider.id}:${model}:${nodeId}`,
					nodeId,
					alias,
					slashId: `/${nodeId}.${alias}`,
					displayName: `${label} · ${modelName}`,
					model,
					providerId: provider.id,
					providerName: provider.name,
					...nodeId === "model.image-to-image" ? { values: { size: "auto" } } : {},
					featured: false
				});
			}
		}
	};
	if (textToImageAvailable) appendPresets(PIPELINE_TEXT_TO_IMAGE_NODE_ID, "文生图", () => true);
	if (imageToImageAvailable) appendPresets(PIPELINE_IMAGE_TO_IMAGE_NODE_ID, "图生图", (providerId) => providerId === "coco-vapi");
	const featuredIds = new Set(pickFeaturedPipelinePresets(presets).map((preset) => preset.id));
	return presets.map((preset) => ({
		...preset,
		featured: featuredIds.has(preset.id)
	}));
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function fieldValueToInput(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	try {
		return JSON.stringify(value);
	} catch {
		return "";
	}
}
function parseFieldInput(field, raw) {
	const trimmed = raw.trim();
	if (trimmed === "") return void 0;
	if (field.type === "number" || field.type === "float" || field.type === "int" || field.type === "integer") {
		const parsed = Number(trimmed);
		return Number.isFinite(parsed) ? parsed : trimmed;
	}
	if (field.type === "boolean") {
		if (trimmed === "true" || trimmed === "1") return true;
		if (trimmed === "false" || trimmed === "0") return false;
	}
	if (field.type === "json" || field.type === "object") try {
		return JSON.parse(trimmed);
	} catch {
		return trimmed;
	}
	return raw;
}
function PipelineNodeFieldControl({ field, value, disabled, onChange, imageModelChoices, providerId }) {
	const inputValue = fieldValueToInput(value);
	const controlClassName = "h-7 w-full rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none focus-visible:border-primary";
	if (field.key === "model" && imageModelChoices && imageModelChoices.length > 0) {
		const selected = findPipelineImageModelChoice(imageModelChoices, value, providerId);
		const selectValue = selected ? pipelineImageModelChoiceValue(selected) : inputValue;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			"data-ui": "chat.pipeline-node-field-control.pipeline-node-model-select",
			className: controlClassName,
			"data-testid": "pipeline-node-model-select",
			disabled,
			value: selectValue,
			onChange: (event) => {
				const next = event.target.value;
				if (!next) {
					onChange(void 0);
					return;
				}
				onChange(imageModelChoices.find((item) => pipelineImageModelChoiceValue(item) === next) ?? next);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: field.required ? "—" : "（默认）"
				}),
				inputValue && !selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: inputValue,
					children: inputValue
				}) : null,
				imageModelChoices.map((choice) => {
					const optionValue = pipelineImageModelChoiceValue(choice);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: optionValue,
						children: choice.label
					}, optionValue);
				})
			]
		});
	}
	if (field.options.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		"data-ui": "chat.pipeline-node-field-control",
		className: controlClassName,
		disabled,
		value: inputValue,
		onChange: (event) => onChange(event.target.value === "" ? void 0 : event.target.value),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: field.required ? "—" : "（默认）"
		}), field.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: option,
			children: option
		}, option))]
	});
	if (field.multiline) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-ui": "chat.pipeline-node-field-control",
		className: cn(controlClassName, "min-h-16 resize-y py-1.5"),
		disabled,
		placeholder: field.placeholder,
		value: inputValue,
		onChange: (event) => onChange(parseFieldInput(field, event.target.value))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		"data-ui": "chat.pipeline-node-field-control",
		className: controlClassName,
		disabled,
		placeholder: field.placeholder,
		type: field.type === "number" || field.type === "float" || field.type === "int" ? "number" : "text",
		value: inputValue,
		onChange: (event) => onChange(parseFieldInput(field, event.target.value))
	});
}
function PipelineNodeParamForm({ token, node, disabled, onValuesChange }) {
	const { t } = useTranslation();
	const wantsImageModels = node?.node_id === "model.text-to-image" || node?.node_id === "model.image-to-image";
	const { presets } = usePipelineModelPresets(Boolean(wantsImageModels));
	const payload = readPipelineNodeTokenPayload(token);
	const imageModelChoices = node ? pipelineImageModelChoices(presets, node.node_id) : [];
	const fields = (node ? getPipelineNodeFormFields(node) : []).filter((field) => !(field.key === "provider_id" && imageModelChoices.length > 0));
	const primaryFields = fields.filter((field) => !field.advanced);
	const advancedFields = fields.filter((field) => field.advanced);
	const commit = (patch) => {
		const next = { ...payload.values };
		for (const [key, value] of Object.entries(patch)) if (value === void 0) delete next[key];
		else next[key] = value;
		onValuesChange?.(next);
	};
	const commitField = (key, value) => {
		if (key === "model" && imageModelChoices.length > 0 && value && typeof value === "object" && "model" in value && "providerId" in value) {
			const choice = value;
			commit({
				model: choice.model,
				provider_id: choice.providerId
			});
			return;
		}
		if (key === "model" && imageModelChoices.length > 0 && (value === void 0 || value === "")) {
			commit({
				model: void 0,
				provider_id: void 0
			});
			return;
		}
		commit({ [key]: value });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.pipeline-node-param-form",
		className: "flex w-80 max-w-[calc(100vw-32px)] flex-col gap-2 p-3",
		"data-pipeline-node-params": "",
		onKeyDown: (event) => event.stopPropagation(),
		onKeyDownCapture: (event) => event.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate font-medium text-foreground text-xs",
					children: token.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-[11px] text-muted-foreground",
					children: node?.name || token.description
				})]
			}),
			primaryFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-[11px] text-muted-foreground",
					children: [field.label, field.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-destructive",
						children: t("chat.input.pipeline_nodes.required")
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineNodeFieldControl, {
					disabled: Boolean(disabled),
					field,
					imageModelChoices,
					providerId: payload.values.provider_id,
					value: payload.values[field.key],
					onChange: (value) => commitField(field.key, value)
				})]
			}, field.key)),
			advancedFields.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "rounded-md border border-border-subtle px-2 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer text-[11px] text-muted-foreground",
					children: t("chat.input.pipeline_nodes.advanced")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-col gap-2",
					children: advancedFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: field.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineNodeFieldControl, {
							disabled: Boolean(disabled),
							field,
							imageModelChoices,
							providerId: payload.values.provider_id,
							value: payload.values[field.key],
							onChange: (value) => commitField(field.key, value)
						})]
					}, field.key))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "m-0 text-[11px] leading-4 text-muted-foreground",
				children: t("chat.input.pipeline_nodes.empty_hint")
			})
		]
	});
}
function usePipelineNodeCatalogItem(nodeId) {
	const [node, setNode] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!nodeId) return;
		let cancelled = false;
		fetchPipelineNodeCatalog().then((nodes) => {
			if (!cancelled) setNode(findPipelineNode(nodes, nodeId) ?? null);
		}).catch(() => {
			if (!cancelled) setNode(null);
		});
		return () => {
			cancelled = true;
		};
	}, [nodeId]);
	return node;
}
function usePipelineNodeCatalog(enabled) {
	const [nodes, setNodes] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		let cancelled = false;
		fetchPipelineNodeCatalog().then((next) => {
			if (cancelled) return;
			setNodes(next);
			setError(null);
		}).catch(() => {
			if (cancelled) return;
			setNodes([]);
			setError("load_failed");
		});
		return () => {
			cancelled = true;
		};
	}, [enabled]);
	return (0, import_react.useMemo)(() => ({
		nodes,
		error
	}), [error, nodes]);
}
function usePipelineModelPresets(enabled) {
	const { nodes, error: nodesError } = usePipelineNodeCatalog(enabled);
	const { providers } = useProviders({ enabled: true }, { enabled });
	const { models } = useModels({
		capability: MODEL_CAPABILITY.IMAGE_GENERATION,
		enabled: true
	}, { fetchEnabled: enabled });
	const presets = (0, import_react.useMemo)(() => {
		if (!enabled) return [];
		return buildPipelineModelPresets(groupCherryImageModelsForPipelinePresets(providers.map((provider) => ({
			id: provider.id,
			name: provider.name,
			enabled: provider.isEnabled
		})), models.flatMap((model) => {
			if (!model.isEnabled || model.isHidden || !isGenerateImageModel(model)) return [];
			const modelId = getRawModelId(model).trim();
			return modelId ? [{
				providerId: model.providerId,
				modelId
			}] : [];
		})), nodes.length > 0 ? new Set(nodes.map((node) => node.node_id)) : void 0);
	}, [
		enabled,
		models,
		nodes,
		providers
	]);
	return (0, import_react.useMemo)(() => ({
		presets,
		error: nodesError
	}), [nodesError, presets]);
}
const QUOTE_TOOLTIP_CONTENT_CLASS_NAME = "max-w-[min(32rem,calc(100vw-2rem))]";
const QUOTE_TOOLTIP_BODY_CLASS_NAME = "whitespace-pre-wrap text-left overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]";
var BLOCKQUOTE_TRAILING_NEWLINE_PATTERN = /(<\/blockquote>)\n$/;
var BLOCKQUOTE_PROMPT_PATTERN = /^<blockquote>\n\n([\s\S]*)\n<\/blockquote>$/;
function formatQuoteTooltipContent(content) {
	return content || void 0;
}
function getQuoteTooltipContent(description, promptText) {
	const content = description || promptText;
	if (!content) return void 0;
	return formatQuoteTooltipContent(content.replace(BLOCKQUOTE_PROMPT_PATTERN, "$1"));
}
function normalizeQuoteTokenPromptText(content) {
	return content.replace(BLOCKQUOTE_TRAILING_NEWLINE_PATTERN, "$1");
}
function formatQuoteTokenPromptText(content) {
	return normalizeQuoteTokenPromptText(formatQuotedText(content));
}
function parseComposerLink(value) {
	const url = value?.trim();
	if (!url || /\s/.test(url)) return null;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:" || !parsed.hostname) return null;
		const hostname = parsed.hostname.replace(/^www\./, "");
		const pathname = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/+$/, "");
		return {
			url,
			hostname: parsed.hostname,
			label: `${hostname}${pathname}`
		};
	} catch {
		return null;
	}
}
function createComposerLinkToken(value) {
	const link = parseComposerLink(value);
	if (!link) return null;
	return {
		id: createComposerSecureRandomId("link-token"),
		kind: "link",
		label: link.label,
		promptText: link.url
	};
}
var logger = loggerService.withContext("fileTokenPresentation");
var warnedPreviewKeys = /* @__PURE__ */ new Set();
var fileTokenIconClassName = "size-3 shrink-0 text-current";
var fileTokenContainerClassName = "border-border bg-background hover:bg-accent";
var fileTokenVisualPresetByVariant = {
	image: {
		icon: FileImage,
		iconClassName: "bg-cyan-100 text-cyan-700",
		defaultTypeLabel: "IMAGE",
		displayExtensions: [
			"avif",
			"bmp",
			"gif",
			"heic",
			"heif",
			"jpeg",
			"jpg",
			"png",
			"svg",
			"webp"
		]
	},
	word: {
		icon: FileType2,
		iconClassName: "bg-blue-100 text-blue-700",
		defaultTypeLabel: "WORD",
		displayExtensions: ["doc", "docx"]
	},
	excel: {
		icon: FileSpreadsheet,
		iconClassName: "bg-green-100 text-green-700",
		defaultTypeLabel: "EXCEL",
		displayExtensions: [
			"csv",
			"xls",
			"xlsx"
		]
	},
	powerpoint: {
		icon: Presentation,
		iconClassName: "bg-orange-100 text-orange-700",
		defaultTypeLabel: "PPT",
		displayExtensions: ["ppt", "pptx"]
	},
	pdf: {
		icon: FileText,
		iconClassName: "bg-red-100 text-red-700",
		defaultTypeLabel: "PDF",
		displayExtensions: ["pdf"]
	},
	markdown: {
		icon: FileText,
		iconClassName: "bg-gray-100 text-gray-700",
		defaultTypeLabel: "MD",
		displayExtensions: [
			"markdown",
			"md",
			"mdx"
		]
	},
	json: {
		icon: FileJson,
		iconClassName: "bg-violet-100 text-violet-700",
		defaultTypeLabel: "JSON",
		displayExtensions: ["json", "jsonl"]
	},
	code: {
		icon: FileCode2,
		iconClassName: "bg-indigo-100 text-indigo-700",
		defaultTypeLabel: "CODE",
		displayExtensions: [
			"css",
			"go",
			"html",
			"java",
			"js",
			"jsx",
			"py",
			"rs",
			"ts",
			"tsx",
			"xml",
			"yaml",
			"yml"
		]
	},
	document: {
		icon: FileText,
		iconClassName: "bg-slate-100 text-slate-700",
		defaultTypeLabel: "DOCUMENT"
	},
	text: {
		icon: FileText,
		iconClassName: "bg-info-subtle text-info",
		defaultTypeLabel: "TEXT",
		displayExtensions: [
			"log",
			"text",
			"txt"
		]
	},
	fallback: {
		icon: File,
		iconClassName: "bg-accent text-muted-foreground",
		defaultTypeLabel: "FILE"
	}
};
var fileTokenVariantByExtension = new Map(Object.entries(fileTokenVisualPresetByVariant).flatMap(([variant, preset]) => {
	return (("displayExtensions" in preset ? preset.displayExtensions : void 0) ?? []).map((extension) => [extension, variant]);
}));
function getNormalizedFileExtension(file, fallbackLabel) {
	return (file?.ext || fallbackLabel.match(/\.[^.]+$/)?.[0] || "").replace(/^\./, "").toLowerCase();
}
function getFileExtensionLabel(file, fallbackLabel) {
	return getNormalizedFileExtension(file, fallbackLabel).toUpperCase();
}
function getFilePreviewUrl(file, fallbackLabel, previewUrl) {
	if (file?.type !== FILE_TYPE.IMAGE) return void 0;
	const extension = getNormalizedFileExtension(file, fallbackLabel);
	previewUrl = previewUrl || file?.previewUrl;
	if (previewUrl) try {
		const url = new URL(previewUrl);
		if (url.protocol !== "file:") return previewUrl;
		const parsedPath$1 = AbsoluteFilePathSchema.safeParse(fileUrlToPath(url));
		if (!parsedPath$1.success) {
			if (!warnedPreviewKeys.has(previewUrl)) {
				warnedPreviewKeys.add(previewUrl);
				logger.warn("getFilePreviewUrl: non-absolute path in file: previewUrl", { previewUrl });
			}
			return;
		}
		return toSafeFileUrl(parsedPath$1.data, extension || null);
	} catch {
		return;
	}
	if (!file.path) return void 0;
	const parsedPath = AbsoluteFilePathSchema.safeParse(file.path);
	if (!parsedPath.success) {
		if (!warnedPreviewKeys.has(file.path)) {
			warnedPreviewKeys.add(file.path);
			logger.warn("getFilePreviewUrl: non-absolute/invalid attachment path", { path: file.path });
		}
		return;
	}
	return toSafeFileUrl(parsedPath.data, extension || null);
}
function getFileTokenVariant(file, fallbackLabel) {
	const extension = getNormalizedFileExtension(file, fallbackLabel);
	const extensionVariant = fileTokenVariantByExtension.get(extension);
	if (file?.type === FILE_TYPE.IMAGE) return "image";
	if (extensionVariant) return extensionVariant;
	if (file?.type === FILE_TYPE.DOCUMENT) return "document";
	if (file?.type === FILE_TYPE.TEXT) return "text";
	return "fallback";
}
function getFileTokenPresentation(file, fallbackLabel, previewUrl) {
	const extensionLabel = getFileExtensionLabel(file, fallbackLabel);
	const variant = getFileTokenVariant(file, fallbackLabel);
	const preset = fileTokenVisualPresetByVariant[variant];
	const Icon = preset.icon;
	return {
		variant,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: fileTokenIconClassName,
			"aria-hidden": true
		}),
		previewIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-7",
			"aria-hidden": true
		}),
		containerClassName: fileTokenContainerClassName,
		iconClassName: preset.iconClassName,
		typeLabel: extensionLabel || preset.defaultTypeLabel,
		previewUrl: variant === "image" ? getFilePreviewUrl(file, fallbackLabel, previewUrl) : void 0
	};
}
var tokenIconClassName = "size-[1em] shrink-0 text-current opacity-80";
var tokenRemoveIconClassName = "size-[0.95em] shrink-0 text-current";
var TOKEN_POPOVER_OPEN_DELAY_MS = 120;
var TOKEN_POPOVER_CLOSE_DELAY_MS = 160;
var TOKEN_TOOLTIP_DELAY_MS = 300;
var pinnedComposerPopoverKeys = /* @__PURE__ */ new Set();
function isComposerPopoverPinned(pinKey) {
	return Boolean(pinKey && pinnedComposerPopoverKeys.has(pinKey));
}
function setComposerPopoverPinned(pinKey, pinned) {
	if (!pinKey) return;
	if (pinned) pinnedComposerPopoverKeys.add(pinKey);
	else pinnedComposerPopoverKeys.delete(pinKey);
}
var tokenPreviewHeaderClassName = "flex h-20 items-center justify-center border-border-subtle border-b bg-[repeating-linear-gradient(135deg,var(--border-subtle)_0,var(--border-subtle)_1px,transparent_1px,transparent_8px)] bg-muted";
var pastedTextPreviewCache = /* @__PURE__ */ new Map();
var tokenIconByKind = {
	skill: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCase, { className: tokenIconClassName }),
	link: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: tokenIconClassName }),
	file: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: tokenIconClassName }),
	folder: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: tokenIconClassName }),
	knowledge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: tokenIconClassName }),
	reference: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { className: tokenIconClassName }),
	quote: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextQuote, { className: tokenIconClassName }),
	pipelineNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: tokenIconClassName }),
	promptVariable: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BracesVariableIcon, { className: tokenIconClassName })
};
function stopTokenActionEvent(event) {
	event.preventDefault();
	event.stopPropagation();
}
function InlineTokenRemoveButton({ label, onRemove, className, iconClassName }) {
	const handleRemove = (event) => {
		stopTokenActionEvent(event);
		onRemove();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-ui": "chat.inline-token-remove-button",
		type: "button",
		"aria-label": label,
		title: label,
		"data-composer-token-remove": "",
		className: cn("pointer-events-none absolute inset-0 inline-flex items-center justify-center border-0 bg-transparent p-0 text-current leading-none opacity-0 outline-none transition-opacity", "hover:opacity-100", "focus-visible:pointer-events-auto focus-visible:opacity-100", "group-focus-within/composer-token:pointer-events-auto group-focus-within/composer-token:opacity-100 group-hover/composer-token:pointer-events-auto group-hover/composer-token:opacity-100", className),
		onMouseDown: stopTokenActionEvent,
		onClick: handleRemove,
		onKeyDown: (event) => event.stopPropagation(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
			className: cn(tokenRemoveIconClassName, iconClassName),
			"aria-hidden": true
		})
	});
}
function InlineTokenIconSlot({ icon, removeLabel, onRemove, slotClassName, removeButtonClassName, removeIconClassName }) {
	if (!onRemove) return icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.inline-token-icon-slot",
		className: cn("relative inline-flex shrink-0", slotClassName),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex shrink-0 transition-opacity group-focus-within/composer-token:opacity-0 group-hover/composer-token:opacity-0",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenRemoveButton, {
			label: removeLabel ?? "Remove",
			onRemove,
			className: removeButtonClassName,
			iconClassName: removeIconClassName
		})]
	});
}
function FileTokenImageIcon({ previewUrl, fallbackIcon }) {
	const [failedPreviewUrl, setFailedPreviewUrl] = (0, import_react.useState)();
	if (!previewUrl || previewUrl === failedPreviewUrl) return fallbackIcon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "chat.file-token-image-icon",
		src: previewUrl,
		alt: "",
		"aria-hidden": true,
		draggable: false,
		className: "block size-4.5! shrink-0 object-cover",
		"data-file-token-icon-thumbnail": "",
		onError: () => setFailedPreviewUrl(previewUrl)
	});
}
function isSvgFile(file, label) {
	return (file?.ext || label.match(/\.[^.]+$/)?.[0] || "").replace(/^\./, "").toLowerCase() === "svg";
}
function renderActiveComposerTokenElement({ token, readOnly = false, selected = false, className, children, maxWidthClassName = "max-w-[calc(100%_-_0.25rem)]", onMouseDown, onRemove, removeLabel, icon, colorClassName = "text-primary", interactionProps }) {
	const title = token.kind === "quote" ? void 0 : token.description ?? token.promptText ?? token.label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.render-active-composer-token",
		className: cn("group/composer-token mx-0.5 inline-flex select-none items-baseline gap-1 align-baseline leading-[inherit]", maxWidthClassName, colorClassName, readOnly && "focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-none", selected && "text-primary underline decoration-primary/40 underline-offset-2", className),
		title,
		"data-composer-token-kind": token.kind,
		onMouseDown,
		...mergeUiProps(interactionProps, "chat.render-active-composer-token"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex shrink-0 translate-y-[0.08em] items-baseline text-current leading-[inherit]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenIconSlot, {
				icon: token.icon ? token.icon : icon,
				removeLabel,
				onRemove,
				removeButtonClassName: "size-[1em] rounded-[4px]"
			})
		}), children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: token.label
		})]
	});
}
function ActiveComposerToken(props) {
	return renderActiveComposerTokenElement(props);
}
function SkillComposerToken(props) {
	return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.skill
	});
}
function LinkComposerToken(props) {
	const link = parseComposerLink(props.token.promptText ?? props.token.description);
	if (!link) return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.link
	});
	const openLink = () => {
		ipcApi.request("system.shell.open_website", link.url);
	};
	const handleClick = (event) => {
		stopTokenActionEvent(event);
		openLink();
	};
	const handleKeyDown = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.stopPropagation();
		openLink();
	};
	return renderActiveComposerTokenElement({
		...props,
		className: cn("cursor-pointer rounded-[4px] focus-visible:bg-accent focus-visible:outline-none", props.className),
		icon: props.readOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "chat.link-composer-token",
			className: "inline-flex size-[1em] shrink-0 items-center justify-center overflow-hidden rounded-[4px] [&>img]:block [&>img]:size-full! [&>img]:object-contain [&>span]:size-full!",
			"data-composer-link-favicon": "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackFavicon_default, {
				hostname: link.hostname,
				alt: ""
			})
		}) : tokenIconByKind.link,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "chat.link-composer-token",
			className: "min-w-0 truncate",
			children: link.label
		}),
		interactionProps: {
			role: "link",
			tabIndex: 0,
			"aria-label": link.url,
			onClick: handleClick,
			onKeyDown: handleKeyDown
		}
	});
}
function isComposerAttachment(value) {
	return typeof value === "object" && value !== null;
}
function shouldShowFileTokenPopover(file) {
	return file?.type === FILE_TYPE.IMAGE || file?.composerFileKind === COMPOSER_FILE_KIND.PASTED_TEXT;
}
function readPastedTextPreview(path) {
	let request = pastedTextPreviewCache.get(path);
	if (!request) {
		request = window.api.fs.readText(path).catch((error) => {
			pastedTextPreviewCache.delete(path);
			throw error;
		});
		pastedTextPreviewCache.set(path, request);
	}
	return request;
}
function getReadOnlyFilePreviewPath(readOnlyFilePreview) {
	if (!readOnlyFilePreview?.url) return void 0;
	try {
		return fileUrlToPath(readOnlyFilePreview.url);
	} catch {
		return;
	}
}
function getPastedTextPreviewPath(file, readOnlyFilePreview) {
	return getReadOnlyFilePreviewPath(readOnlyFilePreview) ?? file?.path;
}
function TokenPathTooltipContent({ path, sizeLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.token-path-tooltip-content",
		className: "inline-flex max-w-full items-start gap-2.5 text-left",
		"data-token-path-tooltip": "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 break-all",
			"data-token-path": "",
			children: path
		}), sizeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-neutral-300",
			"data-token-size": "",
			children: sizeLabel
		})]
	});
}
function PastedTextTokenPreviewCard({ file, readOnlyFilePreview, secondaryAction }) {
	const [previewText, setPreviewText] = (0, import_react.useState)("");
	const previewPath = getPastedTextPreviewPath(file, readOnlyFilePreview);
	(0, import_react.useEffect)(() => {
		if (!previewPath) return;
		let disposed = false;
		readPastedTextPreview(previewPath).then((text) => {
			if (!disposed) setPreviewText(text);
		}).catch(() => {
			if (!disposed) setPreviewText("");
		});
		return () => {
			disposed = true;
		};
	}, [previewPath]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.pasted-text-token-preview",
		className: "w-80 overflow-hidden text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
			className: "max-h-44 min-h-24 overflow-x-hidden bg-muted/50",
			"data-file-token-text-scrollbar": "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "m-0 whitespace-pre-wrap break-words p-3 font-[inherit] text-popover-foreground text-xs leading-5",
				children: previewText
			})
		}), secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end border-border-subtle border-t p-2",
			"data-file-token-actions": "",
			children: secondaryAction
		})]
	});
}
function FileTokenPreviewCard({ file, label, presentation, readOnlyFilePreview, secondaryAction }) {
	const { t } = useTranslation();
	const sizeLabel = typeof file?.size === "number" && file.size > 0 ? formatFileSize(file.size) : void 0;
	const hasActions = Boolean(secondaryAction);
	const [failedPreviewUrl, setFailedPreviewUrl] = (0, import_react.useState)();
	const hasFailedPreview = Boolean(presentation.previewUrl && presentation.previewUrl === failedPreviewUrl);
	const previewUrl = hasFailedPreview ? void 0 : presentation.previewUrl;
	if (file?.composerFileKind === COMPOSER_FILE_KIND.PASTED_TEXT) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PastedTextTokenPreviewCard, {
		file,
		readOnlyFilePreview,
		secondaryAction
	});
	if (previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.file-token-preview-card",
		className: "flex max-h-48 max-w-60 overflow-hidden bg-muted text-left",
		"data-file-token-image-preview": "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: previewUrl,
			alt: label,
			className: "block max-h-48 max-w-60 object-contain",
			onError: () => setFailedPreviewUrl(previewUrl)
		})
	});
	if (hasFailedPreview) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.file-token-preview-card",
		className: "bg-muted px-5 py-4 text-center text-muted-foreground text-sm",
		"data-file-token-image-preview-error": "",
		children: t("chat.input.image_preview_failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.file-token-preview-card",
		className: "w-72 overflow-hidden text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: tokenPreviewHeaderClassName,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("inline-flex size-12 items-center justify-center rounded-xl bg-background", presentation.iconClassName),
				children: presentation.previewIcon
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2.5 p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1",
				"data-file-token-actions": hasActions ? "" : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-6 min-w-0 items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-semibold text-popover-foreground text-sm leading-5",
							children: label
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-4 min-w-0 items-center gap-1.5 text-muted-foreground text-xs leading-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-medium uppercase",
							children: presentation.typeLabel
						}), sizeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground-tertiary",
							children: "·"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0",
							children: sizeLabel
						})] })]
					}),
					secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-4 shrink-0 items-center justify-end",
						onMouseDown: stopTokenActionEvent,
						children: secondaryAction
					})
				]
			})
		})]
	});
}
function ComposerTokenHoverPopover({ trigger, content, ariaLabel, contentClassName, onActivate, pinOnClick = false, pinKey }) {
	const [pinned, setPinned] = (0, import_react.useState)(() => pinOnClick && isComposerPopoverPinned(pinKey));
	const [popoverOpen, setPopoverOpen] = (0, import_react.useState)(() => pinOnClick && isComposerPopoverPinned(pinKey));
	const openTimerRef = (0, import_react.useRef)(null);
	const closeTimerRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const pinnedRef = (0, import_react.useRef)(pinned);
	const popoverOpenReasonRef = (0, import_react.useRef)(pinned ? "pinned" : "pointer");
	pinnedRef.current = pinned;
	const clearOpenTimer = (0, import_react.useCallback)(() => {
		if (openTimerRef.current === null) return;
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = null;
	}, []);
	const clearCloseTimer = (0, import_react.useCallback)(() => {
		if (closeTimerRef.current === null) return;
		window.clearTimeout(closeTimerRef.current);
		closeTimerRef.current = null;
	}, []);
	const pinPopover = (0, import_react.useCallback)(() => {
		pinnedRef.current = true;
		setComposerPopoverPinned(pinKey, true);
		popoverOpenReasonRef.current = "pinned";
		clearOpenTimer();
		clearCloseTimer();
		setPinned(true);
		setPopoverOpen(true);
	}, [
		clearCloseTimer,
		clearOpenTimer,
		pinKey
	]);
	const closePopover = (0, import_react.useCallback)(() => {
		pinnedRef.current = false;
		setComposerPopoverPinned(pinKey, false);
		clearOpenTimer();
		clearCloseTimer();
		setPinned(false);
		setPopoverOpen(false);
	}, [
		clearCloseTimer,
		clearOpenTimer,
		pinKey
	]);
	const openPopover = (0, import_react.useCallback)((reason = "pointer") => {
		if (reason === "pinned") {
			pinPopover();
			return;
		}
		popoverOpenReasonRef.current = reason;
		clearOpenTimer();
		clearCloseTimer();
		setPopoverOpen(true);
	}, [
		clearCloseTimer,
		clearOpenTimer,
		pinPopover
	]);
	const openPointerPopover = (0, import_react.useCallback)(() => {
		if (pinnedRef.current) {
			clearCloseTimer();
			return;
		}
		openPopover("pointer");
	}, [clearCloseTimer, openPopover]);
	const scheduleOpenPopover = (0, import_react.useCallback)(() => {
		clearCloseTimer();
		if (popoverOpen || pinnedRef.current || openTimerRef.current !== null) return;
		popoverOpenReasonRef.current = "pointer";
		openTimerRef.current = window.setTimeout(() => {
			openTimerRef.current = null;
			setPopoverOpen(true);
		}, TOKEN_POPOVER_OPEN_DELAY_MS);
	}, [clearCloseTimer, popoverOpen]);
	const scheduleClosePopover = (0, import_react.useCallback)(() => {
		if (pinnedRef.current) return;
		clearOpenTimer();
		clearCloseTimer();
		closeTimerRef.current = window.setTimeout(() => {
			if (pinnedRef.current) {
				closeTimerRef.current = null;
				return;
			}
			setPopoverOpen(false);
			closeTimerRef.current = null;
		}, TOKEN_POPOVER_CLOSE_DELAY_MS);
	}, [clearCloseTimer, clearOpenTimer]);
	const markPointerOpenReason = (0, import_react.useCallback)(() => {
		if (pinOnClick) {
			pinPopover();
			return;
		}
		popoverOpenReasonRef.current = "pointer";
	}, [pinOnClick, pinPopover]);
	const handlePopoverOpenChange = (0, import_react.useCallback)((open) => {
		if (open) {
			if (pinOnClick && (pinnedRef.current || popoverOpenReasonRef.current === "pinned")) {
				pinPopover();
				return;
			}
			if (popoverOpenReasonRef.current !== "keyboard" && popoverOpenReasonRef.current !== "pinned") popoverOpenReasonRef.current = "pointer";
			clearOpenTimer();
			clearCloseTimer();
			setPopoverOpen(true);
			return;
		}
		closePopover();
	}, [
		clearCloseTimer,
		clearOpenTimer,
		closePopover,
		pinOnClick,
		pinPopover
	]);
	const handlePopoverOpenAutoFocus = (0, import_react.useCallback)((event) => {
		if (popoverOpenReasonRef.current !== "keyboard" && popoverOpenReasonRef.current !== "pinned") event.preventDefault();
	}, []);
	const handlePopoverCloseAutoFocus = (0, import_react.useCallback)((event) => {
		event.preventDefault();
	}, []);
	const isFocusWithinPopover = (0, import_react.useCallback)((target) => {
		if (!(target instanceof Node)) return false;
		return Boolean(triggerRef.current?.contains(target) || contentRef.current?.contains(target));
	}, []);
	const handleTriggerBlur = (0, import_react.useCallback)((event) => {
		if (pinnedRef.current || isFocusWithinPopover(event.relatedTarget)) return;
		scheduleClosePopover();
	}, [isFocusWithinPopover, scheduleClosePopover]);
	const handleContentBlur = (0, import_react.useCallback)((event) => {
		if (pinnedRef.current || isFocusWithinPopover(event.relatedTarget)) return;
		scheduleClosePopover();
	}, [isFocusWithinPopover, scheduleClosePopover]);
	const handleTriggerKeyDown = (0, import_react.useCallback)((event) => {
		if (event.target?.closest("[data-composer-token-remove]")) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			event.stopPropagation();
			if (onActivate) {
				closePopover();
				onActivate();
			} else if (pinOnClick) pinPopover();
			else openPopover("keyboard");
			return;
		}
		if (event.key === "Escape") {
			event.preventDefault();
			event.stopPropagation();
			closePopover();
		}
	}, [
		closePopover,
		onActivate,
		openPopover,
		pinOnClick,
		pinPopover
	]);
	const handleTriggerClick = (0, import_react.useCallback)((event) => {
		if (event.target?.closest("[data-composer-token-remove]")) return;
		if (onActivate) {
			stopTokenActionEvent(event);
			closePopover();
			onActivate();
			return;
		}
		if (!pinOnClick) return;
		stopTokenActionEvent(event);
		pinPopover();
	}, [
		closePopover,
		onActivate,
		pinOnClick,
		pinPopover
	]);
	const handleContentPointerDown = (0, import_react.useCallback)((event) => {
		event.stopPropagation();
		if (pinOnClick) pinPopover();
	}, [pinOnClick, pinPopover]);
	const handleInteractOutside = (0, import_react.useCallback)((event) => {
		const target = event.target;
		if (target instanceof Node && isFocusWithinPopover(target)) {
			event.preventDefault();
			return;
		}
		if (pinOnClick) closePopover();
	}, [
		closePopover,
		isFocusWithinPopover,
		pinOnClick
	]);
	(0, import_react.useEffect)(() => {
		if (!pinned) return;
		const dismissIfOutside = (event) => {
			const target = event.target;
			if (!(target instanceof Node)) return;
			if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) return;
			closePopover();
		};
		document.addEventListener("pointerdown", dismissIfOutside, true);
		return () => document.removeEventListener("pointerdown", dismissIfOutside, true);
	}, [closePopover, pinned]);
	(0, import_react.useEffect)(() => () => {
		clearOpenTimer();
		clearCloseTimer();
	}, [clearCloseTimer, clearOpenTimer]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open: popoverOpen,
		onOpenChange: handlePopoverOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "chat.composer-token-hover-popover.button",
				ref: triggerRef,
				className: "group inline align-baseline outline-none",
				role: "button",
				tabIndex: 0,
				"aria-label": ariaLabel,
				"aria-pressed": pinOnClick ? pinned : void 0,
				"data-composer-popover-pinned": pinOnClick ? String(pinned) : void 0,
				onMouseEnter: scheduleOpenPopover,
				onMouseLeave: scheduleClosePopover,
				onMouseMove: scheduleOpenPopover,
				onPointerDown: markPointerOpenReason,
				onClick: handleTriggerClick,
				onBlur: handleTriggerBlur,
				onKeyDownCapture: handleTriggerKeyDown,
				children: trigger
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			ref: contentRef,
			side: "top",
			align: "start",
			sideOffset: 8,
			className: cn("w-fit max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl p-0 shadow-xl", contentClassName),
			onMouseEnter: openPointerPopover,
			onMouseLeave: scheduleClosePopover,
			onPointerDown: handleContentPointerDown,
			onMouseDown: handleContentPointerDown,
			onFocus: clearCloseTimer,
			onBlur: handleContentBlur,
			onOpenAutoFocus: handlePopoverOpenAutoFocus,
			onCloseAutoFocus: handlePopoverCloseAutoFocus,
			onInteractOutside: handleInteractOutside,
			onFocusOutside: handleInteractOutside,
			onPointerDownOutside: handleInteractOutside,
			children: typeof content === "function" ? content({ closePopover }) : content
		})]
	});
}
function FileComposerToken(props) {
	const { imageIconPreview = false, onRemove, removeLabel: removeLabelProp, tooltipActions } = props;
	const tokenFile = isComposerAttachment(props.token.payload) ? props.token.payload : void 0;
	const previewFileType = props.readOnlyFilePreview?.mediaType?.startsWith("image/") ? FILE_TYPE.IMAGE : void 0;
	const file = props.readOnlyFilePreview ? {
		...tokenFile,
		...!tokenFile?.type && previewFileType && { type: previewFileType },
		...props.readOnlyFilePreview.composerFileKind && { composerFileKind: props.readOnlyFilePreview.composerFileKind }
	} : tokenFile;
	const label = file?.origin_name || file?.name || props.token.label;
	const presentation = getFileTokenPresentation(file, label, props.readOnlyFilePreview?.mediaType?.startsWith("image/") ? props.readOnlyFilePreview.url : void 0);
	const openImagePreview = (0, import_react.useCallback)(() => {
		if (!presentation.previewUrl) return;
		ImagePreviewService.show(presentation.previewUrl);
	}, [presentation.previewUrl]);
	const title = props.token.description ?? props.token.promptText ?? label;
	const accessibleTitle = props.readOnly ? label : title;
	const removeLabel = removeLabelProp ?? "Remove";
	const shouldShowPopover = shouldShowFileTokenPopover(file) && (!props.readOnly || Boolean(props.readOnlyFilePreview?.url));
	const pathTooltipPath = props.readOnly ? getReadOnlyFilePreviewPath(props.readOnlyFilePreview) : file?.path;
	const shouldShowPathTooltip = Boolean(pathTooltipPath) && !shouldShowFileTokenPopover(file);
	const shouldUseNeutralImageIcon = imageIconPreview && presentation.variant === "image";
	const tokenIcon = props.token.icon ? props.token.icon : shouldUseNeutralImageIcon && !isSvgFile(file, label) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTokenImageIcon, {
		previewUrl: presentation.previewUrl,
		fallbackIcon: presentation.icon
	}) : presentation.icon;
	const chipElement = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.file-composer-token",
		className: cn("group/composer-token mx-0.5 my-0.5 inline-flex h-6 max-w-[calc(100%_-_0.25rem)] select-none items-center gap-1 overflow-hidden rounded-md border px-1.5 align-middle font-medium text-foreground text-xs leading-[inherit] transition-[color,box-shadow,border-color]", "group-focus-visible:border-primary", props.readOnly && "focus-visible:border-primary focus-visible:outline-none", presentation.containerClassName, props.selected && "border-primary ring-1 ring-primary/40", props.className),
		title: props.readOnly || shouldShowPathTooltip ? void 0 : title,
		"data-composer-token-kind": props.token.kind,
		"data-file-token-variant": presentation.variant,
		onMouseDown: props.onMouseDown,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("inline-flex size-4.5 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border-0 leading-none", shouldUseNeutralImageIcon ? "bg-accent text-muted-foreground" : presentation.iconClassName),
			"data-file-token-icon": presentation.variant,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenIconSlot, {
				icon: tokenIcon,
				removeLabel,
				onRemove,
				slotClassName: "size-full items-center justify-center",
				removeButtonClassName: "size-full rounded-[5px] bg-muted text-foreground",
				removeIconClassName: "size-3"
			})
		}), props.children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("whitespace-nowrap! min-w-0 max-w-full truncate break-normal", props.maxWidthClassName),
			children: label
		})]
	});
	if (pathTooltipPath && shouldShowPathTooltip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenPathTooltipContent, {
			path: pathTooltipPath,
			sizeLabel: typeof file?.size === "number" && file.size > 0 ? formatFileSize(file.size) : void 0
		}),
		side: "top",
		sideOffset: 6,
		delayDuration: TOKEN_TOOLTIP_DELAY_MS,
		triggerProps: props.readOnly ? {
			tabIndex: 0,
			"aria-label": accessibleTitle
		} : void 0,
		children: chipElement
	});
	if (props.readOnly && !shouldShowPopover) {
		const sizeLabel = typeof file?.size === "number" && file.size > 0 ? formatFileSize(file.size) : void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenPathTooltipContent, {
				path: label,
				sizeLabel: [presentation.typeLabel, sizeLabel].filter(Boolean).join(" · ")
			}),
			side: "top",
			sideOffset: 6,
			delayDuration: TOKEN_TOOLTIP_DELAY_MS,
			triggerProps: {
				tabIndex: 0,
				"aria-label": accessibleTitle
			},
			children: chipElement
		});
	}
	if (!shouldShowPopover) return chipElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerTokenHoverPopover, {
		trigger: chipElement,
		ariaLabel: accessibleTitle,
		contentClassName: presentation.previewUrl ? "rounded-lg border-0 bg-transparent" : void 0,
		onActivate: presentation.previewUrl ? openImagePreview : void 0,
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTokenPreviewCard, {
			file,
			label,
			presentation,
			readOnlyFilePreview: props.readOnlyFilePreview,
			secondaryAction: tooltipActions
		})
	});
}
function FolderComposerToken(props) {
	const title = props.token.promptText ?? props.token.description ?? props.token.label;
	const path = props.token.promptText ?? props.token.description;
	const removeLabel = props.removeLabel ?? "Remove";
	const chipElement = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.folder-composer-token",
		className: cn("group/composer-token mx-0.5 my-0.5 inline-flex h-6 max-w-[calc(100%_-_0.25rem)] select-none items-center gap-1 overflow-hidden rounded-md border px-1.5 align-baseline font-medium text-foreground text-xs leading-[inherit] transition-[color,box-shadow,border-color]", "group-focus-visible:border-primary", props.readOnly && "focus-visible:border-primary focus-visible:outline-none", "border-border bg-background hover:bg-accent", props.selected && "border-primary ring-1 ring-primary/40", props.className),
		title: path ? void 0 : title,
		"data-composer-token-kind": props.token.kind,
		onMouseDown: props.onMouseDown,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border-0 bg-accent text-muted-foreground leading-none",
			"data-folder-token-icon": "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenIconSlot, {
				icon: props.token.icon ? props.token.icon : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
					className: tokenIconClassName,
					"aria-hidden": true
				}),
				removeLabel,
				onRemove: props.onRemove,
				removeButtonClassName: "size-full rounded-[5px]",
				removeIconClassName: "size-3"
			})
		}), props.children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("whitespace-nowrap! min-w-0 max-w-full truncate break-normal", props.maxWidthClassName),
			children: props.token.label
		})]
	});
	if (!path) return chipElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenPathTooltipContent, { path }),
		side: "top",
		sideOffset: 6,
		delayDuration: 300,
		triggerProps: props.readOnly ? {
			tabIndex: 0,
			"aria-label": props.token.label
		} : void 0,
		children: chipElement
	});
}
function KnowledgeComposerToken(props) {
	return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.knowledge
	});
}
function ReferenceComposerToken(props) {
	return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.reference
	});
}
function QuoteComposerToken(props) {
	const quoteTooltipContent = getQuoteTooltipContent(props.token.description, props.token.promptText);
	const tokenElement = renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.quote
	});
	if (!quoteTooltipContent) return tokenElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: QUOTE_TOOLTIP_BODY_CLASS_NAME,
			children: quoteTooltipContent
		}),
		side: "top",
		sideOffset: 6,
		delayDuration: 300,
		showArrow: false,
		contentProps: { className: QUOTE_TOOLTIP_CONTENT_CLASS_NAME },
		triggerProps: props.readOnly ? {
			tabIndex: 0,
			"aria-label": props.token.label
		} : void 0,
		children: tokenElement
	});
}
function PromptVariableComposerToken(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveComposerToken, {
		...props,
		icon: tokenIconByKind.promptVariable,
		colorClassName: "text-info"
	});
}
function PipelineNodeComposerToken(props) {
	const node = usePipelineNodeCatalogItem(readPipelineNodeTokenPayload(props.token).nodeId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerTokenHoverPopover, {
		trigger: renderActiveComposerTokenElement({
			...props,
			icon: tokenIconByKind.pipelineNode,
			colorClassName: "text-primary"
		}),
		ariaLabel: props.token.label,
		pinOnClick: true,
		pinKey: props.token.id,
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineNodeParamForm, {
			token: props.token,
			node,
			disabled: props.readOnly || !props.onPipelineNodeValuesChange,
			onValuesChange: props.readOnly ? void 0 : props.onPipelineNodeValuesChange
		})
	});
}
const composerInputTokenComponentByKind = {
	skill: SkillComposerToken,
	link: LinkComposerToken,
	file: FileComposerToken,
	folder: FolderComposerToken,
	knowledge: KnowledgeComposerToken,
	reference: ReferenceComposerToken,
	quote: QuoteComposerToken,
	pipelineNode: PipelineNodeComposerToken,
	promptVariable: PromptVariableComposerToken
};
function ComposerToken(props) {
	const TokenComponent = composerInputTokenComponentByKind[props.token.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenComponent, { ...props });
}
export { readPipelineNodeTokenPayload as C, withPipelineNodeValues as E, pipelineSlashQuickPanelFields as S, resolvePipelineNodeIdForAttachments as T, pipelineAssetFileUrl as _, normalizeQuoteTokenPromptText as a, pipelineNodeToComposerToken as b, DEFAULT_PIPELINE_API_BASE as c, findPipelineImageModelChoice as d, findPipelineNode as f, pickFeaturedPipelinePresets as g, parsePipelineNodeQuery as h, formatQuoteTokenPromptText as i, classifyPipelineNode as l, groupPipelineNodesByCategory as m, FileComposerToken as n, usePipelineModelPresets as o, getPipelineNodeFormFields as p, createComposerLinkToken as r, usePipelineNodeCatalog as s, ComposerToken as t, collectPipelineNodeFilterTags as u, pipelineImageModelChoiceValue as v, resolvePipelineApiBase as w, pipelinePresetSlashQuickPanelFields as x, pipelineImageModelChoices as y };
