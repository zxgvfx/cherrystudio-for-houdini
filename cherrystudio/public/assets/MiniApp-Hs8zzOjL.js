import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as ConfirmDialog } from "./confirm-dialog-B5-JWpzh.js";
import { n as CommandContextMenu } from "./command-Dkd9__0y.js";
import { i as useTabs } from "./tab-BoJ166Ld.js";
import { a as isDataApiError, i as ErrorCode, s as toDataApiError } from "./DataApiService-DP44jQXR.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { o as useSidebarFavorites, t as useMiniApps } from "./useMiniApps-Cw2wO8m-.js";
import { t as MiniAppIcon_default } from "./MiniAppIcon-2libIXG_.js";
import { t as IndicatorLight_default } from "./IndicatorLight-BCVMOCyh.js";
import { t as MarqueeText_default } from "./MarqueeText-DNBggU1n.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("App");
var MiniApp = ({ app, onClick, onOpen, onEditCustom, size = 60, isLast, variant = "default" }) => {
	const { t } = useTranslation();
	const { miniApps, pinned, openedKeepAliveMiniApps, currentMiniAppId, miniAppShow, setOpenedKeepAliveMiniApps, updateAppStatus, removeCustomMiniApp } = useMiniApps();
	const { miniAppFavoriteIds, toggleMiniApp } = useSidebarFavorites();
	const { openTab } = useTabs();
	const [removeConfirmOpen, setRemoveConfirmOpen] = (0, import_react.useState)(false);
	const [removingCustom, setRemovingCustom] = (0, import_react.useState)(false);
	const isPinned = pinned.some((p) => p.appId === app.appId);
	const isSidebarFavorite = miniAppFavoriteIds.includes(app.appId);
	const shouldShow = miniApps.some((m) => m.appId === app.appId) || isPinned;
	const isActive = miniAppShow && currentMiniAppId === app.appId;
	const isOpened = openedKeepAliveMiniApps.some((item) => item.appId === app.appId);
	const displayName = isLast ? t("settings.miniApps.custom.title") : app.nameKey ? t(app.nameKey) : app.name;
	const handleClick = () => {
		if (onOpen) onOpen(app, displayName);
		else openTab(`/app/mini-app/${app.appId}`, {
			title: displayName,
			icon: app.logoSrc ?? app.logo
		});
		onClick?.();
	};
	const handleKeyDown = (e) => {
		if (e.key !== "Enter" && e.key !== " ") return;
		e.preventDefault();
		handleClick();
	};
	const activationProps = variant === "launchpad" ? {
		onKeyDown: handleKeyDown,
		tabIndex: 0,
		role: "button",
		"aria-label": displayName
	} : {};
	const reportFailure = (fallbackKey) => (err) => {
		const e = toDataApiError(err);
		if (isDataApiError(e)) {
			logger.error("mutation failed", {
				code: e.code,
				message: e.message
			});
			toast.error(e.message || t(fallbackKey));
		} else {
			logger.error("mutation failed", err);
			toast.error(t(fallbackKey));
		}
	};
	const togglePinLabel = isPinned ? t("miniApp.remove_from_launchpad") : t("miniApp.add_to_launchpad");
	const handleTogglePin = () => {
		const nextStatus = isPinned ? "enabled" : "pinned";
		updateAppStatus(app.appId, nextStatus).catch(reportFailure(isPinned ? "miniApp.unpin_failed" : "miniApp.pin_failed"));
	};
	const handleToggleSidebarFavorite = () => {
		toggleMiniApp(app.appId);
	};
	const handleHide = () => {
		updateAppStatus(app.appId, "disabled").then(() => {
			setOpenedKeepAliveMiniApps((prev) => prev.filter((item) => item.appId !== app.appId));
		}).catch(reportFailure("miniApp.hide_failed"));
	};
	const handleRemoveCustom = async () => {
		setRemovingCustom(true);
		try {
			await removeCustomMiniApp(app.appId);
			toast.success(t("settings.miniApps.custom.remove_success"));
		} catch (error) {
			if (isDataApiError(error) && error.code === ErrorCode.NOT_FOUND) toast.warning(t("miniApp.error.not_found"));
			else toast.error(t("settings.miniApps.custom.remove_error"));
			logger.error("Failed to remove custom mini app:", error);
		} finally {
			setRemovingCustom(false);
		}
	};
	if (!shouldShow) return null;
	const isLaunchpad = variant === "launchpad";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: [
			{
				type: "item",
				id: "mini-app.toggle-pin",
				label: togglePinLabel,
				onSelect: handleTogglePin
			},
			{
				type: "item",
				id: "mini-app.toggle-sidebar-favorite",
				label: t(isSidebarFavorite ? "miniApp.remove_from_sidebar" : "miniApp.add_to_sidebar"),
				onSelect: handleToggleSidebarFavorite
			},
			...!isPinned ? [{
				type: "item",
				id: "mini-app.hide",
				label: t("miniApp.sidebar.hide.title"),
				onSelect: handleHide
			}] : [],
			...app.presetMiniAppId == null ? [...onEditCustom ? [{
				type: "item",
				id: "mini-app.edit-custom",
				label: t("common.edit"),
				onSelect: () => onEditCustom(app)
			}] : [], {
				type: "item",
				id: "mini-app.remove-custom",
				label: t("common.delete"),
				destructive: true,
				onSelect: () => setRemoveConfirmOpen(true)
			}] : []
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex cursor-pointer flex-col items-center justify-center overflow-hidden outline-none", isLaunchpad ? "min-h-[104px] w-[92px] bg-transparent pt-1 hover:[&_.mini-app-icon-frame]:bg-accent focus-visible:[&_.mini-app-icon-frame]:border-ring focus-visible:[&_.mini-app-icon-frame]:bg-accent" : "min-h-[85px]"),
			onClick: handleClick,
			...activationProps,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mini-app-icon-frame relative flex items-center justify-center", isLaunchpad && "size-[58px] rounded-[14px] border border-border-subtle bg-transparent transition-[border-color,background-color] duration-[160ms] ease-in-out motion-reduce:transition-none"),
				children: [isLaunchpad ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mini-app-icon-clip flex size-full items-center justify-center overflow-hidden rounded-[inherit]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppIcon_default, {
						size,
						app,
						appearance: "plain"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppIcon_default, {
					size,
					app,
					appearance: "avatar"
				}), isOpened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("absolute rounded-full bg-background", isLaunchpad ? "-right-[3px] -bottom-[3px] p-[3px] shadow-[0_0_0_1px_var(--border-subtle)]" : "-right-0.5 -bottom-0.5 p-0.5"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndicatorLight_default, {
						color: "var(--success)",
						size: 6,
						animation: !isActive
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("w-full select-none text-center text-muted-foreground", isLaunchpad ? "mt-2 min-h-9 max-w-[92px] overflow-hidden whitespace-normal text-[13px] leading-[18px] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] [overflow-wrap:anywhere]" : "mt-[5px] max-w-20 text-xs leading-normal"),
				children: isLaunchpad ? displayName : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeText_default, { children: displayName })
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: removeConfirmOpen,
		onOpenChange: setRemoveConfirmOpen,
		title: t("settings.miniApps.custom.remove_confirm_title"),
		description: t("settings.miniApps.custom.remove_confirm_description", { name: displayName }),
		confirmText: t("common.delete"),
		cancelText: t("common.cancel"),
		destructive: true,
		confirmLoading: removingCustom,
		onConfirm: handleRemoveCustom
	})] });
};
var MiniApp_default = MiniApp;
export { MiniApp_default as t };
