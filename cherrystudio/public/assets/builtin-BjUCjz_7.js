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
import { n as UiDataSlot } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as Button } from "./button-BBhIgYp8.js";
import "./es2015-wfS3L7va.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-Cli1Z35D.js";
import { t as Badge } from "./badge-DTLpmOYc.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-C4rovZfE.js";
import { n as cn } from "./style-BQVh98fR.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as Check } from "./check-C3qUONPw.js";
import { t as ExternalLink } from "./external-link-BNegULD7.js";
import { t as Plus } from "./plus-C8wlu0r4.js";
import { t as BuiltinMcpServerNames } from "./mcp-BGt1L-d_.js";
import { n as getBuiltInMcpServerDescriptionLabelKey } from "./label-CSb71add.js";
import { i as useMcpServers } from "./useMcpServer-BA8oDtqe.js";
import { t as nanoid } from "./index.browser-BCZc4bmf.js";
import { t as CollapsibleSearchBar_default } from "./CollapsibleSearchBar-C4HcfF9B.js";
import { p as SettingsContentColumn, u as SettingTitle } from "./SettingsPrimitives-DyPgPdGs.js";
import { o as toCreateMcpServerDto } from "./utils-8FRGTHqy.js";
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
