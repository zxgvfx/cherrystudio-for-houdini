import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { c as ThemeMode, l as UpgradeChannel } from "./PreferenceService-ay5pWhVK.js";
import { t as debounce } from "./debounce-RtBWGQ3U.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { t as logo_default } from "./logo-QoERDEp9.js";
import { n as UiDataSlot } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as circular_progress_default } from "./circular-progress-BDSNItwD.js";
import { t as Alert } from "./alert-SRAASWPI.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { t as Divider } from "./divider-2gEjzcxJ.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import { t as DIALOG_CLOSE_DURATION_MS } from "./dialog-B1Y1oQcg.js";
import "./es2015-CF8XujIC.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { t as Checkbox } from "./checkbox-wIIoFt4V.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import "./with-selector-YZwnb76j.js";
import "./chunk-BO2N2NFS-CPhdpqIF.js";
import "./extend-CpT6M6LO.js";
import "./marked.esm-CssjD7C2.js";
import "./dist-CmBt0G-t.js";
import { t as Badge } from "./badge-CPxOcbpM.js";
import { a as ItemGroup, c as ItemTitle, i as ItemDescription, n as ItemActions, o as ItemMedia, r as ItemContent, t as Item } from "./item-DSmokINd.js";
import { t as SegmentedControl } from "./segmented-control-CAdhwi7C.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { t as IpcError } from "./IpcError-M3DORlSx.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import "./tab-BIOOjV6R.js";
import "./useWindowInitData-nzW1IbOc.js";
import { n as openRoute } from "./mainWindowNavigation-BoKv8CTA.js";
import { n as cn } from "./style-C-RkFX_x.js";
import "./CacheService-BxZWLQeF.js";
import "./useCache-DNNSH80c.js";
import "./file-BaEpIJyZ.js";
import { d as createFilePathHandle } from "./file-C52KaMrN.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./useReorder-BgG0nfey.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import "./useMiniApps-CSGgQnmg.js";
import { t as BadgeQuestionMark } from "./badge-question-mark-BRmf8d-u.js";
import { t as Bot } from "./bot-Dza-NcEv.js";
import { t as Briefcase } from "./briefcase-BBjFXRG7.js";
import { t as Bug } from "./bug-BUqSWLrK.js";
import { t as Building2 } from "./building-2-Dws_Lcxm.js";
import { t as ChevronRight } from "./chevron-right-BPsUQvI4.js";
import { t as CircleCheck } from "./circle-check-czafkGL2.js";
import { t as ClipboardList } from "./clipboard-list-C0L_4eAS.js";
import { t as FileArchive } from "./file-archive-CE05X-ji.js";
import { t as Github } from "./github-TQXb616i.js";
import { t as Globe } from "./globe-BRWoSABM.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
import { t as Mail } from "./mail-CRjAYqUi.js";
import { t as MessageSquareText } from "./message-square-text-Dd5lGumV.js";
import { t as Rss } from "./rss-CXvskbeN.js";
import "./popup-BLG-Gue5.js";
import { t as useAppUpdateState } from "./useAppUpdateState-CmzTKOOk.js";
import { n as ReleaseNotes, t as UpdateDialogPopup_default } from "./UpdateDialogPopup-zihJj_b9.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-ctf-2wxz.js";
import { n as useMiniAppPopup } from "./useMiniAppPopup-CUnNB9sq.js";
import { t as IndicatorLight_default } from "./IndicatorLight-pByslnVC.js";
import { t as LogoAvatar_default } from "./LogoAvatar-DnJDmtsm.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const FEEDBACK_GITHUB_URL = "https://github.com/CherryHQ/cherry-studio/issues/new/choose";
var logger$1 = loggerService.withContext("FeedbackDialog");
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
			const { sessionId } = await ipcApi.request("ai.agent.support_session.create");
			openRoute(getFeedbackAgentRoute(sessionId));
		} catch (error) {
			logger$1.error("Failed to create Cherry Support feedback session", error);
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
const diagnosticsErrorCodes = {
	DESTINATION_INSIDE_SOURCE: "DIAGNOSTICS_DESTINATION_INSIDE_SOURCE",
	DESTINATION_IS_SOURCE: "DIAGNOSTICS_DESTINATION_IS_SOURCE"
};
var SUPPORT_EMAIL = "support@cherry-ai.com";
var logger = loggerService.withContext("DiagnosticBundleDialog");
var RANGE_OPTIONS = [
	{
		translationKey: "settings.about.diagnostics.ranges.24h",
		value: "24h"
	},
	{
		translationKey: "settings.about.diagnostics.ranges.3d",
		value: "3d"
	},
	{
		translationKey: "settings.about.diagnostics.ranges.7d",
		value: "7d"
	}
];
var RANGE_TRANSLATION_KEYS = Object.fromEntries(RANGE_OPTIONS.map(({ translationKey, value }) => [value, translationKey]));
function formatBytes(bytes) {
	if (bytes === 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
	const value = bytes / 1024 ** unitIndex;
	return `${value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}
function isDestinationConflictError(error) {
	return error instanceof IpcError && (error.code === diagnosticsErrorCodes.DESTINATION_INSIDE_SOURCE || error.code === diagnosticsErrorCodes.DESTINATION_IS_SOURCE);
}
var DiagnosticBundleDialog = ({ appVersion, onOpenChange, open }) => {
	const { t } = useTranslation();
	const [range, setRange] = (0, import_react.useState)("24h");
	const [includeLogs, setIncludeLogs] = (0, import_react.useState)(true);
	const [includeTraces, setIncludeTraces] = (0, import_react.useState)(true);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [isConfirmationOpen, setIsConfirmationOpen] = (0, import_react.useState)(false);
	const [inspectResult, setInspectResult] = (0, import_react.useState)(null);
	const [inspectError, setInspectError] = (0, import_react.useState)(false);
	const [isInspecting, setIsInspecting] = (0, import_react.useState)(false);
	const [copyEmailFallback, setCopyEmailFallback] = (0, import_react.useState)(false);
	const [exportState, setExportState] = (0, import_react.useState)({ status: "idle" });
	const revealButtonRef = (0, import_react.useRef)(null);
	const closeResetTimerRef = (0, import_react.useRef)(null);
	const confirmedExportTimerRef = (0, import_react.useRef)(null);
	const status = exportState.status;
	const savedResult = exportState.status === "saved" ? exportState.result : null;
	(0, import_react.useEffect)(() => {
		if (open) {
			if (closeResetTimerRef.current !== null) {
				window.clearTimeout(closeResetTimerRef.current);
				closeResetTimerRef.current = null;
			}
			return;
		}
		if (confirmedExportTimerRef.current !== null) {
			window.clearTimeout(confirmedExportTimerRef.current);
			confirmedExportTimerRef.current = null;
		}
		closeResetTimerRef.current = window.setTimeout(() => {
			closeResetTimerRef.current = null;
			setRange("24h");
			setIncludeLogs(true);
			setIncludeTraces(true);
			setConsent(false);
			setIsConfirmationOpen(false);
			setInspectResult(null);
			setInspectError(false);
			setIsInspecting(false);
			setCopyEmailFallback(false);
			setExportState({ status: "idle" });
		}, 200);
		return () => {
			if (closeResetTimerRef.current !== null) {
				window.clearTimeout(closeResetTimerRef.current);
				closeResetTimerRef.current = null;
			}
		};
	}, [open]);
	(0, import_react.useEffect)(() => () => {
		if (confirmedExportTimerRef.current !== null) window.clearTimeout(confirmedExportTimerRef.current);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let active = true;
		setIsInspecting(true);
		setInspectError(false);
		ipcApi.request("diagnostics.bundle.inspect", { range }).then((result) => {
			if (active) setInspectResult(result);
		}).catch((error) => {
			if (!active) return;
			logger.error("Failed to inspect diagnostic bundle sources", error);
			setInspectResult(null);
			setInspectError(true);
		}).finally(() => {
			if (active) setIsInspecting(false);
		});
		return () => {
			active = false;
		};
	}, [open, range]);
	(0, import_react.useEffect)(() => {
		if (status === "saved") revealButtonRef.current?.focus();
	}, [status]);
	const logsAvailable = inspectResult?.sources.logs.available ?? false;
	const tracesAvailable = inspectResult?.sources.traces.available ?? false;
	const effectiveIncludeLogs = includeLogs && logsAvailable;
	const effectiveIncludeTraces = includeTraces && tracesAvailable;
	const includesSensitiveData = effectiveIncludeLogs || effectiveIncludeTraces;
	const isInspectionPending = open && !inspectError && (isInspecting || inspectResult === null);
	const canExport = inspectResult !== null && !isInspectionPending && !inspectError && status !== "saving";
	const hasInspectWarnings = inspectResult?.hasWarnings ?? false;
	const hasSavedWarnings = savedResult?.hasWarnings ?? false;
	const changeRange = (nextRange) => {
		setRange(nextRange);
		setInspectResult(null);
		setConsent(false);
	};
	const changeLogs = (checked) => {
		setIncludeLogs(checked);
		setConsent(false);
	};
	const changeTraces = (checked) => {
		setIncludeTraces(checked);
		setConsent(false);
	};
	const handleOpenChange = (nextOpen) => {
		if (!nextOpen && status === "saving") return;
		if (!nextOpen) {
			setIsConfirmationOpen(false);
			setConsent(false);
		}
		onOpenChange(nextOpen);
	};
	const performExport = async () => {
		if (!canExport) return;
		if (includesSensitiveData) setConsent(false);
		setExportState({ status: "saving" });
		try {
			const result = await ipcApi.request("diagnostics.bundle.export", {
				includeLogs: effectiveIncludeLogs,
				includeTraces: effectiveIncludeTraces,
				range
			});
			if (result.status === "canceled") {
				setExportState({ status: "idle" });
				return;
			}
			if (result.status === "busy") {
				setExportState({ status: "idle" });
				toast.error(t("settings.about.diagnostics.errors.busy"));
				return;
			}
			setExportState({
				result,
				status: "saved"
			});
		} catch (error) {
			logger.error("Failed to export diagnostic bundle", error);
			setExportState({ status: "idle" });
			toast.error(t(isDestinationConflictError(error) ? "settings.about.diagnostics.errors.destination_conflict" : "settings.about.diagnostics.errors.export_failed"));
		}
	};
	const handleExport = () => {
		if (!canExport) return;
		if (includesSensitiveData) {
			setConsent(false);
			setIsConfirmationOpen(true);
			return;
		}
		performExport();
	};
	const handleConfirmationOpenChange = (nextOpen) => {
		setIsConfirmationOpen(nextOpen);
		if (!nextOpen) setConsent(false);
	};
	const handleConfirmedExport = () => {
		if (!consent || confirmedExportTimerRef.current !== null) return;
		setIsConfirmationOpen(false);
		confirmedExportTimerRef.current = window.setTimeout(() => {
			confirmedExportTimerRef.current = null;
			performExport();
		}, 200);
	};
	const handleReveal = async () => {
		if (!savedResult) return;
		try {
			await ipcApi.request("file.show_in_folder", createFilePathHandle(savedResult.filePath));
		} catch (error) {
			logger.error("Failed to reveal diagnostic bundle", error);
			toast.error(t("settings.about.diagnostics.errors.reveal_failed"));
		}
	};
	const copySupportEmail = async () => {
		try {
			await navigator.clipboard.writeText(SUPPORT_EMAIL);
			toast.success(t("settings.about.diagnostics.success.email_copied"));
		} catch {
			toast.error(t("settings.about.diagnostics.errors.copy_failed"));
		}
	};
	const handleContactSupport = async () => {
		if (!savedResult) return;
		const params = new URLSearchParams({
			subject: t("settings.about.diagnostics.mail.subject", { bundleId: savedResult.bundleId }),
			body: t("settings.about.diagnostics.mail.body", {
				bundleId: savedResult.bundleId,
				fileName: savedResult.fileName,
				platform: window.electron.process.platform,
				range: t(RANGE_TRANSLATION_KEYS[range]),
				version: appVersion || t("settings.about.diagnostics.unknown")
			})
		});
		try {
			const query = params.toString().replaceAll("+", "%20");
			await ipcApi.request("system.shell.open_website", `mailto:${SUPPORT_EMAIL}?${query}`);
		} catch (error) {
			logger.error("Failed to open support email client", error);
			setCopyEmailFallback(true);
			toast.error(t("settings.about.diagnostics.errors.email_client_failed"));
		}
	};
	const rangeOptions = RANGE_OPTIONS.map(({ translationKey, value }) => ({
		label: t(translationKey),
		value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "xl",
			className: "grid max-h-[calc(100vh-2rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0",
			closeOnOverlayClick: status !== "saving",
			showCloseButton: status !== "saving",
			onEscapeKeyDown: (event) => {
				if (status === "saving") event.preventDefault();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "px-6 pt-6 pr-12 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("settings.about.diagnostics.dialog.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("settings.about.diagnostics.dialog.description") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
					className: "min-h-0 px-6 py-2",
					children: status === "saved" && savedResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 rounded-xl border border-success-border bg-success-subtle p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-5 shrink-0 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-success-subtle-foreground",
											children: t("settings.about.diagnostics.success.title")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "break-all text-sm",
											children: savedResult.fileName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-xs",
											children: t("settings.about.diagnostics.success.summary", {
												included: savedResult.includedFileCount,
												omitted: savedResult.omittedFileCount,
												size: formatBytes(savedResult.archiveBytes)
											})
										})
									]
								})]
							}),
							hasSavedWarnings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
								type: "warning",
								showIcon: true,
								description: t("settings.about.diagnostics.warning")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: t("settings.about.diagnostics.success.local_only")
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-sm",
									children: t("settings.about.diagnostics.range_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
									value: range,
									onValueChange: changeRange,
									options: rangeOptions,
									className: "w-full",
									disabled: status === "saving"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "divide-y divide-border rounded-xl border border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceRow, {
										title: t("settings.about.diagnostics.sources.system.title"),
										description: t("settings.about.diagnostics.sources.system.description", { crashCount: inspectResult?.sources.crashDumps.fileCount ?? 0 }),
										checked: true,
										disabled: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceRow, {
										title: t("settings.about.diagnostics.sources.logs.title"),
										description: sourceDescription(t, inspectResult?.sources.logs, isInspectionPending),
										checked: effectiveIncludeLogs,
										disabled: status === "saving" || isInspectionPending || !logsAvailable,
										onCheckedChange: changeLogs
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceRow, {
										title: t("settings.about.diagnostics.sources.traces.title"),
										description: sourceDescription(t, inspectResult?.sources.traces, isInspectionPending),
										checked: effectiveIncludeTraces,
										disabled: status === "saving" || isInspectionPending || !tracesAvailable,
										onCheckedChange: changeTraces
									})
								]
							}),
							isInspectionPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-ui": "settings.diagnostic-bundle-dialog.status",
								className: "flex items-center gap-2 text-muted-foreground text-sm",
								role: "status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), t("settings.about.diagnostics.inspecting")]
							}),
							inspectError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-ui": "settings.diagnostic-bundle-dialog.alert",
								className: "text-error text-sm",
								role: "alert",
								children: t("settings.about.diagnostics.errors.inspect_failed")
							}),
							!isInspecting && hasInspectWarnings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
								type: "warning",
								showIcon: true,
								description: t("settings.about.diagnostics.warning")
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					className: "mt-4 border-border border-t px-6 py-4",
					children: status === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => handleOpenChange(false),
							children: t("settings.about.diagnostics.actions.close")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ref: revealButtonRef,
							variant: "outline",
							onClick: () => void handleReveal(),
							children: t("settings.about.diagnostics.actions.reveal")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "emphasis",
							onClick: () => void (copyEmailFallback ? copySupportEmail() : handleContactSupport()),
							children: t(copyEmailFallback ? "settings.about.diagnostics.actions.copy_email" : "settings.about.diagnostics.actions.contact")
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: status === "saving",
						onClick: () => handleOpenChange(false),
						children: t("settings.about.diagnostics.actions.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "emphasis",
						loading: status === "saving",
						disabled: !canExport,
						onClick: handleExport,
						children: t(status === "saving" ? "settings.about.diagnostics.actions.exporting" : "settings.about.diagnostics.actions.export")
					})] })
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isConfirmationOpen,
		onOpenChange: handleConfirmationOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("settings.about.diagnostics.privacy.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "leading-6",
					children: t("settings.about.diagnostics.privacy.description")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm leading-6",
					children: t("settings.about.diagnostics.limit", { size: formatBytes(inspectResult?.sourceLimitBytes ?? 50 * 1024 * 1024) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: consent,
						onCheckedChange: (checked) => setConsent(checked === true)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.about.diagnostics.privacy.consent") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => handleConfirmationOpenChange(false),
					children: t("settings.about.diagnostics.actions.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "emphasis",
					disabled: !consent,
					onClick: handleConfirmedExport,
					children: t("settings.about.diagnostics.actions.export")
				})] })
			]
		})
	})] });
};
function sourceDescription(t, source, isInspectionPending) {
	if (isInspectionPending) return t("settings.about.diagnostics.sources.inspecting");
	if (!source?.available) return t("settings.about.diagnostics.sources.unavailable");
	return t("settings.about.diagnostics.sources.summary", {
		count: source.fileCount,
		size: formatBytes(source.estimatedBytes)
	});
}
function SourceRow({ checked, description, disabled, onCheckedChange, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.source-row",
		className: "flex items-center justify-between gap-4 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 space-y-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-sm",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			"aria-label": title,
			checked,
			disabled,
			onCheckedChange
		})]
	});
}
var DiagnosticBundleDialog_default = DiagnosticBundleDialog;
var AboutSettings = () => {
	const [autoCheckUpdate, setAutoCheckUpdate] = usePreference("app.dist.auto_update.enabled");
	const [testPlan, setTestPlan] = usePreference("app.dist.test_plan.enabled");
	const [testChannel, setTestChannel] = usePreference("app.dist.test_plan.channel");
	const [version, setVersion] = (0, import_react.useState)("");
	const [isPortable, setIsPortable] = (0, import_react.useState)(false);
	const [isDiagnosticDialogOpen, setIsDiagnosticDialogOpen] = (0, import_react.useState)(false);
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
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileArchive, { className: "size-4.5" }),
						title: t("settings.about.diagnostics.entry.title"),
						actionLabel: t("settings.about.diagnostics.entry.button"),
						onAction: () => setIsDiagnosticDialogOpen(true)
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagnosticBundleDialog_default, {
				appVersion: version,
				open: isDiagnosticDialogOpen,
				onOpenChange: setIsDiagnosticDialogOpen
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
