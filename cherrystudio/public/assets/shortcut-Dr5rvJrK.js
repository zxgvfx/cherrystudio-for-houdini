import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as preferenceService } from "./PreferenceService-ay5pWhVK.js";
import { t as isEmpty } from "./isEmpty-E8ry7LkJ.js";
import { o as platform, r as isMac } from "./platform-CINZzEpE.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import { n as UiDataSlot } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import "./es2015-CF8XujIC.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { a as RowFlex } from "./flex-Cbul8ND0.js";
import { n as MenuItem, r as MenuList } from "./menu-item-Dgf4coMT.js";
import { t as Kbd } from "./kbd-CRjah4po.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { a as useCommandShortcuts, d as formatShortcutDisplay, g as findCommandDefinition, i as getAllShortcutDefaultPreferences, l as convertKeyToAccelerator, m as normalizeShortcutToken, p as isValidShortcut, s as findKeybindingConflicts, u as formatKeyDisplay } from "./command-DJ8bdie_.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as Funnel } from "./funnel-BpKcZdJM.js";
import { t as Keyboard } from "./keyboard-BW0PutTQ.js";
import { t as MessageSquareText } from "./message-square-text-Dd5lGumV.js";
import { t as Search } from "./search-Dz0ktO-n.js";
import { t as Sparkles } from "./sparkles-C7lwKrP8.js";
import { t as Tags } from "./tags-m8rvDSCI.js";
import { t as Undo2 } from "./undo-2-DdM52q7p.js";
import { t as popup } from "./popup-BLG-Gue5.js";
import { t as useTimer } from "./useTimer-BCHMb2QP.js";
import { t as Scrollbar_default } from "./Scrollbar-DJ9MDpuH.js";
import { f as SettingsContentBody, r as SettingGroup } from "./SettingsPrimitives-ctf-2wxz.js";
import { n as settingsContentHeaderTitleClassName, r as settingsContentScrollClassName, t as settingsContentHeaderClassName } from "./settingsStyles-BUkbzNWg.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("ShortcutSettings");
var isBindingEqual = (a, b) => a.length === b.length && a.every((key, index) => key === b[index]);
var keyCodeToAccelerator = {
	Backquote: "`",
	Period: ".",
	NumpadEnter: "Enter",
	NumpadAdd: "numadd",
	NumpadSubtract: "numsub",
	Space: "Space",
	Enter: "Enter",
	Backspace: "Backspace",
	Tab: "Tab",
	Delete: "Delete"
};
var passthrough = /^(Page(Up|Down)|Insert|Home|End|Arrow(Up|Down|Left|Right)|F([1-9]|1[0-9])|Slash|Semicolon|Bracket(Left|Right)|Backslash|Quote|Comma|Minus|Equal)$/;
var usableEndKeys = (code) => {
	if (/^Key[A-Z]$/.test(code) || /^(Digit|Numpad)\d$/.test(code)) return normalizeShortcutToken(code) ?? null;
	if (keyCodeToAccelerator[code]) return keyCodeToAccelerator[code];
	if (passthrough.test(code)) return convertKeyToAccelerator(code) ?? null;
	return null;
};
var groupIconMap = {
	general: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { size: 16 }),
	chat: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { size: 16 }),
	topic: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { size: 16 }),
	assistant: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 })
};
var ShortcutGroupFilterMenu = ({ groups, activeGroup, onSelect }) => {
	const { t } = useTranslation();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "h-9 gap-1.5 rounded-lg px-2.5 text-xs shadow-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { size: 14 }),
					t("settings.shortcuts.filter"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						size: 14,
						className: "text-muted-foreground"
					})
				]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			className: "w-52 rounded-xl p-1.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuList, {
				className: "gap-0.5",
				children: groups.map((group) => {
					const active = activeGroup === group.key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
						className: "h-8 rounded-lg px-2.5 text-sm",
						icon: group.key === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { size: 16 }) : groupIconMap[group.key],
						active,
						label: group.label,
						suffix: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: group.count
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-3.5", active ? "opacity-100" : "opacity-0") })]
						}),
						onClick: () => {
							onSelect(group.key);
							setOpen(false);
						}
					}, group.key);
				})
			})
		})]
	});
};
var ShortcutSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { shortcuts, updatePreference } = useCommandShortcuts();
	const recorderRefs = (0, import_react.useRef)({});
	const [editingKey, setEditingKey] = (0, import_react.useState)(null);
	const [pendingKeys, setPendingKeys] = (0, import_react.useState)([]);
	const [conflictLabel, setConflictLabel] = (0, import_react.useState)(null);
	const [systemConflictKey, setSystemConflictKey] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeGroup, setActiveGroup] = (0, import_react.useState)("all");
	const { setTimeoutTimer, clearTimeoutTimer } = useTimer();
	const groupMeta = (0, import_react.useMemo)(() => [
		{
			key: "general",
			label: t("settings.shortcuts.categories.general")
		},
		{
			key: "chat",
			label: t("settings.shortcuts.categories.chat")
		},
		{
			key: "topic",
			label: t("settings.shortcuts.categories.topic")
		},
		{
			key: "assistant",
			label: t("settings.shortcuts.categories.assistant")
		}
	], [t]);
	const shortcutsByGroup = (0, import_react.useMemo)(() => {
		return shortcuts.reduce((acc, shortcut) => {
			acc[shortcut.group].push(shortcut);
			return acc;
		}, {
			general: [],
			chat: [],
			topic: [],
			assistant: []
		});
	}, [shortcuts]);
	const groupOptions = (0, import_react.useMemo)(() => [{
		key: "all",
		label: t("settings.shortcuts.categories.all"),
		count: shortcuts.length
	}, ...groupMeta.map((group) => ({
		...group,
		count: shortcutsByGroup[group.key].length
	}))], [
		groupMeta,
		shortcuts.length,
		shortcutsByGroup,
		t
	]);
	const currentGroupShortcuts = activeGroup === "all" ? shortcuts : shortcutsByGroup[activeGroup];
	const visibleShortcuts = (0, import_react.useMemo)(() => {
		const query = searchQuery.toLowerCase().trim();
		return currentGroupShortcuts.filter((record) => {
			if (!query) return true;
			const display = record.preference.binding.length > 0 ? formatShortcutDisplay(record.preference.binding, isMac).toLowerCase() : "";
			return record.label.toLowerCase().includes(query) || display.includes(query);
		});
	}, [currentGroupShortcuts, searchQuery]);
	const shortcutPreferences = (0, import_react.useMemo)(() => shortcuts.reduce((acc, shortcut) => {
		acc[shortcut.command] = shortcut.preference;
		return acc;
	}, {}), [shortcuts]);
	const clearEditingState = () => {
		clearTimeoutTimer("conflict-clear");
		setEditingKey(null);
		setPendingKeys([]);
		setConflictLabel(null);
	};
	const clearSystemConflict = (key) => {
		setSystemConflictKey((currentKey) => {
			if (!key || currentKey === key) return null;
			return currentKey;
		});
	};
	(0, import_react.useEffect)(() => {
		return window.api.shortcut.onRegistrationConflict(({ key, hasConflict }) => {
			setSystemConflictKey((currentKey) => {
				if (hasConflict) return key;
				return currentKey === key ? null : currentKey;
			});
			if (hasConflict) toast.error(t("settings.shortcuts.occupied_by_other_application"));
		});
	}, [t]);
	(0, import_react.useEffect)(() => {
		if (activeGroup === "all") return;
		if (currentGroupShortcuts.length === 0) {
			const firstAvailable = groupMeta.find((group) => shortcutsByGroup[group.key].length > 0);
			if (firstAvailable && firstAvailable.key !== activeGroup) setActiveGroup(firstAvailable.key);
		}
	}, [
		activeGroup,
		currentGroupShortcuts.length,
		groupMeta,
		shortcutsByGroup
	]);
	const handleAddShortcut = (key) => {
		clearEditingState();
		setEditingKey(key);
		setTimeoutTimer(`focus-${key}`, () => {
			recorderRefs.current[key]?.focus();
		}, 0);
	};
	const handleUpdateFailure = (record, error) => {
		logger.error(`Failed to update shortcut preference: ${record.key}`, error);
		toast.error(t("settings.shortcuts.save_failed_with_name", { name: record.label }));
	};
	const handleResetShortcut = async (record) => {
		const conflict = findConflictLabel(record.command, {
			binding: record.defaultPreference.binding,
			enabled: record.defaultPreference.enabled
		});
		if (conflict) {
			showConflictToast(conflict);
			return;
		}
		try {
			clearSystemConflict(record.key);
			await updatePreference(record.key, {
				binding: record.defaultPreference.binding,
				enabled: record.defaultPreference.enabled
			});
			clearEditingState();
		} catch (error) {
			handleUpdateFailure(record, error);
		}
	};
	const getCommandLabel = (command) => {
		const shortcut = shortcuts.find((item) => item.command === command);
		if (shortcut) return shortcut.label;
		const definition = findCommandDefinition(command);
		return definition ? t(definition.titleKey) : command;
	};
	const findConflictLabel = (command, preference, preferences = shortcutPreferences) => {
		const conflict = findKeybindingConflicts({
			command,
			preference,
			preferences,
			platform
		})[0];
		return conflict ? getCommandLabel(conflict.conflictingCommand) : null;
	};
	const showConflictToast = (label) => {
		toast.error(t("settings.shortcuts.conflict_with", { name: label }));
	};
	const handleKeyDown = async (event, record) => {
		event.preventDefault();
		event.stopPropagation();
		if (event.nativeEvent.isComposing || event.key === "Process") return;
		if (event.code === "Escape") {
			clearEditingState();
			return;
		}
		const keys = [];
		if (event.ctrlKey) keys.push(isMac ? "Ctrl" : "CommandOrControl");
		if (event.altKey) keys.push("Alt");
		if (event.metaKey) keys.push(isMac ? "CommandOrControl" : "Meta");
		if (event.shiftKey) keys.push("Shift");
		const endKey = usableEndKeys(event.code);
		if (endKey) keys.push(endKey);
		const binding = keys;
		setPendingKeys(binding);
		if (!isValidShortcut(binding)) {
			setConflictLabel(null);
			return;
		}
		const conflict = findConflictLabel(record.command, {
			binding,
			enabled: true
		});
		if (conflict) {
			setConflictLabel(conflict);
			clearTimeoutTimer("conflict-clear");
			setTimeoutTimer("conflict-clear", () => setConflictLabel(null), 2e3);
			return;
		}
		setConflictLabel(null);
		try {
			clearSystemConflict(record.key);
			await updatePreference(record.key, {
				binding,
				enabled: true
			});
			clearEditingState();
		} catch (error) {
			handleUpdateFailure(record, error);
		}
	};
	const handleResetAllShortcuts = async () => {
		if (!await popup.confirm({
			title: t("settings.shortcuts.reset_defaults_confirm"),
			centered: true
		})) return;
		const updates = getAllShortcutDefaultPreferences();
		try {
			clearSystemConflict();
			await preferenceService.setMultiple(updates);
		} catch (error) {
			logger.error("Failed to reset all shortcuts to defaults", error);
			toast.error(t("settings.shortcuts.reset_defaults_failed"));
		}
	};
	const handleToggleVisibleShortcuts = async (enabled) => {
		const nextPreferencesByCommand = { ...shortcutPreferences };
		const updates = visibleShortcuts.reduce((acc, record) => {
			if (!record.preference.binding.length) return acc;
			nextPreferencesByCommand[record.command] = {
				binding: record.preference.binding,
				enabled
			};
			acc[record.key] = {
				binding: record.preference.binding,
				enabled
			};
			return acc;
		}, {});
		if (isEmpty(updates)) return;
		if (enabled) for (const record of visibleShortcuts) {
			const nextPreference = nextPreferencesByCommand[record.command];
			if (!nextPreference?.enabled || !nextPreference.binding.length) continue;
			const conflict = findConflictLabel(record.command, nextPreference, nextPreferencesByCommand);
			if (conflict) {
				showConflictToast(conflict);
				return;
			}
		}
		try {
			clearSystemConflict();
			await preferenceService.setMultiple(updates);
		} catch (error) {
			logger.error(`Failed to toggle shortcuts for group ${activeGroup}`, error);
			toast.error(t("settings.shortcuts.save_failed"));
		}
	};
	const renderShortcutCell = (record) => {
		const isEditing = editingKey === record.key;
		const displayKeys = record.preference.binding;
		const displayShortcut = displayKeys.length > 0 ? formatShortcutDisplay(displayKeys, isMac) : "";
		const isEditable = record.keybinding.editable !== false;
		const isBindingModified = !isBindingEqual(displayKeys, record.defaultPreference.binding);
		const hasSystemConflict = systemConflictKey === record.key;
		const conflictMessage = conflictLabel ?? (hasSystemConflict ? t("settings.shortcuts.occupied_by_other_application") : null);
		if (isEditing) {
			const pendingDisplay = pendingKeys.length > 0 ? formatShortcutDisplay(pendingKeys, isMac) : "";
			const hasConflict = conflictMessage !== null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.render-shortcut-cell",
				className: "relative flex flex-col items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ref: (el) => {
						if (el) recorderRefs.current[record.key] = el;
					},
					type: "button",
					variant: "ghost",
					className: cn("h-8 w-36 rounded-lg border-border-subtle bg-background text-center text-sm", !pendingDisplay && "text-muted-foreground", hasConflict && "border-error-border focus-visible:border-error-border"),
					onKeyDown: (event) => void handleKeyDown(event, record),
					onBlur: (event) => {
						if (!event.relatedTarget?.closest(".shortcut-undo-icon")) clearEditingState();
					},
					children: pendingDisplay || t("settings.shortcuts.press_shortcut")
				}), hasConflict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-full right-0 mt-1 whitespace-nowrap text-error text-xs",
					children: conflictLabel ? t("settings.shortcuts.conflict_with", { name: conflictLabel }) : conflictMessage
				})]
			});
		}
		if (displayShortcut) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-shortcut-cell",
			className: "relative flex flex-col items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
				className: "items-center justify-end gap-2",
				children: [isBindingModified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: t("settings.shortcuts.reset_to_default"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {
						size: 16,
						className: "shortcut-undo-icon cursor-pointer text-muted-foreground opacity-70 transition-opacity hover:opacity-100",
						onClick: () => {
							handleResetShortcut(record);
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
					className: cn("min-h-9 items-center gap-1 rounded-lg border border-transparent bg-transparent px-2 py-1 transition-colors hover:border-border-subtle hover:bg-muted/35", hasSystemConflict && "border-error-border", isEditable ? "cursor-pointer hover:bg-accent/60" : "cursor-not-allowed opacity-50"),
					onClick: () => isEditable && handleAddShortcut(record.key),
					children: displayKeys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
						className: cn("min-w-6 rounded-md border border-border-subtle bg-card px-1.5 py-0.75 text-card-foreground text-xs shadow-none", hasSystemConflict && "border-error-border text-error"),
						children: formatKeyDisplay(key, isMac)
					}, key))
				})]
			}), hasSystemConflict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-full right-0 mt-1 whitespace-nowrap text-error text-xs",
				children: conflictMessage
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-shortcut-cell",
			className: "relative flex flex-col items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("rounded-lg border border-transparent border-dashed bg-transparent px-2.5 py-1.5 text-muted-foreground text-sm transition-colors hover:border-border-subtle hover:bg-muted/30", hasSystemConflict && "border-error-border text-error", isEditable ? "cursor-pointer hover:bg-accent/50" : "cursor-not-allowed opacity-50"),
				onClick: () => isEditable && handleAddShortcut(record.key),
				children: t("settings.shortcuts.press_shortcut")
			}), hasSystemConflict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-full right-0 mt-1 whitespace-nowrap text-error text-xs",
				children: conflictMessage
			})]
		});
	};
	const renderShortcutRow = (record, isLast) => {
		const switchNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			size: "sm",
			checked: record.preference.enabled,
			disabled: !record.preference.binding.length,
			onCheckedChange: () => {
				const nextPreference = {
					binding: record.preference.binding,
					enabled: !record.preference.enabled
				};
				if (nextPreference.enabled) {
					const conflict = findConflictLabel(record.command, nextPreference);
					if (conflict) {
						showConflictToast(conflict);
						return;
					}
				}
				clearSystemConflict(record.key);
				updatePreference(record.key, { enabled: nextPreference.enabled }).catch((error) => {
					handleUpdateFailure(record, error);
				});
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-shortcut-row",
			className: cn("grid grid-cols-[minmax(0,1fr)_14rem_2.5rem] items-center gap-3 py-2.5", !record.preference.enabled && "opacity-60", !isLast && "border-border-subtle border-b"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 pr-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-[14px] text-foreground",
						children: record.label
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-9 items-center justify-end",
					children: renderShortcutCell(record)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: !record.preference.binding.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("settings.shortcuts.bind_first_to_enable"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: switchNode })
					}) : switchNode
				})
			]
		}, record.key);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.shortcut-settings",
		className: "flex flex-1",
		"data-theme-mode": theme,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-[calc(100vh-var(--navbar-height)-6px)] w-full flex-1 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
				className: settingsContentScrollClassName,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
					theme,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn(settingsContentHeaderClassName, "mb-3 flex items-center justify-between gap-2"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: settingsContentHeaderTitleClassName,
								children: activeGroup === "all" ? t("settings.shortcuts.title") : groupOptions.find((item) => item.key === activeGroup)?.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-8 px-2.5 text-xs shadow-none",
										onClick: () => void handleToggleVisibleShortcuts(true),
										children: t("settings.shortcuts.all_enable")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-8 px-2.5 text-xs shadow-none",
										onClick: () => void handleToggleVisibleShortcuts(false),
										children: t("settings.shortcuts.all_disable")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-8 gap-1.5 px-2.5 text-destructive text-xs shadow-none hover:text-destructive",
										onClick: handleResetAllShortcuts,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { size: 13 }), t("settings.shortcuts.reset")]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-9 w-full rounded-lg border-border-subtle bg-background pr-3 pl-9",
									placeholder: t("settings.shortcuts.search_placeholder"),
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutGroupFilterMenu, {
								groups: groupOptions,
								activeGroup,
								onSelect: (group) => {
									setActiveGroup(group);
									setSearchQuery("");
								}
							})]
						}),
						visibleShortcuts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: visibleShortcuts.map((record, index) => renderShortcutRow(record, index === visibleShortcuts.length - 1)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-10 text-center text-muted-foreground text-sm",
							children: t("settings.shortcuts.empty")
						})
					]
				}) })
			})
		})
	});
};
var SplitComponent = ShortcutSettings;
export { SplitComponent as component };
