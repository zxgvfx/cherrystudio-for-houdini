import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function SegmentedControl({ options, value, defaultValue, onValueChange, disabled = false, size = "default", className, ...props }) {
	const [internalValue, setInternalValue] = import_react.useState(defaultValue ?? options[0]?.value);
	const selectedValue = value ?? internalValue;
	const handleSelect = (option) => {
		if (disabled || option.disabled || option.value === selectedValue) return;
		if (value === void 0) setInternalValue(option.value);
		onValueChange?.(option.value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.segmented-control part:segmented-control",
		role: "radiogroup",
		"data-slot": "segmented-control",
		"data-size": size,
		"aria-disabled": disabled,
		className: cn("inline-flex items-center rounded-full border border-border/60 bg-muted/60 p-0.5", disabled && "pointer-events-none opacity-50", className),
		...mergeUiProps(props, "ui.segmented-control part:segmented-control"),
		children: options.map((option) => {
			const selected = option.value === selectedValue;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-ui": "ui.segmented-control.radio",
				type: "button",
				role: "radio",
				"aria-checked": selected,
				disabled: disabled || option.disabled,
				onClick: () => handleSelect(option),
				className: cn("inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium text-muted-foreground outline-none transition-[background-color,color,box-shadow]", "hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground disabled:pointer-events-none disabled:opacity-50", size === "sm" ? "h-7 gap-1.5 px-2.5 text-xs" : "h-8 gap-2 px-3 text-sm", selected && "bg-background text-foreground shadow-xs"),
				children: option.label
			}, option.value);
		})
	});
}
export { SegmentedControl as t };
