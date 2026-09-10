import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as UiDataSlot, r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as Input } from "./input-DWk3xPNN.js";
import "./with-selector-DlsRhNV6.js";
import { n as cn } from "./style-BQVh98fR.js";
import "./CacheService-IyXh62g9.js";
import { n as usePersistCache } from "./useCache-lF6Sw_ck.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as Check } from "./check-C3qUONPw.js";
import { t as ExternalLink } from "./external-link-BNegULD7.js";
import { t as Plus } from "./plus-C8wlu0r4.js";
import "./mcp-BGt1L-d_.js";
import "./with-selector-DFVq3c2Y.js";
import { t as useParams } from "./useParams-DMyPNa6X.js";
import { i as useMcpServers } from "./useMcpServer-BA8oDtqe.js";
import { t as CollapsibleSearchBar_default } from "./CollapsibleSearchBar-C4HcfF9B.js";
import { p as SettingsContentColumn, r as SettingGroup } from "./SettingsPrimitives-DyPgPdGs.js";
import { n as getProviderDisplayName, r as providers } from "./config-kqvgczFU.js";
import "./mcpServer-D4jVlgXQ.js";
import "./mcp-DJSoUjU-.js";
import { a as isSameMcpServerCandidate, o as toCreateMcpServerDto } from "./utils-8FRGTHqy.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("McpProviderSettings");
var McpProviderSettings = ({ provider, existingServers }) => {
	const { addMcpServer } = useMcpServers();
	const [isFetching, setIsFetching] = (0, import_react.useState)(false);
	const [token, setToken] = (0, import_react.useState)("");
	const [allServers, setAllServers] = usePersistCache("feature.mcp.provider_available_servers");
	const availableServers = (0, import_react.useMemo)(() => allServers[provider.key] ?? [], [allServers, provider.key]);
	const [searchText, setSearchText] = (0, import_react.useState)("");
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {
		setToken(provider.getToken() || "");
	}, [provider]);
	const sortedServers = (0, import_react.useMemo)(() => {
		return [...availableServers].sort((a, b) => {
			if (a.logoUrl && !b.logoUrl) return -1;
			if (!a.logoUrl && b.logoUrl) return 1;
			return a.name.localeCompare(b.name);
		});
	}, [availableServers]);
	const filteredServers = (0, import_react.useMemo)(() => {
		if (!searchText.trim()) return sortedServers;
		const lowerSearchText = searchText.toLowerCase();
		return sortedServers.filter((server) => server.name.toLowerCase().includes(lowerSearchText) || server.description?.toLowerCase().includes(lowerSearchText));
	}, [sortedServers, searchText]);
	const handleTokenChange = (0, import_react.useCallback)((value) => {
		setToken(value);
		provider.saveToken(value);
	}, [provider]);
	const handleFetch = (0, import_react.useCallback)(async () => {
		if (!token.trim()) {
			toast.error(t("settings.mcp.sync.tokenRequired", "API Token is required"));
			return;
		}
		setIsFetching(true);
		try {
			provider.saveToken(token);
			const result = await provider.syncServers(token);
			if (result.success) {
				setAllServers((prev) => ({
					...prev,
					[provider.key]: result.allServers
				}));
				toast.success(t("settings.mcp.fetch.success", "Successfully fetched MCP servers"));
			} else toast.error(result.message);
		} catch (error) {
			logger.error("Failed to fetch MCP servers", error);
			toast.error(`${t("settings.mcp.sync.error")}: ${error.message}`);
		} finally {
			setIsFetching(false);
		}
	}, [
		provider,
		setAllServers,
		t,
		token
	]);
	const isFetchDisabled = !token;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DetailContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProviderHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderName, { children: getProviderDisplayName(provider, t) }), provider.discoverUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "icon-sm",
						className: "size-6 rounded-md text-muted-foreground shadow-none hover:text-link",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							target: "_blank",
							rel: "noreferrer",
							href: provider.discoverUrl,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 })
						}) })
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: handleFetch,
			disabled: isFetching || isFetchDisabled,
			size: "sm",
			className: "h-7 shrink-0 rounded-lg px-2 text-xs shadow-none",
			children: t("settings.mcp.fetch.button", "Fetch Servers")
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsPanel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex items-center justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, { children: t("settings.provider.api_key.label") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "password",
				value: token,
				placeholder: t("settings.mcp.sync.tokenPlaceholder", "Enter API token here"),
				onChange: (e) => handleTokenChange(e.target.value),
				spellCheck: false,
				className: "h-9 rounded-lg bg-background shadow-none"
			}),
			provider.apiKeyUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				target: "_blank",
				rel: "noreferrer",
				href: provider.apiKeyUrl,
				className: "mt-3.5 inline-flex items-center text-link text-xs hover:underline",
				children: t("settings.provider.get_api_key")
			})
		] }),
		sortedServers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsPanel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, { children: t("settings.mcp.servers", "Available MCP Servers") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSearchBar_default, {
				onSearch: setSearchText,
				placeholder: t("settings.mcp.search.placeholder", "Search servers..."),
				tooltip: t("settings.mcp.search.tooltip", "Search servers"),
				maxWidth: 200,
				style: { borderRadius: 20 }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerList, { children: filteredServers.map((server) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ServerItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-row items-center gap-3",
			children: [server.logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: server.logoUrl,
					alt: server.name,
					className: "h-full w-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerName, { children: server.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerDescription, { children: server.description })]
			})]
		}), (() => {
			const isAlreadyAdded = existingServers.some((existing) => isSameMcpServerCandidate(existing, server));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: isAlreadyAdded,
				variant: "ghost",
				size: "icon-sm",
				className: "ml-2.5 size-7 min-h-7 shadow-none",
				onClick: async () => {
					if (!isAlreadyAdded) try {
						await addMcpServer(toCreateMcpServerDto(server));
						toast.success(t("settings.mcp.addSuccess"));
					} catch {
						toast.error(t("settings.mcp.addError"));
					}
				},
				children: isAlreadyAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 })
			});
		})()] }, server.id)) })] })
	] });
};
var DetailContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
	className: cn("w-full min-w-0 pt-2", className),
	...props
});
var ProviderHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.provider-header",
	className: cn("flex items-center justify-between gap-3 border-border-subtle border-b pb-1.5", className),
	...mergeUiProps(props, "settings.provider-header")
});
var ProviderName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.provider-name",
	className: cn("min-w-0 truncate font-semibold text-[15px] leading-5", className),
	...mergeUiProps(props, "settings.provider-name")
});
var SettingsPanel = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup, {
	className,
	...props
});
var PanelTitle = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.panel-title",
	className: cn("text-foreground text-sm", className),
	...mergeUiProps(props, "settings.panel-title")
});
var ServerList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.server-list",
	className: cn("mt-2 flex flex-col gap-2", className),
	...mergeUiProps(props, "settings.server-list")
});
var ServerItem = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.server-item",
	className: cn("flex items-center justify-between rounded-lg border border-border-subtle px-3 py-2 transition-colors duration-200 ease-in-out hover:border-border hover:bg-muted/35", className),
	...mergeUiProps(props, "settings.server-item")
});
var ServerName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.server-name",
	className: cn("mb-0.5 text-sm leading-5", className),
	...mergeUiProps(props, "settings.server-name")
});
var ServerDescription = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.server-description",
	className: cn("line-clamp-2 text-muted-foreground text-xs leading-5", className),
	...mergeUiProps(props, "settings.server-description")
});
var McpProviderSettings_default = McpProviderSettings;
var ProviderPage = () => {
	const providerKey = useParams({ strict: false })._splat;
	const { mcpServers } = useMcpServers();
	const { t } = useTranslation();
	const provider = providers.find((p) => p.key === providerKey);
	if (!provider) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.provider-page",
		className: "flex h-full items-center justify-center text-muted-foreground",
		children: t("settings.mcp.providerNotFound")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpProviderSettings_default, {
		provider,
		existingServers: mcpServers
	});
};
export { ProviderPage as component };
