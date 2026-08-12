import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { r as formatErrorMessage } from "./error-3V5V4Mev.js";
import { c as ThemeMode } from "./PreferenceService-uLlqCRc6.js";
import { n as isLinux, r as isMac } from "./platform-YWZQ2_mC.js";
import "./dayjs.min-CNu3tPBh.js";
import { a as defaultLanguage, r as resolver_default } from "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference, t as useMultiplePreferences } from "./usePreference-yBX61WcV.js";
import { a as mergeUiProps, r as cn$1 } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-BPh2DI-f.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { t as Input } from "./input-dvr72LyA.js";
import { a as RowFlex, i as Flex } from "./flex-BmIgOnUt.js";
import "./esm-Dju_3aAK.js";
import "./dist-CoUlMpOM.js";
import "./diff-HM2C_nqz.js";
import { t as code_editor_default } from "./code-editor-Dj3s7HAW.js";
import { t as editable_number_default } from "./editable-number-Dhr-NqcZ.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { t as Combobox } from "./combobox-D7zDQ7j5.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { t as Slider } from "./slider-_Xxahv5d.js";
import { n as useCodeStyle } from "./useCodeStyle-ZK5esKOR.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./model-CfoN7z8F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Info } from "./info-rKrg7-xW.js";
import { t as Minus } from "./minus-B8LlKIu6.js";
import { t as Monitor } from "./monitor-SIMKDlBV.js";
import { t as Moon } from "./moon-CY6ynLbj.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as Sun } from "./sun-5ak9C8Z3.js";
import { t as popup } from "./popup-C0FVl5N5.js";
import { n as useUserTheme, t as hasV1CustomCssMarker } from "./customCssMigration-kFDGIria.js";
import { n as isAppLanguage, t as appLanguageOptions } from "./languages-Fb3G7Psv.js";
import { c as SettingRowTitle, n as SettingDescription, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-aatUlttR.js";
import { t as ResetIcon_default } from "./ResetIcon-BOagnZ9e.js";
import { t as useTimer } from "./useTimer-Brbjkb3R.js";
import { n as getSendMessageShortcutLabel } from "./input-B46pep8A.js";
import { t as Selector_default } from "./Selector-CereZliw.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const SettingRowTitleSmall = ({ className, children, hint, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
	className: cn$1("min-w-0 gap-1.5 text-foreground text-sm leading-4.5", className),
	...rest,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "min-w-0 truncate",
		children
	}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: hint,
		placement: "top",
		className: "w-fit max-w-sm px-2.5 py-1.5 text-xs leading-relaxed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
			size: 12,
			className: "shrink-0 cursor-help text-muted-foreground"
		})
	})]
});
const SettingSwitch = ({ label, hint, size, "aria-label": ariaLabel, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, {
	hint,
	children: label
}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
	size,
	"aria-label": ariaLabel ?? (typeof label === "string" ? label : void 0),
	...props
})] });
const SettingRow$1 = ({ className, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
	className: cn$1("min-h-6 gap-3", className),
	...rest
});
const SettingGroup$1 = ({ className, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.setting-group",
	className: cn$1("flex w-full flex-col gap-0", className),
	...mergeUiProps(rest, "chat.setting-group")
});
var spellCheckLanguageOptions = [
	{
		value: "en-US",
		label: "English (US)",
		flag: "🇺🇸"
	},
	{
		value: "es",
		label: "Español",
		flag: "🇪🇸"
	},
	{
		value: "fr",
		label: "Français",
		flag: "🇫🇷"
	},
	{
		value: "de",
		label: "Deutsch",
		flag: "🇩🇪"
	},
	{
		value: "it",
		label: "Italiano",
		flag: "🇮🇹"
	},
	{
		value: "pt",
		label: "Português",
		flag: "🇵🇹"
	},
	{
		value: "ru",
		label: "Русский",
		flag: "🇷🇺"
	},
	{
		value: "nl",
		label: "Nederlands",
		flag: "🇳🇱"
	},
	{
		value: "pl",
		label: "Polski",
		flag: "🇵🇱"
	},
	{
		value: "sk",
		label: "Slovenčina",
		flag: "🇸🇰"
	},
	{
		value: "el",
		label: "Ελληνικά",
		flag: "🇬🇷"
	}
];
var ChatPreferenceSections = ({ sectionClassName }) => {
	const [messageStyle, setMessageStyle] = usePreference("chat.message.style");
	const [fontSize, setFontSize] = usePreference("chat.message.font_size");
	const [sendMessageShortcut, setSendMessageShortcut] = usePreference("chat.input.send_message_shortcut");
	const [enableSpellCheck, setEnableSpellCheck] = usePreference("app.spell_check.enabled");
	const [spellCheckLanguages, setSpellCheckLanguages] = usePreference("app.spell_check.languages");
	const [messageFont, setMessageFont] = usePreference("chat.message.font");
	const [confirmDeleteMessage, setConfirmDeleteMessage] = usePreference("chat.message.confirm_delete");
	const [messageNavigation, setMessageNavigation] = usePreference("chat.message.navigation_mode");
	const [narrowMode, setNarrowMode] = usePreference("chat.narrow_mode");
	const [thoughtAutoCollapse, setThoughtAutoCollapse] = usePreference("chat.message.thought.auto_collapse");
	const [multiModelMessageStyle, setMultiModelMessageStyle] = usePreference("chat.message.multi_model.style");
	const [mathEnableSingleDollar, setMathEnableSingleDollar] = usePreference("chat.message.math.single_dollar");
	const [showInputEstimatedTokens, setShowInputEstimatedTokens] = usePreference("chat.input.show_estimated_tokens");
	const [renderInputMessageAsMarkdown, setRenderInputMessageAsMarkdown] = usePreference("chat.message.render_as_markdown");
	const [showMessageOutline, setShowMessageOutline] = usePreference("chat.message.show_outline");
	const [codeShowLineNumbers, setCodeShowLineNumbers] = usePreference("chat.code.show_line_numbers");
	const [codeCollapsible, setCodeCollapsible] = usePreference("chat.code.collapsible");
	const [codeWrappable, setCodeWrappable] = usePreference("chat.code.wrappable");
	const [codeEditor, setCodeEditor] = useMultiplePreferences({
		enabled: "chat.code.editor.enabled",
		themeLight: "chat.code.editor.theme_light",
		themeDark: "chat.code.editor.theme_dark",
		highlightActiveLine: "chat.code.editor.highlight_active_line",
		foldGutter: "chat.code.editor.fold_gutter",
		autocompletion: "chat.code.editor.autocompletion",
		keymap: "chat.code.editor.keymap"
	});
	const [codeViewer, setCodeViewer] = useMultiplePreferences({
		themeLight: "chat.code.viewer.theme_light",
		themeDark: "chat.code.viewer.theme_dark"
	});
	const [codeFancyBlock, setCodeFancyBlock] = usePreference("chat.code.fancy_block");
	const wideMode = !narrowMode;
	const setWideMode = (checked) => setNarrowMode(!checked);
	const { theme } = useTheme();
	const { themeNames } = useCodeStyle();
	const [fontSizeValue, setFontSizeValue] = (0, import_react.useState)(fontSize);
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {
		setFontSizeValue(fontSize);
	}, [fontSize]);
	const handleSpellCheckChange = (checked) => {
		setEnableSpellCheck(checked);
		ipcApi.request("app.set_spell_check_enabled", checked);
	};
	const messageStyleItems = (0, import_react.useMemo)(() => [{
		value: "plain",
		label: t("message.message.style.plain")
	}, {
		value: "bubble",
		label: t("message.message.style.bubble")
	}], [t]);
	const messageNavigationItems = (0, import_react.useMemo)(() => [
		{
			value: "none",
			label: t("settings.messages.navigation.none")
		},
		{
			value: "buttons",
			label: t("settings.messages.navigation.buttons")
		},
		{
			value: "anchor",
			label: t("settings.messages.navigation.anchor")
		}
	], [t]);
	const codeStyleItems = (0, import_react.useMemo)(() => themeNames.map((themeName) => ({
		value: themeName,
		label: themeName
	})), [themeNames]);
	const sendMessageShortcutItems = (0, import_react.useMemo)(() => [
		{
			value: "Enter",
			label: getSendMessageShortcutLabel("Enter")
		},
		{
			value: "Ctrl+Enter",
			label: getSendMessageShortcutLabel("Ctrl+Enter")
		},
		{
			value: "Alt+Enter",
			label: getSendMessageShortcutLabel("Alt+Enter")
		},
		{
			value: "Command+Enter",
			label: getSendMessageShortcutLabel("Command+Enter")
		},
		{
			value: "Shift+Enter",
			label: getSendMessageShortcutLabel("Shift+Enter")
		}
	], []);
	const codeStyle = (0, import_react.useMemo)(() => {
		return codeEditor.enabled ? theme === ThemeMode.light ? codeEditor.themeLight : codeEditor.themeDark : theme === ThemeMode.light ? codeViewer.themeLight : codeViewer.themeDark;
	}, [
		codeEditor.enabled,
		codeEditor.themeLight,
		codeEditor.themeDark,
		theme,
		codeViewer.themeLight,
		codeViewer.themeDark
	]);
	const onCodeStyleChange = (0, import_react.useCallback)((value) => {
		const field = theme === ThemeMode.light ? "themeLight" : "themeDark";
		(codeEditor.enabled ? setCodeEditor : setCodeViewer)({ [field]: value });
	}, [
		theme,
		codeEditor.enabled,
		setCodeEditor,
		setCodeViewer
	]);
	const renderSection = (title, children) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		theme,
		className: sectionClassName,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup$1, { children })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		renderSection(t("settings.messages.input.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("settings.messages.input.send_shortcuts") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: sendMessageShortcut,
				onValueChange: setSendMessageShortcut,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					size: "sm",
					className: "w-[220px] text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					className: "text-sm",
					children: sendMessageShortcutItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						className: "text-sm",
						value: item.value,
						children: item.label
					}, item.value))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
				className: "mr-4 flex-1 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("settings.general.spell_check.label") }), enableSpellCheck && !isMac && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector_default, {
					size: 14,
					multiple: true,
					value: spellCheckLanguages,
					placeholder: t("settings.general.spell_check.languages"),
					onChange: (selectedLanguages) => void setSpellCheckLanguages(selectedLanguages),
					options: spellCheckLanguageOptions.map((lang) => ({
						value: lang.value,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
							className: "items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-ui": "chat.preference-sections.img",
								role: "img",
								"aria-label": lang.flag,
								children: lang.flag
							}), lang.label]
						})
					}))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: enableSpellCheck,
				onCheckedChange: handleSpellCheckChange
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: showInputEstimatedTokens,
				onCheckedChange: setShowInputEstimatedTokens,
				label: t("settings.messages.input.show_estimated_tokens")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: renderInputMessageAsMarkdown,
				onCheckedChange: setRenderInputMessageAsMarkdown,
				label: t("settings.messages.markdown_rendering_input_message")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: confirmDeleteMessage,
				onCheckedChange: setConfirmDeleteMessage,
				label: t("settings.messages.input.confirm_delete_message")
			}) })
		] })),
		renderSection(t("settings.messages.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: wideMode,
				onCheckedChange: setWideMode,
				label: t("settings.messages.wide_mode")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: messageFont === "serif",
				onCheckedChange: (checked) => setMessageFont(checked ? "serif" : "system"),
				label: t("settings.messages.use_serif_font")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: thoughtAutoCollapse,
				onCheckedChange: setThoughtAutoCollapse,
				label: t("chat.settings.thought_auto_collapse.label"),
				hint: t("chat.settings.thought_auto_collapse.tip")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: showMessageOutline,
				onCheckedChange: (checked) => setShowMessageOutline(checked),
				label: t("settings.messages.show_message_outline")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("message.message.style.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: messageStyle,
				onValueChange: setMessageStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					size: "sm",
					className: "w-[220px] text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					className: "text-sm",
					children: messageStyleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						className: "text-sm",
						value: item.value,
						children: item.label
					}, item.value))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("message.message.multi_model_style.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: multiModelMessageStyle,
				onValueChange: setMultiModelMessageStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					size: "sm",
					className: "w-[220px] text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							className: "text-sm",
							value: "fold",
							children: t("message.message.multi_model_style.fold.label")
						}, "fold"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							className: "text-sm",
							value: "vertical",
							children: t("message.message.multi_model_style.vertical")
						}, "vertical"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							className: "text-sm",
							value: "horizontal",
							children: t("message.message.multi_model_style.horizontal")
						}, "horizontal"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							className: "text-sm",
							value: "grid",
							children: t("message.message.multi_model_style.grid")
						}, "grid")
					]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("settings.messages.navigation.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: messageNavigation,
				onValueChange: setMessageNavigation,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					size: "sm",
					className: "w-[220px] text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					className: "text-sm",
					children: messageNavigationItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						className: "text-sm",
						value: item.value,
						children: item.label
					}, item.value))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("settings.font_size.title") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "chat.preference-sections",
				className: "w-full pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: [fontSizeValue],
					onValueChange: (values) => setFontSizeValue(values[0]),
					onValueCommit: (values) => setFontSize(values[0]),
					min: 12,
					max: 22,
					step: 1,
					marks: [
						{
							value: 12,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: "A"
							})
						},
						{
							value: 14,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: t("common.default")
							})
						},
						{
							value: 22,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: "A"
							})
						}
					]
				})
			})
		] })),
		renderSection(t("settings.math.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
			checked: mathEnableSingleDollar,
			onCheckedChange: setMathEnableSingleDollar,
			label: t("settings.math.single_dollar.label"),
			hint: t("settings.math.single_dollar.tip")
		}) }) })),
		renderSection(t("chat.settings.code.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitleSmall, { children: t("message.message.code_style") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: codeStyle,
				onValueChange: onCodeStyleChange,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					size: "sm",
					className: "w-[220px] text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					className: "text-sm",
					children: codeStyleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						className: "text-sm",
						value: item.value,
						children: item.label
					}, item.value))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: codeFancyBlock,
				onCheckedChange: setCodeFancyBlock,
				label: t("chat.settings.code_fancy_block.label"),
				hint: t("chat.settings.code_fancy_block.tip")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: codeEditor.enabled,
				onCheckedChange: (checked) => setCodeEditor({ enabled: checked }),
				label: t("chat.settings.code_editor.title")
			}) }),
			codeEditor.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, {
					className: "pl-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
						checked: codeEditor.highlightActiveLine,
						onCheckedChange: (checked) => setCodeEditor({ highlightActiveLine: checked }),
						label: t("chat.settings.code_editor.highlight_active_line")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, {
					className: "pl-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
						checked: codeEditor.foldGutter,
						onCheckedChange: (checked) => setCodeEditor({ foldGutter: checked }),
						label: t("chat.settings.code_editor.fold_gutter")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, {
					className: "pl-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
						checked: codeEditor.autocompletion,
						onCheckedChange: (checked) => setCodeEditor({ autocompletion: checked }),
						label: t("chat.settings.code_editor.autocompletion")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, {
					className: "pl-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
						checked: codeEditor.keymap,
						onCheckedChange: (checked) => setCodeEditor({ keymap: checked }),
						label: t("chat.settings.code_editor.keymap")
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: codeShowLineNumbers,
				onCheckedChange: setCodeShowLineNumbers,
				label: t("chat.settings.show_line_numbers")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: codeCollapsible,
				onCheckedChange: setCodeCollapsible,
				label: t("chat.settings.code_collapsible")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSwitch, {
				checked: codeWrappable,
				onCheckedChange: setCodeWrappable,
				label: t("chat.settings.code_wrappable")
			}) })
		] }))
	] });
};
var ChatPreferenceSections_default = ChatPreferenceSections;
var HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
var SHORT_HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{3}$/;
const normalizeHexColor = (value) => {
	let normalized = value.trim();
	if (!normalized) return null;
	if (!normalized.startsWith("#")) normalized = `#${normalized}`;
	if (SHORT_HEX_COLOR_PATTERN.test(normalized)) normalized = `#${normalized.slice(1).split("").map((char) => `${char}${char}`).join("")}`;
	if (!HEX_COLOR_PATTERN.test(normalized)) return null;
	return normalized.toUpperCase();
};
var ThemeColorPicker = ({ value, presets, onChange, ariaLabel, className }) => {
	const normalizedValue = normalizeHexColor(value) ?? "#000000";
	const [draftValue, setDraftValue] = (0, import_react.useState)(normalizedValue);
	(0, import_react.useEffect)(() => {
		setDraftValue(normalizedValue);
	}, [normalizedValue]);
	const commitColor = (nextValue) => {
		setDraftValue(nextValue);
		const nextColor = normalizeHexColor(nextValue);
		if (nextColor) onChange(nextColor);
	};
	const handleInputBlur = () => {
		const nextColor = normalizeHexColor(draftValue);
		if (!nextColor) {
			setDraftValue(normalizedValue);
			return;
		}
		setDraftValue(nextColor);
		if (nextColor !== normalizedValue) onChange(nextColor);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
		className: cn("min-w-0 max-w-full flex-wrap items-center gap-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
				className: "min-w-0 max-w-full flex-wrap gap-3",
				children: presets.map((color) => {
					const normalizedPreset = normalizeHexColor(color) ?? color;
					const selected = normalizedPreset === normalizedValue;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": normalizedPreset,
						"aria-pressed": selected,
						className: cn("relative flex h-6 w-6 items-center justify-center rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:[box-shadow:inset_0_0_0_2px_var(--ring)]"),
						onClick: () => commitColor(normalizedPreset),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("h-5 w-5 rounded-full border-2", selected ? "border-border" : "border-transparent"),
							style: { backgroundColor: normalizedPreset }
						})
					}, color);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-background shadow-xs outline-none has-[:focus-visible]:border-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "color",
					value: normalizedValue,
					"aria-label": ariaLabel,
					className: "absolute inset-0 h-full w-full cursor-pointer opacity-0",
					onChange: (event) => commitColor(event.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-5 w-5 rounded-sm border border-border",
					style: { backgroundColor: normalizedValue }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: draftValue,
				onChange: (event) => setDraftValue(event.target.value),
				onBlur: handleInputBlur,
				className: "h-8 w-24 font-mono text-xs uppercase",
				spellCheck: false
			})
		]
	});
};
var ThemeColorPicker_default = ThemeColorPicker;
var DEFAULT_COLOR_PRIMARY = "#00b96b";
var DEFAULT_ZOOM_FACTOR = 1;
var THEME_COLOR_PRESETS = [
	DEFAULT_COLOR_PRIMARY,
	"#EF4444",
	"#F59E0B",
	"#3B82F6",
	"#8B5CF6"
];
var defaultFontPreviewFamily = "Ubuntu, -apple-system, system-ui, Arial, sans-serif";
var fontComboboxClassName = "h-8 rounded-md border-border bg-transparent pl-3 pr-8 text-sm dark:bg-input/30";
var logger = loggerService.withContext("AppearanceSettings");
async function confirmMenuPresentationModeChange({ currentMode, mode, setMenuPresentationMode, setTimeoutTimer, t }) {
	if (mode === currentMode) return;
	if (!await popup.confirm({
		title: t("settings.general.common.menu.presentation_mode.restart.title"),
		content: t("settings.general.common.menu.presentation_mode.restart.content"),
		okText: t("common.confirm"),
		cancelText: t("common.cancel"),
		centered: true
	})) return;
	try {
		await setMenuPresentationMode(mode);
	} catch (error) {
		toast.error(formatErrorMessage(error));
		throw error;
	}
	setTimeoutTimer("handleMenuPresentationModeChange", () => {
		window.api.application.relaunch();
	}, 500);
}
var AppearanceSettings = () => {
	const { t } = useTranslation();
	const { theme, settedTheme, setTheme } = useTheme();
	const { setTimeoutTimer } = useTimer();
	const { userTheme, setUserTheme } = useUserTheme();
	const { activeCmTheme } = useCodeStyle();
	const [language, setLanguage] = usePreference("app.language");
	const [windowStyle, setWindowStyle] = usePreference("ui.window_style");
	const [menuPresentationMode, setMenuPresentationMode] = usePreference("menu.presentation_mode");
	const [customCss, setCustomCss] = usePreference("ui.custom_css");
	const [fontSize] = usePreference("chat.message.font_size");
	const [useSystemTitleBar, setUseSystemTitleBar] = usePreference("app.use_system_title_bar");
	const [codeExecution, setCodeExecution] = useMultiplePreferences({
		enabled: "chat.code.execution.enabled",
		timeoutMinutes: "chat.code.execution.timeout_minutes"
	});
	const [codeImageTools, setCodeImageTools] = usePreference("chat.code.image_tools");
	const [currentZoom, setCurrentZoom] = (0, import_react.useState)(1);
	const [fontList, setFontList] = (0, import_react.useState)([]);
	const isDefaultZoom = Math.abs(currentZoom - DEFAULT_ZOOM_FACTOR) < .001;
	const resolvedLanguage = resolver_default.resolvedLanguage ?? resolver_default.language;
	const displayLanguage = isAppLanguage(language) ? language : isAppLanguage(resolvedLanguage) ? resolvedLanguage : defaultLanguage;
	const themeOptions = [
		{
			value: ThemeMode.light,
			label: t("settings.theme.light"),
			icon: Sun
		},
		{
			value: ThemeMode.dark,
			label: t("settings.theme.dark"),
			icon: Moon
		},
		{
			value: ThemeMode.system,
			label: t("settings.theme.system"),
			icon: Monitor
		}
	];
	(0, import_react.useEffect)(() => {
		const loadSystemFonts = async () => {
			try {
				setFontList(await ipcApi.request("system.get_fonts"));
			} catch (error) {
				logger.error("Failed to get system fonts", error);
			}
		};
		const updateCurrentZoom = async () => {
			try {
				setCurrentZoom(await ipcApi.request("app.adjust_zoom", { delta: 0 }));
			} catch (error) {
				logger.error("Failed to get current zoom factor", error);
			}
		};
		loadSystemFonts();
		updateCurrentZoom();
		const handleResize = () => {
			updateCurrentZoom();
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const onSelectLanguage = (value) => {
		if (!isAppLanguage(value)) return;
		resolver_default.changeLanguage(value);
		setLanguage(value);
	};
	const handleWindowStyleChange = (0, import_react.useCallback)((checked) => {
		setWindowStyle(checked ? "transparent" : "opaque");
	}, [setWindowStyle]);
	const menuPresentationModeOptions = (0, import_react.useMemo)(() => [{
		value: "cherry",
		label: t("settings.general.common.menu.presentation_mode.cherry")
	}, {
		value: "native",
		label: t("settings.general.common.menu.presentation_mode.native")
	}], [t]);
	const handleMenuPresentationModeChange = (0, import_react.useCallback)((mode) => {
		confirmMenuPresentationModeChange({
			currentMode: menuPresentationMode,
			mode,
			setMenuPresentationMode,
			setTimeoutTimer,
			t
		});
	}, [
		menuPresentationMode,
		setMenuPresentationMode,
		setTimeoutTimer,
		t
	]);
	const handleUseSystemTitleBarChange = async (checked) => {
		if (!await popup.confirm({
			title: t("settings.use_system_title_bar.confirm.title"),
			content: t("settings.use_system_title_bar.confirm.content"),
			okText: t("common.confirm"),
			cancelText: t("common.cancel"),
			centered: true
		})) return;
		try {
			await setUseSystemTitleBar(checked);
		} catch (error) {
			toast.error(formatErrorMessage(error));
			throw error;
		}
		setTimeoutTimer("handleUseSystemTitleBarChange", () => {
			window.api.application.relaunch();
		}, 500);
	};
	const handleZoomFactor = async (delta, reset = false) => {
		setCurrentZoom(await ipcApi.request("app.adjust_zoom", {
			delta,
			reset
		}));
	};
	const handleColorPrimaryChange = (0, import_react.useCallback)((colorHex) => {
		setUserTheme({
			...userTheme,
			colorPrimary: colorHex
		});
	}, [setUserTheme, userTheme]);
	const handleUserFontChange = (0, import_react.useCallback)((value) => {
		setUserTheme({
			...userTheme,
			userFontFamily: value
		});
	}, [setUserTheme, userTheme]);
	const handleUserCodeFontChange = (0, import_react.useCallback)((value) => {
		setUserTheme({
			...userTheme,
			userCodeFontFamily: value
		});
	}, [setUserTheme, userTheme]);
	const fontOptions = (0, import_react.useMemo)(() => [{
		label: t("settings.display.font.default"),
		value: ""
	}, ...fontList.map((font) => ({
		label: font,
		value: font
	}))], [fontList, t]);
	const renderFontOption = (0, import_react.useCallback)((option) => {
		const fontFamily = option.value || defaultFontPreviewFamily;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			title: option.label,
			placement: "left",
			delay: 500,
			fullWidthTrigger: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full min-w-0 truncate",
				style: { fontFamily },
				children: option.label
			})
		});
	}, []);
	const handleFontComboboxChange = (0, import_react.useCallback)((value, onChange) => {
		onChange(Array.isArray(value) ? "" : value);
	}, []);
	const handleUserFontComboboxChange = (0, import_react.useCallback)((value) => {
		handleFontComboboxChange(value, handleUserFontChange);
	}, [handleFontComboboxChange, handleUserFontChange]);
	const handleUserCodeFontComboboxChange = (0, import_react.useCallback)((value) => {
		handleFontComboboxChange(value, handleUserCodeFontChange);
	}, [handleFontComboboxChange, handleUserCodeFontChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		innerClassName: "[&>*+*]:mt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.theme.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemePreviewSelector, {
						value: settedTheme,
						options: themeOptions,
						onChange: setTheme
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.theme.color_primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WideControlRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeColorPicker_default, {
						value: userTheme.colorPrimary,
						presets: THEME_COLOR_PRESETS,
						onChange: handleColorPrimaryChange,
						ariaLabel: t("settings.theme.color_primary"),
						className: "w-full justify-end"
					}) })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.general.common.sections.display_language") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("common.language") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectorRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: displayLanguage,
						onValueChange: onSelectLanguage,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							size: "sm",
							className: "w-full text-sm",
							"aria-label": appLanguageOptions.find((lang) => lang.value === displayLanguage)?.label,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							className: "text-sm",
							children: appLanguageOptions.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								className: "text-sm",
								value: lang.value,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
									className: "items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-ui": "settings.appearance-settings.img",
										role: "img",
										"aria-label": lang.flag,
										children: lang.flag
									}), lang.label]
								})
							}, lang.value))
						})]
					}) })] }),
					isLinux && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.use_system_title_bar.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: useSystemTitleBar,
						onCheckedChange: handleUseSystemTitleBarChange
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.zoom.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ZoomButtonGroup, { children: [
						!isDefaultZoom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("preview.reset"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => handleZoomFactor(0, true),
								variant: "ghost",
								size: "icon",
								"aria-label": t("preview.reset"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetIcon_default, { size: "14" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("preview.zoom_out"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => handleZoomFactor(-.1),
								variant: "ghost",
								size: "icon",
								"aria-label": t("preview.zoom_out"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: "14" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ZoomValue, { children: [Math.round(currentZoom * 100), "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("preview.zoom_in"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => handleZoomFactor(.1),
								variant: "ghost",
								size: "icon",
								"aria-label": t("preview.zoom_in"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: "14" })
							})
						})
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.general.common.menu.presentation_mode.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
						value: menuPresentationMode,
						onValueChange: handleMenuPresentationModeChange,
						options: menuPresentationModeOptions,
						size: "sm"
					})] }),
					isMac && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.theme.window.style.transparent") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: windowStyle === "transparent",
						onCheckedChange: handleWindowStyleChange
					})] })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.display.font.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.display.font.global") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectorRow, {
						className: "gap-2",
						children: [userTheme.userFontFamily && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleUserFontChange(""),
							variant: "ghost",
							size: "icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetIcon_default, { size: "14" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
								placeholder: t("settings.display.font.select"),
								emptyText: t("common.no_results"),
								options: fontOptions,
								value: userTheme.userFontFamily || "",
								onChange: handleUserFontComboboxChange,
								renderOption: renderFontOption,
								searchPlacement: "trigger",
								className: fontComboboxClassName,
								triggerStyle: { fontFamily: userTheme.userFontFamily || defaultFontPreviewFamily },
								popoverClassName: "max-h-[320px] w-(--radix-popover-trigger-width) overflow-y-auto"
							})
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.display.font.code") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectorRow, {
						className: "gap-2",
						children: [userTheme.userCodeFontFamily && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleUserCodeFontChange(""),
							variant: "ghost",
							size: "icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetIcon_default, { size: "14" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
								placeholder: t("settings.display.font.select"),
								emptyText: t("common.no_results"),
								options: fontOptions,
								value: userTheme.userCodeFontFamily || "",
								onChange: handleUserCodeFontComboboxChange,
								renderOption: renderFontOption,
								searchPlacement: "trigger",
								className: fontComboboxClassName,
								triggerStyle: { fontFamily: userTheme.userCodeFontFamily || defaultFontPreviewFamily },
								popoverClassName: "max-h-[320px] w-(--radix-popover-trigger-width) overflow-y-auto"
							})
						})]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPreferenceSections_default, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("chat.settings.code_execution.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
						className: "items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("chat.settings.code_execution.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("chat.settings.code_execution.tip") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: codeExecution.enabled,
						onCheckedChange: (checked) => setCodeExecution({ enabled: checked })
					})] }),
					codeExecution.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
						className: "items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("chat.settings.code_execution.timeout_minutes.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("chat.settings.code_execution.timeout_minutes.tip") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
						size: "small",
						className: "w-20 text-sm",
						min: 1,
						max: 60,
						step: 1,
						value: codeExecution.timeoutMinutes,
						onChange: (value) => setCodeExecution({ timeoutMinutes: value ?? 1 })
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
						className: "items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("chat.settings.code_image_tools.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("chat.settings.code_image_tools.tip") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: codeImageTools,
						onCheckedChange: setCodeImageTools
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.display.custom.css.label") }),
					hasV1CustomCssMarker(customCss) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("settings.display.custom.css.migration_notice") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-hidden rounded-lg border border-border-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(code_editor_default, {
							theme: activeCmTheme,
							fontSize: fontSize - 1,
							value: customCss,
							language: "css",
							placeholder: t("settings.display.custom.css.placeholder"),
							onChange: (value) => setCustomCss(value),
							height: "56vh",
							expanded: false,
							wrapped: true,
							options: {
								autocompletion: true,
								lineNumbers: true,
								foldGutter: true,
								keymap: true
							}
						})
					})
				]
			})
		]
	});
};
var ThemePreview = ({ mode }) => {
	if (mode === ThemeMode.system) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.theme-preview",
		className: "flex aspect-video w-full overflow-hidden rounded-md border border-neutral-400",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-1/2 bg-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-1/3 border-neutral-200 border-r bg-neutral-100 p-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-1.5 rounded-full bg-neutral-400" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-3/4 rounded-full bg-neutral-300" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1.5 h-1 w-full rounded-full bg-neutral-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-1 w-2/3 rounded-full bg-neutral-200" })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-1/2 bg-neutral-950",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-1/3 border-neutral-700 border-r bg-neutral-900 p-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-1.5 rounded-full bg-neutral-500" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-3/4 rounded-full bg-neutral-600" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1.5 h-1 w-full rounded-full bg-neutral-800" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-1 w-2/3 rounded-full bg-neutral-800" })
				]
			})]
		})]
	});
	const isDarkPreview = mode === ThemeMode.dark;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.theme-preview",
		className: cn("flex aspect-video w-full overflow-hidden rounded-md border", isDarkPreview ? "border-neutral-700 bg-neutral-950" : "border-neutral-300 bg-white"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("w-1/4 border-r p-1.5", isDarkPreview ? "border-neutral-700 bg-neutral-900" : "border-neutral-200 bg-neutral-100"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("size-1.5 rounded-full", isDarkPreview ? "bg-neutral-500" : "bg-neutral-400") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mt-1.5 h-1 w-full rounded-full", isDarkPreview ? "bg-neutral-700" : "bg-neutral-300") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mt-1 h-1 w-2/3 rounded-full", isDarkPreview ? "bg-neutral-700" : "bg-neutral-300") })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 w-1/2 rounded-full", isDarkPreview ? "bg-neutral-600" : "bg-neutral-300") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mt-2 h-1 w-full rounded-full", isDarkPreview ? "bg-neutral-800" : "bg-neutral-200") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mt-1 h-1 w-3/4 rounded-full", isDarkPreview ? "bg-neutral-800" : "bg-neutral-200") })
			]
		})]
	});
};
var ThemePreviewSelector = ({ value, options, onChange }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.theme-preview-selector",
	className: "grid w-full grid-cols-3 gap-2",
	children: options.map((option) => {
		const Icon = option.icon;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-label": option.label,
			"aria-pressed": value === option.value,
			onClick: () => onChange(option.value),
			className: "group min-w-0 cursor-pointer rounded-lg pb-1.5 text-foreground outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("rounded-lg border bg-background-subtle p-1.5 transition-colors", "group-focus-visible:border-ring group-focus-visible:bg-accent", value === option.value ? "border-primary ring-2 ring-primary/20" : "border-border group-hover:border-border-strong group-hover:bg-accent"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemePreview, { mode: option.value })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-2 flex items-center justify-center gap-1.5 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: option.label
				})]
			})]
		}, option.value);
	})
});
var ZoomButtonGroup = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.zoom-button-group",
	className: cn("flex w-full min-w-0 max-w-52.5 items-center justify-end", className),
	...mergeUiProps(props, "settings.zoom-button-group")
});
var SelectorRow = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.selector-row",
	className: cn("flex w-full min-w-0 max-w-55 items-center justify-end", className),
	...mergeUiProps(props, "settings.selector-row")
});
var WideControlRow = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.wide-control-row",
	className: cn("flex w-full min-w-0 max-w-95 items-center justify-end", className),
	...mergeUiProps(props, "settings.wide-control-row")
});
var ZoomValue = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.zoom-value",
	className: cn("mx-1.25 w-10 text-center", className),
	...mergeUiProps(props, "settings.zoom-value")
});
var SplitComponent = AppearanceSettings;
export { SplitComponent as component };
