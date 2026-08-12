import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-uLlqCRc6.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as Spinner } from "./spinner-DFTIxGhU.js";
import { t as Input } from "./input-dvr72LyA.js";
import { a as RowFlex, i as Flex, n as Center } from "./flex-BmIgOnUt.js";
import { t as Badge } from "./badge-HGyBlzr8.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-aatUlttR.js";
import { i as useMcpServers } from "./useMcpServer-BD3_YKAo.js";
import { t as require_dist } from "./dist-DHdrQB6u.js";
var cherry_text_logo_default = "" + new URL("cherry-text-logo-CtmH594q.svg", import.meta.url).href;
var logger = loggerService.withContext("utils:mcp");
function getMcpConfigSampleFromReadme(readme) {
	if (readme) try {
		for (const match of readme.matchAll(/"mcpServers"\s*:\s*({(?:[^{}]*|{(?:[^{}]*|{[^{}]*})*})*})/g)) {
			let orgSample = JSON.parse(match[1]);
			orgSample = orgSample[Object.keys(orgSample)[0] ?? ""];
			if (orgSample.command === "npx") return orgSample;
		}
	} catch (e) {
		logger.error("getMcpConfigSampleFromReadme", e);
	}
	return null;
}
var import_dist = require_dist();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var npmScopes = [
	"@modelcontextprotocol",
	"@gongrzhe",
	"@mcpmarket"
];
var _searchResults = [];
var NpxSearch = () => {
	const { t } = useTranslation();
	const [npmScope, setNpmScope] = (0, import_react.useState)("@modelcontextprotocol");
	const [searchLoading, setSearchLoading] = (0, import_react.useState)(false);
	const [searchResults, setSearchResults] = (0, import_react.useState)(_searchResults);
	const { addMcpServer, mcpServers } = useMcpServers();
	_searchResults = searchResults;
	const handleNpmSearch = async (scopeOverride) => {
		const searchScope = scopeOverride || npmScope;
		if (!searchScope.trim()) {
			toast.warning(t("settings.mcp.npx_list.scope_required"));
			return;
		}
		if (searchLoading) return;
		setSearchLoading(true);
		try {
			const formattedResults = (await (0, import_dist.npxFinder)(searchScope)).map((pkg) => {
				let configSample;
				if (pkg.original?.readme) configSample = getMcpConfigSampleFromReadme(pkg.original.readme);
				return {
					key: pkg.name,
					name: pkg.name?.split("/")[1] || "",
					description: pkg.description || "No description available",
					version: pkg.version || "Latest",
					usage: `npx ${pkg.name}`,
					npmLink: pkg.links?.npm || `https://www.npmjs.com/package/${pkg.name}`,
					fullName: pkg.name || "",
					type: "stdio",
					configSample
				};
			});
			setSearchResults(formattedResults);
			if (formattedResults.length === 0) toast.info(t("settings.mcp.npx_list.no_packages"));
		} catch (error) {
			setSearchResults([]);
			_searchResults = [];
			if (error instanceof Error) toast.error(`${t("settings.mcp.npx_list.search_error")}: ${error.message}`);
			else toast.error(t("settings.mcp.npx_list.search_error"));
		} finally {
			setSearchLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		handleNpmSearch();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.npx-search",
		className: "flex min-w-0 flex-1 flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6.25 flex w-full max-w-125 flex-col px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
						className: "mb-3.75",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cherry_text_logo_default,
							alt: "npm",
							width: 120
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: t("settings.mcp.npx_list.scope_placeholder"),
							value: npmScope,
							onChange: (e) => setNpmScope(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") handleNpmSearch(npmScope);
							},
							className: "h-10 rounded-full"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
						className: "items-center justify-center",
						children: npmScopes.map((scope) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							onClick: () => {
								setNpmScope(scope);
								handleNpmSearch(scope);
							},
							className: "cursor-pointer border-border bg-background-subtle text-foreground hover:bg-accent data-[disabled=true]:cursor-not-allowed",
							"data-disabled": searchLoading,
							children: scope
						}, scope))
					})
				]
			}) }),
			searchLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: t("common.loading") }) }),
			!searchLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex w-full max-w-300 flex-1 flex-col gap-2 overflow-y-auto pr-1",
				children: searchResults?.map((record) => {
					const isInstalled = mcpServers.some((server) => server.name === record.name);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-transparent bg-transparent px-3 py-2 transition-colors hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "selectable m-0 min-w-0 truncate text-sm leading-6",
								children: record.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
								className: "shrink-0 items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "border-success-border bg-success-subtle text-success-subtle-foreground",
									children: ["v", record.version]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: async () => {
										if (isInstalled) return;
										const newServer = {
											name: record.name,
											description: `${record.description}\n\n${t("settings.mcp.npx_list.usage")}: ${record.usage}\n${t("settings.mcp.npx_list.npm")}: ${record.npmLink}`,
											command: "npx",
											args: record.configSample?.args ?? ["-y", record.fullName],
											env: record.configSample?.env,
											isActive: false,
											type: record.type,
											searchKey: record.fullName
										};
										try {
											await addMcpServer(newServer);
											toast.success(t("settings.mcp.addSuccess"));
										} catch {
											toast.error(t("settings.mcp.addError"));
										}
									},
									disabled: isInstalled,
									children: isInstalled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 14,
										className: "text-primary"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "selectable m-0 text-sm",
									children: record.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "selectable m-0 text-muted-foreground text-sm",
									children: [
										t("settings.mcp.npx_list.usage"),
										": ",
										record.usage
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: record.npmLink,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "selectable inline-flex items-center gap-1 text-link text-sm hover:underline",
									children: [record.npmLink, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 })]
								})
							]
						})]
					}, record.name);
				})
			})
		]
	});
};
var NpxSearch_default = NpxSearch;
var NpxSearchWrapper = () => {
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
		theme,
		className: "pt-2",
		innerClassName: "max-w-[1200px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpxSearch_default, {})
	});
};
export { NpxSearchWrapper as component };
