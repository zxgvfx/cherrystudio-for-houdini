import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./useCache-SsOQx-L2.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-78czMD_R.js";
import { a as mergeUiProps, i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Input } from "./input-dvr72LyA.js";
import { i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./input-group-Cx4HnAhR.js";
import "./with-selector-BMhODuKS.js";
import { n as useTheme } from "./useTheme-CbMe73se.js";
import "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as EyeOff } from "./eye-off-B0yNvNAf.js";
import { t as Eye } from "./eye-B3h_cTL2.js";
import { t as Play } from "./play-DCcouX13.js";
import { t as RotateCcw } from "./rotate-ccw-BS5J7gIn.js";
import { t as Square } from "./square-Bmg-KtbD.js";
import { t as v4_default } from "./v4-BSqPk4tJ.js";
import { c as SettingRowTitle, p as SettingsContentColumn, r as SettingGroup, u as SettingTitle } from "./SettingsPrimitives-CkQSNa69.js";
import "./useTemporaryValue-BuEAjgKO.js";
import { t as CopyButton_default } from "./CopyButton-DkMhcocz.js";
import { t as GatewayIcon } from "./GatewayIcon-Bdtwyj7T.js";
import { t as useApiGateway } from "./useApiGateway-3sWgxMLZ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var IndicatorLight = ({ color, size = 8, shadow = true, style, animation = true, className = "" }) => {
	const actualColor = color === "green" ? "#22c55e" : color;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.indicator-light",
		className: `rounded-full ${animation ? "animate-pulse" : ""} ${className}`,
		style: {
			width: `${size}px`,
			height: `${size}px`,
			backgroundColor: actualColor,
			boxShadow: shadow ? `0 0 6px ${actualColor}` : "none",
			...style
		}
	});
};
var indicator_light_default = IndicatorLight;
var API_SERVER_DEFAULTS = {
	HOST: "127.0.0.1",
	PORT: 23333
};
var ApiGatewaySettings = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [apiKeyVisible, setApiKeyVisible] = (0, import_react.useState)(false);
	const { apiGatewayConfig, apiGatewayRunning, apiGatewayLoading, startApiGateway, stopApiGateway, restartApiGateway, setApiGatewayConfig } = useApiGateway();
	const serverHost = apiGatewayConfig.host || API_SERVER_DEFAULTS.HOST;
	const serverPort = apiGatewayConfig.port || API_SERVER_DEFAULTS.PORT;
	const serverUrl = `http://${serverHost}:${serverPort}`;
	const apiKey = apiGatewayConfig.apiKey || "";
	const authorizationHeader = `Authorization: Bearer ${apiKey || "your-api-key"}`;
	const handleApiGatewayToggle = async (enabled) => {
		if (enabled) await startApiGateway();
		else await stopApiGateway();
	};
	const handleApiGatewayRestart = async () => {
		await restartApiGateway();
	};
	const generateApiKey = () => {
		return `cs-sk-${v4_default()}`;
	};
	const regenerateApiKey = () => {
		setApiGatewayConfig({ apiKey: generateApiKey() });
		toast.success(t("apiGateway.messages.apiKeyRegenerated"));
	};
	const handlePortChange = (value) => {
		const port = Number.parseInt(value, 10) || API_SERVER_DEFAULTS.PORT;
		if (port >= 1e3 && port <= 65535) setApiGatewayConfig({ port });
	};
	const openApiDocs = () => {
		if (apiGatewayRunning) window.open(`${serverUrl}/openapi`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		theme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingTitle, {
					className: "justify-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatewayIcon, {
						width: 16,
						height: 16
					}), t("apiGateway.title")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageDescription, { children: t("apiGateway.description") })]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusCard, {
				$running: apiGatewayRunning,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, {
					$running: apiGatewayRunning,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatewayIcon, {
						width: 22,
						height: 22
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(indicator_light_default, {
					color: apiGatewayRunning ? "var(--success)" : "var(--muted-foreground)",
					size: 8,
					animation: apiGatewayRunning,
					shadow: apiGatewayRunning
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusText, {
					$running: apiGatewayRunning,
					children: apiGatewayRunning ? t("apiGateway.status.running") : t("apiGateway.status.stopped")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusSubtext, { children: apiGatewayRunning ? serverUrl : t("apiGateway.messages.notEnabled") })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusActions, { children: [
					apiGatewayRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: openApiDocs,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 }), t("apiGateway.documentation.title")]
					}),
					apiGatewayRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: t("apiGateway.actions.restart.tooltip"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							loading: apiGatewayLoading,
							onClick: handleApiGatewayRestart,
							children: [!apiGatewayLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), t("apiGateway.actions.restart.button")]
						})
					}),
					apiGatewayRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						loading: apiGatewayLoading,
						onClick: () => handleApiGatewayToggle(false),
						children: [!apiGatewayLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 }), t("apiGateway.actions.stop")]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						loading: apiGatewayLoading,
						onClick: () => handleApiGatewayToggle(true),
						children: [!apiGatewayLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), t("apiGateway.actions.start")]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sections, { children: [!apiGatewayRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup, {
				theme,
				className: "mt-0 overflow-hidden p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConnectionFields, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("apiGateway.fields.url.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
						className: "mt-2 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							className: "font-mono text-xs",
							"aria-label": t("apiGateway.fields.url.label"),
							value: serverUrl,
							readOnly: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("apiGateway.fields.url.copyTooltip"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
									size: "icon-xs",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
										textToCopy: serverUrl,
										size: 16,
										"aria-label": t("apiGateway.fields.url.copyTooltip"),
										successFeedback: "icon"
									}) })
								})
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("apiGateway.fields.port.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2 w-full font-mono text-xs tabular-nums",
					"aria-label": t("apiGateway.fields.port.label"),
					type: "number",
					min: 1e3,
					max: 65535,
					value: serverPort,
					onChange: (event) => handlePortChange(event.target.value)
				})] })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup, {
				theme,
				className: "mt-0 overflow-hidden p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CredentialFields, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("apiGateway.fields.apiKey.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
					className: "mt-2 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						className: "font-mono text-xs",
						"aria-label": t("apiGateway.fields.apiKey.label"),
						type: apiKeyVisible ? "text" : "password",
						value: apiKey,
						readOnly: true,
						placeholder: t("apiGateway.fields.apiKey.placeholder")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroupAddon, {
						align: "inline-end",
						children: [
							!apiGatewayRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("apiGateway.actions.regenerate"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
									size: "icon-xs",
									"aria-label": t("apiGateway.actions.regenerate"),
									onClick: regenerateApiKey,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t(apiKeyVisible ? "settings.provider.api_key.hide_key" : "settings.provider.api_key.show_key"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
									size: "icon-xs",
									"aria-label": t(apiKeyVisible ? "settings.provider.api_key.hide_key" : "settings.provider.api_key.show_key"),
									onClick: () => setApiKeyVisible((visible) => !visible),
									disabled: !apiKey,
									children: apiKeyVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("apiGateway.fields.apiKey.copyTooltip"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
									size: "icon-xs",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
										textToCopy: apiKey,
										size: 16,
										"aria-label": t("apiGateway.fields.apiKey.copyTooltip"),
										successFeedback: "icon",
										disabled: !apiKey
									}) })
								})
							})
						]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("apiGateway.authHeader.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
					className: "mt-2 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						className: "font-mono text-xs",
						"aria-label": t("apiGateway.authHeader.title"),
						value: `Authorization: Bearer ${apiKey ? apiKeyVisible ? apiKey : "•".repeat(Math.min(apiKey.length, 40)) : "your-api-key"}`,
						readOnly: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("common.copy"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
								size: "icon-xs",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
									textToCopy: authorizationHeader,
									size: 16,
									"aria-label": t("common.copy"),
									successFeedback: "icon"
								}) })
							})
						})
					})]
				})] })] })
			})] })
		]
	});
};
var Container = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
	className: cn("flex h-[calc(100vh-var(--navbar-height))] flex-col", className),
	innerClassName: "pb-6",
	...props
});
var HeaderRow = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.header-row",
	className: cn("flex items-center justify-between gap-4", className),
	...mergeUiProps(props, "settings.header-row")
});
var PageDescription = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.page-description",
	className: cn("mt-2 max-w-140 text-foreground-tertiary text-xs leading-5", className),
	...mergeUiProps(props, "settings.page-description")
});
var StatusCard = ({ $running, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-card",
	className: cn("mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4", $running ? "border-success-border bg-success-subtle text-success-subtle-foreground" : "border-border bg-card text-card-foreground", className),
	...mergeUiProps(props, "settings.status-card")
});
var StatusSection = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-section",
	className: cn("flex min-w-0 flex-1 items-center gap-3", className),
	...mergeUiProps(props, "settings.status-section")
});
var StatusIcon = ({ $running, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-icon",
	className: cn("flex size-11 shrink-0 items-center justify-center rounded-lg border bg-background", $running ? "border-success-border text-success" : "border-border text-muted-foreground", className),
	...mergeUiProps(props, "settings.status-icon")
});
var StatusContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-content",
	className: cn("flex min-w-0 flex-col gap-1", className),
	...mergeUiProps(props, "settings.status-content")
});
var StatusLabel = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-label",
	className: cn("flex items-center gap-2", className),
	...mergeUiProps(props, "settings.status-label")
});
var StatusText = ({ $running, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-text",
	className: cn("font-medium text-sm", $running ? "text-success-subtle-foreground" : "text-foreground", className),
	...mergeUiProps(props, "settings.status-text")
});
var StatusSubtext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-subtext",
	className: cn("truncate text-muted-foreground text-xs", className),
	...mergeUiProps(props, "settings.status-subtext")
});
var StatusActions = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.status-actions",
	className: cn("flex flex-wrap items-center justify-end gap-2", className),
	...mergeUiProps(props, "settings.status-actions")
});
var Sections = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.sections",
	className: cn("mt-4 flex flex-col gap-4", className),
	...mergeUiProps(props, "settings.sections")
});
var ConnectionFields = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.connection-fields",
	className: cn("grid grid-cols-[minmax(0,1fr)_10rem] gap-4 p-4 max-sm:grid-cols-1", className),
	...mergeUiProps(props, "settings.connection-fields")
});
var CredentialFields = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.credential-fields",
	className: cn("flex flex-col gap-4 p-4", className),
	...mergeUiProps(props, "settings.credential-fields")
});
var Field = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.field",
	className: cn("min-w-0", className),
	...mergeUiProps(props, "settings.field")
});
var SplitComponent = ApiGatewaySettings;
export { SplitComponent as component };
