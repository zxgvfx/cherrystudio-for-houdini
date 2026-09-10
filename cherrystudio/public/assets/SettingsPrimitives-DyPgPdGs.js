import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as cn } from "./style-BQVh98fR.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const SettingContainer = ({ className, theme, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting",
	"data-theme-mode": theme,
	className: cn("flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden", className),
	...mergeUiProps(props, "ui.setting")
});
const SettingsContentColumn = ({ className, innerClassName, theme, children, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.settings-content-column",
	"data-theme-mode": theme,
	className: cn("flex min-h-0 flex-1 flex-col overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", className),
	...mergeUiProps(rest, "ui.settings-content-column"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-3xl", innerClassName),
		children
	})
});
const SettingsContentBody = ({ className, innerClassName, children, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.settings-content-body",
	className: cn("flex min-h-full w-full flex-col p-6", className),
	...mergeUiProps(rest, "ui.settings-content-body"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-3xl", innerClassName),
		children
	})
});
const SettingTitle = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-title",
	className: cn("flex select-none items-center justify-between font-semibold text-[15px]", className),
	...mergeUiProps(props, "ui.setting-title")
});
const SettingSubtitle = ({ ref, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-subtitle",
	ref,
	className: cn("select-none font-semibold text-foreground text-sm", className),
	...mergeUiProps(props, "ui.setting-subtitle")
});
const SettingDescription = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-description",
	className: cn("mt-2.5 text-muted-foreground text-xs", className),
	...mergeUiProps(props, "ui.setting-description")
});
const SettingRow = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-row",
	className: cn("flex min-h-6 flex-wrap items-center justify-between gap-x-4 gap-y-2", className),
	...mergeUiProps(props, "ui.setting-row")
});
const SettingRowTitle = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-row-title",
	className: cn("flex min-w-0 flex-wrap items-center text-foreground text-sm leading-4.5", className),
	...mergeUiProps(props, "ui.setting-row-title")
});
const SettingHelpTextRow = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-help-text-row",
	className: cn("flex items-center py-1.25", className),
	...mergeUiProps(props, "ui.setting-help-text-row")
});
const SettingHelpText = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-help-text",
	className: cn("text-[11px] text-muted-foreground", className),
	...mergeUiProps(props, "ui.setting-help-text")
});
const SettingHelpLink = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"data-ui": "ui.setting-help-link",
	className: cn("cursor-pointer text-[11px] text-link hover:underline", className),
	...mergeUiProps(props, "ui.setting-help-link")
});
const SettingTitleExternalLink = ({ className, target = "_blank", rel = "noreferrer", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"data-ui": "ui.setting-title-external-link",
	target,
	rel,
	className: cn("inline-flex items-center text-link hover:underline", className),
	...mergeUiProps(props, "ui.setting-title-external-link")
});
const SettingGroup = ({ className, style, theme, variant = "card", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.setting-group",
	"data-theme-mode": theme,
	style: {
		backgroundColor: variant === "card" ? "var(--settings-group-background, var(--card))" : void 0,
		...style
	},
	className: cn(variant === "card" ? "mt-4 rounded-xl border border-border bg-card p-4 first:mt-0" : "mt-2 border-border-subtle border-t pt-3 first:mt-0 first:border-t-0 first:pt-0", className),
	...mergeUiProps(props, "ui.setting-group")
});
export { SettingHelpText as a, SettingRowTitle as c, SettingTitleExternalLink as d, SettingsContentBody as f, SettingHelpLink as i, SettingSubtitle as l, SettingDescription as n, SettingHelpTextRow as o, SettingsContentColumn as p, SettingGroup as r, SettingRow as s, SettingContainer as t, SettingTitle as u };
