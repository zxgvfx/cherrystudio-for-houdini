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
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
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
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
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
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
var switchRootVariants = cva([
	"cs-switch cs-switch-root",
	"group relative cursor-pointer peer inline-flex shrink-0 items-center rounded-full shadow-xs outline-none transition-all",
	"data-[state=unchecked]:bg-gray-500/20 data-[state=checked]:bg-brand-600",
	"disabled:cursor-not-allowed disabled:opacity-40",
	"focus-visible:[box-shadow:inset_0_0_0_1px_var(--ring)]"
], {
	variants: {
		size: {
			xs: ["h-4.5 w-8"],
			sm: ["w-9 h-5"],
			md: ["w-11 h-5.5"],
			lg: ["w-11 h-6"]
		},
		loading: {
			false: null,
			true: ["bg-brand-300!"]
		}
	},
	defaultVariants: {
		size: "md",
		loading: false
	}
});
var switchThumbVariants = cva(["cs-switch cs-switch-thumb", "pointer-events-none block rounded-full ring-0 transition-all data-[state=unchecked]:translate-x-0"], {
	variants: {
		size: {
			xs: ["ml-[1px] size-4 data-[state=checked]:translate-x-3.5"],
			sm: ["size-4.5 ml-[1px] data-[state=checked]:translate-x-4"],
			md: ["size-[19px] ml-0.5 data-[state=checked]:translate-x-[21px]"],
			lg: ["size-5 ml-[3px] data-[state=checked]:translate-x-4.5"]
		},
		loading: {
			false: null,
			true: ["bg-brand-300!"]
		}
	},
	compoundVariants: [
		{
			size: "xs",
			loading: true,
			className: "ml-0.5 size-3.5 data-[state=checked]:translate-x-3.5"
		},
		{
			size: "sm",
			loading: true,
			className: "size-3.5 ml-0.5 data-[state=checked]:translate-x-4.5"
		},
		{
			size: "md",
			loading: true,
			className: "size-4 ml-1 data-[state=checked]:translate-x-5"
		},
		{
			size: "lg",
			loading: true,
			className: "size-4.5 ml-1 data-[state=checked]:translate-x-4.5"
		}
	]
});
var switchThumbSvgVariants = cva(["size-full", "transition-all"], {
	variants: { loading: {
		false: null,
		true: ["animate-spin"]
	} },
	defaultVariants: { loading: false }
});
function Switch({ loading = false, size = "md", className, classNames, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-ui": "part:switch",
		"data-slot": "switch",
		className: cn(switchRootVariants({
			size,
			loading
		}), className, classNames?.root),
		...mergeUiProps(props, "part:switch"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			"data-ui": "part:switch-thumb",
			"data-slot": "switch-thumb",
			className: cn(switchThumbVariants({
				size,
				loading
			}), classNames?.thumb),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 19 19",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				className: cn(switchThumbSvgVariants({ loading }), classNames?.thumbSvg),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM9.5 6.33301C8.91711 6.33301 8.44445 6.8058 8.44434 7.38867V11.6113C8.44445 12.1942 8.91711 12.667 9.5 12.667C10.0829 12.667 10.5555 12.1942 10.5557 11.6113V7.38867C10.5555 6.8058 10.0829 6.33301 9.5 6.33301Z",
					fill: "white"
				})
			})
		})
	});
}
var DescriptionSwitch = ({ label, description, position = "right", size = "md", ...props }) => {
	const isLeftSide = position === "left";
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.description-switch",
		className: cn("flex w-full gap-3 justify-between p-2", isLeftSide && "flex-row-reverse"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: cn("flex flex-col gap-1 cursor-pointer"),
			htmlFor: id,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-medium tracking-normal", {
					"text-sm leading-4": size === "sm",
					"text-md leading-4.5": size === "md",
					"text-lg leading-5.5": size === "lg"
				}, isLeftSide && "text-right"),
				children: label
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-muted-foreground", {
					"text-[10px] leading-3": size === "sm",
					"text-xs leading-3.5": size === "md",
					"text-sm leading-4": size === "lg"
				}),
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				id,
				size,
				...props
			})
		})]
	});
};
Switch.displayName = "Switch";
export { Switch as n, DescriptionSwitch as t };
