import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as a } from "./zod-wCQOx8VP.js";
import { a as formatMcpError } from "./error-DgGhUgCT.js";
import "./PreferenceService-Ba0ofBX2.js";
import { a as useSharedCacheValue } from "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { a as mergeUiProps } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Alert } from "./alert-BwuKGcCL.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { t as Spinner } from "./spinner-DFTIxGhU.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { t as DataTable } from "./data-table-BX427LKo.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { i as Flex, r as ColFlex } from "./flex-BmIgOnUt.js";
import "./with-selector-BMhODuKS.js";
import { n as RequiredMark } from "./label-CUymrXZH.js";
import { d as useForm, t as Form } from "./form-BNX-faEF.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { t as purify } from "./purify.es-Cmt93dJl.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-YSkmiq4a.js";
import { t as Badge } from "./badge-HGyBlzr8.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { n as TabsContent, t as Tabs } from "./tabs-C7Ec2BdI.js";
import { n as useCodeStyle } from "./useCodeStyle-ZK5esKOR.js";
import { n as useTheme } from "./useTheme-CbMe73se.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { t as ArrowLeft } from "./arrow-left-BVyI-xLf.js";
import { t as Save } from "./save-Cp4EyjDF.js";
import { t as Zap } from "./zap-Bw6CmTiN.js";
import { t as popup } from "./popup-BqV2ZD7D.js";
import { r as isInMemoryBuiltinMcpServer } from "./mcp-BYi31fTn.js";
import "./with-selector-DxfGCgh1.js";
import { t as useParams } from "./useParams-pfqbNhL2.js";
import { t as useSearch } from "./useSearch-wm23OOBq.js";
import { t as useNavigate } from "./useNavigate-DEeZmEwY.js";
import { t as SettingContainer, u as SettingTitle } from "./SettingsPrimitives-CkQSNa69.js";
import { t as Scrollbar_default } from "./Scrollbar-CRo8NoWr.js";
import { t as useMcpRuntimeStatus } from "./useMcpRuntimeStatus-C6MvC7zq.js";
import "./__vite-browser-external-ppcTMhrd.js";
import { i as McpLogo } from "./SvgIcon-C5HzxKyn.js";
import { n as useMcpServer, t as useIsToolAutoApproved } from "./useMcpServer-Dfq1TPZN.js";
import { t as DeleteIcon_default } from "./DeleteIcon-DNqpuzDC.js";
import { t as CollapsibleSearchBar_default } from "./CollapsibleSearchBar-D2pmgs6x.js";
import "./main-CAAUrMhr.js";
import { a as toUpdateMcpServerDto } from "./utils-DvJaXBAn.js";
import { t as require_dist } from "./dist-V8M_j1XS.js";
import { a as McpIdentityFields, c as buildMcpSchema, d as toMcpServerFields, f as useMcpRegistryState, i as McpFormGrid, l as resolveMcpConfigInstallSource, o as McpRuntimeFields, p as useMcpServerTrust, r as McpEndpointField, s as McpTransportFields, t as MCP_FORM_DEFAULT_VALUES, u as resolveMcpConfigTransportType } from "./McpServerFields-CQ3cr6xz.js";
var import_dist = require_dist();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var McpDescription = ({ searchKey }) => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { shikiMarkdownIt } = useCodeStyle();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [mcpInfo, setMcpInfo] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		setLoading(true);
		(0, import_dist.npxFinder)(searchKey).then((packages) => {
			shikiMarkdownIt(packages[0]?.original?.readme ?? t("settings.mcp.noDescriptionAvailable")).then((result) => {
				if (isMounted) setMcpInfo(purify.sanitize(result));
			});
		}).finally(() => {
			if (isMounted) setLoading(false);
		});
		return () => {
			isMounted = false;
		};
	}, [
		shikiMarkdownIt,
		searchKey,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.mcp-description",
		className: "w-full min-w-0 pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-lg border border-border bg-card p-6",
			style: {
				backgroundColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "var(--card)",
				borderColor: "var(--border)"
			},
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: t("common.loading") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "markdown",
				dangerouslySetInnerHTML: { __html: mcpInfo }
			})
		})
	});
};
var McpDescription_default = (0, import_react.memo)(McpDescription);
const McpDetailList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
	"data-ui": "settings.mcp-detail-list",
	className: cn("overflow-hidden rounded-md border border-border bg-background text-sm", className),
	...mergeUiProps(props, "settings.mcp-detail-list")
});
const McpDetailItem = ({ label, className, labelClassName, contentClassName, children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "settings.mcp-detail-item",
	className: cn("grid grid-cols-[minmax(120px,0.32fr)_minmax(0,1fr)] border-border border-b last:border-b-0", className),
	...mergeUiProps(props, "settings.mcp-detail-item"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: cn("min-w-0 bg-muted/35 px-3 py-2 text-foreground text-sm leading-5", "wrap-break-word wrap-anywhere whitespace-normal", labelClassName),
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: cn("min-w-0 px-3 py-2 text-foreground text-sm leading-5", "wrap-break-word wrap-anywhere whitespace-normal", contentClassName),
		children
	})]
});
var McpPromptsSection = ({ prompts }) => {
	const { t } = useTranslation();
	const renderPromptArguments = (prompt) => {
		if (!prompt.arguments || prompt.arguments.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-prompt-arguments",
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
				className: "mb-2 font-medium text-foreground text-sm",
				children: [t("settings.mcp.tools.inputSchema.label"), ":"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailList, { children: prompt.arguments.map((arg, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailItem, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					className: "gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: arg.name
					}), arg.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("common.required_field"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredMark, {})
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColFlex, {
					className: "gap-1",
					children: arg.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0 text-muted-foreground text-sm leading-5",
						children: arg.description
					})
				})
			}, index)) })]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.mcp-prompts-section",
		className: "mt-2 pt-2",
		children: prompts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-2 font-medium text-muted-foreground text-sm",
			children: t("settings.mcp.prompts.availablePrompts")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "multiple",
			children: prompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: prompt.id || prompt.name,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
						className: "min-w-0 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
							className: "w-full min-w-0 items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground text-sm",
								children: prompt.name
							})
						}), prompt.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-[13px] text-muted-foreground leading-5",
							children: prompt.description
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					className: "select-text px-3",
					children: renderPromptArguments(prompt)
				})]
			}, prompt.id || prompt.name))
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			compact: true,
			preset: "no-result",
			description: t("settings.mcp.prompts.noPromptsAvailable")
		})
	});
};
var McpPrompt_default = McpPromptsSection;
var McpResourcesSection = ({ resources }) => {
	const { t } = useTranslation();
	const formatFileSize = (size) => {
		if (size === void 0) return "Unknown size";
		const units = [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		];
		let formattedSize = size;
		let unitIndex = 0;
		while (formattedSize >= 1024 && unitIndex < units.length - 1) {
			formattedSize /= 1024;
			unitIndex++;
		}
		return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
	};
	const renderResourceProperties = (resource) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(McpDetailList, { children: [
			resource.mimeType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailItem, {
				label: t("settings.mcp.resources.mimeType") || "MIME Type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "border-primary/30 bg-primary/10 text-primary",
					children: resource.mimeType
				})
			}),
			resource.size !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailItem, {
				label: t("settings.mcp.resources.size") || "Size",
				children: formatFileSize(resource.size)
			}),
			resource.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailItem, {
				label: t("settings.mcp.resources.text") || "Text",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 whitespace-pre-wrap",
					children: resource.text
				})
			}),
			resource.blob && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailItem, {
				label: t("settings.mcp.resources.blob") || "Binary Data",
				children: t("settings.mcp.resources.blobInvisible") || "Binary data is not visible here."
			})
		] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.mcp-resources-section",
		className: "mt-2 pt-2",
		children: resources.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-2 font-medium text-muted-foreground text-sm",
			children: t("settings.mcp.resources.availableResources") || "Available Resources"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "multiple",
			children: resources.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: resource.uri,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
						className: "w-full min-w-0 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
							className: "w-full min-w-0 items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground text-sm",
								children: `${resource.name} (${resource.uri})`
							})
						}), resource.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-[13px] text-muted-foreground leading-5",
							children: resource.description.length > 100 ? `${resource.description.substring(0, 100)}...` : resource.description
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					className: "select-text px-3",
					children: renderResourceProperties(resource)
				})]
			}, resource.uri))
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			compact: true,
			preset: "no-result",
			description: t("settings.mcp.resources.noResourcesAvailable")
		})
	});
};
var McpResource_default = McpResourcesSection;
var AutoApproveCell = ({ tool, enabled, onToggle }) => {
	const { t } = useTranslation();
	const isAutoApproved = useIsToolAutoApproved(tool);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: !enabled ? t("settings.mcp.tools.autoApprove.tooltip.howToEnable") : isAutoApproved ? t("settings.mcp.tools.autoApprove.tooltip.enabled") : t("settings.mcp.tools.autoApprove.tooltip.disabled"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			size: "xs",
			checked: isAutoApproved,
			disabled: !enabled,
			onCheckedChange: (checked) => onToggle(tool, checked)
		})
	});
};
var McpToolsSection = ({ tools, server, searchText, onToggleTool, onToggleAutoApprove }) => {
	const { t } = useTranslation();
	const [expandedRowKeys, setExpandedRowKeys] = (0, import_react.useState)([]);
	const isToolEnabled = (tool) => {
		return !server.disabledTools?.includes(tool.name);
	};
	const handleToggle = (tool, checked) => {
		onToggleTool(tool, checked);
	};
	const handleAutoApproveToggle = (tool, checked) => {
		onToggleAutoApprove(tool, checked);
	};
	const getTypeBadgeClass = (type) => {
		switch (type) {
			case "string": return "border-primary/30 bg-primary/10 text-primary";
			case "number": return "border-success-border bg-success-subtle text-success-subtle-foreground";
			case "boolean": return "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400";
			case "object": return "border-warning-border bg-warning-subtle text-warning-subtle-foreground";
			case "array": return "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";
			default: return "border-border bg-background-subtle text-foreground";
		}
	};
	const MAX_NESTING_DEPTH = 5;
	const renderPropertyValue = (prop, depth = 0) => {
		const itemType = prop.type === "array" && prop.items?.type ? `${prop.items.type}[]` : prop.type;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
			className: "gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
					className: "items-center gap-2",
					children: itemType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: getTypeBadgeClass(prop.type),
						children: itemType
					})
				}),
				prop.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 text-muted-foreground text-sm leading-5",
					children: prop.description
				}),
				prop.enum && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm",
						children: t("settings.mcp.tools.inputSchema.enum.allowedValues")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex flex-wrap gap-1",
						children: prop.enum.map((value, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: value
						}, idx))
					})]
				}),
				depth < MAX_NESTING_DEPTH && prop.type === "object" && prop.properties && renderSchemaProperties(prop.properties, prop.required, depth + 1),
				depth < MAX_NESTING_DEPTH && prop.type === "array" && prop.items?.type === "object" && prop.items.properties && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm italic",
						children: "items:"
					}), renderSchemaProperties(prop.items.properties, prop.items.required, depth + 1)]
				})
			]
		});
	};
	const renderSchemaProperties = (properties, required, depth = 0) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailList, {
			className: "mt-1 select-text",
			children: Object.entries(properties).map(([key, prop]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDetailItem, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					className: "gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: key
					}), required?.includes(key) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("common.required_field"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredMark, {})
					})]
				}),
				children: renderPropertyValue(prop, depth)
			}, key))
		});
	};
	const renderToolProperties = (tool) => {
		if (!tool.inputSchema?.properties) return null;
		return renderSchemaProperties(tool.inputSchema.properties, tool.inputSchema.required);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		data: (0, import_react.useMemo)(() => {
			const query = searchText.trim().toLowerCase();
			if (!query) return tools;
			return tools.filter((tool) => [
				tool.name,
				tool.id,
				tool.description
			].some((value) => value?.toLowerCase().includes(query)));
		}, [searchText, tools]),
		columns: [
			{
				id: "name",
				header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-ui": "settings.mcp-tools-section",
					className: "font-medium",
					children: t("settings.mcp.tools.availableTools")
				}),
				meta: {
					width: 400,
					maxWidth: 400
				},
				cell: ({ row }) => {
					const tool = row.original;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
						className: "gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
							className: "items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground text-sm",
								title: tool.name,
								children: tool.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: `ID: ${tool.id}` })]
						}), tool.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: tool.description,
							fullWidthTrigger: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "m-0 line-clamp-1 block w-full min-w-0 text-[13px] text-muted-foreground leading-5",
								children: tool.description
							})
						})]
					});
				}
			},
			{
				id: "enable",
				header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					className: "items-center justify-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpLogo, {
						width: 14,
						height: 14,
						style: { opacity: .8 }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: t("settings.mcp.tools.enable")
					})]
				}),
				meta: {
					width: 150,
					maxWidth: 150,
					align: "center"
				},
				cell: ({ row }) => {
					const tool = row.original;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						size: "xs",
						checked: isToolEnabled(tool),
						onCheckedChange: (checked) => handleToggle(tool, checked)
					});
				}
			},
			{
				id: "autoApprove",
				header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					className: "items-center justify-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
						size: 14,
						color: "var(--error)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: t("settings.mcp.tools.autoApprove.label")
					})]
				}),
				meta: {
					width: 150,
					maxWidth: 150,
					align: "center"
				},
				cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoApproveCell, {
					tool: row.original,
					enabled: isToolEnabled(row.original),
					onToggle: handleAutoApproveToggle
				})
			}
		],
		rowKey: "id",
		emptyText: searchText ? t("common.no_results") : t("settings.mcp.tools.noToolsAvailable"),
		expandedRowKeys,
		onExpandedRowChange: setExpandedRowKeys,
		renderExpandedRow: (tool) => renderToolProperties(tool),
		getCanExpand: (tool) => Boolean(tool.inputSchema?.properties),
		className: "bg-transparent [&_[data-slot=table-cell]]:bg-transparent [&_[data-slot=table-head]]:bg-transparent [&_[data-slot=table-header]]:bg-transparent [&_[data-slot=table-header]_[data-slot=table-row]]:bg-transparent",
		rowClassName: "bg-transparent"
	});
};
var McpTool_default = McpToolsSection;
var logger = loggerService.withContext("McpSettings");
var mcpToolsCacheKey = (serverId) => `mcp.tools.${serverId}`;
var EMPTY_MCP_TOOLS = [];
var McpSettings = () => {
	const { t } = useTranslation();
	const params = useParams({ strict: false });
	const search = useSearch({ strict: false });
	const serverId = params.serverId;
	const { server, isLoading: isServerLoading, updateMcpServer, deleteMcpServer } = useMcpServer(serverId ?? "");
	const { ensureServerTrusted } = useMcpServerTrust((0, import_react.useCallback)((body) => updateMcpServer({ body }), [updateMcpServer]));
	const [serverType, setServerType] = (0, import_react.useState)("stdio");
	const form = useForm({
		resolver: a(buildMcpSchema(t)),
		defaultValues: MCP_FORM_DEFAULT_VALUES
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isFormChanged, setIsFormChanged] = (0, import_react.useState)(false);
	const [loadingServer, setLoadingServer] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("settings");
	const [toolSearchText, setToolSearchText] = (0, import_react.useState)("");
	const tools = useSharedCacheValue(serverId ? mcpToolsCacheKey(serverId) : mcpToolsCacheKey("__draft__")) ?? EMPTY_MCP_TOOLS;
	const runtimeStatus = useMcpRuntimeStatus(server?.id, Boolean(server?.isActive));
	const [prompts, setPrompts] = (0, import_react.useState)([]);
	const [resources, setResources] = (0, import_react.useState)([]);
	const registryState = useMcpRegistryState(form, () => setIsFormChanged(true));
	const { syncFromServer: syncRegistryFromServer } = registryState;
	const [serverVersion, setServerVersion] = (0, import_react.useState)(null);
	const [logs, setLogs] = (0, import_react.useState)([]);
	const fetchServerLogsRequestRef = (0, import_react.useRef)(0);
	const handledAutoEnableServerIdRef = (0, import_react.useRef)(null);
	const { theme } = useTheme();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!server) return;
		const serverType$1 = resolveMcpConfigTransportType(server.type || (server.baseUrl ? "sse" : "stdio"), server.name);
		setServerType(serverType$1);
		syncRegistryFromServer(server);
		form.reset({
			name: server.name,
			description: server.description ?? "",
			serverType: serverType$1,
			baseUrl: server.baseUrl || "",
			command: server.command || "",
			registryUrl: server.registryUrl || "",
			isActive: server.isActive,
			longRunning: server.longRunning,
			timeout: server.timeout,
			args: server.args ? server.args.join("\n") : "",
			env: server.env ? Object.entries(server.env).map(([key, value]) => `${key}=${value}`).join("\n") : "",
			headers: server.headers ? Object.entries(server.headers).map(([key, value]) => `${key}=${value}`).join("\n") : "",
			provider: server.provider || "",
			providerUrl: server.providerUrl || "",
			logoUrl: server.logoUrl || "",
			tags: server.tags || []
		});
	}, [
		server,
		form,
		syncRegistryFromServer
	]);
	const watchedServerType = form.watch("serverType");
	(0, import_react.useEffect)(() => {
		if (watchedServerType) setServerType(watchedServerType);
	}, [watchedServerType]);
	const fetchTools = async () => {
		if (server?.isActive) try {
			setLoadingServer(server.id);
			await ipcApi.request("mcp.server.refresh_tools", { serverId: server.id });
		} catch (error) {
			logger.error("Failed to list MCP tools", error);
		} finally {
			setLoadingServer(null);
		}
	};
	const fetchPrompts = async () => {
		if (server?.isActive) try {
			setLoadingServer(server.id);
			setPrompts(await ipcApi.request("mcp.server.list_prompts", { serverId: server.id }));
		} catch (error) {
			logger.error("Failed to list MCP prompts", error);
			setPrompts([]);
		} finally {
			setLoadingServer(null);
		}
	};
	const fetchResources = async () => {
		if (server?.isActive) try {
			setLoadingServer(server.id);
			setResources(await ipcApi.request("mcp.server.list_resources", { serverId: server.id }));
		} catch (error) {
			logger.error("Failed to list MCP resources", error);
			setResources([]);
		} finally {
			setLoadingServer(null);
		}
	};
	const fetchServerVersion = async () => {
		if (server?.isActive) try {
			setServerVersion(await ipcApi.request("mcp.server.get_version", { serverId: server.id }));
		} catch (error) {
			logger.error("Failed to get MCP server version", error);
			setServerVersion(null);
		}
	};
	const fetchServerLogs = async (serverId$1 = server?.id) => {
		if (!serverId$1) return;
		const requestId = ++fetchServerLogsRequestRef.current;
		try {
			const history = await ipcApi.request("mcp.server.get_logs", { serverId: serverId$1 });
			if (requestId === fetchServerLogsRequestRef.current && serverId$1 === server?.id) setLogs((prev) => mergeServerLogs(history, prev));
		} catch (error) {
			logger.warn("Failed to load server logs", error);
		}
	};
	(0, import_react.useEffect)(() => {
		const unsubscribe = ipcApi.on("mcp.server.log", (log) => {
			if (log.serverId && log.serverId !== server?.id) return;
			setLogs((prev) => {
				const merged = [...prev, log];
				if (merged.length > 200) return merged.slice(merged.length - 200);
				return merged;
			});
		});
		return () => {
			unsubscribe?.();
		};
	}, [server?.id]);
	(0, import_react.useEffect)(() => {
		fetchServerLogsRequestRef.current += 1;
		setLogs([]);
	}, [server?.id]);
	(0, import_react.useEffect)(() => {
		if (activeTab === "logs") fetchServerLogs();
	}, [activeTab, server?.id]);
	(0, import_react.useEffect)(() => {
		if (server?.isActive) {
			fetchTools();
			fetchPrompts();
			fetchResources();
			fetchServerVersion();
		}
	}, [server?.id, server?.isActive]);
	(0, import_react.useEffect)(() => {
		setIsFormChanged(false);
	}, [server?.id]);
	const onSave = async () => {
		if (!server) return;
		setLoading(true);
		try {
			if (!await form.trigger()) {
				setLoading(false);
				return;
			}
			const values = form.getValues();
			const mcpServerDto = toUpdateMcpServerDto({
				...server,
				...toMcpServerFields(values),
				installSource: resolveMcpConfigInstallSource(server),
				isActive: values.isActive ?? server.isActive,
				timeout: values.timeout || server.timeout,
				provider: values.provider ?? server.provider,
				providerUrl: values.providerUrl ?? server.providerUrl,
				logoUrl: values.logoUrl ?? server.logoUrl,
				tags: values.tags ?? server.tags
			});
			if (server.isActive) try {
				await updateMcpServer({ body: {
					...mcpServerDto,
					isActive: true
				} });
				await ipcApi.request("mcp.server.restart", { serverId: server.id });
				toast.success(t("settings.mcp.updateSuccess"));
				setIsFormChanged(false);
			} catch (error) {
				popup.error({
					title: t("settings.mcp.updateError"),
					content: error.message,
					centered: true
				});
			}
			else {
				await updateMcpServer({ body: {
					...mcpServerDto,
					isActive: false
				} });
				toast.success(t("settings.mcp.updateSuccess"));
				setIsFormChanged(false);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			logger.error("Failed to save MCP server settings:", error);
		}
	};
	const onDeleteMcpServer = (0, import_react.useCallback)(async (serverToDelete) => {
		try {
			if (!await popup.confirm({
				title: t("settings.mcp.deleteServer"),
				content: t("settings.mcp.deleteServerConfirm"),
				centered: true,
				okButtonProps: { danger: true }
			})) return;
			await ipcApi.request("mcp.server.remove", { serverId: serverToDelete.id });
			await deleteMcpServer({});
			toast.success(t("settings.mcp.deleteSuccess"));
			navigate({ to: "/settings/mcp" });
		} catch (error) {
			toast.error(`${t("settings.mcp.deleteError")}: ${error.message}`);
		}
	}, [
		deleteMcpServer,
		t,
		navigate
	]);
	const onToggleActive = async (active) => {
		if (!server) return;
		if (isFormChanged && active) {
			await onSave();
			return;
		}
		if (!await form.trigger()) return;
		let serverForUpdate = server;
		if (active) {
			const trustedServer = await ensureServerTrusted(server);
			if (!trustedServer) return;
			serverForUpdate = trustedServer;
		}
		setLoadingServer(serverForUpdate.id);
		try {
			if (active) {
				await updateMcpServer({ body: { isActive: true } });
				try {
					await ipcApi.request("mcp.server.refresh_tools", { serverId: serverForUpdate.id });
					setPrompts(await ipcApi.request("mcp.server.list_prompts", { serverId: serverForUpdate.id }));
					setResources(await ipcApi.request("mcp.server.list_resources", { serverId: serverForUpdate.id }));
					setServerVersion(await ipcApi.request("mcp.server.get_version", { serverId: serverForUpdate.id }));
				} catch (error) {
					popup.error({
						title: t("settings.mcp.startError"),
						content: formatMcpError(error),
						centered: true
					});
				}
			} else {
				await updateMcpServer({ body: { isActive: false } });
				await ipcApi.request("mcp.server.stop", { serverId: serverForUpdate.id });
				setServerVersion(null);
			}
		} catch (error) {
			popup.error({
				title: active ? t("settings.mcp.startError") : t("settings.mcp.updateError"),
				content: formatMcpError(error),
				centered: true
			});
		} finally {
			setLoadingServer(null);
		}
	};
	const autoEnableProtocolServer = (0, import_react.useEffectEvent)(() => {
		if (server && !server.isActive) onToggleActive(true);
	});
	(0, import_react.useEffect)(() => {
		if (search.autoEnable !== "true" || !server || isServerLoading) return;
		if (handledAutoEnableServerIdRef.current === server.id) return;
		handledAutoEnableServerIdRef.current = server.id;
		navigate({
			to: "/settings/mcp/settings/$serverId",
			params: { serverId: server.id },
			search: {},
			replace: true
		});
		autoEnableProtocolServer();
	}, [
		isServerLoading,
		navigate,
		search.autoEnable,
		server
	]);
	const handleToggleTool = (0, import_react.useCallback)(async (tool, enabled) => {
		if (!server) return;
		let disabledTools = [...server.disabledTools || []];
		if (enabled) disabledTools = disabledTools.filter((name) => name !== tool.name);
		else if (!disabledTools.includes(tool.name)) disabledTools.push(tool.name);
		updateMcpServer({ body: { disabledTools } });
	}, [server, updateMcpServer]);
	const handleToggleAutoApprove = (0, import_react.useCallback)(async (tool, autoApprove) => {
		if (!server) return;
		let disabledAutoApproveTools = [...server.disabledAutoApproveTools || []];
		if (autoApprove) disabledAutoApproveTools = disabledAutoApproveTools.filter((name) => name !== tool.name);
		else if (!disabledAutoApproveTools.includes(tool.name)) disabledAutoApproveTools.push(tool.name);
		updateMcpServer({ body: { disabledAutoApproveTools } });
	}, [server, updateMcpServer]);
	if (!server || isServerLoading) return null;
	const runtimeError = server.isActive && runtimeStatus.state === "error" ? runtimeStatus.lastError : void 0;
	const runtimeStatusLabel = {
		disabled: t("settings.mcp.runtimeStatus.disabled", "Disabled"),
		connecting: t("settings.mcp.runtimeStatus.connecting", "Connecting"),
		connected: t("settings.mcp.runtimeStatus.connected", "Connected"),
		error: t("settings.mcp.runtimeStatus.error", "Error")
	}[server.isActive ? runtimeStatus.state : "disabled"];
	const fieldsProps = {
		form,
		serverType,
		onServerTypeChange: setServerType,
		registryState,
		isBuiltin: server.installSource === "builtin" || isInMemoryBuiltinMcpServer(server)
	};
	const tabs = [{
		key: "settings",
		label: t("settings.mcp.tabs.general"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-ui": "settings.mcp-settings.mcp-settings-form",
				onChange: () => setIsFormChanged(true),
				className: "flex w-full min-w-0 flex-col gap-4 pb-6 [&_[data-slot=select-trigger]]:bg-background [&_input[data-slot=form-control]]:bg-background [&_textarea[data-slot=form-control]]:bg-background",
				id: "mcp-settings-form",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpFormSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpIdentityFields, { ...fieldsProps }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpFormSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(McpFormGrid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpEndpointField, { ...fieldsProps }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpTransportFields, { ...fieldsProps })] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpFormSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpRuntimeFields, { ...fieldsProps }) })
				]
			})
		})
	}];
	if (server.searchKey) tabs.push({
		key: "description",
		label: t("settings.mcp.tabs.description"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpDescription_default, { searchKey: server.searchKey })
	});
	if (server.isActive) {
		tabs.push({
			key: "tools",
			label: t("settings.mcp.tabs.tools") + (tools.length > 0 ? ` (${tools.length})` : ""),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: runtimeError && tools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				type: "error",
				showIcon: true,
				message: t("settings.mcp.runtimeStatus.unavailable", "Server unavailable"),
				description: runtimeError
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpTool_default, {
				tools,
				server,
				searchText: toolSearchText,
				onToggleTool: handleToggleTool,
				onToggleAutoApprove: handleToggleAutoApprove
			}) })
		});
		tabs.push({
			key: "prompts",
			label: t("settings.mcp.tabs.prompts") + (prompts.length > 0 ? ` (${prompts.length})` : ""),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpPrompt_default, { prompts })
		}, {
			key: "resources",
			label: t("settings.mcp.tabs.resources") + (resources.length > 0 ? ` (${resources.length})` : ""),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpResource_default, { resources })
		});
	}
	tabs.push({
		key: "logs",
		label: t("settings.mcp.logs", "Logs"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LogList, { children: [logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground-tertiary text-sm",
			children: t("settings.mcp.noLogs", "No logs yet")
		}), logs.map((log, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LogItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LogHeader, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timestamp, { children: new Date(log.timestamp).toLocaleTimeString() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				className: mapLogLevelClass(log.level),
				children: log.level
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogMessage, { children: log.message })
		] }), log.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreBlock, { children: typeof log.data === "string" ? log.data : JSON.stringify(log.data, null, 2) })] }, `${log.timestamp}-${idx}`))] })
	});
	const activeTabValue = tabs.some((tab) => tab.key === activeTab) ? activeTab : "settings";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingContainer, {
		theme,
		className: "min-w-0 overflow-hidden p-0",
		style: {
			width: "100%",
			backgroundColor: "transparent"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: activeTabValue,
			onValueChange: (value) => setActiveTab(value),
			variant: "line",
			className: "flex min-h-0 flex-1 flex-col bg-transparent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 px-6 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto w-full max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingTitle, {
								className: "min-w-0 flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
									className: "min-w-0 flex-1 flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon-sm",
										className: "-ml-2 shrink-0 rounded-full",
										"aria-label": t("common.back"),
										title: t("common.back"),
										onClick: () => void navigate({ to: "/settings/mcp/servers" }),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
										className: "min-w-0 flex-1 items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerName, {
												className: "truncate",
												children: server?.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpRuntimeStatusBadge, {
												state: server.isActive ? runtimeStatus.state : "disabled",
												children: runtimeStatusLabel
											}),
											serverVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VersionText, { children: serverVersion })
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
									className: "shrink-0 items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: server.isActive,
										loading: loadingServer === server.id,
										onCheckedChange: onToggleActive
									}, server.id)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "mb-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex min-w-0 items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
									value: activeTabValue,
									options: tabs.map((tab) => ({
										value: tab.key,
										label: tab.label
									})),
									onValueChange: setActiveTab,
									size: "sm",
									className: "min-w-0 max-w-full overflow-x-auto border-0 bg-muted/60",
									"aria-label": t("settings.mcp.title")
								}), activeTabValue === "tools" && tools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-7 shrink-0 items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSearchBar_default, {
										onSearch: setToolSearchText,
										placeholder: t("common.search"),
										tooltip: t("common.search"),
										maxWidth: 220,
										collapsedSize: 28,
										style: { borderRadius: 14 }
									})
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
					className: "min-h-0 flex-1 px-6 pt-2 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-3xl",
						children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: tab.key,
							className: "mt-0 min-h-0",
							children: tab.children
						}, tab.key))
					})
				}),
				activeTabValue === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-14 shrink-0 items-center border-border-subtle border-t px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-3xl items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => onDeleteMcpServer(server),
							className: "-ml-2 -mt-1 hover:!bg-destructive hover:!text-destructive-foreground rounded-full text-destructive opacity-60 hover:opacity-100 focus-visible:opacity-100 active:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteIcon_default, {
								size: 14,
								className: "lucide-custom"
							}), t("common.delete")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "default",
							onClick: onSave,
							disabled: loading || !isFormChanged,
							className: "rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), t("common.save")]
						})]
					})
				})
			]
		})
	}) });
};
var Container = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.mcp-settings",
	className: cn("flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden", className),
	...mergeUiProps(props, "settings.mcp-settings")
});
var ServerName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.server-name",
	className: cn("block min-w-0 text-sm", className),
	...mergeUiProps(props, "settings.server-name")
});
var McpFormSection = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.mcp-form-section",
	className,
	...mergeUiProps(props, "settings.mcp-form-section")
});
var LogList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.log-list",
	className: cn("flex flex-col gap-3 pt-1.25 pb-3.75", className),
	...mergeUiProps(props, "settings.log-list")
});
var LogItem = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.log-item",
	className: cn("rounded-lg border border-border bg-card px-3 py-2.5 text-card-foreground", className),
	...mergeUiProps(props, "settings.log-item")
});
var LogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.log-header",
	className: cn("flex flex-wrap items-baseline gap-2", className),
	...mergeUiProps(props, "settings.log-header")
});
var Timestamp = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.timestamp",
	className: cn("shrink-0 text-foreground-tertiary text-xs", className),
	...mergeUiProps(props, "settings.timestamp")
});
var LogMessage = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.log-message",
	className: cn("wrap-break-word text-[13px] leading-normal", className),
	...mergeUiProps(props, "settings.log-message")
});
var PreBlock = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
	"data-ui": "settings.pre-block",
	className: cn("wrap-break-word mt-1.5 whitespace-pre-wrap rounded-md border border-border bg-background px-2 py-2 text-foreground text-xs", className),
	...mergeUiProps(props, "settings.pre-block")
});
function mapLogLevelClass(level) {
	switch (level) {
		case "error":
		case "stderr": return "border-error-border bg-error-subtle text-error-subtle-foreground";
		case "warn": return "border-warning-border bg-warning-subtle text-warning-subtle-foreground";
		case "info":
		case "stdout": return "border-info-border bg-info-subtle text-info-subtle-foreground";
		default: return "border-border-subtle bg-muted text-muted-foreground";
	}
}
function mergeServerLogs(history, current) {
	const seen = /* @__PURE__ */ new Set();
	const merged = [];
	for (const log of [...history, ...current]) {
		const key = `${log.timestamp}:${log.level}:${log.source ?? ""}:${log.message}`;
		if (seen.has(key)) continue;
		seen.add(key);
		merged.push(log);
	}
	return merged.length > 200 ? merged.slice(merged.length - 200) : merged;
}
var VersionText = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.version-text",
	className: cn("shrink-0 text-[11px] text-muted-foreground leading-4", className),
	...mergeUiProps(props, "settings.version-text")
});
var McpRuntimeStatusBadge = ({ state, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.mcp-status-badge",
	className: cn("inline-flex h-4.5 items-center rounded-[9px] px-1.5 text-[11px] leading-4.5", state === "connected" && "border border-success-border bg-success-subtle text-success-subtle-foreground", state === "connecting" && "border border-warning-border bg-warning-subtle text-warning-subtle-foreground", state === "error" && "border border-error-border bg-error-subtle text-error-subtle-foreground", state === "disabled" && "bg-muted text-muted-foreground", className),
	...mergeUiProps(props, "settings.mcp-status-badge")
});
var SplitComponent = McpSettings;
export { SplitComponent as component };
