import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import { r as formatErrorMessage } from "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { t as Input } from "./input-dvr72LyA.js";
import { i as Flex } from "./flex-BmIgOnUt.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import "./model-CfoN7z8F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as popup } from "./popup-C0FVl5N5.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-aatUlttR.js";
import { t as useTimer } from "./useTimer-Brbjkb3R.js";
import "./useTemporaryValue-B7uYRu1H.js";
import { t as CopyButton_default } from "./CopyButton-cq35cwKK.js";
import { t as Selector_default } from "./Selector-CereZliw.js";
const isValidProxyUrl = (url) => {
	return url.includes("://");
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var defaultByPassRules = "localhost,127.0.0.1,::1";
var SystemSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { setTimeoutTimer } = useTimer();
	const [disableHardwareAcceleration, setDisableHardwareAcceleration] = usePreference("BootConfig.app.disable_hardware_acceleration");
	const [launchOnBoot, setLaunchOnBoot] = usePreference("app.launch_on_boot");
	const [launchToTray, setLaunchToTray] = usePreference("app.tray.on_launch");
	const [trayOnClose, setTrayOnClose] = usePreference("app.tray.on_close");
	const [tray, setTray] = usePreference("app.tray.enabled");
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
		setTray(isShowTray);
		if (!isShowTray) {
			updateTrayOnClose(false);
			updateLaunchToTray(false);
		}
	};
	const updateTrayOnClose = (isTrayOnClose) => {
		setTrayOnClose(isTrayOnClose);
		if (isTrayOnClose && !tray) updateTray(true);
	};
	const updateLaunchToTray = (isLaunchToTray) => {
		setLaunchToTray(isLaunchToTray);
		if (isLaunchToTray && !tray) updateTray(true);
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
