import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { a as mergeUiProps } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { a as HigressIcon, i as McpIcon, n as PulseIcon, o as GlamaIcon, r as McpsoIcon, s as ComposioIcon, t as SmitheryIcon } from "./smithery-NULUP15T.js";
import { t as ModelscopeIcon } from "./modelscope-DGp3_E8L.js";
import { t as ZhipuIcon } from "./zhipu-BpgC-R7-.js";
import { p as SettingsContentColumn, u as SettingTitle } from "./SettingsPrimitives-CkQSNa69.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var mcpMarkets = [
	{
		name: "MCP World",
		url: "https://www.mcpworld.com",
		logo: "https://mcpworld.bdstatic.com/store/v2/865ad5d/mcp-server-store/ec04344/favicon.ico",
		descriptionKey: "settings.mcp.more.mcpworld"
	},
	{
		name: "BigModel MCP Market",
		url: "https://bigmodel.cn/marketplace/index/mcp",
		logo: ZhipuIcon,
		descriptionKey: "settings.mcp.more.zhipu"
	},
	{
		name: "modelscope.cn",
		url: "https://www.modelscope.cn/mcp",
		logo: ModelscopeIcon,
		descriptionKey: "settings.mcp.more.modelscope"
	},
	{
		name: "mcp.higress.ai",
		url: "https://mcp.higress.ai/",
		logo: HigressIcon,
		descriptionKey: "settings.mcp.more.higress"
	},
	{
		name: "mcp.so",
		url: "https://mcp.so/",
		logo: McpsoIcon,
		descriptionKey: "settings.mcp.more.mcpso"
	},
	{
		name: "smithery.ai",
		url: "https://smithery.ai/",
		logo: SmitheryIcon,
		descriptionKey: "settings.mcp.more.smithery"
	},
	{
		name: "glama.ai",
		url: "https://glama.ai/mcp/servers",
		logo: GlamaIcon,
		descriptionKey: "settings.mcp.more.glama"
	},
	{
		name: "pulsemcp.com",
		url: "https://www.pulsemcp.com",
		logo: PulseIcon,
		descriptionKey: "settings.mcp.more.pulsemcp"
	},
	{
		name: "mcp.composio.dev",
		url: "https://mcp.composio.dev/",
		logo: ComposioIcon,
		descriptionKey: "settings.mcp.more.composio"
	},
	{
		name: "Model Context Protocol Servers",
		url: "https://github.com/modelcontextprotocol/servers",
		logo: McpIcon,
		descriptionKey: "settings.mcp.more.official"
	},
	{
		name: "Awesome MCP Servers",
		url: "https://github.com/wong2/awesome-mcp-servers",
		logo: "https://github.githubassets.com/assets/github-logo-55c5b9a1fe52.png",
		descriptionKey: "settings.mcp.more.awesome"
	}
];
var McpMarketList = () => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, {
		style: { marginBottom: 10 },
		children: t("settings.mcp.findMore")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketGrid, { children: mcpMarkets.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketCard, {
		onClick: () => window.open(resource.url, "_blank", "noopener,noreferrer"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketIconWrap, { children: typeof resource.logo !== "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(resource.logo.Avatar, {
			size: 22,
			shape: "rounded"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketLogo, {
			src: resource.logo,
			alt: `${resource.name} logo`
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketName, { children: resource.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLinkIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketDescription, { children: t(resource.descriptionKey) })] })]
	}, resource.name)) })] });
};
var MarketGrid = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.market-grid",
	className: cn("mb-5 flex flex-col gap-2", className),
	...mergeUiProps(props, "settings.market-grid")
});
var MarketCard = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.market-card",
	className: cn("flex min-h-15 cursor-pointer items-center gap-3 rounded-lg border border-border-subtle bg-transparent px-3 py-2.5 transition-colors hover:bg-accent", className),
	...mergeUiProps(props, "settings.market-card")
});
var MarketIconWrap = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.market-icon-wrap",
	className: cn("flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted", className),
	...mergeUiProps(props, "settings.market-icon-wrap")
});
var MarketContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.market-content",
	className: cn("min-w-0 flex-1", className),
	...mergeUiProps(props, "settings.market-content")
});
var MarketHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.market-header",
	className: cn("flex items-center gap-2", className),
	...mergeUiProps(props, "settings.market-header")
});
var MarketLogo = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
	"data-ui": "settings.market-logo",
	className: cn("size-5.5 rounded object-cover", className),
	...mergeUiProps(props, "settings.market-logo")
});
var MarketName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.market-name",
	className: cn("flex-1 truncate text-sm", className),
	...mergeUiProps(props, "settings.market-name")
});
var ExternalLinkIcon = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.external-link-icon",
	className: cn("flex shrink-0 items-center text-foreground-tertiary", className),
	...mergeUiProps(props, "settings.external-link-icon")
});
var MarketDescription = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.market-description",
	className: cn("mt-0.5 line-clamp-1 overflow-hidden text-[13px] text-muted-foreground leading-[1.35]", className),
	...mergeUiProps(props, "settings.market-description")
});
var McpMarketList_default = McpMarketList;
var MarketplacesWrapper = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
	className: "pt-2",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpMarketList_default, {})
});
export { MarketplacesWrapper as component };
