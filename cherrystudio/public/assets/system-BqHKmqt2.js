import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import { r as formatErrorMessage } from "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference, t as useMultiplePreferences } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Divider } from "./divider-CbA9R3bs.js";
import { n as Switch } from "./switch-C4W4NCwc.js";
import "./es2015-wfS3L7va.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { i as Flex } from "./flex-YDL2weOg.js";
import { t as InfoTooltip } from "./info-tooltip-CH14M-gb.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as popup } from "./popup-fJcKiA2S.js";
import "./systemProviderId-B4QvwwvR.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import { t as useTimer } from "./useTimer-CtD1TRRj.js";
import "./useTemporaryValue-CJVn11gD.js";
import { t as CopyButton_default } from "./CopyButton-C5ZE8W-P.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-DyPgPdGs.js";
import { t as Selector_default } from "./Selector-D0MYdL4F.js";
const isValidProxyUrl = (url) => {
	return url.includes("://");
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var defaultByPassRules = "localhost,127.0.0.1,::1";
var TRAY_PREFERENCE_KEYS = {
	enabled: "app.tray.enabled",
	onClose: "app.tray.on_close",
	onLaunch: "app.tray.on_launch",
	clickTrayToShowQuickAssistant: "feature.quick_assistant.click_tray_to_show"
};
var SystemSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { setTimeoutTimer } = useTimer();
	const [disableHardwareAcceleration, setDisableHardwareAcceleration] = usePreference("BootConfig.app.disable_hardware_acceleration");
	const [launchOnBoot, setLaunchOnBoot] = usePreference("app.launch_on_boot");
	const [trayPreferences, setTrayPreferences] = useMultiplePreferences(TRAY_PREFERENCE_KEYS);
	const { enabled: tray, onClose: trayOnClose, onLaunch: launchToTray } = trayPreferences;
	const [preventSleepWhenBusy, setPreventSleepWhenBusy] = usePreference("app.power.prevent_sleep_when_busy");
	const [storeProxyMode, setProxyMode] = usePreference("app.proxy.mode");
	const [storeProxyBypassRules, _setProxyBypassRules] = usePreference("app.proxy.bypass_rules");
	const [storeProxyUrl, _setProxyUrl] = usePreference("app.proxy.url");
	const [enableDeveloperMode, setEnableDeveloperMode] = usePreference("app.developer_mode.enabled");
	const [clientId] = usePreference("app.user.id");
	const [proxyUrl, setProxyUrl] = (0, import_react.useState)(storeProxyUrl);
	const [proxyBypassRules, setProxyBypassRules] = (0, import_react.useState)(storeProxyBypassRules);
	const proxyModeOptions = [
		{
			value: "system",
			label: t("settings.proxy.mode.system")
		},
		{
			value: "custom",
			label: t("settings.proxy.mode.custom")
		},
		{
			value: "none",
			label: t("settings.proxy.mode.none")
		}
	];
	const updateTray = (isShowTray) => {
		setTrayPreferences(isShowTray ? { enabled: true } : {
			enabled: false,
			onClose: false,
			onLaunch: false,
			clickTrayToShowQuickAssistant: false
		});
	};
	const updateTrayOnClose = (isTrayOnClose) => {
		setTrayPreferences(isTrayOnClose && !tray ? {
			enabled: true,
			onClose: true
		} : { onClose: isTrayOnClose });
	};
	const updateLaunchToTray = (isLaunchToTray) => {
		setTrayPreferences(isLaunchToTray && !tray ? {
			enabled: true,
			onLaunch: true
		} : { onLaunch: isLaunchToTray });
	};
	const onSetProxyUrl = () => {
		if (proxyUrl && !isValidProxyUrl(proxyUrl)) {
			toast.error(t("message.error.invalid.proxy.url"));
			return;
		}
		_setProxyUrl(proxyUrl);
	};
	const onSetProxyBypassRules = () => {
		_setProxyBypassRules(proxyBypassRules);
	};
	const handleHardwareAccelerationChange = async (checked) => {
		if (!await popup.confirm({
			title: t("settings.hardware_acceleration.confirm.title"),
			content: checked ? t("settings.hardware_acceleration.confirm.content_disable") : t("settings.hardware_acceleration.confirm.content_enable"),
			okText: t("common.confirm"),
			cancelText: t("common.cancel"),
			centered: true
		})) return;
		try {
			await setDisableHardwareAcceleration(checked);
		} catch (error) {
			toast.error(formatErrorMessage(error));
			throw error;
		}
		setTimeoutTimer("handleHardwareAccelerationChange", () => {
			window.api.application.relaunch();
		}, 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.launch.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.launch.onboot") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: launchOnBoot,
						onCheckedChange: (checked) => void setLaunchOnBoot(checked)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.launch.totray") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: launchToTray,
						onCheckedChange: (checked) => updateLaunchToTray(checked)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.tray.show") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: tray,
						onCheckedChange: (checked) => updateTray(checked)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.tray.onclose") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: trayOnClose,
						onCheckedChange: (checked) => updateTrayOnClose(checked)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.power.prevent_sleep_when_busy") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: preventSleepWhenBusy,
						onCheckedChange: (checked) => void setPreventSleepWhenBusy(checked)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.proxy.mode.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.proxy.mode.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector_default, {
						value: storeProxyMode,
						onChange: (mode) => void setProxyMode(mode),
						options: proxyModeOptions
					})] }),
					storeProxyMode === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.proxy.address") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							spellCheck: false,
							placeholder: "socks5://127.0.0.1:6153",
							value: proxyUrl,
							onChange: (e) => setProxyUrl(e.target.value),
							style: { width: 220 },
							onBlur: onSetProxyUrl,
							type: "url"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.proxy.bypass") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
								content: t("settings.proxy.tip"),
								placement: "right",
								iconProps: { className: "cursor-pointer" }
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							spellCheck: false,
							placeholder: defaultByPassRules,
							value: proxyBypassRules,
							onChange: (e) => setProxyBypassRules(e.target.value),
							style: { width: 220 },
							onBlur: onSetProxyBypassRules
						})] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.hardware_acceleration.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: disableHardwareAcceleration,
						onCheckedChange: handleHardwareAccelerationChange
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.developer.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
						className: "items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.developer.enable_developer_mode") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.developer.help") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: enableDeveloperMode,
						onCheckedChange: setEnableDeveloperMode
					})] }),
					enableDeveloperMode && clientId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
						className: "gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.developer.client_id") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "select-text break-all text-right font-mono text-foreground-tertiary text-xs",
								children: clientId
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
								textToCopy: clientId,
								successFeedback: "icon"
							})]
						})]
					})] }) : null
				]
			})
		]
	});
};
var SplitComponent = SystemSettings;
export { SplitComponent as component };
