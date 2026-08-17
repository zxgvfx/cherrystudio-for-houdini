import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import { t as useMultiplePreferences } from "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Divider } from "./divider-2gEjzcxJ.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import { t as InfoTooltip } from "./info-tooltip-BdxcTZZj.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-ctf-2wxz.js";
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
