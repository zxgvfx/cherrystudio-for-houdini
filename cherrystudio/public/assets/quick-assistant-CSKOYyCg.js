import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { n as UiDataSlot, r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as Divider } from "./divider-2gEjzcxJ.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import "./es2015-CF8XujIC.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { a as RowFlex } from "./flex-Cbul8ND0.js";
import "./with-selector-YZwnb76j.js";
import { t as InfoTooltip } from "./info-tooltip-BdxcTZZj.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-Do4GrvP3.js";
import { t as SegmentedControl } from "./segmented-control-CAdhwi7C.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { n as cn } from "./style-C-RkFX_x.js";
import "./CacheService-BxZWLQeF.js";
import "./useCache-DNNSH80c.js";
import "./file-BaEpIJyZ.js";
import "./model-DbPSoCMM.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as Info } from "./info-C47BhUEU.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import "./naming-C7JIUN29.js";
import "./provider-B43PumwQ.js";
import "./uiParts-D7jaMraw.js";
import "./partsHelpers-BRL-MkUw.js";
import "./useTopicStreamStatus-8sPVIB3X.js";
import { t as useDefaultModel } from "./useModel-DWj6Qb5f.js";
import "./useProvider-DFQPidMA.js";
import "./model-BGDvQJb9.js";
import { i as useAssistants } from "./useAssistant-qAhsBp_v.js";
import "./useTemporaryTopic-DGg0rPC3.js";
import { t as HomeWindow_default } from "./HomeWindow-CcBTcAk7.js";
import "./react-hotkeys-hook.esm-Bev6lfWe.js";
import { t as ModelAvatar_default } from "./ModelAvatar-BilEtvkp.js";
import "./useTimer-BCHMb2QP.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-ctf-2wxz.js";
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
