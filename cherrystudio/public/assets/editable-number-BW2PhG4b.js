import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var sizeClasses = {
	small: "h-8 text-sm",
	middle: "h-9 text-sm",
	large: "h-10 text-base"
};
var alignClasses = {
	start: "justify-start text-left",
	center: "justify-center text-center",
	end: "justify-end text-right"
};
var clamp = (value, min, max) => {
	if (min !== void 0 && value < min) return min;
	if (max !== void 0 && value > max) return max;
	return value;
};
var normalizeNumber = (value, precision, min, max) => {
	const trimmed = value.trim();
	if (!trimmed || trimmed === "-" || trimmed === "." || trimmed === "-.") return null;
	const parsed = Number(trimmed);
	if (Number.isNaN(parsed)) return null;
	const clamped = clamp(parsed, min, max);
	if (precision === void 0) return clamped;
	return Number(clamped.toFixed(precision));
};
var toInputValue = (value, precision) => {
	if (value === null || value === void 0) return "";
	return precision === void 0 ? String(value) : value.toFixed(precision);
};
var EditableNumber = ({ value, min, max, step = .01, precision, placeholder, disabled = false, onChange, onBlur, changeOnBlur = false, style, className, size = "middle", align = "end", suffix, prefix, formatter, block = false, id, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid }) => {
	const [isEditing, setIsEditing] = import_react.useState(false);
	const [inputValue, setInputValue] = import_react.useState(() => toInputValue(value, precision));
	const inputRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!isEditing) setInputValue(toInputValue(value, precision));
	}, [
		isEditing,
		precision,
		value
	]);
	const commitValue = import_react.useCallback((nextValue) => {
		const normalized = normalizeNumber(nextValue, precision, min, max);
		onChange?.(normalized);
		return normalized;
	}, [
		max,
		min,
		onChange,
		precision
	]);
	const handleFocus = () => {
		if (disabled) return;
		setIsEditing(true);
	};
	import_react.useEffect(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);
	const handleChange = (event) => {
		const nextValue = event.target.value;
		setInputValue(nextValue);
		if (!changeOnBlur) commitValue(nextValue);
	};
	const handleBlur = () => {
		setInputValue(toInputValue(changeOnBlur ? commitValue(inputValue) : normalizeNumber(inputValue, precision, min, max), precision));
		setIsEditing(false);
		onBlur?.();
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.currentTarget.blur();
			return;
		}
		if (event.key === "Escape") {
			event.stopPropagation();
			setInputValue(toInputValue(value, precision));
			setIsEditing(false);
			event.currentTarget.blur();
		}
	};
	const displayValue = formatter ? formatter(value ?? null) : value ?? placeholder;
	const shouldRenderDisplayValue = Boolean(formatter || prefix || suffix);
	const inputAlignClass = align === "start" ? "text-left" : align === "center" ? "text-center" : "text-right";
	const inputClassName = cn("border-input bg-background w-full rounded-md border px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", "focus-visible:border-primary", "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", sizeClasses[size], inputAlignClass, shouldRenderDisplayValue && !isEditing && "text-transparent caret-transparent", className);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.editable-number",
		className: cn("relative", block ? "block w-full" : "inline-block"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			id,
			placeholder,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			"aria-describedby": ariaDescribedBy,
			"aria-invalid": ariaInvalid,
			type: "number",
			value: inputValue,
			min,
			max,
			step,
			disabled,
			onChange: handleChange,
			onBlur: handleBlur,
			onFocus: handleFocus,
			onKeyDown: handleKeyDown,
			className: inputClassName,
			style
		}), shouldRenderDisplayValue && !isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("absolute inset-0 pointer-events-none", "border-input bg-background flex w-full items-center rounded-md border px-3 text-sm shadow-xs", disabled && "cursor-not-allowed opacity-50", alignClasses[align], sizeClasses[size], className),
			"aria-hidden": "true",
			style,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "truncate",
				children: [
					prefix,
					displayValue,
					suffix
				]
			})
		})]
	});
};
var editable_number_default = EditableNumber;
export { editable_number_default as t };
