import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as EmptyState$1 } from "./empty-state-C_9tC-cn.js";
import { t as Skeleton } from "./skeleton-BZtoNVvM.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
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
export { EmptyState as n, actionsToCommandMenuExtraItems as r, LoadingState as t };
