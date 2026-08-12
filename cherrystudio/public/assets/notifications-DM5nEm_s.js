import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-uLlqCRc6.js";
import "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { t as useMultiplePreferences } from "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-aatUlttR.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var NotificationSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const [notificationSettings, setNotificationSettings] = useMultiplePreferences({
		assistant: "app.notification.assistant.enabled",
		backup: "app.notification.backup.enabled",
		knowledge: "app.notification.knowledge.enabled"
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
				})] })
			]
		})
	});
};
var SplitComponent = NotificationSettings;
export { SplitComponent as component };
