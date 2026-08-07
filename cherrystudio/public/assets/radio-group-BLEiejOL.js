import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, n as useComposedRefs, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as cva } from "./dist-5QAtVvkT.js";
import { t as composeEventHandlers } from "./dist-DOdXVW1s.js";
import { t as createContextScope } from "./dist-C32tb75D.js";
import { t as useControllableState } from "./dist-UecRqrJ2.js";
import { n as usePrevious, t as useSize } from "./dist-DWvwIo7y.js";
import { t as Primitive } from "./dist-CRi1L997.js";
import { t as Presence } from "./dist-BloQ98wg.js";
import { t as useDirection } from "./dist-BOf8p4Yz.js";
import { n as Root, r as createRovingFocusGroupScope, t as Item } from "./dist-C8aiYimE.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, name, checked = false, required, disabled, value = "on", onCheck, form, ...radioProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioProvider, {
		scope: __scopeRadio,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "radio",
			"aria-checked": checked,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...radioProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				if (!checked) onCheck?.();
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, forceMount, ...indicatorProps } = props;
	const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef
		})
	});
});
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = import_react.forwardRef(({ __scopeRadio, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "radio",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [createRovingFocusGroupScope, createRadioScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, name, defaultValue, value: valueProp, required = false, disabled = false, orientation, dir, loop = true, onValueChange, ...groupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? null,
		onChange: onValueChange,
		caller: RADIO_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: __scopeRadioGroup,
		name,
		required,
		disabled,
		value,
		onValueChange: setValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "radiogroup",
				"aria-required": required,
				"aria-orientation": orientation,
				"data-disabled": disabled ? "" : void 0,
				dir: direction,
				...groupProps,
				ref: forwardedRef
			})
		})
	});
});
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, disabled, ...itemProps } = props;
	const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
	const isDisabled = context.disabled || disabled;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const radioScope = useRadioScope(__scopeRadioGroup);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const checked = context.value === itemProps.value;
	const isArrowKeyPressedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressedRef.current = true;
		};
		const handleKeyUp = () => isArrowKeyPressedRef.current = false;
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !isDisabled,
		active: checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			disabled: isDisabled,
			required: context.required,
			checked,
			...radioScope,
			...itemProps,
			name: context.name,
			ref: composedRefs,
			onCheck: () => context.onValueChange(itemProps.value),
			onKeyDown: composeEventHandlers((event) => {
				if (event.key === "Enter") event.preventDefault();
			}),
			onFocus: composeEventHandlers(itemProps.onFocus, () => {
				if (isArrowKeyPressedRef.current) ref.current?.click();
			})
		})
	});
});
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...indicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioIndicator, {
		...useRadioScope(__scopeRadioGroup),
		...indicatorProps,
		ref: forwardedRef
	});
});
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
var radioGroupItemVariants = cva(cn("aspect-square shrink-0 rounded-full border border-input bg-transparent text-primary shadow-none transition-[color,border-color,box-shadow] outline-none", "data-[state=checked]:border-2 data-[state=checked]:border-primary", "focus-visible:border-primary", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", "disabled:cursor-not-allowed disabled:opacity-50"), {
	variants: { size: {
		sm: "size-3.5",
		md: "size-4",
		lg: "size-5"
	} },
	defaultVariants: { size: "md" }
});
function RadioGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-ui": "part:radio-group",
		"data-slot": "radio-group",
		className: cn("grid gap-3", className),
		...mergeUiProps(props, "part:radio-group")
	});
}
function RadioGroupItem({ className, size = "md", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-ui": "part:radio-group-item",
		"data-slot": "radio-group-item",
		"data-size": size,
		className: cn(radioGroupItemVariants({ size }), className),
		...mergeUiProps(props, "part:radio-group-item"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			"data-ui": "part:radio-group-indicator",
			"data-slot": "radio-group-indicator"
		})
	});
}
export { RadioGroupItem as n, RadioGroup as t };
