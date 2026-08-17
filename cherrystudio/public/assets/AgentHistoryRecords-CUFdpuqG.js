import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import "./Model-CdvaPtgc.js";
import "./aiGeneration-B219ezQN.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./dropzone-Cj1wr76N.js";
import "./es2015-CF8XujIC.js";
import "./EmojiPicker-Bc4FQRGq.js";
import "./esm-CEkDmnO2.js";
import "./dist-DErY0e6o.js";
import "./w3c-keyname-d7Yk5myI.js";
import "./diff-BkIMdlj4.js";
import "./with-selector-YZwnb76j.js";
import "./chunk-BO2N2NFS-CPhdpqIF.js";
import "./extend-CpT6M6LO.js";
import "./marked.esm-CssjD7C2.js";
import "./dist-CmBt0G-t.js";
import "./sortable.esm-DLgVXjRs.js";
import "./useTheme-CkJQYl0u.js";
import "./command-DJ8bdie_.js";
import "./command-CtEyUhIg.js";
import "./useCloseBeforeAction-COmv5C7_.js";
import "./ipc-BuGMWdaI.js";
import "./tab-BIOOjV6R.js";
import "./useWindowInitData-nzW1IbOc.js";
import "./mainWindowNavigation-BoKv8CTA.js";
import "./routeTitle-cKI7p46Z.js";
import "./CacheService-BxZWLQeF.js";
import { i as useSharedCacheSelector } from "./useCache-DNNSH80c.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./message-B_yl0O_K.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./useReorder-BgG0nfey.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import "./popup-BLG-Gue5.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import "./naming-C7JIUN29.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import "./toolOutput-CFeNIV-2.js";
import "./citations-B3he2I9w.js";
import { t as classifyTurn } from "./turnState-DdcAaKvJ.js";
import { o as useAgentSessionsSource, p as useUpdateSession } from "./WindowIcons-CiINgt8k.js";
import "./EventService-B0N3Z50N.js";
import "./uiParts-D7jaMraw.js";
import "./useTopic-DqjHWqZM.js";
import { t as EmojiIcon_default } from "./EmojiIcon-_0GJskRg.js";
import "./useModel-DWj6Qb5f.js";
import "./useProvider-DFQPidMA.js";
import "./model-BGDvQJb9.js";
import "./ModelAvatar-BilEtvkp.js";
import "./useWindowFrame-B3nDfm6s.js";
import "./Scrollbar-DJ9MDpuH.js";
import "./EditDialogShared-BpH7F_cP.js";
import "./citation-Njzn5Mjh.js";
import "./group-BlMwbJVX.js";
import "./knowledge-Cnld5F6B.js";
import "./find-C9LAhrgt.js";
import "./resourceCatalog-orFaFf1i.js";
import { n as useAgents } from "./useAgent-6M7yPDnZ.js";
import "./ModelSelector-HuVsPvx_.js";
import "./VirtualList-BcHriGxz.js";
import "./contextSettings-o-HhNfTW.js";
import { t as getAgentAvatarFromConfiguration } from "./agent-CC-UrJwb.js";
import "./useKnowledgeBase-BfVSZRCd.js";
import "./providerSettings-HvlvfaC_.js";
import { t as useConversationNavigation } from "./useConversationNavigation-DvSZ2tcU.js";
import { n as buildAgentSessionTopicId } from "./agentSession-Dozl7Cqx.js";
import "./create-BmP8HYcG.js";
import { i as AgentSelector } from "./selectors-BgTQUGLo.js";
import "./EditNameDialog-DsUVseEz.js";
import "./DeleteIcon-D9JmQzhN.js";
import "./EditIcon-CarMu02a.js";
import { C as createSessionActionContext, S as sortSessionsForDisplayGroups, T as useSessionMenuPreset } from "./sessionListHelpers-ybz7mDu7.js";
import { a as buildAgentSources, c as findAdjacentHistoryRecordAfterBulkDelete, f as HistoryActionContextMenu, i as ALL_SOURCE_ID, l as getAgentHistoryStatus, n as HistorySourceFilterField, o as buildAgentStatusItems, r as HistoryRecordsContent, t as useHistoryRecordsController, u as getSessionAgentSourceId } from "./useHistoryRecordsController-9gGErZeU.js";
import "./ConfirmActionPopup-Bo7HymPX.js";
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
