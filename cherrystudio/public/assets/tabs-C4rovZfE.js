import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as cva } from "./dist-D9lByzdX.js";
import { t as composeEventHandlers } from "./dist-BmK6Zb4Q.js";
import { t as createContextScope } from "./dist-C32f4YnQ.js";
import { t as useControllableState } from "./dist-jCnGD-aV.js";
import { t as Primitive } from "./dist-NOUgcFN0.js";
import { t as Presence } from "./dist-BjcJx0ps.js";
import { t as useDirection } from "./dist-6hXrXisB.js";
import { t as useId } from "./dist-CXJZQETI.js";
import { n as Root, r as createRovingFocusGroupScope, t as Item } from "./dist-C_sVc7-A.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
var TabsContext = import_react.createContext({
	variant: "default",
	orientation: "horizontal"
});
function Tabs({ className, variant = "default", orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContext, {
		value: {
			variant,
			orientation
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
			"data-ui": "part:tabs",
			"data-slot": "tabs",
			orientation,
			className: cn("flex flex-col gap-2", orientation === "vertical" && "flex-row", className),
			...mergeUiProps(props, "part:tabs")
		})
	});
}
var tabsListVariants = cva("inline-flex items-center justify-center", {
	variants: {
		variant: {
			default: "bg-muted text-muted-foreground h-9 w-fit rounded-lg p-[3px]",
			line: "bg-transparent gap-4 justify-start border-b-0 p-0",
			underline: "bg-transparent gap-0 justify-start border-b-0 p-0",
			workflow: "bg-transparent gap-3 justify-start border-b-0 p-0"
		},
		orientation: {
			horizontal: "flex-row",
			vertical: "flex-col h-fit"
		}
	},
	compoundVariants: [{
		variant: "default",
		orientation: "vertical",
		class: "h-fit w-fit flex-col"
	}, {
		variant: "line",
		orientation: "vertical",
		class: "flex-col items-stretch pb-0"
	}],
	defaultVariants: {
		variant: "default",
		orientation: "horizontal"
	}
});
function TabsList({ className, ...props }) {
	const { variant, orientation } = import_react.use(TabsContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-ui": "part:tabs-list",
		"data-slot": "tabs-list",
		className: cn(tabsListVariants({
			variant,
			orientation
		}), className),
		...mergeUiProps(props, "part:tabs-list")
	});
}
var tabsTriggerVariants = cva([
	"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
	"disabled:pointer-events-none disabled:opacity-50",
	"transition-all outline-none",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\"size-\"])]:size-4"
], {
	variants: {
		variant: {
			default: [
				"h-[calc(100%-1px)] flex-1 gap-1.5 px-2 py-1 rounded-md",
				"text-foreground border border-transparent",
				"dark:text-muted-foreground",
				"focus-visible:border-primary focus-visible:bg-accent",
				"data-[state=active]:bg-background data-[state=active]:shadow-sm",
				"dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30"
			],
			line: [
				"relative gap-2 px-2 py-2",
				"font-normal text-muted-foreground hover:text-foreground",
				"focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4",
				"data-[state=active]:text-primary",
				"after:absolute after:rounded-full after:bg-transparent",
				"data-[state=active]:after:bg-primary"
			],
			underline: [
				"relative gap-1.5 px-2.5 py-2",
				"font-normal text-muted-foreground hover:text-foreground",
				"focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4",
				"data-[state=active]:text-foreground",
				"after:absolute after:rounded-none after:bg-transparent",
				"data-[state=active]:after:bg-primary"
			],
			workflow: [
				"relative gap-1.5 px-1 py-1.5 text-sm font-normal",
				"text-muted-foreground hover:text-foreground",
				"rounded-sm focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4",
				"data-[state=active]:text-foreground data-[state=active]:font-semibold",
				"data-[state=active]:underline data-[state=active]:underline-offset-4 data-[state=active]:decoration-1",
				"[&:not(:first-child)]:before:content-['›']",
				"[&:not(:first-child)]:before:mr-3 [&:not(:first-child)]:before:text-base",
				"[&:not(:first-child)]:before:font-normal [&:not(:first-child)]:before:no-underline",
				"[&:not(:first-child)]:before:text-muted-foreground"
			]
		},
		orientation: {
			horizontal: "",
			vertical: "rounded-full"
		}
	},
	compoundVariants: [
		{
			variant: "line",
			orientation: "horizontal",
			class: "after:bottom-0 after:left-0 after:h-[2px] after:w-full data-[state=active]:after:h-[4px]"
		},
		{
			variant: "line",
			orientation: "vertical",
			class: ["justify-center after:bottom-0 after:left-0 after:h-[4px] after:w-full after:bg-transparent data-[state=active]:after:bg-primary", "hover:text-primary hover:bg-primary/10"]
		},
		{
			variant: "underline",
			orientation: "horizontal",
			class: "after:bottom-0 after:left-0 after:h-0.5 after:w-full"
		}
	],
	defaultVariants: {
		variant: "default",
		orientation: "horizontal"
	}
});
function TabsTrigger({ className, ...props }) {
	const { variant, orientation } = import_react.use(TabsContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-ui": "part:tabs-trigger",
		"data-slot": "tabs-trigger",
		className: cn(tabsTriggerVariants({
			variant,
			orientation
		}), className),
		...mergeUiProps(props, "part:tabs-trigger")
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		"data-ui": "part:tabs-content",
		"data-slot": "tabs-content",
		className: cn("flex-1 outline-none", className),
		...mergeUiProps(props, "part:tabs-content")
	});
}
export { TabsTrigger as i, TabsContent as n, TabsList as r, Tabs as t };
