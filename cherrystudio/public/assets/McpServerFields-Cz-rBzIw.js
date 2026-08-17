import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { C as string, _ as object, a as array, n as _enum, o as boolean } from "./schemas-CV_EtlSZ.js";
import { n as ZodIssueCode } from "./zod-EAM70aoF.js";
import { W as number } from "./error-B2Op57SY.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-B3OAESWo.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-DDbGMM0m.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { t as Input$1 } from "./textarea-Dr3K8nxm.js";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, s as FormMessage } from "./form-BQjGub5t.js";
import { t as InfoTooltip } from "./info-tooltip-BdxcTZZj.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as popup } from "./popup-BLG-Gue5.js";
import { t as BuiltinMcpServerNames } from "./mcp-CN-pwFr9.js";
import { t as require_main } from "./main-DU8KX4hv.js";
import { n as McpServerTypeSchema } from "./mcpServer-Deh1vY_5.js";
import { i as getCommandPreview, t as ensureServerTrusted } from "./utils-YZSB2VLf.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var formatKeyValues = (values, separator) => Object.entries(values ?? {}).map(([key, value]) => `${key}${separator}${value}`).join("\n");
var PreviewField = ({ label, value }) => value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "settings.preview-field",
	className: "space-y-1",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "font-semibold",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: "whitespace-pre-wrap break-all rounded-md bg-muted p-2",
		children: value
	})]
}) : null;
const McpServerConfigPreview = ({ server }) => {
	const { t } = useTranslation();
	const connectionPreview = server.baseUrl ?? getCommandPreview(server);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.mcp-server-config-preview",
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewField, {
				label: server.baseUrl ? t("settings.mcp.url") : t("settings.mcp.command"),
				value: connectionPreview
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewField, {
				label: t("settings.mcp.env"),
				value: formatKeyValues(server.env, "=")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewField, {
				label: t("settings.mcp.headers"),
				value: formatKeyValues(server.headers, ": ")
			})
		]
	});
};
var ProtocolInstallWarningContent = ({ message, server }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.protocol-install-warning-content",
		className: "space-y-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpServerConfigPreview, { server })]
	});
};
var ProtocolInstallWarning_default = ProtocolInstallWarningContent;
var import_react = /* @__PURE__ */ __toESM(require_react());
const useMcpServerTrust = (updateServer) => {
	const { t } = useTranslation();
	const requestConfirm = (0, import_react.useCallback)(async (server) => {
		return popup.confirm({
			centered: true,
			title: t("settings.mcp.protocolInstallWarning.title"),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtocolInstallWarning_default, {
				message: t("settings.mcp.protocolInstallWarning.message"),
				server
			}),
			okText: t("settings.mcp.protocolInstallWarning.run"),
			cancelText: t("common.cancel"),
			okButtonProps: { danger: true }
		});
	}, [t]);
	return { ensureServerTrusted: (0, import_react.useCallback)(async (server) => {
		return ensureServerTrusted(server, requestConfirm, updateServer);
	}, [requestConfirm, updateServer]) };
};
var import_main = require_main();
const parseKeyValueString = (str) => {
	return (0, import_main.parse)(str);
};
const buildMcpSchema = (t) => object({
	name: string().trim().min(1, t("common.name")),
	description: string().optional(),
	serverType: _enum([
		"stdio",
		"sse",
		"streamableHttp",
		"inMemory"
	]),
	baseUrl: string().optional(),
	command: string().optional(),
	registryUrl: string().optional(),
	args: string().optional(),
	env: string().optional(),
	isActive: boolean().optional(),
	headers: string().optional(),
	longRunning: boolean().optional(),
	timeout: number().optional(),
	provider: string().optional(),
	providerUrl: string().optional(),
	logoUrl: string().optional(),
	tags: array(string()).optional()
}).superRefine((value, ctx) => {
	if ((value.serverType === "sse" || value.serverType === "streamableHttp") && !value.baseUrl?.trim()) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["baseUrl"],
		message: t("settings.mcp.url")
	});
	if (resolveMcpConfigTransportType(value.serverType, value.name) === "stdio" && !value.command?.trim()) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["command"],
		message: t("settings.mcp.command")
	});
});
function resolveMcpConfigTransportType(type, name) {
	return type === "inMemory" && name === BuiltinMcpServerNames.mcpAutoInstall ? "stdio" : type;
}
function resolveMcpConfigInstallSource(server) {
	if (server.installSource) return server.installSource;
	return server.type === "inMemory" && server.name === BuiltinMcpServerNames.mcpAutoInstall ? "builtin" : server.installSource;
}
const MCP_FORM_DEFAULT_VALUES = {
	name: "",
	description: "",
	serverType: "stdio",
	baseUrl: "",
	command: "",
	registryUrl: "",
	args: "",
	env: "",
	isActive: false,
	headers: "",
	longRunning: false,
	timeout: void 0,
	provider: "",
	providerUrl: "",
	logoUrl: "",
	tags: []
};
const NpmRegistry = [{
	nameKey: "settings.mcp.registryOptions.npmTaobao",
	url: "https://registry.npmmirror.com"
}, {
	nameKey: "settings.mcp.registryOptions.custom",
	url: "custom"
}];
const PipRegistry = [
	{
		nameKey: "settings.mcp.registryOptions.pipTsinghua",
		url: "https://pypi.tuna.tsinghua.edu.cn/simple"
	},
	{
		nameKey: "settings.mcp.registryOptions.pipAliyun",
		url: "http://mirrors.aliyun.com/pypi/simple/"
	},
	{
		nameKey: "settings.mcp.registryOptions.pipUstc",
		url: "https://mirrors.ustc.edu.cn/pypi/simple/"
	},
	{
		nameKey: "settings.mcp.registryOptions.pipHuawei",
		url: "https://repo.huaweicloud.com/repository/pypi/simple/"
	},
	{
		nameKey: "settings.mcp.registryOptions.pipTencent",
		url: "https://mirrors.cloud.tencent.com/pypi/simple/"
	}
];
const registryForCommand = (command) => {
	if (command.includes("uv") || command.includes("uvx")) return PipRegistry;
	if (command.includes("npx") || command.includes("bun") || command.includes("bunx")) return NpmRegistry;
};
var getInitialRegistryState = (server) => {
	const registry = server?.command ? registryForCommand(server.command) : void 0;
	const isCustom = Boolean(server?.registryUrl) && Boolean(registry) && !registry?.some((reg) => reg.url === server?.registryUrl);
	return {
		registry,
		selectedRegistryType: isCustom ? "custom" : "",
		customRegistryUrl: isCustom ? server?.registryUrl ?? "" : ""
	};
};
function useMcpRegistryState(form, onChanged, initialServer) {
	const initialState = getInitialRegistryState(initialServer);
	const [registry, setRegistry] = (0, import_react.useState)(initialState.registry);
	const [selectedRegistryType, setSelectedRegistryType] = (0, import_react.useState)(initialState.selectedRegistryType);
	const [customRegistryUrl, setCustomRegistryUrl] = (0, import_react.useState)(initialState.customRegistryUrl);
	return {
		registry,
		selectedRegistryType,
		customRegistryUrl,
		handleCommandChange: (0, import_react.useCallback)((command) => {
			const nextRegistry = registryForCommand(command);
			if (registry !== nextRegistry) {
				const registryUrl = form.getValues("registryUrl");
				setSelectedRegistryType("");
				setCustomRegistryUrl("");
				form.setValue("registryUrl", "");
				if (registryUrl) onChanged?.();
			}
			setRegistry(nextRegistry);
		}, [
			form,
			onChanged,
			registry
		]),
		reset: (0, import_react.useCallback)(() => {
			setRegistry(void 0);
			setSelectedRegistryType("");
			setCustomRegistryUrl("");
		}, []),
		onSelectRegistry: (0, import_react.useCallback)((url) => {
			if (url === "custom") {
				setSelectedRegistryType("custom");
				return;
			}
			setSelectedRegistryType("");
			setCustomRegistryUrl("");
			if (registryForCommand(form.getValues("command") || "")) form.setValue("registryUrl", url);
			onChanged?.();
		}, [form, onChanged]),
		onCustomRegistryChange: (0, import_react.useCallback)((url) => {
			setCustomRegistryUrl(url);
			form.setValue("registryUrl", url);
			onChanged?.();
		}, [form, onChanged])
	};
}
function toMcpFormDefaultValues(server) {
	return {
		name: server.name,
		description: server.description ?? "",
		serverType: resolveMcpConfigTransportType(server.type, server.name),
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
	};
}
function toMcpServerFields(values) {
	const fields = {
		name: values.name,
		type: values.serverType,
		description: values.description,
		registryUrl: values.registryUrl,
		timeout: values.timeout,
		longRunning: values.longRunning,
		tags: values.tags
	};
	if (values.serverType === "sse" || values.serverType === "streamableHttp") {
		fields.baseUrl = values.baseUrl;
		fields.headers = parseKeyValueString(values.headers ?? "");
	} else {
		fields.command = values.command;
		fields.args = values.args ? values.args.split("\n").filter((arg) => arg.trim() !== "") : [];
		fields.env = parseKeyValueString(values.env ?? "");
	}
	return fields;
}
const McpFormGrid = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.mcp-form-grid",
	className: cn("grid grid-cols-1 items-start gap-x-4 gap-y-4 xl:grid-cols-2", className),
	...mergeUiProps(props, "settings.mcp-form-grid")
});
var singleColumnGridClassName = "gap-y-6 xl:grid-cols-1";
var McpFieldGroup = ({ children, singleColumn }) => singleColumn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpFormGrid, {
	className: singleColumnGridClassName,
	children
}) : children;
var inlineSettingItemClassName = "flex h-14 min-w-0 flex-row items-center justify-between gap-4 rounded-md border border-border px-3";
var codeAreaClassName = "max-h-40 min-h-21 px-3 py-2 font-mono text-sm leading-5";
function McpIdentityFields({ form, onServerTypeChange, isBuiltin, singleColumn }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(McpFormGrid, {
		className: singleColumn ? singleColumnGridClassName : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "name",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "min-w-0 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
							required: true,
							children: t("settings.mcp.name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							placeholder: t("common.name"),
							disabled: isBuiltin,
							...field
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
					]
				})
			}),
			!isBuiltin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "serverType",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "min-w-0 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
							required: true,
							children: t("settings.mcp.type")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							required: true,
							value: field.value,
							onValueChange: (value) => {
								const serverType = McpServerTypeSchema.parse(value);
								field.onChange(serverType);
								onServerTypeChange(serverType);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "stdio",
									children: t("settings.mcp.stdio")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "sse",
									children: t("settings.mcp.sse")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "streamableHttp",
									children: t("settings.mcp.streamableHttp")
								})
							] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "description",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: cn("min-w-0 gap-3", !singleColumn && "xl:col-span-2"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t("settings.mcp.description") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						rows: 2,
						placeholder: t("common.description"),
						className: "min-h-16 px-3 py-2 text-sm leading-5",
						...field
					}) })]
				})
			})
		]
	});
}
function McpEndpointField({ form, serverType, registryState, singleColumn }) {
	const { t } = useTranslation();
	if (!serverType || serverType === "inMemory") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpFieldGroup, {
		singleColumn,
		children: serverType === "stdio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "command",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: "min-w-0 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
						required: true,
						children: t("settings.mcp.command")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						placeholder: "uvx or npx",
						...field,
						onChange: (e) => {
							field.onChange(e);
							registryState.handleCommandChange(e.target.value);
						}
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "baseUrl",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: "min-w-0 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
						required: true,
						className: "flex items-center gap-1",
						children: [t("settings.mcp.url"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.baseUrlTooltip") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						placeholder: serverType === "sse" ? "http://localhost:3000/sse" : "http://localhost:3000/mcp",
						...field
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
				]
			})
		})
	});
}
function McpArgsField({ form }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		control: form.control,
		name: "args",
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
			className: "min-w-0 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
				className: "flex items-center gap-1",
				children: [t("settings.mcp.args"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.argsTooltip") })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				rows: 3,
				placeholder: `arg1\narg2`,
				className: codeAreaClassName,
				...field
			}) })]
		})
	});
}
function McpTransportFields({ form, serverType, registryState, singleColumn, includeArgs = true }) {
	const { t } = useTranslation();
	const { registry, selectedRegistryType, customRegistryUrl, onSelectRegistry, onCustomRegistryChange } = registryState;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(McpFieldGroup, {
		singleColumn,
		children: [
			(serverType === "sse" || serverType === "streamableHttp") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "headers",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "min-w-0 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
						className: "flex items-center gap-1",
						children: [t("settings.mcp.headers"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.headersTooltip") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						rows: 3,
						placeholder: `Content-Type=application/json\nAuthorization=Bearer token`,
						className: codeAreaClassName,
						...field
					}) })]
				})
			}),
			serverType === "stdio" && registry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "registryUrl",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "min-w-0 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
							className: "flex items-center gap-1",
							children: [t("settings.mcp.registry"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.registryTooltip") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
							value: selectedRegistryType === "custom" ? "custom" : field.value || "",
							onValueChange: onSelectRegistry,
							className: "flex flex-row flex-wrap gap-x-4 gap-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "" }), t("settings.mcp.registryDefault")]
							}), registry.map((reg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: reg.url }), t(reg.nameKey)]
							}, reg.url))]
						}) }),
						selectedRegistryType === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							placeholder: t("settings.mcp.customRegistryPlaceholder"),
							value: customRegistryUrl,
							onChange: (e) => onCustomRegistryChange(e.target.value)
						})
					]
				})
			}),
			(serverType === "stdio" || serverType === "inMemory") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [includeArgs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpArgsField, { form }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "env",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "min-w-0 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
						className: "flex items-center gap-1",
						children: [t("settings.mcp.env"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.envTooltip") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						rows: 3,
						placeholder: `KEY1=value1\nKEY2=value2`,
						className: codeAreaClassName,
						...field
					}) })]
				})
			})] })
		]
	});
}
function McpRuntimeFields({ form, singleColumn, inlineCards = true }) {
	const { t } = useTranslation();
	const rowClassName = inlineCards ? inlineSettingItemClassName : "flex min-w-0 flex-row items-center justify-between gap-4";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(McpFormGrid, {
		className: singleColumn ? singleColumnGridClassName : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "longRunning",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: rowClassName,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
					className: "flex items-center gap-1",
					children: [t("settings.mcp.longRunning"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.longRunningTooltip") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					size: "sm",
					checked: !!field.value,
					onCheckedChange: field.onChange
				}) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "timeout",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: rowClassName,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
					className: "flex items-center gap-1",
					children: [t("settings.mcp.timeout"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, { content: t("settings.mcp.timeoutTooltip") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						placeholder: "60",
						value: field.value ?? "",
						onChange: (e) => field.onChange(e.target.value === "" ? void 0 : Number(e.target.value)),
						className: "h-8 w-24 py-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground-tertiary text-xs",
						children: "s"
					})]
				}) })]
			})
		})]
	});
}
export { McpIdentityFields as a, buildMcpSchema as c, toMcpServerFields as d, useMcpRegistryState as f, McpFormGrid as i, resolveMcpConfigInstallSource as l, McpServerConfigPreview as m, McpArgsField as n, McpRuntimeFields as o, useMcpServerTrust as p, McpEndpointField as r, McpTransportFields as s, MCP_FORM_DEFAULT_VALUES as t, toMcpFormDefaultValues as u };
