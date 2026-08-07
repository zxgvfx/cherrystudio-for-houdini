import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./es2015-DmjbZU9-.js";
import "./with-selector-BMhODuKS.js";
import { n as arrayMove } from "./sortable.esm-D8gcNQZE.js";
import { t as sortable_default } from "./sortable-BMb6uoEl.js";
import "./command-DJV4tTI9.js";
import { n as CommandContextMenu } from "./command-lPk0rc3k.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import "./ipc-BDTAufGC.js";
import { f as REQUIRED_SIDEBAR_FAVORITES, m as getOrderedLaunchpadApps, w as reorderLaunchpadApps, y as getSidebarMenuPath } from "./tab-CbOwJVjs.js";
import "./useWindowInitData-C8-CHwDP.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-DwBoGlJ5.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./useReorder-CHjMnht2.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { o as useSidebarFavorites, t as useMiniApps } from "./useMiniApps-BL2SCXxq.js";
import "./miniAppsLogo-DhM5E0jZ.js";
import "./iconDisplayConfig-Cn5AH07m.js";
import "./MiniAppIcon-CZPT_UfC.js";
import "./mcp-BYi31fTn.js";
import { l as getSidebarIconLabelKey } from "./label-B7fCsuWT.js";
import { t as SIDEBAR_ICON_COMPONENTS } from "./sidebarIcons-BXPkmqr-.js";
import { t as useNavigate } from "./useNavigate-DEeZmEwY.js";
import { t as Scrollbar_default } from "./Scrollbar-CRo8NoWr.js";
import "./IndicatorLight-BpN6p5mZ.js";
import "./MarqueeText-B_M_7Y8_.js";
import { t as MiniApp_default } from "./MiniApp-DBDM_Jjg.js";
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
