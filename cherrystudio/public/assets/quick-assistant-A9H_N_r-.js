import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import { n as UiDataSlot, r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as Divider } from "./divider-CbA9R3bs.js";
import { n as Switch } from "./switch-C4W4NCwc.js";
import "./es2015-wfS3L7va.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-Cli1Z35D.js";
import { a as RowFlex } from "./flex-YDL2weOg.js";
import "./with-selector-DlsRhNV6.js";
import { t as InfoTooltip } from "./info-tooltip-CH14M-gb.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-CTQeiahJ.js";
import { t as SegmentedControl } from "./segmented-control-BPwDi61u.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import "./CacheService-IyXh62g9.js";
import "./useCache-lF6Sw_ck.js";
import "./file-OKCzlHoD.js";
import "./model-BOGgSmTN.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as Check } from "./check-C3qUONPw.js";
import { t as ChevronDown } from "./chevron-down-CZ6Nbooa.js";
import { t as Info } from "./info-DYnh0AU2.js";
import "./mcp-BGt1L-d_.js";
import "./label-CSb71add.js";
import "./systemProviderId-B4QvwwvR.js";
import "./provider-0IejLFjL.js";
import "./naming-BVJSQooI.js";
import "./provider-bQl8RVRp.js";
import "./uiParts-ClY38h-2.js";
import "./useExecutionOverlay-Cx6lCsHu.js";
import "./messageListItem-DqE378fB.js";
import { t as useDefaultModel } from "./useModel-kU1hKaYa.js";
import "./useProvider-DvntuFRN.js";
import "./capabilities-DNV_QUgI.js";
import "./model-BCwc3I-J.js";
import { i as useAssistants } from "./useAssistant-DKYAwKxt.js";
import "./useTemporaryTopic-fC-UaU_K.js";
import "./useTopicStreamStatus-Be-jC8fI.js";
import "./partsHelpers-DtgJJM4X.js";
import { t as HomeWindow_default } from "./HomeWindow-8Tw_H_Ml.js";
import "./react-hotkeys-hook.esm-Bq09MseZ.js";
import { t as ModelAvatar_default } from "./ModelAvatar-Dlf3Jj6Z.js";
import "./useTimer-CtD1TRRj.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-DyPgPdGs.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var QuickAssistantSettings = () => {
	const [enableQuickAssistant, setEnableQuickAssistant] = usePreference("feature.quick_assistant.enabled");
	const [clickTrayToShowQuickAssistant, setClickTrayToShowQuickAssistant] = usePreference("feature.quick_assistant.click_tray_to_show");
	const [readClipboardAtStartup, setReadClipboardAtStartup] = usePreference("feature.quick_assistant.read_clipboard_at_startup");
	const [, setTray] = usePreference("app.tray.enabled");
	const [quickAssistantId, setQuickAssistantId] = usePreference("feature.quick_assistant.assistant_id");
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { assistants, hasLoaded: haveAssistantsLoaded } = useAssistants();
	const { defaultModel } = useDefaultModel();
	const [assistantSelectOpen, setAssistantSelectOpen] = (0, import_react.useState)(false);
	const assistantOptions = assistants;
	const firstAssistantId = assistantOptions[0]?.id;
	const selectedAssistant = assistantOptions.find((assistant) => assistant.id === quickAssistantId);
	const isAssistantMode = Boolean(quickAssistantId && (!haveAssistantsLoaded || selectedAssistant));
	(0, import_react.useEffect)(() => {
		if (haveAssistantsLoaded && quickAssistantId && !selectedAssistant) setQuickAssistantId("");
	}, [
		haveAssistantsLoaded,
		quickAssistantId,
		selectedAssistant,
		setQuickAssistantId
	]);
	const handleAssistantSelect = (assistantId) => {
		setQuickAssistantId(assistantId);
		setAssistantSelectOpen(false);
	};
	const handleEnableQuickAssistant = async (enable) => {
		await setEnableQuickAssistant(enable);
		!enable && ipcApi.request("quick_assistant.close");
		if (enable && !clickTrayToShowQuickAssistant) toast.info({
			title: t("settings.quickAssistant.use_shortcut_to_show"),
			timeout: 4e3,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { size: 16 })
		});
		if (enable && clickTrayToShowQuickAssistant) setTray(true);
	};
	const handleClickTrayToShowQuickAssistant = async (checked) => {
		await setClickTrayToShowQuickAssistant(checked);
		if (checked) setTray(true);
	};
	const handleClickReadClipboardAtStartup = async (checked) => {
		await setReadClipboardAtStartup(checked);
		ipcApi.request("quick_assistant.close");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.quickAssistant.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 4
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.quickAssistant.enable_quick_assistant") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
							content: t("settings.quickAssistant.use_shortcut_to_show"),
							placement: "right",
							iconProps: { className: "cursor-pointer" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: enableQuickAssistant,
						onCheckedChange: handleEnableQuickAssistant
					})] }),
					enableQuickAssistant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.quickAssistant.click_tray_to_show") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: clickTrayToShowQuickAssistant,
						onCheckedChange: handleClickTrayToShowQuickAssistant
					})] })] }),
					enableQuickAssistant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.quickAssistant.read_clipboard_at_startup") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: readClipboardAtStartup,
						onCheckedChange: handleClickReadClipboardAtStartup
					})] })] })
				]
			}),
			enableQuickAssistant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup, {
				theme,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
					className: "min-h-8.5 flex-nowrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
						className: "gap-2.5",
						children: [t("settings.models.quick_assistant_model"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
							content: t("selection.settings.user_modal.model.tooltip"),
							showArrow: true,
							iconProps: { className: "cursor-pointer" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
						className: "items-center gap-2.5",
						children: [!quickAssistantId || !selectedAssistant ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
							className: "items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
								open: assistantSelectOpen,
								onOpenChange: setAssistantSelectOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "h-8.5 w-75 justify-between px-2 shadow-none",
										"aria-expanded": assistantSelectOpen,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantOption, {
											assistant: selectedAssistant,
											firstAssistantId,
											defaultModel
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											size: 16,
											className: "shrink-0 opacity-50"
										})]
									}) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
									className: "w-75 p-0",
									align: "end",
									onFocusOutside: (event) => {
										event.preventDefault();
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: t("settings.models.quick_assistant_selection") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: t("common.no_results") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: assistantOptions.map((assistant) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										value: `${assistant.name} ${assistant.id}`,
										keywords: [assistant.name, assistant.id],
										onSelect: () => {
											handleAssistantSelect(assistant.id);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantOption, {
											assistant,
											firstAssistantId,
											defaultModel
										}), assistant.id === quickAssistantId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											size: 14,
											className: "ml-auto text-primary"
										})]
									}, assistant.id)) })] })] })
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
							size: "sm",
							value: isAssistantMode ? "assistant" : "model",
							options: [{
								value: "assistant",
								label: t("settings.models.use_assistant"),
								disabled: assistantOptions.length === 0
							}, {
								value: "model",
								label: t("settings.models.use_model")
							}],
							onValueChange: (value) => void setQuickAssistantId(value === "assistant" ? firstAssistantId ?? "" : "")
						})]
					})]
				})
			}),
			enableQuickAssistant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-5 h-115 w-full overflow-hidden rounded-[10px] border-[0.5px] border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeWindow_default, { draggable: false })
			})
		]
	});
};
var AssistantOption = ({ assistant, firstAssistantId, defaultModel }) => {
	const { t } = useTranslation();
	const isDefault = !!firstAssistantId && assistant.id === firstAssistantId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AssistantItem, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
			model: defaultModel,
			size: 18
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantName, { children: assistant.name }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spacer, {}),
		isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultTag, {
			isCurrent: true,
			children: t("settings.models.quick_assistant_default_tag")
		})
	] });
};
var AssistantItem = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.assistant-item",
	className: cn("flex h-7 min-w-0 flex-1 flex-row items-center gap-2", className),
	...mergeUiProps(props, "settings.assistant-item")
});
var AssistantName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.assistant-name",
	className: cn("max-w-[calc(100%-60px)] truncate", className),
	...mergeUiProps(props, "settings.assistant-name")
});
var Spacer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.spacer",
	className: cn("flex-1", className),
	...mergeUiProps(props, "settings.spacer")
});
var DefaultTag = ({ className, isCurrent, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.default-tag",
	className: cn("rounded px-1 py-0.5 text-xs", isCurrent ? "text-primary" : "text-foreground-tertiary", className),
	...mergeUiProps(props, "settings.default-tag")
});
var SplitComponent = QuickAssistantSettings;
export { SplitComponent as component };
