import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./Model-CThI07dL.js";
import "./aiGeneration-OaAly3Fj.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./dropzone-ipDj8md_.js";
import "./es2015-wfS3L7va.js";
import "./EmojiPicker-CTF843Lc.js";
import "./esm-BG45amY4.js";
import "./dist-DAWIImZF.js";
import "./w3c-keyname-DKIRohbk.js";
import "./diff-KPuWBc9d.js";
import "./with-selector-DlsRhNV6.js";
import "./chunk-BO2N2NFS-fKJ-DR8B.js";
import "./extend-BDo4rIBl.js";
import "./marked.esm-5kn1DqGn.js";
import "./dist-Bsd0pttl.js";
import "./sortable.esm-TnTcc6bt.js";
import "./useTheme-mM6gKAcD.js";
import "./command-CyHQabGE.js";
import "./command-B9oiyMDG.js";
import "./useCloseBeforeAction-DvYaYpLC.js";
import "./ipc-DpcwPFwy.js";
import "./tab-CVOgL8bf.js";
import "./useWindowInitData-BzKs7Qq9.js";
import "./mainWindowNavigation-Dpzd_Ttr.js";
import "./routeTitle--4OTq6gp.js";
import "./CacheService-IyXh62g9.js";
import { i as useSharedCacheSelector } from "./useCache-lF6Sw_ck.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./message-CtGMR9KJ.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./useReorder-Cmki1Ln4.js";
import { t as toast } from "./toast-D2efAzAF.js";
import "./popup-fJcKiA2S.js";
import "./mcp-BGt1L-d_.js";
import "./label-CSb71add.js";
import "./systemProviderId-B4QvwwvR.js";
import "./provider-0IejLFjL.js";
import "./naming-BVJSQooI.js";
import { n as buildAgentSessionTopicId } from "./agentSession-DEX9ehkG.js";
import { a as useUpdateSession } from "./useSession-CwZkOUrY.js";
import "./conversationEntry-CTSSFR4L.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./toolOutput-DFxKz6Jf.js";
import { t as classifyTurn } from "./turnState-D76dPAfh.js";
import "./EventService-CMzpRLnw.js";
import "./uiParts-ClY38h-2.js";
import "./useTopic-DcX9oNzM.js";
import { o as useAgentSessionsSource } from "./WindowIcons-deSlwIsf.js";
import { t as EmojiIcon_default } from "./EmojiIcon-oUJ-cQSb.js";
import "./useModel-kU1hKaYa.js";
import "./useProvider-DvntuFRN.js";
import "./capabilities-DNV_QUgI.js";
import "./model-BCwc3I-J.js";
import "./ModelAvatar-Dlf3Jj6Z.js";
import "./cocoAgent-Dkf7ljK5.js";
import { n as useAgents } from "./useAgent-9Zqveu03.js";
import "./useSkills-Be92aMP5.js";
import "./group-Cqj37oRb.js";
import "./knowledge-8Me8AnnG.js";
import "./Scrollbar-CjwT5bYS.js";
import "./useWindowFrame-BNKTfWS3.js";
import "./EditDialogShared-jA4mvNoE.js";
import "./citations-B4d_KMap.js";
import "./citation-BDKmyu_p.js";
import "./find-Bek5EVkJ.js";
import "./ModelSelector-DGMGvnR1.js";
import "./resourceCatalog-BJgI2SG2.js";
import "./VirtualList-2tuBY6WI.js";
import "./contextSettings-CKgBWQdg.js";
import { t as getAgentAvatarFromConfiguration } from "./agent-IxO6TDCv.js";
import "./useKnowledgeBase-DfgLPgtw.js";
import "./providerSettings-DJmmyeTu.js";
import { t as useConversationNavigation } from "./useConversationNavigation-DfhrEROd.js";
import "./create-biev8d6Y.js";
import { i as AgentSelector } from "./selectors-CHOaUNtv.js";
import "./EditNameDialog-B9jMxLhh.js";
import "./DeleteIcon-D8_d_iTl.js";
import "./EditIcon-CYKHpxsO.js";
import { C as createSessionActionContext, S as sortSessionsForDisplayGroups, T as useSessionMenuPreset } from "./sessionListHelpers-DQCtYMDq.js";
import { a as buildAgentSources, c as findAdjacentHistoryRecordAfterBulkDelete, f as HistoryActionContextMenu, i as ALL_SOURCE_ID, l as getAgentHistoryStatus, n as HistorySourceFilterField, o as buildAgentStatusItems, r as HistoryRecordsContent, t as useHistoryRecordsController, u as getSessionAgentSourceId } from "./useHistoryRecordsController-veFNZVhg.js";
import "./ConfirmActionPopup-DYre4VRt.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var getAgentSessionStreamStatusCacheKey = (sessionId) => `topic.stream.statuses.${buildAgentSessionTopicId(sessionId)}`;
var SESSION_ID_SEPARATOR = "\0";
var EMPTY_AGENT_SESSION_STREAM_STATUSES = /* @__PURE__ */ new Map();
function toAgentSessionStreamState(entry) {
	if (!entry) return void 0;
	return {
		isPending: classifyTurn(entry.status).isTurnActive,
		status: entry.status
	};
}
function areAgentSessionStreamStatusesEqual(a, b) {
	if (a === b) return true;
	if (a.size !== b.size) return false;
	for (const [sessionId, state] of a) {
		const other = b.get(sessionId);
		if (!other || other.status !== state.status || other.isPending !== state.isPending) return false;
	}
	return true;
}
function useAgentSessionStreamStatuses(sessionIds) {
	const sessionIdsKey = (0, import_react.useMemo)(() => Array.from(new Set(sessionIds)).sort().join(SESSION_ID_SEPARATOR), [sessionIds]);
	const uniqueSessionIds = (0, import_react.useMemo)(() => sessionIdsKey ? sessionIdsKey.split(SESSION_ID_SEPARATOR) : [], [sessionIdsKey]);
	const selector = (0, import_react.useCallback)((values) => {
		const entries = [];
		uniqueSessionIds.forEach((sessionId, index) => {
			const state = toAgentSessionStreamState(values[index]);
			if (state) entries.push([sessionId, state]);
		});
		if (entries.length === 0) return EMPTY_AGENT_SESSION_STREAM_STATUSES;
		return new Map(entries);
	}, [uniqueSessionIds]);
	return useSharedCacheSelector(uniqueSessionIds.map(getAgentSessionStreamStatusCacheKey), selector, areAgentSessionStreamStatusesEqual);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var AgentHistoryRecords = ({ activeRecordId, onClose, onRecordSelect, toolbarLeading }) => {
	const { t } = useTranslation();
	const [groupNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const conversationNav = useConversationNavigation("agents");
	const { sessions, pinIdBySessionId, isLoadingAll: isSessionsLoading, deleteSession, deleteSessions, togglePin } = useAgentSessionsSource();
	const { agents } = useAgents();
	const { updateSession } = useUpdateSession();
	const isSessionPinned = (0, import_react.useCallback)((sessionId) => pinIdBySessionId.has(sessionId), [pinIdBySessionId]);
	const sessionItems = (0, import_react.useMemo)(() => sessions.map((session) => ({
		...session,
		pinned: isSessionPinned(session.id)
	})), [isSessionPinned, sessions]);
	const agentById = (0, import_react.useMemo)(() => new Map(agents.map((agent) => [agent.id, agent])), [agents]);
	const agentRankById = (0, import_react.useMemo)(() => new Map(agents.map((agent, index) => [agent.id, index])), [agents]);
	const timeSortedSessions = (0, import_react.useMemo)(() => sortSessionsForDisplayGroups(sessionItems, {
		mode: "time",
		now: groupNow
	}), [groupNow, sessionItems]);
	const agentSortedSessions = (0, import_react.useMemo)(() => sortSessionsForDisplayGroups(sessionItems, {
		agentRankById,
		mode: "agent",
		now: groupNow
	}), [
		agentRankById,
		groupNow,
		sessionItems
	]);
	const streamStatusBySessionId = useAgentSessionStreamStatuses((0, import_react.useMemo)(() => sessionItems.map((session) => session.id), [sessionItems]));
	const unknownAgentLabel = t("agent.session.group.unknown_agent");
	const statusItems = (0, import_react.useMemo)(() => buildAgentStatusItems(t), [t]);
	const agentSources = (0, import_react.useMemo)(() => buildAgentSources(sessionItems, agentById, agentRankById, unknownAgentLabel, t), [
		agentById,
		agentRankById,
		sessionItems,
		t,
		unknownAgentLabel
	]);
	const additionalAgentSourceItems = (0, import_react.useMemo)(() => agentSources.filter((source) => source.id !== "all" && !agentById.has(source.id)).map((source) => ({
		id: source.id,
		name: source.label,
		editDisabled: true,
		pinDisabled: true
	})), [agentById, agentSources]);
	const handleSessionSelect = (0, import_react.useCallback)((session) => {
		const title = session.name || t("common.unnamed");
		if (conversationNav.openConversationTab(session.id, title, { forceNew: true })) return;
		onRecordSelect?.(session.id);
		onClose();
	}, [
		conversationNav,
		onClose,
		onRecordSelect,
		t
	]);
	const handleDeleteSession = (0, import_react.useCallback)(async (id) => {
		if (isSessionPinned(id)) return;
		if (await deleteSession(id) && activeRecordId === id) {
			const nextSession = findAdjacentHistoryRecordAfterBulkDelete(timeSortedSessions, [id], id, (session) => session.id);
			onRecordSelect?.(nextSession?.id ?? null);
		}
	}, [
		activeRecordId,
		deleteSession,
		isSessionPinned,
		onRecordSelect,
		timeSortedSessions
	]);
	const handleBulkDeleteSessions = (0, import_react.useCallback)(async (ids) => {
		const result = await deleteSessions(ids);
		return result ? result.deletedIds : void 0;
	}, [deleteSessions]);
	const handleRenameSession = (0, import_react.useCallback)(async (id, name) => {
		const session = sessions.find((candidate) => candidate.id === id);
		const trimmedName = name.trim();
		if (!session || !trimmedName || trimmedName === session.name) return;
		if (await updateSession({
			id,
			name: trimmedName,
			isNameManuallyEdited: true
		}, { showSuccessToast: false })) toast.success(t("common.saved"));
	}, [
		sessions,
		t,
		updateSession
	]);
	const handleToggleSessionPin = (0, import_react.useCallback)((sessionId) => togglePin(sessionId), [togglePin]);
	const sessionMenuPreset = useSessionMenuPreset({ getActionContext: (0, import_react.useCallback)((session) => createSessionActionContext({
		isActiveInCurrentTab: false,
		onDelete: () => {
			handleDeleteSession(session.id);
		},
		onTogglePin: () => {
			handleToggleSessionPin(session.id);
		},
		pinned: isSessionPinned(session.id),
		sessionName: session.name ?? session.id,
		startEdit: () => void 0,
		t
	}), [
		handleDeleteSession,
		handleToggleSessionPin,
		isSessionPinned,
		t
	]) });
	const descriptor = {
		mode: "agent",
		getId: (0, import_react.useCallback)((session) => session.id, []),
		isPinned: isSessionPinned,
		getSourceId: (0, import_react.useCallback)((session) => getSessionAgentSourceId(session, agentById), [agentById]),
		statusOf: (0, import_react.useCallback)((session) => getAgentHistoryStatus(streamStatusBySessionId.get(session.id)), [streamStatusBySessionId]),
		matchesSearch: (0, import_react.useCallback)((session, keywords) => {
			const agent = session.agentId ? agentById.get(session.agentId) : void 0;
			return [
				session.name,
				session.description,
				agent?.name
			].some((value) => value?.toLowerCase().includes(keywords));
		}, [agentById]),
		onBulkDelete: handleBulkDeleteSessions,
		onActiveRecordChange: (0, import_react.useCallback)((session) => onRecordSelect?.(session?.id ?? null), [onRecordSelect]),
		...(0, import_react.useMemo)(() => ({
			getName: (session) => session.name || t("common.unnamed"),
			getUpdatedAt: (session) => session.lastActivityAt,
			getSourceLabel: (session) => (session.agentId ? agentById.get(session.agentId)?.name : void 0) ?? unknownAgentLabel,
			renderAvatar: (session) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiIcon_default, {
					emoji: getAgentAvatarFromConfiguration((session.agentId ? agentById.get(session.agentId) : void 0)?.configuration),
					size: 20,
					fontSize: 12,
					className: "mr-0 text-foreground"
				});
			},
			rowHeight: 32,
			getSelectLabel: (session) => `${t("common.select")} ${session.name || t("common.unnamed")}`,
			getRowActions: (session, openRename) => {
				const contextOverride = { startEdit: () => openRename(session.id, session.name ?? "") };
				return {
					actions: sessionMenuPreset.getActions(session, contextOverride),
					onAction: (action) => sessionMenuPreset.onAction(session, action, contextOverride)
				};
			},
			onOpen: handleSessionSelect,
			onTogglePin: (session) => handleToggleSessionPin(session.id),
			renderRowMenu: (_session, row, rowActions) => rowActions.actions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryActionContextMenu, {
				actions: rowActions.actions,
				className: "z-50",
				onAction: rowActions.onAction,
				children: row
			}) : row
		}), [
			agentById,
			handleSessionSelect,
			handleToggleSessionPin,
			sessionMenuPreset,
			t,
			unknownAgentLabel
		]),
		sources: agentSources,
		renderSourceFilter: (selectedId, onSelect) => {
			const source = selectedId ? agentSources.find((candidate) => candidate.id === selectedId) : void 0;
			const agent = selectedId ? agentById.get(selectedId) : void 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistorySourceFilterField, {
				label: selectedId ? source?.label || agent?.name || t("common.unnamed") : t("history.records.filter.selectAgent"),
				hasValue: !!selectedId,
				clearLabel: t("common.clear"),
				onClear: () => onSelect(null),
				icon: selectedId ? source?.icon ? source.icon : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiIcon_default, {
					emoji: getAgentAvatarFromConfiguration(agent?.configuration),
					size: 16,
					fontSize: 10,
					className: "mr-0 text-foreground"
				}) : void 0,
				selector: (trigger) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSelector, {
					value: selectedId,
					onChange: onSelect,
					trigger,
					additionalItems: additionalAgentSourceItems
				})
			});
		},
		statusOptions: statusItems,
		onRename: handleRenameSession,
		strings: {
			sourceLabel: t("common.agent"),
			searchPlaceholder: t("history.records.searchSession"),
			titleColumnLabel: t("history.records.table.session"),
			emptyTitle: t("history.records.empty.sessionsTitle"),
			emptyDescription: t("history.records.empty.sessionsDescription"),
			loadingTitle: t("history.records.loading.sessionsTitle"),
			loadingDescription: t("history.records.loading.sessionsDescription"),
			pinLabel: t("selector.common.pin"),
			unpinLabel: t("selector.common.unpin"),
			deleteLabel: t("common.delete"),
			renameDialogTitle: t("agent.session.edit.title")
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryRecordsContent, {
		descriptor,
		controller: useHistoryRecordsController({
			descriptor,
			timeSorted: timeSortedSessions,
			sourceSorted: agentSortedSessions,
			activeRecordId
		}),
		isLoading: isSessionsLoading,
		toolbarLeading
	});
};
var AgentHistoryRecords_default = AgentHistoryRecords;
export { AgentHistoryRecords_default as default };
