import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as UiDataSlot, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as ChevronDown } from "./chevron-down-DLBHIIEr.js";
import { t as X } from "./x-CpgRfh3_.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-Cli1Z35D.js";
import { t as useVirtualizer } from "./esm-Dxo6iURQ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var scrollbarClass = "overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/30 [&::-webkit-scrollbar]:w-0.75";
function getWheelDeltaY(event, el) {
	if (event.deltaMode === 1) return event.deltaY * 16;
	if (event.deltaMode === 2) return event.deltaY * el.clientHeight;
	return event.deltaY;
}
function useModalPopoverWheel(ref) {
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const handleWheel = (e) => {
			if (el.scrollHeight <= el.clientHeight) return;
			e.preventDefault();
			e.stopPropagation();
			el.scrollTop += getWheelDeltaY(e, el);
		};
		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, [ref]);
}
function ScrollContainer({ children, className, maxHeight }) {
	const scrollerRef = (0, import_react.useRef)(null);
	useModalPopoverWheel(scrollerRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.scroll",
		ref: scrollerRef,
		className: cn(scrollbarClass, className),
		style: { maxHeight },
		children
	});
}
function VirtualRows({ items, itemHeight, maxHeight, overscan, renderRow }) {
	const scrollerRef = (0, import_react.useRef)(null);
	useModalPopoverWheel(scrollerRef);
	const virtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => scrollerRef.current,
		estimateSize: () => itemHeight,
		overscan
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.virtual-rows",
		ref: scrollerRef,
		className: scrollbarClass,
		style: { maxHeight },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full",
			style: { height: virtualizer.getTotalSize() },
			children: virtualizer.getVirtualItems().map((vItem) => {
				const item = items[vItem.index];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 left-0 w-full",
					style: {
						height: vItem.size,
						transform: `translateY(${vItem.start}px)`
					},
					children: renderRow(item)
				}, item.id);
			})
		})
	});
}
function SelectDropdown({ items, selectedId, onSelect, renderSelected, renderItem, renderTriggerLeading, onRemove, removeLabel, placeholder, emptyText, maxHeight = 240, virtualize = false, itemHeight = 36, overscan = 12, triggerClassName }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const selected = items.find((i) => i.id === selectedId);
	const renderRow = (item) => {
		const isSelected = selectedId === item.id;
		if (onRemove) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.render-row",
			className: cn("flex items-center gap-1 rounded-md pr-1 transition-colors", isSelected && "bg-primary/10 text-primary"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					onSelect(item.id);
					setOpen(false);
				},
				className: "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted",
				children: renderItem(item, isSelected)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": removeLabel,
				onClick: () => onRemove(item.id),
				className: "shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"data-ui": "ui.render-row",
			type: "button",
			onClick: () => {
				onSelect(item.id);
				setOpen(false);
			},
			className: cn("w-full rounded-md px-2.5 py-1.5 text-left text-sm transition-colors", isSelected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"),
			children: renderItem(item, isSelected)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cn("flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 text-sm transition-colors hover:bg-muted/30", open ? "border-primary/40 ring-1 ring-primary/15" : "border-border-subtle", triggerClassName),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-2 text-left",
					children: [renderTriggerLeading, selected ? renderSelected(selected) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-muted-foreground/50",
						children: placeholder || "..."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 12,
					className: cn("ml-2 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")
				})]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			sideOffset: 4,
			className: "w-(--radix-popover-trigger-width) rounded-md border border-border-subtle bg-popover p-1 shadow-lg",
			children: items.length === 0 && emptyText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2.5 py-3 text-muted-foreground/45 text-sm",
				children: emptyText
			}) : virtualize ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualRows, {
				items,
				itemHeight,
				maxHeight,
				overscan,
				renderRow
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollContainer, {
				className: cn(onRemove && "space-y-1"),
				maxHeight,
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: renderRow(item) }, item.id))
			})
		})]
	});
}
export { SelectDropdown as t };
