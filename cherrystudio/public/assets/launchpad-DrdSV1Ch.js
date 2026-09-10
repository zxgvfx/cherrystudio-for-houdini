import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./es2015-wfS3L7va.js";
import "./with-selector-DlsRhNV6.js";
import { n as arrayMove } from "./sortable.esm-TnTcc6bt.js";
import { t as sortable_default } from "./sortable-Bb0ELiBR.js";
import "./command-CyHQabGE.js";
import { n as CommandContextMenu } from "./command-B9oiyMDG.js";
import "./useCloseBeforeAction-DvYaYpLC.js";
import "./ipc-DpcwPFwy.js";
import { C as reorderLaunchpadApps, f as REQUIRED_SIDEBAR_FAVORITES, p as getOrderedLaunchpadApps, v as getSidebarMenuPath } from "./tab-CVOgL8bf.js";
import "./useWindowInitData-BzKs7Qq9.js";
import "./mainWindowNavigation-Dpzd_Ttr.js";
import "./CacheService-IyXh62g9.js";
import "./useCache-lF6Sw_ck.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./useReorder-Cmki1Ln4.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { o as useSidebarFavorites, t as useMiniApps } from "./useMiniApps-w5WTSbIS.js";
import "./miniAppsLogo-Gym76iTp.js";
import "./iconDisplayConfig-CBD1yQwA.js";
import "./MiniAppIcon-B1yD6RY_.js";
import "./mcp-BGt1L-d_.js";
import { l as getSidebarIconLabelKey } from "./label-CSb71add.js";
import { t as SIDEBAR_ICON_COMPONENTS } from "./sidebarIcons-B7OCRlhJ.js";
import { t as useNavigate } from "./useNavigate-Bl6k0zLr.js";
import "./MarqueeText-DgzQ8dVh.js";
import { t as Scrollbar_default } from "./Scrollbar-CjwT5bYS.js";
import "./IndicatorLight-KgutY_bW.js";
import { t as MiniApp_default } from "./MiniApp-u3e0dxTn.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLaunchpadAppOrder() {
	const { t } = useTranslation();
	const [appOrder, setAppOrder] = usePreference("ui.launchpad.app_order");
	return {
		orderedAppIds: (0, import_react.useMemo)(() => getOrderedLaunchpadApps(appOrder), [appOrder]),
		reorderApps: (0, import_react.useCallback)((orderedIds) => {
			setAppOrder(reorderLaunchpadApps(appOrder, orderedIds)).catch(() => {
				toast.error(t("common.error"));
			});
		}, [
			appOrder,
			setAppOrder,
			t
		])
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var BASE_URL = "https://www.cherry-ai.com/";
var REQUIRED_SIDEBAR_FAVORITE_SET = new Set(REQUIRED_SIDEBAR_FAVORITES);
var LAUNCHPAD_GRID_CLASS = "grid grid-cols-6 justify-items-center gap-2 px-2";
var LAUNCHPAD_ITEM_CLASS = "mx-auto w-[92px]";
var SORTABLE_CONTENTS_STYLE = { display: "contents" };
var APP_ICON_BACKGROUNDS = {
	assistants: "linear-gradient(135deg, #1F2937, #374151)",
	agents: "linear-gradient(135deg, #2563EB, #38BDF8)",
	ai_pipeline: "linear-gradient(135deg, #7C3AED, #2563EB)",
	paintings: "linear-gradient(135deg, #EC4899, #F472B6)",
	translate: "linear-gradient(135deg, #06B6D4, #0EA5E9)",
	mini_app: "linear-gradient(135deg, #8B5CF6, #A855F7)",
	knowledge: "linear-gradient(135deg, #10B981, #34D399)",
	files: "linear-gradient(135deg, #F59E0B, #FBBF24)",
	code_tools: "linear-gradient(135deg, #4B5563, #6B7280)",
	notes: "linear-gradient(135deg, #F97316, #FB923C)"
};
function LaunchpadPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [defaultPaintingProvider] = usePreference("feature.paintings.default_provider");
	const { pinned, reorderMiniAppsByStatus } = useMiniApps();
	const { appFavorites, setAppPinned } = useSidebarFavorites();
	const { orderedAppIds, reorderApps } = useLaunchpadAppOrder();
	const suppressClickUntilRef = (0, import_react.useRef)(0);
	const draggedItemIdRef = (0, import_react.useRef)(null);
	const visibleSidebarFavoriteSet = (0, import_react.useMemo)(() => new Set(appFavorites), [appFavorites]);
	const handleSortableDragStart = (0, import_react.useCallback)((event) => {
		draggedItemIdRef.current = String(event.active.id);
		suppressClickUntilRef.current = Date.now() + 500;
	}, []);
	const handleSortableDragSettled = (0, import_react.useCallback)(() => {
		suppressClickUntilRef.current = Date.now() + 500;
	}, []);
	const shouldSuppressLaunchClick = (0, import_react.useCallback)((id) => id === draggedItemIdRef.current && Date.now() < suppressClickUntilRef.current, []);
	const navigateToUrl = (0, import_react.useCallback)((url) => {
		const parsedUrl = new URL(url, BASE_URL);
		if (parsedUrl.search) return navigate({
			to: parsedUrl.pathname,
			search: Object.fromEntries(parsedUrl.searchParams.entries())
		});
		return navigate({ to: parsedUrl.pathname });
	}, [navigate]);
	const openLaunchpadItem = (favorite) => {
		if (shouldSuppressLaunchClick(favorite)) return;
		const path = getSidebarMenuPath(favorite, defaultPaintingProvider);
		if (!path) return;
		navigateToUrl(path);
	};
	const openMiniApp = (app) => {
		if (shouldSuppressLaunchClick(app.appId)) return;
		navigateToUrl(`/app/mini-app/${app.appId}`);
	};
	const pinToSidebar = (0, import_react.useCallback)((favorite) => {
		if (visibleSidebarFavoriteSet.has(favorite)) return;
		setAppPinned(favorite, true);
	}, [setAppPinned, visibleSidebarFavoriteSet]);
	const unpinFromSidebar = (0, import_react.useCallback)((favorite) => {
		if (!visibleSidebarFavoriteSet.has(favorite) || REQUIRED_SIDEBAR_FAVORITE_SET.has(favorite)) return;
		setAppPinned(favorite, false);
	}, [setAppPinned, visibleSidebarFavoriteSet]);
	const getAppContextMenuItems = (0, import_react.useCallback)((favorite) => {
		const isPinned = visibleSidebarFavoriteSet.has(favorite);
		return [{
			type: "item",
			id: `launchpad.${isPinned ? "unpin-from-sidebar" : "pin-to-sidebar"}.${favorite}`,
			label: t(isPinned ? "launchpad.unpin_from_sidebar" : "launchpad.pin_to_sidebar"),
			enabled: !isPinned || !REQUIRED_SIDEBAR_FAVORITE_SET.has(favorite),
			onSelect: () => isPinned ? unpinFromSidebar(favorite) : pinToSidebar(favorite)
		}];
	}, [
		pinToSidebar,
		t,
		unpinFromSidebar,
		visibleSidebarFavoriteSet
	]);
	const appMenuItems = (0, import_react.useMemo)(() => orderedAppIds.flatMap((favorite) => {
		const Icon = SIDEBAR_ICON_COMPONENTS[favorite];
		if (!Icon || !getSidebarMenuPath(favorite, defaultPaintingProvider)) return [];
		return [{
			id: favorite,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 32 }),
			text: t(getSidebarIconLabelKey(favorite)),
			bgColor: APP_ICON_BACKGROUNDS[favorite],
			menuItems: getAppContextMenuItems(favorite)
		}];
	}), [
		defaultPaintingProvider,
		getAppContextMenuItems,
		orderedAppIds,
		t
	]);
	const sortedMiniApps = (0, import_react.useMemo)(() => [...pinned].sort((a, b) => a.orderKey < b.orderKey ? -1 : a.orderKey > b.orderKey ? 1 : 0), [pinned]);
	const [orderedMiniApps, setOrderedMiniApps] = (0, import_react.useState)(sortedMiniApps);
	(0, import_react.useEffect)(() => {
		setOrderedMiniApps((prev) => sameMiniAppItems(prev, sortedMiniApps) ? prev : sortedMiniApps);
	}, [sortedMiniApps]);
	const launchpadMiniAppsVisible = orderedMiniApps.length > 0;
	const handleAppsSortEnd = (0, import_react.useCallback)(({ oldIndex, newIndex }) => {
		reorderApps(arrayMove(appMenuItems, oldIndex, newIndex).map((item) => item.id));
	}, [appMenuItems, reorderApps]);
	const handleMiniAppsSortEnd = (0, import_react.useCallback)(({ oldIndex, newIndex }) => {
		const nextItems = arrayMove(orderedMiniApps, oldIndex, newIndex);
		setOrderedMiniApps(nextItems);
		reorderMiniAppsByStatus("pinned", nextItems).catch(() => {
			toast.error(t("miniApp.reorder_failed"));
		});
	}, [
		orderedMiniApps,
		reorderMiniAppsByStatus,
		t
	]);
	const renderAppMenuItem = (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: item.menuItems,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => openLaunchpadItem(item.id),
			className: `${LAUNCHPAD_ITEM_CLASS} group flex cursor-pointer flex-col items-center gap-1 rounded-2xl px-1 py-2 text-center outline-none transition-transform duration-200 hover:scale-105 focus-visible:scale-105 active:scale-95`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative flex size-14 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-14 items-center justify-center rounded-2xl text-white shadow-sm [&_svg]:size-7 [&_svg]:text-white",
					style: { background: item.bgColor },
					children: item.icon
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-foreground",
				children: item.text
			})]
		})
	}, item.id);
	const renderMiniAppItem = (app) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "launchpad.render-mini-app-item",
		className: `${LAUNCHPAD_ITEM_CLASS} flex justify-center rounded-[8px] px-0 py-2 transition-transform duration-200 hover:scale-105 active:scale-95`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniApp_default, {
			app,
			size: 56,
			variant: "launchpad",
			onOpen: openMiniApp
		})
	}, app.appId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "launchpad.page",
		className: "flex h-full min-h-0 flex-col bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-180 flex-col gap-5 py-12.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "m-0 px-9 py-0 font-semibold text-[14px] text-foreground opacity-80",
						children: t("launchpad.apps")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: LAUNCHPAD_GRID_CLASS,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(sortable_default, {
							items: appMenuItems,
							itemKey: "id",
							layout: "grid",
							listStyle: SORTABLE_CONTENTS_STYLE,
							onDragStart: handleSortableDragStart,
							onDragEnd: handleSortableDragSettled,
							onDragCancel: handleSortableDragSettled,
							onSortEnd: handleAppsSortEnd,
							renderItem: (item) => renderAppMenuItem(item)
						})
					})]
				}), launchpadMiniAppsVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "m-0 px-9 py-0 font-semibold text-[14px] text-foreground opacity-80",
						children: t("launchpad.miniApps")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: LAUNCHPAD_GRID_CLASS,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(sortable_default, {
							items: orderedMiniApps,
							itemKey: "appId",
							layout: "grid",
							listStyle: SORTABLE_CONTENTS_STYLE,
							onDragStart: handleSortableDragStart,
							onDragEnd: handleSortableDragSettled,
							onDragCancel: handleSortableDragSettled,
							onSortEnd: handleMiniAppsSortEnd,
							renderItem: (app) => renderMiniAppItem(app)
						})
					})]
				})]
			})
		})
	});
}
function sameMiniAppItems(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
var SplitComponent = LaunchpadPage;
export { SplitComponent as component };
