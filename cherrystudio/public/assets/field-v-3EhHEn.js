import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as cva } from "./dist-5QAtVvkT.js";
import { t as Label } from "./label-CUymrXZH.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function FieldSet({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", {
		"data-ui": "ui.field-set part:field-set",
		"data-slot": "field-set",
		className: cn("flex flex-col gap-6", "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3", className),
		...mergeUiProps(props, "ui.field-set part:field-set")
	});
}
function FieldLegend({ className, variant = "legend", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		"data-ui": "ui.field-legend part:field-legend",
		"data-slot": "field-legend",
		"data-variant": variant,
		className: cn("mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm", className),
		...mergeUiProps(props, "ui.field-legend part:field-legend")
	});
}
function FieldGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.field-group part:field-group",
		"data-slot": "field-group",
		className: cn("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4", className),
		...mergeUiProps(props, "ui.field-group part:field-group")
	});
}
var fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
		horizontal: [
			"flex-row items-center",
			"[&>[data-slot=field-label]]:flex-auto",
			"has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
		],
		responsive: [
			"flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
			"@md/field-group:[&>[data-slot=field-label]]:flex-auto",
			"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
		]
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.field part:field",
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...mergeUiProps(props, "ui.field part:field")
	});
}
function FieldContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.field-content part:field-content",
		"data-slot": "field-content",
		className: cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className),
		...mergeUiProps(props, "ui.field-content part:field-content")
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-ui": "part:field-label",
		"data-slot": "field-label",
		className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4", "has-data-[state=checked]:border-border-selected has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10", className),
		...mergeUiProps(props, "part:field-label")
	});
}
function FieldTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.field-title.field-label part:field-label",
		"data-slot": "field-label",
		className: cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50", className),
		...mergeUiProps(props, "ui.field-title.field-label part:field-label")
	});
}
function FieldDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-ui": "ui.field-description part:field-description",
		"data-slot": "field-description",
		className: cn("text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance", "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5", "[&>a]:text-link [&>a]:underline [&>a]:underline-offset-4", className),
		...mergeUiProps(props, "ui.field-description part:field-description")
	});
}
function FieldError({ className, children, errors, ...props }) {
	const content = import_react.useMemo(() => {
		if (children) return children;
		if (!errors?.length) return null;
		const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
		if (uniqueErrors?.length === 1) return uniqueErrors[0]?.message;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-ui": "ui.field-error",
			className: "ml-4 flex list-disc flex-col gap-1",
			children: uniqueErrors.map((error, index) => error?.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: error.message }, index))
		});
	}, [children, errors]);
	if (!content) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.field-error part:field-error",
		role: "alert",
		"data-slot": "field-error",
		className: cn("text-destructive text-sm font-normal", className),
		...mergeUiProps(props, "ui.field-error part:field-error"),
		children: content
	});
}
export { FieldGroup as a, FieldSet as c, FieldError as i, FieldTitle as l, FieldContent as n, FieldLabel as o, FieldDescription as r, FieldLegend as s, Field as t };
