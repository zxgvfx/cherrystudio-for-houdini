import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { T as TRANSLATE_PROMPT, m as parsePersistedLangCode, s as PersistedLangCodeSchema } from "./PreferenceService-Ba0ofBX2.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
import { a as mergeUiProps, i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as HelpTooltip } from "./help-tooltip-35QqnCYx.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip, t as NormalTooltip } from "./tooltip-ZuayyV11.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import { t as ConfirmDialog } from "./confirm-dialog-B5-JWpzh.js";
import { t as Input } from "./input-dvr72LyA.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-n5iWPIgn.js";
import { n as PageSidePanelItem, r as PageSidePanelSection, t as PageSidePanel } from "./page-side-panel-CF7JqFV7.js";
import { i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./input-group-Cx4HnAhR.js";
import { o as FieldLabel, r as FieldDescription, t as Field } from "./field-v-3EhHEn.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { t as ArrowLeftRight } from "./arrow-left-right-C5BnKrEM.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as PenLine } from "./pen-line-ChJ7Ihtl.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as X } from "./x-DelRxIMm.js";
import { l as BUILTIN_TRANSLATE_LANGUAGES, o as useLanguages, p as UNKNOWN_LANG_CODE, s as useTranslateLanguages } from "./translate-BT2b0DN0.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var SIZE_CLASS = {
	xs: "h-4 w-4 rounded-md",
	sm: "h-6 w-6 rounded-md",
	md: "h-7 w-7 rounded-md"
};
var toneClass = (tone, active) => {
	if (tone === "destructive") return "text-muted-foreground hover:bg-accent hover:text-destructive";
	if (tone === "star") return active ? "text-amber-500 bg-amber-500/10" : "text-muted-foreground hover:bg-accent hover:text-amber-500";
	return active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground";
};
var IconButton = ({ size = "sm", tone = "ghost", active = false, className, type, ref, tooltip, tooltipSide = "top", ...rest }) => {
	const tooltipContent = tooltip ?? rest["aria-label"];
	const showTooltip = Boolean(tooltipContent) && !rest.disabled;
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-ui": "translate.icon-button",
		ref,
		type: type ?? "button",
		title: rest.title,
		className: cn("flex shrink-0 items-center justify-center transition-colors", "focus-visible:bg-accent focus-visible:text-foreground focus-visible:outline-none", "disabled:cursor-not-allowed disabled:opacity-60", SIZE_CLASS[size], toneClass(tone, active), className),
		...mergeUiProps(rest, "translate.icon-button")
	});
	if (!showTooltip) return button;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: tooltipContent,
		side: tooltipSide,
		sideOffset: 4,
		delayDuration: 300,
		children: button
	});
};
var IconButton_default = IconButton;
var import_react = /* @__PURE__ */ __toESM(require_react());
var UNKNOWN_EMOJI = "🏳️";
var LanguagePicker = ({ value, onChange, disabled, className }) => {
	const { languages, getLabel, getLanguage } = useLanguages();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [isScrolling, setIsScrolling] = (0, import_react.useState)(false);
	const timerRef = (0, import_react.useRef)(null);
	const options = (0, import_react.useMemo)(() => languages?.filter((lang) => String(lang.langCode) !== "unknown") ?? [], [languages]);
	const selected = getLanguage(value);
	const selectedLabel = selected ? getLabel(selected, false) ?? selected.value : getLabel(null, false) ?? value;
	const handleScroll = () => {
		setIsScrolling(true);
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setIsScrolling(false), 1e3);
	};
	(0, import_react.useEffect)(() => () => {
		if (timerRef.current) clearTimeout(timerRef.current);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled,
				"aria-haspopup": "listbox",
				"aria-expanded": open,
				className: cn("flex h-8 w-full items-center justify-between gap-2 rounded-md border border-border-subtle bg-transparent px-2.5 text-sm transition-colors hover:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-60", open && "border-primary/40 ring-1 ring-primary/15", className),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm leading-none",
						children: selected?.emoji ?? UNKNOWN_EMOJI
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-foreground",
						children: selectedLabel
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 11,
					className: cn("shrink-0 text-foreground-tertiary transition-transform", open && "rotate-180")
				})]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			sideOffset: 4,
			className: "w-(--radix-popover-trigger-width) rounded-md border border-border bg-popover p-1 shadow-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "translate.language-picker.listbox",
				role: "listbox",
				onScroll: handleScroll,
				style: { scrollbarColor: isScrolling ? "var(--scrollbar-thumb) transparent" : "transparent transparent" },
				className: "max-h-60 overflow-y-auto",
				children: options.map((lang) => {
					const isSelected = lang.langCode === value;
					const label = getLabel(lang, false) ?? lang.value;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"data-ui": "translate.language-picker.option",
						type: "button",
						role: "option",
						"aria-selected": isSelected,
						onClick: () => {
							onChange(lang.langCode);
							setOpen(false);
						},
						className: cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors", isSelected ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex w-5 shrink-0 justify-center text-sm leading-none",
								children: lang.emoji
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate",
								children: label
							}),
							isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 11,
								className: "shrink-0 text-primary"
							})
						]
					}, lang.langCode);
				})
			})
		})]
	});
};
var LanguagePicker_default = LanguagePicker;
var BUILTIN_LANG_CODES = new Set(BUILTIN_TRANSLATE_LANGUAGES.map((lang) => lang.langCode));
var EMOJI_OPTIONS = [
	"🌐",
	"🇺🇸",
	"🇬🇧",
	"🇨🇳",
	"🇯🇵",
	"🇰🇷",
	"🇫🇷",
	"🇩🇪",
	"🇪🇸",
	"🇵🇹",
	"🇮🇳",
	"🇧🇷"
];
var logger = loggerService.withContext("TranslateSettings");
var TranslateSettings = ({ visible, onClose }) => {
	const { t } = useTranslation();
	const [bidirectionalPair, setBidirectionalPair] = usePreference("feature.translate.page.bidirectional_pair");
	const [enableMarkdown, setEnableMarkdown] = usePreference("feature.translate.page.enable_markdown");
	const [autoCopy, setAutoCopy] = usePreference("feature.translate.page.auto_copy");
	const [autoDetectionMethod, setAutoDetectionMethod] = usePreference("feature.translate.auto_detection_method");
	const [isScrollSyncEnabled, setIsScrollSyncEnabled] = usePreference("feature.translate.page.scroll_sync");
	const [isBidirectional, setIsBidirectional] = usePreference("feature.translate.page.bidirectional_enabled");
	const safePersist = (0, import_react.useCallback)(async (persistPromise, actionName) => {
		try {
			await persistPromise;
		} catch (error) {
			logger.error(`Failed to persist ${actionName}`, error);
			toast.error(t("common.save_failed"));
		}
	}, [t]);
	const updateBidirectionalPair = (0, import_react.useCallback)((next) => {
		if (next[0] === next[1]) {
			toast.warning(t("translate.language.same"));
			return;
		}
		safePersist(setBidirectionalPair(next), "translate bidirectional pair");
	}, [
		safePersist,
		setBidirectionalPair,
		t
	]);
	const toggleItems = [
		{
			key: "markdown",
			label: t("translate.settings.preview"),
			value: enableMarkdown,
			onChange: (next) => void safePersist(setEnableMarkdown(next), "translate markdown preference")
		},
		{
			key: "autoCopy",
			label: t("translate.settings.autoCopy"),
			value: autoCopy,
			onChange: (next) => void safePersist(setAutoCopy(next), "translate auto copy preference")
		},
		{
			key: "scrollSync",
			label: t("translate.settings.scroll_sync"),
			value: isScrollSyncEnabled,
			onChange: (next) => void safePersist(setIsScrollSyncEnabled(next), "translate scroll sync preference")
		}
	];
	const detectionOptions = [
		{
			value: "auto",
			label: t("translate.detect.method.auto.label"),
			tip: t("translate.detect.method.auto.tip")
		},
		{
			value: "franc",
			label: t("translate.detect.method.algo.label"),
			tip: t("translate.detect.method.algo.tip")
		},
		{
			value: "llm",
			label: t("translate.detect.method.llm.label"),
			tip: t("translate.detect.method.llm.tip")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanel, {
		open: visible,
		onClose,
		title: t("translate.settings.title"),
		closeLabel: t("translate.close"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [
						toggleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelItem, {
							title: item.label,
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								size: "sm",
								checked: item.value,
								onCheckedChange: item.onChange
							})
						}, item.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelItem, {
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("translate.detect.method.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpTooltip, {
									content: t("translate.detect.method.tip"),
									iconProps: { className: "text-foreground-tertiary" }
								})]
							}),
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
								size: "sm",
								"aria-label": t("translate.detect.method.label"),
								value: autoDetectionMethod,
								onValueChange: (value) => void safePersist(setAutoDetectionMethod(value), "translate auto detection method"),
								options: detectionOptions.map((opt) => ({
									value: opt.value,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: opt.tip,
										placement: "top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label })
									})
								}))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelItem, {
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("translate.settings.bidirectional") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpTooltip, {
									content: t("translate.settings.bidirectional_tip"),
									iconProps: { className: "text-foreground-tertiary" }
								})]
							}),
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								size: "sm",
								checked: isBidirectional,
								onCheckedChange: (next) => void safePersist(setIsBidirectional(next), "translate bidirectional enabled preference")
							}),
							children: isBidirectional && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker_default, {
											value: bidirectionalPair[0],
											onChange: (value) => updateBidirectionalPair([value, bidirectionalPair[1]])
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
										size: 12,
										className: "shrink-0 text-foreground-tertiary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker_default, {
											value: bidirectionalPair[1],
											onChange: (value) => updateBidirectionalPair([bidirectionalPair[0], value])
										})
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslatePromptField, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomLanguageList, {})
			]
		})
	});
};
var TranslateSettingsCoreContent = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "translate.settings-core-content",
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslatePromptField, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomLanguageList, {})]
	});
};
var TranslatePromptField = () => {
	const { t } = useTranslation();
	const [persisted, setPersisted] = usePreference("feature.translate.model_prompt");
	const [local, setLocal] = (0, import_react.useState)(persisted);
	const pendingRef = (0, import_react.useRef)(null);
	const saveTimerRef = (0, import_react.useRef)(null);
	const saveFailedMessageRef = (0, import_react.useRef)(t("common.save_failed"));
	(0, import_react.useEffect)(() => {
		saveFailedMessageRef.current = t("common.save_failed");
	}, [t]);
	const safePersist = (0, import_react.useCallback)(async (persistPromise, actionName) => {
		try {
			await persistPromise;
		} catch (error) {
			logger.error(`Failed to persist ${actionName}`, error);
			toast.error(saveFailedMessageRef.current || "Failed to save");
		}
	}, []);
	const clearSaveTimer = (0, import_react.useCallback)(() => {
		if (saveTimerRef.current) {
			clearTimeout(saveTimerRef.current);
			saveTimerRef.current = null;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (pendingRef.current === null || pendingRef.current === persisted) {
			setLocal(persisted);
			pendingRef.current = null;
		}
	}, [persisted]);
	const schedulePersist = (0, import_react.useCallback)((next) => {
		clearSaveTimer();
		pendingRef.current = next;
		setLocal(next);
		const savedValue = next;
		saveTimerRef.current = setTimeout(() => {
			safePersist(setPersisted(savedValue), "translate prompt");
			pendingRef.current = null;
			saveTimerRef.current = null;
		}, 400);
	}, [
		clearSaveTimer,
		safePersist,
		setPersisted
	]);
	(0, import_react.useEffect)(() => () => {
		clearSaveTimer();
		if (pendingRef.current !== null) safePersist(setPersisted(pendingRef.current), "translate prompt");
	}, [
		clearSaveTimer,
		safePersist,
		setPersisted
	]);
	const isDefault = local === TRANSLATE_PROMPT;
	const onReset = () => {
		clearSaveTimer();
		pendingRef.current = null;
		setLocal(TRANSLATE_PROMPT);
		safePersist(setPersisted(TRANSLATE_PROMPT), "translate prompt");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelSection, {
		title: t("settings.translate.prompt"),
		actions: !isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onReset,
			className: "rounded-md text-muted-foreground text-xs transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:outline-none",
			children: t("common.reset")
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: local,
			onChange: (e) => schedulePersist(e.target.value),
			className: "min-h-30 w-full resize-y rounded-md border border-border-subtle bg-muted/40 p-3 text-muted-foreground text-sm leading-relaxed outline-none transition-colors focus:border-ring"
		})
	});
};
var CustomLanguageList = () => {
	const { t, i18n } = useTranslation();
	const { languages } = useLanguages();
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const customLanguages = (0, import_react.useMemo)(() => languages?.filter((language) => language.langCode !== "unknown" && !BUILTIN_LANG_CODES.has(language.langCode)) ?? [], [languages]);
	const addLanguageLabel = i18n.language.startsWith("zh") ? `${t("common.add")}${t("common.language")}` : `${t("common.add")} ${t("common.language")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelSection, {
		title: t("translate.custom.label"),
		actions: customLanguages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground-tertiary text-xs",
			children: t("code.count", { count: customLanguages.length })
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [
				customLanguages.map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomLanguageRow, { language }, language.langCode)),
				customLanguages.length === 0 && !isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-md bg-muted/30 px-2 py-2 text-center text-muted-foreground text-sm",
					children: t("common.no_results")
				}),
				isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddCustomLanguageForm, {
					languages: languages ?? [],
					onAdded: () => setIsAdding(false),
					onCancel: () => setIsAdding(false)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setIsAdding(true),
					"aria-label": addLanguageLabel,
					className: "mt-1 h-9 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: addLanguageLabel })]
				})
			]
		})
	});
};
var customLanguageFieldSubtitleClassName = "text-xs font-medium leading-4 text-muted-foreground";
var AddCustomLanguageForm = ({ languages, onAdded, onCancel }) => {
	const { t } = useTranslation();
	const { add: addLanguage } = useTranslateLanguages();
	const [value, setValue] = (0, import_react.useState)("");
	const [langCode, setLangCode] = (0, import_react.useState)("");
	const [emoji, setEmoji] = (0, import_react.useState)("🌐");
	const [error, setError] = (0, import_react.useState)(null);
	const nameId = (0, import_react.useId)();
	const codeId = (0, import_react.useId)();
	const clearError = (field) => {
		if (error?.field === field) setError(null);
	};
	const validate = () => {
		const nextValue = value.trim();
		const nextLangCode = langCode.trim().toLowerCase();
		if (!nextValue) return {
			ok: false,
			error: {
				field: "name",
				messageKey: "settings.translate.custom.error.value.empty"
			}
		};
		if (!nextLangCode) return {
			ok: false,
			error: {
				field: "code",
				messageKey: "settings.translate.custom.error.langCode.empty"
			}
		};
		if (!PersistedLangCodeSchema.safeParse(nextLangCode).success) return {
			ok: false,
			error: {
				field: "code",
				messageKey: "settings.translate.custom.error.langCode.invalid"
			}
		};
		if (BUILTIN_LANG_CODES.has(nextLangCode)) return {
			ok: false,
			error: {
				field: "code",
				messageKey: "settings.translate.custom.error.langCode.builtin"
			}
		};
		if (languages.some((language) => language.langCode === nextLangCode)) return {
			ok: false,
			error: {
				field: "code",
				messageKey: "settings.translate.custom.error.langCode.exists"
			}
		};
		return {
			ok: true,
			data: {
				value: nextValue,
				langCode: parsePersistedLangCode(nextLangCode),
				emoji
			}
		};
	};
	const handleAdd = async () => {
		const result = validate();
		if (!result.ok) {
			setError(result.error);
			return;
		}
		setError(null);
		await addLanguage(result.data);
		setValue("");
		setLangCode("");
		setEmoji("🌐");
		onAdded?.();
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleAdd();
		} else if (event.key === "Escape") {
			event.preventDefault();
			onCancel?.();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "translate.add-custom-language-form",
		className: "space-y-3 rounded-lg bg-muted/20 p-3",
		onKeyDown: handleKeyDown,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: nameId,
					className: customLanguageFieldSubtitleClassName,
					children: t("settings.translate.custom.value.label")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
					"data-invalid": error?.field === "name" || void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiPicker, {
							value: emoji,
							onChange: setEmoji
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						id: nameId,
						value,
						autoFocus: true,
						placeholder: t("settings.translate.custom.value.placeholder"),
						onChange: (e) => {
							setValue(e.target.value);
							clearError("name");
						}
					})]
				}),
				error?.field === "name" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
					className: "text-destructive",
					children: t(error.messageKey)
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: codeId,
					className: customLanguageFieldSubtitleClassName,
					children: t("settings.translate.custom.langCode.label")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: codeId,
					value: langCode,
					"aria-invalid": error?.field === "code" || void 0,
					placeholder: t("settings.translate.custom.langCode.placeholder"),
					onChange: (e) => {
						setLangCode(e.target.value);
						clearError("code");
					}
				}),
				error?.field === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
					className: "text-destructive",
					children: t(error.messageKey)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
					className: "text-muted-foreground text-xs leading-4",
					children: t("settings.translate.custom.langCode.help")
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: onCancel,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "default",
					size: "sm",
					onClick: () => void handleAdd(),
					children: t("common.add")
				})]
			})
		]
	});
};
var CustomLanguageRow = ({ language }) => {
	const { t } = useTranslation();
	const { update: updateLanguage, remove: deleteLanguage } = useTranslateLanguages();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [value, setValue] = (0, import_react.useState)(language.value);
	const [emoji, setEmoji] = (0, import_react.useState)(language.emoji);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setValue(language.value);
		setEmoji(language.emoji);
	}, [language.emoji, language.value]);
	const [nameErrorKey, setNameErrorKey] = (0, import_react.useState)(null);
	const nameId = (0, import_react.useId)();
	const codeId = (0, import_react.useId)();
	const handleSave = async () => {
		const nextValue = value.trim();
		if (!nextValue) {
			setNameErrorKey("settings.translate.custom.error.value.empty");
			return;
		}
		setNameErrorKey(null);
		await updateLanguage(language.langCode, {
			value: nextValue,
			emoji
		});
		setEditing(false);
	};
	const handleCancel = () => {
		setValue(language.value);
		setEmoji(language.emoji);
		setNameErrorKey(null);
		setEditing(false);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSave();
		} else if (event.key === "Escape") {
			event.preventDefault();
			handleCancel();
		}
	};
	if (!editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "translate.custom-language-row",
		className: "group flex items-center gap-2 rounded-lg px-2 py-1.25 transition-colors hover:bg-muted/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate text-foreground text-sm",
				children: language.value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 font-mono text-foreground-tertiary text-xs",
				children: language.langCode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
				size: "xs",
				onClick: () => setEditing(true),
				"aria-label": t("common.edit"),
				className: "text-muted-foreground opacity-0 transition-opacity hover:bg-transparent group-hover:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 10 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
				size: "xs",
				tone: "destructive",
				onClick: () => setConfirmOpen(true),
				"aria-label": t("common.delete"),
				className: "text-muted-foreground opacity-0 transition-opacity hover:bg-transparent group-hover:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: confirmOpen,
		onOpenChange: setConfirmOpen,
		title: t("settings.translate.custom.delete.title"),
		description: t("settings.translate.custom.delete.description"),
		confirmText: t("common.delete"),
		cancelText: t("common.cancel"),
		destructive: true,
		onConfirm: () => deleteLanguage(language.langCode)
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "translate.custom-language-row",
		className: "space-y-3 rounded-lg bg-muted/20 p-3",
		onKeyDown: handleKeyDown,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: nameId,
					className: customLanguageFieldSubtitleClassName,
					children: t("settings.translate.custom.value.label")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
					"data-invalid": nameErrorKey ? true : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiPicker, {
							value: emoji,
							onChange: setEmoji
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						id: nameId,
						value,
						autoFocus: true,
						onChange: (e) => {
							setValue(e.target.value);
							if (nameErrorKey) setNameErrorKey(null);
						}
					})]
				}),
				nameErrorKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
					className: "text-destructive",
					children: t(nameErrorKey)
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: codeId,
				className: customLanguageFieldSubtitleClassName,
				children: t("settings.translate.custom.langCode.label")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: codeId,
				value: language.langCode,
				disabled: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: handleCancel,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "default",
					size: "sm",
					onClick: () => void handleSave(),
					children: t("common.save")
				})]
			})
		]
	});
};
var EmojiPicker = ({ value, onChange }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroupButton, {
				type: "button",
				variant: "ghost",
				size: "xs",
				"aria-label": value,
				className: cn("h-6 gap-1 rounded-md px-1.5 text-xs", open && "bg-accent text-accent-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "leading-none",
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-2.5 text-muted-foreground transition-transform", open && "rotate-180") })]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			sideOffset: 4,
			className: "w-36 rounded-md border border-border bg-popover p-1 shadow-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1",
				children: EMOJI_OPTIONS.map((emoji) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						onChange(emoji);
						setOpen(false);
					},
					className: cn("flex h-7 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent", emoji === value && "bg-accent"),
					children: emoji
				}, emoji))
			})
		})]
	});
};
const TranslateSettingsPanelContent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslateSettingsCoreContent, {});
var TranslateSettings_default = (0, import_react.memo)(TranslateSettings);
export { TranslateSettings_default as n, IconButton_default as r, TranslateSettingsPanelContent as t };
