import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { c as ThemeMode, l as UpgradeChannel } from "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import { t as debounce } from "./debounce-BIuc7S_h.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import { r as resolver_default } from "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as circular_progress_default } from "./circular-progress-8zbVvw4s.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
import "./with-selector-BMhODuKS.js";
import "./lib-BGOUa2xQ.js";
import "./chunk-BO2N2NFS-DyWf1fK6.js";
import "./marked.esm-Dt1bmnBy.js";
import "./dist-CAn2sUiv.js";
import { t as Badge } from "./badge-HGyBlzr8.js";
import { a as ItemGroup, c as ItemTitle, i as ItemDescription, n as ItemActions, o as ItemMedia, r as ItemContent, t as Item } from "./item-Bzq6jvMs.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import "./tab-BoJ166Ld.js";
import "./useWindowInitData-C8-CHwDP.js";
import { n as openRoute } from "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-BAQAVa2r.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./useReorder-CHjMnht2.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import "./useMiniApps-Cw2wO8m-.js";
import { t as BadgeQuestionMark } from "./badge-question-mark-VEh5-Ml_.js";
import { t as Bot } from "./bot-Gan43VZU.js";
import { t as Briefcase } from "./briefcase-Cp-EJVqa.js";
import { t as Bug } from "./bug-Caxykku3.js";
import { t as Building2 } from "./building-2-CHAXtoVT.js";
import { t as ChevronRight } from "./chevron-right-CvFIUMTW.js";
import { t as ClipboardList } from "./clipboard-list-BoZmhhoS.js";
import { t as Github } from "./github-D46ieW8f.js";
import { t as Globe } from "./globe-Ds2oiCgn.js";
import { t as Mail } from "./mail-CK6fjwxW.js";
import { t as MessageSquareText } from "./message-square-text-DipwE5ph.js";
import { t as Rss } from "./rss-Cf6rRqYU.js";
import "./popup-C0FVl5N5.js";
import { t as useAppUpdateState } from "./useAppUpdateState-CDz-Vnmz.js";
import { t as logo_default } from "./logo-CPLMqaTs.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-aatUlttR.js";
import { t as IndicatorLight_default } from "./IndicatorLight-BCVMOCyh.js";
import { n as ReleaseNotes, t as UpdateDialogPopup_default } from "./UpdateDialogPopup-3wGdOPop.js";
import { n as useMiniAppPopup } from "./useMiniAppPopup-WVC3i80_.js";
import { t as LogoAvatar_default } from "./LogoAvatar-DjLDqsEF.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const FEEDBACK_GITHUB_URL = "https://github.com/CherryHQ/cherry-studio/issues/new/choose";
var logger = loggerService.withContext("FeedbackDialog");
function getFeedbackAgentRoute(sessionId) {
	return `/app/agents?intent=feedback&sessionId=${encodeURIComponent(sessionId)}`;
}
function isChineseFeedbackLanguage(language) {
	return language === "zh-CN" || language === "zh-TW";
}
function FeedbackOption({ description, icon, recommended = false, title, onSelect }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		size: "sm",
		variant: "outline",
		className: "w-full cursor-pointer rounded-xl hover:bg-accent/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => void onSelect(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemMedia, {
					variant: "icon",
					className: "border-primary/20 bg-primary/10 text-primary [&_.lucide:not(.lucide-custom)]:text-current!",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemContent, {
					className: "min-w-0 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemTitle, { children: [title, recommended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "border-primary/20 bg-primary/10 text-primary",
						children: t("settings.about.feedback.recommended")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDescription, {
						className: "line-clamp-none",
						children: description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" }) })
			]
		}) })
	});
}
function FeedbackDialog({ open, onOpenChange }) {
	const { t, i18n } = useTranslation();
	const showSurvey = isChineseFeedbackLanguage(i18n.resolvedLanguage ?? i18n.language);
	const selectOption = (action) => {
		onOpenChange(false);
		action();
	};
	const openAgentFeedback = async () => {
		try {
			const { sessionId } = await ipcApi.request("ai.agent.feedback_session.create");
			openRoute(getFeedbackAgentRoute(sessionId));
		} catch (error) {
			logger.error("Failed to create Cherry Assistant feedback session", error);
			toast.error(t("settings.about.feedback.agent_error"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("settings.about.feedback.dialog.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("settings.about.feedback.dialog.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemGroup, {
				className: "gap-3 px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackOption, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" }),
						title: t("settings.about.feedback.agent.title"),
						description: t("settings.about.feedback.agent.description"),
						recommended: true,
						onSelect: () => selectOption(openAgentFeedback)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackOption, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-5" }),
						title: t("settings.about.feedback.github.title"),
						description: t("settings.about.feedback.github.description"),
						onSelect: () => selectOption(() => ipcApi.request("system.shell.open_website", FEEDBACK_GITHUB_URL))
					}),
					showSurvey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackOption, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
						title: t("settings.about.feedback.survey.title"),
						description: t("settings.about.feedback.survey.description"),
						onSelect: () => selectOption(() => ipcApi.request("system.shell.open_website", "https://mcnnox2fhjfq.feishu.cn/share/base/form/shrcnsjfFkx4gy6wx9LQ70tMaKe"))
					})
				]
			})]
		})
	});
}
var AboutSettings = () => {
	const [autoCheckUpdate, setAutoCheckUpdate] = usePreference("app.dist.auto_update.enabled");
	const [testPlan, setTestPlan] = usePreference("app.dist.test_plan.enabled");
	const [testChannel, setTestChannel] = usePreference("app.dist.test_plan.channel");
	const [version, setVersion] = (0, import_react.useState)("");
	const [isPortable, setIsPortable] = (0, import_react.useState)(false);
	const [feedbackOpen, setFeedbackOpen] = (0, import_react.useState)(false);
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { openSmartMiniApp } = useMiniAppPopup();
	const { appUpdateState, updateAppUpdateState } = useAppUpdateState();
	const onCheckUpdate = debounce(async () => {
		if (appUpdateState.checking || appUpdateState.downloading) return;
		if (appUpdateState.downloaded) {
			UpdateDialogPopup_default.show({ releaseInfo: appUpdateState.info || null });
			return;
		}
		updateAppUpdateState({
			checking: true,
			manualCheck: true
		});
		try {
			await ipcApi.request("app.updater.check_for_update");
		} catch {
			updateAppUpdateState({ manualCheck: false });
			toast.error(t("settings.about.updateError"));
		}
		updateAppUpdateState({ checking: false });
	}, 2e3, {
		leading: true,
		trailing: false
	});
	const onOpenWebsite = (url) => {
		ipcApi.request("system.shell.open_website", url);
	};
	const mailto = async () => {
		onOpenWebsite(`mailto:support@cherry-ai.com?subject=Cherry Studio Feedback&body=%0A%0AVersion: ${(await ipcApi.request("app.get_info")).version} | Platform: ${window.electron.process.platform}`);
	};
	const debug = async () => {
		await ipcApi.request("system.toggle_dev_tools");
	};
	const showEnterprise = async () => {
		onOpenWebsite("https://enterprise.cherry-ai.com");
	};
	const showReleases = async () => {
		const { appPath } = await ipcApi.request("app.get_info");
		openSmartMiniApp({
			appId: "cherrystudio-releases",
			name: t("settings.about.releases.title"),
			url: `file://${appPath}/resources/cherry-studio/releases.html?theme=${theme === ThemeMode.dark ? "dark" : "light"}`,
			logo: logo_default
		});
	};
	const currentChannelByVersion = [{
		pattern: `-${UpgradeChannel.BETA}.`,
		channel: UpgradeChannel.BETA
	}, {
		pattern: `-${UpgradeChannel.RC}.`,
		channel: UpgradeChannel.RC
	}].find(({ pattern }) => version.includes(pattern))?.channel || UpgradeChannel.LATEST;
	const handleTestChannelChange = async (value) => {
		if (testPlan && currentChannelByVersion !== UpgradeChannel.LATEST && value !== currentChannelByVersion) toast.warning(t("settings.general.test_plan.version_channel_not_match"));
		setTestChannel(value);
		updateAppUpdateState({
			available: false,
			info: null,
			downloaded: false,
			checking: false,
			downloading: false,
			downloadProgress: 0
		});
	};
	const getAvailableTestChannels = () => {
		return [{
			tooltip: t("settings.general.test_plan.rc_version_tooltip"),
			label: t("settings.general.test_plan.rc_version"),
			value: UpgradeChannel.RC
		}, {
			tooltip: t("settings.general.test_plan.beta_version_tooltip"),
			label: t("settings.general.test_plan.beta_version"),
			value: UpgradeChannel.BETA
		}];
	};
	const handleSetTestPlan = (value) => {
		setTestPlan(value);
		updateAppUpdateState({
			available: false,
			info: null,
			downloaded: false,
			checking: false,
			downloading: false,
			downloadProgress: 0
		});
		if (value === true) setTestChannel(getTestChannel());
	};
	const getTestChannel = () => {
		if (testChannel === UpgradeChannel.LATEST) return UpgradeChannel.RC;
		return testChannel;
	};
	(0, import_react.useEffect)(() => {
		(async () => {
			const appInfo = await ipcApi.request("app.get_info");
			setVersion(appInfo.version);
			setIsPortable(appInfo.isPortable);
		})();
	}, []);
	const onOpenDocs = () => {
		const isChinese = resolver_default.language.startsWith("zh");
		ipcApi.request("system.shell.open_website", isChinese ? "https://docs.cherry-ai.com/" : "https://docs.cherry-ai.com/docs/en-us");
	};
	const testChannels = getAvailableTestChannels();
	const isUpdateReady = appUpdateState.available && appUpdateState.downloaded && !appUpdateState.downloading;
	const releaseNotesText = typeof appUpdateState.info?.releaseNotes === "string" ? appUpdateState.info.releaseNotes.replace(/\n/g, "\n\n") : appUpdateState.info?.releaseNotes?.map((note) => note.note).join("\n") ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingTitle, {
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-[15px]",
							children: t("settings.about.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": t("settings.about.repository"),
							onClick: () => onOpenWebsite("https://github.com/CherryHQ/cherry-studio"),
							className: "inline-flex items-center justify-center rounded-md p-1 text-foreground transition-colors hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-1.5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": "Cherry Studio",
								onClick: () => onOpenWebsite("https://github.com/CherryHQ/cherry-studio"),
								className: "relative cursor-pointer",
								children: [appUpdateState.downloading && appUpdateState.downloadProgress > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "-top-0.5 -left-0.5 pointer-events-none absolute",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(circular_progress_default, {
										value: appUpdateState.downloadProgress,
										size: 76,
										strokeWidth: 4,
										shape: "square",
										className: "stroke-transparent",
										progressClassName: "stroke-[#67ad5b]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoAvatar_default, {
									logo: logo_default,
									size: 72,
									className: "rounded-full"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-18 flex-col items-start justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-1 font-bold text-foreground text-lg",
										children: "Cherry Studio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground text-sm",
										children: t("settings.about.description")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t("settings.about.releases.title"),
										onClick: () => onOpenWebsite("https://github.com/CherryHQ/cherry-studio/releases"),
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											className: "cursor-pointer rounded-md border-primary/20 bg-primary/10 px-1.5 py-0 text-[11px] text-primary leading-4 transition-colors hover:bg-primary/15",
											children: ["v", version]
										})
									})
								]
							})]
						}), !isPortable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex shrink-0 items-center justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: isUpdateReady ? "default" : "outline",
								loading: appUpdateState.checking,
								onClick: onCheckUpdate,
								disabled: appUpdateState.downloading,
								className: cn("w-fit! min-w-0! shrink-0", isUpdateReady && "bg-success text-primary-foreground hover:bg-success/90 dark:bg-success dark:text-primary-foreground dark:hover:bg-success/90"),
								children: appUpdateState.downloading ? t("settings.about.downloading") : appUpdateState.available ? t("settings.about.checkUpdate.available") : t("settings.about.checkUpdate.label")
							})
						})]
					}),
					!isPortable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
							className: "gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.general.auto_check_update.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: autoCheckUpdate,
								onCheckedChange: (v) => setAutoCheckUpdate(v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
							className: "flex-nowrap gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 items-center justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("settings.general.test_plan.title") }), testPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
									value: getTestChannel(),
									onValueChange: handleTestChannelChange,
									options: testChannels.map((option) => ({
										value: option.value,
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: option.tooltip,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label })
										})
									})),
									size: "sm"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("settings.general.test_plan.tooltip"),
								classNames: { placeholder: "inline-flex items-center" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									className: "shrink-0",
									checked: testPlan,
									onCheckedChange: (v) => handleSetTestPlan(v)
								})
							})]
						})
					] })
				]
			}),
			appUpdateState.info && appUpdateState.available && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
						className: "gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
							className: "gap-2.5",
							children: [t("settings.about.updateAvailable", { version: appUpdateState.info.version }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndicatorLight_default, { color: "var(--success)" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
						className: "max-h-96 overflow-x-hidden pr-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseNotes, { content: releaseNotesText })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeQuestionMark, { className: "size-4.5" }),
						title: t("docs.title"),
						actionLabel: t("settings.about.website.button"),
						onAction: onOpenDocs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rss, { className: "size-4.5" }),
						title: t("settings.about.releases.title"),
						actionLabel: t("settings.about.releases.button"),
						onAction: showReleases
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4.5" }),
						title: t("settings.about.website.title"),
						actionLabel: t("settings.about.website.button"),
						onAction: () => onOpenWebsite("https://cherry-ai.com")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-4.5" }),
						title: t("settings.about.feedback.title"),
						actionLabel: t("settings.about.feedback.button"),
						onAction: () => setFeedbackOpen(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4.5" }),
						title: t("settings.about.enterprise.title"),
						actionLabel: t("settings.about.website.button"),
						onAction: showEnterprise
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4.5" }),
						title: t("settings.about.contact.title"),
						actionLabel: t("settings.about.contact.button"),
						onAction: mailto
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4.5" }),
						title: t("settings.about.careers.title"),
						actionLabel: t("settings.about.careers.button"),
						onAction: () => onOpenWebsite("https://www.cherry-ai.com/careers")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bug, { className: "size-4.5" }),
						title: t("settings.about.debug.title"),
						actionLabel: t("settings.about.debug.open"),
						onAction: debug
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackDialog, {
				open: feedbackOpen,
				onOpenChange: setFeedbackOpen
			})
		]
	});
};
function AboutActionRow({ actionLabel, icon, onAction, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
		className: "gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, {
			className: "gap-2.5",
			children: [icon, title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: () => void onAction(),
			variant: "outline",
			children: actionLabel
		})]
	});
}
var SplitComponent = AboutSettings;
export { SplitComponent as component };
