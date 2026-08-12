import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import "./providerSettings-Dq9K8OTx.js";
import "./aiGeneration-Dqw73yb1.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Alert } from "./alert-BwuKGcCL.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as DropzoneEmptyState, t as Dropzone } from "./dropzone-CywehDMq.js";
import { n as motion } from "./react-DY3ULJV9.js";
import { t as AnimatePresence } from "./AnimatePresence-o8FLtg_-.js";
import "./es2015-DmjbZU9-.js";
import { r as DialogContent, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Input } from "./input-dvr72LyA.js";
import "./EmojiPicker-CYC1xIM1.js";
import { t as Input$1 } from "./textarea-Djv1FqZD.js";
import "./esm-Dju_3aAK.js";
import "./dist-CoUlMpOM.js";
import "./diff-HM2C_nqz.js";
import "./with-selector-BMhODuKS.js";
import "./lib-BGOUa2xQ.js";
import "./chunk-BO2N2NFS-DyWf1fK6.js";
import "./citations-CtEFOa63.js";
import "./marked.esm-Dt1bmnBy.js";
import "./dist-CAn2sUiv.js";
import "./sortable.esm-D8gcNQZE.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-C7Ec2BdI.js";
import "./useTheme-C0NcZaKl.js";
import "./command-DAltNKKn.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import "./ipc-BDTAufGC.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-BAQAVa2r.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./model-CfoN7z8F.js";
import "./message-By01RpZa.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Clipboard } from "./clipboard-BumApv-w.js";
import { t as FileJson } from "./file-json-DevY5aGY.js";
import { t as Import } from "./import-D1Hu7eUd.js";
import { t as Link } from "./link-BO4yT8hH.js";
import "./mcp-UjkdK7II.js";
import "./label-CBJ9J2cR.js";
import "./provider-AVUknhIB.js";
import "./model-3irbiX6r.js";
import "./EventService-DaL7yYFd.js";
import "./uiParts-CtZmiNbl.js";
import "./useModel-wPmUe3o8.js";
import "./useProvider-BIst-GY7.js";
import { h as isNonChatModel } from "./model-Z1svQByC.js";
import { r as useAgentModelFilter } from "./ModelSelector-Dwt-BrMn.js";
import "./group-DOJrEsBN.js";
import "./knowledge-DMDRrLza.js";
import "./transport-CTTVYBal.js";
import "./useAssistant-D7pB4IBa.js";
import "./ModelAvatar-BgaF2qGi.js";
import "./BracesVariableIcon-YFiUNfgi.js";
import { v as SystemSkillDialog, x as ImportSkillDialog, y as SkillMarketplaceDialog } from "./EditDialogShared-CX4x_OiL.js";
import "./edit-BosS5ue_.js";
import { f as AssistantTransferError, p as parseAssistantImportContent, y as useImportAssistantMutation } from "./resourceCatalog-Bd6dsVEl.js";
import "./PermissionModeOption-BMvGaWwP.js";
import "./agent-BnqSANST.js";
import "./useKnowledgeBase-BQiV-Uju.js";
import { t as ResourceEditDialogHost } from "./ResourceEditDialogHost-c1VwzM2t.js";
import "./useMcpRuntimeStatus-B1mtExmO.js";
import "./CreateGroupDialog-BBFEzR8V.js";
import { t as ResourceCreateWizard } from "./create-D6tLEa9r.js";
import { i as SkillDetailDialog_default, t as AssistantLibraryDialog } from "./AssistantLibraryDialog-BD-Qn73T.js";
import { t as sanitizeUrl } from "./dist-BXLFosvn.js";
import "./useBundledCatalog-B1h8EHfw.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ALLOWED_FETCH_PROTOCOLS = new Set(["http:", "https:"]);
var ALLOWED_FETCH_HOSTS = new Set(["gist.githubusercontent.com", "raw.githubusercontent.com"]);
var FETCH_TIMEOUT_MS = 15e3;
var MAX_IMPORT_BYTES = 5 * 1024 * 1024;
var AUTO_CLOSE_DELAY_MS = 1200;
var IMPORT_ERROR_I18N_KEYS = { invalid_format: "assistants.presets.import.error.invalid_format" };
function validateAssistantImportUrl(raw) {
	try {
		const rawUrl = new URL(raw);
		if (!ALLOWED_FETCH_PROTOCOLS.has(rawUrl.protocol)) return {
			ok: false,
			errorKey: "library.import_dialog.error.unsupported_protocol"
		};
		const safeUrl = sanitizeUrl(raw);
		const parsed = new URL(safeUrl);
		if (!ALLOWED_FETCH_PROTOCOLS.has(parsed.protocol)) return {
			ok: false,
			errorKey: "library.import_dialog.error.unsupported_protocol"
		};
		if (!ALLOWED_FETCH_HOSTS.has(parsed.hostname)) return {
			ok: false,
			errorKey: "library.import_dialog.error.invalid_url"
		};
		return {
			ok: true,
			url: safeUrl
		};
	} catch {
		return {
			ok: false,
			errorKey: "library.import_dialog.error.invalid_url"
		};
	}
}
function isAssistantImportResponseTooLarge(headers) {
	const declaredLength = Number(headers.get("content-length") ?? "");
	return Number.isFinite(declaredLength) && declaredLength > MAX_IMPORT_BYTES;
}
function isAssistantImportContentTooLarge(content) {
	return content.length > MAX_IMPORT_BYTES;
}
function createAssistantImportFetchInit() {
	return {
		credentials: "omit",
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
	};
}
function summarizeAssistantImportOutcomes(outcomes, t, fileName) {
	const successes = outcomes.filter((o) => o.kind === "ok").length;
	const failures = outcomes.filter((o) => o.kind === "failed");
	if (failures.length === 0) return {
		kind: "success",
		message: fileName ? t("library.import_dialog.success", { name: fileName }) : t("message.agents.imported", { count: successes })
	};
	const first = failures[0];
	if (successes > 0) return {
		kind: "error",
		message: t("library.import_dialog.partial_success", {
			success: successes,
			failed: failures.length,
			first_name: first.name,
			first_error: first.error
		})
	};
	return {
		kind: "error",
		message: t("library.import_dialog.failure", { error: first.error })
	};
}
function ImportAssistantDialog({ open, onOpenChange, onImported }) {
	const { t } = useTranslation();
	const { importAssistant } = useImportAssistantMutation();
	const [tab, setTab] = (0, import_react.useState)("file");
	const [clipboardText, setClipboardText] = (0, import_react.useState)("");
	const [urlText, setUrlText] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)({ kind: "idle" });
	const [loading, setLoading] = (0, import_react.useState)(false);
	const autoCloseTimerRef = (0, import_react.useRef)(null);
	const clearAutoCloseTimer = (0, import_react.useCallback)(() => {
		if (!autoCloseTimerRef.current) return;
		clearTimeout(autoCloseTimerRef.current);
		autoCloseTimerRef.current = null;
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) {
			clearAutoCloseTimer();
			setTab("file");
			setClipboardText("");
			setUrlText("");
			setStatus({ kind: "idle" });
			setLoading(false);
		}
	}, [clearAutoCloseTimer, open]);
	const close = () => {
		if (loading) return;
		onOpenChange(false);
	};
	const runImport = async (content, source, fileName) => {
		setLoading(true);
		setStatus({ kind: "idle" });
		let drafts;
		try {
			drafts = parseAssistantImportContent(content);
		} catch (error) {
			setStatus({
				kind: "error",
				message: error instanceof AssistantTransferError ? t(IMPORT_ERROR_I18N_KEYS[error.code]) : error instanceof Error ? error.message : t("message.agents.import.error")
			});
			setLoading(false);
			return;
		}
		const outcomes = [];
		for (const draft of drafts) try {
			const groupName = draft.groupName?.trim();
			await importAssistant({
				...draft.dto,
				...groupName ? { groupName } : {}
			});
			outcomes.push({ kind: "ok" });
		} catch (error) {
			outcomes.push({
				kind: "failed",
				name: draft.dto.name,
				error: error instanceof Error ? error.message : t("message.agents.import.error")
			});
		}
		await onImported?.();
		const nextStatus = summarizeAssistantImportOutcomes(outcomes, t, fileName);
		setStatus(nextStatus);
		if (nextStatus.kind === "success") {
			toast.success(nextStatus.message);
			if (source !== "file") {
				clearAutoCloseTimer();
				autoCloseTimerRef.current = setTimeout(() => {
					autoCloseTimerRef.current = null;
					onOpenChange(false);
				}, AUTO_CLOSE_DELAY_MS);
			}
		} else toast.error(nextStatus.message);
		setLoading(false);
	};
	const readFileOrBail = async (file) => {
		if (file.size > MAX_IMPORT_BYTES) {
			setStatus({
				kind: "error",
				message: t("library.import_dialog.error.file_too_large")
			});
			return null;
		}
		return file.text();
	};
	const handleFileDrop = async (file) => {
		if (loading) return;
		if (!file) return;
		const content = await readFileOrBail(file);
		if (content === null) return;
		await runImport(content, "file", file.name);
	};
	const handleClipboardImport = () => {
		if (!clipboardText.trim()) return;
		if (clipboardText.length > MAX_IMPORT_BYTES) {
			setStatus({
				kind: "error",
				message: t("library.import_dialog.error.content_too_large")
			});
			return;
		}
		runImport(clipboardText, "clipboard");
	};
	const handleUrlImport = async () => {
		const raw = urlText.trim();
		if (!raw) return;
		const validation = validateAssistantImportUrl(raw);
		if (!validation.ok) {
			setStatus({
				kind: "error",
				message: t(validation.errorKey)
			});
			return;
		}
		setLoading(true);
		setStatus({ kind: "idle" });
		try {
			const response = await fetch(validation.url, createAssistantImportFetchInit());
			if (!response.ok) throw new Error(t("assistants.presets.import.error.fetch_failed"));
			if (isAssistantImportResponseTooLarge(response.headers)) throw new Error(t("library.import_dialog.error.response_too_large"));
			const content = await response.text();
			if (isAssistantImportContentTooLarge(content)) throw new Error(t("library.import_dialog.error.response_too_large"));
			setLoading(false);
			await runImport(content, "url");
		} catch (error) {
			setLoading(false);
			setStatus({
				kind: "error",
				message: error instanceof DOMException && error.name === "TimeoutError" ? t("library.import_dialog.error.timeout") : error instanceof Error ? error.message : t("message.agents.import.error")
			});
		}
	};
	const tabs = [
		{
			id: "file",
			label: t("library.import_dialog.tab.file"),
			icon: Import
		},
		{
			id: "clipboard",
			label: t("library.import_dialog.tab.clipboard"),
			icon: Clipboard
		},
		{
			id: "url",
			label: t("library.import_dialog.tab.url"),
			icon: Link
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v && !loading) close();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: !loading,
			className: "overflow-hidden",
			onPointerDownOutside: (event) => loading && event.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-foreground text-lg leading-none",
					children: t("assistants.presets.import.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground text-sm",
					children: t("library.import_dialog.subtitle")
				})] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "h-auto w-auto justify-start gap-1 bg-transparent p-0",
						children: tabs.map((tabDef) => {
							const Icon = tabDef.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: tabDef.id,
								className: "flex h-8 flex-none items-center gap-1.5 rounded-md border-0 bg-transparent px-3 text-muted-foreground text-xs shadow-none hover:bg-accent hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tabDef.label })]
							}, tabDef.id);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-52",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
						mode: "wait",
						children: [
							tab === "file" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 6
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -6
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropzone, {
									accept: { "application/json": [".json"] },
									disabled: loading,
									maxFiles: 1,
									onDrop: (files) => void handleFileDrop(files[0]),
									onError: () => setStatus({
										kind: "error",
										message: t("assistants.presets.import.error.invalid_format")
									}),
									className: "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-border-subtle border-dashed bg-transparent p-8 text-center shadow-none transition-colors hover:border-border-strong hover:bg-accent disabled:pointer-events-none disabled:opacity-60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropzoneEmptyState, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Import, {
											size: 24,
											strokeWidth: 1.2,
											className: "mb-3 text-foreground-tertiary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-1 text-muted-foreground text-xs",
											children: t("library.import_dialog.file.drop_hint")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-xs",
											children: t("library.import_dialog.file.formats")
										})
									] })
								})
							}, "file"),
							tab === "clipboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 6
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -6
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: clipboardText,
									onValueChange: setClipboardText,
									disabled: loading,
									placeholder: t("library.import_dialog.clipboard.placeholder"),
									className: "h-32 min-h-0 w-full resize-none rounded-md border border-input bg-background p-3 font-mono text-foreground text-xs shadow-none placeholder:text-muted-foreground disabled:cursor-not-allowed [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)] [&::-webkit-scrollbar]:w-1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "emphasis",
									size: "sm",
									onClick: handleClipboardImport,
									disabled: !clipboardText.trim() || loading,
									className: "mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, {
										size: 12,
										className: "lucide-custom"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("library.import_dialog.clipboard.button") })]
								})]
							}, "clipboard"),
							tab === "url" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 6
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -6
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-3 text-muted-foreground text-xs",
										children: t("library.import_dialog.url.hint")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: urlText,
										onChange: (e) => setUrlText(e.target.value),
										disabled: loading,
										placeholder: "https://gist.github.com/...",
										className: "font-mono text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "emphasis",
											size: "sm",
											onClick: () => void handleUrlImport(),
											disabled: !urlText.trim() || loading,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												size: 12,
												className: "lucide-custom"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("library.import_dialog.url.button") })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-xs",
											children: t("library.import_dialog.url.supports")
										})]
									})
								]
							}, "url")
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, { status })]
				})
			]
		})
	});
}
function StatusBanner({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [status.kind === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: { opacity: 0 },
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
			type: "success",
			showIcon: true,
			message: status.message,
			className: "rounded-md px-3 py-2 text-xs shadow-none"
		})
	}), status.kind === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: { opacity: 0 },
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
			type: "error",
			showIcon: true,
			message: status.message,
			className: "rounded-md px-3 py-2 text-xs shadow-none"
		})
	})] });
}
function ResourceCatalogDialogs({ dialogs, onOpenAssistantChat, onRefetch, resourceType }) {
	const agentModelFilter = useAgentModelFilter("claude-code");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillDetailDialog_default, {
			skill: dialogs.selectedSkill,
			open: Boolean(dialogs.selectedSkill),
			onOpenChange: (open) => {
				if (!open) dialogs.setSelectedSkill(null);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAssistantDialog, {
			open: dialogs.assistantImportOpen,
			onOpenChange: dialogs.setAssistantImportOpen,
			onImported: onRefetch
		}),
		resourceType === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantLibraryDialog, {
			open: dialogs.assistantLibraryOpen,
			onOpenChange: dialogs.setAssistantLibraryOpen,
			onAssistantAdded: onRefetch,
			onOpenAssistantChat
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportSkillDialog, {
			open: dialogs.skillImportOpen,
			onOpenChange: dialogs.setSkillImportOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillMarketplaceDialog, {
			open: dialogs.skillMarketplaceOpen,
			onOpenChange: dialogs.setSkillMarketplaceOpen
		}),
		resourceType === "skill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemSkillDialog, {
			mode: "manage",
			open: dialogs.systemSkillOpen,
			onOpenChange: dialogs.setSystemSkillOpen
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceCreateWizard, {
			kind: dialogs.createDialogKind ?? "assistant",
			open: dialogs.createDialogOpen,
			isSubmitting: dialogs.creatingResource,
			modelFilter: dialogs.createDialogKind === "agent" ? agentModelFilter : (candidate) => !isNonChatModel(candidate),
			onOpenChange: dialogs.handleCreateDialogOpenChange,
			onSubmit: dialogs.handleSubmitCreateResource
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceEditDialogHost, {
			target: dialogs.editDialogTarget,
			onOpenChange: (open) => {
				if (!open) dialogs.setEditDialogTarget(null);
			}
		})
	] });
}
export { ResourceCatalogDialogs };
