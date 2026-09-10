import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as EmptyState$1 } from "./empty-state-IUSabDcM.js";
import { t as Skeleton } from "./skeleton-1lc_hVho.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { i as hasClearContextPart } from "./uiParts-ClY38h-2.js";
function actionsToCommandMenuExtraItems(actions, runAction) {
	const items = [];
	let previousGroup;
	for (const action of actions) {
		if (!action.availability.visible) continue;
		if (items.length > 0 && action.group !== previousGroup) items.push({ type: "separator" });
		previousGroup = action.group;
		if (action.children.length > 0) {
			items.push({
				type: "submenu",
				id: action.id,
				label: action.label,
				icon: action.icon,
				description: action.availability.reason,
				enabled: action.availability.enabled,
				children: actionsToCommandMenuExtraItems(action.children, runAction)
			});
			continue;
		}
		items.push({
			type: "item",
			id: action.id,
			label: action.label,
			icon: action.icon,
			description: action.availability.reason,
			enabled: action.availability.enabled,
			destructive: action.danger,
			shortcutLabel: action.shortcut,
			onSelect: () => runAction(action)
		});
	}
	return items;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function EmptyState({ actions, className, compact = false, description, icon: Icon, iconClassName, iconSize, iconStrokeWidth, id, title, ...props }) {
	if (!actions && !iconClassName && !iconSize && !iconStrokeWidth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState$1, {
		className,
		compact,
		description,
		icon: Icon,
		title,
		...props
	});
	if (!Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.empty-state.chat-empty-state part:chat-empty-state",
		id,
		"data-slot": "chat-empty-state",
		className: cn("flex h-full w-full flex-col items-center justify-center gap-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState$1, {
			compact,
			description,
			title,
			...props
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-3",
			children: actions
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.empty-state.chat-empty-state part:chat-empty-state",
		id,
		"data-slot": "chat-empty-state",
		className: cn("flex h-full w-full flex-col items-center justify-center gap-4 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: iconSize ?? (compact ? 40 : 56),
				strokeWidth: iconStrokeWidth,
				className: cn("text-muted-foreground", iconClassName)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2",
				children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "m-0 font-medium text-base text-foreground",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 max-w-xs text-muted-foreground text-sm",
					children: description
				})]
			}),
			actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-3",
				children: actions
			})
		]
	});
}
function LoadingState({ className, description, label, rows = 3, variant = "spinner", ...props }) {
	if (variant === "skeleton") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.loading-state.chat-loading-state part:chat-loading-state",
		"data-slot": "chat-loading-state",
		role: "status",
		"aria-live": "polite",
		className: cn("space-y-2", className),
		...mergeUiProps(props, "chat.loading-state.chat-loading-state part:chat-loading-state"),
		children: Array.from({ length: rows }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-4", index === rows - 1 ? "w-2/3" : "w-full") }, index))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.loading-state.chat-loading-state part:chat-loading-state",
		"data-slot": "chat-loading-state",
		role: "status",
		"aria-live": "polite",
		className: cn("flex min-w-0 items-center gap-2 text-muted-foreground text-sm", className),
		...mergeUiProps(props, "chat.loading-state.chat-loading-state part:chat-loading-state"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 animate-spin" }), (label || description) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-foreground",
				children: label
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-muted-foreground text-xs",
				children: description
			})]
		})]
	});
}
var LIVE_PREVIEW_LENGTH = 160;
function truncateLivePreview(text) {
	return text.length > LIVE_PREVIEW_LENGTH ? `${text.substring(0, LIVE_PREVIEW_LENGTH)}...` : text;
}
function getStringField(value, key) {
	if (!value || typeof value !== "object") return void 0;
	const field = value[key];
	return typeof field === "string" ? field : void 0;
}
function getObjectField(value, key) {
	if (!value || typeof value !== "object") return void 0;
	const field = value[key];
	return field && typeof field === "object" ? field : void 0;
}
function extractTopicMessageFlowLivePreview(parts) {
	for (const part of parts) {
		const data = getObjectField(part, "data");
		const preview = (part.type === "text" ? getStringField(part, "text") : ["data-code", "data-translation"].includes(part.type) ? getStringField(data, "content") : part.type === "data-compact" ? getStringField(data, "content") ?? getStringField(data, "compactedContent") : part.type === "data-error" ? getStringField(data, "message") : void 0)?.trim();
		if (preview) return truncateLivePreview(preview);
	}
	return "";
}
function buildTopicMessageFlowLiveState({ topicId, messages, partsByMessageId, activeNodeId, streamingMessageIds }) {
	const nodes = messages.flatMap((message) => {
		const metadata = message.metadata ?? {};
		const parentId = metadata.parentId;
		if (parentId == null) return [];
		const parts = partsByMessageId[message.id] ?? message.parts ?? [];
		const createdAt = metadata.createdAt ?? (/* @__PURE__ */ new Date()).toISOString();
		const isStreamingMessage = streamingMessageIds?.has(message.id) ?? false;
		const fallbackStatus = message.role === "assistant" && parts.length === 0 ? "pending" : "success";
		return [{
			id: message.id,
			parentId,
			role: message.role === "system" ? "assistant" : message.role,
			isContextBoundary: hasClearContextPart(parts) || void 0,
			preview: extractTopicMessageFlowLivePreview(parts),
			modelId: metadata.modelId ?? null,
			status: isStreamingMessage ? "pending" : metadata.status ?? fallbackStatus,
			createdAt,
			...metadata.siblingsGroupId ? { siblingsGroupId: metadata.siblingsGroupId } : {}
		}];
	});
	if (nodes.length === 0) return null;
	return {
		topicId,
		activeNodeId: activeNodeId ?? nodes.at(-1)?.id ?? null,
		nodes
	};
}
function toTreeNode(node, existing) {
	return {
		id: node.id,
		parentId: node.parentId,
		role: node.role,
		isContextBoundary: node.isContextBoundary ?? existing?.isContextBoundary,
		preview: node.preview || existing?.preview || "",
		modelId: node.modelId ?? existing?.modelId ?? null,
		status: node.status,
		createdAt: node.createdAt,
		hasChildren: existing?.hasChildren ?? false
	};
}
function compareTreeNodeOrder(a, b) {
	return a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id);
}
function groupKey(parentId, siblingsGroupId) {
	return `${parentId ?? "root"}:${siblingsGroupId}`;
}
function mergeTopicMessageFlowLiveTree(tree, liveState) {
	if (!liveState) return tree;
	const regularNodes = /* @__PURE__ */ new Map();
	const siblingGroups = /* @__PURE__ */ new Map();
	const existingTreeNodes = /* @__PURE__ */ new Map();
	const groupedNodeIds = /* @__PURE__ */ new Set();
	for (const node of tree.nodes) {
		regularNodes.set(node.id, node);
		existingTreeNodes.set(node.id, node);
	}
	for (const group of tree.siblingsGroups) {
		const key = groupKey(group.parentId, group.siblingsGroupId);
		siblingGroups.set(key, {
			parentId: group.parentId,
			siblingsGroupId: group.siblingsGroupId,
			nodes: group.nodes.slice()
		});
		for (const node of group.nodes) {
			existingTreeNodes.set(node.id, {
				...node,
				parentId: group.parentId
			});
			groupedNodeIds.add(node.id);
		}
	}
	for (const liveNode of liveState.nodes) {
		const existing = existingTreeNodes.get(liveNode.id);
		if (liveNode.siblingsGroupId && liveNode.siblingsGroupId !== 0) {
			regularNodes.delete(liveNode.id);
			const key = groupKey(liveNode.parentId, liveNode.siblingsGroupId);
			const group = siblingGroups.get(key) ?? {
				parentId: liveNode.parentId,
				siblingsGroupId: liveNode.siblingsGroupId,
				nodes: []
			};
			const nextNode = toTreeNode(liveNode, existing);
			const existingIndex = group.nodes.findIndex((node) => node.id === liveNode.id);
			group.nodes = existingIndex === -1 ? [...group.nodes, nextNode].sort(compareTreeNodeOrder) : group.nodes.map((node, index) => index === existingIndex ? nextNode : node);
			siblingGroups.set(key, group);
			groupedNodeIds.add(liveNode.id);
			continue;
		}
		regularNodes.set(liveNode.id, toTreeNode(liveNode, existing));
	}
	const childParentIds = /* @__PURE__ */ new Set();
	for (const node of regularNodes.values()) if (node.parentId) childParentIds.add(node.parentId);
	for (const group of siblingGroups.values()) if (group.parentId) childParentIds.add(group.parentId);
	return {
		activeNodeId: liveState.activeNodeId ?? tree.activeNodeId,
		rootId: tree.rootId,
		nodes: Array.from(regularNodes.values()).filter((node) => !groupedNodeIds.has(node.id)).map((node) => ({
			...node,
			hasChildren: node.hasChildren || childParentIds.has(node.id)
		})),
		siblingsGroups: Array.from(siblingGroups.values()).map((group) => ({
			...group,
			nodes: group.nodes.map((node) => ({
				...node,
				hasChildren: node.hasChildren || childParentIds.has(node.id)
			})).sort(compareTreeNodeOrder)
		}))
	};
}
export { actionsToCommandMenuExtraItems as a, EmptyState as i, mergeTopicMessageFlowLiveTree as n, LoadingState as r, buildTopicMessageFlowLiveState as t };
