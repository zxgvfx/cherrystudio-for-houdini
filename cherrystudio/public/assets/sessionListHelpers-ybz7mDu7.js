import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import { t as Database } from "./database-BH7QSANV.js";
import { t as ExternalLink } from "./external-link-DbtRIZ6f.js";
import { t as FileText } from "./file-text-CbEF-1I4.js";
import { t as Image } from "./image-BeLr77K8.js";
import { t as NotebookPen } from "./notebook-pen-rX2EzeJP.js";
import { t as PanelLeft } from "./panel-left-B-LS6g7C.js";
import { t as PinOff } from "./pin-off-mI8ozwb_.js";
import { t as Pin } from "./pin-CryR5xyJ.js";
import { t as Sparkles } from "./sparkles-C7lwKrP8.js";
import { t as Upload } from "./upload-1CuNrQbK.js";
import { n as OpenInNewWindowIcon } from "./WindowIcons-CiINgt8k.js";
import { a as compareResourceRecency, c as createTimeGroupResolver, d as sortRankedResourceItems, f as withResourceListGroupIdPrefix, i as compareResourceOrderKey, l as getResourceTimeBucket, m as createActionRegistry, n as buildResourceListGroupDropAnchor, o as composeResourceListGroupResolvers, r as buildResourceListItemDropAnchor, s as createPinnedGroupResolver, u as moveResourceListStringGroupAfterDrop } from "./EditNameDialog-DsUVseEz.js";
import { t as DeleteIcon_default } from "./DeleteIcon-D9JmQzhN.js";
import { t as EditIcon_default } from "./EditIcon-CarMu02a.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var sessionActionRegistry = createActionRegistry();
var hasExportOption = ({ exportMenuOptions, onExportImage, onExportJoplin, onExportMarkdown, onExportMarkdownReason, onExportNotion, onExportObsidian, onExportSiyuan, onExportWord, onExportYuque }) => exportMenuOptions?.image && !!onExportImage || exportMenuOptions?.markdown && !!onExportMarkdown || exportMenuOptions?.markdown_reason && !!onExportMarkdownReason || exportMenuOptions?.docx && !!onExportWord || exportMenuOptions?.notion && !!onExportNotion || exportMenuOptions?.yuque && !!onExportYuque || exportMenuOptions?.obsidian && !!onExportObsidian || exportMenuOptions?.joplin && !!onExportJoplin || exportMenuOptions?.siyuan && !!onExportSiyuan;
var hasCopyOption = ({ exportMenuOptions, onCopyImage, onCopyMarkdown, onCopyPlainText }) => !!onCopyMarkdown || !!exportMenuOptions?.image && !!onCopyImage || !!exportMenuOptions?.plain_text && !!onCopyPlainText;
sessionActionRegistry.registerCommand({
	id: "session.auto-rename",
	availability: ({ isRenaming, onAutoRename }) => ({
		visible: !!onAutoRename,
		enabled: !!onAutoRename && !isRenaming
	}),
	run: ({ onAutoRename }) => onAutoRename?.()
});
sessionActionRegistry.registerCommand({
	id: "session.rename",
	availability: ({ isRenaming }) => ({ enabled: !isRenaming }),
	run: ({ sessionName, startEdit }) => startEdit(sessionName)
});
sessionActionRegistry.registerCommand({
	id: "session.toggle-pin",
	availability: ({ onTogglePin }) => ({
		visible: !!onTogglePin,
		enabled: !!onTogglePin
	}),
	run: ({ onTogglePin }) => onTogglePin?.()
});
sessionActionRegistry.registerCommand({
	id: "session.open-in-new-tab",
	availability: ({ isActiveInCurrentTab, onOpenInNewTab }) => ({
		visible: !!onOpenInNewTab && !isActiveInCurrentTab,
		enabled: !!onOpenInNewTab && !isActiveInCurrentTab
	}),
	run: ({ onOpenInNewTab }) => onOpenInNewTab?.()
});
sessionActionRegistry.registerCommand({
	id: "session.open-in-new-window",
	availability: ({ onOpenInNewWindow }) => ({
		visible: !!onOpenInNewWindow,
		enabled: !!onOpenInNewWindow
	}),
	run: ({ onOpenInNewWindow }) => onOpenInNewWindow?.()
});
sessionActionRegistry.registerCommand({
	id: "session.save-notes",
	availability: ({ onSaveToNotes }) => ({
		visible: !!onSaveToNotes,
		enabled: !!onSaveToNotes
	}),
	run: ({ onSaveToNotes }) => onSaveToNotes?.()
});
sessionActionRegistry.registerCommand({
	id: "session.save-knowledge",
	availability: ({ onSaveToKnowledge }) => ({
		visible: !!onSaveToKnowledge,
		enabled: !!onSaveToKnowledge
	}),
	run: ({ onSaveToKnowledge }) => onSaveToKnowledge?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.image",
	availability: ({ exportMenuOptions, onExportImage }) => ({
		visible: !!exportMenuOptions?.image && !!onExportImage,
		enabled: !!exportMenuOptions?.image && !!onExportImage
	}),
	run: ({ onExportImage }) => onExportImage?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.markdown",
	availability: ({ exportMenuOptions, onExportMarkdown }) => ({
		visible: !!exportMenuOptions?.markdown && !!onExportMarkdown,
		enabled: !!exportMenuOptions?.markdown && !!onExportMarkdown
	}),
	run: ({ onExportMarkdown }) => onExportMarkdown?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.markdown-reason",
	availability: ({ exportMenuOptions, onExportMarkdownReason }) => ({
		visible: !!exportMenuOptions?.markdown_reason && !!onExportMarkdownReason,
		enabled: !!exportMenuOptions?.markdown_reason && !!onExportMarkdownReason
	}),
	run: ({ onExportMarkdownReason }) => onExportMarkdownReason?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.word",
	availability: ({ exportMenuOptions, onExportWord }) => ({
		visible: !!exportMenuOptions?.docx && !!onExportWord,
		enabled: !!exportMenuOptions?.docx && !!onExportWord
	}),
	run: ({ onExportWord }) => onExportWord?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.notion",
	availability: ({ exportMenuOptions, onExportNotion }) => ({
		visible: !!exportMenuOptions?.notion && !!onExportNotion,
		enabled: !!exportMenuOptions?.notion && !!onExportNotion
	}),
	run: ({ onExportNotion }) => onExportNotion?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.yuque",
	availability: ({ exportMenuOptions, onExportYuque }) => ({
		visible: !!exportMenuOptions?.yuque && !!onExportYuque,
		enabled: !!exportMenuOptions?.yuque && !!onExportYuque
	}),
	run: ({ onExportYuque }) => onExportYuque?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.obsidian",
	availability: ({ exportMenuOptions, onExportObsidian }) => ({
		visible: !!exportMenuOptions?.obsidian && !!onExportObsidian,
		enabled: !!exportMenuOptions?.obsidian && !!onExportObsidian
	}),
	run: ({ onExportObsidian }) => onExportObsidian?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.joplin",
	availability: ({ exportMenuOptions, onExportJoplin }) => ({
		visible: !!exportMenuOptions?.joplin && !!onExportJoplin,
		enabled: !!exportMenuOptions?.joplin && !!onExportJoplin
	}),
	run: ({ onExportJoplin }) => onExportJoplin?.()
});
sessionActionRegistry.registerCommand({
	id: "session.export.siyuan",
	availability: ({ exportMenuOptions, onExportSiyuan }) => ({
		visible: !!exportMenuOptions?.siyuan && !!onExportSiyuan,
		enabled: !!exportMenuOptions?.siyuan && !!onExportSiyuan
	}),
	run: ({ onExportSiyuan }) => onExportSiyuan?.()
});
sessionActionRegistry.registerCommand({
	id: "session.copy.image",
	availability: ({ exportMenuOptions, onCopyImage }) => ({
		visible: !!exportMenuOptions?.image && !!onCopyImage,
		enabled: !!exportMenuOptions?.image && !!onCopyImage
	}),
	run: ({ onCopyImage }) => onCopyImage?.()
});
sessionActionRegistry.registerCommand({
	id: "session.copy.markdown",
	availability: ({ onCopyMarkdown }) => ({
		visible: !!onCopyMarkdown,
		enabled: !!onCopyMarkdown
	}),
	run: ({ onCopyMarkdown }) => onCopyMarkdown?.()
});
sessionActionRegistry.registerCommand({
	id: "session.copy.plain-text",
	availability: ({ exportMenuOptions, onCopyPlainText }) => ({
		visible: !!exportMenuOptions?.plain_text && !!onCopyPlainText,
		enabled: !!exportMenuOptions?.plain_text && !!onCopyPlainText
	}),
	run: ({ onCopyPlainText }) => onCopyPlainText?.()
});
sessionActionRegistry.registerCommand({
	id: "session.position-left",
	availability: ({ onSetPanePosition, panePosition }) => ({
		visible: !!onSetPanePosition && !!panePosition,
		enabled: !!onSetPanePosition && panePosition !== "left"
	}),
	run: ({ onSetPanePosition }) => onSetPanePosition?.("left")
});
sessionActionRegistry.registerCommand({
	id: "session.position-right",
	availability: ({ onSetPanePosition, panePosition }) => ({
		visible: !!onSetPanePosition && !!panePosition,
		enabled: !!onSetPanePosition && panePosition !== "right"
	}),
	run: ({ onSetPanePosition }) => onSetPanePosition?.("right")
});
sessionActionRegistry.registerCommand({
	id: "session.delete",
	run: ({ onDelete }) => onDelete()
});
sessionActionRegistry.registerAction({
	id: "session.auto-rename",
	commandId: "session.auto-rename",
	label: ({ t }) => t("agent.session.auto_rename"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }),
	order: 10,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.rename",
	commandId: "session.rename",
	label: ({ t }) => t("agent.session.edit.title"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon_default, { size: 14 }),
	order: 20,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.toggle-pin",
	commandId: "session.toggle-pin",
	label: ({ pinned, t }) => pinned ? t("agent.session.unpin.title") : t("agent.session.pin.title"),
	icon: ({ pinned }) => pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinOff, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { size: 14 }),
	order: 30,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.open-in-new-tab",
	commandId: "session.open-in-new-tab",
	label: ({ t }) => t("common.open_in_new_tab"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 }),
	order: 35,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.open-in-new-window",
	commandId: "session.open-in-new-window",
	label: ({ t }) => t("tab.open_in_new_window"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenInNewWindowIcon, { size: 14 }),
	order: 37,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.position",
	label: ({ t }) => t("settings.agent.position.label"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { size: 14 }),
	order: 36,
	surface: "menu",
	availability: ({ onSetPanePosition, panePosition }) => ({ visible: !!onSetPanePosition && !!panePosition }),
	children: [{
		id: "session.position-left",
		commandId: "session.position-left",
		label: ({ t }) => t("settings.agent.position.left"),
		order: 10,
		surface: "menu"
	}, {
		id: "session.position-right",
		commandId: "session.position-right",
		label: ({ t }) => t("settings.agent.position.right"),
		order: 20,
		surface: "menu"
	}]
});
sessionActionRegistry.registerAction({
	id: "session.save-notes",
	commandId: "session.save-notes",
	label: ({ t }) => t("notes.save"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { size: 14 }),
	group: "share",
	order: 50,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.save-knowledge",
	commandId: "session.save-knowledge",
	label: ({ t }) => t("chat.save.topic.knowledge.menu_title"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 14 }),
	group: "share",
	order: 60,
	surface: "menu"
});
sessionActionRegistry.registerAction({
	id: "session.export",
	label: ({ t }) => t("chat.topics.export.title"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 14 }),
	group: "share",
	order: 70,
	surface: "menu",
	availability: (context) => ({ visible: !!hasExportOption(context) }),
	children: [
		{
			id: "session.export.image",
			commandId: "session.export.image",
			label: ({ t }) => t("chat.topics.export.image"),
			order: 10,
			surface: "menu"
		},
		{
			id: "session.export.markdown",
			commandId: "session.export.markdown",
			label: ({ t }) => t("chat.topics.export.md.label"),
			order: 20,
			surface: "menu"
		},
		{
			id: "session.export.markdown-reason",
			commandId: "session.export.markdown-reason",
			label: ({ t }) => t("chat.topics.export.md.reason"),
			order: 30,
			surface: "menu"
		},
		{
			id: "session.export.word",
			commandId: "session.export.word",
			label: ({ t }) => t("chat.topics.export.word"),
			order: 40,
			surface: "menu"
		},
		{
			id: "session.export.notion",
			commandId: "session.export.notion",
			label: ({ t }) => t("chat.topics.export.notion"),
			order: 50,
			surface: "menu"
		},
		{
			id: "session.export.yuque",
			commandId: "session.export.yuque",
			label: ({ t }) => t("chat.topics.export.yuque"),
			order: 60,
			surface: "menu"
		},
		{
			id: "session.export.obsidian",
			commandId: "session.export.obsidian",
			label: ({ t }) => t("chat.topics.export.obsidian"),
			order: 70,
			surface: "menu"
		},
		{
			id: "session.export.joplin",
			commandId: "session.export.joplin",
			label: ({ t }) => t("chat.topics.export.joplin"),
			order: 80,
			surface: "menu"
		},
		{
			id: "session.export.siyuan",
			commandId: "session.export.siyuan",
			label: ({ t }) => t("chat.topics.export.siyuan"),
			order: 90,
			surface: "menu"
		}
	]
});
sessionActionRegistry.registerAction({
	id: "session.copy",
	label: ({ t }) => t("chat.topics.copy.title"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }),
	group: "share",
	order: 80,
	surface: "menu",
	availability: (context) => ({ visible: hasCopyOption(context) }),
	children: [
		{
			id: "session.copy.image",
			commandId: "session.copy.image",
			label: ({ t }) => t("chat.topics.copy.image"),
			icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { size: 14 }),
			order: 10,
			surface: "menu"
		},
		{
			id: "session.copy.markdown",
			commandId: "session.copy.markdown",
			label: ({ t }) => t("chat.topics.copy.md"),
			icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }),
			order: 20,
			surface: "menu"
		},
		{
			id: "session.copy.plain-text",
			commandId: "session.copy.plain-text",
			label: ({ t }) => t("chat.topics.copy.plain_text"),
			icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }),
			order: 30,
			surface: "menu"
		}
	]
});
sessionActionRegistry.registerAction({
	id: "session.delete",
	commandId: "session.delete",
	label: ({ t }) => t("common.delete"),
	icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteIcon_default, {
		size: 14,
		className: "lucide-custom"
	}),
	group: "danger",
	order: 90,
	surface: "menu",
	danger: true,
	availability: ({ pinned }) => ({ visible: !pinned }),
	confirm: ({ t }) => ({
		title: t("agent.session.delete.title"),
		description: t("agent.session.delete.content"),
		confirmText: t("common.delete"),
		cancelText: t("common.cancel"),
		destructive: true
	})
});
function resolveSessionMenuActions(context) {
	return sessionActionRegistry.resolve(context, "menu");
}
async function executeSessionMenuAction(action, context) {
	return sessionActionRegistry.execute(action.id, context);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function createSessionActionContext(context) {
	return context;
}
function getSessionMenuActions(actionContext) {
	return resolveSessionMenuActions(actionContext);
}
async function runSessionMenuAction(action, actionContext) {
	await executeSessionMenuAction(action, actionContext);
}
function useSessionMenuPreset({ getActionContext }) {
	const getActionContextWithOverride = (0, import_react.useCallback)((item, contextOverride) => ({
		...getActionContext(item),
		...contextOverride
	}), [getActionContext]);
	const getActions = (0, import_react.useCallback)((item, contextOverride) => getSessionMenuActions(getActionContextWithOverride(item, contextOverride)), [getActionContextWithOverride]);
	const onAction = (0, import_react.useCallback)(async (item, action, contextOverride) => {
		await runSessionMenuAction(action, getActionContextWithOverride(item, contextOverride));
	}, [getActionContextWithOverride]);
	return (0, import_react.useMemo)(() => ({
		getActions,
		onAction
	}), [getActions, onAction]);
}
function useSessionMenuActions(actionContext) {
	return {
		getActions: (0, import_react.useCallback)(() => getSessionMenuActions(actionContext), [actionContext]),
		handleMenuAction: (0, import_react.useCallback)(async (action) => {
			await runSessionMenuAction(action, actionContext);
		}, [actionContext])
	};
}
var SESSION_TIME_BUCKET_RANK = {
	today: 1,
	yesterday: 2,
	"this-week": 3,
	earlier: 4
};
const SESSION_PINNED_GROUP_ID = "session:pinned";
const SESSION_PINNED_SECTION_ID = "session:section:pinned";
const SESSION_AGENT_SECTION_ID = "session:section:agent";
const SESSION_WORKDIR_SECTION_ID = "session:section:workdir";
const SESSION_NO_PROJECT_GROUP_ID = "session:no-project";
const SESSION_NO_PROJECT_SECTION_ID = "session:section:no-project";
const SESSION_UNKNOWN_AGENT_GROUP_ID = "session:agent:unknown";
const SESSION_NO_WORKDIR_GROUP_ID = "session:workdir:none";
var SESSION_AGENT_GROUP_ID_PREFIX = "session:agent:";
var SESSION_WORKSPACE_GROUP_ID_PREFIX = "session:workspace:";
var SESSION_WORKDIR_GROUP_ID_PREFIX = "session:workdir:";
var NO_PROJECT_GROUP_RANK = Number.MAX_SAFE_INTEGER;
var UNKNOWN_GROUP_RANK = Number.MAX_SAFE_INTEGER - 1;
function withSessionGroupIdPrefix(resolver) {
	return withResourceListGroupIdPrefix("session:", resolver);
}
function getSessionAgentGroupId(agentId) {
	return `${SESSION_AGENT_GROUP_ID_PREFIX}${agentId}`;
}
function getAgentIdFromSessionGroupId(groupId) {
	if (groupId === "session:agent:unknown" || !groupId.startsWith(SESSION_AGENT_GROUP_ID_PREFIX)) return void 0;
	return groupId.slice(14);
}
function getWorkdirPathFromSessionGroupId(groupId) {
	if (groupId === "session:workdir:none" || !groupId.startsWith(SESSION_WORKDIR_GROUP_ID_PREFIX)) return void 0;
	return decodeURIComponent(groupId.slice(16));
}
function getWorkspaceSessionGroupId(workspaceId) {
	return `${SESSION_WORKSPACE_GROUP_ID_PREFIX}${encodeURIComponent(workspaceId)}`;
}
function getFallbackWorkdirSessionGroupId(path) {
	return `${SESSION_WORKDIR_GROUP_ID_PREFIX}${encodeURIComponent(path)}`;
}
function normalizeSessionWorkdirPath(path) {
	const trimmed = path?.trim();
	if (!trimmed) return null;
	return trimmed.replace(/[\\/]+$/, "") || trimmed;
}
function isSystemWorkspaceSession(session) {
	return session.workspace?.type === "system";
}
function getPrimarySessionWorkdir(session) {
	if (isSystemWorkspaceSession(session)) return null;
	return normalizeSessionWorkdirPath(session.workspace?.path);
}
function getPathSegments(path) {
	return path.split(/[\\/]+/).filter(Boolean);
}
function getSessionWorkdirFallbackLabel(path) {
	return getPathSegments(path).at(-1) ?? path;
}
function getKnownSessionWorkspaceGroupId(session, groupIdByWorkspaceId, groupIdByPath) {
	if (session.workspaceId) {
		const groupId = groupIdByWorkspaceId.get(session.workspaceId);
		if (groupId) return groupId;
	}
	const path = getPrimarySessionWorkdir(session);
	return path ? groupIdByPath.get(path) : void 0;
}
function getSessionWorkdirGroupId(session, display) {
	const knownGroupId = display ? getKnownSessionWorkspaceGroupId(session, display.groupIdByWorkspaceId, display.groupIdByPath) : void 0;
	if (knownGroupId) return knownGroupId;
	const path = getPrimarySessionWorkdir(session);
	return path ? getFallbackWorkdirSessionGroupId(path) : SESSION_NO_WORKDIR_GROUP_ID;
}
function getUniqueSessionFallbackWorkdirPaths(sessions, groupIdByWorkspaceId, groupIdByPath) {
	return Array.from(new Set(sessions.filter((session) => !getKnownSessionWorkspaceGroupId(session, groupIdByWorkspaceId, groupIdByPath)).map(getPrimarySessionWorkdir).filter((path) => typeof path === "string")));
}
function createFallbackWorkdirLabelEntries(paths) {
	const basenameCounts = /* @__PURE__ */ new Map();
	for (const path of paths) {
		const basename = getSessionWorkdirFallbackLabel(path);
		basenameCounts.set(basename, (basenameCounts.get(basename) ?? 0) + 1);
	}
	return paths.map((path) => {
		const segments = getPathSegments(path);
		const basename = segments.at(-1) ?? path;
		if ((basenameCounts.get(basename) ?? 0) <= 1) return [path, basename];
		const parent = segments.at(-2);
		return [path, parent ? `${parent}/${basename}` : path];
	});
}
function createSessionWorkdirDisplayMaps(sessions, workspaces = []) {
	const groupIdByPath = /* @__PURE__ */ new Map();
	const groupIdByWorkspaceId = /* @__PURE__ */ new Map();
	const labelByGroupId = /* @__PURE__ */ new Map();
	const pathByGroupId = /* @__PURE__ */ new Map();
	const rankByGroupId = /* @__PURE__ */ new Map();
	const workspaceIdByGroupId = /* @__PURE__ */ new Map();
	const referencedWorkspaceIds = new Set(sessions.map((session) => session.workspaceId).filter((workspaceId) => typeof workspaceId === "string" && workspaceId.length > 0));
	const referencedWorkspacePaths = new Set(sessions.map(getPrimarySessionWorkdir).filter((path) => typeof path === "string"));
	for (const workspace of workspaces) {
		if (workspace.type === "system") continue;
		const path = normalizeSessionWorkdirPath(workspace.path);
		if (!path || groupIdByWorkspaceId.has(workspace.id)) continue;
		if (!referencedWorkspaceIds.has(workspace.id) && !referencedWorkspacePaths.has(path)) continue;
		const groupId = getWorkspaceSessionGroupId(workspace.id);
		groupIdByWorkspaceId.set(workspace.id, groupId);
		if (!groupIdByPath.has(path)) groupIdByPath.set(path, groupId);
		labelByGroupId.set(groupId, workspace.name.trim() || getSessionWorkdirFallbackLabel(path));
		pathByGroupId.set(groupId, path);
		workspaceIdByGroupId.set(groupId, workspace.id);
		rankByGroupId.set(groupId, rankByGroupId.size);
	}
	for (const [path, label] of createFallbackWorkdirLabelEntries(getUniqueSessionFallbackWorkdirPaths(sessions, groupIdByWorkspaceId, groupIdByPath))) {
		const groupId = getFallbackWorkdirSessionGroupId(path);
		if (labelByGroupId.has(groupId)) continue;
		groupIdByPath.set(path, groupId);
		labelByGroupId.set(groupId, label);
		pathByGroupId.set(groupId, path);
		rankByGroupId.set(groupId, rankByGroupId.size);
	}
	return {
		groupIdByPath,
		groupIdByWorkspaceId,
		labelByGroupId,
		pathByGroupId,
		rankByGroupId,
		workspaceIdByGroupId
	};
}
function createSessionDisplayGroupResolver({ agentById, labels, mode, now, pinnedAsSection = false, workdirDisplay }) {
	const pinnedGroupLabel = mode === "time" || !pinnedAsSection ? labels.pinned : "";
	if (mode === "time") return withSessionGroupIdPrefix(composeResourceListGroupResolvers(createPinnedGroupResolver({
		isPinned: (session) => session.pinned === true,
		group: {
			id: "pinned",
			label: pinnedGroupLabel
		}
	}), createTimeGroupResolver({
		getTimestamp: (session) => session.lastActivityAt,
		labels: labels.time,
		now
	})));
	if (mode === "agent") return composeResourceListGroupResolvers(createPinnedGroupResolver({
		isPinned: (session) => session.pinned === true,
		group: {
			id: SESSION_PINNED_GROUP_ID,
			label: pinnedGroupLabel
		}
	}), (session) => {
		const agentId = session.agentId;
		if (!agentId) return {
			id: SESSION_UNKNOWN_AGENT_GROUP_ID,
			label: labels.agent.unknown
		};
		const agent = agentById?.get(agentId);
		return agent ? {
			id: getSessionAgentGroupId(agent.id),
			label: agent.name
		} : {
			id: SESSION_UNKNOWN_AGENT_GROUP_ID,
			label: labels.agent.unknown
		};
	});
	return composeResourceListGroupResolvers(createPinnedGroupResolver({
		isPinned: (session) => session.pinned === true,
		group: {
			id: SESSION_PINNED_GROUP_ID,
			label: pinnedGroupLabel
		}
	}), (session) => {
		if (isSystemWorkspaceSession(session)) return {
			id: SESSION_NO_PROJECT_GROUP_ID,
			label: ""
		};
		const groupId = getSessionWorkdirGroupId(session, workdirDisplay);
		if (groupId === "session:workdir:none") return {
			id: SESSION_NO_WORKDIR_GROUP_ID,
			label: labels.workdir.none
		};
		const path = getPrimarySessionWorkdir(session);
		return {
			id: groupId,
			label: workdirDisplay?.labelByGroupId.get(groupId) ?? (path ? getSessionWorkdirFallbackLabel(path) : groupId)
		};
	});
}
function getWorkdirGroupRank(session, workdirDisplay) {
	if (isSystemWorkspaceSession(session)) return NO_PROJECT_GROUP_RANK;
	const groupId = getSessionWorkdirGroupId(session, workdirDisplay);
	if (groupId === "session:workdir:none") return UNKNOWN_GROUP_RANK;
	return workdirDisplay?.rankByGroupId.get(groupId) ?? UNKNOWN_GROUP_RANK;
}
function getAgentGroupRank(session, agentRankById) {
	if (!session.agentId) return UNKNOWN_GROUP_RANK;
	return agentRankById?.get(session.agentId) ?? UNKNOWN_GROUP_RANK;
}
function sortSessionsForDisplayGroups(sessions, options) {
	const isPinned = (session) => session.pinned === true;
	if (options.mode === "time") return sortRankedResourceItems(sessions, {
		getRank: (session) => session.pinned === true ? 0 : SESSION_TIME_BUCKET_RANK[getResourceTimeBucket(session.lastActivityAt, options.now)],
		isPinned,
		compareWithinGroup: compareResourceRecency((session) => session.lastActivityAt)
	});
	return sortRankedResourceItems(sessions, {
		getRank: (session) => {
			if (session.pinned === true) return 0;
			let displayRank;
			if (options.mode === "workdir" && isSystemWorkspaceSession(session)) displayRank = NO_PROJECT_GROUP_RANK;
			else if (options.mode === "agent") displayRank = getAgentGroupRank(session, options.agentRankById);
			else displayRank = getWorkdirGroupRank(session, options.workdirDisplay);
			return displayRank >= UNKNOWN_GROUP_RANK ? displayRank : displayRank + 1;
		},
		isPinned,
		compareWithinGroup: (a, b) => compareResourceOrderKey(a.orderKey, b.orderKey)
	});
}
function normalizeSessionDropPayload(payload) {
	return payload;
}
function buildSessionDropAnchor(payload) {
	return buildResourceListItemDropAnchor(payload);
}
function buildSessionWorkdirGroupDropAnchor(payload, overWorkspaceId) {
	return buildResourceListGroupDropAnchor(payload, overWorkspaceId);
}
function buildSessionAgentGroupDropAnchor(payload, overAgentId) {
	return buildResourceListGroupDropAnchor(payload, overAgentId);
}
function canDropSessionItemInDisplayGroup({ mode, sourceGroupId, targetGroupId }) {
	return mode !== "time" && sourceGroupId === targetGroupId && targetGroupId !== "session:pinned";
}
function applyOptimisticSessionDisplayMove(sessions, payload) {
	const activeIndex = sessions.findIndex((session) => session.id === payload.activeId);
	if (activeIndex < 0) return [...sessions];
	const next = sessions.filter((session) => session.id !== payload.activeId);
	let insertIndex = next.length;
	if (payload.overType === "item") {
		const overIndex = next.findIndex((session) => session.id === payload.overId);
		if (overIndex >= 0) insertIndex = payload.position === "before" ? overIndex : overIndex + 1;
	}
	next.splice(insertIndex, 0, sessions[activeIndex]);
	return next;
}
function moveSessionWorkdirGroupAfterDrop(workspaces, activeWorkspaceId, overWorkspaceId, payload) {
	const activeIndex = workspaces.findIndex((workspace) => workspace.id === activeWorkspaceId);
	const overIndex = workspaces.findIndex((workspace) => workspace.id === overWorkspaceId);
	if (activeIndex < 0 || overIndex < 0 || activeIndex === overIndex) return [...workspaces];
	const next = workspaces.filter((workspace) => workspace.id !== activeWorkspaceId);
	const adjustedOverIndex = next.findIndex((workspace) => workspace.id === overWorkspaceId);
	const insertIndex = payload.sourceIndex < payload.targetIndex ? adjustedOverIndex + 1 : adjustedOverIndex;
	next.splice(insertIndex, 0, workspaces[activeIndex]);
	return next;
}
function moveSessionAgentGroupAfterDrop(agentIds, activeAgentId, overAgentId, payload) {
	return moveResourceListStringGroupAfterDrop(agentIds, activeAgentId, overAgentId, payload);
}
export { createSessionActionContext as C, sortSessionsForDisplayGroups as S, useSessionMenuPreset as T, getWorkdirPathFromSessionGroupId as _, SESSION_PINNED_GROUP_ID as a, moveSessionWorkdirGroupAfterDrop as b, SESSION_WORKDIR_SECTION_ID as c, buildSessionDropAnchor as d, buildSessionWorkdirGroupDropAnchor as f, getAgentIdFromSessionGroupId as g, createSessionWorkdirDisplayMaps as h, SESSION_NO_WORKDIR_GROUP_ID as i, applyOptimisticSessionDisplayMove as l, createSessionDisplayGroupResolver as m, SESSION_NO_PROJECT_GROUP_ID as n, SESSION_PINNED_SECTION_ID as o, canDropSessionItemInDisplayGroup as p, SESSION_NO_PROJECT_SECTION_ID as r, SESSION_UNKNOWN_AGENT_GROUP_ID as s, SESSION_AGENT_SECTION_ID as t, buildSessionAgentGroupDropAnchor as u, isSystemWorkspaceSession as v, useSessionMenuActions as w, normalizeSessionDropPayload as x, moveSessionAgentGroupAfterDrop as y };
