import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as UiDataSlot, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Check } from "./check-6rPNpD2R.js";
import { t as ChevronDown } from "./chevron-down-DLBHIIEr.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as X } from "./x-CpgRfh3_.js";
import { t as cva } from "./dist-D9lByzdX.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { i as PopoverTrigger, n as PopoverAnchor, r as PopoverContent, t as Popover } from "./popover-Cli1Z35D.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-CTQeiahJ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var comboboxTriggerVariants = cva(cn("inline-flex items-center justify-between rounded-md border-1 text-sm transition-colors outline-none font-normal", "bg-muted/20", "text-foreground"), {
	variants: {
		state: {
			default: "border-border focus-visible:border-ring",
			error: "border border-destructive!",
			disabled: "opacity-50 cursor-not-allowed pointer-events-none"
		},
		size: {
			sm: "px-2 text-xs gap-1",
			default: "px-3 gap-2",
			lg: "px-4 gap-2"
		}
	},
	defaultVariants: {
		state: "default",
		size: "default"
	}
});
var comboboxItemVariants = cva("relative flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors outline-none select-none", {
	variants: { state: {
		default: "hover:bg-accent data-[selected=true]:bg-accent",
		selected: "bg-primary/10 text-primary",
		disabled: "opacity-50 cursor-not-allowed pointer-events-none"
	} },
	defaultVariants: { state: "default" }
});
var comboboxInputSizeClasses = {
	sm: "h-8 px-2 text-xs",
	default: "h-9 px-3 text-sm",
	lg: "h-10 px-4 text-sm"
};
function Combobox({ options, value: controlledValue, defaultValue, onChange, multiple = false, renderOption, renderValue, searchable = true, searchPlacement = "content", searchPlaceholder = "Search...", emptyText = "No results found.", getRemoveTagAriaLabel = (optionLabel) => `Remove ${optionLabel}`, onSearch, filterOption, error = false, disabled = false, open: controlledOpen, onOpenChange, placeholder = "Please Select", className, popoverClassName, popoverAlign, portalContainer, triggerStyle, width, size, name }) {
	const [internalOpen, setInternalOpen] = import_react.useState(false);
	const [internalValue, setInternalValue] = import_react.useState(defaultValue ?? (multiple ? [] : ""));
	const [triggerSearch, setTriggerSearch] = import_react.useState("");
	const [contentSearch, setContentSearch] = import_react.useState("");
	const [activeValue, setActiveValue] = import_react.useState("");
	const triggerInputRef = import_react.useRef(null);
	const open = controlledOpen ?? internalOpen;
	const setOpen = import_react.useCallback((nextOpen) => {
		if (onOpenChange) onOpenChange(nextOpen);
		else setInternalOpen(nextOpen);
	}, [onOpenChange]);
	const value = controlledValue ?? internalValue;
	const setValue = (newValue) => {
		if (controlledValue === void 0) setInternalValue(newValue);
		onChange?.(newValue);
	};
	const selectedOption = !multiple ? options.find((opt) => opt.value === value) : void 0;
	import_react.useEffect(() => {
		if (open && !multiple && typeof value === "string") setActiveValue(value);
	}, [
		open,
		multiple,
		value
	]);
	const triggerSearchEnabled = searchable && searchPlacement === "trigger" && !multiple;
	const contentSearchEnabled = searchable && !triggerSearchEnabled;
	const manualFilterEnabled = triggerSearchEnabled || contentSearchEnabled && Boolean(filterOption);
	const activeSearch = triggerSearchEnabled ? triggerSearch : contentSearch;
	const normalizedSearch = activeSearch.trim().toLowerCase();
	const visibleOptions = import_react.useMemo(() => {
		if (!manualFilterEnabled || !normalizedSearch) return options;
		return options.filter((option) => {
			if (filterOption) return filterOption(option, activeSearch);
			return [
				option.label,
				option.value,
				option.description
			].filter(Boolean).join(" ").toLowerCase().includes(normalizedSearch);
		});
	}, [
		activeSearch,
		filterOption,
		manualFilterEnabled,
		normalizedSearch,
		options
	]);
	const handleOpenChange = (nextOpen) => {
		setOpen(nextOpen);
		if (!nextOpen) {
			if (triggerSearch || contentSearch) onSearch?.("");
			setTriggerSearch("");
			setContentSearch("");
			return;
		}
		if (triggerSearchEnabled) setTriggerSearch("");
	};
	const handleSelect = (selectedValue) => {
		if (multiple) {
			const currentValues = value || [];
			setValue(currentValues.includes(selectedValue) ? currentValues.filter((v) => v !== selectedValue) : [...currentValues, selectedValue]);
		} else {
			if (selectedValue !== value) setValue(selectedValue);
			handleOpenChange(false);
		}
	};
	const handleRemoveTag = (tagValue, e) => {
		e.preventDefault();
		e.stopPropagation();
		if (multiple) setValue((value || []).filter((v) => v !== tagValue));
	};
	const handleRemoveTagKeyDown = (tagValue, e) => {
		if (e.key === "Enter" || e.key === " ") handleRemoveTag(tagValue, e);
	};
	const isSelected = (optionValue) => {
		if (multiple) return (value || []).includes(optionValue);
		return value === optionValue;
	};
	const handleTriggerInputFocus = (event) => {
		if (!triggerSearchEnabled) return;
		if (!open) handleOpenChange(true);
		event.currentTarget.select();
	};
	const handleTriggerInputMouseDown = () => {
		if (!triggerSearchEnabled || open) return;
		handleOpenChange(true);
	};
	const handleTriggerInputClick = (event) => {
		if (!triggerSearchEnabled) return;
		event.preventDefault();
		event.currentTarget.focus();
		if (!open) handleOpenChange(true);
	};
	const handleTriggerInputChange = (event) => {
		const nextSearch = event.target.value;
		setTriggerSearch(nextSearch);
		onSearch?.(nextSearch);
		if (!open) setOpen(true);
	};
	const handleTriggerInputKeyDown = (event) => {
		if (!triggerSearchEnabled) return;
		if (event.key === "Escape") {
			handleOpenChange(false);
			return;
		}
		if (event.key === "Enter") {
			if (!normalizedSearch) {
				event.preventDefault();
				handleOpenChange(false);
				return;
			}
			const firstEnabledOption = visibleOptions.find((option) => !option.disabled);
			if (firstEnabledOption) {
				event.preventDefault();
				handleSelect(firstEnabledOption.value);
			}
			return;
		}
		if (event.key === "ArrowDown") {
			event.preventDefault();
			if (!open) handleOpenChange(true);
		}
	};
	const handleContentSearchChange = (nextSearch) => {
		setContentSearch(nextSearch);
		onSearch?.(nextSearch);
	};
	const renderTriggerContent = () => {
		if (renderValue) return renderValue(value, options);
		if (multiple) {
			const selectedValues = value || [];
			if (selectedValues.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.render-trigger-content",
				className: "text-muted-foreground",
				children: placeholder
			});
			const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.render-trigger-content",
				className: "flex min-w-0 flex-1 flex-wrap gap-1",
				children: selectedOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("bg-primary/10 text-primary", "gap-1 px-2 py-0.5", "inline-flex items-center rounded", "text-xs"),
					children: [option.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": getRemoveTagAriaLabel(option.label),
						className: "inline-flex size-3 cursor-pointer items-center justify-center opacity-70 hover:text-foreground hover:opacity-100",
						onClick: (e) => handleRemoveTag(option.value, e),
						onKeyDown: (e) => handleRemoveTagKeyDown(option.value, e),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
					})]
				}, option.value))
			});
		}
		const selectedOption$1 = options.find((opt) => opt.value === value);
		if (selectedOption$1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.render-trigger-content",
			className: "flex items-center gap-2 flex-1 min-w-0 truncate",
			children: [selectedOption$1.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: selectedOption$1.label
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "ui.render-trigger-content",
			className: "text-muted-foreground",
			children: placeholder
		});
	};
	const renderTriggerInput = () => {
		const triggerInputValue = open ? triggerSearch : selectedOption?.label ?? "";
		const triggerInputPlaceholder = open ? selectedOption?.label ?? placeholder : placeholder;
		const inputSize = size ?? "default";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverAnchor, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				style: { width: triggerWidth },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: triggerInputRef,
						type: "text",
						value: triggerInputValue,
						placeholder: triggerInputPlaceholder,
						disabled,
						"aria-expanded": open,
						"aria-invalid": error,
						role: "combobox",
						autoComplete: "off",
						spellCheck: false,
						onFocus: handleTriggerInputFocus,
						onMouseDown: handleTriggerInputMouseDown,
						onClick: handleTriggerInputClick,
						onChange: handleTriggerInputChange,
						onKeyDown: handleTriggerInputKeyDown,
						style: triggerStyle,
						className: cn("w-full rounded-md border-1 bg-muted/20 pr-8 shadow-none transition-colors", "focus-visible:border-ring", error && "border-destructive!", disabled && "cursor-not-allowed opacity-50", comboboxInputSizeClasses[inputSize], className)
					}) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 shrink-0 opacity-50 transition-transform", open && "rotate-180") })]
			}) })
		});
	};
	const renderMultiTrigger = () => {
		const inputSize = size ?? "default";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "ui.render-multi-trigger.combobox",
				role: "combobox",
				tabIndex: disabled ? -1 : 0,
				"aria-expanded": open,
				"aria-invalid": error,
				"aria-disabled": disabled,
				style: {
					width: triggerWidth,
					...triggerStyle
				},
				className: cn(comboboxTriggerVariants({
					state,
					size
				}), comboboxInputSizeClasses[inputSize], "cursor-pointer", className),
				onKeyDown: (event) => {
					if (disabled) return;
					if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
						event.preventDefault();
						handleOpenChange(true);
					}
				},
				children: [renderTriggerContent(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 opacity-50" })]
			}) })
		});
	};
	const renderOptionContent = (option) => {
		if (renderOption) return renderOption(option);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			option.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.render-option-content",
				className: "shrink-0",
				children: option.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "ui.render-option-content",
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate",
					children: option.label
				}), option.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground truncate",
					children: option.description
				})]
			}),
			isSelected(option.value) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 shrink-0 text-primary" })
		] });
	};
	const state = disabled ? "disabled" : error ? "error" : "default";
	const triggerWidth = width ? typeof width === "number" ? `${width}px` : width : void 0;
	const popoverWidth = typeof triggerWidth === "string" && triggerWidth.trim().endsWith("%") ? "var(--radix-popover-trigger-width)" : triggerWidth;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: handleOpenChange,
		children: [
			triggerSearchEnabled ? renderTriggerInput() : multiple ? renderMultiTrigger() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size,
					disabled,
					style: {
						width: triggerWidth,
						...triggerStyle
					},
					className: cn(comboboxTriggerVariants({
						state,
						size
					}), className),
					"aria-expanded": open,
					"aria-invalid": error,
					children: [renderTriggerContent(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-50 shrink-0" })]
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
				className: cn("p-0 rounded-md", popoverClassName),
				align: popoverAlign,
				portalContainer,
				style: { width: popoverWidth },
				onOpenAutoFocus: (event) => {
					if (!triggerSearchEnabled) return;
					event.preventDefault();
					triggerInputRef.current?.focus();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
					shouldFilter: !manualFilterEnabled,
					...!multiple ? {
						value: activeValue,
						onValueChange: setActiveValue
					} : {},
					children: [contentSearchEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
						placeholder: searchPlaceholder,
						className: "h-9 rounded-none",
						onValueChange: handleContentSearchChange
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandList, { children: manualFilterEnabled ? visibleOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-6 text-center text-muted-foreground text-sm",
						children: emptyText
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: visibleOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandItem, {
						value: option.value || option.label,
						disabled: option.disabled,
						onSelect: () => handleSelect(option.value),
						className: cn(comboboxItemVariants({ state: option.disabled ? "disabled" : "default" })),
						children: renderOptionContent(option)
					}, option.value)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: emptyText }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandItem, {
						value: option.value,
						disabled: option.disabled,
						onSelect: () => handleSelect(option.value),
						className: cn(comboboxItemVariants({ state: option.disabled ? "disabled" : "default" })),
						children: renderOptionContent(option)
					}, option.value)) })] }) })]
				})
			}),
			name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name,
				value: multiple ? JSON.stringify(value) : value
			})
		]
	});
}
export { Combobox as t };
