import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_dayjs_min } from "./dayjs.min-BBb2vAs7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-D29TbOSD.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as ConfirmDialog } from "./confirm-dialog-xsGo4R8n.js";
import { t as Checkbox } from "./checkbox-DNPP_2-D.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import { a as RowFlex } from "./flex-YDL2weOg.js";
import { t as SearchInput } from "./search-input-CGddznTh.js";
import { t as SelectDropdown } from "./select-dropdown-BJuP1Z4u.js";
import { n as CommandContextMenu } from "./command-B9oiyMDG.js";
import { n as cn } from "./style-BQVh98fR.js";
import { t as Bot } from "./bot-CmbvEihZ.js";
import { t as ChevronDown } from "./chevron-down-CZ6Nbooa.js";
import { t as FolderInput } from "./folder-input-kIRVbARv.js";
import { t as MessageSquareText } from "./message-square-text-Qbv9-fPW.js";
import { t as Pin } from "./pin-8UnKjfdt.js";
import { t as Trash2 } from "./trash-2-COZ-1DEE.js";
import { t as X } from "./x-CpgfqVTG.js";
import { t as EmojiIcon_default } from "./EmojiIcon-oUJ-cQSb.js";
import { i as DynamicVirtualList_default } from "./VirtualList-2tuBY6WI.js";
import { t as getAgentAvatarFromConfiguration } from "./agent-IxO6TDCv.js";
import { t as EditNameDialog_default } from "./EditNameDialog-B9jMxLhh.js";
import { t as ConfirmActionPopup_default } from "./ConfirmActionPopup-DYre4VRt.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ActionConfirmDialog({ confirm, contentClassName, overlayClassName, open, onConfirm, onOpenChange }) {
	if (!confirm) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open,
		onOpenChange,
		contentClassName,
		overlayClassName,
		title: confirm.title,
		description: confirm.description,
		content: confirm.content,
		confirmText: confirm.confirmText,
		cancelText: confirm.cancelText,
		destructive: confirm.destructive,
		onConfirm
	});
}
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var import_react = /* @__PURE__ */ __toESM(require_react());
var historyTableClassName = "min-w-[760px] rounded-none border-0 bg-card shadow-none";
const historyTableGridClassName = "grid min-w-[760px] grid-cols-[44px_minmax(180px,1fr)_minmax(280px,2.5fr)_100px_84px]";
var historyHeaderClassName = "sticky top-0 z-10 border-border-subtle border-b bg-card text-muted-foreground text-sm leading-5";
var historyHeaderCellClassName = "flex h-8 min-w-0 items-center px-3 py-1.5 font-semibold";
const historyBodyRowClassName = "group border-border-subtle border-b bg-card text-muted-foreground text-sm leading-5";
const historyBodyCellClassName = "flex min-w-0 items-center px-3 py-1.5 transition-colors group-hover:bg-muted group-data-[state=selected]:bg-muted";
const historyFixedActionCellClassName = "sticky right-0 z-2 justify-center bg-card px-2 [border-left:0.5px_solid_var(--border-subtle)]";
function HistoryVirtualTable({ emptyContent, estimateSize, header, items, onFixedActionShadowChange, renderRow }) {
	const scrollerRef = (0, import_react.useRef)(null);
	const updateFixedActionShadow = (0, import_react.useCallback)(() => {
		const scroller = scrollerRef.current;
		if (!scroller) {
			onFixedActionShadowChange(false);
			return;
		}
		const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
		onFixedActionShadowChange(maxScrollLeft > 1 && scroller.scrollLeft < maxScrollLeft - 1);
	}, [onFixedActionShadowChange]);
	(0, import_react.useEffect)(() => {
		updateFixedActionShadow();
		const scroller = scrollerRef.current;
		if (!scroller || typeof ResizeObserver === "undefined") return;
		const resizeObserver = new ResizeObserver(updateFixedActionShadow);
		resizeObserver.observe(scroller);
		if (scroller.firstElementChild) resizeObserver.observe(scroller.firstElementChild);
		return () => resizeObserver.disconnect();
	}, [items.length, updateFixedActionShadow]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "history.virtual-table",
		className: "min-h-0 flex-1 px-3 pt-3 pb-2",
		role: "table",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex h-full min-h-0 flex-col overflow-hidden", historyTableClassName),
			children: items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicVirtualList_default, {
				autoHideScrollbar: true,
				className: "min-h-0 flex-1",
				estimateSize,
				header,
				list: items,
				onScroll: updateFixedActionShadow,
				overscan: 8,
				role: "rowgroup",
				scrollElementRef: scrollerRef,
				scrollerStyle: { overflowX: "auto" },
				children: renderRow
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollerRef,
				className: "min-h-0 flex-1 overflow-auto",
				onScroll: updateFixedActionShadow,
				children: [header, emptyContent]
			})
		})
	});
}
const HistoryTableHeader = ({ actionsLabel, selectAllLabel, selectionDisabled = false, selectedState, showFixedActionShadow, sourceLabel, timeLabel, titleLabel, onToggleAll }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "history.table-header.row",
	className: cn(historyTableGridClassName, historyHeaderClassName),
	role: "row",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.table-header.columnheader",
			className: cn(historyHeaderCellClassName, "justify-center px-2"),
			role: "columnheader",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				size: "sm",
				checked: selectedState,
				disabled: selectionDisabled,
				"aria-label": selectAllLabel,
				onCheckedChange: (checked) => onToggleAll(Boolean(checked)),
				onClick: (event) => event.stopPropagation()
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.table-header.columnheader",
			className: historyHeaderCellClassName,
			role: "columnheader",
			children: sourceLabel
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.table-header.columnheader",
			className: historyHeaderCellClassName,
			role: "columnheader",
			children: titleLabel
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.table-header.columnheader",
			className: historyHeaderCellClassName,
			role: "columnheader",
			children: timeLabel
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.table-header.columnheader",
			className: cn(historyHeaderCellClassName, historyFixedActionCellClassName, showFixedActionShadow && "[--history-fixed-action-shadow:color-mix(in_oklch,var(--foreground)_33.3333%,transparent)] [box-shadow:-8px_0_12px_-12px_var(--history-fixed-action-shadow)]"),
			role: "columnheader",
			children: actionsLabel
		})
	]
});
const HistorySelectionCell = ({ checked, disabled = false, label, onCheckedChange }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "history.selection-cell",
	className: cn(historyBodyCellClassName, "justify-center px-2"),
	role: "cell",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
		size: "sm",
		checked,
		disabled,
		"aria-label": label,
		onCheckedChange: (nextChecked) => onCheckedChange(Boolean(nextChecked)),
		onClick: (event) => event.stopPropagation()
	})
});
const HistoryTitleButton = ({ title, onOpen }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "history.title-button",
	role: "button",
	tabIndex: 0,
	className: "-mx-1 block w-full min-w-0 max-w-full cursor-pointer truncate rounded-sm px-1 py-0 text-left font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:outline-none",
	title,
	onClick: (event) => {
		event.stopPropagation();
		onOpen?.();
	},
	onKeyDown: (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.stopPropagation();
		onOpen?.();
	},
	children: title
});
function HistoryActionContextMenu({ actions, children, className, onAction }) {
	const runAction = (0, import_react.useCallback)(async (action) => {
		if (!action.availability.enabled) return;
		const confirm = action.confirm;
		if (confirm) {
			await ConfirmActionPopup_default.show({
				title: confirm.title,
				content: confirm.description ?? confirm.content,
				okText: confirm.confirmText,
				cancelText: confirm.cancelText,
				danger: confirm.destructive,
				action: () => onAction(action)
			});
			return;
		}
		await onAction(action);
	}, [onAction]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: (0, import_react.useMemo)(() => {
			const toItems = (list) => {
				const items = [];
				let previousGroup;
				for (const action of list) {
					if (!action.availability.visible) continue;
					if (items.length > 0 && action.group !== previousGroup) items.push({ type: "separator" });
					previousGroup = action.group;
					const label = String(action.label);
					if (action.children.length > 0) items.push({
						type: "submenu",
						id: action.id,
						label,
						icon: action.icon,
						enabled: action.availability.enabled,
						children: toItems(action.children)
					});
					else items.push({
						type: "item",
						id: action.id,
						label,
						icon: action.icon,
						enabled: action.availability.enabled,
						destructive: action.danger,
						shortcutLabel: action.shortcut,
						onSelect: () => runAction(action)
					});
				}
				return items;
			};
			return toItems(actions);
		}, [actions, runAction]),
		contentClassName: className,
		children
	});
}
function HistoryActionsCell({ actions, deleteLabel, isPinned, pinLabel, unpinLabel, onAction, onTogglePin }) {
	const [pendingDeleteAction, setPendingDeleteAction] = (0, import_react.useState)();
	const deleteAction = (0, import_react.useMemo)(() => actions.find(isDeleteAction), [actions]);
	const handleAction = (0, import_react.useCallback)((action) => {
		window.requestAnimationFrame(() => {
			onAction(action);
		});
	}, [onAction]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
		className: "items-center justify-center gap-1",
		onClick: (event) => event.stopPropagation(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinActionButton, {
			isPinned,
			pinLabel,
			unpinLabel,
			onClick: onTogglePin
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteActionButton, {
			action: deleteAction,
			label: deleteLabel,
			onClick: (action) => {
				if (action.confirm) {
					setPendingDeleteAction(action);
					return;
				}
				handleAction(action);
			}
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionConfirmDialog, {
		open: !!pendingDeleteAction,
		confirm: pendingDeleteAction?.confirm,
		contentClassName: "z-50",
		overlayClassName: "z-40",
		onOpenChange: (open) => {
			if (!open) setPendingDeleteAction(void 0);
		},
		onConfirm: async () => {
			if (!pendingDeleteAction) return;
			handleAction(pendingDeleteAction);
			setPendingDeleteAction(void 0);
		}
	})] });
}
function isDeleteAction(action) {
	return action.id.endsWith(".delete") || action.commandId?.endsWith(".delete");
}
var DeleteActionButton = ({ action, label, onClick }) => {
	const disabled = !action?.availability.enabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		"aria-label": label,
		className: "text-muted-foreground hover:bg-accent hover:text-foreground",
		"data-testid": "history-delete-button",
		disabled,
		size: "icon-sm",
		title: label,
		variant: "ghost",
		onClick: (event) => {
			event.stopPropagation();
			if (action) onClick(action);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
	});
};
var PinActionButton = ({ isPinned, pinLabel, unpinLabel, onClick }) => {
	const label = isPinned ? unpinLabel : pinLabel;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		"aria-label": label,
		className: "text-muted-foreground hover:bg-accent hover:text-foreground",
		"data-testid": "history-pin-button",
		size: "icon-sm",
		title: label,
		variant: "ghost",
		onClick: (event) => {
			event.stopPropagation();
			onClick?.();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
			size: 14,
			className: cn(isPinned && "-rotate-45")
		})
	});
};
const HistoryRecordRow = ({ actions, avatar, deleteLabel, isPinned, isSelected, minHeight, pinLabel, selectLabel, showFixedActionShadow, sourceLabel, timeLabel, title, unpinLabel, onAction, onOpen, onSelectedChange, onTogglePin }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "history.record-row",
	className: cn(historyTableGridClassName, historyBodyRowClassName),
	style: { minHeight },
	"data-state": isSelected ? "selected" : void 0,
	role: "row",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistorySelectionCell, {
			checked: isSelected,
			disabled: isPinned,
			label: selectLabel,
			onCheckedChange: onSelectedChange
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.record-row.cell",
			className: historyBodyCellClassName,
			role: "cell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
				className: "min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-6 shrink-0 items-center justify-center text-foreground text-sm leading-none",
					children: avatar
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-foreground text-xs",
					children: sourceLabel
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.record-row.cell",
			className: historyBodyCellClassName,
			role: "cell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
				className: "min-w-0 flex-1 items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "history.record-row.history-record-rename-field",
					className: "min-w-0 flex-1",
					"data-testid": "history-record-rename-field",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
						className: "min-w-0 flex-1 items-center gap-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryTitleButton, {
							title,
							onOpen
						})
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.record-row.cell",
			className: historyBodyCellClassName,
			role: "cell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground text-xs tabular-nums",
				children: timeLabel
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "history.record-row.cell",
			className: cn(historyBodyCellClassName, historyFixedActionCellClassName, showFixedActionShadow && "[--history-fixed-action-shadow:color-mix(in_oklch,var(--foreground)_33.3333%,transparent)] [box-shadow:-8px_0_12px_-12px_var(--history-fixed-action-shadow)]"),
			role: "cell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryActionsCell, {
				actions,
				deleteLabel,
				isPinned,
				pinLabel,
				unpinLabel,
				onAction,
				onTogglePin
			})
		})
	]
});
function formatHistoryTime(value, t) {
	const date = (0, import_dayjs_min.default)(value);
	const now = (0, import_dayjs_min.default)();
	if (!date.isValid()) return t("history.records.table.emptyValue");
	if (date.isSame(now, "day")) return date.format("HH:mm");
	if (date.isSame(now.subtract(1, "day"), "day")) return t("common.yesterday");
	if (date.isSame(now, "year")) return date.format("MM/DD");
	return date.format("YYYY/MM/DD");
}
function HistoryRecordList({ descriptor, items, isLoading, isSelected, selectAllState, selectionDisabled, onToggleSelection, onToggleSelectAll }) {
	const { t } = useTranslation();
	const list = (0, import_react.useMemo)(() => Array.from(items), [items]);
	const [renameTarget, setRenameTarget] = (0, import_react.useState)(null);
	const [showFixedActionShadow, setShowFixedActionShadow] = (0, import_react.useState)(false);
	const { getId, getName, getRowActions, getSelectLabel, getSourceLabel, getUpdatedAt, isPinned, onOpen, onRename, onTogglePin, renderAvatar, renderRowMenu, rowHeight, strings: { deleteLabel, pinLabel, unpinLabel } } = descriptor;
	const openRename = (0, import_react.useCallback)((id, name) => setRenameTarget({
		id,
		name
	}), []);
	const handleRenameSubmit = (0, import_react.useCallback)((name) => {
		if (!renameTarget) return;
		onRename(renameTarget.id, name);
	}, [onRename, renameTarget]);
	const handleRenameOpenChange = (0, import_react.useCallback)((open) => {
		if (!open) setRenameTarget(null);
	}, []);
	const emptyTitle = isLoading ? descriptor.strings.loadingTitle : descriptor.strings.emptyTitle;
	const emptyDescription = isLoading ? descriptor.strings.loadingDescription : descriptor.strings.emptyDescription;
	const emptyContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "history.record-list",
		className: "flex min-h-[320px] items-center justify-center px-5 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			compact: true,
			icon: MessageSquareText,
			title: emptyTitle,
			description: emptyDescription
		})
	});
	const header = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryTableHeader, {
		actionsLabel: t("history.records.table.actions"),
		selectAllLabel: t("common.select_all"),
		selectedState: selectAllState,
		selectionDisabled,
		sourceLabel: descriptor.strings.sourceLabel,
		showFixedActionShadow,
		timeLabel: t("history.records.table.time"),
		titleLabel: descriptor.strings.titleColumnLabel,
		onToggleAll: onToggleSelectAll
	});
	const renderRow = (0, import_react.useCallback)((item) => {
		const id = getId(item);
		const rowActions = getRowActions(item, openRename);
		const pinned = isPinned(id);
		return renderRowMenu(item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryRecordRow, {
			actions: rowActions.actions,
			avatar: renderAvatar(item),
			deleteLabel,
			isPinned: pinned,
			isSelected: !pinned && isSelected(id),
			minHeight: rowHeight,
			pinLabel,
			selectLabel: getSelectLabel(item),
			showFixedActionShadow,
			sourceLabel: getSourceLabel(item),
			timeLabel: formatHistoryTime(getUpdatedAt(item), t),
			title: getName(item),
			unpinLabel,
			onAction: rowActions.onAction,
			onOpen: () => onOpen(item),
			onSelectedChange: (checked) => onToggleSelection(id, checked),
			onTogglePin: async () => {
				if (await onTogglePin(item) !== false) onToggleSelection(id, false);
			}
		}), rowActions);
	}, [
		deleteLabel,
		getId,
		getName,
		getRowActions,
		getSelectLabel,
		getSourceLabel,
		getUpdatedAt,
		isPinned,
		isSelected,
		onOpen,
		onTogglePin,
		onToggleSelection,
		openRename,
		pinLabel,
		renderAvatar,
		renderRowMenu,
		rowHeight,
		showFixedActionShadow,
		t,
		unpinLabel
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "history.record-list",
		className: "flex min-h-0 flex-1 flex-col overflow-hidden bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryVirtualTable, {
			emptyContent,
			estimateSize: () => descriptor.rowHeight,
			header,
			items: list,
			onFixedActionShadowChange: setShowFixedActionShadow,
			renderRow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditNameDialog_default, {
			open: !!renameTarget,
			title: descriptor.strings.renameDialogTitle,
			initialName: renameTarget?.name ?? "",
			onSubmit: handleRenameSubmit,
			onOpenChange: handleRenameOpenChange
		})]
	});
}
const ALL_SOURCE_ID = "all";
var UNLINKED_ASSISTANT_SOURCE_ID = "__unlinked_assistant__";
var UNKNOWN_AGENT_SOURCE_ID = "__unknown_agent__";
function getTopicSourceId(topic, assistantById) {
	if (!topic.assistantId) return UNLINKED_ASSISTANT_SOURCE_ID;
	if (assistantById && !assistantById.has(topic.assistantId)) return UNLINKED_ASSISTANT_SOURCE_ID;
	return topic.assistantId;
}
function getSessionAgentSourceId(session, agentById) {
	if (!session.agentId) return UNKNOWN_AGENT_SOURCE_ID;
	if (agentById && !agentById.has(session.agentId)) return UNKNOWN_AGENT_SOURCE_ID;
	return session.agentId;
}
function getAgentHistoryStatus(streamStatus) {
	if (streamStatus?.isPending === true) return "running";
	if (streamStatus?.status === "error") return "failed";
	return "completed";
}
function findAdjacentHistoryRecordAfterBulkDelete(items, deletedIds, activeId, getId) {
	const deletedIdSet = new Set(deletedIds);
	const activeIndex = items.findIndex((item) => getId(item) === activeId);
	if (activeIndex < 0) return void 0;
	for (let index = activeIndex + 1; index < items.length; index += 1) if (!deletedIdSet.has(getId(items[index]))) return items[index];
	for (let index = activeIndex - 1; index >= 0; index -= 1) if (!deletedIdSet.has(getId(items[index]))) return items[index];
}
function buildAgentStatusItems(t) {
	return [
		{
			id: "all",
			label: t("common.all")
		},
		{
			id: "running",
			label: t("history.records.status.running"),
			dotClassName: "text-warning"
		},
		{
			id: "completed",
			label: t("history.records.status.completed"),
			dotClassName: "text-success"
		},
		{
			id: "failed",
			label: t("history.records.status.failed"),
			dotClassName: "text-destructive"
		}
	];
}
function buildAssistantSources(topics, assistantById, assistantRankById, unlinkedAssistantLabel, t) {
	const hasUnlinkedAssistant = topics.some((topic) => getTopicSourceId(topic, assistantById) === UNLINKED_ASSISTANT_SOURCE_ID);
	return [
		{
			id: "all",
			label: t("common.all")
		},
		...Array.from(assistantById.values()).sort((left, right) => getAssistantSourceRank(left.id, assistantRankById) - getAssistantSourceRank(right.id, assistantRankById)).map((assistant) => ({
			id: assistant.id,
			label: assistant.name,
			icon: assistant.emoji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "history.build-assistant-sources",
				className: "text-sm leading-none",
				children: assistant.emoji
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 15 })
		})),
		...hasUnlinkedAssistant ? [{
			id: UNLINKED_ASSISTANT_SOURCE_ID,
			label: unlinkedAssistantLabel,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 15 })
		}] : []
	];
}
function buildAgentSources(sessions, agentById, agentRankById, unknownAgentLabel, t) {
	const hasUnknownAgent = sessions.some((session) => getSessionAgentSourceId(session, agentById) === UNKNOWN_AGENT_SOURCE_ID);
	return [
		{
			id: "all",
			label: t("common.all")
		},
		...Array.from(agentById.values()).sort((left, right) => getAgentSourceRank(left.id, agentRankById) - getAgentSourceRank(right.id, agentRankById)).map((agent) => {
			return {
				id: agent.id,
				label: agent.name,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiIcon_default, {
					emoji: getAgentAvatarFromConfiguration(agent.configuration),
					size: 18,
					fontSize: 11,
					className: "mr-0 text-foreground"
				})
			};
		}),
		...hasUnknownAgent ? [{
			id: UNKNOWN_AGENT_SOURCE_ID,
			label: unknownAgentLabel,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 15 })
		}] : []
	];
}
function getAssistantSourceRank(sourceId, assistantRankById) {
	const assistantRank = assistantRankById.get(sourceId);
	if (assistantRank !== void 0) return assistantRank;
	return Number.MAX_SAFE_INTEGER;
}
function getAgentSourceRank(sourceId, agentRankById) {
	const agentRank = agentRankById.get(sourceId);
	if (agentRank !== void 0) return agentRank;
	return Number.MAX_SAFE_INTEGER;
}
var HistoryTopBar = ({ mode, toolbarLeading, searchText, searchPlaceholder, onSearchTextChange, selectedSourceId, onSourceSelect, renderSourceFilter, statusOptions, statusLabel, statusPlaceholder, selectedStatus, onStatusSelect, selectedCount, bulkDeleteCount, bulkMoveTargets = [], onBulkDelete, onBulkMove }) => {
	const { t } = useTranslation();
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, import_react.useState)(false);
	const [moveDialogOpen, setMoveDialogOpen] = (0, import_react.useState)(false);
	const [moveTargetId, setMoveTargetId] = (0, import_react.useState)("");
	const moveTargets = (0, import_react.useMemo)(() => Array.from(bulkMoveTargets), [bulkMoveTargets]);
	const selectedMoveTarget = (0, import_react.useMemo)(() => moveTargets.find((target) => target.id === moveTargetId), [moveTargetId, moveTargets]);
	const canBulkDelete = bulkDeleteCount > 0 && !!onBulkDelete;
	const canBulkMove = mode === "assistant" && selectedCount > 0 && moveTargets.length > 0 && !!onBulkMove;
	const deleteTitle = mode === "assistant" ? t("history.records.bulkDeleteTopics.title") : t("history.records.bulkDeleteSessions.title");
	const deleteDescription = mode === "assistant" ? t("history.records.bulkDeleteTopics.description", { count: bulkDeleteCount }) : t("history.records.bulkDeleteSessions.description", { count: bulkDeleteCount });
	(0, import_react.useEffect)(() => {
		if (!moveDialogOpen) return;
		if (moveTargets.length === 0) {
			setMoveTargetId("");
			return;
		}
		if (!moveTargets.some((target) => target.id === moveTargetId)) setMoveTargetId(moveTargets[0].id);
	}, [
		moveDialogOpen,
		moveTargetId,
		moveTargets
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "history.top-bar",
			className: "flex h-11 shrink-0 items-center gap-2 bg-card px-2",
			children: [
				toolbarLeading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 items-center",
					children: toolbarLeading
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[220px] max-w-[38vw] [&_[data-slot=input-group-control]]:h-8 [&_[data-slot=input-group]]:h-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
						value: searchText,
						placeholder: searchPlaceholder,
						"aria-label": searchPlaceholder,
						onChange: (event) => onSearchTextChange(event.target.value),
						onClear: () => onSearchTextChange(""),
						clearLabel: t("history.records.clearSearch")
					})
				}),
				renderSourceFilter(selectedSourceId === "all" ? null : selectedSourceId, (id) => onSourceSelect(id ?? "all")),
				statusOptions && selectedStatus && onStatusSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group/status-select relative flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: selectedStatus === "all" ? "" : selectedStatus,
						onValueChange: (value) => onStatusSelect(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-label": statusLabel,
							className: cn("h-8 w-[132px] text-xs", selectedStatus !== "all" && "[&_svg]:transition-opacity group-focus-within/status-select:[&_svg]:opacity-0 group-hover/status-select:[&_svg]:opacity-0"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: statusPlaceholder ?? statusLabel })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: statusOptions.filter((option) => option.id !== "all").map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: option.id,
							className: "text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [option.dotClassName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full bg-current", option.dotClassName) }), option.label]
							})
						}, option.id)) })]
					}), selectedStatus !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						"aria-label": t("common.clear"),
						onClick: (event) => {
							event.stopPropagation();
							onStatusSelect("all");
						},
						className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-2 flex size-5 min-h-0 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-muted-foreground opacity-0 shadow-none transition-[background-color,color,opacity] hover:bg-muted hover:text-foreground focus-visible:pointer-events-auto focus-visible:opacity-100 group-focus-within/status-select:pointer-events-auto group-focus-within/status-select:opacity-100 group-hover/status-select:pointer-events-auto group-hover/status-select:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1" }),
				mode === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "h-8 gap-1.5 rounded-md px-2.5 text-xs shadow-none",
					disabled: !canBulkMove,
					onClick: () => {
						setMoveTargetId((current) => current || moveTargets[0]?.id || "");
						setMoveDialogOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderInput, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("history.records.bulkMove"), selectedCount > 0 ? ` (${selectedCount})` : ""] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "h-8 gap-1.5 rounded-md px-2.5 text-destructive text-xs shadow-none hover:text-destructive",
					disabled: !canBulkDelete,
					onClick: () => setDeleteDialogOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("history.records.bulkDelete"), bulkDeleteCount > 0 ? ` (${bulkDeleteCount})` : ""] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: deleteDialogOpen,
			onOpenChange: setDeleteDialogOpen,
			title: deleteTitle,
			description: deleteDescription,
			confirmText: t("common.delete"),
			cancelText: t("common.cancel"),
			destructive: true,
			onConfirm: async () => {
				await onBulkDelete?.();
				setDeleteDialogOpen(false);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: moveDialogOpen,
			onOpenChange: setMoveDialogOpen,
			title: t("history.records.bulkMoveTopics.title"),
			description: t("history.records.bulkMoveTopics.description", { count: selectedCount }),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-muted-foreground text-xs leading-4",
					children: t("history.records.bulkMoveTopics.target")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectDropdown, {
					items: moveTargets,
					selectedId: moveTargetId,
					onSelect: setMoveTargetId,
					placeholder: t("history.records.bulkMoveTopics.placeholder"),
					emptyText: t("history.records.bulkMoveTopics.empty"),
					triggerClassName: "h-8 rounded-md border-border-subtle bg-card text-xs shadow-none",
					renderSelected: (target) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryBulkMoveTargetLabel, { target }),
					renderItem: (target) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryBulkMoveTargetLabel, { target })
				})]
			}),
			confirmText: t("history.records.bulkMoveTopics.confirm"),
			cancelText: t("common.cancel"),
			onConfirm: async () => {
				if (!selectedMoveTarget) return;
				await onBulkMove?.(selectedMoveTarget.id);
				setMoveDialogOpen(false);
			}
		})
	] });
};
var HistoryBulkMoveTargetLabel = ({ target }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"data-ui": "history.bulk-move-target",
	className: "flex min-w-0 items-center gap-2",
	children: [target.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex size-4 shrink-0 items-center justify-center",
		children: target.icon
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "truncate",
		children: target.label
	})]
});
var HistoryTopBar_default = HistoryTopBar;
function HistoryRecordsContent({ descriptor, controller, isLoading, toolbarLeading }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ui": "history.records-content",
		className: "flex min-h-0 flex-1 flex-col overflow-hidden bg-card pb-3 text-card-foreground",
		"aria-label": t("history.records.shortTitle"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryTopBar_default, {
			mode: descriptor.mode,
			toolbarLeading,
			searchText: controller.searchText,
			searchPlaceholder: descriptor.strings.searchPlaceholder,
			onSearchTextChange: controller.setSearchText,
			selectedSourceId: controller.selectedSourceId,
			onSourceSelect: controller.setSelectedSourceId,
			renderSourceFilter: descriptor.renderSourceFilter,
			statusOptions: descriptor.statusOptions,
			statusLabel: t("history.records.filter.statusLabel"),
			statusPlaceholder: t("history.records.filter.statusPlaceholder"),
			selectedStatus: controller.selectedStatus,
			onStatusSelect: controller.setSelectedStatus,
			selectedCount: controller.selectedCount,
			bulkDeleteCount: controller.bulkDeleteCount,
			bulkMoveTargets: descriptor.bulkMoveTargets,
			onBulkDelete: controller.handleBulkDelete,
			onBulkMove: descriptor.onBulkMove ? controller.handleBulkMove : void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryRecordList, {
			descriptor,
			items: controller.visibleItems,
			isLoading,
			isSelected: controller.isSelected,
			selectAllState: controller.selectAllState,
			selectionDisabled: controller.selectionDisabled,
			onToggleSelection: controller.toggleSelection,
			onToggleSelectAll: controller.toggleSelectAll
		})]
	});
}
var SourceFilterTrigger = ({ ref, label, icon, hasValue, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
	"data-ui": "history.source-filter-trigger",
	ref,
	type: "button",
	className: cn("inline-flex h-8 w-fit min-w-[128px] max-w-[220px] items-center justify-between gap-2 whitespace-nowrap", "rounded-md border border-border bg-transparent px-3 font-normal text-foreground text-xs outline-none transition-colors", "hover:bg-accent/40 focus-visible:bg-accent/40", "data-[state=open]:bg-accent/40", className),
	...mergeUiProps(props, "history.source-filter-trigger"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 items-center gap-1.5",
		children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-4 shrink-0 items-center justify-center",
			children: icon
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("min-w-0 truncate", !hasValue && "text-muted-foreground"),
			children: label
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground", hasValue && "transition-opacity group-focus-within/source-select:opacity-0 group-hover/source-select:opacity-0") })]
});
SourceFilterTrigger.displayName = "SourceFilterTrigger";
const HistorySourceFilterField = ({ label, icon, hasValue, clearLabel, onClear, selector }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "history.source-filter-field",
	className: "group/source-select relative flex shrink-0 items-center",
	children: [selector(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceFilterTrigger, {
		label,
		icon,
		hasValue
	})), hasValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "ghost",
		"aria-label": clearLabel,
		onClick: (event) => {
			event.stopPropagation();
			onClear();
		},
		className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-2 flex size-5 min-h-0 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-muted-foreground opacity-0 shadow-none transition-[background-color,color,opacity] hover:bg-muted hover:text-foreground focus-visible:pointer-events-auto focus-visible:opacity-100 group-focus-within/source-select:pointer-events-auto group-focus-within/source-select:opacity-100 group-hover/source-select:pointer-events-auto group-hover/source-select:opacity-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
	}) : null]
});
function useHistoryRecordsController({ descriptor, timeSorted, sourceSorted, activeRecordId }) {
	const { getId, isPinned, getSourceId, statusOf, matchesSearch, sources, onBulkDelete, onActiveRecordChange, onBulkMove } = descriptor;
	const [searchText, setSearchText] = (0, import_react.useState)("");
	const [selectedSourceId, setSelectedSourceId] = (0, import_react.useState)("all");
	const [selectedStatus, setSelectedStatus] = (0, import_react.useState)("all");
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
	const visibleItems = (0, import_react.useMemo)(() => {
		const base = selectedSourceId === "all" ? timeSorted : sourceSorted;
		const afterStatus = statusOf && selectedStatus !== "all" ? base.filter((item) => statusOf(item) === selectedStatus) : base;
		const afterSource = selectedSourceId === "all" ? afterStatus : afterStatus.filter((item) => getSourceId(item) === selectedSourceId);
		const keywords = searchText.trim().toLowerCase();
		if (!keywords) return afterSource;
		return afterSource.filter((item) => matchesSearch(item, keywords));
	}, [
		getSourceId,
		matchesSearch,
		searchText,
		selectedSourceId,
		selectedStatus,
		sourceSorted,
		statusOf,
		timeSorted
	]);
	(0, import_react.useEffect)(() => {
		if (selectedSourceId === "all") return;
		if (sources.some((source) => source.id === selectedSourceId)) return;
		setSelectedSourceId("all");
	}, [selectedSourceId, sources]);
	(0, import_react.useEffect)(() => {
		const visibleSelectableIds = new Set(visibleItems.filter((item) => !isPinned(getId(item))).map((item) => getId(item)));
		setSelectedIds((ids) => {
			const next = ids.filter((id) => visibleSelectableIds.has(id));
			return next.length === ids.length ? ids : next;
		});
	}, [
		getId,
		isPinned,
		visibleItems
	]);
	const selectableIds = (0, import_react.useMemo)(() => visibleItems.filter((item) => !isPinned(getId(item))).map((item) => getId(item)), [
		getId,
		isPinned,
		visibleItems
	]);
	const selectedIdSet = (0, import_react.useMemo)(() => new Set(selectedIds), [selectedIds]);
	const selectedDeletableIds = (0, import_react.useMemo)(() => selectedIds.filter((id) => !isPinned(id)), [isPinned, selectedIds]);
	const selectedSelectableCount = (0, import_react.useMemo)(() => selectableIds.filter((id) => selectedIdSet.has(id)).length, [selectableIds, selectedIdSet]);
	const selectAllState = selectableIds.length > 0 && selectedSelectableCount === selectableIds.length ? true : selectedSelectableCount > 0 ? "indeterminate" : false;
	const isSelected = (0, import_react.useCallback)((id) => selectedIdSet.has(id), [selectedIdSet]);
	const toggleSelection = (0, import_react.useCallback)((id, checked) => {
		if (checked && isPinned(id)) return;
		setSelectedIds((ids) => checked ? ids.includes(id) ? ids : [...ids, id] : ids.filter((current) => current !== id));
	}, [isPinned]);
	const toggleSelectAll = (0, import_react.useCallback)((checked) => setSelectedIds(checked ? selectableIds : []), [selectableIds]);
	const handleBulkDelete = (0, import_react.useCallback)(async () => {
		const ids = selectedDeletableIds;
		if (ids.length === 0) return;
		const deletedIds = await onBulkDelete(ids);
		if (!deletedIds) return;
		const deletedIdSet = new Set(deletedIds);
		setSelectedIds((current) => current.filter((id) => !deletedIdSet.has(id)));
		if (activeRecordId && deletedIds.includes(activeRecordId)) onActiveRecordChange(findAdjacentHistoryRecordAfterBulkDelete(timeSorted, deletedIds, activeRecordId, getId) ?? null);
	}, [
		activeRecordId,
		getId,
		onActiveRecordChange,
		onBulkDelete,
		selectedDeletableIds,
		timeSorted
	]);
	const handleBulkMove = (0, import_react.useCallback)(async (targetId) => {
		const ids = selectedIds;
		if (ids.length === 0 || !onBulkMove) return;
		const movedIds = await onBulkMove(targetId, ids);
		if (!movedIds) return;
		const movedIdSet = new Set(movedIds);
		setSelectedIds((current) => current.filter((id) => !movedIdSet.has(id)));
	}, [onBulkMove, selectedIds]);
	return {
		searchText,
		setSearchText,
		selectedSourceId,
		setSelectedSourceId,
		selectedStatus,
		setSelectedStatus,
		visibleItems,
		selectedIds,
		selectedCount: selectedIds.length,
		bulkDeleteCount: selectedDeletableIds.length,
		selectAllState,
		selectionDisabled: selectableIds.length === 0,
		isSelected,
		toggleSelection,
		toggleSelectAll,
		handleBulkDelete,
		handleBulkMove
	};
}
export { buildAgentSources as a, findAdjacentHistoryRecordAfterBulkDelete as c, getTopicSourceId as d, HistoryActionContextMenu as f, ALL_SOURCE_ID as i, getAgentHistoryStatus as l, HistorySourceFilterField as n, buildAgentStatusItems as o, HistoryRecordsContent as r, buildAssistantSources as s, useHistoryRecordsController as t, getSessionAgentSourceId as u };
