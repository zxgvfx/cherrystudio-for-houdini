import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as a } from "./zod-BFnbLOgm.js";
import { a as formatMcpError } from "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as Alert } from "./alert-DCOQC5CT.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { t as Divider } from "./divider-CbA9R3bs.js";
import { t as Spinner } from "./spinner-6-_mzzWu.js";
import { n as Switch } from "./switch-C4W4NCwc.js";
import "./es2015-wfS3L7va.js";
import { t as DataTable } from "./data-table-BbQuQ3SR.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import { i as Flex, r as ColFlex } from "./flex-YDL2weOg.js";
import "./with-selector-DlsRhNV6.js";
import { n as RequiredMark } from "./label-Cv8Hnuxr.js";
import { d as useForm, t as Form } from "./form-D4JKgtXI.js";
import { t as InfoTooltip } from "./info-tooltip-CH14M-gb.js";
import { t as Markdown } from "./markdown-CDY5Xb9A.js";
import "./chunk-BO2N2NFS-fKJ-DR8B.js";
import "./extend-BDo4rIBl.js";
import "./marked.esm-5kn1DqGn.js";
import "./dist-Bsd0pttl.js";
import { t as purify } from "./purify.es-RDRNldMc.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-PDzaS6-f.js";
import { t as Badge } from "./badge-DTLpmOYc.js";
import { t as SegmentedControl } from "./segmented-control-BPwDi61u.js";
import { n as TabsContent, t as Tabs } from "./tabs-C4rovZfE.js";
import { n as useCodeStyle } from "./useCodeStyle-hWHmowmT.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import "./CacheService-IyXh62g9.js";
import { a as useSharedCacheValue } from "./useCache-lF6Sw_ck.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as ArrowLeft } from "./arrow-left-BRjYFbf8.js";
import { t as Save } from "./save-xEFQvhbL.js";
import { t as Zap } from "./zap-zNly-w2p.js";
import { t as popup } from "./popup-fJcKiA2S.js";
import { r as isInMemoryBuiltinMcpServer } from "./mcp-BGt1L-d_.js";
import "./systemProviderId-B4QvwwvR.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./with-selector-DFVq3c2Y.js";
import { t as useParams } from "./useParams-DMyPNa6X.js";
import { t as useSearch } from "./useSearch-BR_1ns0Z.js";
import { t as useNavigate } from "./useNavigate-Bl6k0zLr.js";
import "./__vite-browser-external-DlQ9XxoO.js";
import { i as McpLogo } from "./SvgIcon-DI_kUaAV.js";
import "./useTemporaryValue-CJVn11gD.js";
import { n as useMcpServer, t as useIsToolAutoApproved } from "./useMcpServer-BA8oDtqe.js";
import { t as Scrollbar_default } from "./Scrollbar-CjwT5bYS.js";
import { t as CopyButton_default } from "./CopyButton-C5ZE8W-P.js";
import { t as useMcpRuntimeStatus } from "./useMcpRuntimeStatus-Ctv5GtW6.js";
import { t as DeleteIcon_default } from "./DeleteIcon-D8_d_iTl.js";
import { t as CollapsibleSearchBar_default } from "./CollapsibleSearchBar-C4HcfF9B.js";
import { t as SettingContainer, u as SettingTitle } from "./SettingsPrimitives-DyPgPdGs.js";
import "./main-qziCqvGK.js";
import "./mcpServer-D4jVlgXQ.js";
import { n as formatMcpLogData, r as formatMcpLogs, s as toUpdateMcpServerDto } from "./utils-8FRGTHqy.js";
import { t as require_dist } from "./dist-CKtT0iNo.js";
import { a as McpIdentityFields, c as buildMcpSchema, d as toMcpServerFields, f as useMcpRegistryState, i as McpFormGrid, l as resolveMcpConfigInstallSource, o as McpRuntimeFields, p as useMcpServerTrust, r as McpEndpointField, s as McpTransportFields, u as toMcpFormDefaultValues } from "./McpServerFields-B82Cbl0r.js";
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
var logger$1 = loggerService.withContext("McpLogsTab");
var McpLogsTab = ({ serverId }) => {
	const { t } = useTranslation();
	const [logs, setLogs] = (0, import_react.useState)([]);
	const logsText = (0, import_react.useMemo)(() => formatMcpLogs(logs), [logs]);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		const unsubscribe = ipcApi.on("mcp.server.log", (log) => {
			if (log.serverId !== serverId) return;
			setLogs((current) => appendServerLog(current, log));
		});
		const loadHistory = async () => {
			try {
				const history = await ipcApi.request("mcp.server.get_logs", { serverId });
				if (!disposed) setLogs((current) => mergeServerLogs(history, current));
			} catch (error) {
				logger$1.warn("Failed to load server logs", error);
			}
		};
		loadHistory();
		return () => {
			disposed = true;
			unsubscribe();
		};
	}, [serverId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.mcp-logs-tab",
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground-tertiary text-sm",
				children: t("settings.mcp.logsHint", "Logs from the MCP server process")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
				textToCopy: logsText,
				size: 14,
				successFeedback: "icon",
				disabled: logs.length === 0,
				tooltip: t("settings.mcp.copyLogs", "Copy logs")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LogList, {
			className: "selectable pt-0",
			children: [logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground-tertiary text-sm",
				children: t("settings.mcp.noLogs", "No logs yet")
			}), logs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LogItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LogHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timestamp, { children: new Date(log.timestamp).toLocaleTimeString() }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: mapLogLevelClass(log.level),
					children: log.level
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogMessage, { children: log.message })
			] }), log.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreBlock, { children: formatMcpLogData(log.data) })] }, `${log.timestamp}-${index}`))]
		})]
	});
};
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
function appendServerLog(current, log) {
	const merged = [...current, log];
	return merged.length > 200 ? merged.slice(merged.length - 200) : merged;
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
var McpLogsTab_default = McpLogsTab;
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
var MAX_NESTING_DEPTH = 5;
var getToolSchemaProperties = (tool) => tool.inputSchema?.properties;
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
	const renderProperty = (key, property, required, depth = 0) => {
		const { type, description, items } = property;
		const itemsType = items?.type;
		const itemType = type === "array" && itemsType ? `${itemsType}[]` : type;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-property",
			"data-schema-property": key,
			className: "min-w-0 border-border border-b py-2 last:border-b-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					className: "min-w-0 items-start gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
							className: "w-40 shrink-0 items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wrap-anywhere min-w-0 font-semibold",
								children: key
							}), required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("common.required_field"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredMark, {})
							})]
						}),
						itemType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: `shrink-0 ${getTypeBadgeClass(type)}`,
							children: itemType
						}),
						description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wrap-break-word min-w-0 flex-1 text-muted-foreground text-sm leading-5",
							children: description
						})
					]
				}),
				property.enum && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 ml-42 flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm",
						children: t("settings.mcp.tools.inputSchema.enum.allowedValues")
					}), property.enum.map((enumValue, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: String(enumValue)
					}, index))]
				}),
				depth < MAX_NESTING_DEPTH && type === "object" && property.properties && renderSchemaProperties(property.properties, property.required, depth + 1),
				depth < MAX_NESTING_DEPTH && type === "array" && itemsType === "object" && items?.properties && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm italic",
						children: "items:"
					}), renderSchemaProperties(items.properties, items.required, depth + 1)]
				})
			]
		}, key);
	};
	const renderSchemaProperties = (properties, required = [], depth = 0) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "settings.render-schema-properties",
			className: depth === 0 ? "mt-1 min-w-0 select-text overflow-hidden rounded-md border border-border bg-background px-3" : "mt-2 ml-3 min-w-0 select-text border-border border-l pl-3",
			children: Object.entries(properties).map(([key, property]) => renderProperty(key, property, required.includes(key), depth))
		});
	};
	const renderToolProperties = (tool) => {
		const properties = getToolSchemaProperties(tool);
		const hasInputSchema = Boolean(properties && Object.keys(properties).length > 0);
		if (!tool.description && !hasInputSchema) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
			className: "gap-4",
			children: [tool.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 font-bold text-foreground text-sm",
				children: t("common.description")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
				id: `mcp-tool-description-${tool.id}`,
				footnoteLabel: t("common.footnotes"),
				className: "font-normal text-muted-foreground text-sm",
				children: tool.description
			})] }), hasInputSchema && properties && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 font-bold text-foreground text-sm",
				children: t("settings.mcp.tools.inputSchema.label")
			}), renderSchemaProperties(properties, tool.inputSchema.required)] })]
		});
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
					maxWidth: 400,
					className: "overflow-hidden"
				},
				cell: ({ row }) => {
					const tool = row.original;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
						className: "min-w-0 gap-1 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
							className: "min-w-0 items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground text-sm",
								title: tool.name,
								children: tool.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: `ID: ${tool.id}` })]
						}), tool.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "m-0 line-clamp-1 w-full min-w-0 max-w-full overflow-hidden text-[13px] text-muted-foreground leading-5",
							children: tool.description
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
		getCanExpand: (tool) => {
			const properties = getToolSchemaProperties(tool);
			return Boolean(tool.description) || Boolean(properties && Object.keys(properties).length);
		},
		tableLayout: "fixed",
		className: "bg-transparent [&_[data-slot=table-cell]]:bg-transparent [&_[data-slot=table-head]]:bg-transparent [&_[data-slot=table-header]]:bg-transparent [&_[data-slot=table-header]_[data-slot=table-row]]:bg-transparent",
		rowClassName: "bg-transparent"
	});
};
var McpTool_default = McpToolsSection;
var logger = loggerService.withContext("McpSettings");
var mcpToolsCacheKey = (serverId) => `mcp.tools.${serverId}`;
var EMPTY_MCP_TOOLS = [];
var McpSettingsContent = ({ server, updateMcpServer, deleteMcpServer }) => {
	const { t } = useTranslation();
	const search = useSearch({ strict: false });
	const serverId = server.id;
	const [initialFormValues] = (0, import_react.useState)(() => toMcpFormDefaultValues(server));
	const { ensureServerTrusted } = useMcpServerTrust((0, import_react.useCallback)((body) => updateMcpServer({ body }), [updateMcpServer]));
	const [serverType, setServerType] = (0, import_react.useState)(initialFormValues.serverType);
	const form = useForm({
		resolver: a(buildMcpSchema(t)),
		defaultValues: initialFormValues
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
	const registryState = useMcpRegistryState(form, () => setIsFormChanged(true), server);
	const [serverVersion, setServerVersion] = (0, import_react.useState)(null);
	const handledAutoEnableServerIdRef = (0, import_react.useRef)(null);
	const { theme } = useTheme();
	const navigate = useNavigate();
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
	(0, import_react.useEffect)(() => {
		if (server?.isActive) {
			fetchTools();
			fetchPrompts();
			fetchResources();
			fetchServerVersion();
		}
	}, [server?.id, server?.isActive]);
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
			form.setValue("isActive", active);
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
		if (search.autoEnable !== "true" || !server) return;
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
				"data-ui": "settings.mcp-settings-content.mcp-settings-form",
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
		children: activeTab === "logs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpLogsTab_default, { serverId: server.id }) : null
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
var McpSettings = () => {
	const serverId = useParams({ strict: false }).serverId;
	const { server, isLoading, updateMcpServer, deleteMcpServer } = useMcpServer(serverId ?? "");
	if (!server || isLoading) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpSettingsContent, {
		server,
		updateMcpServer,
		deleteMcpServer
	}, server.id);
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
