import { s as __toESM } from "./chunk-DiqNceaa.js";
import { o as cacheService } from "./useCache-SsOQx-L2.js";
import { t as require_dayjs_min } from "./dayjs.min-CNu3tPBh.js";
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
const GLOBAL_SEARCH_MESSAGE_PREVIEW_LIMIT = 5;
var FILTER_TYPES = {
	all: [
		"topic",
		"session",
		"assistant",
		"agent",
		"knowledge-base"
	],
	topic: ["topic"],
	session: ["session"],
	assistant: ["assistant"],
	agent: ["agent"],
	knowledge: ["knowledge-base"]
};
var INTERNAL_ROUTE_PREFIXES = ["/app/", "/settings"];
var COARSE_ENTITY_ROUTE_PATHS = new Set(["/app/chat", "/app/agents"]);
var LEGACY_ROUTE_PATHS = new Set(["/app/library"]);
function getGlobalSearchTypes(filter) {
	return FILTER_TYPES[filter];
}
function getMessageSearchSources(filter) {
	switch (filter) {
		case "topic": return ["topic"];
		case "session": return ["session"];
		case "all": return ["topic", "session"];
	}
}
function getGlobalSearchRecentEntryId(entry) {
	switch (entry.kind) {
		case "route": return `route:${entry.url}`;
		case "topic": return `topic:${entry.topicId}`;
		case "session": return `session:${entry.sessionId}`;
	}
}
function areGlobalSearchRecentEntriesEqual(a, b) {
	if (a.kind !== b.kind || a.title !== b.title || a.lastAccessTime !== b.lastAccessTime) return false;
	switch (a.kind) {
		case "route": return b.kind === "route" && a.url === b.url && a.icon === b.icon;
		case "topic": return b.kind === "topic" && a.topicId === b.topicId;
		case "session": return b.kind === "session" && a.sessionId === b.sessionId;
	}
}
function getRoutePathname(url) {
	return new URL(url, "https://www.cherry-ai.com").pathname;
}
function isLegacyRouteRecentEntry(entry) {
	return entry.kind === "route" && LEGACY_ROUTE_PATHS.has(getRoutePathname(entry.url));
}
function sanitizeGlobalSearchRecentEntries(entries) {
	const next = entries.filter((entry) => !isLegacyRouteRecentEntry(entry));
	return next.length === entries.length ? entries : next;
}
function upsertGlobalSearchRecentEntry(entries, entry) {
	const current = sanitizeGlobalSearchRecentEntries(entries);
	if (isLegacyRouteRecentEntry(entry)) return current;
	const entryId = getGlobalSearchRecentEntryId(entry);
	const next = [entry, ...current.filter((candidate) => getGlobalSearchRecentEntryId(candidate) !== entryId)].sort((a, b) => b.lastAccessTime - a.lastAccessTime).slice(0, 20);
	if (next.length === current.length && next.every((candidate, index) => {
		const previous = current[index];
		return previous && areGlobalSearchRecentEntriesEqual(previous, candidate);
	})) return current;
	return next;
}
function recordGlobalSearchRecentEntry(entry) {
	cacheService.setPersist("ui.global_search.recent_items", (prev) => upsertGlobalSearchRecentEntry(prev, entry));
}
function getDisplayGlobalSearchRecentEntries(entries) {
	return [...sanitizeGlobalSearchRecentEntries(entries)].sort((a, b) => b.lastAccessTime - a.lastAccessTime).slice(0, 6);
}
function createRecentRouteEntryFromTab(tab, lastAccessTime = tab.lastAccessTime) {
	if (tab.type !== "route") return null;
	if (!lastAccessTime) return null;
	const pathname = new URL(tab.url, "https://www.cherry-ai.com").pathname;
	if (LEGACY_ROUTE_PATHS.has(pathname)) return null;
	if (COARSE_ENTITY_ROUTE_PATHS.has(pathname)) return null;
	if (!INTERNAL_ROUTE_PREFIXES.some((prefix) => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix))) return null;
	return {
		kind: "route",
		url: tab.url,
		title: tab.title,
		icon: tab.icon,
		lastAccessTime
	};
}
function createRecentTopicEntryFromTopic(topic, lastAccessTime = Date.now()) {
	return {
		kind: "topic",
		topicId: topic.id,
		title: topic.name,
		lastAccessTime
	};
}
function createRecentSessionEntryFromSession(session, lastAccessTime = Date.now()) {
	return {
		kind: "session",
		sessionId: session.id,
		title: session.name,
		lastAccessTime
	};
}
function getMessageResultParentId(result) {
	return result.sourceType === "topic" ? `topic:${result.topicId}` : `session:${result.sessionId}`;
}
function buildGlobalMessagePreviewItems(items) {
	const totalByParentId = /* @__PURE__ */ new Map();
	for (const item of items) {
		const parentId = getMessageResultParentId(item);
		totalByParentId.set(parentId, (totalByParentId.get(parentId) ?? 0) + 1);
	}
	const visibleItems = items.slice(0, 5);
	const groups = buildGlobalMessageSearchGroups({
		expandedParentIds: new Set(visibleItems.map(getMessageResultParentId)),
		items: visibleItems
	});
	const previewItems = [];
	let remainingCount = 5;
	for (const group of groups) {
		const messageItems = group.items.filter((item) => item.kind === "message").slice(0, remainingCount);
		if (messageItems.length === 0) continue;
		previewItems.push({
			kind: "message-parent",
			id: `message-parent:${group.id}`,
			group: {
				...group,
				total: totalByParentId.get(group.id) ?? group.total
			}
		});
		previewItems.push(...messageItems.map((item) => ({
			...item,
			id: `message-preview:${item.id}`
		})));
		remainingCount -= messageItems.length;
		if (remainingCount <= 0) break;
	}
	return previewItems;
}
function buildGlobalSearchGroups({ expandedGroupIds = /* @__PURE__ */ new Set(), messageItems = [], query, filter, recentItems, response }) {
	if (!query.trim()) {
		const panelItems = getDisplayGlobalSearchRecentEntries(recentItems).map((recent) => ({
			kind: "recent",
			id: getGlobalSearchRecentEntryId(recent),
			recent
		}));
		return panelItems.length > 0 ? [{
			id: "recent",
			items: panelItems
		}] : [];
	}
	const itemsByType = /* @__PURE__ */ new Map();
	for (const group of response?.groups ?? []) itemsByType.set(group.type, group.items);
	const groups = [];
	const includeTopic = filter === "all" || filter === "topic";
	const includeSession = filter === "all" || filter === "session";
	const includeAssistant = filter === "all" || filter === "assistant";
	const includeAgent = filter === "all" || filter === "agent";
	const includeKnowledge = filter === "all" || filter === "knowledge";
	const shouldCollapseEntityGroup = (groupId) => filter === "all" && (groupId === "topic" || groupId === "session") && !expandedGroupIds.has(groupId);
	const toPanelGroup = (groupId, items) => {
		if (!shouldCollapseEntityGroup(groupId) || items.length <= 5) return {
			id: groupId,
			items,
			total: items.length
		};
		return {
			id: groupId,
			items: items.slice(0, 5),
			total: items.length,
			footer: {
				kind: "expand-results",
				groupId,
				remainingCount: items.length - 5
			}
		};
	};
	if (includeTopic) {
		const topicItems = (itemsByType.get("topic") ?? []).map((result) => ({
			kind: "result",
			id: `${result.type}:${result.id}`,
			result
		}));
		if (topicItems.length > 0) groups.push(toPanelGroup("topic", topicItems));
	}
	if (includeSession) {
		const sessionItems = (itemsByType.get("session") ?? []).map((result) => ({
			kind: "result",
			id: `${result.type}:${result.id}`,
			result
		}));
		if (sessionItems.length > 0) groups.push(toPanelGroup("session", sessionItems));
	}
	if (filter === "all" && messageItems.length > 0) groups.push({
		id: "message",
		items: buildGlobalMessagePreviewItems(messageItems),
		total: messageItems.length,
		footer: { kind: "open-message-search" }
	});
	if (includeAssistant) {
		const items = (itemsByType.get("assistant") ?? []).map((result) => ({
			kind: "result",
			id: `${result.type}:${result.id}`,
			result
		}));
		if (items.length > 0) groups.push({
			id: "assistant",
			items
		});
	}
	if (includeAgent) {
		const items = (itemsByType.get("agent") ?? []).map((result) => ({
			kind: "result",
			id: `${result.type}:${result.id}`,
			result
		}));
		if (items.length > 0) groups.push({
			id: "agent",
			items
		});
	}
	if (includeKnowledge) {
		const items = (itemsByType.get("knowledge-base") ?? []).map((result) => ({
			kind: "result",
			id: `${result.type}:${result.id}`,
			result
		}));
		if (items.length > 0) groups.push({
			id: "knowledge-base",
			items
		});
	}
	return groups;
}
function buildGlobalMessageSearchGroups({ expandedParentIds, items }) {
	const groupsByParent = /* @__PURE__ */ new Map();
	for (const result of items) {
		const parentId = result.sourceType === "topic" ? `topic:${result.topicId}` : `session:${result.sessionId}`;
		const title = result.sourceType === "topic" ? result.topicName : result.sessionName;
		const group = groupsByParent.get(parentId);
		if (group) {
			group.results.push(result);
			continue;
		}
		groupsByParent.set(parentId, {
			sourceType: result.sourceType,
			title,
			results: [result]
		});
	}
	return Array.from(groupsByParent.entries()).map(([parentId, group]) => {
		const expanded = expandedParentIds.has(parentId);
		const orderedResults = [...group.results].sort((a, b) => {
			const timeA = (0, import_dayjs_min.default)(a.createdAt).valueOf() || 0;
			const timeB = (0, import_dayjs_min.default)(b.createdAt).valueOf() || 0;
			if (timeA !== timeB) return timeA - timeB;
			return a.messageId.localeCompare(b.messageId);
		});
		const visibleResults = expanded ? orderedResults : orderedResults.slice(0, 3);
		const items$1 = visibleResults.map((result) => ({
			kind: "message",
			id: `${parentId}:${result.messageId}`,
			parentId,
			result
		}));
		const remainingCount = group.results.length - visibleResults.length;
		if (remainingCount > 0) items$1.push({
			kind: "more",
			id: `${parentId}:more`,
			parentId,
			remainingCount
		});
		return {
			id: parentId,
			sourceType: group.sourceType,
			title: group.title,
			total: group.results.length,
			items: items$1
		};
	});
}
export { createRecentRouteEntryFromTab as a, getDisplayGlobalSearchRecentEntries as c, getMessageSearchSources as d, recordGlobalSearchRecentEntry as f, buildGlobalSearchGroups as i, getGlobalSearchRecentEntryId as l, areGlobalSearchRecentEntriesEqual as n, createRecentSessionEntryFromSession as o, sanitizeGlobalSearchRecentEntries as p, buildGlobalMessageSearchGroups as r, createRecentTopicEntryFromTopic as s, GLOBAL_SEARCH_MESSAGE_PREVIEW_LIMIT as t, getGlobalSearchTypes as u };
