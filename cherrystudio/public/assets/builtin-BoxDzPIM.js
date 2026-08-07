import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Button } from "./button-Db6_VSWw.js";
import "./es2015-DmjbZU9-.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-n5iWPIgn.js";
import { t as Badge } from "./badge-HGyBlzr8.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-C7Ec2BdI.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as BuiltinMcpServerNames } from "./mcp-BYi31fTn.js";
import { n as getBuiltInMcpServerDescriptionLabelKey } from "./label-B7fCsuWT.js";
import { p as SettingsContentColumn, u as SettingTitle } from "./SettingsPrimitives-CkQSNa69.js";
import { t as nanoid } from "./index.browser-BQKr_dOz.js";
import { i as useMcpServers } from "./useMcpServer-Dfq1TPZN.js";
import { t as CollapsibleSearchBar_default } from "./CollapsibleSearchBar-D2pmgs6x.js";
import { i as toCreateMcpServerDto } from "./utils-DvJaXBAn.js";
const builtinMcpServers = [
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.flomo,
		reference: "https://flomoapp.com",
		type: "inMemory",
		isActive: false,
		provider: "flomo",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.mcpAutoInstall,
		reference: "https://docs.cherry-ai.com/advanced-basic/mcp/auto-install",
		type: "stdio",
		command: "npx",
		args: [
			"-y",
			"@mcpmarket/mcp-auto-install",
			"connect",
			"--json"
		],
		isActive: false,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.memory,
		reference: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
		type: "inMemory",
		isActive: true,
		env: { MEMORY_FILE_PATH: "YOUR_MEMORY_FILE_PATH" },
		shouldConfig: true,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.sequentialThinking,
		type: "inMemory",
		isActive: true,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.braveSearch,
		type: "inMemory",
		isActive: false,
		env: { BRAVE_API_KEY: "YOUR_API_KEY" },
		shouldConfig: true,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.fetch,
		type: "inMemory",
		isActive: true,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.filesystem,
		type: "inMemory",
		args: ["/Users/username/Desktop"],
		disabledAutoApproveTools: [...[
			"write",
			"edit",
			"delete"
		]],
		shouldConfig: true,
		isActive: false,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.difyKnowledge,
		type: "inMemory",
		isActive: false,
		env: { DIFY_KEY: "YOUR_DIFY_KEY" },
		shouldConfig: true,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.python,
		type: "inMemory",
		isActive: false,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: "@cherry/didi-mcp",
		reference: "https://mcp.didichuxing.com/",
		type: "inMemory",
		isActive: false,
		env: { DIDI_API_KEY: "YOUR_DIDI_API_KEY" },
		shouldConfig: true,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.browser,
		type: "inMemory",
		isActive: false,
		provider: "CherryAI",
		installSource: "builtin",
		isTrusted: true
	},
	{
		id: nanoid(),
		name: BuiltinMcpServerNames.nowledgeMem,
		reference: "https://mem.nowledge.co/",
		type: "inMemory",
		isActive: false,
		provider: "Nowledge",
		installSource: "builtin",
		isTrusted: true
	}
];
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var BuiltinMcpServerList = () => {
	const { t } = useTranslation();
	const { addMcpServer, mcpServers } = useMcpServers();
	const [searchText, setSearchText] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("uninstalled");
	const filteredServers = (0, import_react.useMemo)(() => {
		const keyword = searchText.trim().toLowerCase();
		return builtinMcpServers.filter((server) => {
			const isInstalled = mcpServers.some((existingServer) => existingServer.name === server.name);
			if (filter === "installed" && !isInstalled) return false;
			if (filter === "uninstalled" && isInstalled) return false;
			if (!keyword) return true;
			const description = t(getBuiltInMcpServerDescriptionLabelKey(server.name)).toLowerCase();
			return server.name.toLowerCase().includes(keyword) || description.includes(keyword);
		}).sort((a, b) => Number(Boolean(a.shouldConfig)) - Number(Boolean(b.shouldConfig)));
	}, [
		filter,
		mcpServers,
		searchText,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.builtin-mcp-server-list",
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex w-full min-w-0 flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, {
					className: "m-0",
					children: t("settings.mcp.builtinServers")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSearchBar_default, {
					onSearch: setSearchText,
					placeholder: t("settings.mcp.search.placeholder"),
					tooltip: t("settings.mcp.search.tooltip"),
					maxWidth: 200,
					style: { borderRadius: 16 }
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: filter,
				onValueChange: (value) => setFilter(value),
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "h-8 rounded-full bg-muted/70 p-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "installed",
						className: "h-7 rounded-[14px] px-2.5 text-xs",
						children: t("settings.skills.installed")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "uninstalled",
						className: "h-7 rounded-[14px] px-2.5 text-xs",
						children: t("settings.mcp.notInstalled")
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: filteredServers.map((server) => {
				const isInstalled = mcpServers.some((existingServer) => existingServer.name === server.name);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("group flex min-h-16 items-center gap-3 rounded-lg border border-border-subtle px-3.5 py-2 transition-colors duration-200 ease-in-out hover:border-border hover:bg-muted/35", isInstalled && "bg-muted/25"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-[14px] leading-5",
								children: server.name
							}), server?.shouldConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://docs.cherry-ai.com/advanced-basic/mcp/buildin",
								target: "_blank",
								rel: "noopener noreferrer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "h-5 gap-1 rounded-md border-error-border bg-error-subtle px-1.5 text-[11px] text-error-subtle-foreground leading-none",
									children: [t("settings.mcp.requiresConfig"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 10 })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "line-clamp-2 cursor-pointer text-[13px] text-muted-foreground leading-5 transition-colors hover:text-foreground",
								children: t(getBuiltInMcpServerDescriptionLabelKey(server.name))
							}) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
							align: "start",
							side: "top",
							className: "w-auto max-w-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 font-semibold text-foreground text-sm",
								children: server.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "wrap-break-word whitespace-pre-wrap text-[14px] text-foreground leading-normal",
								children: [t(getBuiltInMcpServerDescriptionLabelKey(server.name)), server.reference && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: server.reference,
									className: "wrap-break-word mt-2 inline-block text-link hover:underline",
									children: server.reference
								})]
							})]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-3 flex min-w-21.5 shrink-0 items-center justify-end self-center",
						children: isInstalled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex h-7 items-center gap-1.5 rounded-lg px-2 text-muted-foreground text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 13,
								className: "text-success"
							}), t("settings.skills.installed")]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-7 rounded-lg px-2 text-muted-foreground text-xs shadow-none hover:bg-muted hover:text-foreground hover:shadow-none",
							onClick: async () => {
								try {
									await addMcpServer(toCreateMcpServerDto(server));
									toast.success(t("settings.mcp.addSuccess"));
								} catch {
									toast.error(t("settings.mcp.addError"));
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 13 }), t("settings.skills.install")]
						})
					})]
				}, server.id);
			})
		})]
	});
};
var BuiltinMcpServerList_default = BuiltinMcpServerList;
var BuiltinWrapper = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
	className: "pt-2",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltinMcpServerList_default, {})
});
export { BuiltinWrapper as component };
