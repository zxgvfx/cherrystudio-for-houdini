import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_dayjs_min } from "./dayjs.min-BBb2vAs7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { t as Label } from "./label-Cv8Hnuxr.js";
import { i as FieldError } from "./field-e1WfHFF8.js";
var DEFAULT_AVAILABILITY = {
	visible: true,
	enabled: true
};
function normalizeAvailability(input) {
	if (input === false) return {
		visible: false,
		enabled: false
	};
	if (input === true || input === void 0) return DEFAULT_AVAILABILITY;
	const visible = input.visible ?? true;
	return {
		visible,
		enabled: visible ? input.enabled ?? true : false,
		...input.reason && { reason: input.reason }
	};
}
function combineAvailability(first, second) {
	const visible = first.visible && second.visible;
	return {
		visible,
		enabled: visible && first.enabled && second.enabled,
		...first.reason || second.reason ? { reason: first.reason ?? second.reason } : {}
	};
}
function matchesSurface(action, surface) {
	if (!surface || !action.surface) return true;
	return Array.isArray(action.surface) ? action.surface.includes(surface) : action.surface === surface;
}
function resolveNode(node, context) {
	return typeof node === "function" ? node(context) : node;
}
function resolveText(text, context) {
	return typeof text === "function" ? text(context) : text;
}
function resolveConfirm(confirm, context) {
	if (!confirm) return void 0;
	const resolved = typeof confirm === "function" ? confirm(context) : confirm;
	if (!resolved) return void 0;
	return {
		title: resolveNode(resolved.title, context),
		...resolved.description && { description: resolveNode(resolved.description, context) },
		...resolved.content && { content: resolveNode(resolved.content, context) },
		...resolved.confirmText && { confirmText: resolveText(resolved.confirmText, context) },
		...resolved.cancelText && { cancelText: resolveText(resolved.cancelText, context) },
		...resolved.destructive !== void 0 && { destructive: resolved.destructive }
	};
}
function sortResolvedActions(actions) {
	return actions.sort((first, second) => {
		const firstOrder = first.order ?? 0;
		const secondOrder = second.order ?? 0;
		if (firstOrder !== secondOrder) return firstOrder - secondOrder;
		return first.id.localeCompare(second.id);
	});
}
var ActionRegistry = class {
	actions = /* @__PURE__ */ new Map();
	commands = /* @__PURE__ */ new Map();
	registerAction(descriptor) {
		this.actions.set(descriptor.id, descriptor);
		return () => {
			if (this.actions.get(descriptor.id) === descriptor) this.actions.delete(descriptor.id);
		};
	}
	registerCommand(descriptor) {
		this.commands.set(descriptor.id, descriptor);
		return () => {
			if (this.commands.get(descriptor.id) === descriptor) this.commands.delete(descriptor.id);
		};
	}
	unregister(id) {
		this.actions.delete(id);
		this.commands.delete(id);
	}
	listActions() {
		return Array.from(this.actions.values());
	}
	listCommands() {
		return Array.from(this.commands.values());
	}
	resolve(context, surface) {
		return sortResolvedActions(this.listActions().map((action) => this.resolveAction(action, context, surface)).filter((action) => !!action));
	}
	async execute(actionId, context) {
		const action = this.findAction(actionId, context);
		if (!action) return false;
		const resolvedAction = this.resolveAction(action, context);
		if (!resolvedAction?.availability.visible || !resolvedAction.availability.enabled) return false;
		const commandId = resolvedAction.commandId;
		if (!commandId) return false;
		const command = this.commands.get(commandId);
		if (!command) return false;
		await command.run(context);
		return true;
	}
	clear() {
		this.actions.clear();
		this.commands.clear();
	}
	findAction(actionId, context) {
		for (const action of this.actions.values()) {
			const found = this.findActionInTree(action, actionId, context);
			if (found) return found;
		}
	}
	findActionInTree(action, actionId, context) {
		if (action.id === actionId) return action;
		const children = typeof action.children === "function" ? action.children(context) : action.children ?? [];
		for (const child of children) {
			const found = this.findActionInTree(child, actionId, context);
			if (found) return found;
		}
	}
	resolveAction(action, context, surface) {
		if (!matchesSurface(action, surface)) return void 0;
		const commandAvailability = action.commandId ? normalizeAvailability(this.commands.get(action.commandId)?.availability?.(context)) : DEFAULT_AVAILABILITY;
		const availability = combineAvailability(normalizeAvailability(action.availability?.(context)), commandAvailability);
		if (!availability.visible) return void 0;
		const children = sortResolvedActions((typeof action.children === "function" ? action.children(context) : action.children ?? []).map((child) => this.resolveAction(child, context, surface)).filter((child) => !!child));
		const confirm = resolveConfirm(action.confirm, context);
		return {
			id: action.id,
			...action.commandId && { commandId: action.commandId },
			label: resolveNode(action.label, context),
			...action.icon && { icon: resolveNode(action.icon, context) },
			...action.group && { group: action.group },
			...action.order !== void 0 && { order: action.order },
			...action.surface && { surface: action.surface },
			danger: action.danger ?? false,
			...action.shortcut && { shortcut: action.shortcut },
			...confirm && { confirm },
			availability,
			children
		};
	}
};
function createActionRegistry() {
	return new ActionRegistry();
}
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
function getResourceTimeBucket(timestamp, now) {
	if (timestamp === void 0) return "earlier";
	const item = (0, import_dayjs_min.default)(timestamp);
	const current = now === void 0 ? (0, import_dayjs_min.default)() : (0, import_dayjs_min.default)(now);
	if (!item.isValid() || !current.isValid()) return "earlier";
	const itemStart = item.startOf("day");
	const todayStart = current.startOf("day");
	if (itemStart.isSame(todayStart)) return "today";
	const yesterdayStart = todayStart.subtract(1, "day");
	if (itemStart.isSame(yesterdayStart)) return "yesterday";
	const weekStart = todayStart.startOf("week");
	if (itemStart.isSame(weekStart) || itemStart.isAfter(weekStart) && itemStart.isBefore(yesterdayStart)) return "this-week";
	return "earlier";
}
function composeResourceListGroupResolvers(...resolvers) {
	return (item) => {
		for (const resolver of resolvers) {
			const group = resolver(item);
			if (group) return group;
		}
		return null;
	};
}
function createPinnedGroupResolver({ group, isPinned }) {
	return (item) => isPinned(item) ? group : null;
}
function createTimeGroupResolver({ getTimestamp, labels, now }) {
	return (item) => {
		const bucket = getResourceTimeBucket(getTimestamp(item), now);
		return {
			id: `time:${bucket}`,
			label: labels[bucket]
		};
	};
}
function sortRankedResourceItems(items, { getRank, isPinned, compareWithinGroup }) {
	return items.map((item, index) => ({
		item,
		index,
		rank: getRank(item),
		pinned: isPinned(item)
	})).sort((a, b) => {
		if (a.rank !== b.rank) return a.rank - b.rank;
		if (a.pinned || b.pinned) return a.index - b.index;
		const withinDelta = compareWithinGroup(a.item, b.item);
		if (withinDelta !== 0) return withinDelta;
		return a.index - b.index;
	}).map(({ item }) => item);
}
function compareResourceRecency(getUpdatedAt) {
	return (a, b) => {
		const aMs = Date.parse(getUpdatedAt(a));
		const bMs = Date.parse(getUpdatedAt(b));
		if (Number.isFinite(aMs) && Number.isFinite(bMs)) return bMs - aMs;
		return 0;
	};
}
function compareResourceOrderKey(a, b) {
	if (a && b) {
		if (a < b) return -1;
		if (a > b) return 1;
	}
	return 0;
}
function buildResourceListItemDropAnchor(payload) {
	if (payload.overType === "item") return payload.position === "before" ? { before: payload.overId } : { after: payload.overId };
	return { position: "last" };
}
function buildResourceListGroupDropAnchor(payload, overId) {
	return payload.sourceIndex < payload.targetIndex ? { after: overId } : { before: overId };
}
function moveResourceListStringGroupAfterDrop(ids, activeId, overId, payload) {
	const activeIndex = ids.indexOf(activeId);
	const overIndex = ids.indexOf(overId);
	if (activeIndex < 0 || overIndex < 0 || activeIndex === overIndex) return [...ids];
	const next = ids.filter((id) => id !== activeId);
	const adjustedOverIndex = next.indexOf(overId);
	const insertIndex = payload.sourceIndex < payload.targetIndex ? adjustedOverIndex + 1 : adjustedOverIndex;
	next.splice(insertIndex, 0, activeId);
	return next;
}
function withSoleGroupLabelHidden(resolver, items, { ignoreGroupIds } = {}) {
	const ignored = new Set(ignoreGroupIds ?? []);
	const groupIds = /* @__PURE__ */ new Set();
	for (const item of items) {
		const group = resolver(item);
		if (group) groupIds.add(group.id);
		if (groupIds.size > 1) return resolver;
	}
	const [soleGroupId] = groupIds;
	if (groupIds.size !== 1 || ignored.has(soleGroupId)) return resolver;
	return (item) => {
		const group = resolver(item);
		if (!group) return null;
		return {
			...group,
			label: ""
		};
	};
}
function withResourceListGroupIdPrefix(prefix, resolver) {
	return (item) => {
		const group = resolver(item);
		if (!group) return null;
		return {
			...group,
			id: `${prefix}${group.id}`
		};
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EditNameDialog = ({ initialName, inputLabel, onOpenChange, onSubmit, open, placeholder, submitLabel, title }) => {
	const { t } = useTranslation();
	const inputId = (0, import_react.useId)();
	const [name, setName] = (0, import_react.useState)(initialName);
	const [hasAttemptedSubmit, setHasAttemptedSubmit] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setName("");
			setHasAttemptedSubmit(false);
			setIsSubmitting(false);
			return;
		}
		setName(initialName);
		setHasAttemptedSubmit(false);
		setIsSubmitting(false);
	}, [initialName, open]);
	const submitName = async () => {
		const trimmedName = name.trim();
		setHasAttemptedSubmit(true);
		if (!trimmedName) return;
		if (trimmedName === initialName.trim()) {
			onOpenChange(false);
			return;
		}
		setIsSubmitting(true);
		try {
			await onSubmit(trimmedName);
			onOpenChange(false);
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		submitName();
	};
	const handleKeyDown = (event) => {
		if (event.nativeEvent.isComposing || event.keyCode === 229) return;
		if (event.key !== "Enter") return;
		event.preventDefault();
		submitName();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "max-w-md gap-0 overflow-hidden rounded-2xl border-border-subtle p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "gap-0.5 border-border-subtle border-b px-4 py-3 text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "leading-4",
					children: title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-ui": "ui.edit-name-dialog.action.submit",
				className: "flex flex-col",
				onSubmit: handleSubmit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: inputId,
							className: "text-muted-foreground leading-4",
							children: inputLabel ?? t("common.name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: inputId,
							"aria-invalid": hasAttemptedSubmit && !name.trim(),
							autoFocus: true,
							className: "h-8 rounded-lg px-2.5 leading-4 placeholder:text-muted-foreground",
							placeholder,
							value: name,
							onChange: (event) => {
								setName(event.target.value);
								setHasAttemptedSubmit(false);
							},
							onKeyDown: handleKeyDown
						}),
						hasAttemptedSubmit && !name.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
							className: "leading-4",
							children: t("common.required_field")
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2 border-border-subtle border-t px-4 py-3 sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "h-8 rounded-lg px-3",
						onClick: () => onOpenChange(false),
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: isSubmitting,
						className: "h-8 rounded-lg px-3",
						children: submitLabel ?? t("common.save")
					})]
				})]
			})]
		})
	});
};
var EditNameDialog_default = EditNameDialog;
export { compareResourceRecency as a, createTimeGroupResolver as c, sortRankedResourceItems as d, withResourceListGroupIdPrefix as f, compareResourceOrderKey as i, getResourceTimeBucket as l, createActionRegistry as m, buildResourceListGroupDropAnchor as n, composeResourceListGroupResolvers as o, withSoleGroupLabelHidden as p, buildResourceListItemDropAnchor as r, createPinnedGroupResolver as s, EditNameDialog_default as t, moveResourceListStringGroupAfterDrop as u };
