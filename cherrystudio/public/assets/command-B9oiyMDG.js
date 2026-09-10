import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { o as platform, r as isMac } from "./platform-fGkkNTU9.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as usePreference, t as useMultiplePreferences } from "./usePreference-DRNUEk4I.js";
import { n as UiDataSlot, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { a as DropdownMenuItem, c as DropdownMenuSeparator, d as DropdownMenuSubTrigger, f as DropdownMenuTrigger, l as DropdownMenuSub, n as DropdownMenuCheckboxItem, r as DropdownMenuContent, t as DropdownMenu, u as DropdownMenuSubContent } from "./dropdown-menu-CVGezg_T.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
import { a as ContextMenuItemContent, c as ContextMenuSubContent, i as ContextMenuItem, l as ContextMenuSubTrigger, n as ContextMenuCheckboxItem, o as ContextMenuSeparator, r as ContextMenuContent, s as ContextMenuSub, t as ContextMenu, u as ContextMenuTrigger } from "./context-menu-CeDdfmXT.js";
import { t as Kbd } from "./kbd-Bk40TDX7.js";
import { C as useCommandRuntime, D as rendererPlatform, E as ContextKeySnapshotContext, O as useCommandContextReader, S as useCommandMenuPresentationMode, T as ContextKeyRegisterContext, _ as findKeybindingRule, b as CommandSharedPreferencesContext, c as resolveCommandByKeybinding, f as getShortcutBindingFromKeyboardEvent, h as REGISTERED_KEYBINDINGS, k as useCommandContextSnapshot, n as useResolvedCommand, o as resolveMenuPresentationMode, r as getCommandShortcutLabel, t as useResolvedCommandMenu, v as ContextKeyService, w as useCommandShortcutPreferences, y as CommandRuntimeContext } from "./command-CyHQabGE.js";
import { t as useCloseBeforeAction } from "./useCloseBeforeAction-DvYaYpLC.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var buildSnapshot = (baseValues, stacks) => {
	const service = new ContextKeyService();
	for (const [key, value] of baseValues) service.set(key, value);
	for (const [key, entries] of stacks) {
		const entry = entries.at(-1);
		service.set(key, entry?.value);
	}
	return service.snapshot();
};
function CommandContextKeyProvider({ children }) {
	const [quickAssistantEnabled] = usePreference("feature.quick_assistant.enabled");
	const [selectionEnabled] = usePreference("feature.selection.enabled");
	const baseValuesRef = (0, import_react.useRef)(new Map([
		["platform", rendererPlatform],
		["feature.quick_assistant.enabled", quickAssistantEnabled],
		["feature.selection.enabled", selectionEnabled]
	]));
	const stacksRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const nextEntryIdRef = (0, import_react.useRef)(0);
	const [snapshot, setSnapshot] = (0, import_react.useState)(() => buildSnapshot(baseValuesRef.current, stacksRef.current));
	const publishSnapshot = (0, import_react.useCallback)(() => {
		setSnapshot(buildSnapshot(baseValuesRef.current, stacksRef.current));
	}, []);
	(0, import_react.useEffect)(() => {
		baseValuesRef.current.set("platform", rendererPlatform);
		baseValuesRef.current.set("feature.quick_assistant.enabled", quickAssistantEnabled);
		baseValuesRef.current.set("feature.selection.enabled", selectionEnabled);
		publishSnapshot();
	}, [
		publishSnapshot,
		quickAssistantEnabled,
		selectionEnabled
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextKeyRegisterContext, {
		value: (0, import_react.useCallback)((key, value) => {
			const entry = {
				id: nextEntryIdRef.current++,
				value
			};
			const entries = stacksRef.current.get(key) ?? [];
			entries.push(entry);
			stacksRef.current.set(key, entries);
			publishSnapshot();
			return () => {
				const currentEntries = stacksRef.current.get(key);
				if (!currentEntries) return;
				const nextEntries = currentEntries.filter((current) => current.id !== entry.id);
				if (nextEntries.length > 0) stacksRef.current.set(key, nextEntries);
				else stacksRef.current.delete(key);
				publishSnapshot();
			};
		}, [publishSnapshot]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextKeySnapshotContext, {
			value: snapshot,
			children
		})
	});
}
function CommandHint({ command, className }) {
	const { shortcutLabel } = useResolvedCommand(command);
	if (!shortcutLabel) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
		"aria-hidden": "true",
		className: cn("shrink-0 rounded-md bg-transparent px-1 py-0 text-[11px] text-foreground-tertiary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100", className),
		children: shortcutLabel
	});
}
function CommandTooltip({ command, children, label, ...tooltipProps }) {
	const resolved = useResolvedCommand(command);
	const tooltipLabel = label ?? resolved.label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: resolved.shortcutLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-ui": "command.tooltip",
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tooltipLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
				"aria-hidden": "true",
				className: "h-auto min-w-0 rounded-none bg-transparent p-0 text-inherit shadow-none [font:inherit] [[data-slot=tooltip-content]_&]:bg-transparent [[data-slot=tooltip-content]_&]:text-inherit",
				children: resolved.shortcutLabel
			})]
		}) : tooltipLabel,
		...tooltipProps,
		children
	});
}
var logger$1 = loggerService.withContext("CommandMenus");
var EMPTY_EXTRA_ITEMS = [];
var isExtraMenuItem = (item) => item.type === "item" || item.type === "submenu" && "id" in item;
var removeEmptySeparators = (items) => {
	const result = [];
	for (const item of items) {
		if (item.type === "separator") {
			if (result.length > 0 && result.at(-1)?.type !== "separator") result.push(item);
			continue;
		}
		result.push(item);
	}
	if (result.at(-1)?.type === "separator") result.pop();
	return result;
};
var hasNonSeparatorItems = (items) => items.some((item) => item.type !== "separator");
var hasShortcutCommands = (items) => items.some((item) => item.type === "item" && item.shortcutCommand !== void 0 || item.type === "submenu" && hasShortcutCommands(item.children));
var toNativePopupMenuItem = (item) => {
	if (item.type === "item") return {
		type: "custom",
		id: item.id,
		label: item.label,
		enabled: item.enabled,
		checked: item.checked,
		shortcutLabel: item.shortcutLabel,
		accelerator: item.accelerator
	};
	if (item.type === "submenu" && "id" in item) return {
		type: "submenu",
		label: item.label,
		enabled: item.enabled !== false,
		children: item.children.map(toNativePopupMenuItem)
	};
	return item;
};
var combineContextMenuItems = (commandItems, extraItems) => {
	const separator = commandItems.length > 0 && hasNonSeparatorItems(extraItems) ? [{ type: "separator" }] : EMPTY_EXTRA_ITEMS;
	return removeEmptySeparators([
		...commandItems,
		...separator,
		...extraItems
	]);
};
var getExtraItemActions = (extraItems) => {
	const actions = /* @__PURE__ */ new Map();
	for (const item of extraItems) if (item.type === "item") actions.set(item.id, item.onSelect);
	else if (item.type === "submenu") for (const [id, action] of getExtraItemActions(item.children)) actions.set(id, action);
	return actions;
};
function CommandMenuItemView({ item, onExecute, onSelectItem, renderIcon }) {
	if (item.type === "separator") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {});
	if (item.type === "submenu") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSubTrigger, {
		disabled: !item.enabled,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
			icon: renderIcon?.(item.iconKey),
			children: item.label
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSubContent, { children: item.children.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandMenuItemView, {
		item: child,
		onExecute,
		onSelectItem,
		renderIcon
	}, `${child.type}-${index}`)) })] });
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
		icon: renderIcon?.(item.iconKey),
		shortcut: item.shortcutLabel || void 0,
		children: item.label
	});
	if (item.checked !== void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuCheckboxItem, {
		checked: item.checked,
		disabled: !item.enabled,
		onCheckedChange: () => onSelectItem ? onSelectItem(() => onExecute(item.command)) : onExecute(item.command),
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
		disabled: !item.enabled,
		variant: item.destructive ? "destructive" : "default",
		onSelect: () => onSelectItem ? onSelectItem(() => onExecute(item.command)) : onExecute(item.command),
		children: content
	});
}
function CommandContextMenuExtraItemView({ item, onSelectItem }) {
	if (item.type === "separator") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {});
	if (item.type === "submenu") {
		const submenu = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSubTrigger, {
			disabled: item.enabled === false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
				icon: item.icon,
				children: item.label
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
			className: "-mr-1 max-h-72 overflow-x-hidden pr-1",
			children: item.children.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenuExtraItemView, {
				item: child,
				onSelectItem
			}, `${child.type}-${index}`))
		}) })] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraMenuItemTooltip, {
			content: item.description,
			children: submenu
		});
	}
	const menuItem = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
		disabled: item.enabled === false,
		variant: item.destructive ? "destructive" : "default",
		onSelect: () => onSelectItem ? onSelectItem(item.onSelect) : item.onSelect(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
			icon: item.icon,
			badge: item.badge,
			shortcut: item.shortcutLabel || void 0,
			children: item.label
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraMenuItemTooltip, {
		content: item.description,
		children: menuItem
	});
}
function ExtraMenuItemTooltip({ children, content }) {
	if (!content) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content,
		placement: "right",
		delay: 300,
		classNames: { placeholder: "block" },
		children
	});
}
function CommandContextMenu({ location, children, contentClassName, disabled, onOpenChange, renderIcon, extraItems = EMPTY_EXTRA_ITEMS, pendingExtraItems, getExtraItems }) {
	const preferredMode = useCommandMenuPresentationMode();
	const context = useCommandContextReader();
	const shortcutPreferences = useCommandShortcutPreferences();
	const [resolvedExtraItems, setResolvedExtraItems] = (0, import_react.useState)(null);
	const extraItemsRequestIdRef = (0, import_react.useRef)(0);
	const runtime = useCommandRuntime();
	const model = useResolvedCommandMenu(location);
	const mode = resolveMenuPresentationMode(location, preferredMode ?? "cherry");
	const commandItems = (0, import_react.useMemo)(() => removeEmptySeparators(model.items), [model.items]);
	const pendingItems = pendingExtraItems ?? extraItems;
	const resolveShortcutLabel = (0, import_react.useCallback)((command) => {
		return getCommandShortcutLabel(command, findKeybindingRule(command) ? shortcutPreferences[command] : void 0, {
			context,
			isMac,
			platform
		});
	}, [context, shortcutPreferences]);
	const resolveExtraItemShortcutLabels = (0, import_react.useCallback)((items) => {
		if (!hasShortcutCommands(items)) return items;
		const resolve = (source) => source.map((item) => {
			if (item.type === "submenu") return {
				...item,
				children: resolve(item.children)
			};
			if (item.type !== "item" || !item.shortcutCommand) return item;
			return {
				...item,
				shortcutLabel: item.shortcutLabel || resolveShortcutLabel(item.shortcutCommand) || void 0
			};
		});
		return resolve(items);
	}, [resolveShortcutLabel]);
	const displayedExtraItems = (0, import_react.useMemo)(() => resolveExtraItemShortcutLabels(getExtraItems ? resolvedExtraItems ?? pendingItems : extraItems), [
		extraItems,
		getExtraItems,
		pendingItems,
		resolveExtraItemShortcutLabels,
		resolvedExtraItems
	]);
	const combinedItems = (0, import_react.useMemo)(() => combineContextMenuItems(commandItems, displayedExtraItems), [commandItems, displayedExtraItems]);
	const hasLazyExtraItems = Boolean(getExtraItems);
	const resolveExtraItems = (0, import_react.useCallback)((event) => {
		if (getExtraItems) return getExtraItems(event);
		return extraItems;
	}, [extraItems, getExtraItems]);
	const handleCherryContextMenu = (0, import_react.useCallback)((event) => {
		event.stopPropagation();
		if (!getExtraItems) return;
		const requestId = extraItemsRequestIdRef.current + 1;
		extraItemsRequestIdRef.current = requestId;
		let resolved;
		try {
			resolved = getExtraItems(event);
		} catch (error) {
			logger$1.warn("Failed to resolve command menu extra items", error);
			setResolvedExtraItems(EMPTY_EXTRA_ITEMS);
			return;
		}
		if (!(resolved instanceof Promise) && typeof resolved?.then !== "function") {
			setResolvedExtraItems(resolved);
			return;
		}
		setResolvedExtraItems(pendingItems);
		Promise.resolve(resolved).then((items) => {
			if (extraItemsRequestIdRef.current === requestId) setResolvedExtraItems(items);
		}).catch((error) => {
			logger$1.warn("Failed to resolve command menu extra items", error);
			if (extraItemsRequestIdRef.current === requestId) setResolvedExtraItems(EMPTY_EXTRA_ITEMS);
		});
	}, [getExtraItems, pendingItems]);
	const handleCherryOpenChange = (0, import_react.useCallback)((open) => {
		onOpenChange?.(open);
		if (!open && getExtraItems) {
			extraItemsRequestIdRef.current += 1;
			setResolvedExtraItems(null);
		}
	}, [getExtraItems, onOpenChange]);
	const handleCherrySelectItem = useCloseBeforeAction(handleCherryOpenChange);
	const handleNativeContextMenu = (0, import_react.useCallback)((event) => {
		if (mode !== "native") return;
		event.preventDefault();
		event.stopPropagation();
		const anchor = {
			x: Math.round(event.clientX),
			y: Math.round(event.clientY)
		};
		const requestId = extraItemsRequestIdRef.current + 1;
		extraItemsRequestIdRef.current = requestId;
		onOpenChange?.(true);
		let nativeExtraItems;
		try {
			nativeExtraItems = resolveExtraItems(event);
		} catch (error) {
			logger$1.error("Failed to resolve command menu extra items", error);
			nativeExtraItems = EMPTY_EXTRA_ITEMS;
		}
		Promise.resolve(nativeExtraItems).catch((error) => {
			logger$1.error("Failed to resolve command menu extra items", error);
			return EMPTY_EXTRA_ITEMS;
		}).then((resolvedNativeExtraItems) => {
			if (extraItemsRequestIdRef.current !== requestId) return;
			const nativeExtraItems$1 = resolveExtraItemShortcutLabels(resolvedNativeExtraItems);
			const nativeModel = {
				location,
				items: combineContextMenuItems(commandItems, nativeExtraItems$1).map(toNativePopupMenuItem)
			};
			if (!nativeModel.items.length) return;
			return window.api.command.showNativePopupMenu(nativeModel, anchor).then((result) => {
				if (extraItemsRequestIdRef.current !== requestId) return;
				if (result?.type === "command") {
					runtime.execute(result.command);
					return;
				}
				if (result?.type === "custom") getExtraItemActions(nativeExtraItems$1).get(result.id)?.();
			});
		}).catch((error) => {
			logger$1.error("Failed to show native command menu", error);
		}).finally(() => {
			if (extraItemsRequestIdRef.current === requestId) onOpenChange?.(false);
		});
	}, [
		commandItems,
		location,
		mode,
		onOpenChange,
		resolveExtraItemShortcutLabels,
		resolveExtraItems,
		runtime
	]);
	if (disabled || !combinedItems.length && !hasLazyExtraItems) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	if (mode === "native") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "command.context-menu",
		className: "contents",
		onContextMenu: handleNativeContextMenu,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenu, {
		onOpenChange: handleCherryOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuTrigger, {
			asChild: true,
			onContextMenu: handleCherryContextMenu,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children })
		}), combinedItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuContent, {
			className: contentClassName,
			onPointerDown: (e) => e.stopPropagation(),
			onMouseDown: (e) => e.stopPropagation(),
			children: combinedItems.map((item, index) => isExtraMenuItem(item) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenuExtraItemView, {
				item,
				onSelectItem: handleCherrySelectItem
			}, `extra-${item.id}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandMenuItemView, {
				item,
				onExecute: runtime.execute,
				onSelectItem: handleCherrySelectItem,
				renderIcon
			}, `${item.type}-${index}`))
		})]
	});
}
function CommandDropdownMenuItemView({ item, onExecute, onSelectItem, renderIcon }) {
	if (item.type === "separator") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {});
	if (item.type === "submenu") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubTrigger, {
		disabled: !item.enabled,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
			icon: renderIcon?.(item.iconKey),
			children: item.label
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: item.children.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDropdownMenuItemView, {
		item: child,
		onExecute,
		onSelectItem,
		renderIcon
	}, `${child.type}-${index}`)) })] });
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
		icon: renderIcon?.(item.iconKey),
		shortcut: item.shortcutLabel || void 0,
		children: item.label
	});
	if (item.checked !== void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
		checked: item.checked,
		disabled: !item.enabled,
		onCheckedChange: () => onSelectItem ? onSelectItem(() => onExecute(item.command)) : onExecute(item.command),
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
		disabled: !item.enabled,
		variant: item.destructive ? "destructive" : "default",
		onSelect: () => onSelectItem ? onSelectItem(() => onExecute(item.command)) : onExecute(item.command),
		children: content
	});
}
function CommandDropdownExtraItemView({ item, onSelectItem }) {
	if (item.type === "separator") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {});
	if (item.type === "submenu") {
		const submenu = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubTrigger, {
			disabled: item.enabled === false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
				icon: item.icon,
				children: item.label
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
			className: "-mr-1 max-h-72 overflow-x-hidden pr-1",
			children: item.children.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDropdownExtraItemView, {
				item: child,
				onSelectItem
			}, `${child.type}-${index}`))
		}) })] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraMenuItemTooltip, {
			content: item.description,
			children: submenu
		});
	}
	const menuItem = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
		disabled: item.enabled === false,
		variant: item.destructive ? "destructive" : "default",
		onSelect: () => onSelectItem ? onSelectItem(item.onSelect) : item.onSelect(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
			icon: item.icon,
			badge: item.badge,
			shortcut: item.shortcutLabel || void 0,
			children: item.label
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraMenuItemTooltip, {
		content: item.description,
		children: menuItem
	});
}
function CommandPopupMenu({ location, children, align, side, sideOffset, contentClassName, open, defaultOpen, onOpenChange, disabled, renderIcon, extraItems = EMPTY_EXTRA_ITEMS, presentationMode, deferActionsUntilClosed = false }) {
	const preferredMode = useCommandMenuPresentationMode();
	const context = useCommandContextReader();
	const shortcutPreferences = useCommandShortcutPreferences();
	const runtime = useCommandRuntime();
	const model = useResolvedCommandMenu(location);
	const mode = resolveMenuPresentationMode(location, presentationMode ?? preferredMode ?? "cherry");
	const [internalOpen, setInternalOpen] = (0, import_react.useState)(defaultOpen ?? false);
	const pendingCherryActionRef = (0, import_react.useRef)(null);
	const currentOpen = open ?? internalOpen;
	const commandItems = (0, import_react.useMemo)(() => removeEmptySeparators(model.items), [model.items]);
	const resolveShortcutLabel = (0, import_react.useCallback)((command) => {
		return getCommandShortcutLabel(command, findKeybindingRule(command) ? shortcutPreferences[command] : void 0, {
			context,
			isMac,
			platform
		});
	}, [context, shortcutPreferences]);
	const decoratedExtraItems = (0, import_react.useMemo)(() => {
		if (!hasShortcutCommands(extraItems)) return extraItems;
		const decorate = (source) => source.map((item) => {
			if (item.type === "submenu") return {
				...item,
				children: decorate(item.children)
			};
			if (item.type !== "item" || !item.shortcutCommand) return item;
			return {
				...item,
				shortcutLabel: item.shortcutLabel || resolveShortcutLabel(item.shortcutCommand) || void 0
			};
		});
		return decorate(extraItems);
	}, [extraItems, resolveShortcutLabel]);
	const combinedItems = (0, import_react.useMemo)(() => combineContextMenuItems(commandItems, decoratedExtraItems), [commandItems, decoratedExtraItems]);
	const handleNativeClick = (0, import_react.useCallback)(async (event) => {
		if (mode !== "native") return;
		const rect = event.currentTarget.getBoundingClientRect();
		const anchor = {
			x: Math.round(rect.left),
			y: Math.round(rect.bottom)
		};
		const nativeItems = combinedItems.map(toNativePopupMenuItem);
		if (!nativeItems.length) return;
		const model$1 = {
			location,
			items: nativeItems
		};
		onOpenChange?.(true);
		try {
			const result = await window.api.command.showNativePopupMenu(model$1, anchor);
			if (result?.type === "command") runtime.execute(result.command);
			else if (result?.type === "custom") getExtraItemActions(decoratedExtraItems).get(result.id)?.();
		} catch (error) {
			logger$1.error("Failed to show native command popup menu", error);
		} finally {
			onOpenChange?.(false);
		}
	}, [
		combinedItems,
		decoratedExtraItems,
		location,
		mode,
		runtime,
		onOpenChange
	]);
	const handleCherryOpenChange = (0, import_react.useCallback)((nextOpen) => {
		if (open === void 0) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [onOpenChange, open]);
	const handleCherrySelectItemAfterFrame = useCloseBeforeAction(handleCherryOpenChange);
	const handleCherrySelectItemAfterClose = (0, import_react.useCallback)((action) => {
		pendingCherryActionRef.current = action;
		handleCherryOpenChange(false);
	}, [handleCherryOpenChange]);
	const handleCherryCloseAutoFocus = (0, import_react.useCallback)(() => {
		const action = pendingCherryActionRef.current;
		pendingCherryActionRef.current = null;
		if (action) window.requestAnimationFrame(action);
	}, []);
	const handleCherrySelectItem = deferActionsUntilClosed ? handleCherrySelectItemAfterClose : handleCherrySelectItemAfterFrame;
	if (disabled || combinedItems.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	if (mode === "native") {
		if (import_react.isValidElement(children)) {
			const childProps = children.props ?? {};
			return import_react.cloneElement(children, { onClick: (event) => {
				childProps.onClick?.(event);
				if (!event.defaultPrevented) handleNativeClick(event);
			} });
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
		open: currentOpen,
		onOpenChange: handleCherryOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
			align,
			side,
			sideOffset,
			className: contentClassName,
			onCloseAutoFocus: deferActionsUntilClosed ? handleCherryCloseAutoFocus : void 0,
			children: combinedItems.map((item, index) => isExtraMenuItem(item) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDropdownExtraItemView, {
				item,
				onSelectItem: handleCherrySelectItem
			}, `extra-${item.id}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDropdownMenuItemView, {
				item,
				onExecute: runtime.execute,
				onSelectItem: handleCherrySelectItem,
				renderIcon
			}, `${item.type}-${index}`))
		})]
	});
}
var logger = loggerService.withContext("CommandProvider");
function isEditableTarget(target) {
	if (!(target instanceof HTMLElement)) return false;
	const tagName = target.tagName;
	if (tagName === "INPUT" || tagName === "TEXTAREA") return true;
	return target.isContentEditable || target.getAttribute("contenteditable") === "true";
}
var shortcutPreferenceKeys = Object.fromEntries(REGISTERED_KEYBINDINGS.map((rule) => [rule.command, rule.preferenceKey]));
function CommandProvider({ children }) {
	const contextSnapshot = useCommandContextSnapshot();
	const [shortcutPreferences] = useMultiplePreferences(shortcutPreferenceKeys);
	const [menuPresentationMode] = usePreference("menu.presentation_mode");
	const nextHandlerIdRef = (0, import_react.useRef)(0);
	const handlersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const dispatcherStateRef = (0, import_react.useRef)({
		context: contextSnapshot,
		shortcutPreferences,
		hasHandler: () => false,
		execute: () => {}
	});
	const getActiveHandler = (0, import_react.useCallback)((command) => {
		return handlersRef.current.get(command)?.findLast((entry) => entry.enabled);
	}, []);
	const registerHandler = (0, import_react.useCallback)((command, handler, options) => {
		const entry = {
			id: nextHandlerIdRef.current++,
			handler,
			enabled: options?.enabled !== false
		};
		const handlers = handlersRef.current.get(command) ?? [];
		handlers.push(entry);
		handlersRef.current.set(command, handlers);
		return () => {
			const currentHandlers = handlersRef.current.get(command);
			if (!currentHandlers) return;
			const nextHandlers = currentHandlers.filter((current) => current.id !== entry.id);
			if (nextHandlers.length > 0) handlersRef.current.set(command, nextHandlers);
			else handlersRef.current.delete(command);
		};
	}, []);
	const hasHandler = (0, import_react.useCallback)((command) => Boolean(getActiveHandler(command)), [getActiveHandler]);
	const execute = (0, import_react.useCallback)((command) => {
		const handler = getActiveHandler(command)?.handler;
		if (!handler) {
			logger.warn(`No renderer command handler registered: ${command}`);
			return;
		}
		try {
			Promise.resolve(handler()).catch((error) => {
				logger.error(`Renderer command handler failed: ${command}`, error);
			});
		} catch (error) {
			logger.error(`Renderer command handler failed: ${command}`, error);
		}
	}, [getActiveHandler]);
	(0, import_react.useEffect)(() => {
		dispatcherStateRef.current = {
			context: contextSnapshot,
			shortcutPreferences,
			hasHandler,
			execute
		};
	}, [
		contextSnapshot,
		execute,
		hasHandler,
		shortcutPreferences
	]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (event) => {
			if (event.isComposing) return;
			if (!(event.ctrlKey || event.metaKey || event.altKey) && isEditableTarget(event.target)) return;
			const state = dispatcherStateRef.current;
			const command = resolveCommandByKeybinding({
				binding: getShortcutBindingFromKeyboardEvent(event, platform),
				preferences: state.shortcutPreferences,
				context: state.context,
				platform,
				scope: "renderer",
				canExecuteCommand: state.hasHandler
			});
			if (!command) return;
			event.preventDefault();
			state.execute(command);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandRuntimeContext, {
		value: (0, import_react.useMemo)(() => ({
			execute,
			hasHandler,
			registerHandler
		}), [
			execute,
			hasHandler,
			registerHandler
		]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSharedPreferencesContext, {
			value: (0, import_react.useMemo)(() => ({
				shortcutPreferences,
				menuPresentationMode
			}), [shortcutPreferences, menuPresentationMode]),
			children
		})
	});
}
export { CommandTooltip as a, CommandHint as i, CommandContextMenu as n, CommandContextKeyProvider as o, CommandPopupMenu as r, CommandProvider as t };
