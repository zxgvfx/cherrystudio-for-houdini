import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { t as useMultiplePreferences } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Divider } from "./divider-CbA9R3bs.js";
import { n as Switch } from "./switch-C4W4NCwc.js";
import { t as InfoTooltip } from "./info-tooltip-CH14M-gb.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-DyPgPdGs.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var NotificationSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const [notificationSettings, setNotificationSettings] = useMultiplePreferences({
		assistant: "app.notification.assistant.enabled",
		backup: "app.notification.backup.enabled",
		knowledge: "app.notification.knowledge.enabled",
		update: "app.notification.update.enabled"
	});
	const handleNotificationChange = (type, value) => {
		setNotificationSettings({ [type]: value });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
		theme,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
			theme,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.notification.title") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 4
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.notification.assistant") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
						content: t("notification.tip"),
						placement: "right",
						iconProps: { className: "cursor-pointer" }
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: notificationSettings.assistant,
					onCheckedChange: (v) => handleNotificationChange("assistant", v)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.notification.backup") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: notificationSettings.backup,
					onCheckedChange: (v) => handleNotificationChange("backup", v)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.notification.knowledge_embed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: notificationSettings.knowledge,
					onCheckedChange: (v) => handleNotificationChange("knowledge", v)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.notification.update") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					"aria-label": t("settings.notification.update"),
					checked: notificationSettings.update,
					onCheckedChange: (v) => handleNotificationChange("update", v)
				})] })
			]
		})
	});
};
var SplitComponent = NotificationSettings;
export { SplitComponent as component };
