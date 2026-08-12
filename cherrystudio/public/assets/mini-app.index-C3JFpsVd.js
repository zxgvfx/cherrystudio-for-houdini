import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { C as string, S as strictObject, T as unknown, _ as object, a as array, n as _enum, o as boolean, p as literal } from "./schemas-CV_EtlSZ.js";
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
import { i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { a as DialogFooter, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
import { n as PageSidePanelItem, r as PageSidePanelSection, t as PageSidePanel } from "./page-side-panel-CF7JqFV7.js";
import { t as SearchInput } from "./search-input-Dk6EmZ7J.js";
import "./with-selector-BMhODuKS.js";
import "./sortable.esm-D8gcNQZE.js";
import { t as sortable_default } from "./sortable-BMb6uoEl.js";
import { t as Separator } from "./separator-DFnWafbO.js";
import { o as FieldLabel, t as Field } from "./field-v-3EhHEn.js";
import { t as Slider } from "./slider-_Xxahv5d.js";
import "./command-DAltNKKn.js";
import "./command-Dkd9__0y.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import "./tab-BoJ166Ld.js";
import "./useWindowInitData-C8-CHwDP.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-BAQAVa2r.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import { a as isDataApiError, s as toDataApiError } from "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./useReorder-CHjMnht2.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as useMiniApps } from "./useMiniApps-Cw2wO8m-.js";
import { t as ArrowLeftRight } from "./arrow-left-right-C5BnKrEM.js";
import { t as ArrowLeftToLine } from "./arrow-left-to-line-He_sl0wS.js";
import { t as ArrowRightToLine } from "./arrow-right-to-line-29RVSXTW.js";
import { t as Menu } from "./menu-BIhzz-9c.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as RotateCcw } from "./rotate-ccw-BS5J7gIn.js";
import { t as Undo2 } from "./undo-2-i2rnFWTV.js";
import { t as Upload } from "./upload-Djm0HR6v.js";
import "./miniAppsLogo-8mrhSRfF.js";
import "./iconDisplayConfig-Cg20Y17C.js";
import "./MiniAppIcon-2libIXG_.js";
import { p as prepareEntityImageBytes, s as checkEntityImageSize } from "./image-Bb803VSe.js";
import { t as uuid } from "./uuid-Z_-TZRDQ.js";
import { t as Scrollbar_default } from "./Scrollbar-CJJ8_OkK.js";
import "./IndicatorLight-BCVMOCyh.js";
import "./MarqueeText-DNBggU1n.js";
import { t as require_BeatLoader } from "./BeatLoader-C1rutxUY.js";
import { t as Selector_default } from "./Selector-CereZliw.js";
import { n as NavbarCenter, t as Navbar } from "./Navbar-Bq8ddDoN.js";
import { t as MiniApp_default } from "./MiniApp-Hs8zzOjL.js";
import "./LogoAvatar-DjLDqsEF.js";
import { t as MiniAppLogoAvatar_default } from "./MiniAppLogoAvatar-DSxlJ2nH.js";
var import_BeatLoader = /* @__PURE__ */ __toESM(require_BeatLoader());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DEFAULT_MAX_KEEPALIVE = 3;
var MiniAppDisplaySettings = () => {
	const { t } = useTranslation();
	const [maxKeepAlive, setMaxKeepAlive] = usePreference("feature.mini_app.max_keep_alive");
	const [openLinkExternal, setOpenLinkExternal] = usePreference("feature.mini_app.open_link_external");
	const [region = "auto", setRegion] = usePreference("feature.mini_app.region");
	const debounceTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
	}, []);
	const handleResetCacheLimit = (0, import_react.useCallback)(() => {
		setMaxKeepAlive(DEFAULT_MAX_KEEPALIVE);
		toast.info(t("settings.miniApps.cache_change_notice"));
	}, [t, setMaxKeepAlive]);
	const handleCacheChange = (0, import_react.useCallback)((value) => {
		setMaxKeepAlive(value);
		if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
		debounceTimerRef.current = setTimeout(() => {
			toast.info(t("settings.miniApps.cache_change_notice"));
			debounceTimerRef.current = null;
		}, 500);
	}, [t, setMaxKeepAlive]);
	const regionOptions = [
		{
			value: "auto",
			label: t("settings.miniApps.region.auto")
		},
		{
			value: "CN",
			label: t("settings.miniApps.region.cn")
		},
		{
			value: "Global",
			label: t("settings.miniApps.region.global")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelSection, {
		title: t("settings.miniApps.group.preferences"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelItem, {
					title: t("settings.miniApps.region.title"),
					description: t("settings.miniApps.region.description"),
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector_default, {
						size: 14,
						value: region,
						onChange: (v) => setRegion(v),
						options: regionOptions
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelItem, {
					title: t("settings.miniApps.open_link_external.title"),
					description: t("settings.miniApps.open_link_external.description"),
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: openLinkExternal,
						onCheckedChange: (v) => setOpenLinkExternal(v)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelItem, {
					title: t("settings.miniApps.cache_title"),
					description: t("settings.miniApps.cache_description"),
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("settings.miniApps.reset_tooltip"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							onClick: handleResetCacheLimit,
							className: "shrink-0 text-muted-foreground hover:text-foreground",
							"aria-label": t("settings.miniApps.reset_tooltip"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {})
						})
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							className: "flex-1",
							min: 1,
							max: 10,
							value: [maxKeepAlive ?? DEFAULT_MAX_KEEPALIVE],
							onValueChange: (v) => handleCacheChange(v[0]),
							showValueLabel: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 text-right text-muted-foreground text-xs",
							children: maxKeepAlive
						})]
					})
				})
			]
		})
	});
};
var MiniAppDisplaySettings_default = MiniAppDisplaySettings;
var MiniAppListColumn = ({ title, count, apps, onToggle, onReorder, emptyText, toggleAction }) => {
	const { t } = useTranslation();
	const Icon = toggleAction === "hide" ? ArrowRightToLine : ArrowLeftToLine;
	const getToggleLabel = (displayName) => toggleAction === "hide" ? t("settings.miniApps.hide_app", { name: displayName }) : t("settings.miniApps.show_app", { name: displayName });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "mini-apps.app-list-column",
		className: "flex min-h-0 min-w-0 flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 px-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tabular-nums",
				children: count
			})]
		}), apps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center justify-center px-2 py-6 text-center text-muted-foreground text-xs",
			children: emptyText
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
			className: "min-h-0 flex-1 overflow-x-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(sortable_default, {
				items: apps,
				itemKey: "appId",
				onSortEnd: ({ oldIndex, newIndex }) => onReorder(oldIndex, newIndex),
				gap: 2,
				renderItem: (app) => {
					const displayName = app.nameKey ? t(app.nameKey) : app.name;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: displayName,
						placement: "left",
						fullWidthTrigger: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-ui": "mini-apps.app-list-column.button",
							className: "flex w-full items-center gap-1.5 rounded-md px-2 py-0.5 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none",
							role: "button",
							tabIndex: 0,
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onToggle(app);
								}
							},
							onClick: (e) => {
								e.stopPropagation();
								onToggle(app);
							},
							"aria-label": getToggleLabel(displayName),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppLogoAvatar_default, {
									logo: app.logoSrc ?? app.logo,
									size: 16
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-left text-foreground text-sm",
									children: displayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-6 shrink-0 items-center justify-center text-foreground-tertiary",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
								})
							]
						})
					});
				}
			})
		})]
	});
};
var MiniAppListColumn_default = MiniAppListColumn;
var MiniAppListPair = ({ visible, hidden, hide, show, reorderVisible, reorderHidden, swap, reset }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanelSection, {
		title: t("settings.miniApps.group.display"),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "secondary",
			size: "sm",
			onClick: swap,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {}), t("common.swap")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "secondary",
			size: "sm",
			onClick: reset,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), t("common.reset")]
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid h-64 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 overflow-hidden rounded-lg bg-muted/40 p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppListColumn_default, {
					title: t("settings.miniApps.visible"),
					count: visible.length,
					apps: visible,
					onToggle: hide,
					onReorder: reorderVisible,
					toggleAction: "hide"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { orientation: "vertical" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppListColumn_default, {
					title: t("settings.miniApps.disabled"),
					count: hidden.length,
					apps: hidden,
					onToggle: show,
					onReorder: reorderHidden,
					toggleAction: "show",
					emptyText: t("settings.miniApps.empty")
				})
			]
		})
	});
};
var MiniAppListPair_default = MiniAppListPair;
var MiniAppSettingsPanel = ({ open, onClose, children }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSidePanel, {
		open,
		onClose,
		title: t("settings.miniApps.display_title"),
		closeLabel: t("common.close"),
		children
	});
};
var MiniAppSettingsPanel_default = MiniAppSettingsPanel;
var logger$1 = loggerService.withContext("useMiniAppVisibility");
function reportFailure(t, fallbackKey) {
	return (err) => {
		const e = toDataApiError(err);
		if (isDataApiError(e)) {
			logger$1.error("mutation failed", {
				code: e.code,
				message: e.message
			});
			toast.error(e.message || t(fallbackKey));
		} else {
			logger$1.error("mutation failed", err);
			toast.error(t(fallbackKey));
		}
	};
}
function useMiniAppVisibility() {
	const { t } = useTranslation();
	const { miniApps, disabled, updateAppStatus, setAppStatusBulk, reorderMiniAppsByStatus } = useMiniApps();
	const [visible, setVisible] = (0, import_react.useState)(miniApps);
	const [hidden, setHidden] = (0, import_react.useState)(disabled || []);
	(0, import_react.useEffect)(() => {
		setVisible((prev) => sameRowsByIdAndStatus(prev, miniApps) ? prev : miniApps);
		setHidden((prev) => sameRowsByIdAndStatus(prev, disabled || []) ? prev : disabled || []);
	}, [miniApps, disabled]);
	return {
		visible,
		hidden,
		swap: (0, import_react.useCallback)(() => {
			const movingToHidden = visible.filter((a) => a.status === "enabled");
			setVisible([...visible.filter((a) => a.status === "pinned"), ...hidden]);
			setHidden(movingToHidden);
			setAppStatusBulk([...movingToHidden.map((a) => ({
				appId: a.appId,
				status: "disabled"
			})), ...hidden.map((a) => ({
				appId: a.appId,
				status: "enabled"
			}))]).catch(reportFailure(t, "miniApps.update_partial_failure_generic"));
		}, [
			hidden,
			visible,
			setAppStatusBulk,
			t
		]),
		reset: (0, import_react.useCallback)(() => {
			setVisible([...visible, ...hidden]);
			setHidden([]);
			setAppStatusBulk(hidden.map((a) => ({
				appId: a.appId,
				status: "enabled"
			}))).catch(reportFailure(t, "miniApps.update_partial_failure_generic"));
		}, [
			visible,
			hidden,
			setAppStatusBulk,
			t
		]),
		hide: (0, import_react.useCallback)((app) => {
			setVisible((v) => v.filter((a) => a.appId !== app.appId));
			setHidden((h) => [...h, app]);
			updateAppStatus(app.appId, "disabled").catch(reportFailure(t, "miniApp.hide_failed"));
		}, [updateAppStatus, t]),
		show: (0, import_react.useCallback)((app) => {
			setHidden((h) => h.filter((a) => a.appId !== app.appId));
			setVisible((v) => [...v, app]);
			updateAppStatus(app.appId, "enabled").catch(reportFailure(t, "miniApp.show_failed"));
		}, [updateAppStatus, t]),
		reorderVisible: (0, import_react.useCallback)((oldIndex, newIndex) => {
			if (oldIndex === newIndex) return;
			const next = [...visible];
			const [moved] = next.splice(oldIndex, 1);
			next.splice(newIndex, 0, moved);
			setVisible(next);
			reorderMiniAppsByStatus("visible", next).catch(reportFailure(t, "miniApp.reorder_failed"));
		}, [
			visible,
			reorderMiniAppsByStatus,
			t
		]),
		reorderHidden: (0, import_react.useCallback)((oldIndex, newIndex) => {
			if (oldIndex === newIndex) return;
			const next = [...hidden];
			const [moved] = next.splice(oldIndex, 1);
			next.splice(newIndex, 0, moved);
			setHidden(next);
			reorderMiniAppsByStatus("disabled", next).catch(reportFailure(t, "miniApp.reorder_failed"));
		}, [
			hidden,
			reorderMiniAppsByStatus,
			t
		])
	};
}
function sameRowsByIdAndStatus(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (a[i].appId !== b[i].appId) return false;
		if (a[i].status !== b[i].status) return false;
	}
	return true;
}
const MiniAppStatusSchema = _enum([
	"enabled",
	"disabled",
	"pinned"
]);
const MiniAppRegionSchema = _enum(["CN", "Global"]);
object({
	appId: string(),
	presetMiniAppId: string().nullable(),
	status: MiniAppStatusSchema,
	orderKey: string(),
	name: string(),
	url: string(),
	logo: string().optional(),
	logoSrc: string().optional(),
	bordered: boolean().optional(),
	background: string().optional(),
	supportedRegions: array(MiniAppRegionSchema).optional(),
	configuration: unknown().optional(),
	nameKey: string().optional(),
	createdAt: string().optional(),
	updatedAt: string().optional()
});
const LogoKeySchema = string().min(1).max(2048).refine((v) => !/^(data:|file:|https?:)/i.test(v), "logo key must not be a data:, file:, or http(s): ref");
const CreateLogoSchema = strictObject({
	kind: literal("key"),
	key: LogoKeySchema
});
const MINI_APP_ID_REGEX = /^[A-Za-z0-9_-]+$/;
const MINI_APP_ALLOWED_URL_PROTOCOLS = [
	"http:",
	"https:",
	"file:"
];
const MiniAppUrlSchema = string().min(1).refine(isAllowedMiniAppUrl, { message: "url must be a valid http, https, or file URL" });
function isAllowedMiniAppUrl(value) {
	try {
		const url = new URL(value);
		return MINI_APP_ALLOWED_URL_PROTOCOLS.includes(url.protocol);
	} catch {
		return false;
	}
}
strictObject({
	appId: string().regex(MINI_APP_ID_REGEX, "appId can only contain letters, numbers, underscore, and hyphen"),
	name: string().min(1),
	url: MiniAppUrlSchema,
	logo: CreateLogoSchema.optional()
});
strictObject({
	status: MiniAppStatusSchema.optional(),
	name: string().min(1).optional(),
	url: MiniAppUrlSchema.optional()
});
strictObject({ status: MiniAppStatusSchema.optional() });
var logger = loggerService.withContext("NewMiniAppPanel");
var NewMiniAppPanel = ({ open, app, onClose }) => {
	const { t } = useTranslation();
	const { createCustomMiniApp, refreshCustomMiniApp, updateCustomMiniApp } = useMiniApps();
	const fileInputRef = (0, import_react.useRef)(null);
	const isEditing = app != null;
	const [name, setName] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [logo, setLogo] = (0, import_react.useState)("");
	const [stagedFile, setStagedFile] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const previewObjectUrlRef = (0, import_react.useRef)(null);
	const revokePreviewObjectUrl = () => {
		if (previewObjectUrlRef.current) {
			URL.revokeObjectURL(previewObjectUrlRef.current);
			previewObjectUrlRef.current = null;
		}
	};
	(0, import_react.useEffect)(() => () => revokePreviewObjectUrl(), []);
	const reset = () => {
		setName("");
		setUrl("");
		setLogo("");
		revokePreviewObjectUrl();
		setStagedFile(null);
	};
	(0, import_react.useEffect)(() => {
		revokePreviewObjectUrl();
		setStagedFile(null);
		if (!open || !app) {
			setName("");
			setUrl("");
			setLogo("");
			return;
		}
		setName(app.name);
		setUrl(app.url);
		setLogo(app.logo ?? app.logoSrc ?? "");
	}, [app, open]);
	const handleClose = () => {
		reset();
		onClose();
	};
	const handleOpenChange = (nextOpen) => {
		if (!nextOpen) handleClose();
	};
	const canSubmit = (0, import_react.useMemo)(() => Boolean(name.trim() && url.trim()) && !submitting, [
		name,
		submitting,
		url
	]);
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		const sizeError = checkEntityImageSize(file);
		if (sizeError) {
			toast.error(sizeError);
			return;
		}
		revokePreviewObjectUrl();
		previewObjectUrlRef.current = URL.createObjectURL(file);
		setLogo(previewObjectUrlRef.current);
		setStagedFile(file);
	};
	const handleSubmit = async () => {
		const trimmedUrl = url.trim();
		if (!MiniAppUrlSchema.safeParse(trimmedUrl).success) {
			toast.error(t("settings.miniApps.custom.url_invalid"));
			return;
		}
		setSubmitting(true);
		const basePayload = {
			name: name.trim(),
			url: trimmedUrl
		};
		const appId = app ? app.appId : uuid();
		try {
			if (isEditing) await updateCustomMiniApp(appId, basePayload);
			else await createCustomMiniApp({
				appId,
				...basePayload,
				logo: {
					kind: "key",
					key: "application"
				}
			});
		} catch (error) {
			toast.error(t("settings.miniApps.custom.save_error"));
			logger.error("Failed to save custom mini app:", error);
			setSubmitting(false);
			return;
		}
		let logoFailed = false;
		if (stagedFile) try {
			const data = await prepareEntityImageBytes(stagedFile);
			await ipcApi.request("mini_app.set_logo", {
				appId,
				image: {
					kind: "image",
					data
				}
			});
			await refreshCustomMiniApp(appId);
		} catch (error) {
			logoFailed = true;
			toast.error(t("settings.miniApps.custom.logo_upload_error"));
			logger.error("Failed to set custom mini app logo:", error);
		}
		if (!logoFailed) toast.success(t("settings.miniApps.custom.save_success"));
		handleClose();
		setSubmitting(false);
	};
	const hasUploadedLogo = stagedFile != null;
	const logoValue = logo.trim() || "application";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			"aria-describedby": void 0,
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(isEditing ? "settings.miniApps.custom.edit_title" : "settings.miniApps.custom.create_title") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-md outline-none transition-opacity focus-visible:opacity-80",
								onClick: () => fileInputRef.current?.click(),
								"aria-label": t("settings.miniApps.custom.logo_upload_label"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppLogoAvatar_default, {
									logo: logoValue,
									size: 64
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: hasUploadedLogo ? "secondary" : "outline",
									onClick: () => fileInputRef.current?.click(),
									className: "gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 12 }), t("settings.miniApps.custom.logo_file")]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: handleFileChange
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "miniapp-name",
							required: true,
							children: t("settings.miniApps.custom.name")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "miniapp-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: t("settings.miniApps.custom.name_placeholder")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "miniapp-url",
							required: true,
							children: t("settings.miniApps.custom.url")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "miniapp-url",
							value: url,
							onChange: (e) => setUrl(e.target.value),
							placeholder: t("settings.miniApps.custom.url_placeholder")
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: t("common.cancel")
					}) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSubmit,
					disabled: !canSubmit,
					loading: submitting,
					children: t("common.save")
				})] })
			]
		})
	});
};
var NewMiniAppPanel_default = NewMiniAppPanel;
var MINI_APPS_LOADING_COLOR = "var(--muted-foreground)";
var MiniAppsPage = () => {
	const { t } = useTranslation();
	const [search, setSearch] = (0, import_react.useState)("");
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [newAppOpen, setNewAppOpen] = (0, import_react.useState)(false);
	const [editingApp, setEditingApp] = (0, import_react.useState)(null);
	const { miniApps, isLoading, error } = useMiniApps();
	const visibility = useMiniAppVisibility();
	const filteredApps = search ? miniApps.filter((app) => app.name.toLowerCase().includes(search.toLowerCase()) || app.url.includes(search.toLowerCase())) : miniApps;
	const handleContextMenu = (e) => {
		e.preventDefault();
	};
	const closeCustomAppPanel = () => {
		setNewAppOpen(false);
		setEditingApp(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "mini-apps.view",
		className: "flex h-full min-h-0 flex-1 flex-col text-foreground",
		onContextMenu: handleContextMenu,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarCenter, {
			className: "border-r-0",
			children: t("miniApp.title")
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-0 flex-1 flex-col overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 items-start justify-end p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": t("settings.miniApps.custom.title"),
							onClick: () => {
								setEditingApp(null);
								setNewAppOpen(true);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": t("settings.miniApps.display_title"),
							onClick: () => setSettingsOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 14 })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mt-2 px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							onClear: () => setSearch(""),
							placeholder: t("common.search"),
							clearLabel: t("common.clear")
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
					className: "min-h-0 flex-1 px-8 pb-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex min-h-full w-full max-w-6xl flex-col",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_BeatLoader.default, {
								color: MINI_APPS_LOADING_COLOR,
								size: 8
							})
						}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 items-center justify-center text-muted-foreground text-xs",
							children: isDataApiError(error) ? error.message : t("common.error")
						}) : filteredApps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								preset: search ? "no-result" : "no-miniapp",
								title: search ? t("common.no_results") : t("miniApp.title")
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid w-full grid-cols-[repeat(auto-fill,minmax(84px,92px))] justify-center gap-x-4 gap-y-8 px-2 pt-12 pb-8 sm:gap-x-5 md:gap-x-6",
							children: filteredApps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniApp_default, {
								app,
								size: 56,
								variant: "launchpad",
								onEditCustom: setEditingApp
							}, app.appId))
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppSettingsPanel_default, {
					open: settingsOpen,
					onClose: () => setSettingsOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppListPair_default, { ...visibility }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppDisplaySettings_default, {})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewMiniAppPanel_default, {
					open: newAppOpen || editingApp != null,
					app: editingApp,
					onClose: closeCustomAppPanel
				})
			]
		})]
	});
};
var SplitComponent = MiniAppsPage;
export { SplitComponent as component };
