import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as useCallbackRef } from "./dist-6HM0HyiE.js";
import { t as cva } from "./dist-5QAtVvkT.js";
import { t as composeEventHandlers } from "./dist-DOdXVW1s.js";
import { t as useControllableState } from "./dist-UecRqrJ2.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var textareaVariants = cva(cn("flex field-sizing-content min-h-16 w-full border bg-transparent px-4 py-3 text-lg transition-[color,box-shadow] outline-none resize-y", "rounded-md", "border-input text-foreground placeholder:text-muted-foreground", "focus-visible:border-primary", "disabled:cursor-not-allowed disabled:opacity-50", "md:text-sm"), {
	variants: { hasError: {
		true: "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
		false: ""
	} },
	defaultVariants: { hasError: false }
});
var INPUT_NAME = "TextareaInput";
function TextareaInput({ value: valueProp, defaultValue, onValueChange, hasError = false, className, ref, ...props }) {
	const [value = "", setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange
	});
	const handleChange = useCallbackRef((event) => {
		const newValue = event.target.value;
		if (props.maxLength && newValue.length > props.maxLength) return;
		setValue(newValue);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-ui": "ui.textarea-input part:textarea-input",
		"data-slot": "textarea-input",
		...mergeUiProps(props, "ui.textarea-input part:textarea-input"),
		ref,
		value,
		onChange: composeEventHandlers(props.onChange, handleChange),
		"aria-invalid": hasError,
		className: cn(textareaVariants({ hasError }), className)
	});
}
TextareaInput.displayName = INPUT_NAME;
var CHAR_COUNT_NAME = "TextareaCharCount";
function TextareaCharCount({ value = "", maxLength, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.textarea-char-count part:textarea-char-count",
		"data-slot": "textarea-char-count",
		...mergeUiProps(props, "ui.textarea-char-count part:textarea-char-count"),
		className: cn("absolute bottom-2 right-2 text-xs text-muted-foreground", className),
		children: [
			value.length,
			"/",
			maxLength
		]
	});
}
TextareaCharCount.displayName = CHAR_COUNT_NAME;
var Input = TextareaInput;
export { Input as t };
