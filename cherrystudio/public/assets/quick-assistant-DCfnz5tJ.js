import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { a as mergeUiProps, i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-n5iWPIgn.js";
import { a as RowFlex } from "./flex-BmIgOnUt.js";
import "./with-selector-BMhODuKS.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-BvL_RdMY.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./file-KsLXrn8b.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as Info } from "./info-rKrg7-xW.js";
import "./mcp-UjkdK7II.js";
import "./label-CBJ9J2cR.js";
import "./provider-AVUknhIB.js";
import "./model-3irbiX6r.js";
import "./uiParts-CtZmiNbl.js";
import { t as useDefaultModel } from "./useModel-wPmUe3o8.js";
import "./useProvider-BIst-GY7.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-aatUlttR.js";
import "./model-Z1svQByC.js";
import "./useTimer-Brbjkb3R.js";
import "./transport-CTTVYBal.js";
import "./partsHelpers-DL2R_tcG.js";
import "./useTopicStreamStatus-C4wq2WGe.js";
import { i as useAssistants } from "./useAssistant-D7pB4IBa.js";
import "./useTemporaryTopic-BIojapW3.js";
import { t as HomeWindow_default } from "./HomeWindow-BRr-y0q3.js";
import "./react-hotkeys-hook.esm-wkMq5OC3.js";
import { t as ModelAvatar_default } from "./ModelAvatar-BgaF2qGi.js";
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
