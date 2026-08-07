import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import { i as validateApiKey, n as removeApiKey, r as replaceApiKey, t as normalizeApiKeys } from "./apiKeys-hK08zVk9.js";
import { t as isEmpty } from "./isEmpty-D8zepxXt.js";
import { a as maskApiKey, c as withoutTrailingSlash, n as formatApiKeys, o as splitApiKeyString } from "./format-BU2M4Rvo.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-BPh2DI-f.js";
import { t as Alert } from "./alert-BwuKGcCL.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as Input$1 } from "./textarea-Djv1FqZD.js";
import { t as Label } from "./label-CUymrXZH.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-YSkmiq4a.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { n as useTheme } from "./useTheme-CbMe73se.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { t as Activity } from "./activity-dM8Sm7da.js";
import { t as ArrowRight } from "./arrow-right-10DRsfJt.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as Copy } from "./copy-DLNIVOlq.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as Info } from "./info-rKrg7-xW.js";
import { t as List } from "./list-DvMZwghn.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as Minus } from "./minus-B8LlKIu6.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as X } from "./x-DelRxIMm.js";
import { n as createPopup, t as popup } from "./popup-BqV2ZD7D.js";
import { t as useNavigate } from "./useNavigate-DEeZmEwY.js";
import { t as logo_default } from "./logo-CbiHIouG.js";
import { a as SettingHelpText, c as SettingRowTitle, d as SettingTitleExternalLink, i as SettingHelpLink, l as SettingSubtitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-CkQSNa69.js";
import { t as ResetIcon_default } from "./ResetIcon-kMtS8h06.js";
import "./api-BxGlwl7U.js";
import { t as Scrollbar_default } from "./Scrollbar-CRo8NoWr.js";
import { t as EditIcon_default } from "./EditIcon-5uYqh3lm.js";
import { a as getWebSearchProviderLogo, c as useWebSearchSettings, i as getWebSearchProviderDescriptionKey, l as DEFAULT_WEB_SEARCH_CUTOFF_LIMIT, n as getWebSearchFeatureSections, o as getWebSearchProviderOfficialWebsite, r as getWebSearchProviderApiKeyWebsite, s as useWebSearchProviders, t as getWebSearchCapabilityTitleKey } from "./webSearchProviderMeta-LdlPJE7v.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger$3 = loggerService.withContext("WebSearchSettings");
function useWebSearchPersist() {
	const { t } = useTranslation();
	return (0, import_react.useCallback)(async (action, message) => {
		try {
			return {
				ok: true,
				value: await action()
			};
		} catch (error) {
			logger$3.error(message, error);
			toast.error(t("settings.tool.websearch.errors.save_failed"));
			return { ok: false };
		}
	}, [t]);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const ToolSourceSettings = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const { clientToolsPreferred, setClientToolsPreferred } = useWebSearchSettings();
	const persist = useWebSearchPersist();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		theme,
		variant: "card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.tool.websearch.client_tools_preferred.label") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
				className: "min-h-8 items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpText, {
					className: "min-w-0 flex-1",
					children: t("settings.tool.websearch.client_tools_preferred.description")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					"aria-label": t("settings.tool.websearch.client_tools_preferred.label"),
					checked: clientToolsPreferred,
					onCheckedChange: (checked) => void persist(() => setClientToolsPreferred(checked), "Failed to save the client web-tool preference")
				})]
			})
		]
	});
};
var settingRowClassName$2 = "mt-2 min-h-8 items-center justify-between gap-3";
var settingLabelClassName$2 = "min-w-0 flex-1";
var CutoffSettings = () => {
	const { t } = useTranslation();
	const { compressionConfig, updateCompressionConfig } = useWebSearchSettings();
	const persist = useWebSearchPersist();
	const handleCutoffLimitChange = (value) => {
		persist(() => updateCompressionConfig({ cutoffLimit: value || 2e3 }), "Failed to save web search cutoff limit");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
		className: settingRowClassName$2,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
			className: settingLabelClassName$2,
			children: [t("settings.tool.websearch.compression.cutoff.limit.label"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
				placement: "right",
				content: t("settings.tool.websearch.compression.cutoff.limit.tooltip"),
				iconProps: {
					size: 16,
					color: "var(--muted-foreground)",
					className: "ml-1 cursor-pointer"
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-32 shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: t("settings.tool.websearch.compression.cutoff.limit.placeholder"),
				value: compressionConfig?.cutoffLimit === void 0 ? "" : compressionConfig.cutoffLimit,
				className: "h-8 text-sm",
				onChange: (e) => {
					const value = e.target.value;
					if (value === "") handleCutoffLimitChange(DEFAULT_WEB_SEARCH_CUTOFF_LIMIT);
					else if (!Number.isNaN(Number(value)) && Number(value) > 0) handleCutoffLimitChange(Number(value));
				}
			})
		})]
	});
};
var CutoffSettings_default = CutoffSettings;
var settingRowClassName$1 = "min-h-8 items-center justify-between gap-3";
var settingLabelClassName$1 = "min-w-0 flex-1";
var CompressionSettings = () => {
	const { t } = useTranslation();
	const { compressionConfig, updateCompressionConfig } = useWebSearchSettings();
	const persist = useWebSearchPersist();
	const handleCompressionMethodChange = (value) => {
		persist(() => updateCompressionConfig({
			method: value,
			...value === "cutoff" ? { cutoffLimit: compressionConfig?.cutoffLimit || 2e3 } : {}
		}), "Failed to save web search compression method");
	};
	const compressionMethodOptions = [{
		value: "none",
		label: t("settings.tool.websearch.compression.method.none")
	}, {
		value: "cutoff",
		label: t("settings.tool.websearch.compression.method.cutoff")
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
		className: settingRowClassName$1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
			className: settingLabelClassName$1,
			children: t("settings.tool.websearch.compression.method.label")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
			size: "sm",
			className: "h-8 shrink-0 [&_[role=radio]]:h-6.5",
			"aria-label": t("settings.tool.websearch.compression.method.label"),
			value: compressionConfig?.method || "none",
			options: compressionMethodOptions,
			onValueChange: handleCompressionMethodChange
		})]
	}), compressionConfig?.method === "cutoff" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CutoffSettings_default, {})] });
};
var CompressionSettings_default = CompressionSettings;
var settingRowClassName = "min-h-8 items-center justify-between gap-3";
var settingLabelClassName = "min-w-0 flex-1";
var DEFAULT_MAX_RESULTS = 5;
var BasicSettings = ({ variant = "card" }) => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const { maxResults, compressionConfig, setMaxResults } = useWebSearchSettings();
	const [draftMaxResultsInput, setDraftMaxResultsInput] = (0, import_react.useState)(String(maxResults));
	const [maxResultsBaseline, setMaxResultsBaseline] = (0, import_react.useState)(maxResults);
	const maxResultsDirty = draftMaxResultsInput !== String(maxResultsBaseline);
	const isMaxResultsDefault = maxResultsBaseline === DEFAULT_MAX_RESULTS && draftMaxResultsInput === String(DEFAULT_MAX_RESULTS);
	const persist = useWebSearchPersist();
	(0, import_react.useEffect)(() => {
		if (!maxResultsDirty) setDraftMaxResultsInput(String(maxResults));
		setMaxResultsBaseline(maxResults);
	}, [maxResults, maxResultsDirty]);
	const commitMaxResultsDraft = () => {
		if (!maxResultsDirty) return;
		const parsedValue = Number(draftMaxResultsInput);
		const nextMaxResults = Number.isFinite(parsedValue) ? Math.min(100, Math.max(1, Math.trunc(parsedValue))) : 1;
		persist(() => setMaxResults(nextMaxResults), "Failed to save web search max results").then((result) => {
			if (result.ok) {
				setDraftMaxResultsInput(String(nextMaxResults));
				setMaxResultsBaseline(nextMaxResults);
			}
		});
	};
	const resetMaxResults = () => {
		persist(() => setMaxResults(DEFAULT_MAX_RESULTS), "Failed to reset web search max results").then((result) => {
			if (result.ok) {
				setDraftMaxResultsInput(String(DEFAULT_MAX_RESULTS));
				setMaxResultsBaseline(DEFAULT_MAX_RESULTS);
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		theme,
		variant,
		style: { paddingBottom: 8 },
		children: [
			variant === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("settings.general.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {})] }) : null,
			variant === "plain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "mt-0 border-border-subtle" }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
						className: settingRowClassName,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
							className: settingLabelClassName,
							children: [t("settings.tool.websearch.search_max_result.label"), maxResults > 20 && compressionConfig?.method === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
								content: t("settings.tool.websearch.search_max_result.tooltip"),
								iconProps: {
									size: 16,
									color: "var(--muted-foreground)",
									className: "ml-1 cursor-pointer"
								}
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center justify-end gap-2",
							children: [!isMaxResultsDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("common.reset"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon-sm",
									className: "text-muted-foreground hover:text-foreground",
									"aria-label": t("common.reset"),
									onMouseDown: (e) => e.preventDefault(),
									onClick: resetMaxResults,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetIcon_default, { size: 14 })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"aria-label": t("settings.tool.websearch.search_max_result.label"),
								type: "number",
								min: 1,
								max: 100,
								step: 1,
								value: draftMaxResultsInput,
								className: "h-8 w-20 text-center text-sm",
								onChange: (e) => setDraftMaxResultsInput(e.target.value),
								onBlur: commitMaxResultsDraft,
								onKeyDown: (e) => {
									if (e.key === "Enter") e.currentTarget.blur();
								}
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "border-border-subtle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompressionSettings_default, {})
				]
			})
		]
	});
};
var BasicSettings_default = BasicSettings;
function parseMatchPattern(pattern) {
	const execResult = matchPatternRegExp.exec(pattern);
	if (!execResult) return null;
	const groups = execResult.groups;
	return groups.allURLs != null ? { allURLs: true } : {
		allURLs: false,
		scheme: groups.scheme.toLowerCase(),
		host: groups.host.toLowerCase(),
		path: groups.path
	};
}
var matchPatternRegExp = (() => {
	const allURLs = String.raw`(?<allURLs><all_urls>)`;
	const scheme = String.raw`(?<scheme>\*|[A-Za-z][0-9A-Za-z+.-]*)`;
	const label = String.raw`(?:[0-9A-Za-z](?:[0-9A-Za-z-]*[0-9A-Za-z])?)`;
	const host = String.raw`(?<host>(?:\*|${label})(?:\.${label})*)`;
	const path = String.raw`(?<path>/(?:\*|[0-9A-Za-z._~:/?[\]@!$&'()+,;=-]|%[0-9A-Fa-f]{2})*)`;
	return new RegExp(String.raw`^(?:${allURLs}|${scheme}://${host}${path})$`);
})();
var logger$2 = loggerService.withContext("WebSearchBlacklist");
function parseWebSearchBlacklistInput(input) {
	const entries = input.split("\n").filter((url) => url.trim() !== "");
	const validDomains = [];
	const invalidEntries = [];
	for (const entry of entries) {
		const trimmedEntry = entry.trim();
		if (trimmedEntry.startsWith("/") && trimmedEntry.endsWith("/")) try {
			const regexPattern = trimmedEntry.slice(1, -1);
			new RegExp(regexPattern, "i");
			validDomains.push(trimmedEntry);
			continue;
		} catch {
			logger$2.warn("Invalid web search blacklist regular expression", { pattern: trimmedEntry });
			invalidEntries.push(trimmedEntry);
			continue;
		}
		if (parseMatchPattern(trimmedEntry) === null) {
			invalidEntries.push(trimmedEntry);
			continue;
		}
		validDomains.push(trimmedEntry);
	}
	return {
		validDomains,
		invalidEntries
	};
}
var BlacklistSettings = ({ variant = "card" }) => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [invalidEntries, setInvalidEntries] = (0, import_react.useState)([]);
	const { excludeDomains, setExcludeDomains } = useWebSearchSettings();
	const savedBlacklistInput = excludeDomains.join("\n");
	const [blacklistInput, setBlacklistInput] = (0, import_react.useState)(savedBlacklistInput);
	const [blacklistBaseline, setBlacklistBaseline] = (0, import_react.useState)(savedBlacklistInput);
	const blacklistDirty = blacklistInput !== blacklistBaseline;
	const persist = useWebSearchPersist();
	(0, import_react.useEffect)(() => {
		if (!blacklistDirty) setBlacklistInput(savedBlacklistInput);
		setBlacklistBaseline(savedBlacklistInput);
	}, [blacklistDirty, savedBlacklistInput]);
	async function updateManualBlacklist(blacklist) {
		const { validDomains, invalidEntries: parsedInvalidEntries } = parseWebSearchBlacklistInput(blacklist);
		setInvalidEntries(parsedInvalidEntries);
		if (parsedInvalidEntries.length > 0) return;
		if ((await persist(() => setExcludeDomains(validDomains), "Failed to save web search blacklist")).ok) {
			const nextBlacklistInput = validDomains.join("\n");
			setBlacklistInput(nextBlacklistInput);
			setBlacklistBaseline(nextBlacklistInput);
			toast.info({
				title: t("message.save.success.title"),
				timeout: 4e3,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" })
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		theme,
		variant,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-6 items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSubtitle, { children: t("settings.tool.websearch.blacklist") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					"aria-label": t("settings.tool.websearch.blacklist"),
					value: blacklistInput,
					onChange: (e) => setBlacklistInput(e.target.value),
					placeholder: t("settings.tool.websearch.blacklist_tooltip"),
					className: "max-h-32 min-h-20 rounded-lg pr-20 text-sm leading-5 shadow-none",
					rows: 3
				}), blacklistDirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					className: "absolute right-2 bottom-2 h-7 px-2.5",
					onClick: () => void updateManualBlacklist(blacklistInput),
					children: t("common.save")
				})]
			}),
			invalidEntries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				className: "mt-1",
				message: t("settings.tool.websearch.blacklist_invalid_entries", { entries: invalidEntries.join(", ") }),
				type: "error"
			})
		]
	});
};
var BlacklistSettings_default = BlacklistSettings;
const WebSearchGeneralSettings = ({ variant = "card" }) => {
	const { t } = useTranslation();
	const [advancedSettingsOpen, setAdvancedSettingsOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup, {
		variant,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "single",
			collapsible: true,
			value: advancedSettingsOpen ? "advanced" : "",
			onValueChange: (value) => setAdvancedSettingsOpen(value === "advanced"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: "advanced",
				className: "border-0 first:border-t-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "h-8 rounded-lg py-0 font-medium",
					children: t("common.advanced_settings")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
					forceMount: true,
					hidden: !advancedSettingsOpen,
					className: "pt-2 pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicSettings_default, { variant: "plain" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlacklistSettings_default, { variant: "plain" })]
				})]
			})
		})
	});
};
var logger$1 = loggerService.withContext("useWebSearchProviderCheck");
var WEB_SEARCH_CHECK_KEYWORD = "Cherry Studio";
var WEB_SEARCH_CHECK_URL = "https://example.com";
function useWebSearchProviderCheck({ provider, capability }) {
	const { t } = useTranslation();
	const [checking, setChecking] = (0, import_react.useState)(false);
	const canCheck = provider.id !== "fetch";
	return {
		checking,
		canCheck,
		checkProvider: (0, import_react.useCallback)(() => {
			if (checking || !canCheck) return Promise.resolve();
			setChecking(true);
			const runCheck = async () => {
				if (capability === "fetchUrls") await ipcApi.request("web_search.fetch_urls", {
					providerId: provider.id,
					urls: [WEB_SEARCH_CHECK_URL]
				});
				else await ipcApi.request("web_search.search_keywords", {
					providerId: provider.id,
					keywords: [WEB_SEARCH_CHECK_KEYWORD]
				});
			};
			return runCheck().then(() => {
				setChecking(false);
				toast.success(t("settings.tool.websearch.check_success"));
			}, (error) => {
				setChecking(false);
				logger$1.error("Web search provider check failed", error);
				const errorMessage = error instanceof Error ? error.message : String(error);
				toast.error(`${t("settings.tool.websearch.check_failed")}: ${errorMessage}`);
			});
		}, [
			canCheck,
			capability,
			checking,
			provider.id,
			t
		])
	};
}
var logger = loggerService.withContext("useWebSearchApiKeyList");
function useWebSearchApiKeyList(providerId) {
	const { getProvider, setApiKeys } = useWebSearchProviders();
	const { t } = useTranslation();
	const [pendingNewKey, setPendingNewKey] = (0, import_react.useState)(null);
	const provider = getProvider(providerId);
	const keys = (0, import_react.useMemo)(() => normalizeApiKeys(provider?.apiKeys ?? []), [provider?.apiKeys]);
	const updateKeys = (0, import_react.useCallback)(async (nextKeys) => {
		if (!provider) return;
		await setApiKeys(provider.id, normalizeApiKeys(nextKeys));
	}, [provider, setApiKeys]);
	const addPendingKey = (0, import_react.useCallback)(() => {
		setPendingNewKey((current) => current ?? { id: Date.now().toString() });
	}, []);
	const addKey = (0, import_react.useCallback)(async (key) => {
		const result = validateApiKey(key, keys, t("settings.provider.api.key.error.empty"), t("settings.provider.api.key.error.duplicate"));
		if (!result.isValid) return result;
		await updateKeys([...keys, key]);
		setPendingNewKey(null);
		return { isValid: true };
	}, [
		keys,
		t,
		updateKeys
	]);
	const updateKey = (0, import_react.useCallback)(async (index, key) => {
		const result = validateApiKey(key, keys.filter((_, itemIndex) => itemIndex !== index), t("settings.provider.api.key.error.empty"), t("settings.provider.api.key.error.duplicate"));
		if (!result.isValid) return result;
		const nextKeys = replaceApiKey(keys, index, key);
		if (!nextKeys) {
			logger.error("Invalid web search API key index", {
				index,
				length: keys.length
			});
			return {
				isValid: false,
				error: t("error.diagnosis.unknown")
			};
		}
		await updateKeys(nextKeys);
		return { isValid: true };
	}, [
		keys,
		t,
		updateKeys
	]);
	const removeKey = (0, import_react.useCallback)(async (index) => {
		const nextKeys = removeApiKey(keys, index);
		if (!nextKeys) {
			logger.error("Invalid web search API key index", {
				index,
				length: keys.length
			});
			return;
		}
		await updateKeys(nextKeys);
	}, [keys, updateKeys]);
	const updateListItem = (0, import_react.useCallback)((item, key) => {
		return item.isNew ? addKey(key) : updateKey(item.index, key);
	}, [addKey, updateKey]);
	const removeListItem = (0, import_react.useCallback)(async (item) => {
		if (item.isNew) {
			setPendingNewKey(null);
			return;
		}
		await removeKey(item.index);
	}, [removeKey]);
	return {
		provider,
		keys,
		displayItems: (0, import_react.useMemo)(() => {
			const savedItems = keys.map((key, index) => ({
				id: `saved-${index}-${key}`,
				key,
				index,
				isNew: false
			}));
			if (!pendingNewKey) return savedItems;
			return [...savedItems, {
				id: pendingNewKey.id,
				key: "",
				index: keys.length,
				isNew: true
			}];
		}, [keys, pendingNewKey]),
		hasPendingNewKey: Boolean(pendingNewKey),
		addPendingKey,
		updateListItem,
		removeListItem
	};
}
var WebSearchApiKeyItem = ({ item, onUpdate, onRemove }) => {
	const { t } = useTranslation();
	const [isEditing, setIsEditing] = (0, import_react.useState)(item.isNew || !item.key.trim());
	const [editValue, setEditValue] = (0, import_react.useState)(item.key);
	const inputRef = (0, import_react.useRef)(null);
	const persist = useWebSearchPersist();
	const hasUnsavedChanges = editValue.trim() !== item.key.trim();
	(0, import_react.useEffect)(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);
	(0, import_react.useEffect)(() => {
		setEditValue(item.key);
		setIsEditing(item.isNew || !item.key.trim());
	}, [item.isNew, item.key]);
	const handleSave = async () => {
		const result = await persist(() => onUpdate(editValue), "Failed to save web search API key");
		if (!result.ok) return;
		if (!result.value.isValid) {
			toast.warning(result.value.error);
			return;
		}
		setIsEditing(false);
	};
	const handleCancelEdit = () => {
		if (item.isNew || !item.key.trim()) {
			onRemove();
			return;
		}
		setEditValue(item.key);
		setIsEditing(false);
	};
	const handleCopy = () => {
		navigator.clipboard.writeText(item.key).then(() => toast.success(t("message.copy.success"))).catch(() => toast.error(t("message.copy.failed")));
	};
	const handleRemove = async () => {
		if (await popup.confirm({
			title: t("common.delete_confirm"),
			centered: true,
			okText: t("common.confirm"),
			cancelText: t("common.cancel")
		})) await persist(onRemove, "Failed to remove web search API key");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.web-search-api-key",
		className: "flex min-h-10 items-center justify-between gap-2 border-border-subtle border-b px-3 py-2 last:border-b-0",
		children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref: inputRef,
			type: "password",
			value: editValue,
			onChange: (event) => setEditValue(event.target.value),
			onKeyDown: (event) => {
				if (event.key === "Enter") handleSave();
			},
			placeholder: t("settings.provider.api.key.new_key.placeholder"),
			className: "h-8 min-w-0 flex-1 rounded-lg border-border-subtle bg-foreground/3 text-xs leading-tight placeholder:text-muted-foreground md:text-xs",
			spellCheck: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: hasUnsavedChanges ? "default" : "ghost",
				size: "icon-sm",
				"aria-label": t("common.save"),
				onClick: () => void handleSave(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				"aria-label": t("common.cancel"),
				onClick: handleCancelEdit,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: t("common.copy"),
			delay: 500,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-ui": "settings.web-search-api-key.action.copy",
				type: "button",
				className: "min-w-0 cursor-help truncate text-left text-muted-foreground text-xs leading-tight",
				onClick: handleCopy,
				children: maskApiKey(item.key)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.copy"),
					onClick: handleCopy,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.edit"),
					onClick: () => setIsEditing(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon_default, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.delete"),
					onClick: () => void handleRemove(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
				})
			]
		})] })
	});
};
const WebSearchApiKeyList = ({ providerId }) => {
	const { t } = useTranslation();
	const { provider, keys, displayItems, hasPendingNewKey, addPendingKey, updateListItem, removeListItem } = useWebSearchApiKeyList(providerId);
	if (!provider) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.web-search-api-key",
		className: "py-3 text-muted-foreground text-xs leading-tight",
		children: t("error.no_api_key")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.web-search-api-key",
		className: "py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border-subtle bg-foreground/2",
			children: displayItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2 text-muted-foreground text-xs leading-tight",
				children: t("error.no_api_key")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
				className: "max-h-[60vh] overflow-x-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: displayItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebSearchApiKeyItem, {
					item,
					onUpdate: (key) => updateListItem(item, key),
					onRemove: () => removeListItem(item)
				}, item.id)) })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3.5 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 text-muted-foreground text-xs leading-tight",
				children: t("settings.provider.api_key.tip")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "sm",
				className: cn("h-7 rounded-lg px-3", keys.length === 0 ? void 0 : "shrink-0"),
				onClick: addPendingKey,
				autoFocus: keys.length === 0,
				disabled: hasPendingNewKey,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), t("common.add")]
			})]
		})]
	});
};
var PopupContainer = ({ providerId, title, open, resolve }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (nextOpen) => !nextOpen && resolve(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "sm:max-w-150",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-sm",
				children: title || t("settings.provider.api.key.list.title")
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebSearchApiKeyList, { providerId })]
		})
	});
};
const WebSearchApiKeyListPopup = createPopup(PopupContainer, { dismissResult: null });
var WebSearchProviderLogo = ({ providerId, providerName, size = 15, className }) => {
	if (providerId === "fetch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "settings.web-search-provider-logo",
		src: logo_default,
		alt: "",
		draggable: false,
		className: cn("inline-block shrink-0 rounded-[20%] object-cover", className),
		style: {
			width: size,
			height: size
		}
	});
	const logo = getWebSearchProviderLogo(providerId);
	if (logo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(logo.Avatar, {
		"data-ui": "settings.web-search-provider-logo",
		size,
		shape: "rounded",
		className
	});
	const initial = providerName.trim().charAt(0).toUpperCase() || "?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "settings.web-search-provider-logo",
		className: cn("inline-flex shrink-0 items-center justify-center rounded-sm bg-sky-500 font-bold text-white text-xs leading-none", className),
		style: {
			width: size,
			height: size
		},
		children: initial
	});
};
var WebSearchProviderLogo_default = WebSearchProviderLogo;
const WebSearchProviderOption = ({ provider }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.web-search-provider-option",
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebSearchProviderLogo_default, {
			providerId: provider.id,
			providerName: provider.name,
			size: 16
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: provider.name })]
	});
};
var providerFormClassName = "flex w-full flex-col gap-3 border-border-subtle border-t pt-4";
var providerSelectClassName = "h-8 w-56 text-sm";
function apiKeysToInput(apiKeys) {
	return apiKeys.join(", ");
}
function apiKeysToSignature(apiKeys) {
	return apiKeys.join("\n");
}
function normalizeApiKeysInput(value) {
	return splitApiKeyString(formatApiKeys(value));
}
function normalizeApiHostInput(value) {
	return withoutTrailingSlash(value.trim());
}
const WebSearchProviderSetting = ({ children, entry, entries, onSetApiKeys, onSetBasicAuth, onSetCapabilityApiHost, onSetDefaultProvider, onUpdateProvider, providerOverrides, sectionTitle, sectionTitleId }) => {
	const { capability, provider } = entry;
	const { theme } = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const persist = useWebSearchPersist();
	const savedApiKeysInput = (0, import_react.useMemo)(() => apiKeysToInput(provider.apiKeys), [provider.apiKeys]);
	const savedApiKeysSignature = (0, import_react.useMemo)(() => apiKeysToSignature(provider.apiKeys), [provider.apiKeys]);
	const [apiKeysInput, setApiKeysInput] = (0, import_react.useState)(savedApiKeysInput);
	const [apiKeysBaseline, setApiKeysBaseline] = (0, import_react.useState)(savedApiKeysSignature);
	const apiKeysDraft = (0, import_react.useMemo)(() => normalizeApiKeysInput(apiKeysInput), [apiKeysInput]);
	const apiKeysDraftSignature = (0, import_react.useMemo)(() => apiKeysToSignature(apiKeysDraft), [apiKeysDraft]);
	const apiKeysDirty = apiKeysDraftSignature !== apiKeysBaseline;
	const savedApiHost = entry.providerCapability.apiHost ?? "";
	const [apiHostInput, setApiHostInput] = (0, import_react.useState)(savedApiHost);
	const [apiHostBaseline, setApiHostBaseline] = (0, import_react.useState)(savedApiHost);
	const normalizedApiHostInput = (0, import_react.useMemo)(() => normalizeApiHostInput(apiHostInput), [apiHostInput]);
	const apiHostDirty = normalizedApiHostInput !== apiHostBaseline;
	const savedBasicAuthUsername = provider.basicAuthUsername || "";
	const savedBasicAuthPassword = provider.basicAuthPassword || "";
	const [basicAuthUsernameInput, setBasicAuthUsernameInput] = (0, import_react.useState)(savedBasicAuthUsername);
	const [basicAuthPasswordInput, setBasicAuthPasswordInput] = (0, import_react.useState)(savedBasicAuthPassword);
	const [basicAuthUsernameBaseline, setBasicAuthUsernameBaseline] = (0, import_react.useState)(savedBasicAuthUsername);
	const [basicAuthPasswordBaseline, setBasicAuthPasswordBaseline] = (0, import_react.useState)(savedBasicAuthPassword);
	const normalizedBasicAuthUsernameInput = basicAuthUsernameInput.trim();
	const normalizedBasicAuthPasswordInput = normalizedBasicAuthUsernameInput ? basicAuthPasswordInput.trim() : "";
	const basicAuthUsernameDirty = normalizedBasicAuthUsernameInput !== basicAuthUsernameBaseline;
	const basicAuthPasswordDirty = normalizedBasicAuthPasswordInput !== basicAuthPasswordBaseline;
	(0, import_react.useEffect)(() => {
		if (!apiKeysDirty) setApiKeysInput(savedApiKeysInput);
		setApiKeysBaseline(savedApiKeysSignature);
	}, [
		apiKeysDirty,
		savedApiKeysInput,
		savedApiKeysSignature
	]);
	(0, import_react.useEffect)(() => {
		if (!apiHostDirty) setApiHostInput(savedApiHost);
		setApiHostBaseline(savedApiHost);
	}, [apiHostDirty, savedApiHost]);
	(0, import_react.useEffect)(() => {
		if (!basicAuthUsernameDirty) setBasicAuthUsernameInput(savedBasicAuthUsername);
		setBasicAuthUsernameBaseline(savedBasicAuthUsername);
	}, [basicAuthUsernameDirty, savedBasicAuthUsername]);
	(0, import_react.useEffect)(() => {
		if (!basicAuthPasswordDirty) setBasicAuthPasswordInput(savedBasicAuthPassword);
		setBasicAuthPasswordBaseline(savedBasicAuthPassword);
	}, [basicAuthPasswordDirty, savedBasicAuthPassword]);
	const providerCheck = useWebSearchProviderCheck({
		provider,
		capability
	});
	const apiKeyWebsite = getWebSearchProviderApiKeyWebsite(provider.id);
	const officialWebsite = getWebSearchProviderOfficialWebsite(provider.id);
	const usesLlmProviderApiKey = provider.id === "zhipu";
	const showInlineApiKeySettings = provider.type === "api" && provider.id !== "fetch" && provider.id !== "searxng" && !usesLlmProviderApiKey;
	const supportsBasicAuth = provider.id === "searxng";
	const descriptionKey = getWebSearchProviderDescriptionKey(provider.id);
	const showApiKeyCheckButton = showInlineApiKeySettings && providerCheck.canCheck;
	const showApiHostCheckButton = !showApiKeyCheckButton && providerCheck.canCheck;
	const showApiHostSetting = entry.providerCapability.apiHost !== void 0;
	const commitApiKeysDraft = (0, import_react.useCallback)(async () => {
		if (!apiKeysDirty) return;
		await onSetApiKeys(provider.id, apiKeysDraft);
		setApiKeysInput(apiKeysToInput(apiKeysDraft));
		setApiKeysBaseline(apiKeysDraftSignature);
	}, [
		apiKeysDirty,
		apiKeysDraft,
		apiKeysDraftSignature,
		onSetApiKeys,
		provider.id
	]);
	const commitApiHostDraft = (0, import_react.useCallback)(async () => {
		if (!showApiHostSetting || !apiHostDirty) return;
		await onSetCapabilityApiHost(provider.id, capability, normalizedApiHostInput);
		setApiHostInput(normalizedApiHostInput);
		setApiHostBaseline(normalizedApiHostInput);
	}, [
		apiHostDirty,
		capability,
		normalizedApiHostInput,
		onSetCapabilityApiHost,
		provider.id,
		showApiHostSetting
	]);
	const commitBasicAuthDraft = (0, import_react.useCallback)(async () => {
		if (!basicAuthUsernameDirty && !basicAuthPasswordDirty) return;
		await onSetBasicAuth(provider.id, {
			username: normalizedBasicAuthUsernameInput,
			password: normalizedBasicAuthPasswordInput
		});
		setBasicAuthUsernameInput(normalizedBasicAuthUsernameInput);
		setBasicAuthPasswordInput(normalizedBasicAuthPasswordInput);
		setBasicAuthUsernameBaseline(normalizedBasicAuthUsernameInput);
		setBasicAuthPasswordBaseline(normalizedBasicAuthPasswordInput);
	}, [
		basicAuthPasswordDirty,
		basicAuthUsernameDirty,
		normalizedBasicAuthPasswordInput,
		normalizedBasicAuthUsernameInput,
		onSetBasicAuth,
		provider.id
	]);
	const commitDirtyDrafts = (0, import_react.useCallback)(async () => {
		const patch = {};
		if (apiKeysDirty) patch.apiKeys = apiKeysDraft;
		if (showApiHostSetting && apiHostDirty) patch.capabilities = {
			...providerOverrides[provider.id]?.capabilities,
			[capability]: {
				...providerOverrides[provider.id]?.capabilities?.[capability],
				apiHost: normalizedApiHostInput
			}
		};
		if (basicAuthUsernameDirty || basicAuthPasswordDirty) {
			patch.basicAuthUsername = normalizedBasicAuthUsernameInput;
			patch.basicAuthPassword = normalizedBasicAuthPasswordInput;
		}
		if (isEmpty(patch)) return;
		await onUpdateProvider(provider.id, patch);
		if (apiKeysDirty) {
			setApiKeysInput(apiKeysToInput(apiKeysDraft));
			setApiKeysBaseline(apiKeysDraftSignature);
		}
		if (showApiHostSetting && apiHostDirty) {
			setApiHostInput(normalizedApiHostInput);
			setApiHostBaseline(normalizedApiHostInput);
		}
		if (basicAuthUsernameDirty || basicAuthPasswordDirty) {
			setBasicAuthUsernameInput(normalizedBasicAuthUsernameInput);
			setBasicAuthPasswordInput(normalizedBasicAuthPasswordInput);
			setBasicAuthUsernameBaseline(normalizedBasicAuthUsernameInput);
			setBasicAuthPasswordBaseline(normalizedBasicAuthPasswordInput);
		}
	}, [
		apiHostDirty,
		apiKeysDirty,
		apiKeysDraft,
		apiKeysDraftSignature,
		basicAuthPasswordDirty,
		basicAuthUsernameDirty,
		capability,
		normalizedApiHostInput,
		normalizedBasicAuthPasswordInput,
		normalizedBasicAuthUsernameInput,
		onUpdateProvider,
		provider.id,
		providerOverrides,
		showApiHostSetting
	]);
	const openApiKeyList = async () => {
		if (!(await persist(commitApiKeysDraft, "Failed to save web search API keys before opening list")).ok) return;
		await WebSearchApiKeyListPopup.show({
			providerId: provider.id,
			title: `${provider.name} ${t("settings.provider.api.key.list.title")}`
		});
	};
	const openLlmProviderSettings = () => {
		navigate({
			to: "/settings/provider",
			search: { id: provider.id }
		});
	};
	const checkProvider = async () => {
		if ((await persist(commitDirtyDrafts, "Failed to save web search provider before check")).ok) await providerCheck.checkProvider();
	};
	const setBasicAuthUsernameDraft = (value) => {
		setBasicAuthUsernameInput(value);
		if (!value.trim()) setBasicAuthPasswordInput("");
	};
	const selectProvider = (providerId) => {
		const selectedProvider = entries.find((item) => item.provider.id === providerId)?.provider;
		if (!selectedProvider || selectedProvider.id === provider.id) return;
		persist(() => onSetDefaultProvider(selectedProvider), "Failed to set default web search provider");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		theme,
		className: "flex w-full flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, {
						id: sectionTitleId,
						className: "justify-start",
						children: sectionTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex min-w-0 items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpText, {
							className: "min-w-0",
							children: t(descriptionKey)
						}), officialWebsite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitleExternalLink, {
							href: officialWebsite,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: provider.id,
					onValueChange: selectProvider,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						size: "sm",
						className: providerSelectClassName,
						"aria-label": sectionTitle,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("settings.tool.websearch.search_provider_placeholder") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: entries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: item.provider.id,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebSearchProviderOption, { provider: item.provider })
					}, item.key)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: providerFormClassName,
				children: [
					usesLlmProviderApiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
							className: "font-medium",
							children: t("settings.provider.api_key.label")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "w-fit",
							onClick: openLlmProviderSettings,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 }), t("navigate.provider_settings")]
						})]
					}),
					showInlineApiKeySettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
								className: "font-medium",
								children: t("settings.provider.api_key.label")
							}), apiKeyWebsite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpLink, {
								className: "text-xs leading-5",
								target: "_blank",
								href: apiKeyWebsite,
								children: t("settings.provider.get_api_key")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									value: apiKeysInput,
									placeholder: t("settings.provider.api_key.label"),
									onChange: (e) => setApiKeysInput(e.target.value),
									onBlur: () => void persist(commitApiKeysDraft, "Failed to save web search API keys"),
									spellCheck: false,
									className: "min-w-0 flex-1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("settings.provider.api.key.list.open"),
									delay: 500,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "icon-sm",
										className: "size-8 shrink-0 text-muted-foreground shadow-none hover:text-foreground",
										"aria-label": t("settings.provider.api.key.list.open"),
										onClick: openApiKeyList,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { size: 14 })
									})
								}),
								showApiKeyCheckButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("settings.tool.websearch.check"),
									delay: 500,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "icon-sm",
										className: "size-8 shrink-0 text-muted-foreground shadow-none hover:text-foreground",
										disabled: providerCheck.checking,
										"aria-label": t("settings.tool.websearch.check"),
										onClick: () => void checkProvider(),
										children: providerCheck.checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											size: 14,
											className: "animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 14 })
									})
								})
							]
						})]
					}),
					showApiHostSetting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex flex-col gap-2 ${usesLlmProviderApiKey || showInlineApiKeySettings ? "border-border-subtle border-t pt-3" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
							className: "font-medium",
							children: t("settings.provider.api_host")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: apiHostInput,
								placeholder: t("settings.provider.api_host"),
								onChange: (e) => setApiHostInput(e.target.value),
								onBlur: () => void persist(commitApiHostDraft, "Failed to save web search API host"),
								className: "min-w-0 flex-1"
							}), showApiHostCheckButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("settings.tool.websearch.check"),
								delay: 500,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "icon-sm",
									className: "size-8 shrink-0 text-muted-foreground shadow-none hover:text-foreground",
									disabled: providerCheck.checking,
									"aria-label": t("settings.tool.websearch.check"),
									onClick: () => void checkProvider(),
									children: providerCheck.checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										size: 14,
										className: "animate-spin"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 14 })
								})
							})]
						})]
					}),
					supportsBasicAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { style: {
							marginTop: 0,
							marginBottom: 0
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingSubtitle, {
							style: {
								marginTop: 5,
								marginBottom: 10,
								display: "flex",
								flexDirection: "row",
								alignItems: "center"
							},
							children: [t("settings.provider.basic_auth.label"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
								placement: "right",
								content: t("settings.provider.basic_auth.tip"),
								iconProps: {
									size: 16,
									color: "var(--muted-foreground)",
									className: "ml-1 cursor-pointer"
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full flex-col gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "websearch-basic-auth-username",
									children: t("settings.provider.basic_auth.user_name.label")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "websearch-basic-auth-username",
									value: basicAuthUsernameInput,
									placeholder: t("settings.provider.basic_auth.user_name.tip"),
									onChange: (e) => setBasicAuthUsernameDraft(e.target.value),
									onBlur: () => void persist(commitBasicAuthDraft, "Failed to save web search basic auth username")
								})]
							}), basicAuthUsernameInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "websearch-basic-auth-password",
									children: t("settings.provider.basic_auth.password.label")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "websearch-basic-auth-password",
									type: "password",
									value: basicAuthPasswordInput,
									placeholder: t("settings.provider.basic_auth.password.tip"),
									onChange: (e) => setBasicAuthPasswordInput(e.target.value),
									onBlur: () => void persist(commitBasicAuthDraft, "Failed to save web search basic auth password")
								})]
							})]
						})
					] })
				]
			}),
			children
		]
	});
};
function useWebSearchProviderLists() {
	const webSearchProviders = useWebSearchProviders();
	const { providers } = webSearchProviders;
	const featureSections = (0, import_react.useMemo)(() => getWebSearchFeatureSections(providers), [providers]);
	return {
		...webSearchProviders,
		featureSections
	};
}
var webSearchFieldClassName = "[&_input[data-slot=input]]:h-8 [&_input[data-slot=input]]:rounded-lg [&_input[data-slot=input]]:border-border-subtle [&_input[data-slot=input]]:bg-muted/30 [&_input[data-slot=input]]:px-2.5 [&_input[data-slot=input]]:shadow-none [&_input[data-slot=input]:focus-visible]:ring-[1px] [&_input[data-slot=input]:focus-visible]:ring-ring/35 [&_textarea[data-slot=textarea-input]]:rounded-lg [&_textarea[data-slot=textarea-input]]:border-border-subtle [&_textarea[data-slot=textarea-input]]:bg-muted/30 [&_textarea[data-slot=textarea-input]]:shadow-none [&_textarea[data-slot=textarea-input]:focus-visible]:ring-[1px] [&_textarea[data-slot=textarea-input]:focus-visible]:ring-ring/35";
var WebSearchSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { defaultFetchUrlsProvider, defaultSearchKeywordsProvider, featureSections, providerOverrides, setApiKeys, setBasicAuth, setCapabilityApiHost, setDefaultFetchUrlsProvider, setDefaultSearchKeywordsProvider, updateProvider } = useWebSearchProviderLists();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		innerClassName: webSearchFieldClassName,
		children: [featureSections.map((section) => {
			const defaultProvider = section.capability === "fetchUrls" ? defaultFetchUrlsProvider : defaultSearchKeywordsProvider;
			const selectedEntry = section.entries.find((entry) => entry.provider.id === defaultProvider?.id) ?? section.entries[0];
			if (!selectedEntry) return null;
			const sectionTitle = t(getWebSearchCapabilityTitleKey(section.capability));
			const sectionTitleId = `web-search-${section.capability}-title`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-4 first:mt-0",
				"aria-labelledby": sectionTitleId,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebSearchProviderSetting, {
					entry: selectedEntry,
					entries: section.entries,
					providerOverrides,
					sectionTitle,
					sectionTitleId,
					onSetApiKeys: setApiKeys,
					onSetBasicAuth: setBasicAuth,
					onSetCapabilityApiHost: setCapabilityApiHost,
					onSetDefaultProvider: section.capability === "fetchUrls" ? setDefaultFetchUrlsProvider : setDefaultSearchKeywordsProvider,
					onUpdateProvider: updateProvider,
					children: section.capability === "searchKeywords" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebSearchGeneralSettings, { variant: "plain" }) : null
				}, selectedEntry.key)
			}, section.capability);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolSourceSettings, {})]
	});
};
var SplitComponent = WebSearchSettings;
export { SplitComponent as component };
