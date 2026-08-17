import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { i as formatErrorMessageWithPrefix } from "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import "./es2015-CF8XujIC.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import "./ipc-BuGMWdaI.js";
import { l as useCloseConversationTabs } from "./tab-BIOOjV6R.js";
import "./useWindowInitData-nzW1IbOc.js";
import "./mainWindowNavigation-BoKv8CTA.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./DataApiService-De4qIOPj.js";
import { a as useInvalidateCache, c as useQuery, o as useMutation } from "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as BotMessageSquare } from "./bot-message-square-DEYB2yM6.js";
import { t as CalendarClock } from "./calendar-clock-B62SVjLB.js";
import { t as FolderOpen } from "./folder-open-_dxyNNmN.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
import { t as MousePointerClick } from "./mouse-pointer-click-D1LLI_ed.js";
import { t as TriangleAlert } from "./triangle-alert-LSsyKFOW.js";
import "./systemProviderId-BF_COOhE.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("WorkspaceDeleteConfirmDialog");
function ImpactSection({ title, countLabel, emptyLabel, items, total, icon: Icon, fallbackName }) {
	const { t } = useTranslation();
	const hiddenCount = total - items.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.impact-section",
		className: "overflow-hidden rounded-lg border border-border-subtle bg-background-subtle",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-9 items-center justify-between border-border-subtle border-b px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-foreground text-xs",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-xs",
				children: countLabel
			})]
		}), items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "resource-catalog.impact-section.list",
			role: "list",
			"aria-label": title,
			tabIndex: 0,
			className: "max-h-32 overflow-y-auto p-1 outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset",
			children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "resource-catalog.impact-section.listitem",
				role: "listitem",
				className: "flex min-h-8 items-center gap-2 rounded-md px-2 py-1 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-hidden": "true",
					className: "size-3.5 shrink-0 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate text-foreground",
					title: item.name || void 0,
					children: item.name.trim() || fallbackName
				})]
			}, item.id)), hiddenCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ui": "resource-catalog.impact-section.listitem",
				role: "listitem",
				className: "px-2 py-1.5 text-center text-muted-foreground text-xs",
				children: t("agent.session.workdir.delete.more_count", { count: hiddenCount })
			}) : null]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 py-3 text-center text-muted-foreground text-xs",
			children: emptyLabel
		})]
	});
}
function WorkspaceDeleteConfirmDialog({ workspace, onDeleted, onClose }) {
	const { t } = useTranslation();
	const [isPending, setIsPending] = (0, import_react.useState)(false);
	const isPendingRef = (0, import_react.useRef)(false);
	const closeConversationTabs = useCloseConversationTabs();
	const invalidateCache = useInvalidateCache();
	const { data: references, isLoading: isReferencesLoading, isRefreshing: isReferencesRefreshing, error: referencesError, refetch: refetchReferences } = useQuery("/agent-workspaces/:workspaceId/references", {
		params: { workspaceId: workspace.id },
		swrOptions: { dedupingInterval: 0 }
	});
	const { trigger: deleteWorkspace } = useMutation("DELETE", "/agent-workspaces/:workspaceId", { refresh: [
		"/agent-sessions",
		"/agent-workspaces",
		"/pins",
		"/agent-channels",
		"/agent-tasks"
	] });
	const isPreviewPending = isReferencesLoading || isReferencesRefreshing;
	const canConfirm = references !== void 0 && !isPreviewPending && !referencesError && !isPending;
	const handleConfirm = async () => {
		if (!canConfirm || isPendingRef.current) return;
		isPendingRef.current = true;
		setIsPending(true);
		let hasSucceeded = false;
		try {
			const result = await deleteWorkspace({ params: { workspaceId: workspace.id } });
			closeConversationTabs("agents", result.deletedIds);
			try {
				await invalidateCache(result.deletedIds.map((sessionId) => `/agent-sessions/${sessionId}`));
			} catch (error) {
				logger.warn("Failed to refresh deleted session details", error, {
					workspaceId: workspace.id,
					sessionIds: result.deletedIds
				});
			}
			try {
				await onDeleted(workspace.id);
			} catch (error) {
				logger.warn("Failed to reconcile the deleted workspace selection", error, { workspaceId: workspace.id });
			}
			toast.success(t("common.delete_success"));
			hasSucceeded = true;
		} catch (error) {
			logger.error("Failed to delete workspace", error, { workspaceId: workspace.id });
			toast.error(formatErrorMessageWithPrefix(error, t("agent.session.workdir.delete.error.failed")));
		} finally {
			isPendingRef.current = false;
			setIsPending(false);
		}
		if (hasSucceeded) onClose();
	};
	const content = references ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.workspace-delete-confirm-dialog",
		className: "min-h-0 space-y-3 overflow-y-auto",
		children: [
			isPreviewPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"aria-hidden": "true",
					className: "size-3.5 animate-spin"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("agent.session.workdir.delete.preview_loading") })]
			}) : null,
			referencesError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-lg bg-error-subtle px-3 py-2 text-error-subtle-foreground text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"aria-hidden": "true",
						className: "size-3.5 shrink-0"
					}), t("agent.session.workdir.delete.preview_failed")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => void refetchReferences(),
					children: t("common.retry")
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactSection, {
				title: t("agent.session.workdir.delete.sessions_title"),
				countLabel: t("agent.session.workdir.delete.sessions_count", { count: references.sessions.total }),
				emptyLabel: t("agent.session.workdir.delete.sessions_empty"),
				items: references.sessions.items,
				total: references.sessions.total,
				icon: MousePointerClick,
				fallbackName: t("agent.session.new")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactSection, {
				title: t("agent.session.workdir.delete.channels_title"),
				countLabel: t("agent.session.workdir.delete.channels_count", { count: references.channels.total }),
				emptyLabel: t("agent.session.workdir.delete.channels_empty"),
				items: references.channels.items,
				total: references.channels.total,
				icon: BotMessageSquare,
				fallbackName: t("common.unnamed")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactSection, {
				title: t("agent.session.workdir.delete.tasks_title"),
				countLabel: t("agent.session.workdir.delete.tasks_count", { count: references.tasks.total }),
				emptyLabel: t("agent.session.workdir.delete.tasks_empty"),
				items: references.tasks.items,
				total: references.tasks.total,
				icon: CalendarClock,
				fallbackName: t("agent.session.new")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 rounded-lg bg-background-subtle px-3 py-2 text-muted-foreground text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
					"aria-hidden": "true",
					className: "mt-0.5 size-3.5 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("agent.session.workdir.delete.disk_preserved") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 break-all font-mono text-foreground",
						children: workspace.path
					})]
				})]
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "resource-catalog.workspace-delete-confirm-dialog",
		className: "flex min-h-24 items-center justify-center gap-2 text-muted-foreground text-xs",
		children: referencesError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				"aria-hidden": "true",
				className: "size-3.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("agent.session.workdir.delete.preview_failed") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => void refetchReferences(),
				children: t("common.retry")
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			"aria-hidden": "true",
			className: "size-3.5 animate-spin"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("agent.session.workdir.delete.preview_loading") })] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (open) => {
			if (!open && !isPendingRef.current) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			motion: "fade-scale",
			showCloseButton: false,
			closeOnOverlayClick: !isPending,
			className: "max-h-[calc(100vh-2rem)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("agent.session.workdir.delete.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("agent.session.workdir.delete.preview", { name: workspace.name }) })] }),
				content,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: isPending,
					onClick: onClose,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					loading: isPending,
					disabled: !canConfirm,
					onClick: () => void handleConfirm(),
					children: t("common.delete")
				})] })
			]
		})
	});
}
export { WorkspaceDeleteConfirmDialog };
