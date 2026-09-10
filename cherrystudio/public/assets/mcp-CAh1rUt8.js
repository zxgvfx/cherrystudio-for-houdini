import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./i18next-CqNcSVOM.js";
import "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { i as Flex } from "./flex-YDL2weOg.js";
import { n as MenuItem, r as MenuList, t as MenuDivider } from "./menu-item-DOrwnGHw.js";
import { t as PageHeader } from "./page-header-q8XREuED.js";
import { t as FolderCog } from "./folder-cog-CLAoV9tz.js";
import { t as Server } from "./server-DIIrq3W2.js";
import { t as ShoppingBag } from "./shopping-bag-XqZi8iEk.js";
import "./mcp-BGt1L-d_.js";
import { n as Outlet } from "./Match-CQrslr0g.js";
import "./with-selector-DFVq3c2Y.js";
import { t as useNavigate } from "./useNavigate-Bl6k0zLr.js";
import { t as useLocation } from "./useLocation-BCnUMXGv.js";
import { i as McpLogo } from "./SvgIcon-DI_kUaAV.js";
import { t as Scrollbar_default } from "./Scrollbar-CjwT5bYS.js";
import { a as settingsSubmenuItemClassName, c as settingsSubmenuScrollClassName, i as settingsSubmenuDividerClassName, l as settingsSubmenuSectionTitleClassName, o as settingsSubmenuItemLabelClassName, s as settingsSubmenuListClassName } from "./settingsStyles-BvK3Yud3.js";
import { n as getProviderDisplayName, r as providers, t as getMcpProviderLogo } from "./config-kqvgczFU.js";
import "./mcpServer-D4jVlgXQ.js";
import "./mcp-DJSoUjU-.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var McpSettings = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const getActiveView = () => {
		const path = location.pathname;
		if (path === "/settings/mcp/builtin") return "builtin";
		if (path === "/settings/mcp/marketplaces") return "marketplaces";
		for (const provider of providers) if (path === `/settings/mcp/${provider.key}`) return provider.key;
		return "servers";
	};
	const activeView = getActiveView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
		className: "min-w-0 flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-[calc(100vh-var(--navbar-height)-6px)] w-full min-w-0 flex-1 flex-row overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex flex-col ${settingsSubmenuScrollClassName}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("settings.mcp.shortTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
					className: "min-h-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuList, {
						className: settingsSubmenuListClassName,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								label: t("settings.mcp.title"),
								active: activeView === "servers",
								onClick: () => navigate({ to: "/settings/mcp/servers" }),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpLogo, {
									width: 18,
									height: 18,
									className: "text-foreground"
								}),
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: settingsSubmenuDividerClassName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: settingsSubmenuSectionTitleClassName,
								children: t("settings.mcp.discover", "Discover")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								label: t("settings.mcp.builtinServers", "Built-in Servers"),
								active: activeView === "builtin",
								onClick: () => navigate({ to: "/settings/mcp/builtin" }),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 18 }),
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								label: t("settings.mcp.marketplaces", "Marketplaces"),
								active: activeView === "marketplaces",
								onClick: () => navigate({ to: "/settings/mcp/marketplaces" }),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 }),
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: settingsSubmenuDividerClassName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: settingsSubmenuSectionTitleClassName,
								children: t("settings.mcp.providers", "Providers")
							}),
							providers.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								label: getProviderDisplayName(provider, t),
								active: activeView === provider.key,
								onClick: () => navigate({ to: `/settings/mcp/${provider.key}` }),
								icon: (() => {
									const logo = getMcpProviderLogo(provider.key);
									return logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(logo.Avatar, {
										size: 16,
										shape: "circle"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderCog, { size: 16 });
								})(),
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName
							}, provider.key))
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-w-0 flex-1 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})
	});
};
var SplitComponent = McpSettings;
export { SplitComponent as component };
