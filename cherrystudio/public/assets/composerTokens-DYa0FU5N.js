import { a as getComposerFileTokenSourceId, t as composerFileTokenIdFromSourceId } from "./composerFileTokenSource-CsEu7TtB.js";
var IMAGE_EXT = /\.(png|jpe?g|webp|gif|bmp|tif|tiff|exr|hdr)(\?|#|$)/i;
var MODEL_EXT = /\.(glb|gltf|fbx|obj|stl|usd|usda|usdc)(\?|#|$)/i;
var VIDEO_EXT = /\.(mp4|mov|webm|mkv)(\?|#|$)/i;
function readString(...values) {
	for (const value of values) if (typeof value === "string" && value.trim()) return value.trim();
	return "";
}
function guessCocoSessionAssetKind(name, assetType = "") {
	const hint = `${name} ${assetType}`.toLowerCase();
	if (MODEL_EXT.test(name) || hint.includes("gltf") || hint.includes("geometry") || hint.includes("model/")) return "model";
	if (IMAGE_EXT.test(name) || hint.includes("media/image") || hint.includes("/image")) return "image";
	if (VIDEO_EXT.test(name) || hint.includes("media/video")) return "video";
	return "other";
}
function captionForCocoUpload(name) {
	return `上传 · ${name}`;
}
function captionForCocoGenerated(options) {
	const workflow = options.workflowId || "canvas";
	let kindLabel = options.kind === "model" ? "3D" : options.kind === "image" ? "生图" : options.kind === "video" ? "视频" : "生成";
	if (options.kind === "model" && /3d/i.test(workflow)) kindLabel = "图生3D";
	const parts = [kindLabel, workflow];
	if (options.sourceName) parts.push(`来源 ${options.sourceName}`);
	else if (options.name) parts.push(options.name);
	return parts.join(" · ");
}
function normalizeCocoSessionAsset(raw) {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
	const row = raw;
	const assetId = readString(row.assetId, row.asset_id, row.id);
	if (!assetId) return null;
	const name = readString(row.name, row.filename) || assetId;
	const kindRaw = readString(row.kind);
	const kind = kindRaw === "image" || kindRaw === "model" || kindRaw === "video" || kindRaw === "other" ? kindRaw : guessCocoSessionAssetKind(name, readString(row.assetType, row.asset_type));
	const origin = row.origin === "upload" ? "upload" : "generated";
	const asset = {
		assetId,
		name,
		kind,
		origin,
		caption: readString(row.caption) || (origin === "upload" ? captionForCocoUpload(name) : captionForCocoGenerated({
			name,
			kind,
			workflowId: readString(row.workflowId, row.workflow_id)
		}))
	};
	const runId = readString(row.runId, row.run_id);
	const workflowId = readString(row.workflowId, row.workflow_id);
	const sourceNodeId = readString(row.sourceNodeId, row.source_node_id);
	const parentAssetId = readString(row.parentAssetId, row.parent_id);
	const previewUrl = readString(row.previewUrl, row.preview_url);
	const createdAt = row.createdAt ?? row.created_at;
	if (runId) asset.runId = runId;
	if (workflowId) asset.workflowId = workflowId;
	if (sourceNodeId) asset.sourceNodeId = sourceNodeId;
	if (parentAssetId) asset.parentAssetId = parentAssetId;
	if (previewUrl) asset.previewUrl = previewUrl;
	if (typeof createdAt === "string" || typeof createdAt === "number") asset.createdAt = createdAt;
	const sizeBytes = readSize(row.sizeBytes, row.size_bytes);
	if (sizeBytes != null) asset.sizeBytes = sizeBytes;
	const assetType = readString(row.assetType, row.asset_type);
	if (assetType) asset.assetType = assetType;
	return asset;
}
function readSize(...values) {
	for (const value of values) {
		if (typeof value === "number" && Number.isFinite(value) && value >= 0) return Math.round(value);
		if (typeof value === "string" && /^\d+$/.test(value.trim())) return Number(value.trim());
	}
}
function mergeCocoSessionAssets(...groups) {
	const order = [];
	const byId = /* @__PURE__ */ new Map();
	for (const group of groups) {
		if (!Array.isArray(group)) continue;
		for (const item of group) {
			const entry = normalizeCocoSessionAsset(item);
			if (!entry) continue;
			const existing = byId.get(entry.assetId);
			if (existing) {
				const row = item && typeof item === "object" && !Array.isArray(item) ? item : {};
				const next = {
					...existing,
					...entry
				};
				if (!readString(row.caption)) next.caption = existing.caption;
				if (!readString(row.workflowId, row.workflow_id) && existing.workflowId) next.workflowId = existing.workflowId;
				if (!readString(row.parentAssetId, row.parent_id) && existing.parentAssetId) next.parentAssetId = existing.parentAssetId;
				if (existing.sizeBytes != null && next.sizeBytes == null) next.sizeBytes = existing.sizeBytes;
				byId.set(entry.assetId, next);
			} else {
				byId.set(entry.assetId, entry);
				order.push(entry.assetId);
			}
		}
	}
	return order.map((id) => byId.get(id)).filter(Boolean);
}
function cocoSessionAssetPromptText(asset) {
	return `[本轮用户附件 ${asset.name} asset_id=${asset.assetId}]`;
}
function filterCocoSessionAssets(assets, query) {
	const needle = query.trim().toLowerCase();
	if (!needle) return [...assets];
	return assets.filter((asset) => `${asset.name} ${asset.caption} ${asset.assetId} ${asset.origin}`.toLowerCase().includes(needle));
}
function readCocoSessionAssets(configuration, sessionId) {
	if (!configuration || typeof configuration !== "object" || !sessionId) return [];
	const bindings = configuration.coco_pipeline_sessions;
	if (!bindings || typeof bindings !== "object" || Array.isArray(bindings)) return [];
	const binding = bindings[sessionId];
	if (!binding || typeof binding !== "object" || Array.isArray(binding)) return [];
	return mergeCocoSessionAssets(binding.assets);
}
const composerFileTokenId = (file) => {
	const sourceId = getComposerFileTokenSourceId(file);
	if (!sourceId) throw new Error("fileTokenSourceId is required to create a composer file token id");
	return composerFileTokenIdFromSourceId(sourceId);
};
const composerKnowledgeBaseTokenId = (base) => `knowledge:${base.id}`;
function fileToComposerToken(file) {
	return {
		id: composerFileTokenId(file),
		kind: "file",
		label: file.origin_name || file.name,
		payload: file,
		...file.pipelineAssetId ? { promptText: cocoSessionAssetPromptText({
			assetId: file.pipelineAssetId,
			name: file.origin_name || file.name
		}) } : {}
	};
}
function knowledgeBaseToComposerToken(base) {
	return {
		id: composerKnowledgeBaseTokenId(base),
		kind: "knowledge",
		label: base.name,
		promptText: `The user attached knowledge base "${base.name}" (id: ${base.id}) — use that id with the kb_* tools.`,
		payload: base
	};
}
function getComposerTokenIds(tokens, kind) {
	return new Set(tokens.filter((token) => !kind || token.kind === kind).map((token) => token.id));
}
export { knowledgeBaseToComposerToken as a, mergeCocoSessionAssets as c, getComposerTokenIds as i, readCocoSessionAssets as l, composerKnowledgeBaseTokenId as n, cocoSessionAssetPromptText as o, fileToComposerToken as r, filterCocoSessionAssets as s, composerFileTokenId as t };
