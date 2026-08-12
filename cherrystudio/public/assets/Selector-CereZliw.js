import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { i as UiDataSlot, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-n5iWPIgn.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var placementMap = {
	topLeft: {
		side: "top",
		align: "start"
	},
	topCenter: {
		side: "top",
		align: "center"
	},
	topRight: {
		side: "top",
		align: "end"
	},
	bottomLeft: {
		side: "bottom",
		align: "start"
	},
	bottomCenter: {
		side: "bottom",
		align: "center"
	},
	bottomRight: {
		side: "bottom",
		align: "end"
	},
	top: {
		side: "top",
		align: "center"
	},
	bottom: {
		side: "bottom",
		align: "center"
	}
};
var isSameValue = (left, right) => left === right || String(left) === String(right);
var getNodeText = (node) => {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(getNodeText).join("");
	if ((0, import_react.isValidElement)(node)) {
		if (node.props["aria-hidden"]) return "";
		return getNodeText(node.props.children);
	}
	return "";
};
var Selector = ({ options, value, onChange = () => {}, placement = "bottomRight", size = 13, placeholder, style, disabled = false, multiple = false }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { t } = useTranslation();
	const popoverPlacement = placementMap[placement];
	const selectedValues = (0, import_react.useMemo)(() => {
		if (multiple) return value || [];
		return value !== void 0 ? [value] : [];
	}, [value, multiple]);
	const label = (0, import_react.useMemo)(() => {
		if (selectedValues.length > 0) {
			const findLabels = (opts) => {
				const labels$1 = [];
				for (const opt of opts) {
					if (selectedValues.some((v) => isSameValue(v, opt.value))) labels$1.push(opt.label);
					if (opt.options) labels$1.push(...findLabels(opt.options));
				}
				return labels$1;
			};
			const labels = findLabels(options);
			if (labels.length === 0) return placeholder;
			if (labels.length === 1) return labels[0];
			return t("common.selectedItems", { count: labels.length });
		}
		return placeholder;
	}, [
		selectedValues,
		placeholder,
		options,
		t
	]);
	const handleOpenChange = (nextOpen) => {
		if (disabled) return;
		setOpen(nextOpen);
	};
	const handleTriggerKeyDown = (event) => {
		if (disabled) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			setOpen((currentOpen) => !currentOpen);
		}
	};
	const handleOptionSelect = (option) => {
		if (disabled || option.disabled) return;
		if (multiple) {
			onChange(selectedValues.some((selectedValue) => isSameValue(selectedValue, option.value)) ? selectedValues.filter((selectedValue) => !isSameValue(selectedValue, option.value)) : [...selectedValues, option.value]);
			return;
		}
		onChange(option.value);
		setOpen(false);
	};
	const renderOptions = (opts, level = 0) => opts.map((option) => {
		const isGroup = option.type === "group" || Boolean(option.options?.length);
		const isSelected = selectedValues.some((selectedValue) => isSameValue(selectedValue, option.value));
		if (isGroup) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.render-options",
			className: "py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 py-1 font-medium text-muted-foreground text-xs",
				children: option.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn(level > 0 && "pl-2"),
				children: renderOptions(option.options || [], level + 1)
			})]
		}, String(option.value));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			"data-ui": "ui.render-options.option",
			type: "button",
			role: "option",
			"aria-selected": isSelected,
			disabled: disabled || option.disabled,
			className: cn("flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-hidden transition-colors", "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground", "disabled:pointer-events-none disabled:opacity-50", level > 0 && "pl-4"),
			onClick: () => handleOptionSelect(option),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate",
				children: option.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex w-5 shrink-0 items-center justify-end",
				children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 })
			})]
		}, String(option.value));
	});
	const isPlaceholder = Boolean(placeholder && label === placeholder);
	const accessibleLabel = getNodeText(label);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open: open && !disabled,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				size: "sm",
				role: "combobox",
				"aria-label": accessibleLabel || void 0,
				"aria-expanded": open && !disabled,
				"aria-disabled": disabled || void 0,
				tabIndex: disabled ? -1 : 0,
				className: cn("min-w-0 text-left leading-none", open && !disabled && "bg-secondary-active", disabled && "cursor-not-allowed opacity-60", isPlaceholder && "text-muted-foreground"),
				onKeyDown: handleTriggerKeyDown,
				style: {
					fontSize: size,
					...style
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					"aria-hidden": "true",
					className: "size-3.5 shrink-0 text-muted-foreground"
				})]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: popoverPlacement.align,
			side: popoverPlacement.side,
			className: "max-h-80 w-auto min-w-(--radix-popover-trigger-width) overflow-y-auto p-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.selector.listbox",
				role: "listbox",
				"aria-multiselectable": multiple || void 0,
				children: renderOptions(options)
			})
		})]
	});
};
var Selector_default = Selector;
export { Selector_default as t };
