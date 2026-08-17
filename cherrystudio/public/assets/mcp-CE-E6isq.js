import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { i as Flex } from "./flex-Cbul8ND0.js";
import { n as MenuItem, r as MenuList, t as MenuDivider } from "./menu-item-Dgf4coMT.js";
import { t as PageHeader } from "./page-header-DGDzCMv6.js";
import { t as FolderCog } from "./folder-cog-BdmAKdXv.js";
import { t as Server } from "./server-gOraWjO0.js";
import { t as ShoppingBag } from "./shopping-bag-CWJhM4dq.js";
import "./mcp-CN-pwFr9.js";
import { n as Outlet } from "./Match-D5jg6vv-.js";
import "./with-selector-DOSXj2wE.js";
import { t as useNavigate } from "./useNavigate-Bm6wxqrQ.js";
import { t as useLocation } from "./useLocation-BWTYzkVQ.js";
import { t as Scrollbar_default } from "./Scrollbar-DJ9MDpuH.js";
import { i as McpLogo } from "./SvgIcon-F_UZ4jj_.js";
import { a as settingsSubmenuItemClassName, c as settingsSubmenuScrollClassName, i as settingsSubmenuDividerClassName, l as settingsSubmenuSectionTitleClassName, o as settingsSubmenuItemLabelClassName, s as settingsSubmenuListClassName } from "./settingsStyles-BUkbzNWg.js";
import { n as getProviderDisplayName, r as providers, t as getMcpProviderLogo } from "./config-DOBZpNyY.js";
import "./mcpServer-Deh1vY_5.js";
import "./mcp-CTu__8X6.js";
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
